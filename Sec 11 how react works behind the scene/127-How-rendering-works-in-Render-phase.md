# React Internals: Virtual DOM, Fiber, Reconciliation & Diffing — Interview Deep Dive

> **TL;DR:** Component → Virtual DOM → Reconciliation (Diffing) → Fiber Tree → Commit → Real DOM → Browser Paint

---

## 🎯 Quick Reference Table for Interviews

| Concept | What It Is | Key Purpose |
|---------|-----------|-------------|
| **Virtual DOM** | Lightweight JS object tree | Efficient diffing before real DOM updates |
| **Shadow DOM** | Browser API for encapsulation | Isolate component styles/DOM (Web Components) |
| **Fiber** | Unit of work (internal node) | Enable pausable, prioritized rendering |
| **Reconciliation** | Process of comparing trees | Determine what changed |
| **Diffing** | Algorithm within reconciliation | Find minimal differences (O(n) complexity) |
| **Current Tree** | Fiber tree on screen | Reference for what user sees |
| **Work-in-Progress Tree** | Fiber tree being built | New state being calculated |
| **Commit Phase** | Apply changes to DOM | Synchronous, can't be interrupted |

---

## 📊 The Complete Rendering Pipeline

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          REACT RENDERING PIPELINE                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   1. TRIGGER                                                                │
│   ├── Initial render: ReactDOM.createRoot().render(<App />)                │
│   └── Re-render: setState(), useState setter, context change               │
│                           ↓                                                 │
│   2. RENDER PHASE (Can be paused/aborted - Async)                          │
│   ├── Call component functions (create React Elements)                     │
│   ├── Build Virtual DOM tree (React Element Tree)                          │
│   ├── Create/Update Fiber nodes from Virtual DOM                           │
│   ├── Compare with Current Fiber Tree (DIFFING)                            │
│   └── Collect effects (list of DOM changes needed)                         │
│                           ↓                                                 │
│   3. COMMIT PHASE (Cannot be interrupted - Sync)                           │
│   ├── Apply all DOM mutations at once                                      │
│   ├── Work-in-Progress becomes Current                                     │
│   └── Run layout effects (useLayoutEffect)                                 │
│                           ↓                                                 │
│   4. BROWSER PAINT                                                          │
│   ├── Browser calculates styles, layout                                    │
│   ├── Paints pixels to screen                                              │
│   └── Run passive effects (useEffect)                                      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ Initial Render: Component Tree → Virtual DOM

### What Happens During Initial Render?

When React first renders your application, it goes through this process:

```jsx
// Step 1: You write JSX (Developer code)
function App() {
  return (
    <div className="app">
      <Header title="Hello" />
      <Content>
        <p>Welcome!</p>
      </Content>
    </div>
  );
}

// Step 2: Babel compiles JSX to React.createElement() calls
function App() {
  return React.createElement(
    'div',
    { className: 'app' },
    React.createElement(Header, { title: 'Hello' }),
    React.createElement(
      Content,
      null,
      React.createElement('p', null, 'Welcome!')
    )
  );
}

// Step 3: React.createElement returns React Elements (Virtual DOM nodes)
// These are plain JavaScript objects!
{
  type: 'div',
  props: {
    className: 'app',
    children: [
      {
        type: Header,           // Reference to component function
        props: { title: 'Hello' },
        key: null
      },
      {
        type: Content,
        props: {
          children: {
            type: 'p',
            props: { children: 'Welcome!' },
            key: null
          }
        },
        key: null
      }
    ]
  },
  key: null
}
```

### The Virtual DOM is NOT the DOM

```javascript
// A React Element (Virtual DOM node) is just a plain object:
const element = {
  type: 'button',
  props: {
    className: 'btn-primary',
    onClick: handleClick,
    children: 'Click me'
  },
  key: null,
  ref: null,
  $$typeof: Symbol.for('react.element') // Security against XSS
};

// Compare to actual DOM node (much heavier!):
const domNode = document.createElement('button');
// Has 100+ properties: innerHTML, outerHTML, classList, style,
// offsetWidth, offsetHeight, parentNode, childNodes, addEventListener...
```

### 🏠 Analogy: Blueprint → Construction Plan → Building

| Stage | Analogy | React Equivalent |
|-------|---------|------------------|
| **Component** | Architect's Blueprint | Function/class definition |
| **React Element** | Construction Plan | Virtual DOM node (JS object) |
| **Fiber** | Work Order for each task | Internal work unit |
| **DOM Node** | Actual Building | Real browser element |

> **Interview Tip:** "The Virtual DOM is React's way of planning what changes to make before touching the expensive real DOM. It's like sketching changes on paper before remodeling a room."

---

## 2️⃣ What is Virtual DOM and Why Does It Exist?

### The Problem: Direct DOM Manipulation is Expensive

```javascript
// Every DOM operation triggers browser work:
element.innerHTML = 'new content';  // Parse HTML, build nodes
element.style.color = 'red';        // Recalculate styles
element.appendChild(child);         // Reflow (recalculate layout)
                                    // Repaint (redraw pixels)
                                    // Composite (layer management)

// Multiple changes = Multiple reflows!
for (let i = 0; i < 100; i++) {
  list.appendChild(createItem(i));  // 100 reflows! Very slow!
}
```

### The Solution: Batch Updates with Virtual DOM

```javascript
// React's approach:
// 1. Make all changes in memory (fast)
// 2. Calculate the diff (fast)
// 3. Apply minimal DOM changes at once (optimized)

// Behind the scenes:
const oldVDOM = { type: 'ul', children: [] };
const newVDOM = { type: 'ul', children: Array(100).fill(item) };

// React diffs these, finds: "Add 100 children"
// Then: Uses DocumentFragment or batched appendChild
// Result: ONE reflow instead of 100!
```

### Virtual DOM Benefits

```
┌────────────────────────────────────────────────────────────────┐
│ WITHOUT Virtual DOM          │ WITH Virtual DOM                │
├──────────────────────────────┼─────────────────────────────────┤
│ Change state                 │ Change state                    │
│     ↓                        │     ↓                           │
│ Update DOM immediately       │ Update Virtual DOM (JS object)  │
│     ↓                        │     ↓                           │
│ Browser reflows              │ Diff old vs new Virtual DOM     │
│     ↓                        │     ↓                           │
│ Change more state            │ Collect minimal changes         │
│     ↓                        │     ↓                           │
│ Update DOM again             │ Batch update real DOM ONCE      │
│     ↓                        │     ↓                           │
│ Browser reflows AGAIN        │ Browser reflows ONCE            │
│                              │                                 │
│ Result: Janky, slow UI       │ Result: Smooth 60fps UI         │
└──────────────────────────────┴─────────────────────────────────┘
```

### 🏠 Analogy: Editing a Draft vs Published Document

> **Virtual DOM** is like editing a Google Docs draft privately. You make 50 changes, review them, then hit "Publish" once. The readers only see the final version — not the 50 intermediate states.

---

## 3️⃣ Virtual DOM vs Shadow DOM — Critical Distinction!

⚠️ **This is a common interview question!** They are completely different concepts.

### Quick Comparison

| Aspect | Virtual DOM | Shadow DOM |
|--------|-------------|------------|
| **Created by** | React (library concept) | Browser (Web API) |
| **Lives in** | JavaScript memory | Actual DOM tree |
| **Purpose** | Efficient updates | Style/DOM encapsulation |
| **Used for** | Diffing, batching | Web Components isolation |
| **Is real DOM?** | No, it's a JS object | Yes, it's real DOM |
| **Framework-specific?** | Yes (React, Vue) | No (browser standard) |

### Virtual DOM — React's Abstraction

```jsx
// Virtual DOM exists only in JavaScript memory
// It's React's internal representation

function Counter() {
  const [count, setCount] = useState(0);
  
  // This JSX becomes a Virtual DOM node (JS object)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}

// Virtual DOM representation:
{
  type: 'div',
  props: {
    children: [
      { type: 'p', props: { children: ['Count: ', 0] } },
      { type: 'button', props: { onClick: fn, children: '+' } }
    ]
  }
}
```

### Shadow DOM — Browser's Encapsulation API

```html
<!-- Shadow DOM is actual DOM, hidden from outside -->
<my-card>
  #shadow-root (open)
    <style>
      /* These styles are SCOPED - won't leak out */
      p { color: red; }
    </style>
    <p>I'm isolated!</p>
</my-card>

<p>I'm NOT red, because Shadow DOM encapsulates styles</p>
```

```javascript
// Creating Shadow DOM (Web Components)
class MyCard extends HTMLElement {
  constructor() {
    super();
    // Attach shadow DOM to this element
    const shadow = this.attachShadow({ mode: 'open' });
    
    // Shadow DOM content is isolated from outside CSS/JS
    shadow.innerHTML = `
      <style>
        /* Scoped styles - only affect this shadow tree */
        .card { border: 1px solid blue; padding: 10px; }
      </style>
      <div class="card">
        <slot></slot>  <!-- Projection slot for children -->
      </div>
    `;
  }
}
customElements.define('my-card', MyCard);
```

### 🏠 Analogy for Interview

> **Virtual DOM** is like an architect's 3D modeling software — it lets you plan and preview changes before actual construction.
> 
> **Shadow DOM** is like a private room with its own electrical system — what happens inside doesn't affect (or get affected by) the rest of the house.

### Interview Answer Template

> "Virtual DOM and Shadow DOM solve completely different problems. Virtual DOM is React's JavaScript representation of the UI that enables efficient diffing and batched updates — it exists only in memory. Shadow DOM is a browser API that provides encapsulation for Web Components — it's actual DOM that's scoped and isolated from the rest of the page. You could theoretically use both together: a React app rendering into a Shadow DOM for encapsulation."

---

## 4️⃣ Re-rendering: From State Change to Screen Update

### What Triggers a Re-render?

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  
  // These TRIGGER re-renders:
  // 1. useState setter: setCount(1)
  // 2. useReducer dispatch
  // 3. Context value change (if component uses that context)
  // 4. Parent re-rendering (see section 5)
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(c => c + 1)}>+</button>
    </div>
  );
}
```

### The Re-render Flow

```
STATE CHANGE: setCount(1)
        ↓
┌───────────────────────────────────────────────────────────────┐
│ RENDER PHASE                                                   │
│                                                               │
│  1. React schedules update for Counter component              │
│  2. Calls Counter() function again                            │
│  3. useState returns NEW value (count = 1)                    │
│  4. Returns NEW Virtual DOM tree:                             │
│     { type: 'div', children: [{ type: 'p', children: '1' }] } │
│                                                               │
│  5. DIFFING: Compare OLD tree vs NEW tree                     │
│     OLD: <p>0</p>  vs  NEW: <p>1</p>                         │
│     DIFF: Text content changed from "0" to "1"                │
│                                                               │
│  6. Record effect: "Update text content of <p>"               │
└───────────────────────────────────────────────────────────────┘
        ↓
┌───────────────────────────────────────────────────────────────┐
│ COMMIT PHASE                                                   │
│                                                               │
│  1. Apply collected effects to real DOM                       │
│     document.querySelector('p').textContent = '1';            │
│  2. Run useLayoutEffect callbacks                             │
│  3. Work-in-progress tree becomes current tree                │
└───────────────────────────────────────────────────────────────┘
        ↓
┌───────────────────────────────────────────────────────────────┐
│ BROWSER PAINT                                                  │
│                                                               │
│  1. Browser recalculates styles                               │
│  2. Performs layout (if needed)                               │
│  3. Paints pixels to screen                                   │
│  4. React runs useEffect callbacks                            │
└───────────────────────────────────────────────────────────────┘
```

### Code Example: Tracing a Re-render

```jsx
function App() {
  console.log('App rendering');
  const [theme, setTheme] = useState('light');
  
  return (
    <div className={theme}>
      <Header />           {/* Will this re-render? */}
      <Counter />          {/* Will this re-render? */}
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

function Header() {
  console.log('Header rendering');
  return <h1>My App</h1>;
}

function Counter() {
  console.log('Counter rendering');
  const [count, setCount] = useState(0);
  return <p>{count}</p>;
}

// When setTheme is called:
// Console output:
// "App rendering"
// "Header rendering"   <- Even though Header has no props!
// "Counter rendering"  <- Even though Counter has own state!
```

---

## 5️⃣ Why All Children Re-render (Even Without Prop Changes)

### The "Problem"

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Parent count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
      
      {/* Child receives NO props, yet re-renders every time! */}
      <ExpensiveChild />
    </div>
  );
}

function ExpensiveChild() {
  console.log('ExpensiveChild rendering!');
  // Imagine heavy computation here...
  return <div>I'm expensive to render!</div>;
}
```

### Why This Happens

```
When Parent's state changes:

1. React calls Parent() function
2. Parent() returns JSX including <ExpensiveChild />
3. React sees ExpensiveChild in the returned tree
4. React calls ExpensiveChild() to get its output
5. This is what "rendering" means - calling the function!

React's philosophy:
"I don't know if ExpensiveChild's output changed until I call it.
 Props might be the same, but it might use context, or read global state."

So React plays it safe: call ALL child components.
```

### Visual Explanation

```
BEFORE: Component Tree                AFTER: setCount(1)
                                      
     Parent (count: 0)                     Parent (count: 1)
     /      |       \                      /      |       \
    p    button   ExpensiveChild          p    button   ExpensiveChild
  "0"              ↑                     "1"              ↑
                   |                                      |
        RE-RENDERS even though                  Still re-renders!
        nothing changed for it!
```

### Important Distinction: Render ≠ DOM Update

```jsx
// "Rendering" in React means CALLING the component function
// It does NOT mean updating the DOM!

function Child({ name }) {
  console.log('Child rendering');  // This logs...
  return <p>{name}</p>;
}

function Parent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      <Child name="Alice" />  {/* name never changes */}
    </div>
  );
}

// When clicking button:
// - Child function IS called (rendered)
// - Console logs "Child rendering"
// - But Virtual DOM comparison shows NO change
// - So real DOM is NOT updated for Child!
// - Only Parent's button click handler runs
```

### Optimization: React.memo

```jsx
// Wrap component to skip re-rendering when props are equal
const ExpensiveChild = React.memo(function ExpensiveChild({ data }) {
  console.log('ExpensiveChild rendering');
  return <div>{/* expensive rendering */}</div>;
});

function Parent() {
  const [count, setCount] = useState(0);
  const [data] = useState({ name: 'test' });
  
  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>+</button>
      {/* 
        With memo: ExpensiveChild WON'T re-render when count changes,
        because data reference is stable (same object)
      */}
      <ExpensiveChild data={data} />
    </div>
  );
}
```

### ⚠️ Common Mistake with memo

```jsx
const Child = React.memo(({ onClick }) => {
  console.log('Child rendering');
  return <button onClick={onClick}>Click</button>;
});

function Parent() {
  const [count, setCount] = useState(0);
  
  // ❌ BAD: New function created every render!
  // memo won't help because onClick is always a new reference
  const handleClick = () => console.log('clicked');
  
  // ✅ GOOD: useCallback maintains reference
  const handleClickStable = useCallback(() => {
    console.log('clicked');
  }, []);
  
  return <Child onClick={handleClickStable} />;
}
```

### 🏠 Analogy

> When you update one chapter in a book, the publisher still reviews ALL chapters to check what pages need reprinting. The review (render) is fast. The actual printing (DOM update) only happens for changed pages.

---

## 6️⃣ Reconciliation and the Diffing Algorithm

### What is Reconciliation?

```
Reconciliation = The process of comparing two Virtual DOM trees
                 to determine what actually changed

Diffing = The algorithm used to find differences efficiently
```

### Why Diffing is Necessary

```jsx
// State change triggers new Virtual DOM tree
// We need to compare:

// OLD Virtual DOM           NEW Virtual DOM
{                            {
  type: 'ul',                  type: 'ul',
  children: [                  children: [
    { type: 'li', key: 'a',      { type: 'li', key: 'a',
      children: 'Apple' },         children: 'Apple' },
    { type: 'li', key: 'b',      { type: 'li', key: 'b',
      children: 'Banana' },        children: 'Blueberry' }, // Changed!
    { type: 'li', key: 'c',      { type: 'li', key: 'c',
      children: 'Cherry' }         children: 'Cherry' },
  ]                              { type: 'li', key: 'd',
}                                  children: 'Date' }     // Added!
                               ]
                             }

// Result of diffing:
// 1. Update text content of li[key='b'] from 'Banana' to 'Blueberry'
// 2. Append new li[key='d'] with text 'Date'
```

### The Two Assumptions (O(n) Complexity)

React's diffing algorithm works in O(n) time instead of O(n³) because of two heuristics:

```jsx
// ASSUMPTION 1: Different types produce different trees
// If element type changes, destroy old tree, build new

// OLD                        NEW
<div>                         <span>
  <Counter />                   <Counter />
</div>                        </span>

// React's decision: Types differ (div vs span)
// Action: Destroy entire old tree, build new tree from scratch
// Counter component will UNMOUNT and REMOUNT (state lost!)


// ASSUMPTION 2: Keys identify elements across renders
// Stable keys help React track elements

// OLD                        NEW
<ul>                          <ul>
  <li key="1">First</li>        <li key="0">Zeroth</li>  {/* New */}
  <li key="2">Second</li>       <li key="1">First</li>   {/* Moved */}
</ul>                           <li key="2">Second</li>  {/* Moved */}
                              </ul>

// With keys: React knows "1" and "2" moved, just insert "0"
// Without keys: React would update all three items (much slower!)
```

### Diffing Rules in Detail

```jsx
// RULE 1: Same Element Type → Update Props
// OLD: <button className="blue">Submit</button>
// NEW: <button className="red">Submit</button>
// Action: Update className attribute only

// RULE 2: Different Element Type → Replace
// OLD: <div><Counter /></div>
// NEW: <span><Counter /></span>
// Action: Unmount Counter, destroy div, create span, mount new Counter

// RULE 3: Same Component Type → Update Instance
// OLD: <Counter count={1} />
// NEW: <Counter count={2} />
// Action: Update props on existing Counter instance, re-render

// RULE 4: Component Type Changed → Replace
// OLD: <ClassCounter />
// NEW: <FunctionCounter />
// Action: Unmount ClassCounter, mount FunctionCounter (even if same output!)
```

### Keys: The Reconciliation Superpower

```jsx
// ❌ BAD: Using array index as key
{items.map((item, index) => (
  <TodoItem key={index} item={item} />
))}

// What happens when you insert item at beginning:
// OLD: [A, B, C] with keys [0, 1, 2]
// NEW: [X, A, B, C] with keys [0, 1, 2, 3]
//
// React sees:
// - Key 0: was A, now X → UPDATE (wrong! should insert)
// - Key 1: was B, now A → UPDATE (wrong!)
// - Key 2: was C, now B → UPDATE (wrong!)
// - Key 3: new → CREATE
// Result: Updates 3 items instead of inserting 1!

// ✅ GOOD: Using stable unique ID as key
{items.map((item) => (
  <TodoItem key={item.id} item={item} />
))}

// OLD: [A, B, C] with keys ['a', 'b', 'c']
// NEW: [X, A, B, C] with keys ['x', 'a', 'b', 'c']
//
// React sees:
// - Key 'x': new → INSERT
// - Key 'a': same → KEEP
// - Key 'b': same → KEEP
// - Key 'c': same → KEEP
// Result: Only 1 insert operation!
```

### 🏠 Analogy: Git Diff

> Reconciliation is like `git diff` between two commits. Git doesn't compare every possible way files could have changed — it uses smart heuristics to find the minimal set of changes. Similarly, React's diffing uses rules (types, keys) to efficiently find what changed.

---

## 7️⃣ Fiber Architecture Deep Dive

### What is Fiber?

```javascript
// A Fiber is a JavaScript object representing a unit of work
// Each component instance has a corresponding Fiber

// Simplified Fiber structure:
{
  // Identity
  type: Counter,          // Component function/class, or 'div', 'span', etc.
  key: null,              // Key for reconciliation
  
  // Tree structure (linked list)
  child: Fiber | null,    // First child fiber
  sibling: Fiber | null,  // Next sibling fiber
  return: Fiber | null,   // Parent fiber
  
  // Component data
  pendingProps: {},       // Props for next render
  memoizedProps: {},      // Props from last render
  memoizedState: {},      // State from last render
  
  // Effects
  flags: 'Placement' | 'Update' | 'Deletion',  // What DOM change needed
  
  // Double buffering
  alternate: Fiber | null,  // Link to other tree version
  
  // Priority (for Concurrent Mode)
  lanes: Lanes,            // Priority level
}
```

### Why Fiber Was Created

```
Before Fiber (React 15 and earlier):
─────────────────────────────────────
- Reconciliation was SYNCHRONOUS
- Once started, couldn't be interrupted
- Large updates blocked the main thread
- Animations would jank during heavy renders

The call stack approach:
┌─────────────────────────────────────┐
│ render(App)                         │ ← Can't pause!
│   render(Header)                    │
│     render(NavItem)                 │
│     render(NavItem)                 │
│   render(MainContent)               │ ← Still can't pause!
│     render(Card)                    │
│       render(Image)                 │
│       render(Title)                 │
│     render(Card)                    │
│       ...100 more components...     │ ← User input blocked!
│   render(Footer)                    │
└─────────────────────────────────────┘

With Fiber (React 16+):
─────────────────────────────────────
- Work is split into UNITS (Fibers)
- Each fiber represents ~one component
- React can PAUSE between units
- High-priority work can interrupt low-priority
- Enables Concurrent Mode, Suspense, Time Slicing
```

### Fiber Tree Structure

```jsx
function App() {
  return (
    <div>
      <Header />
      <Content>
        <Article />
        <Sidebar />
      </Content>
    </div>
  );
}

// Corresponding Fiber tree (linked list structure):

FiberNode(App)
    │
    │ child
    ↓
FiberNode(div)
    │
    │ child
    ↓
FiberNode(Header) ──sibling──→ FiberNode(Content)
    │                               │
    │ return                        │ child
    ↓                               ↓
FiberNode(div)              FiberNode(Article) ──sibling──→ FiberNode(Sidebar)


// Traversal order (depth-first):
// 1. App (child→)
// 2. div (child→)
// 3. Header (sibling→)
// 4. Content (child→)
// 5. Article (sibling→)
// 6. Sidebar (return↑)
// 7. Content (return↑)
// 8. div (return↑)
// 9. App ✓ Complete
```

### How Fiber Enables Pausable Rendering

```javascript
// Simplified work loop (pseudo-code)
function workLoop(deadline) {
  let currentFiber = nextUnitOfWork;
  
  // Keep working while there's time and work to do
  while (currentFiber && deadline.timeRemaining() > 0) {
    // Process one fiber (call component, diff children)
    currentFiber = performUnitOfWork(currentFiber);
  }
  
  // If there's more work, schedule for next idle time
  if (currentFiber) {
    requestIdleCallback(workLoop);
  } else {
    // All fibers processed, commit changes to DOM
    commitRoot();
  }
}

// This allows:
// 1. Processing one component at a time
// 2. Checking if browser needs to handle user input
// 3. Pausing if needed, resuming later
// 4. Higher priority updates can interrupt lower priority
```

### 🏠 Analogy: Virtual Call Stack

> React Fiber is like a reimplemented call stack that you control. Normal JavaScript uses the browser's call stack — once a function starts, it runs to completion. Fiber creates a "virtual stack" using linked objects, so React can "pause" a function, do something else (like handle a click), and come back to finish later.

---

## 8️⃣ Current vs Work-in-Progress Fiber Trees (Double Buffering)

### The Two Trees

```
┌─────────────────────────────────────────────────────────────────┐
│                     DOUBLE BUFFERING                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   CURRENT TREE              WORK-IN-PROGRESS TREE               │
│   (What's on screen)        (What we're building)                │
│                                                                  │
│   FiberRoot                 FiberRoot                           │
│       │                         │                                │
│       ↓                         ↓                                │
│   ┌─────────┐   alternate   ┌─────────┐                         │
│   │ App     │←─────────────→│ App     │                         │
│   │count: 0 │               │count: 1 │ ← new state             │
│   └─────────┘               └─────────┘                         │
│       │                         │                                │
│       ↓                         ↓                                │
│   ┌─────────┐   alternate   ┌─────────┐                         │
│   │Counter  │←─────────────→│Counter  │                         │
│   │value: 0 │               │value: 1 │ ← new state             │
│   └─────────┘               └─────────┘                         │
│                                                                  │
│                      After COMMIT:                               │
│                                                                  │
│              Work-in-Progress BECOMES Current                    │
│              Old Current becomes recyclable                      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### How It Works

```javascript
// When update starts:
// 1. Clone current fiber into work-in-progress (or reuse alternate)
function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;
  
  if (workInProgress === null) {
    // First time: create new fiber
    workInProgress = createFiber(current.type, pendingProps);
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    // Reuse existing alternate fiber
    workInProgress.pendingProps = pendingProps;
    // Reset effects
    workInProgress.flags = NoFlags;
  }
  
  // Copy over static properties
  workInProgress.child = current.child;
  workInProgress.memoizedState = current.memoizedState;
  
  return workInProgress;
}

// During render phase:
// - Work-in-progress tree is built/updated
// - Current tree remains unchanged (stable for reading)

// During commit phase:
// - DOM mutations applied from work-in-progress
// - FiberRoot.current switches to point at work-in-progress
// - Work-in-progress becomes the new current
// - Old current becomes available for next update
```

### Why Double Buffering?

```
Benefits:
1. CONSISTENT UI: Users see stable current tree until commit
2. ERROR RECOVERY: Can discard work-in-progress if error occurs
3. MEMORY EFFICIENT: Reuse fibers via alternate pointer
4. CONCURRENT MODE: Can work on future state without showing partial UI
```

### 🏠 Analogy: Video Game Double Buffering

> Games render the next frame to a "back buffer" while displaying the current frame. Once the new frame is ready, they swap buffers instantly. React does the same — building the next UI state in work-in-progress while current state is displayed.

---

## 9️⃣ Why Not Update the Entire DOM?

### The Cost of DOM Operations

```javascript
// Each DOM operation can trigger:

// 1. STYLE RECALCULATION
//    Browser recomputes which CSS rules apply
element.className = 'new-class';

// 2. LAYOUT/REFLOW
//    Browser recalculates positions and sizes
element.style.width = '100px';
element.appendChild(child);

// 3. PAINT
//    Browser draws pixels for affected areas
element.style.backgroundColor = 'red';

// 4. COMPOSITE
//    Browser combines painted layers
element.style.transform = 'translateX(10px)';

// Timeline:
// ┌─────────┬───────────┬───────┬───────────┬─────────────────┐
// │ JS Exec │  Style    │Layout │   Paint   │   Composite     │
// │         │  Recalc   │       │           │                 │
// └─────────┴───────────┴───────┴───────────┴─────────────────┘
//              ↑           ↑         ↑
//            Expensive operations that block UI
```

### Real-World Comparison

```javascript
// ❌ NAIVE APPROACH: Update entire DOM on every change
function naiveRender(state) {
  // Destroy everything, rebuild from scratch
  document.getElementById('root').innerHTML = '';
  
  const app = document.createElement('div');
  app.innerHTML = `
    <header>...</header>
    <main>
      <div class="counter">${state.count}</div>
      <ul>
        ${state.items.map(item => `<li>${item}</li>`).join('')}
      </ul>
    </main>
    <footer>...</footer>
  `;
  document.getElementById('root').appendChild(app);
}
// Problems:
// - Loses input focus
// - Loses scroll position
// - Destroys event listeners
// - Rerenders EVERYTHING (header, footer that didn't change)
// - Multiple reflows


// ✅ REACT'S APPROACH: Surgical updates
// 1. Diff old Virtual DOM vs new Virtual DOM
// 2. Find: only <div class="counter"> content changed
// 3. Apply: document.querySelector('.counter').textContent = newCount

// Benefits:
// - Input focus preserved
// - Scroll position preserved
// - Event listeners maintained
// - Only changed elements touched
// - Single batched reflow
```

### Performance Numbers

```
Operation                          │ Time (approximate)
───────────────────────────────────┼──────────────────
Read DOM property                  │ ~0.01ms
Write DOM property                 │ ~0.1ms
Append child element               │ ~1ms
Full page innerHTML replacement    │ ~50-100ms (1000 elements)
React targeted update              │ ~1-5ms (same page)

At 60fps, each frame budget is ~16ms
Full replacement = DROPPED FRAMES
React update = SMOOTH ANIMATION
```

### 🏠 Analogy

> Updating the entire DOM is like demolishing your house to change a lightbulb. React's approach is like having a maintenance checklist — check what's broken, fix only those things.

---

## 🔟 How React Knows Which DOM to Change

### The Effect List

```javascript
// During render phase, React collects effects (needed DOM operations)

// Each fiber can be tagged with effect flags:
const NoFlags = 0b0000000;
const Placement = 0b0000010;    // Insert new element
const Update = 0b0000100;       // Update existing element
const Deletion = 0b0001000;     // Remove element
const Callback = 0b0010000;     // Run callback (useEffect)

// After diffing, fibers are linked into an effect list:
// Only fibers with effects are in this list!

effectList = [
  { fiber: counterFiber, flags: Update },    // Update text
  { fiber: newItemFiber, flags: Placement }, // Insert new
  { fiber: oldItemFiber, flags: Deletion }   // Remove old
];

// Commit phase iterates ONLY through effect list
// Not the entire tree!
```

### Position-Based Identity

```jsx
// React identifies elements by their POSITION in the tree
// (plus type and key)

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div>
      {isLoggedIn ? (
        <UserProfile />      // Position: div > child[0]
      ) : (
        <LoginForm />        // Position: div > child[0] (SAME!)
      )}
    </div>
  );
}

// When isLoggedIn changes from false to true:
// OLD: LoginForm at position div > child[0]
// NEW: UserProfile at position div > child[0]

// Same position, DIFFERENT type → Destroy LoginForm, Create UserProfile
// (LoginForm state is lost!)


// To preserve both, render in different positions:
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <div>
      {!isLoggedIn && <LoginForm />}     {/* Position: child[0] */}
      {isLoggedIn && <UserProfile />}    {/* Position: child[1] */}
    </div>
  );
}
// Now they're at different positions, so state is independent
```

### The Reconciliation Decision Tree

```
For each element in new Virtual DOM:

Is there a corresponding element in old tree?
├── NO → PLACEMENT (insert new DOM node)
│
└── YES → Check type
    ├── DIFFERENT TYPE → DELETION + PLACEMENT
    │   (unmount old, mount new, state lost)
    │
    └── SAME TYPE → Check if props changed
        ├── PROPS CHANGED → UPDATE flag
        │   (update DOM attributes)
        │
        └── PROPS SAME → No effect needed
            (but still recurse to children!)

After processing all elements:
Any elements in old tree not in new tree?
└── YES → DELETION (remove DOM nodes)
```

### Code Example: Tracing Reconciliation

```jsx
// Initial render
function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build app' }
  ]);
  
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>{todo.text}</li>
      ))}
    </ul>
  );
}

// User adds new todo:
setTodos([
  { id: 0, text: 'Read docs' },  // NEW
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Build app' }
]);

// Reconciliation process:
// 1. ul: same type, same position → no change
// 2. Children comparison (with keys!):
//    - key="0": NEW → Placement effect
//    - key="1": EXISTS, same type, same props → no effect
//    - key="2": EXISTS, same type, same props → no effect
// 
// Effect list: [{ fiber: li-0, flags: Placement }]
// 
// Commit phase:
// - Insert single <li>Read docs</li> at beginning
// - Other items untouched!
```

---

## 1️⃣1️⃣ How Reconciler Creates Fiber Tree from Virtual DOM

### The Process

```javascript
// When rendering starts, React walks the Virtual DOM
// and creates/updates Fibers

function reconcileChildren(currentFiber, newChildren) {
  // newChildren = array of React Elements (Virtual DOM)
  
  let previousSibling = null;
  let oldFiber = currentFiber?.child;
  
  for (let i = 0; i < newChildren.length; i++) {
    const element = newChildren[i];
    let newFiber = null;
    
    // Compare with old fiber at same position
    const sameType = oldFiber && element && 
                     oldFiber.type === element.type;
    
    if (sameType) {
      // UPDATE: Reuse fiber, just update props
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        dom: oldFiber.dom,         // Reuse DOM node!
        parent: currentFiber,
        alternate: oldFiber,
        flags: Update
      };
    }
    
    if (element && !sameType) {
      // PLACEMENT: Create new fiber
      newFiber = {
        type: element.type,
        props: element.props,
        dom: null,                  // Will create DOM later
        parent: currentFiber,
        alternate: null,
        flags: Placement
      };
    }
    
    if (oldFiber && !sameType) {
      // DELETION: Mark old fiber for removal
      oldFiber.flags = Deletion;
      deletions.push(oldFiber);
    }
    
    // Link fibers (singly-linked list)
    if (i === 0) {
      currentFiber.child = newFiber;
    } else {
      previousSibling.sibling = newFiber;
    }
    
    previousSibling = newFiber;
    oldFiber = oldFiber?.sibling;
  }
  
  // Any remaining old fibers are deletions
  while (oldFiber) {
    oldFiber.flags = Deletion;
    deletions.push(oldFiber);
    oldFiber = oldFiber.sibling;
  }
}
```

### Visual: Virtual DOM to Fiber Tree

```
VIRTUAL DOM (React Elements)          FIBER TREE
════════════════════════════          ═══════════

{                                     FiberNode
  type: 'div',                        ├─ type: 'div'
  props: {                            ├─ flags: None
    className: 'app',                 ├─ child: ─────────────────┐
    children: [                       └─ sibling: null           │
      {                                                          │
        type: 'h1',                       FiberNode ←────────────┘
        props: {                          ├─ type: 'h1'
          children: 'Hello'               ├─ flags: None
        }                                 ├─ child: (text fiber)
      },                                  └─ sibling: ──────────┐
      {                                                         │
        type: 'p',                        FiberNode ←───────────┘
        props: {                          ├─ type: 'p'
          children: 'World'               ├─ flags: None
        }                                 ├─ child: (text fiber)
      }                                   └─ sibling: null
    ]
  }
}

Traversal via: child → sibling → return (parent)
```

---

## 1️⃣2️⃣ Interview Quick-Fire Questions

### Q1: What's the difference between Virtual DOM and Real DOM?
> **A:** Virtual DOM is a lightweight JavaScript object representation of the UI. Real DOM is the browser's actual document model. Virtual DOM allows React to batch and minimize Real DOM operations, which are expensive.

### Q2: Why does React use a Virtual DOM?
> **A:** Direct DOM manipulation triggers expensive browser operations (reflow, repaint). Virtual DOM lets React diff changes in memory (fast), then apply only necessary DOM changes in a single batch.

### Q3: What is reconciliation?
> **A:** The process of comparing the previous Virtual DOM tree with the new one to determine what changed. The result is a list of minimal DOM operations needed.

### Q4: What is a Fiber?
> **A:** A Fiber is a JavaScript object representing a unit of work. It's React's internal data structure that enables pausable, prioritized rendering. Each component instance has a corresponding Fiber.

### Q5: Why do child components re-render when parent re-renders?
> **A:** "Rendering" means calling the component function. React calls all children recursively because it doesn't know what changed until it calls them. However, this doesn't mean DOM updates — only components with actual changes update the DOM.

### Q6: How do keys help React?
> **A:** Keys provide stable identity for list items across renders. Without keys, React uses position, which causes unnecessary DOM updates when items are reordered or inserted.

### Q7: What's the difference between render phase and commit phase?
> **A:** Render phase builds the new Fiber tree and diffs changes — it's interruptible. Commit phase applies DOM mutations — it's synchronous and can't be paused.

### Q8: Virtual DOM vs Shadow DOM?
> **A:** Virtual DOM is React's JS-based abstraction for efficient updates. Shadow DOM is a browser API for DOM/CSS encapsulation in Web Components. They solve different problems and can be used together.

---

## 📝 Summary with Analogies

| Concept | Analogy | One-Liner |
|---------|---------|-----------|
| **Component** | Blueprint | Template for creating UI pieces |
| **React Element** | Construction plan | Plain JS object describing UI |
| **Virtual DOM** | Draft document | In-memory representation for diffing |
| **Fiber** | Work order | Unit of work that can be paused |
| **Reconciliation** | Document review | Finding what changed between versions |
| **Diffing** | Git diff | Algorithm to find minimal changes |
| **Current Tree** | Published version | What user currently sees |
| **WIP Tree** | Draft version | What's being prepared |
| **Commit Phase** | Publishing | Apply changes, make visible |
| **Keys** | ID badges | Stable identity for list items |

### The Complete Flow (Memorize This!)

```
1. STATE CHANGE → triggers re-render
2. RENDER PHASE
   └── Call component functions
   └── Create Virtual DOM (React Elements)
   └── Build/update Fiber tree
   └── Diff with current Fiber tree
   └── Collect effects (DOM operations needed)
3. COMMIT PHASE
   └── Apply effects to real DOM (batch)
   └── WIP tree becomes current tree
4. BROWSER PAINT → User sees changes
```

---

## 🎯 Key Takeaways for Interviews

1. **Virtual DOM is NOT faster than the DOM** — it's smarter. It minimizes DOM operations.

2. **Rendering ≠ DOM updates**. Rendering means calling component functions. DOM only updates if diff finds changes.

3. **Fibers enable Concurrent Mode** by making rendering interruptible. Each fiber is a pausable unit of work.

4. **Keys are crucial for lists** — they provide stable identity and prevent unnecessary re-mounting.

5. **Same position + same type = preserved state**. Change either, and React destroys and recreates.

6. **Two Fiber trees exist** — current (on screen) and work-in-progress (being built). They swap on commit.

7. **The reconciler is renderer-agnostic** — same algorithm works for DOM, Native, VR, etc.

---

> **Final Interview Tip:** If asked about React performance, mention: "React's Virtual DOM isn't about being faster than vanilla JS — it's about being fast enough while providing a declarative API. The real win is developer experience plus good-enough performance through intelligent batching and minimal updates."

---

*Created for interview preparation. Based on React documentation, Fiber architecture docs, and official React team explanations.*
