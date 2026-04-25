# 134 · Rules for Render Logic & Pure Components

> **Target Audience:** Final-year CSE student | Interview-ready depth | React 18+

---

## 🗺️ The Big Picture First

Before diving in, burn this mental model into your brain:

```
React Component = Pure Function(props, state) → JSX
```

Every React component is, at its heart, a **pure function**. React calls your component function to figure out what the UI should look like right now. That call is the **render**. Everything in React's design — from hooks to the rules below — flows from this single idea.

Inside a component body there are exactly **two zones**:

```
┌─────────────────────────────────────────────────────┐
│           React Component Function Body              │
│                                                     │
│  ┌──────────────────────┐  ┌─────────────────────┐  │
│  │   RENDER LOGIC ZONE  │  │  EVENT HANDLER ZONE │  │
│  │  (must be pure)      │  │  (side effects OK)  │  │
│  │                      │  │                     │  │
│  │  - useState calls    │  │  - onClick          │  │
│  │  - useEffect calls   │  │  - onSubmit         │  │
│  │  - calculations      │  │  - fetch/API calls  │  │
│  │  - derived state     │  │  - DOM mutations    │  │
│  │  - conditional JSX   │  │  - timers           │  │
│  └──────────────────────┘  └─────────────────────┘  │
│                                                     │
│  return <JSX />;  ← the only output of render logic │
└─────────────────────────────────────────────────────┘
```

---

## 1. 🔄 Render Logic vs Event Handler Functions

### What Is Render Logic?

Render logic is **all the code that runs at the top level of your component function** — directly in the function body — every time React renders the component.

```jsx
function UserCard({ userId }) {
  // ✅ RENDER LOGIC — runs on every render
  const [user, setUser] = useState(null);          // hook call
  const [isAdmin, setIsAdmin] = useState(false);   // hook call

  const displayName = user?.name?.toUpperCase();   // derived value (pure calculation)
  const greeting = isAdmin ? "Welcome, Admin" : "Hello"; // conditional (pure)

  // ⛔ NOT render logic — this is an event handler
  function handleDeleteClick() {
    fetch(`/api/users/${userId}`, { method: "DELETE" }); // side effect!
    setUser(null);
  }

  // ✅ render logic — the return statement
  return (
    <div>
      <h1>{greeting}, {displayName}</h1>
      <button onClick={handleDeleteClick}>Delete</button>
    </div>
  );
}
```

### What Are Event Handlers?

Event handlers are **nested functions inside your component that execute in response to a specific user interaction**. They are NOT called during rendering — they are called later, when the user clicks/types/submits/etc.

```jsx
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Event handler — runs ONLY when user clicks submit, not during render
  async function handleSubmit(e) {
    e.preventDefault();
    // Side effects are PERFECTLY OK here:
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log("Login result:", data); // console.log = side effect, fine here
  }

  // ✅ Event handler — runs ONLY when user types
  function handleEmailChange(e) {
    setEmail(e.target.value); // state update is fine in event handlers
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={email} onChange={handleEmailChange} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
    </form>
  );
}
```

| Feature | Render Logic | Event Handlers |
|---|---|---|
| **When it runs** | Every render (synchronously) | When user interacts |
| **Side effects allowed?** | ❌ No | ✅ Yes |
| **Purpose** | Calculate JSX to display | Respond to user action |
| **Where it lives** | Top level of component body | Nested functions inside component |
| **React calls it?** | Yes — React calls your component | No — browser calls it via DOM |

---

## 2. 🧩 Functional Programming Principles in React

React is heavily inspired by **functional programming (FP)**. Understanding FP makes React intuitive rather than magical.

### 2.1 Pure Functions

> **FP Definition:** A function is *pure* if:
> 1. Given the same inputs, it ALWAYS returns the same output.
> 2. It does NOT produce any observable side effects (no mutation of external state).

```js
// ✅ Pure function — math-like
function add(a, b) {
  return a + b; // always same output for same inputs, touches nothing outside
}

// ✅ Pure function
function formatUserName(firstName, lastName) {
  return `${lastName}, ${firstName}`;
}

// ⛔ Impure — relies on external mutable variable
let callCount = 0;
function getNextId() {
  callCount++; // mutates external variable!
  return callCount; // different output on each call — not deterministic
}

// ⛔ Impure — produces a side effect (network call)
function fetchUser(id) {
  fetch(`/api/users/${id}`); // reaches outside its scope
  return id;
}
```

**How/Why/Where in React:**
- React treats every component as a pure function
- Components must be pure so React can **safely call them multiple times** (Strict Mode, Concurrent Rendering)
- React may skip re-rendering components whose props/state haven't changed — this optimization only works if components are pure

### 2.2 Immutability

> **FP Principle:** Never mutate data. Instead, create new copies with the required changes.

This is the #1 rule for state in React.

```jsx
// ⛔ WRONG — mutating state directly (React cannot detect this change!)
function BadCartComponent() {
  const [items, setItems] = useState([{ id: 1, name: "Book", qty: 1 }]);

  function addQty() {
    items[0].qty++; // Direct mutation! React doesn't know state changed.
    setItems(items); // Re-render may or may not happen — UNPREDICTABLE!
  }
}

// ✅ CORRECT — creating a new array (immutable update)
function GoodCartComponent() {
  const [items, setItems] = useState([{ id: 1, name: "Book", qty: 1 }]);

  function addQty(id) {
    // Create a brand new array with the updated item
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setItems(updatedItems); // React sees a new reference → triggers re-render
  }

  // Immutable object update:
  function updateName(id, newName) {
    setItems(items.map((item) =>
      item.id === id ? { ...item, name: newName } : item // spread + override
    ));
  }

  // Immutable add:
  function addItem(newItem) {
    setItems([...items, newItem]); // spread existing + append new
  }

  // Immutable remove:
  function removeItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }
}
```

**Why immutability matters:**
- React uses **reference equality** (`===`) to detect state changes. If you mutate the same object, the reference doesn't change → React thinks nothing changed → no re-render.
- Immutability enables time-travel debugging, undo/redo features, and React DevTools state diffing.

### 2.3 First-Class Functions (Functions as Values)

> **FP Principle:** Functions are values — they can be stored in variables, passed as arguments, and returned from other functions.

React leverages this constantly:

```jsx
// Functions passed as props (callbacks) — FP's "higher-order functions"
function Button({ onClick, label }) {
  return <button onClick={onClick}>{label}</button>;
}

function Parent() {
  function handleClick() {
    console.log("Clicked!");
  }

  return <Button onClick={handleClick} label="Click Me" />;
  //                  ^ passing a function as a prop — first-class function
}

// Array methods: map, filter, reduce — all higher-order functions
function ProductList({ products }) {
  return (
    <ul>
      {products
        .filter((p) => p.inStock)       // filter is a higher-order function
        .map((p) => (                   // map is a higher-order function
          <li key={p.id}>{p.name}</li>
        ))}
    </ul>
  );
}
```

### 2.4 Function Composition

> **FP Principle:** Build complex behavior by combining small, focused functions.

In React, this is component composition:

```jsx
// Small, focused components composed into larger UIs
function Avatar({ src, alt }) {
  return <img src={src} alt={alt} className="avatar" />;
}

function UserName({ name, role }) {
  return (
    <div>
      <strong>{name}</strong>
      <span>{role}</span>
    </div>
  );
}

// Composing Avatar + UserName into a card
function UserCard({ user }) {
  return (
    <div className="card">
      <Avatar src={user.avatar} alt={user.name} />
      <UserName name={user.name} role={user.role} />
    </div>
  );
}

// Composing UserCard into a list
function UserList({ users }) {
  return (
    <div>
      {users.map((u) => <UserCard key={u.id} user={u} />)}
    </div>
  );
}
```

### 2.5 Declarative vs Imperative

> **FP Principle:** Declare *what* you want, not *how* to achieve it.

```jsx
// ⛔ Imperative (jQuery-style) — manually describing HOW
document.getElementById("count").innerText = count + 1;
document.getElementById("btn").disabled = true;

// ✅ Declarative (React) — describing WHAT you want
// React figures out HOW to update the DOM
return (
  <div>
    <p id="count">{count}</p>
    <button disabled={count >= 10}>Increment</button>
  </div>
);
```

---

## 3. ⚡ Side Effects: What, Why, Where, How

### What Is a Side Effect?

A **side effect** is any operation that interacts with something **outside the scope of the current function** — something beyond simply returning a value.

```
Pure function:   input → [function] → output
Side effect:     input → [function] → output
                              ↕
                    (interacts with the outside world)
```

**Common side effects in React:**
```
✦ Data fetching          → fetch(), axios.get()
✦ DOM manipulation       → document.title = "...", ref.current.focus()
✦ Subscriptions          → addEventListener, WebSocket.connect()
✦ Timers                 → setTimeout, setInterval
✦ Logging                → console.log()
✦ Local storage          → localStorage.setItem()
✦ Setting cookies        → document.cookie = "..."
✦ Third-party libraries  → map.setZoom(), player.play()
```

### Why Are Side Effects Dangerous in Render Logic?

```jsx
// ⛔ BAD — side effect in render logic
function SearchComponent({ query }) {
  // This runs on EVERY render — potentially dozens of times!
  fetch(`/api/search?q=${query}`); // infinite API calls!
  document.title = `Searching: ${query}`; // DOM mutation in render!
  console.log("Rendering..."); // fires multiple times per interaction

  return <div>Results...</div>;
}
```

**Why this is catastrophic:**
1. **Concurrent Rendering (React 18+):** React can start, pause, and restart rendering. If you have a fetch in render logic, it could fire multiple times for a single "render."
2. **Strict Mode:** React intentionally calls components twice in development to surface these bugs.
3. **Unpredictability:** Renders can be triggered at any time by React's scheduler — you lose control of when effects fire.
4. **No cleanup mechanism:** When a component unmounts mid-render, side effects in render logic don't get cleaned up.

### Where Side Effects ARE Allowed

```
1. Event Handlers  → user interaction triggers them (onClick, onSubmit, etc.)
2. useEffect()     → runs AFTER render is committed to DOM
3. Outside components → module-level initialization (runs once at app start)
```

---

## 4. 🧼 Pure Functions & Pure Components

### The Tea Cup Analogy (from React Docs)

Think of a React component like a **recipe**:
- A recipe specifies what dish to make given certain ingredients.
- If you follow the recipe identically twice, you get the identical dish both times.
- A component should produce the same JSX for the same props/state — every time.

```jsx
// ✅ Pure component — like a reliable recipe
function Recipe({ servings }) {
  return (
    <ol>
      <li>Boil {servings} cups of water</li>
      <li>Add {servings * 2} tea bags</li>
      <li>Steep for {servings} minutes</li>
    </ol>
  );
}

// Recipe({ servings: 2 }) ALWAYS returns the same JSX
// Recipe({ servings: 4 }) ALWAYS returns the same JSX
```

### Impure Component — The Classic Bug

```jsx
// ⛔ IMPURE — mutates external variable during render
let guestCount = 0; // module-level variable

function TeaCup() {
  guestCount = guestCount + 1; // MUTATION in render logic — BUG!
  return <h2>Tea cup for guest #{guestCount}</h2>;
}

function TeaParty() {
  return (
    <>
      <TeaCup />  {/* Renders: "Tea cup for guest #2" ← wrong! (Strict Mode calls twice) */}
      <TeaCup />  {/* Renders: "Tea cup for guest #4" ← wrong! */}
      <TeaCup />  {/* Renders: "Tea cup for guest #6" ← wrong! */}
    </>
  );
}
```

**The fix — receive data through props:**
```jsx
// ✅ PURE — data flows in through props, no external mutation
function TeaCup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>;
}

function TeaParty() {
  return (
    <>
      <TeaCup guest={1} />  {/* Always: "Tea cup for guest #1" */}
      <TeaCup guest={2} />  {/* Always: "Tea cup for guest #2" */}
      <TeaCup guest={3} />  {/* Always: "Tea cup for guest #3" */}
    </>
  );
}
```

### Local Mutation — The Exception That's OK

```jsx
// ✅ OK — mutating a variable you JUST created during THIS render
function GuestList({ count }) {
  const cups = []; // Created inside this render call

  for (let i = 1; i <= count; i++) {
    cups.push(<TeaCup key={i} guest={i} />); // Mutating a local variable — fine!
  }

  return cups;
}
// Why OK? Because `cups` didn't exist before this render.
// No external state is affected. No observable side effect.
```

---

## 5. 📜 Rules of Render Logic (The Sacred Rules)

These are the **laws React enforces** during the rendering phase. Violate them → bugs.

### Rule 1: No Side Effects in Render

```jsx
function Component({ userId }) {
  // ⛔ BREAK: API call in render
  fetch(`/api/user/${userId}`);

  // ⛔ BREAK: Direct DOM manipulation
  document.title = `User ${userId}`;

  // ⛔ BREAK: Starting a timer
  setTimeout(() => console.log("timeout"), 1000);

  // ⛔ BREAK: Writing to localStorage
  localStorage.setItem("lastUserId", userId);

  // ⛔ BREAK: Console log (minor, but technically a side effect)
  console.log("rendering"); // React DevTools will show this twice in dev

  return <div>{userId}</div>;
}
```

### Rule 2: Do Not Mutate Props or State During Render

```jsx
function BadComponent({ items }) {
  // ⛔ BREAK: Mutating props
  items.push({ id: 99, name: "injected" }); // Never do this!

  return <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>;
}

function AnotherBad() {
  const [count, setCount] = useState(0);

  // ⛔ BREAK: Directly mutating state (not via setter)
  count = count + 1; // This won't work AND violates the rules

  return <div>{count}</div>;
}
```

### Rule 3: Do Not Call Hooks Conditionally

Hooks must be called in the **same order** on every render:

```jsx
// ⛔ BREAK: Hook inside a condition
function BadHookUsage({ isLoggedIn }) {
  if (isLoggedIn) {
    const [userData, setUserData] = useState(null); // ← ILLEGAL: conditional hook
  }
  return <div />;
}

// ✅ CORRECT: Hook at top level, use the value conditionally
function GoodHookUsage({ isLoggedIn }) {
  const [userData, setUserData] = useState(null); // Always called

  return isLoggedIn ? <div>{userData?.name}</div> : <div>Please log in</div>;
}
```

### Rule 4: No Infinite Loops — Don't Set State Unconditionally in Effects

```jsx
// ⛔ INFINITE LOOP — setting state inside useEffect with no dependencies
// triggers re-render → effect runs again → sets state → re-render → ...
function InfiniteLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1); // ← no dependency array → runs after EVERY render!
  }); // ← missing [] — BAD!

  return <div>{count}</div>;
}
```

### Rule 5: Render Must Return JSX (or null)

```jsx
function Component({ show }) {
  if (!show) return null; // ✅ OK — returning null renders nothing

  return <div>Visible!</div>; // ✅ OK — returning JSX
}
```

---

## 6. 🔁 State Update Batching

### The Problem Without Batching

Imagine you had 3 independent `setState` calls in a row. Without batching, each one would trigger its own re-render — slow and wasteful.

### What Is Batching?

**Batching** = React groups multiple `setState` calls from the same event handler into a **single re-render**.

Think of it like a **restaurant waiter**: the waiter doesn't run to the kitchen after every single item you order. They wait for you to finish your entire order, then submit it all at once.

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);

  function handleClick() {
    setCount(c => c + 1); // ← doesn't trigger render yet
    setFlag(f => !f);     // ← doesn't trigger render yet
    // React batches BOTH updates → ONE re-render total
  }

  console.log("Rendering..."); // With batching: prints ONCE per click
  // Without batching: would print TWICE per click

  return <button onClick={handleClick}>Click: {count}</button>;
}
```

---

### 6A. 🖱️ Batching Inside Event Handlers — How React Does It

This is the **original** place batching worked. Understanding the mechanism here will make the async cases crystal clear.

#### How React's Batch Context Works

When React intercepts a user event (click, input, submit), it wraps the call to your handler in an internal **batch context**. Think of it as React pressing a "hold renders" button before calling your handler, and "release renders" after it finishes.

```
┌─────────────────────────────────────────────────────────────────────┐
│              EVENT HANDLER BATCHING TIMELINE                        │
│                                                                     │
│  1. User clicks button                                              │
│  2. React opens  ──────────────────────── BATCH CONTEXT OPEN        │
│  3. Your onClick handler runs:                                      │
│       setCount(c => c + 1)  ──► added to queue (NO render yet)      │
│       setFlag(f => !f)       ──► added to queue (NO render yet)      │
│       setStatus("done")     ──► added to queue (NO render yet)      │
│  4. Handler returns                                                 │
│  5. React closes ──────────────────────── BATCH CONTEXT CLOSE        │
│  6. React processes queue: applies count+1, flip flag, status       │
│  7. ONE single re-render with ALL 3 updates applied                 │
└─────────────────────────────────────────────────────────────────────┘
```

```jsx
function OrderForm() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const [status, setStatus] = useState("idle");

  function handleSubmit() {
    // All 3 setState calls are inside ONE event handler
    setCount(c => c + 1);   // ① queued
    setFlag(f => !f);        // ② queued
    setStatus("submitted");  // ③ queued
    // Handler returns → React flushes queue → ONLY 1 re-render ✓
  }

  // Proof: this console.log prints ONCE per click (not 3 times)
  console.log(`Render #${++renderRef.current}: count=${count}, flag=${flag}`);

  return <button onClick={handleSubmit}>Submit Order</button>;
}
```

#### Why Batching in Event Handlers is Safe

React knows the handler is synchronous and finite — it will always finish. So React can safely hold all updates, process them together, and render once. The UI never shows a "half-updated" state (e.g., count changed but flag hasn't yet).

```jsx
// ✅ Correct — user NEVER sees an intermediate state
// React won't show count=1, flag=false between updates
// It will show count=1, flag=true in one atomic render

function SafeToggle() {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);

  function handleToggle() {
    setCount(c => c + 1);   // These two are ATOMIC
    setIsActive(a => !a);   // User sees both change together
  }

  return (
    <div className={isActive ? "active" : "inactive"}>
      Toggled {count} times
    </div>
  );
}
```

---

### 6B. ⏰ Batching Inside `setTimeout` & `setInterval`

This is where React 17 vs React 18 becomes a **critical difference**.

#### React 17 — No Batching in Timers (3 renders for 3 setStates!)

In React 17, `setTimeout` callbacks execute **outside** React's event system. React has no idea you're calling setState from a timer — it processes each `setState` individually.

```jsx
// React 17 behaviour — demonstrating the problem
function TimerDemo() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const [label, setLabel] = useState("idle");

  function handleStart() {
    setTimeout(() => {
      // React 17: each setState triggers its own render!
      setCount(c => c + 1); // re-render #1 → UI updates with count=1
      setFlag(f => !f);     // re-render #2 → UI updates with flag=true
      setLabel("done");     // re-render #3 → UI updates with label="done"
      // Total: 3 renders for 3 state updates — wasteful!
    }, 1000);
  }

  // React 17: console.log prints 3 times after the timeout fires
  console.log("Rendering...");

  return <button onClick={handleStart}>Start Timer</button>;
}
```

#### React 18 — Automatic Batching in Timers (1 render for 3 setStates!)

React 18 uses a new internal scheduler that wraps async callbacks in a batch context automatically. The same code now only triggers **one** re-render.

```jsx
// React 18 behaviour — automatic batching in setTimeout ✓
function TimerDemo() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const [label, setLabel] = useState("idle");

  function handleStart() {
    setTimeout(() => {
      // React 18: ALL three are batched → only 1 render
      setCount(c => c + 1); // queued
      setFlag(f => !f);     // queued
      setLabel("done");     // queued
      // React processes all 3 together → 1 render ✓
    }, 1000);
  }

  // React 18: console.log prints ONCE after the timeout fires
  console.log("Rendering...");

  return <button onClick={handleStart}>Start Timer</button>;
}
```

#### ⚠️ The Stale Closure Trap in Timers

The most common timer bug in React: the value captured inside `setTimeout` is **frozen at the time the timer was created**, not when it fires.

```jsx
// ⛔ STALE CLOSURE — classic bug with timers
function BuggyCounter() {
  const [count, setCount] = useState(0);

  function handleDelayedIncrement() {
    // `count` is captured here — its value is the current render's count
    setTimeout(() => {
      setCount(count + 1); // ALWAYS uses the `count` value from when setTimeout was called!
      // If user clicks 5 times before 1s, `count` is still 0 for all 5 timers
      // Result: count = 1, not 5!
    }, 1000);
  }

  return <button onClick={handleDelayedIncrement}>Count: {count}</button>;
}

// ✅ FIX — use updater function to get the LATEST state
function CorrectCounter() {
  const [count, setCount] = useState(0);

  function handleDelayedIncrement() {
    setTimeout(() => {
      setCount(c => c + 1); // `c` = latest queued value, NOT the stale closure!
    }, 1000);
  }

  return <button onClick={handleDelayedIncrement}>Count: {count}</button>;
}
```

#### `setInterval` — Polling Pattern (Right Way)

```jsx
function LiveClock() {
  const [time, setTime] = useState(new Date());
  const [ticks, setTicks] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      // React 18: both updates batched → 1 render per second
      setTime(new Date());        // queued
      setTicks(t => t + 1);      // queued — updater function avoids stale closure
    }, 1000);

    return () => clearInterval(id); // cleanup — ALWAYS clear intervals!
  }, []);

  return (
    <div>
      <p>Time: {time.toLocaleTimeString()}</p>
      <p>Ticks: {ticks}</p>
    </div>
  );
}
```

---

### 6C. 🌐 Batching Inside Promises & `async/await`

This is the context that trips up the most developers. Promise callbacks (`.then()`, `async/await`) are **microtasks** that run outside React's synchronous event loop.

#### React 17 — No Batching in Promises

```jsx
// React 17 — promise .then() runs OUTSIDE React's batch context
function ProfilePage({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleRefresh() {
    // Part 1: BEFORE await — still in the event handler's batch context
    setLoading(true); // queued (batched with anything else before await)
    setError(null);   // queued (batched)

    // React 17: after `await`, you've LEFT the batch context!
    const data = await fetch(`/api/users/${userId}`).then(r => r.json());

    // React 17: each of these triggers a separate render ← 2 extra renders!
    setUser(data);         // re-render #1
    setLoading(false);     // re-render #2
    // Total: 4 renders for this function (2 before await, 2 after)
  }
}
```

#### React 18 — Automatic Batching After `await`

```jsx
// React 18 — batches EVERYWHERE including after await ✓
function ProfilePage({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function handleRefresh() {
    // BEFORE await — synchronous part, clearly batched
    setLoading(true);   // queued
    setError(null);     // queued
    // → React 18: 1 render for the sync part

    const data = await fetch(`/api/users/${userId}`).then(r => r.json());

    // AFTER await — React 18 still batches these together ✓
    setUser(data);      // queued
    setLoading(false);  // queued
    // → React 18: 1 render for the async part
    // Total: 2 renders (one before await, one after)
  }
}
```

#### Full Example: `async/await` With Loading/Error States

```jsx
function UserDashboard({ userId }) {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function loadDashboard() {
    // ① Sync part — 1 render (loading spinner appears)
    setLoading(true);
    setError(null);
    setUser(null);
    setPosts([]);

    try {
      // Parallel fetch for efficiency
      const [userData, postsData] = await Promise.all([
        fetch(`/api/users/${userId}`).then(r => r.json()),
        fetch(`/api/users/${userId}/posts`).then(r => r.json()),
      ]);

      // ② After await — React 18: ALL 3 updates batched → 1 render
      setUser(userData);    // queued
      setPosts(postsData);  // queued
      setLoading(false);    // queued
      // → 1 single re-render showing user + posts + no spinner ✓

    } catch (err) {
      // ③ Error path — React 18: both updates batched → 1 render
      setError(err.message); // queued
      setLoading(false);     // queued
    }
  }

  // React 18 total renders: 2 (initial, loading-start, data-loaded) = great!
  // React 17 total renders: 6+ (each setState separately) = wasteful!

  if (loading) return <Spinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <UserProfile user={user} />
      <PostList posts={posts} />
      <button onClick={loadDashboard}>Refresh</button>
    </div>
  );
}
```

#### Promise.then() Chaining (React 18)

```jsx
function DataLoader() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(null);

  function handleLoad() {
    fetch("/api/step1")
      .then((res) => res.json())
      .then((result) => {
        // React 18: both setStates in this .then() callback are batched
        setStep(2);       // queued
        setData(result);  // queued
        // → 1 render ✓
      })
      .then(() => fetch("/api/step2").then(r => r.json()))
      .then((result2) => {
        // React 18: batched in this .then() too
        setStep(3);
        setData(result2);
        // → 1 render ✓
      });
  }

  return <div>Step {step}: {JSON.stringify(data)}</div>;
}
```

---

### 6D. 📊 React 17 vs React 18 — Full Comparison Table

| Context | React 17 | React 18 | Notes |
|---|---|---|---|
| `onClick`, `onChange`, etc. | ✅ Batched | ✅ Batched | Always worked |
| Custom native event (`addEventListener`) | ❌ Not batched | ✅ Auto-batched | React 18 fix |
| `setTimeout` callback | ❌ Not batched | ✅ Auto-batched | React 18 fix |
| `setInterval` callback | ❌ Not batched | ✅ Auto-batched | React 18 fix |
| `Promise.then()` callback | ❌ Not batched | ✅ Auto-batched | React 18 fix |
| `async/await` (after `await`) | ❌ Not batched | ✅ Auto-batched | React 18 fix |
| `fetch().then()` | ❌ Not batched | ✅ Auto-batched | React 18 fix |
| `flushSync` block | N/A | ❌ Forces sync | Opt-out of batching |

#### The Train Station Analogy

Imagine state updates are **passengers** trying to board a train (re-render):

```
REACT 17 — Individual Taxis (no batching in async):
┌──────────┐  ┌──────────┐  ┌──────────┐
│ setCount │  │ setFlag  │  │ setLabel │    ← Each takes its own taxi
│  render! │  │  render! │  │  render! │    ← 3 separate trips to "render station"
└──────────┘  └──────────┘  └──────────┘

REACT 18 — Shuttle Bus (automatic batching everywhere):
┌──────────────────────────────────────────┐
│  setCount + setFlag + setLabel           │  ← All wait for the same bus
│          → ONE shared trip to render     │  ← 1 render, 3 passengers
└──────────────────────────────────────────┘

flushSync — Emergency Taxi (opt-out):
┌──────────┐   ┌──────────────────────────┐
│ setCount │   │ setFlag + setLabel       │
│ FORCED   │   │   → next bus together    │
│  render! │   │   → 1 render             │
└──────────┘   └──────────────────────────┘
```

#### Proof with `console.log` — Counting Renders

```jsx
import { useState, useRef } from "react";
import { flushSync } from "react-dom";

let renderCount = 0; // module-level counter (not state — won't trigger render)

function BatchingProof() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const [label, setLabel] = useState("idle");

  renderCount++;
  console.log(`⚛️ Render #${renderCount}`);

  // Test 1: Event handler — always 1 render
  function testEventHandler() {
    setCount(c => c + 1);
    setFlag(f => !f);
    setLabel("event");
    // Console: exactly 1 "⚛️ Render"
  }

  // Test 2: setTimeout — React 17: 3 renders, React 18: 1 render
  function testTimeout() {
    setTimeout(() => {
      setCount(c => c + 1);
      setFlag(f => !f);
      setLabel("timeout");
      // React 18 console: 1 "⚛️ Render"
    }, 500);
  }

  // Test 3: async/await — React 17: 2+ renders, React 18: 1 render (after await)
  async function testPromise() {
    setLabel("loading");  // React 18: batched with...
    // (nothing else before await here, so 1 render for the sync part)

    await new Promise(resolve => setTimeout(resolve, 500)); // simulate fetch

    setCount(c => c + 1);  // React 18: batched with setFlag and setLabel
    setFlag(f => !f);
    setLabel("done");
    // React 18 console: 1 "⚛️ Render" for these 3 after the await
  }

  // Test 4: flushSync — always 2 renders (1 per flushSync call)
  function testFlushSync() {
    flushSync(() => setCount(c => c + 1)); // Render #N
    flushSync(() => setFlag(f => !f));     // Render #N+1
    // Console: 2 separate "⚛️ Render" entries
  }

  return (
    <div>
      <p>count: {count} | flag: {String(flag)} | label: {label}</p>
      <button onClick={testEventHandler}>Test Event Handler</button>
      <button onClick={testTimeout}>Test setTimeout</button>
      <button onClick={testPromise}>Test async/await</button>
      <button onClick={testFlushSync}>Test flushSync</button>
    </div>
  );
}
```

---

### React 17 vs React 18 — Automatic Batching

**React 17:** Batching ONLY worked inside React event handlers. In `setTimeout`, Promises, and native event listeners — each `setState` triggered its own re-render.

**React 18:** **Automatic Batching everywhere** — every `setState` call, regardless of context, is batched until the current asynchronous "unit of work" finishes. You get this for free by upgrading to `createRoot`.

```jsx
// The ONE line change that unlocks React 18 automatic batching:

// React 17 (old)
import ReactDOM from "react-dom";
ReactDOM.render(<App />, document.getElementById("root"));
// ↑ No automatic batching in async contexts

// React 18 (new) ← just this change enables auto-batching everywhere
import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />);
// ↑ Automatic batching in ALL contexts (setTimeout, Promises, etc.)
```

### Opt-Out: `flushSync`

In rare cases when you need immediate re-rendering (e.g., measuring DOM before the next update), use `flushSync`:

```jsx
import { flushSync } from "react-dom";

function Component() {
  const [count, setCount] = useState(0);
  const [flag, setFlag] = useState(false);
  const divRef = useRef(null);

  function handleClick() {
    flushSync(() => {
      setCount(c => c + 1); // Triggers IMMEDIATE re-render (opt out of batching)
    });
    // DOM has been updated here — you can read it
    console.log(divRef.current.textContent); // reads updated DOM

    setFlag(f => !f); // Triggers another separate re-render
  }

  return <div ref={divRef}>{count}</div>;
}
```

### Updater Functions (Critical for Interviews!)

When you call `setState` multiple times in one handler with the same value:

```jsx
// ⛔ WRONG — stale closure: all three see the SAME `count` from this render
function Counter() {
  const [count, setCount] = useState(0);

  function handleTripleIncrement() {
    setCount(count + 1); // count=0, sets to 1
    setCount(count + 1); // count=0, sets to 1 (NOT 2!)
    setCount(count + 1); // count=0, sets to 1 (NOT 3!)
    // Final result: count = 1, not 3!
  }

  return <button onClick={handleTripleIncrement}>{count}</button>;
}

// ✅ CORRECT — updater function: always reads the LATEST queued value
function Counter() {
  const [count, setCount] = useState(0);

  function handleTripleIncrement() {
    setCount(n => n + 1); // n=0 → 1
    setCount(n => n + 1); // n=1 → 2
    setCount(n => n + 1); // n=2 → 3
    // Final result: count = 3 ✓
  }

  return <button onClick={handleTripleIncrement}>{count}</button>;
}
```

**How React processes the queue:**

```
State Queue after handleTripleIncrement():
┌──────────────┬─────────────────┬────────┐
│   Queued Op  │   Prev Value    │ Result │
├──────────────┼─────────────────┼────────┤
│ n => n + 1   │       0         │   1    │
│ n => n + 1   │       1         │   2    │
│ n => n + 1   │       2         │   3    │
└──────────────┴─────────────────┴────────┘
Final state: 3
```

> **Rule:** Use updater functions (`n => n + 1`) when the new state depends on the previous state, especially when calling `setState` multiple times in a row or inside async code.

---

## 7. 🎣 `useEffect` — Synchronizing With the Outside World

### The Core Concept

`useEffect` is React's **escape hatch** — a way to step outside the pure functional world and interact with external systems (APIs, DOM, timers, subscriptions).

```
render    →   commit to DOM   →   useEffect runs
(pure)        (React controls)   (your side effects here)
```

**Mental model:** `useEffect` says *"After React has finished rendering and updated the DOM, run this code."*

### Syntax & The 3 Forms

```jsx
import { useEffect } from "react";

// FORM 1: No dependency array → runs after EVERY render
useEffect(() => {
  console.log("I run after every render");
});

// FORM 2: Empty dependency array → runs ONLY on mount (component appears)
useEffect(() => {
  console.log("I run once when component mounts");
}, []);

// FORM 3: With dependencies → runs on mount + when any dependency changes
useEffect(() => {
  console.log("I run when userId or theme changes");
}, [userId, theme]);
```

| Dependency Array | When Effect Runs |
|---|---|
| Not provided | After every render |
| `[]` (empty) | Once on mount |
| `[a, b]` | On mount + whenever `a` or `b` changes |

### Real-World Example: Data Fetching

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Guard variable for cleanup — prevents stale updates
    let isMounted = true;

    setLoading(true);
    setError(null);

    fetch(`/api/users/${userId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        if (isMounted) {        // Only update state if component still mounted
          setUser(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    // Cleanup function — runs when:
    // 1. userId changes (before effect re-runs)
    // 2. Component unmounts
    return () => {
      isMounted = false; // Prevent state updates on unmounted component
    };
  }, [userId]); // Re-run whenever userId changes

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <h1>{user?.name}</h1>;
}
```

### Real-World Example: Event Subscriptions & Cleanup

```jsx
function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function handleMouseMove(e) {
      setPosition({ x: e.clientX, y: e.clientY });
    }

    // Setup: subscribe to mouse events
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup: unsubscribe when component unmounts or effect re-runs
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []); // Only set up once on mount

  return <p>Mouse: {position.x}, {position.y}</p>;
}
```

### Real-World Example: Timer with Cleanup

```jsx
function Countdown({ seconds }) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    if (remaining <= 0) return; // No timer needed

    const timerId = setInterval(() => {
      setRemaining((r) => r - 1); // Updater function — reads latest queued value
    }, 1000);

    // Cleanup: clear interval when component unmounts OR seconds prop changes
    return () => clearInterval(timerId);
  }, [remaining]); // Re-run when remaining changes (or use [seconds] + reset logic)

  return <p>{remaining > 0 ? `${remaining}s remaining` : "Time's up!"}</p>;
}
```

### Strict Mode Double-Fire in Development

```jsx
// In development with <StrictMode>, React intentionally:
// 1. Mounts the component
// 2. Immediately unmounts it (runs cleanup)
// 3. Remounts it again
// This is to STRESS-TEST your cleanup functions!

useEffect(() => {
  const connection = createConnection();
  connection.connect();
  console.log("Connected"); // Prints TWICE in dev, ONCE in production

  return () => {
    connection.disconnect();
    console.log("Disconnected"); // Cleanup must be correct
  };
}, []);

// If you see a log twice in dev — that's INTENTIONAL. Don't suppress it.
// Fix your cleanup, don't fight Strict Mode.
```

### ⚠️ Common useEffect Mistakes

```jsx
// ⛔ MISTAKE 1: Missing cleanup for subscriptions
useEffect(() => {
  window.addEventListener("resize", handleResize);
  // No cleanup! Memory leak + multiple listeners on re-renders
});

// ✅ FIXED
useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);

// ⛔ MISTAKE 2: Infinite loop — setting state on every render
useEffect(() => {
  setCount(count + 1); // no dep array → runs every render → triggers render...
});

// ✅ FIXED — conditional or with proper deps
useEffect(() => {
  // Only runs once on mount
  setCount(42);
}, []);

// ⛔ MISTAKE 3: Using useEffect for pure transformations
useEffect(() => {
  // DON'T do this — computing derived state from state/props
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// ✅ FIXED — just compute it inline (no effect needed)
const fullName = `${firstName} ${lastName}`;
```

---

## 8. 🍳 The Kitchen Analogy — Tying It All Together

Think of a React app as a **professional restaurant kitchen**:

| Kitchen Concept | React Concept |
|---|---|
| **Recipe book** | Component definition |
| **Chef reads the recipe** | React calls the component function (render) |
| **Recipe formula** | Render logic (pure — same ingredients = same dish) |
| **The dish produced** | JSX output |
| **Plating the dish** | Committing to DOM |
| **Customer eats (interaction)** | User event (click, type, submit) |
| **Waiter takes the full order** | React batching multiple setState calls |
| **Waiter submits order at once** | Single re-render for all batched updates |
| **Kitchen prep tasks (after plating)** | useEffect (runs after render is committed) |
| **Dish washing after service** | useEffect cleanup function |
| **Health inspector visits twice** | React Strict Mode — double-invokes to catch bugs |
| **"Don't change the recipe mid-cook"** | No side effects in render logic |
| **"Don't use yesterday's ingredients"** | No stale closures — use updater functions |

---

## 9. 🎯 Interview Cheat Sheet

### Q: What is the difference between render logic and event handlers?

> **Render logic** is code that runs at the top level of a component during rendering — it must be pure (no side effects). **Event handlers** are nested functions that run when a user interacts — they can contain side effects.

---

### Q: What is a pure function? Why does React require components to be pure?

> A pure function: (1) returns the same output for the same input, (2) has no side effects. React requires purity because it may call components multiple times (Concurrent Rendering, Strict Mode). Pure components make React's optimizations (memoization, bailout on same props, time-travel debugging) possible.

---

### Q: What is a side effect? Where can you put side effects in React?

> A side effect is any operation that interacts outside the function's scope — API calls, DOM mutations, timers, subscriptions. In React, side effects are allowed in: **event handlers** (user interactions) and **`useEffect`** (after render is committed to DOM).

---

### Q: What is state update batching? What changed in React 18?

> Batching = React groups multiple setState calls from the same event handler into a single re-render. In **React 17**, batching only worked inside React event handlers. In **React 18**, **automatic batching** extends this to `setTimeout`, Promises, native event handlers, and any other context. Use `flushSync()` to opt out.

---

### Q: What's the difference between `setState(value)` and `setState(n => value)`?

> `setState(value)` directly sets the state — if called multiple times, all calls see the **same stale** value from the current render. `setState(n => n + 1)` is an **updater function** — it receives the latest queued value as `n`, enabling correct sequential updates. **Always use updater functions when the new state depends on the previous state.**

---

### Q: Explain the useEffect dependency array.

> - **No array:** Effect runs after every render.
> - **`[]`:** Effect runs once after mount.
> - **`[a, b]`:** Effect runs after mount and whenever `a` or `b` changes (compared with `Object.is`).
> You cannot "choose" dependencies — they're determined by what reactive values the effect uses. The ESLint `exhaustive-deps` rule enforces this.

---

### Q: Why does useEffect fire twice in development?

> React's **Strict Mode** intentionally mounts, unmounts, and remounts components in development to verify that your cleanup functions are correct. This simulates the `Offscreen` API behavior. In production, effects fire only once. **The fix is to implement proper cleanup — not to suppress Strict Mode.**

---

### Q: What are the rules of render logic?

1. **No side effects** — no API calls, no DOM mutations, no timers, no subscriptions
2. **No mutation** of props, state, or external variables
3. **No conditional hooks** — hooks must be called in the same order every render
4. **No direct state setting** without going through the setter (infinite loop risk)
5. **Must return JSX or null**

---

### Q: What functional programming concepts does React use?

1. **Pure Functions** — components as pure functions of props/state
2. **Immutability** — state updates always create new objects/arrays
3. **First-Class Functions** — passing event handlers as props, `.map()`, `.filter()`
4. **Function Composition** — building UIs by composing components
5. **Declarative Programming** — describe *what* to render, not *how* to update DOM

---

## 📌 Quick Reference Summary

```
┌──────────────────────────────────────────────────────────────────────┐
│                     REACT RULES AT A GLANCE                         │
├────────────────────┬─────────────────────────────────────────────────┤
│ Render Logic       │ MUST be pure — no side effects                  │
│ Event Handlers     │ Side effects are fine                           │
│ State Updates      │ Always use setter, never mutate directly        │
│ Immutability       │ Spread operator, .map(), .filter() for updates  │
│ Batching (React18) │ Auto-batched everywhere, flushSync to opt out   │
│ Updater Functions  │ Use n => n+1 when new state depends on prev     │
│ useEffect []       │ Runs once on mount                              │
│ useEffect [dep]    │ Runs on mount + when dep changes                │
│ useEffect cleanup  │ ALWAYS clean up subscriptions/timers/listeners  │
│ Strict Mode        │ Double-fires effects in dev — test your cleanup │
└────────────────────┴─────────────────────────────────────────────────┘
```

---

*Sources: [React Docs — Keeping Components Pure](https://react.dev/learn/keeping-components-pure) · [Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects) · [Queueing State Updates](https://react.dev/learn/queueing-a-series-of-state-updates) · [React v18 — Automatic Batching](https://react.dev/blog/2022/03/29/react-v18#new-feature-automatic-batching)*
