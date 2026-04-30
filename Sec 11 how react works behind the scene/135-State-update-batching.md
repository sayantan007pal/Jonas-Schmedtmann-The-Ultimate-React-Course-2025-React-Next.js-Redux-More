# 135 — State Update Batching in React

> **Target audience:** Final-year CSE student | Interview-ready deep-dive
> **Verified against:** [react.dev — State as a Snapshot](https://react.dev/learn/state-as-a-snapshot) · [react.dev — Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates) · [react.dev — flushSync API reference](https://react.dev/reference/react-dom/flushSync) · [React 18 WG — Automatic Batching RFC by Dan Abramov](https://github.com/reactwg/react-18/discussions/21)

> **Core question:** Why does React group multiple `setState` calls into a single re-render, and what are all the implications of that decision?

---

## Table of Contents

1. [What is Batching? — The Big Picture](#1-what-is-batching--the-big-picture)
2. [Behind the Scenes — How React Queues State Updates](#2-behind-the-scenes--how-react-queues-state-updates)
3. [Why React Does This — Performance & Consistency](#3-why-react-does-this--performance--consistency)
4. [Batching Inside Event Handler Functions — Step-by-Step](#4-batching-inside-event-handler-functions--step-by-step)
5. [console.log in the Middle of Batched Updates — What Prints?](#5-consolelog-in-the-middle-of-batched-updates--what-prints)
6. [Why State Updates Are Asynchronous](#6-why-state-updates-are-asynchronous)
7. [Stale Closures & the Functional Updater Fix](#7-stale-closures--the-functional-updater-fix)
8. [React 18 — Automatic Batching Extended to Everything](#8-react-18--automatic-batching-extended-to-everything)
9. [Opting Out with `ReactDOM.flushSync()`](#9-opting-out-with-reactdomflushsync)
10. [Interview Summary, Mental Model & Analogies](#10-interview-summary-mental-model--analogies)

---

## 1. What is Batching? — The Big Picture

**Batching** means React collects multiple `setState` / `useState` setter calls that happen in the same synchronous block and processes them all together — triggering **only one re-render** at the end instead of one re-render per `setState` call.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [flag, setFlag]   = useState(false);

  function handleClick() {
    setCount(c => c + 1); // Does not re-render yet
    setFlag(f => !f);     // Does not re-render yet
    // React will only re-render once at the end (that's batching!)
  }

  return <button onClick={handleClick}>Next</button>;
}
```

> ✅ **Official source:** Dan Abramov in the [React 18 WG RFC](https://github.com/reactwg/react-18/discussions/21): *"Batching is when React groups multiple state updates into a single re-render for better performance."*

### Analogy — The Restaurant Waiter 🍽️

The React docs themselves use this analogy: a waiter doesn't run to the kitchen after every dish you order. They let you **finish your entire order**, then make **one trip**.

| Without Batching | With Batching (React's approach) |
|---|---|
| Waiter runs to kitchen after every item ordered | Waiter waits for the full order, then goes once |
| 3 `setState` calls = 3 renders | 3 `setState` calls = 1 render |
| Risk of "half-finished" UI states | Always consistent, fully updated UI |

> **Important:** React does NOT batch across separate user events. If you click a button twice, each click is its own independent batch. React ensures the DOM is fully updated before the next user-initiated event fires — so a form that disables on submit cannot be submitted twice.

---

---

## 2. Behind the Scenes — How React Queues State Updates

When you call a `useState` setter (e.g., `setCount(1)`), React does **not** immediately update the state variable or re-render. Instead:

```
setState call
     ↓
React pushes an "update" into the component's state queue
     ↓
Execution continues with the OLD state value (stale snapshot)
     ↓
When the current synchronous task finishes (e.g., event handler returns)...
     ↓
React processes ALL queued updates → computes NEW state
     ↓
React triggers exactly ONE re-render with the new state
```

### The Update Queue — Two Types of Entries

Each `setState` call adds one of two types of entries to the queue:

| Call style | What goes into the queue | How it's processed |
|---|---|---|
| `setState(5)` | "replace with `5`" | Ignores the current queued value, sets to `5` |
| `setState(n => n + 1)` | The updater function `n => n + 1` | Receives the latest queued value as `n` |

> ✅ **Official source** (react.dev): *"An updater function gets added to the queue. Any other value adds 'replace with [value]' to the queue, ignoring what's already queued."*

### Mixed Queue Example (from react.dev)

```jsx
<button onClick={() => {
  setNumber(number + 5);   // "replace with 5"
  setNumber(n => n + 1);   // updater: n => n + 1
  setNumber(42);           // "replace with 42"
}}>
```

React processes the queue during the **next render** like this:

| Queue entry | Incoming value | Result |
|---|---|---|
| "replace with 5" | 0 (ignored) | **5** |
| `n => n + 1` | 5 | **6** |
| "replace with 42" | 6 (ignored) | **42** |

Final state: **42**

> ⚠️ **Critical detail:** Updater functions run **during rendering** (when React processes the queue), not during the event handler. This means they must be **pure functions** — no side effects, no API calls. In React Strict Mode, each updater runs **twice** (but the second result is discarded) to help you catch impure updaters early.

---

## 3. Why React Does This — Performance & Consistency

### 3.1 Performance
Each re-render involves:
1. Calling the component function again
2. Diffing the virtual DOM (reconciliation)
3. Committing DOM changes

Without batching, 3 `setState` calls = 3 full render cycles. With batching = 1. For complex UIs with deeply nested trees, this is a massive saving.

### 3.2 State Consistency — Avoiding "Half-Finished" Renders (More Important!)

> ✅ **Official source** (react.dev): *"This also avoids dealing with confusing 'half-finished' renders where only some of the variables have been updated."*

Without batching, a re-render after `setCount` but before `setName` would show a UI where `count` is updated but `name` is still old — a split-second inconsistent state that is both visually wrong and a source of subtle bugs:

```
Without batching — potential UI flash:
  setCount(1) → render #1: count=1, name="Bob"  ← inconsistent!
  setName("Alice") → render #2: count=1, name="Alice"  ← correct

With batching — always consistent:
  setCount(1) + setName("Alice") → ONE render: count=1, name="Alice" ← always correct
```

---

## 4. Batching Inside Event Handler Functions — Step-by-Step

Let's trace through this example very carefully:

```jsx
function App() {
  const [answer, setAnswer] = useState("N");
  const [best, setBest]     = useState(true);
  const [liked, setLiked]   = useState(false);

  function handleReset() {
    setAnswer("N");   // step 2
    setBest(true);    // step 3
    setLiked(false);  // step 4
    // step 5: re-render happens AFTER this function returns
  }

  return <button onClick={handleReset}>Reset</button>;
}
```

**Execution Timeline:**

| Step | What Happens | Re-render? |
|------|-------------|------------|
| 1 | User clicks button; React calls `handleReset` | — |
| 2 | `setAnswer("N")` → "replace with N" queued | ❌ No |
| 3 | `setBest(true)` → "replace with true" queued | ❌ No |
| 4 | `setLiked(false)` → "replace with false" queued | ❌ No |
| 5 | `handleReset` returns | ✅ **ONE re-render triggered** |

React **waits for the entire event handler to finish** before processing any queued state updates.

> ✅ **Official source** (react.dev): *"React waits until all code in the event handlers has run before processing your state updates. This is why the re-render only happens after all these `setNumber()` calls."*

### async/await Boundary — A Subtle Trap

When `await` appears in an event handler, the synchronous part before the `await` forms one batch, and the code after the `await` forms a **separate batch**:

```jsx
async function handleClick() {
  // BATCH 1: everything before await
  setLoading(true);
  setError(null);
  await fetchData();        // ← boundary: BATCH 1 flushes here, render occurs
  // BATCH 2: everything after await
  setData(result);          // new batch starts here
  setLoading(false);        // same batch → 1 render for batch 2
}
// Total: 2 renders (one before await, one after)
```

This is because `await` suspends the function and returns to the event loop. The synchronous task has ended, so React flushes the first batch. When the Promise resolves, a new synchronous task begins — forming a new batch.

---

## 5. `console.log` in the Middle of Batched Updates — What Prints?

This is a **classic interview trap**. Let's dissect it:

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName]   = useState("Bob");

  function handleClick() {
    setCount(count + 1);   // 1. queue: "replace with 1"
    console.log(count);    // 2. prints: 0  ← stale snapshot!

    setName("Alice");      // 3. queue: "replace with Alice"
    console.log(name);     // 4. prints: "Bob"  ← stale snapshot!

    // 5. Function exits → React processes batch → ONE re-render
    //    Now count = 1, name = "Alice"
  }

  console.log("RENDER — count:", count, "name:", name);

  return <button onClick={handleClick}>Click Me</button>;
}
```

**What appears in the console after one click (starting from count=0, name="Bob"):**

```
0               ← console.log(count) inside handleClick — stale!
"Bob"           ← console.log(name) inside handleClick — stale!
RENDER — count: 1 name: Alice   ← component re-renders with new state
```

### Why? — The Snapshot Principle

> ✅ **Official source** (react.dev): *"A state variable's value never changes within a render, even if its event handler's code is asynchronous."*

When React renders a component, it calls your component function and gets back a JSX snapshot. The **props, state values, and event handlers** returned from that call all belong to that snapshot. State "lives" in React (outside your function), and when React calls your component, it hands you a **frozen copy** of the state for that render.

Calling `setCount` does NOT mutate the `count` variable. It enqueues a future update. So `count` inside `handleClick` is permanently the old value until the next render produces a new snapshot.

```
React renders component → count = 0, name = "Bob"
                               ↓
         handleClick is created, closing over count=0, name="Bob"
                               ↓
User clicks → handleClick executes
  setCount(count + 1)  → enqueues "replace with 0+1=1"
  console.log(count)   → count is still 0 (frozen in the closure)
  setName("Alice")     → enqueues "replace with Alice"
  console.log(name)    → name is still "Bob" (frozen)
                               ↓
handleClick returns → React processes the queue
                               ↓
New render: count = 1, name = "Alice"  ← fresh snapshot
```

### Step-by-Step Memory Model

```
During handleClick execution:
┌──────────────────────────────────────┐
│  handleClick closure (render N)      │
│  count = 0   ← frozen, cannot change │
│  name  = "Bob" ← frozen              │
└──────────────────────────────────────┘

React's update queue for this component:
┌───────────────────────────────────────────────┐
│  [ "replace with 1", "replace with Alice" ]   │
└───────────────────────────────────────────────┘

After function returns → React processes queue:
  New state: { count: 1, name: "Alice" }
  Component re-renders (render N+1) with a fresh snapshot
```

### The setTimeout Variant — Still Stale!

Even if you read state inside a `setTimeout` that fires *after* re-render, you still see the old stale value because the timeout closed over the old snapshot:

```jsx
function handleClick() {
  setCount(count + 5);
  setTimeout(() => {
    alert(count); // Alerts 0, NOT 5 — it's the snapshot from when the handler ran
  }, 3000);
}
```

> ✅ **Official source** (react.dev): *"The state stored in React may have changed by the time the alert runs, but it was scheduled using a snapshot of the state at the time the user interacted with it!"*

---

## 6. Why State Updates Are Asynchronous

"Asynchronous" here does **not** mean Promises or callbacks. It means: **the effect is deferred to after the current synchronous task completes**.

### Why design it this way?

> ✅ **Official source** (react.dev): *"React stores state outside of your component, as if on a shelf! When React calls your component, it gives you a snapshot of the state for that particular render."*

1. **Snapshot consistency:** All reads in one render see the same frozen values. If `setState` were synchronous and immediate, one line could see `count=0` and the next (after a set) `count=1` in the same render — a half-baked inconsistent state.

2. **Batching opportunity:** By deferring, React can collect all updates from an event handler before doing any work.

3. **Predictability:** Your component function is essentially a **pure function** of its state snapshot. Given the same snapshot, it always returns the same UI. This makes React components easier to test and reason about.

4. **No `this` to mutate:** Unlike class components (which had `this.state` that React could mutate between `setState` calls), function components have no `this`. There is nothing for React to mutate mid-execution. Each render's state values are local constants.

```jsx
// React guarantees this is always consistent within one render:
function Component() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(2);

  // a and b are ALWAYS from the SAME render snapshot
  // You'll never see 'a' from render N and 'b' from render N+1 here
  return <div>{a + b}</div>;
}
```

### The Analogy — A Photograph 📷

Think of each render as taking a photograph of your state. The photo is **frozen** at that moment. Calling `setState` does not edit the photo — it requests a **new photo to be taken** (a new render) with different values. Any code that runs during the current photo (current render's event handlers) will only ever see the frozen values in that photo.

---

## 7. Stale Closures & the Functional Updater Fix

Batching combined with stale closures creates a subtle bug when you call the **same setter multiple times** in one batch with a direct value:

```jsx
// count is currently 0
function handleTripleIncrement() {
  // WRONG — all three see count = 0 (stale snapshot)
  setCount(count + 1); // enqueues "replace with 0+1=1"
  setCount(count + 1); // enqueues "replace with 0+1=1" (SAME stale value!)
  setCount(count + 1); // enqueues "replace with 0+1=1" (SAME stale value!)
  // Final count after re-render: 1  ← WRONG, expected 3
}
```

**Fix: Use the functional updater form `prev => prev + 1`**

When you pass an updater function, React does NOT use the closed-over stale value. Instead, it passes the **most recently queued result** as the argument, chaining updates correctly:

```jsx
function handleTripleIncrement() {
  // CORRECT — each updater receives the latest queued value as prev
  setCount(prev => prev + 1); // prev=0 → enqueues result: 1
  setCount(prev => prev + 1); // prev=1 → enqueues result: 2
  setCount(prev => prev + 1); // prev=2 → enqueues result: 3
  // Final count after re-render: 3  ← CORRECT
}
```

React processes the queue during the render:

| Queue entry | Incoming `prev` | Result |
|---|---|---|
| `prev => prev + 1` | 0 (initial state) | **1** |
| `prev => prev + 1` | 1 | **2** |
| `prev => prev + 1` | 2 | **3** |

> ✅ **Official source** (react.dev): *"To update some state multiple times in one event, you can use `setNumber(n => n + 1)` updater function."*

### Naming Convention (from react.dev)

It's idiomatic to name the updater argument by the first letter(s) of the state variable:

```js
setEnabled(e => !e);
setLastName(ln => ln.reverse());
setFriendCount(fc => fc * 2);
// Or more explicitly:
setEnabled(prevEnabled => !prevEnabled);
```

> **Interview Rule:** Always use the functional updater form `prev => newValue` when the new state depends on the current state, especially inside batched calls, `setTimeout`, or `async` code.

---

## 8. React 18 — Automatic Batching Extended to Everything

### Before React 18 (React ≤ 17)

Batching **only** happened inside React's synthetic event handlers. Inside `setTimeout`, `Promise.then`, native `addEventListener` callbacks, etc., each `setState` caused its own immediate re-render:

```jsx
// React ≤ 17: setTimeout is NOT batched
setTimeout(() => {
  setCount(c => c + 1); // triggers re-render #1 immediately
  setFlag(f => !f);     // triggers re-render #2 immediately
  // 2 re-renders!
}, 1000);
```

> ✅ **Official source** (Dan Abramov, React 18 WG RFC): *"Until React 18, we only batched updates during the React event handlers. Updates inside of promises, setTimeout, native event handlers, or any other event were not batched in React by default."*

### After React 18 (with `createRoot`) — Automatic Batching

React 18 introduces **Automatic Batching** — all state updates are batched regardless of where they occur:

```jsx
// React 18 with createRoot: ALL of these are automatically batched

// 1. setTimeout
setTimeout(() => {
  setCount(c => c + 1); // batched
  setFlag(f => !f);     // batched → 1 re-render ✅
}, 1000);

// 2. Promise.then / fetch callback
fetch("/api/user")
  .then(res => res.json())
  .then(data => {
    setUser(data.user);  // batched
    setLoading(false);   // batched → 1 re-render ✅
  });

// 3. Native DOM event listener
document.addEventListener("click", () => {
  setCount(c => c + 1); // batched
  setFlag(f => !f);     // batched → 1 re-render ✅
});

// 4. React synthetic event handler (was already batched in ≤17)
function handleClick() {
  setCount(c => c + 1); // batched
  setFlag(f => !f);     // batched → 1 re-render ✅
}
```

> ✅ **Official source** (Dan Abramov, React 18 WG RFC): *"Starting in React 18 with `createRoot`, all updates will be automatically batched, no matter where they originate from."*

### The Key Requirement: `createRoot`

Automatic batching in React 18 **only works** when you use `createRoot`. The legacy `ReactDOM.render` preserves the old React 17 behaviour:

```jsx
// ✅ React 18 — createRoot (automatic batching fully enabled)
import { createRoot } from 'react-dom/client';
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// ⚠️  Legacy API (NO automatic batching outside synthetic event handlers)
import ReactDOM from 'react-dom';
ReactDOM.render(<App />, document.getElementById('root'));
```

### What About `unstable_batchedUpdates`?

Before React 18, some libraries used the undocumented `ReactDOM.unstable_batchedUpdates()` to manually force batching outside event handlers. This API **still exists** in React 18 for backwards compatibility, but it is no longer needed since automatic batching covers all cases now.

```jsx
// Old workaround (no longer needed in React 18)
import { unstable_batchedUpdates } from 'react-dom';

unstable_batchedUpdates(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
}); // ← 1 render (also works in React 18, but automatic batching is preferred)
```

### Comparison Table

| Context | React ≤ 17 | React 18 (`createRoot`) |
|---------|------------|------------------------|
| React synthetic event handler | ✅ Batched | ✅ Batched |
| `setTimeout` / `setInterval` | ❌ Not batched (N renders) | ✅ Batched |
| `Promise.then` / `async/await` | ❌ Not batched | ✅ Batched |
| Native `addEventListener` | ❌ Not batched | ✅ Batched |
| Legacy `ReactDOM.render` | ❌ Not batched (outside events) | ❌ Still not batched |

---

## 9. Opting Out with `ReactDOM.flushSync()`

> ✅ **Official source** (react.dev): *"Using `flushSync` is uncommon and can hurt the performance of your app. Use `flushSync` as a last resort."*

In rare cases you **need** an immediate DOM update before the next line of code executes — for example, when reading updated DOM measurements between two state changes (scroll position, element dimensions), or integrating with third-party browser APIs like `window.onbeforeprint`.

`flushSync` forces React to **flush** (process and commit) the queued updates **synchronously and immediately**, bypassing the normal batch.

```jsx
import { flushSync } from 'react-dom'; // ← import from 'react-dom', NOT 'react'

function handleClick() {
  // First update — force immediate DOM commit
  flushSync(() => {
    setCount(c => c + 1);
  });
  // ✅ By this line, the DOM has been updated with the new count
  // Safe to read DOM layout here (e.g., scrollHeight, offsetTop)
  const list = document.getElementById("list");
  list.scrollTop = list.scrollHeight; // scroll to bottom

  // Second update — force another immediate DOM commit
  flushSync(() => {
    setFlag(f => !f);
  });
  // ✅ DOM updated again
}
// Total: 2 re-renders instead of 1
```

> ✅ **Official source** (Dan Abramov, React 18 WG RFC): *"For those use cases, you can use `ReactDOM.flushSync()` to opt out of batching... We don't expect this to be common."*

### What `flushSync` Does NOT Do

A common misconception: `flushSync` does not make the **JavaScript state variable** reflect the new value in the current closure. The DOM updates, but the closed-over variable is still frozen:

```jsx
// ❌ WRONG expectation — flushSync does NOT update the JS variable
flushSync(() => setCount(c => c + 1));
console.log(count); // Still prints the OLD value — stale closure!
                    // The component re-rendered, but this code's 'count'
                    // is still bound to the old snapshot

// ✅ RIGHT use of flushSync — reading the DOM (not React state)
flushSync(() => setItems(prev => [...prev, newItem]));
listRef.current.scrollTop = listRef.current.scrollHeight; // DOM measurement ✅
```

### Caveats — From the Official React Docs

| Caveat | What it means |
|--------|---------------|
| Can significantly hurt performance | Causes extra renders; avoid in hot paths |
| May force Suspense boundaries to show fallbacks | If a batched update suspends, fallback UI may flash |
| Cannot be called inside render or `useEffect` | Will trigger a warning: *"flushSync was called from inside a lifecycle method"* |
| May flush pending updates outside the callback | React may flush unrelated pending updates to maintain consistency |

### Safe Use Pattern (Inside a `useEffect`)

If you need `flushSync` from inside a `useEffect`, defer it to a microtask to let the current render finish first:

```jsx
useEffect(() => {
  // ✅ Defer flushSync to a microtask — avoids "called from lifecycle" error
  queueMicrotask(() => {
    flushSync(() => {
      setSomething(newValue);
    });
  });
}, []);
```

### When to Use `flushSync` vs. When NOT To

| ✅ Appropriate Use | ❌ Misuse |
|---|---|
| Reading DOM layout after a state change | Fixing stale state reads (use functional updater instead) |
| Third-party library requiring sync DOM | As a crutch for avoiding async patterns |
| Browser API integration (e.g., `onbeforeprint`) | In hot render paths |

---

## 10. Interview Summary, Mental Model & Analogies

### The Complete Mental Model

```
ONE synchronous execution context (event handler / async callback)
        │
        ├── setState(A)  ──┐
        ├── setState(B)  ──┼──→ React's state queue for this render
        ├── setState(C)  ──┘         (processed during NEXT render)
        │
        └── context finishes
                │
                ▼
         React processes queue
         (updater functions run here — during rendering — not during event handler)
                │
                ▼
         ONE re-render
         (with A, B, C all applied consistently)
```

### Key Facts for Interviews

| Topic | Key Point |
|-------|-----------|
| **What is batching?** | Multiple `setState` calls → single re-render |
| **Why batch?** | Performance (fewer renders) + UI consistency (no "half-finished" states) |
| **When does re-render happen?** | After the current synchronous context (event handler, async callback) finishes |
| **Are state updates synchronous?** | No — they are queued; the value doesn't change until the next render |
| **Does `console.log` after `setState` see new state?** | ❌ No — it sees the stale snapshot value |
| **Does `setTimeout` callback see new state?** | ❌ No — it closed over the snapshot at the time it was created |
| **React ≤17 batching scope** | Only React synthetic event handlers |
| **React 18 batching scope** | Everything: events, `setTimeout`, Promises, native events (requires `createRoot`) |
| **async/await and batching** | Code before `await` = batch 1; code after `await` = new batch |
| **How to force immediate DOM update** | `ReactDOM.flushSync()` — use sparingly |
| **How to safely update state that depends on current state** | Functional updater: `setState(prev => prev + 1)` |
| **Where do updater functions run?** | During the render phase — they are pure functions called by React |

### The 3 Analogies to Remember

**1. Waiter (Batching in general) — from the React docs:**
> A waiter takes your whole order before going to the kitchen. React takes all your `setState` calls before triggering a re-render. The waiter doesn't run to the kitchen after each dish you order.

**2. Photograph (Stale closure / snapshot) — from the React docs:**
> Each render takes a photograph of your state. Your event handler sees only that frozen photograph. Calling `setState` doesn't edit the photograph — it requests a *new photograph* (re-render) to be taken. Any `console.log` in the handler reads from the old photo.

**3. Shopping Cart (Functional updater):**
> Using `setState(count + 1)` is like saying "I want 1 more than what was in the cart *when I started shopping*." Using `setState(prev => prev + 1)` is like saying "I want 1 more than whatever is in the cart *right now*." The second form is always correct when other items might have been added to the queue between your calls.

### Quick Interview Answer Template

> *"React batches state updates by queuing all `setState` calls in the same synchronous execution context, processing them together after that context finishes, and triggering only one re-render. This improves performance and guarantees UI consistency by avoiding 'half-finished' render states. Because updates are deferred, state variables inside an event handler always reflect the snapshot from the previous render — so `console.log(state)` after `setState` prints the old value. Before React 18, this batching only applied to React synthetic event handlers; React 18 with `createRoot` extends it automatically to `setTimeout`, Promises, and native events. To force an immediate synchronous flush, use `ReactDOM.flushSync()`, but this should be a last resort as it bypasses the batching optimization and can hurt performance."*

---

### Code Cheat Sheet

```jsx
// ─── 1. Basic batching ───────────────────────────────────────────────
function handle() {
  setA(1);    // queued
  setB(2);    // queued
  setC(3);    // queued
}             // → 1 re-render with a=1, b=2, c=3

// ─── 2. Stale snapshot (the trap) ────────────────────────────────────
function handle() {
  setCount(count + 1);
  console.log(count); // Prints OLD value! (frozen snapshot)
}

// ─── 3. setTimeout — still sees the stale snapshot ───────────────────
function handle() {
  setCount(count + 5);
  setTimeout(() => {
    alert(count); // Alerts OLD value, not the updated one!
  }, 3000);
}

// ─── 4. Functional updater (safe, chains correctly) ──────────────────
function handleTriple() {
  setCount(prev => prev + 1); // enqueues: n+1
  setCount(prev => prev + 1); // enqueues: n+2
  setCount(prev => prev + 1); // enqueues: n+3
} // → 1 re-render with count+3 ✅

// ─── 5. Mixed queue (direct value replaces; updater chains) ──────────
<button onClick={() => {
  setNumber(number + 5);  // "replace with 5"
  setNumber(n => n + 1);  // updater: 5+1=6
  setNumber(42);          // "replace with 42" → final: 42
}}>

// ─── 6. async/await — two separate batches ───────────────────────────
async function handleClick() {
  setLoading(true);  // batch 1
  setError(null);    // batch 1 → render #1 when await is hit
  await fetchData();
  setData(result);   // batch 2
  setLoading(false); // batch 2 → render #2
}

// ─── 7. React 18 — batched in setTimeout ─────────────────────────────
setTimeout(() => {
  setCount(c => c + 1); // batched (React 18 + createRoot only)
  setFlag(f => !f);     // batched → 1 render ✅
}, 1000);

// ─── 8. React 18 — batched in Promise ────────────────────────────────
fetchData().then(data => {
  setData(data);       // batched
  setLoading(false);   // batched → 1 render ✅
});

// ─── 9. Opt out with flushSync ────────────────────────────────────────
import { flushSync } from 'react-dom'; // ← 'react-dom', not 'react'

function handle() {
  flushSync(() => setCount(c => c + 1)); // immediate DOM update #1
  // safely read DOM measurements here
  listRef.current.scrollTop = listRef.current.scrollHeight;
  flushSync(() => setFlag(f => !f));     // immediate DOM update #2
}
// ⚠️ count variable in this closure is STILL the old value after flushSync
```

---

> **Sources:**
> - [react.dev — State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
> - [react.dev — Queueing a Series of State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
> - [react.dev — flushSync API Reference](https://react.dev/reference/react-dom/flushSync)
> - [React 18 WG Discussion #21 — Automatic Batching, by Dan Abramov](https://github.com/reactwg/react-18/discussions/21)
> - Jonas Schmedtmann — The Ultimate React Course 2025, Section 11, Lecture 135
