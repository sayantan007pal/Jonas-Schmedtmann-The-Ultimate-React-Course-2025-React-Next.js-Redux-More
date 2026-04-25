# 129. How Diffing Works in React

> TL;DR: React diffing is the render-phase comparison between the previous UI tree and the next UI tree. React does not run a perfect tree-edit algorithm. It uses a fast O(n) heuristic: if the element type changes, React replaces that subtree; if children have stable keys, React can match the same child across renders even when its position changes.

---

## Sources Researched

- Reviewed against the current React docs on 2026-04-25. The react.dev docs are currently served as React `v19.2`.
- React legacy docs on reconciliation and the exact two heuristic rules: <https://legacy.reactjs.org/docs/reconciliation.html>
- React current docs on preserving/resetting state with position, type, and keys: <https://react.dev/learn/preserving-and-resetting-state>
- React current docs on rendering lists and key rules: <https://react.dev/learn/rendering-lists>
- React current docs on render/commit and minimal DOM updates: <https://react.dev/learn/render-and-commit>
- React current docs on `createElement` and React element shape: <https://react.dev/reference/react/createElement>
- React current docs on UI/render trees: <https://react.dev/learn/understanding-your-ui-as-a-tree>

---

## 1. The Sequential Mental Model

Use this sequence in interviews:

```txt
state/props update
    -> React renders the affected part of the tree
    -> component functions return React element objects
    -> React compares the new elements with the previous fiber tree
    -> React decides: reuse, update, move, insert, or delete
    -> commit phase applies the required DOM operations
```

Important distinction:

- **React element**: a lightweight JavaScript object such as `{ type, props, key, ref }`.
- **DOM node**: the real browser object created by `document.createElement`.
- **Fiber**: React's internal work node that connects a React element to state, effects, and the real host node.

When people say "React compares the virtual DOM", they usually mean React compares new React elements with the existing fiber tree during reconciliation.

---

## 2. What Exactly Is Being Compared?

JSX becomes React element objects:

```jsx
<button className="primary">Save</button>
```

is roughly:

```js
{
  type: "button",
  props: {
    className: "primary",
    children: "Save",
  },
  key: null,
  ref: null,
}
```

For custom components:

```jsx
<UserCard user={user} />
```

is roughly:

```js
{
  type: UserCard,
  props: {
    user,
  },
  key: null,
  ref: null,
}
```

So React first compares **element identity**, especially:

```txt
identity = parent position + key + type
```

More practically:

- If there is no key, React mostly matches siblings by their order.
- If there is a key, React uses that key to match siblings within the same parent.
- After finding a possible match, the element type must still match.

---

## 3. Why React Needs Heuristics

A perfect tree-edit-distance algorithm can be too expensive for UI updates. React's legacy reconciliation docs explain that a general solution can be O(n^3), which is unrealistic for large UI trees. Those docs describe React's practical heuristic around these two assumptions:

1. **Two elements of different types produce different trees.**
2. **A stable `key` lets React know which children are the same across renders.**

Current react.dev pages no longer present a standalone "diffing algorithm" chapter, but they still teach the same user-visible behavior: state is preserved when the same component stays at the same position, different types reset subtrees, and stable keys identify children across renders.

This gives React a fast common-case strategy: compare level by level, reuse matching nodes, and avoid unnecessary DOM work.

Analogy: imagine checking two versions of a college seating chart.

- If room "CSE Lab 1" becomes "Auditorium", you do not compare every chair one by one. You treat it as a different room setup.
- If students have roll numbers, you can identify the same student even if they changed seats.
- If students are identified only by seat number, then inserting one student at the front makes everyone look like a different person.

That is exactly the difference between stable keys and index-based matching.

### Critical Pitfall: Position in the Render Tree ≠ Position in Your JSX Code

React tracks identity using the **rendered output tree**, not where JSX tags appear in your source code. This is one of the most commonly misunderstood concepts in React.

```jsx
import { useState } from "react";

function App() {
  const [isFancy, setIsFancy] = useState(false);

  // Branch A
  if (isFancy) {
    return (
      <div>
        <Counter isFancy={true} />
      </div>
    );
  }

  // Branch B
  return (
    <div>
      <Counter isFancy={false} />
    </div>
  );
}
```

Even though the two branches look like different JSX trees in your code, React sees the same output structure in both cases:

```txt
div
  Counter (first child)
```

`Counter` is always the first child of `div`. From React's perspective, it is the same `Counter`. The counter state is **preserved** when `isFancy` flips, even though the JSX looks like it should remount.

React does not inspect your `if/else` branching logic. It only compares what the component function actually returns.

Interview line:
> The render tree position is what React uses to match fibers, not where the JSX tag sits in your source code.

---

## 4. Rule 1: Different Types Produce Different Trees

### Interview Definition

If the old element and new element have different `type`, React assumes the old subtree cannot be safely reused. It unmounts the old subtree and mounts a new one.

Simplified:

```js
function reconcile(oldFiber, newElement) {
  if (oldFiber.type !== newElement.type) {
    deleteSubtree(oldFiber);
    return mountSubtree(newElement);
  }

  updateProps(oldFiber, newElement.props);
  reconcileChildren(oldFiber, newElement.props.children);
  return oldFiber;
}
```

This is not exact React source code. It is the interview-level model.

---

## 5. Rule 1 for DOM Elements

In React docs, a "DOM element" usually means a React element whose `type` is a string such as `"div"`, `"button"`, or `"input"`.

### Same DOM Type: Reuse the DOM Node

```jsx
function SaveButton({ isSaving }) {
  return (
    <button className={isSaving ? "btn loading" : "btn"}>
      {isSaving ? "Saving..." : "Save"}
    </button>
  );
}
```

Render 1:

```txt
type: "button"
props: { className: "btn", children: "Save" }
```

Render 2:

```txt
type: "button"
props: { className: "btn loading", children: "Saving..." }
```

Because the type stayed `"button"`, React can reuse the existing real `<button>` DOM node and only update changed props/text.

Result:

- DOM node is preserved.
- Event handlers are updated if needed.
- Child text is updated.
- Browser does less work than removing and recreating the button.

### Different DOM Type: Replace the Subtree

```jsx
function Notice({ asWarning }) {
  return asWarning ? (
    <section className="warning">
      <Counter />
    </section>
  ) : (
    <div className="info">
      <Counter />
    </div>
  );
}
```

When `asWarning` changes:

```txt
old type: "div"
new type: "section"
```

React treats this as a different tree:

```txt
delete old <div> subtree
mount new <section> subtree
```

Even though `<Counter />` appears inside both branches, the parent DOM element changed from `div` to `section`, so the subtree under it is destroyed and recreated.

Practical consequence:

- Any DOM state below it can be lost.
- Any component state below it can be reset.
- Effects below it clean up and run again.

Better if you want to preserve the subtree:

```jsx
function Notice({ asWarning }) {
  return (
    <section className={asWarning ? "warning" : "info"}>
      <Counter />
    </section>
  );
}
```

Now the host type stays `"section"`, so React can reuse the same subtree and update only the class.

---

## 6. Rule 1 for React Component Elements

For component elements, `type` is the component function or class reference.

```jsx
function UserCard() {
  return <p>User</p>;
}

function AdminCard() {
  return <p>Admin</p>;
}
```

### Same Component Type: Preserve the Instance/Fiber State

```jsx
function Profile({ role }) {
  return <UserCard role={role} />;
}
```

If only `role` changes:

```txt
old type: UserCard
new type: UserCard
```

React reuses the component's fiber. Its hook state can be preserved, and React re-renders it with new props.

### Different Component Type: Reset the Subtree

```jsx
function Profile({ isAdmin }) {
  return isAdmin ? <AdminCard /> : <UserCard />;
}
```

When `isAdmin` changes:

```txt
old type: UserCard
new type: AdminCard
```

React unmounts `UserCard` and mounts `AdminCard`.

Result:

- `UserCard` state is destroyed.
- `UserCard` effects clean up.
- `AdminCard` starts with fresh state.
- Any DOM under the old component subtree may be recreated.

### Common Pitfall: Defining a Component Inside Another Component

```jsx
import { useState } from "react";

function Parent() {
  const [count, setCount] = useState(0);

  function TextInput() {
    const [text, setText] = useState("");

    return (
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    );
  }

  return (
    <>
      <TextInput />
      <button onClick={() => setCount((c) => c + 1)}>
        Parent count: {count}
      </button>
    </>
  );
}
```

Every render of `Parent` creates a new `TextInput` function reference. From React's perspective:

```txt
old type: previous TextInput function
new type: new TextInput function
```

So React sees a different component type at the same position and resets the input state.

Fix:

```jsx
import { useState } from "react";

function TextInput() {
  const [text, setText] = useState("");

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
    />
  );
}

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TextInput />
      <button onClick={() => setCount((c) => c + 1)}>
        Parent count: {count}
      </button>
    </>
  );
}
```

Now `TextInput` has a stable function identity.

---

## 7. Rule 2: Stable Keys Preserve Child Identity

### Interview Definition

Keys let React match children between renders within the same parent. A stable key says: "this child represents the same logical item as before."

Without keys, React uses position:

```txt
first child -> first child
second child -> second child
third child -> third child
```

With keys, React uses key identity:

```txt
key="a" -> key="a"
key="b" -> key="b"
key="c" -> key="c"
```

Key rules:

- Keys must be unique among siblings, not globally unique.
- Keys must be stable across renders.
- Do not generate keys during render with `Math.random()` or `Date.now()`.
- Avoid array indexes as keys if items can be inserted, deleted, sorted, filtered, or reordered.
- A key is special to React. It is not available as `props.key`.

---

## 8. Rule 2 for DOM Elements

Imagine a list of real DOM `<li>` nodes.

### Without Stable Keys

```jsx
function TeamList({ teams }) {
  return (
    <ul>
      {teams.map((team, index) => (
        <li key={index}>{team.name}</li>
      ))}
    </ul>
  );
}
```

Initial data:

```js
[
  { id: "duke", name: "Duke" },
  { id: "villanova", name: "Villanova" },
]
```

After prepending:

```js
[
  { id: "connecticut", name: "Connecticut" },
  { id: "duke", name: "Duke" },
  { id: "villanova", name: "Villanova" },
]
```

With index keys:

```txt
old key 0: Duke
old key 1: Villanova

new key 0: Connecticut
new key 1: Duke
new key 2: Villanova
```

React thinks:

```txt
key 0 is still the same child, update Duke -> Connecticut
key 1 is still the same child, update Villanova -> Duke
key 2 is new, mount Villanova
```

The UI text may look correct after updates, but React reused the wrong DOM identities. This becomes dangerous with uncontrolled inputs, animations, focus, or local DOM state.

### With Stable Keys

```jsx
function TeamList({ teams }) {
  return (
    <ul>
      {teams.map((team) => (
        <li key={team.id}>{team.name}</li>
      ))}
    </ul>
  );
}
```

Now React sees:

```txt
new key "connecticut" -> mount new li
old key "duke"        -> reuse/move existing li
old key "villanova"   -> reuse/move existing li
```

The DOM identity follows the data item instead of following the array index.

Analogy: `key={index}` is like identifying students by their current bench number. If a new student sits at the first bench, everyone after them appears to become a different student. `key={student.id}` is like using roll numbers. Students can move seats, but their identity remains stable.

---

## 9. Rule 2 for React Component Elements

Keys matter even more when list items are components with state.

```jsx
import { useState } from "react";

function TodoItem({ todo }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.done}
          readOnly
        />
        {todo.text}
      </label>

      <button onClick={() => setIsEditing((v) => !v)}>
        {isEditing ? "Close" : "Edit"}
      </button>
    </li>
  );
}

function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}
```

If the list is sorted:

```txt
old order: key="a", key="b", key="c"
new order: key="c", key="a", key="b"
```

React can keep each `TodoItem` fiber matched to the same todo:

```txt
key "a" keeps its isEditing state
key "b" keeps its isEditing state
key "c" keeps its isEditing state
```

So if todo `"b"` was in edit mode, it remains in edit mode after sorting.

Bad version:

```jsx
function TodoList({ todos }) {
  return (
    <ul>
      {todos.map((todo, index) => (
        <TodoItem key={index} todo={todo} />
      ))}
    </ul>
  );
}
```

Now the state follows the position, not the todo item. After sorting, "edit mode" may appear on the wrong todo.

---

## 10. Keys Can Also Intentionally Reset State

Sometimes two components of the same type at the same position should be treated as completely separate instances. React gives you two options to achieve this.

### Option 1: Render in Different Positions

Render each variant in its own conditional slot so they occupy distinct positions in the render tree:

```jsx
import { useState } from "react";

function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);
  return (
    <div>
      {isPlayerA && <Counter person="Taylor" />}
      {!isPlayerA && <Counter person="Sarah" />}
      <button onClick={() => setIsPlayerA((v) => !v)}>Next player</button>
    </div>
  );
}
```

Taylor's `Counter` lives at slot 0 and Sarah's at slot 1. When you switch, the old `Counter` unmounts from its slot and a fresh one appears in the other slot. No key is needed here because the two components never share the same tree position.

This approach is clean for two or three alternatives. It becomes verbose at scale.

### Option 2: Use a Changed Key

Keys are not only for arrays. They can also tell React that two components in the same position are conceptually different.

```jsx
import { useState } from "react";

function Chat({ contact }) {
  const [message, setMessage] = useState("");

  return (
    <section>
      <h2>Chat with {contact.name}</h2>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
    </section>
  );
}

function Messenger({ selectedContact }) {
  return <Chat key={selectedContact.id} contact={selectedContact} />;
}
```

When `selectedContact.id` changes:

```txt
old key: "alice"
new key: "bob"
same type: Chat
```

Because the key changed, React treats it as a different `Chat` instance. The text area state resets, which is good because Alice's unsent message should not accidentally appear in Bob's chat.

If you remove the key:

```jsx
function Messenger({ selectedContact }) {
  return <Chat contact={selectedContact} />;
}
```

React sees the same `Chat` component at the same position, so it preserves the `message` state while changing only the props. That may be wrong for a chat app.

---

## 11. Type and Key Together: The Actual Identity Rule

A stable key alone is not enough. The type must match too.

```jsx
function Result({ item }) {
  return item.kind === "user" ? (
    <UserRow key={item.id} user={item} />
  ) : (
    <TeamRow key={item.id} team={item} />
  );
}
```

If an item keeps the same key but changes type:

```txt
old: key="42", type=UserRow
new: key="42", type=TeamRow
```

React does not reuse the old `UserRow` instance as `TeamRow`. Different type wins, so the old component is unmounted and the new one is mounted.

For DOM elements:

```jsx
function Row({ asLink }) {
  return asLink ? (
    <a key="row" href="/profile">Profile</a>
  ) : (
    <button key="row">Profile</button>
  );
}
```

Even though the key is the same:

```txt
old: key="row", type="button"
new: key="row", type="a"
```

React replaces the host node because the DOM element type changed.

Interview line:

> Keys help React find the matching sibling. Type decides whether that matched sibling can actually be reused.

---

## 12. Child Diffing in a Small Example

React uses two different strategies depending on whether children have keys:

| Children | Matching strategy |
|----------|-------------------|
| **No keys** | Compare sequentially by position — first new child → first old child, second → second, and so on. Inserting at the beginning causes every subsequent sibling to look "different". |
| **With keys** | Build a lookup map of old children by key, then match each new child by key. Supports efficient reordering, insertion, and deletion. |

The example below uses keys, so React uses the map-based approach:

Old render:

```jsx
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

New render:

```jsx
<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```

React's mental process:

```txt
parent type "ul" is same -> reuse ul

old children map:
  "2015" -> li Duke
  "2016" -> li Villanova

new child "2014" -> not found -> create new li
new child "2015" -> found and type is "li" -> reuse Duke
new child "2016" -> found and type is "li" -> reuse Villanova

commit:
  insert Connecticut before Duke
  keep Duke and Villanova identities
```

This is why stable keys make prepending efficient and safer.

---

## 13. Practical Checklist for Real Projects

Use this when writing React code:

- If you only change styling, keep the same element type and change `className`.
- If a component's state should survive re-renders, keep the same component type at the same tree position.
- Do not define component functions inside other component functions.
- In lists, use stable IDs from the data: `key={user.id}`.
- Avoid `key={index}` when the list can reorder, filter, insert, or delete items.
- Never use `key={Math.random()}` or `key={Date.now()}`.
- Put the key on the top-level element returned from `map`.
- If one item returns multiple sibling nodes, use `<Fragment key={id}>`.
- Use a changed key intentionally when you want to reset a subtree, such as a form or chat draft.

Fragment example:

```jsx
import { Fragment } from "react";

function PeopleList({ people }) {
  return (
    <>
      {people.map((person) => (
        <Fragment key={person.id}>
          <h2>{person.name}</h2>
          <p>{person.bio}</p>
        </Fragment>
      ))}
    </>
  );
}
```

---

## 14. Interview Answer Template

Use this as a concise answer:

> React diffing is part of reconciliation. On every update, React creates a new React element tree and compares it with the previous fiber tree. To keep this comparison fast, React uses two main heuristics. First, if two elements have different types, React assumes they produce different subtrees, so it unmounts the old subtree and mounts a new one. For DOM elements, changing `div` to `section` replaces that host subtree. For component elements, changing `UserCard` to `AdminCard` resets the component state below it. Second, keys give children stable identity among siblings. With stable keys, React can match the same item across renders even if it moved, preserving DOM nodes and component state. Bad keys like indexes or random values make identity unstable, which can cause unnecessary remounts, wrong local state, and poor performance.

---

## 15. Common Interview Traps

### Trap 1: "Virtual DOM is the real DOM"

Wrong. React elements are plain objects. Real DOM nodes are browser objects created or updated during commit.

### Trap 2: "Re-render means remount"

Wrong. Re-render means React calls component functions again. Remount happens only when identity changes, such as different type or different key.

### Trap 3: "Keys must be globally unique"

Wrong. Keys must be unique among siblings under the same parent.

### Trap 4: "A stable key always preserves state"

Incomplete. The key and type must both match, and the match is scoped to the same parent.

### Trap 5: "Index keys are always wrong"

Too strong. Index keys are acceptable only for static lists that never reorder, insert, delete, or filter. In dynamic lists, they are risky.

### Trap 6: "React uses the JSX code position to track identity"

Wrong. React tracks identity using the **rendered output tree**, not the structure of your JSX source code. A component at the same position in the render tree across two different `if` branches is treated as the same instance — its state is preserved even when the JSX code looks completely different on each branch. See the Critical Pitfall note in Section 3 for the example.

---

## 16. Final Analogy

Think of React as a college exam coordinator comparing yesterday's seating plan with today's seating plan.

- **Element type** is the room or exam format. If a lab exam becomes a written hall exam, the coordinator does not preserve the same internal arrangement.
- **Position** is the default seat number. Without roll numbers, the coordinator assumes "first seat yesterday" matches "first seat today".
- **Key** is the student's roll number. With roll numbers, the coordinator can identify the same student even if they move seats.
- **Component state** is the student's personal answer sheet. If the same student is matched, the answer sheet stays with them. If identity is wrong, the answer sheet can move to the wrong student or get discarded.

That is the core of React diffing: preserve work when identity is stable, reset work when identity changes.
