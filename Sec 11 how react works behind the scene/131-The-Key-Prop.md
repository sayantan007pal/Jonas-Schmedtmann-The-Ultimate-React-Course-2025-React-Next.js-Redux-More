# 131 — The `key` Prop in React

> **Target audience:** Final-year CSE student preparing for interviews.
> This note covers the **key** prop end-to-end: what it is, how React uses it internally, stable keys in lists, and the advanced pattern of changing `key` to reset state — all with real code and analogies.

---

## Table of Contents

1. [What Is the `key` Prop?](#1-what-is-the-key-prop)
2. [Stable Keys in Lists](#2-stable-keys-in-lists)
3. [Changing `key` to Reset State](#3-changing-key-to-reset-state)
4. [Summary & Analogies](#4-summary--analogies)
5. [Interview Cheatsheet](#5-interview-cheatsheet)

---

## 1. What Is the `key` Prop?

The `key` prop is a **special reserved prop** in React (like `ref`). It is **not passed to the component** — your component can never read `props.key`. It is **only used internally by React** as a hint during the [reconciliation (diffing) algorithm](https://react.dev/learn/preserving-and-resetting-state).

### Why does React need it?

React renders your UI as a **virtual DOM tree**. On every re-render, React compares the new tree with the previous one (**diffing**) and only updates the real DOM where things actually changed.

When React encounters a **list of elements** (siblings), it needs a way to track:
- Which element was **added**?
- Which element was **removed**?
- Which element just **moved**?

Without `key`, React falls back to comparing by **index position** — a fragile strategy that causes bugs.

With `key`, React uses a **stable identity** to track each element across renders.

### Syntax

```jsx
<li key={uniqueValue}>...</li>

// key must be a string or a number
// it must be UNIQUE among siblings (not globally)
```

> ⚠️ `key` is NOT a prop — it's special metadata.
> If your component needs the same value, pass it as a **separate prop**:
> ```jsx
> <Profile key={user.id} userId={user.id} />
> //         ↑ for React      ↑ for your component
> ```

---

## 2. Stable Keys in Lists

### The Problem: No Keys → Position-Based Matching

```jsx
// ❌ Missing key — React will warn:
// "Each child in a list should have a unique 'key' prop."

const fruits = ['Apple', 'Banana', 'Cherry'];

function FruitList() {
  return (
    <ul>
      {fruits.map(fruit => (
        <li>{fruit}</li>  // No key!
      ))}
    </ul>
  );
}
```

React renders this like:

```
Position 0 → <li>Apple</li>
Position 1 → <li>Banana</li>
Position 2 → <li>Cherry</li>
```

Now suppose you **delete Banana** from the array. React sees:

```
Position 0 → <li>Apple</li>   ← same (ok)
Position 1 → <li>Cherry</li>  ← CHANGED (React updates the DOM text)
Position 2 → (missing)        ← React removes this node
```

React **unnecessarily mutates** position 1 instead of simply **removing** the old position 1. This is wasteful and, more critically, **destroys state** of the wrong component when components have internal state.

---

### The Solution: Stable Keys from Data

```jsx
// ✅ Correct — use a stable, unique ID from your data

const people = [
  { id: 1, name: 'Turing' },
  { id: 2, name: 'Knuth'  },
  { id: 3, name: 'Hopper' },
];

function PeopleList() {
  return (
    <ul>
      {people.map(person => (
        <li key={person.id}>        {/* ← stable database ID */}
          {person.name}
        </li>
      ))}
    </ul>
  );
}
```

Now React tracks **by identity, not position**:

```
key="1" → Turing
key="2" → Knuth
key="3" → Hopper
```

Delete Knuth → React simply removes the DOM node for `key="2"`. No other nodes are touched.

---

### Where to Get Keys?

| Data Source | Best Key Strategy |
|---|---|
| Database / API | Use the DB primary key / `id` field (naturally unique) |
| Locally generated data (e.g., a note-taking app) | Use `crypto.randomUUID()` or the `uuid` package — generate at **creation time**, not render time |
| Static / known array | Use a meaningful, stable string (`'settings'`, `'profile'`) |

---

### Anti-Pattern 1: Index as Key

```jsx
// ❌ DO NOT USE array index as key when the list can change order

{items.map((item, index) => (
  <ListItem key={index} item={item} />  // Dangerous!
))}
```

**Why is this bad?**

Imagine you have a TODO list with 3 items. User deletes item at index 0:

```
Before:  [0: "Buy milk", 1: "Walk dog", 2: "Code React"]
After:   [0: "Walk dog", 1: "Code React"]
```

React sees `key=0` before and `key=0` after → treats them as the **same component**. If "Buy milk" had a checkbox `checked=true`, "Walk dog" might now show as checked — **wrong state!**

> ✅ **When is index OK?** Only when the list is **static** (never reorders, inserts, or deletes). For example, a fixed navigation menu.

---

### Anti-Pattern 2: `Math.random()` or `Date.now()` as Key

```jsx
// ❌ NEVER do this — generates a new key on every render

{items.map(item => (
  <ListItem key={Math.random()} item={item} />  // Bug factory!
))}
```

**Why is this bad?**

Every render generates a completely new set of keys. React thinks **every item is brand new** on every render. It destroys all existing DOM nodes and creates fresh ones — losing all component state, focus, animations, and causing terrible performance.

---

### Key on `<Fragment>`

Sometimes each list item renders multiple sibling elements. Wrap them in a `Fragment` **with** a key:

```jsx
import { Fragment } from 'react';

{people.map(person => (
  // Must use the explicit <Fragment> syntax (not <>) to accept a key
  <Fragment key={person.id}>
    <dt>{person.name}</dt>
    <dd>{person.role}</dd>
  </Fragment>
))}
```

> `<>...</>` shorthand does **not** support the `key` attribute.

---

### Rules of Keys (Summary)

```
✅ Keys must be UNIQUE among siblings in the same array
✅ Keys must be STABLE — same item always gets the same key
✅ Keys must be a string or number
❌ Keys must NOT be index when the list can mutate
❌ Keys must NOT be randomly generated at render time
❌ Keys are NOT accessible as props inside the component
```

---

## 3. Changing `key` to Reset State

This is the **advanced superpower** of `key`. It's not limited to lists — you can put a `key` on **any component** to control when React should **destroy and recreate** it (resetting all its state).

### How React Tracks State: Position in the Tree

React stores state **outside** the component — inside React's own memory, associated with a specific **position in the render tree**.

```
React's mental model:
  App
  └── div
      └── Counter  (position: first child of div)
              └── state: { count: 0 }
```

**Rule:** As long as the same component type is rendered at the same position, React **preserves its state**.

```jsx
function App() {
  const [isFancy, setIsFancy] = useState(false);
  return (
    <div>
      {/* Same position, same type → state is PRESERVED when isFancy changes */}
      {isFancy ? <Counter isFancy={true} /> : <Counter isFancy={false} />}
    </div>
  );
}
```

Even though `isFancy` flips, both branches render `<Counter>` at the same position → React sees the **same component** → **state is never reset**.

---

### The Problem: Scoreboard with Stale State

```jsx
function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);

  return (
    <div>
      {/* Bug: Both players share the same Counter instance! */}
      {isPlayerA ? (
        <Counter person="Taylor" />
      ) : (
        <Counter person="Sarah" />
      )}
      <button onClick={() => setIsPlayerA(!isPlayerA)}>
        Next player!
      </button>
    </div>
  );
}

function Counter({ person }) {
  const [score, setScore] = useState(0);

  return (
    <div>
      <h2>{person}'s score: {score}</h2>
      <button onClick={() => setScore(score + 1)}>+1</button>
    </div>
  );
}
```

**Problem:** Taylor scores 5 points → click "Next player" → Sarah starts with **5 points** already!

React sees: `<Counter>` at position 0 before → `<Counter>` at position 0 after → **same component** → state preserved. It's a bug.

---

### The Fix: Give Each Instance a Different `key`

```jsx
function Scoreboard() {
  const [isPlayerA, setIsPlayerA] = useState(true);

  return (
    <div>
      {/* ✅ Different keys → React treats these as DIFFERENT components */}
      {isPlayerA ? (
        <Counter key="Taylor" person="Taylor" />
      ) : (
        <Counter key="Sarah" person="Sarah" />
      )}
      <button onClick={() => setIsPlayerA(!isPlayerA)}>
        Next player!
      </button>
    </div>
  );
}
```

Now when `isPlayerA` flips:
- Old: `key="Taylor"` → React **unmounts** it, destroying all state
- New: `key="Sarah"` → React **mounts** a fresh instance with `score = 0`

**Switching from Taylor → Sarah → Taylor always starts at 0. ✅**

---

### Real-World Use Case 1: Chat App (Form Reset)

```jsx
// Without key — typing in the chat box persists when you switch contacts (Bug!)
function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList contacts={contacts} onSelect={setTo} />
      <Chat contact={to} />   {/* ❌ Same instance, message carries over */}
    </div>
  );
}

// With key — each contact gets its own fresh Chat instance
function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList contacts={contacts} onSelect={setTo} />
      <Chat key={to.id} contact={to} />   {/* ✅ New key = new instance = empty input */}
    </div>
  );
}

function Chat({ contact }) {
  const [message, setMessage] = useState('');

  return (
    <div>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder={`Message ${contact.name}...`}
      />
      <button>Send</button>
    </div>
  );
}
```

---

### Real-World Use Case 2: Quiz App (Reset Answer on New Question)

```jsx
function QuizApp() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const question = questions[questionIndex];

  return (
    <div>
      <h2>Question {questionIndex + 1}</h2>
      {/* Without key: user's selected answer persists on next question */}
      {/* With key: each question gets a fresh QuestionCard instance */}
      <QuestionCard key={question.id} question={question} />
      <button onClick={() => setQuestionIndex(i => i + 1)}>
        Next Question
      </button>
    </div>
  );
}

function QuestionCard({ question }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  return (
    <div>
      <p>{question.text}</p>
      {question.options.map(option => (
        <button
          key={option}
          onClick={() => setSelectedAnswer(option)}
          style={{ fontWeight: selectedAnswer === option ? 'bold' : 'normal' }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
```

---

### Real-World Use Case 3: Profile Form Reset

```jsx
function AdminPanel() {
  const [selectedUserId, setSelectedUserId] = useState(null);

  return (
    <div>
      <UserList onSelect={setSelectedUserId} />
      {selectedUserId && (
        // key ensures form fields clear when switching between users
        <EditUserForm key={selectedUserId} userId={selectedUserId} />
      )}
    </div>
  );
}
```

---

## 4. Summary & Analogies

### The Big Picture

```
key prop has TWO uses:
┌─────────────────────────────┬──────────────────────────────────────────┐
│ Use Case 1: Lists           │ Use Case 2: Force State Reset            │
├─────────────────────────────┼──────────────────────────────────────────┤
│ key is STABLE               │ key CHANGES                              │
│ Same item → same key always │ New data/context → new key               │
│ Helps React diff efficiently│ Tells React: "treat this as a new mount" │
│ e.g. key={person.id}        │ e.g. key={selectedUser.id}               │
└─────────────────────────────┴──────────────────────────────────────────┘
```

---

### Analogy 1: The Attendance Register (Stable Keys in Lists)

Imagine a classroom. Without student IDs, the teacher marks attendance by **seat number**: seat 1 = student 1, seat 2 = student 2.

One day, Ravi (who sat at seat 2) is absent and everyone shifts forward. Now Priya is at seat 2. The teacher thinks **Ravi's records belong to Priya** — wrong!

With **unique student ID cards** (keys), it doesn't matter which seat they sit in. The teacher always matches records to the correct student. Even if students shuffle seats (reorder), the records are always accurate.

> **React without keys** = teacher using seat numbers.  
> **React with keys** = teacher using student ID cards.

---

### Analogy 2: Conference Name Tags (Key as Identity)

At a conference, each attendee wears a name tag. React associates each attendee's "conversation history" (component state) with their name tag.

If two people physically swap name tags, React would assign the wrong conversation history to each person — a bug.

When you **change someone's key** (give them a new name tag), React sees an entirely new person arriving, creates a fresh conversation history (fresh state), and discards the old one.

> Giving a component a **new key** = giving a new name tag = starting from scratch.

---

### Analogy 3: Chat Tabs (Key for Form Reset)

Think of how Gmail works. When you click on a different conversation thread, the compose box **clears**. Gmail doesn't let your half-typed reply to Alice accidentally appear when you open Bob's thread.

In React, this exact behavior is achieved with `key={conversation.id}` on the `<ComposeBox>`. Each conversation ID is a different "name tag" — React destroys Alice's compose box and mounts a fresh one for Bob.

---

### Mental Model: key as an Address

```
Without key: React identifies components by "house address" = position in the tree
             "first child of div" → always the same component

With key:    React identifies components by "passport number" = the key value
             Even if you live at a new address, your passport number is yours forever
```

---

## 5. Interview Cheatsheet

### Q1: What is the `key` prop in React?

> `key` is a special React prop used internally by the reconciliation algorithm to uniquely identify elements among siblings. It is not accessible inside the component as `props.key`. React uses it to efficiently update the DOM during re-renders.

---

### Q2: Why should you avoid using array `index` as a key?

> When items are added, removed, or reordered, their indices change. React would then incorrectly associate old state with new items (e.g., a checked checkbox from item 0 appearing on what used to be item 1). Use a stable, data-derived ID instead.

---

### Q3: Can you use `Math.random()` as a key? Why not?

> No. `Math.random()` generates a new key on every render. React sees all items as brand new every time, destroys and remounts all DOM nodes, losing all component state, input focus, and causing performance degradation.

---

### Q4: Are keys globally unique in React?

> No. Keys only need to be **unique among siblings** in the same array/parent. You can use the same key in two different lists — they won't conflict.

---

### Q5: How do you access the `key` value inside a component?

> You can't — `key` is not passed as a prop. If you need the value, pass it as a **separate prop**:
> ```jsx
> <Profile key={user.id} userId={user.id} />
> ```

---

### Q6: How can you use `key` to reset a component's state?

> By changing the `key` prop of a component, you signal to React that it is a completely different component instance. React unmounts the old one (destroying all its state) and mounts a fresh one. This is useful for resetting forms, clearing inputs, or reinitializing animations when context changes.
> ```jsx
> // Each time selectedContact.id changes, Chat mounts fresh
> <Chat key={selectedContact.id} contact={selectedContact} />
> ```

---

### Q7: What happens if two siblings have duplicate keys?

> React will log a warning and its behavior becomes unpredictable. Duplicate keys cause React to merge or skip state updates incorrectly. Always ensure keys are unique among siblings.

---

### Q8: How is `key` different from `id` (HTML attribute)?

> `key` is a React-internal identity hint used during virtual DOM diffing — it never appears in the real DOM. `id` is an actual HTML attribute written to the DOM, used for CSS styling, accessibility (`aria-labelledby`), and `document.getElementById`. They serve completely different purposes.

---

### Q9: What is a "stable key"?

> A stable key is one that remains the same for a given piece of data across all renders. For example, a database primary key (`user.id`) is stable because the same user always has the same ID. An unstable key (like `Math.random()` or array index with mutable lists) changes between renders and defeats the purpose of `key`.

---

### Q10: Can `key` be placed on non-list components?

> Yes! While `key` is most commonly seen on list items, it can be placed on **any component**. This is leveraged specifically to **force state resets** without conditional rendering tricks. It is an intentional, documented React pattern.

---

### Quick Reference Card

```
STABLE KEY (lists):
  ✅ key={item.id}          ← best: DB / API id
  ✅ key={item.uuid}        ← good: generated at creation time
  ⚠️ key={index}            ← ok only for static, non-sortable lists
  ❌ key={Math.random()}    ← never: recreates all DOM every render

CHANGING KEY (state reset):
  // Problem: Same component type at same position → state preserved
  {isPlayerA ? <Counter person="Taylor" /> : <Counter person="Sarah" />}
  //  ↑ Bug: Sarah starts with Taylor's score

  // Solution: Different key → different identity → state reset
  {isPlayerA
    ? <Counter key="Taylor" person="Taylor" />
    : <Counter key="Sarah"  person="Sarah"  />}

  // Classic patterns:
  <Chat key={contact.id} contact={contact} />         // form reset on switch
  <QuestionCard key={question.id} question={question}/> // quiz reset
  <EditForm key={selectedId} userId={selectedId} />   // profile editor reset

KEY RULES:
  - Not passed as props (use a separate prop if needed)
  - Unique among SIBLINGS only (not globally)
  - String or Number only
  - Must not change for the same logical item (stable)
  - Changing key = unmount + remount (state destroyed)
```

---

> **Source:** [React Docs — Rendering Lists](https://react.dev/learn/rendering-lists) | [React Docs — Preserving and Resetting State](https://react.dev/learn/preserving-and-resetting-state)
