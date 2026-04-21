# 124 — Components, Instances & Elements in React

> **Target Audience:** Final-year CSE students preparing for SDE / frontend interviews.
> **Goal:** Deeply understand the three fundamental building blocks React uses internally so you never confuse them again — in code or in an interview.

---

## The Mental Model First 🧠

Most beginners treat all three as the same thing. They are NOT. Here is the single-line summary before we dive deep:

| Concept | What it is | Lives where |
|---|---|---|
| **Component** | A JavaScript function (or class) — the blueprint | Your source file |
| **Component Instance** | React's internal live object created when it renders a component | React's Fiber tree (in memory) |
| **React Element** | A plain, immutable JS object describing *what* to render | Return value of a render call |

They form a **pipeline**:

```
Component (blueprint)
   ↓  React calls it
Component Instance (live, owns state/effects)
   ↓  returns
React Element(s) (plain JS objects)
   ↓  React processes
Real DOM Node
```

---

## 1. React Component — The Blueprint 📐

### What is it?

A React **component** is simply a **JavaScript function** (or class) defined in your source code. It is a description of UI — a template, a recipe, a blueprint. By itself, it does **nothing**. It has no state, no lifecycle, no DOM output — it's just a function sitting in memory.

```js
// This is a COMPONENT — a blueprint.
// It's just a JS function. It's passive.
function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true);
  const [likes, setLikes] = useState(0);

  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p>}
      {/* ... */}
    </div>
  );
}
```

> **Analogy:** `TabContent` is like the **architectural blueprint** of a house. The blueprint itself is not a house — it's just ink on paper. You can have one blueprint and build hundreds of houses from it.

### Key characteristics:
- Just a **function reference** in JS (`typeof TabContent === 'function'`)
- Starts with a **capital letter** (React convention to distinguish from HTML tags)
- **Reusable** — the same component definition can be used multiple times
- Defined **once**, used **many times**

---

## 2. Component Instance — The Living Object 🏠

### What is it?

A **component instance** is what React creates internally (inside its Fiber tree) when it **renders** a component. Every time React encounters `<TabContent item={x} />` in the tree, it either creates a new instance or reuses an existing one.

Each instance:
- Owns its **own state** (`likes`, `showDetails` are per-instance)
- Owns its **own effects** (useEffect runs per instance)
- Has its own **lifecycle** (mount → update → unmount)
- Is tracked by React's **Fiber** data structure

```js
// Inside Tabbed — React creates/maintains ONE TabContent instance here
{activeTab <= 2 ? (
  <TabContent item={content.at(activeTab)} />  // ← ONE instance at this tree position
) : (
  <DifferentContent />
)}
```

### The crucial rule: Identity by tree position + component type

React decides whether to **reuse or destroy** an instance based on:
1. **Same position** in the component tree?
2. **Same component type** at that position?

```
// Switching from Tab 0 → Tab 1 → Tab 2:
// Position: same ✅ | Type: TabContent ✅ → React REUSES the instance → STATE IS PRESERVED 💾

// Switching from Tab 2 → Tab 3:
// Position: same ✅ | Type: DifferentContent ≠ TabContent ❌ → React DESTROYS old + CREATES new → STATE RESETS 💥

// Switching back from Tab 3 → Tab 0:
// React creates a FRESH TabContent instance → likes = 0 again
```

> **Analogy:** If `TabContent` is the blueprint, then each rendered `<TabContent />` in your tree is an **actual house built from that blueprint**. House A and House B have the same design (blueprint) but completely **independent furniture (state)**. Renovating House A doesn't affect House B.

### You cannot access instances directly

Unlike class-based OOP, in React you **never hold a reference** to a component instance yourself (unless using `useImperativeHandle` + `forwardRef`). React manages them internally.

---

## 3. React Element — The Order Form 📋

### What is it?

A **React Element** is a **plain, lightweight JavaScript object** — nothing more, nothing less. It is what a component **returns** from its render function. It is also what JSX compiles to.

It is **not** a DOM node. It is **not** a component instance. It is just a **description** of what should appear on screen.

### What does it look like?

```js
// JSX syntax:
const element = <TabContent item={content[0]} />;

// The above compiles to:
const element = React.createElement(TabContent, { item: content[0] });

// Which produces this plain JS object:
{
  $$typeof: Symbol(react.element),  // security marker
  type: TabContent,                 // the component function
  key: null,
  ref: null,
  props: {
    item: {
      summary: "React is a library for building UIs",
      details: "Dolor in reprehenderit..."
    }
  }
}
```

You can verify this yourself in the browser console:

```js
import { createElement } from 'react';

const el = createElement('h1', { className: 'greeting' }, 'Hello World');
console.log(el);
// Output: { $$typeof: Symbol(react.element), type: 'h1', props: { className: 'greeting', children: 'Hello World' }, ... }
```

### Key characteristics:
- **Immutable** — React freezes it in dev mode. You cannot modify an element after creation.
- **Cheap to create** — just a plain object, no DOM work involved
- **Describes, does not create** — it tells React *what* to render, React decides *how*
- **Thrown away** every render and recreated fresh

> **Analogy:** A React Element is like an **order form at a restaurant**. Writing `<TabContent item={x} />` is filling out an order: "I'd like one TabContent, with this item prop". The waiter (React) takes the form, looks up the kitchen (component instance) that handles this order, and prepares the actual meal (DOM update). The order form itself is not food.

---

## 4. The Full Rendering Pipeline 🔁

```
Your JSX Code
   ↓
Babel/JSX Transform compiles <TabContent item={x} /> to:
   ↓
React.createElement(TabContent, { item: x })    ← produces a React ELEMENT (plain object)
   ↓
React's reconciler receives the element tree
   ↓
React checks: is there already a component INSTANCE at this tree position?
   ↓
  YES (same type) → React calls the function again with new props → UPDATE
  NO  (new/different type) → React creates a new INSTANCE → MOUNT
   ↓
The instance's render function runs → returns more React ELEMENTS
   ↓
React repeats this recursively until all leaves are native HTML elements
   ↓
React Fiber commits the minimal DOM changes → Browser paints
```

---

## 5. JSX Under the Hood — What Actually Happens 🔬

### Classic transform (React 16 and older)

```jsx
// JSX you write:
function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

// Babel transforms to (classic):
function App() {
  return React.createElement(
    "div",
    null,
    React.createElement(Tabbed, { content: content })
  );
}
```

### Modern automatic transform (React 17+)

```jsx
// Babel transforms to (new JSX transform):
import { jsx as _jsx } from "react/jsx-runtime";

function App() {
  return _jsx("div", {
    children: _jsx(Tabbed, { content: content })
  });
}
```

Both produce the same React element objects — the difference is you no longer need `import React from 'react'` at the top of every file in React 17+.

### Inspecting an element object:

```js
// In your browser console, add this temporarily to App.js:
const el = <Tabbed content={content} />;
console.log(el);

// You'll see:
// {
//   $$typeof: Symbol(react.element),
//   type: ƒ Tabbed({ content }),   ← the function itself
//   key: null,
//   ref: null,
//   props: { content: [...] }
// }
```

---

## 6. Practical Walkthrough with App.js 🧪

Let's trace through what React does when your `App` component renders:

```js
// 1. App() is called by React
export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}
// React receives: { type: 'div', props: { children: { type: Tabbed, props: { content } } } }
```

```js
// 2. React sees type=Tabbed (a function, not an HTML string)
//    → It looks in the Fiber tree: is there already a Tabbed instance at this position?
//    → First render: NO → creates a new Tabbed instance, calls Tabbed({ content })

function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0); // 👈 this state lives on the Tabbed INSTANCE
  // ...
}
// Returns elements: { type: 'div', ... } containing Tab and TabContent elements
```

```js
// 3. React sees <TabContent item={content.at(0)} /> in Tabbed's output
//    → Creates a TabContent INSTANCE (only one at this tree position)
//    → Calls TabContent({ item: content[0] })

function TabContent({ item }) {
  const [showDetails, setShowDetails] = useState(true); // ← lives on THIS TabContent instance
  const [likes, setLikes] = useState(0);                // ← lives on THIS TabContent instance
}
```

```js
// 4. User clicks Tab 2 → setActiveTab(1)
//    → Tabbed re-renders → calls TabContent({ item: content.at(1) })
//    → SAME position, SAME type (TabContent) → React REUSES the instance
//    → ❗ likes and showDetails are UNCHANGED (state is preserved!)
//    → Only the `item` prop changes

// 5. User clicks Tab 4 → setActiveTab(3) → condition becomes false
//    → React renders DifferentContent instead of TabContent
//    → SAME position, DIFFERENT type → React DESTROYS TabContent instance
//    → All state (likes, showDetails) is LOST 💥

// 6. User clicks Tab 1 again → setActiveTab(0)
//    → React renders TabContent again
//    → SAME position, same type BUT the old instance was destroyed
//    → React creates a BRAND NEW TabContent instance
//    → likes = 0, showDetails = true (back to defaults)
```

---

## 7. Interview Q&A 💼

**Q1: What is the difference between a React component and a React element?**
> A **component** is a function/class definition — just JavaScript code. A **React element** is the plain JS object produced by calling that component (or by JSX). The component is the recipe; the element is the dish description; the DOM node is the actual dish.

**Q2: Can a single component have multiple instances?**
> Yes. Using `<Profile />` three times in a `Gallery` creates three separate `Profile` instances, each with its own state and lifecycle. They share the same blueprint (component function) but are completely independent.

**Q3: What does JSX compile to?**
> JSX compiles to `React.createElement(type, props, ...children)` calls (React 16) or `_jsx(type, props)` calls from `react/jsx-runtime` (React 17+). Both return a **React element** — a plain JavaScript object with `type`, `props`, `key`, and `ref` fields.

**Q4: Are React elements mutable?**
> No. React elements are **immutable**. Once created, you cannot change their props or children. If UI needs to change, React creates a new element tree and reconciles the differences.

**Q5: Why does switching to a different component type reset state?**
> Because React identifies instances by their **position in the component tree + component type**. When the type changes (e.g., `TabContent` → `DifferentContent`), React interprets this as a completely different UI — it unmounts the old instance (destroying all state) and mounts a fresh new one.

**Q6: What is `$$typeof: Symbol(react.element)` in a React element?**
> It's a **security marker**. Since Symbols cannot be serialized to JSON, this prevents a malicious server from sending a fake React element as JSON (XSS vector). React checks for this symbol before rendering anything.

**Q7: Where does component state live?**
> State lives on the **component instance** — specifically inside React's internal **Fiber node** for that instance. It does NOT live inside the element (which is immutable and recreated every render) and does NOT live inside the component function itself (which is just a blueprint).

---

## 8. Quick Reference Cheat Sheet 📌

```
┌─────────────────────────────────────────────────────────────────────────┐
│                     THE THREE REACT ENTITIES                            │
├──────────────────┬──────────────────────────┬───────────────────────────┤
│  COMPONENT       │  COMPONENT INSTANCE      │  REACT ELEMENT            │
├──────────────────┼──────────────────────────┼───────────────────────────┤
│ function TabContent │ React's internal fiber│ { type: TabContent,       │
│ ({ item }) { ... }  │ node for one render   │   props: { item: ... },   │
│                  │ position                 │   key: null, ref: null }  │
├──────────────────┼──────────────────────────┼───────────────────────────┤
│ Blueprint/recipe │ Actual house / cookie    │ Order form / blueprint    │
│                  │ made from the cutter     │ print handed to builder   │
├──────────────────┼──────────────────────────┼───────────────────────────┤
│ Just a function  │ Owns state & effects     │ Plain JS object           │
│ in your file     │ Lives in Fiber tree      │ Immutable, cheap          │
├──────────────────┼──────────────────────────┼───────────────────────────┤
│ Created once     │ Created/destroyed by     │ Created fresh every       │
│ (in your code)   │ React as needed          │ render cycle              │
└──────────────────┴──────────────────────────┴───────────────────────────┘
```

---

## 9. Common Gotchas to Mention in Interviews ⚠️

1. **Never define a component inside another component.**
   ```js
   // ❌ BAD — React creates a NEW component type every render → instance is destroyed every render!
   function Outer() {
     function Inner() { return <p>hello</p>; } // new function reference = new type every render
     return <Inner />;
   }

   // ✅ GOOD — define at module level
   function Inner() { return <p>hello</p>; }
   function Outer() { return <Inner />; }
   ```

2. **React elements are NOT DOM nodes.** They are virtual descriptions. The actual DOM work happens in the commit phase after reconciliation.

3. **Calling a component as a function bypasses React entirely** — no instance, no hooks, no lifecycle:
   ```js
   // ❌ This bypasses the instance — hooks won't work correctly
   const result = TabContent({ item: content[0] });

   // ✅ This creates a proper element React can manage
   const result = <TabContent item={content[0]} />;
   ```

4. **`key` prop forces instance replacement.** Adding/changing a `key` tells React "treat this as a completely new instance" even if the component type and position are the same — useful for forcing state reset.
   ```js
   // Changing key destroys old instance and creates fresh one
   <TabContent key={activeTab} item={content.at(activeTab)} />
   ```

---

*Source: React Official Docs (react.dev) · Jonas Schmedtmann — The Ultimate React Course 2025 · Section 11*
