# React Commit Phase Deep Dive: DOM Flushing, Synchronous Updates & Fiber Tree Swap

> **TL;DR:** Render Phase (async, interruptible, React-controlled) → Commit Phase (sync, uninterruptible, renderer-controlled) → Browser Paint

---

## 🎯 Quick Reference Table for Interviews

| Aspect | Render Phase | Commit Phase |
|--------|-------------|--------------|
| **Nature** | Asynchronous | Synchronous |
| **Interruptible?** | ✅ Yes (can pause/abort) | ❌ No (must complete) |
| **Side Effects?** | ❌ No side effects | ✅ Performs side effects |
| **Controlled by** | React Core (Reconciler) | Renderers (ReactDOM, React Native) |
| **Can be restarted?** | ✅ Yes | ❌ No |
| **DOM Mutations?** | ❌ None | ✅ All mutations happen here |
| **User sees changes?** | ❌ Not yet | ✅ After commit completes |

---

## 📊 Complete Rendering Pipeline: Trigger to Paint

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    REACT RENDERING PIPELINE - COMPLETE VIEW                      │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                  │
│  ╔═══════════════════════════════════════════════════════════════════════════╗  │
│  ║  1. TRIGGER PHASE                                                         ║  │
│  ║  ─────────────────                                                        ║  │
│  ║  • Initial render: ReactDOM.createRoot(container).render(<App />)         ║  │
│  ║  • Re-render: setState(), useState setter, context change                 ║  │
│  ║  • forceUpdate() (class components)                                       ║  │
│  ╚═══════════════════════════════════════════════════════════════════════════╝  │
│                                    ↓                                             │
│  ╔═══════════════════════════════════════════════════════════════════════════╗  │
│  ║  2. RENDER PHASE (Asynchronous - Can be paused/aborted)                   ║  │
│  ║  ──────────────────────────────────────────────────────                   ║  │
│  ║  CONTROLLED BY: React Core (Reconciler)                                   ║  │
│  ║                                                                           ║  │
│  ║  • Call component functions (create React Elements)                       ║  │
│  ║  • Build/update Fiber tree (work-in-progress tree)                        ║  │
│  ║  • Perform DIFFING (compare old vs new)                                   ║  │
│  ║  • Collect EFFECTS (list of DOM operations needed)                        ║  │
│  ║  • NO DOM mutations, NO side effects                                      ║  │
│  ║                                                                           ║  │
│  ║  ⚡ Can be interrupted by higher priority updates                         ║  │
│  ╚═══════════════════════════════════════════════════════════════════════════╝  │
│                                    ↓                                             │
│  ╔═══════════════════════════════════════════════════════════════════════════╗  │
│  ║  3. COMMIT PHASE (Synchronous - Cannot be interrupted)                    ║  │
│  ║  ─────────────────────────────────────────────────────                    ║  │
│  ║  CONTROLLED BY: Renderers (ReactDOM, React Native, etc.)                  ║  │
│  ║                                                                           ║  │
│  ║  ┌─────────────────────────────────────────────────────────────────────┐  ║  │
│  ║  │  SUB-PHASE 1: Before Mutation                                       │  ║  │
│  ║  │  • Read DOM state before changes (getSnapshotBeforeUpdate)          │  ║  │
│  ║  │  • Capture scroll positions, dimensions, etc.                       │  ║  │
│  ║  └─────────────────────────────────────────────────────────────────────┘  ║  │
│  ║                              ↓                                            ║  │
│  ║  ┌─────────────────────────────────────────────────────────────────────┐  ║  │
│  ║  │  SUB-PHASE 2: Mutation (DOM Changes)                                │  ║  │
│  ║  │  • Apply all DOM mutations (appendChild, removeChild, etc.)         │  ║  │
│  ║  │  • Update text content, attributes                                  │  ║  │
│  ║  │  • Execute insertions, deletions, updates                           │  ║  │
│  ║  └─────────────────────────────────────────────────────────────────────┘  ║  │
│  ║                              ↓                                            ║  │
│  ║  ┌─────────────────────────────────────────────────────────────────────┐  ║  │
│  ║  │  SUB-PHASE 3: Layout                                                │  ║  │
│  ║  │  • Work-in-progress tree becomes CURRENT tree                       │  ║  │
│  ║  │  • Attach refs to DOM nodes                                         │  ║  │
│  ║  │  • Run useLayoutEffect callbacks (SYNCHRONOUSLY)                    │  ║  │
│  ║  │  • Run componentDidMount/componentDidUpdate                         │  ║  │
│  ║  └─────────────────────────────────────────────────────────────────────┘  ║  │
│  ╚═══════════════════════════════════════════════════════════════════════════╝  │
│                                    ↓                                             │
│  ╔═══════════════════════════════════════════════════════════════════════════╗  │
│  ║  4. BROWSER PAINT                                                         ║  │
│  ║  ────────────────                                                         ║  │
│  ║  • Browser recalculates styles (Style Recalculation)                      ║  │
│  ║  • Browser performs layout (Reflow)                                       ║  │
│  ║  • Browser paints pixels (Paint)                                          ║  │
│  ║  • Browser composites layers (Composite)                                  ║  │
│  ║  • USER SEES THE UPDATE! 👁️                                               ║  │
│  ╚═══════════════════════════════════════════════════════════════════════════╝  │
│                                    ↓                                             │
│  ╔═══════════════════════════════════════════════════════════════════════════╗  │
│  ║  5. POST-PAINT EFFECTS                                                    ║  │
│  ║  ──────────────────                                                       ║  │
│  ║  • Run useEffect callbacks (ASYNCHRONOUSLY)                               ║  │
│  ║  • Schedule cleanup functions for next render                             ║  │
│  ╚═══════════════════════════════════════════════════════════════════════════╝  │
│                                                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 1️⃣ How DOM Updates are "Flushed" in Commit Phase

### What Does "Flushing" Mean?

**Flushing** = Rendering the fiber's output onto the screen (actual DOM manipulation)

> **Interview Definition:** "Flushing is the process of taking the calculated changes from the render phase and applying them to the actual DOM in a single, synchronous batch."

### The Effect List: Blueprint for DOM Changes

During the render phase, React builds an **effect list** — a linked list of fibers that need DOM operations.

```javascript
// Effect flags that fibers can have (simplified)
const NoFlags =       0b00000000000000000000;
const Placement =     0b00000000000000000010;  // Insert new element
const Update =        0b00000000000000000100;  // Update existing element  
const Deletion =      0b00000000000000001000;  // Remove element
const Callback =      0b00000000000000100000;  // Run lifecycle/effect callbacks
const Ref =           0b00000000000010000000;  // Attach/detach refs
const Snapshot =      0b00000000000100000000;  // getSnapshotBeforeUpdate

// During render phase, fibers are tagged with these flags
// Example: A fiber that needs to be inserted and have a ref attached
fiber.flags = Placement | Ref;  // 0b00000000000010000010
```

### The Commit Process (Pseudo-code)

```javascript
// Simplified commit phase implementation
function commitRoot(root) {
  const finishedWork = root.finishedWork;  // The completed work-in-progress tree
  
  // ═══════════════════════════════════════════════════════════
  // SUB-PHASE 1: BEFORE MUTATION
  // ═══════════════════════════════════════════════════════════
  // Read DOM state before making any changes
  commitBeforeMutationEffects(finishedWork);
  // → Calls getSnapshotBeforeUpdate for class components
  // → Allows reading scroll position, dimensions, etc.
  
  // ═══════════════════════════════════════════════════════════
  // SUB-PHASE 2: MUTATION
  // ═══════════════════════════════════════════════════════════
  // Apply all DOM mutations
  commitMutationEffects(root, finishedWork);
  // → appendChild, removeChild, insertBefore
  // → Update text content, attributes
  // → This is where the DOM actually changes!
  
  // ═══════════════════════════════════════════════════════════
  // CRITICAL MOMENT: TREE SWAP
  // ═══════════════════════════════════════════════════════════
  // Work-in-progress becomes current
  root.current = finishedWork;  // Single pointer swap!
  
  // ═══════════════════════════════════════════════════════════
  // SUB-PHASE 3: LAYOUT
  // ═══════════════════════════════════════════════════════════
  // Run layout effects after DOM is updated
  commitLayoutEffects(finishedWork, root);
  // → Attach refs to DOM nodes
  // → Run useLayoutEffect callbacks
  // → Call componentDidMount/componentDidUpdate
}
```

### How Mutations are Applied (Renderer-specific)

```javascript
// ReactDOM's mutation operations (simplified)
function commitMutationEffects(root, fiber) {
  // Walk through the effect list
  let nextEffect = fiber.firstEffect;
  
  while (nextEffect !== null) {
    const flags = nextEffect.flags;
    
    // Handle PLACEMENT (insertion)
    if (flags & Placement) {
      commitPlacement(nextEffect);
      // Clear the flag after processing
      nextEffect.flags &= ~Placement;
    }
    
    // Handle UPDATE
    if (flags & Update) {
      commitUpdate(nextEffect);
    }
    
    // Handle DELETION
    if (flags & Deletion) {
      commitDeletion(root, nextEffect);
    }
    
    nextEffect = nextEffect.nextEffect;
  }
}

// Actual DOM operations performed by ReactDOM
function commitPlacement(fiber) {
  const parentFiber = getHostParentFiber(fiber);
  const parentDOM = parentFiber.stateNode;  // Actual DOM element
  
  const domNode = fiber.stateNode;
  
  // Find the sibling to insert before (or append at end)
  const before = getHostSibling(fiber);
  
  if (before) {
    parentDOM.insertBefore(domNode, before);
  } else {
    parentDOM.appendChild(domNode);
  }
}

function commitUpdate(fiber) {
  const domNode = fiber.stateNode;
  const newProps = fiber.memoizedProps;
  const oldProps = fiber.alternate?.memoizedProps || {};
  
  // Update changed properties
  updateDOMProperties(domNode, oldProps, newProps);
}

function commitDeletion(root, fiber) {
  // Remove from DOM
  const parentDOM = getHostParent(fiber);
  removeChild(parentDOM, fiber.stateNode);
  
  // Cleanup: detach refs, run cleanup effects
  detachFiberAfterEffects(fiber);
}
```

### Visual: Effect List Processing

```
EFFECT LIST (Collected during Render Phase)
═══════════════════════════════════════════

┌─────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Fiber: div  │────→│ Fiber: p    │────→│ Fiber: span │────→│ Fiber: btn  │
│ flags:      │     │ flags:      │     │ flags:      │     │ flags:      │
│ Update      │     │ Placement   │     │ Deletion    │     │ Update|Ref  │
└─────────────┘     └─────────────┘     └─────────────┘     └─────────────┘
      ↓                   ↓                   ↓                   ↓
  Update text        Insert new          Remove from        Update props
  content            element             DOM                + attach ref


COMMIT PHASE PROCESSES EACH IN ORDER:
═════════════════════════════════════

1. div  → domNode.textContent = 'new text'
2. p    → parentDOM.appendChild(pElement)
3. span → parentDOM.removeChild(spanElement)
4. btn  → updateProps(btnElement); btnRef.current = btnElement
```

---

## 2️⃣ Why Commit Phase is Synchronous (Unlike Async Render Phase)

### The Critical Difference

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    RENDER PHASE vs COMMIT PHASE                             │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   RENDER PHASE (Async, Interruptible)                                      │
│   ════════════════════════════════════                                     │
│                                                                            │
│   ┌────┐  ┌────┐  ┌────┐    ⚡ INTERRUPT    ┌────┐  ┌────┐  ┌────┐        │
│   │ A  │→ │ B  │→ │ C  │ ─────────────────→ │ A  │→ │ B  │→ │ C  │        │
│   └────┘  └────┘  └────┘  (Higher priority  └────┘  └────┘  └────┘        │
│                            update arrives)   Resume where left off         │
│                                                                            │
│   • No side effects, so safe to pause/restart                              │
│   • User doesn't see anything yet                                          │
│   • Can be discarded if update is no longer needed                         │
│                                                                            │
├────────────────────────────────────────────────────────────────────────────┤
│                                                                            │
│   COMMIT PHASE (Sync, Uninterruptible)                                     │
│   ════════════════════════════════════                                     │
│                                                                            │
│   ┌────┐→ ┌────┐→ ┌────┐→ ┌────┐→ ┌────┐  ✓ COMPLETE                      │
│   │DOM1│  │DOM2│  │DOM3│  │DOM4│  │DOM5│  (No stopping allowed)           │
│   └────┘  └────┘  └────┘  └────┘  └────┘                                  │
│                                                                            │
│   • Has side effects (DOM mutations)                                       │
│   • User CAN see intermediate states if interrupted                        │
│   • Must complete atomically for consistency                               │
│                                                                            │
└────────────────────────────────────────────────────────────────────────────┘
```

### Why Synchronous is Required: The "Torn UI" Problem

```jsx
// Imagine commit phase could be interrupted...

// STATE: { items: ['A', 'B', 'C'], title: 'Old Title' }
// NEW STATE: { items: ['X', 'Y', 'Z'], title: 'New Title' }

// If commit was interruptible:
// 1. Update title → "New Title" ✓
// 2. Update item[0] → "X" ✓
// 3. ⚡ INTERRUPT (hypothetically)
// 4. User sees: title="New Title", items=['X', 'B', 'C']
//    ^ TORN UI! Inconsistent state visible to user!

// With synchronous commit:
// 1. Update title → "New Title"
// 2. Update item[0] → "X"
// 3. Update item[1] → "Y"
// 4. Update item[2] → "Z"
// 5. ✓ COMPLETE - User sees consistent state
```

### Real-World Impact: Code Example

```jsx
function TransactionList({ transactions }) {
  // Calculating derived values
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  
  return (
    <div className="transaction-container">
      {/* If commit was interruptible, user might see: */}
      {/* - Old total but new transactions, or */}
      {/* - New total but missing transactions */}
      <h2>Total: ${total}</h2>
      <ul>
        {transactions.map(t => (
          <li key={t.id}>{t.name}: ${t.amount}</li>
        ))}
      </ul>
    </div>
  );
}

// SYNCHRONOUS COMMIT guarantees:
// - Total and transactions are ALWAYS in sync
// - User never sees partial update
// - Financial data remains consistent
```

### Timing Impact: useLayoutEffect vs useEffect

```jsx
function MeasuredComponent() {
  const divRef = useRef(null);
  const [height, setHeight] = useState(0);
  
  // ═══════════════════════════════════════════════════════════════
  // useLayoutEffect: Runs DURING commit phase (synchronous)
  // ═══════════════════════════════════════════════════════════════
  useLayoutEffect(() => {
    // DOM is updated, but browser hasn't painted yet
    // We can read DOM measurements and make synchronous updates
    const measuredHeight = divRef.current.getBoundingClientRect().height;
    setHeight(measuredHeight);  // Triggers re-render BEFORE paint
    
    // User NEVER sees the intermediate state where height is wrong
  }, []);
  
  // ═══════════════════════════════════════════════════════════════
  // useEffect: Runs AFTER browser paint (asynchronous)
  // ═══════════════════════════════════════════════════════════════
  useEffect(() => {
    // Browser has already painted
    // Any state update here will cause a visible flash
    console.log('Paint complete, height is:', height);
  }, [height]);
  
  return <div ref={divRef} style={{ height: height || 'auto' }}>Content</div>;
}
```

### Timeline Visualization

```
TIME ──────────────────────────────────────────────────────────────────────→

├─ RENDER PHASE ─┼─────────────── COMMIT PHASE ─────────────┼─── PAINT ───┤
│ (Async)        │ (Sync - Cannot be interrupted)           │             │
│                │                                          │             │
│  ┌──────────┐  │  ┌──────────┐  ┌──────────┐  ┌────────┐ │  ┌───────┐  │
│  │ Call     │  │  │ Before   │  │ Mutation │  │ Layout │ │  │Browser│  │
│  │ Component│  │  │ Mutation │  │ (DOM     │  │ Effects│ │  │ Paint │  │
│  │ Functions│  │  │ Effects  │  │  writes) │  │        │ │  │       │  │
│  └──────────┘  │  └──────────┘  └──────────┘  └────────┘ │  └───────┘  │
│       ↓        │       ↓              ↓            ↓     │       ↓     │
│  Build Fiber   │  getSnapshot   appendChild   useLayout  │  Pixels on  │
│  Tree, Diff    │  BeforeUpdate  removeChild   Effect     │  Screen!    │
│                │                              refs       │             │
│                │                                          │             │
│  ⚡ Can pause  │  ❌ Cannot stop until complete           │  Then:      │
│    here        │                                          │  useEffect  │
│                │                                          │  runs async │
└────────────────┴──────────────────────────────────────────┴─────────────┘
```

---

## 3️⃣ Work-in-Progress Tree Becomes Current Tree

### Double Buffering: The Two Fiber Trees

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DOUBLE BUFFERING PATTERN                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  BEFORE COMMIT                           AFTER COMMIT                        │
│  ══════════════                          ════════════                        │
│                                                                              │
│  FiberRoot                               FiberRoot                           │
│      │                                       │                               │
│      │ current                               │ current                       │
│      ↓                                       ↓                               │
│  ┌─────────────┐                        ┌─────────────┐                      │
│  │ CURRENT     │                        │ NEW CURRENT │ (was WIP)            │
│  │ TREE        │                        │ TREE        │                      │
│  │             │                        │             │                      │
│  │ count: 0    │ ←── alternate ──→      │ count: 1    │                      │
│  │             │                        │             │                      │
│  └─────────────┘                        └─────────────┘                      │
│        ↑                                      ↑                              │
│        │ What user SEES                       │ What user SEES               │
│                                                                              │
│  ┌─────────────┐                        ┌─────────────┐                      │
│  │ WORK-IN-    │                        │ OLD CURRENT │ (becomes alternate)  │
│  │ PROGRESS    │                        │ (recyclable)│                      │
│  │ TREE        │                        │             │                      │
│  │             │                        │ count: 0    │                      │
│  │ count: 1    │ ←── finishedWork       │             │                      │
│  │             │                        └─────────────┘                      │
│  └─────────────┘                              ↑                              │
│        ↑                                      │ Ready for next render        │
│        │ Being built (user can't see)                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘

THE SWAP: root.current = finishedWork;  // Just a pointer change!
```

### Why Double Buffering?

```javascript
// Benefits of double buffering:

// 1. CONSISTENT UI: User sees stable current tree until commit
// 2. ERROR RECOVERY: Can discard work-in-progress if error occurs
// 3. MEMORY EFFICIENT: Reuse fibers via alternate pointer
// 4. CONCURRENT MODE: Can work on future state without partial UI

// The swap is O(1) - just a pointer assignment!
function commitRootImpl(root) {
  const finishedWork = root.finishedWork;
  
  // ... perform mutations ...
  
  // THE CRITICAL SWAP - Single assignment, atomic
  root.current = finishedWork;
  
  // Now:
  // - finishedWork IS the current tree
  // - Old current tree becomes available for next render
  // - Old current's fibers will be reused via 'alternate' pointers
}
```

### The Alternate Pointer: Memory Reuse

```javascript
// Each fiber has an 'alternate' pointing to its counterpart in the other tree

// Creating work-in-progress from current fiber:
function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate;
  
  if (workInProgress === null) {
    // First update: Create new fiber
    workInProgress = createFiber(
      current.tag,
      pendingProps,
      current.key,
      current.mode
    );
    
    // Link them together
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    // Subsequent updates: REUSE existing fiber
    workInProgress.pendingProps = pendingProps;
    workInProgress.type = current.type;
    
    // Reset effect flags
    workInProgress.flags = NoFlags;
    workInProgress.subtreeFlags = NoFlags;
    workInProgress.deletions = null;
  }
  
  // Copy other properties
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  // ... more properties
  
  return workInProgress;
}
```

### Visual: Tree Lifecycle Across Multiple Renders

```
RENDER 1 (Initial)
══════════════════
                    After Commit:
                    root.current = TreeA
     TreeA                    
     ┌───┐         ┌───┐
     │ A │    →    │ A │ ← current
     └───┘         └───┘
     (built)       (committed)


RENDER 2 (State Update)
═══════════════════════
                    After Commit:
     TreeA (current)         root.current = TreeB
     ┌───┐                   ┌───┐
     │ A │    alternate →    │ B │ ← current (new)
     └───┘    ← alternate    └───┘
       ↓                       ↑
     (old)                 (committed)
     
     TreeB (work-in-progress)
     ┌───┐
     │ B │ ← finishedWork
     └───┘
     (built from TreeA's fibers)


RENDER 3 (Another Update)
═════════════════════════
                    After Commit:
     TreeB (current)         root.current = TreeA'
     ┌───┐                   ┌───┐
     │ B │    alternate →    │ A'│ ← current (new)
     └───┘    ← alternate    └───┘
       ↓                       ↑
     (old)                 (committed)
     
     TreeA' (work-in-progress)
     ┌───┐
     │ A'│ ← built by REUSING TreeA's fibers!
     └───┘
```

---

## 4️⃣ Render Phase (React-Controlled) vs Commit Phase (Renderer-Controlled)

### The Separation of Concerns

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    REACT ARCHITECTURE: SEPARATION OF CONCERNS                │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────────┐│
│  │                        REACT CORE (Reconciler)                          ││
│  │                                                                         ││
│  │  • Platform-AGNOSTIC                                                    ││
│  │  • Controls RENDER phase                                                ││
│  │  • Builds fiber trees                                                   ││
│  │  • Performs diffing                                                     ││
│  │  • Collects effects                                                     ││
│  │  • Manages scheduling and priorities                                    ││
│  │                                                                         ││
│  │  "I figure out WHAT changed, not HOW to change it"                      ││
│  └─────────────────────────────────────────────────────────────────────────┘│
│                                    │                                         │
│                                    │ Effects List                            │
│                                    ↓                                         │
│  ┌───────────────┬───────────────┬───────────────┬───────────────┐          │
│  │   ReactDOM    │ React Native  │   React VR    │  React Three  │          │
│  │   (Browser)   │  (iOS/Android)│   (WebVR)     │  (Three.js)   │          │
│  ├───────────────┼───────────────┼───────────────┼───────────────┤          │
│  │               │               │               │               │          │
│  │  appendChild  │  UIManager.   │  VR Scene     │  Three.js     │          │
│  │  removeChild  │  createView   │  Mutations    │  Object3D     │          │
│  │  insertBefore │  updateView   │               │  Mutations    │          │
│  │               │  removeView   │               │               │          │
│  │               │               │               │               │          │
│  │  Controls     │  Controls     │  Controls     │  Controls     │          │
│  │  COMMIT phase │  COMMIT phase │  COMMIT phase │  COMMIT phase │          │
│  │  for Web DOM  │  for Native   │  for VR       │  for 3D       │          │
│  └───────────────┴───────────────┴───────────────┴───────────────┘          │
│                                                                              │
│  "WE figure out HOW to apply the changes to our specific platform"          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Why This Separation Exists

```javascript
// 1. PORTABILITY: Same React code, different platforms
// ═══════════════════════════════════════════════════════

// Your component works on ALL platforms:
function Counter({ count }) {
  return (
    <View>
      <Text>Count: {count}</Text>
    </View>
  );
}

// ReactDOM commits to browser DOM:
// document.createElement('div')
// element.appendChild(child)

// React Native commits to native views:
// UIManager.createView(...)
// UIManager.manageChildren(...)


// 2. RENDER PHASE: Pure computation (reconciler)
// ═══════════════════════════════════════════════

// The reconciler doesn't know about DOM or Native views
function reconcileChildFibers(returnFiber, currentFirstChild, newChild) {
  // This code is 100% platform-agnostic
  // It just computes the fiber tree structure
  
  if (typeof newChild === 'object' && newChild !== null) {
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
        return placeSingleChild(
          reconcileSingleElement(returnFiber, currentFirstChild, newChild)
        );
    }
  }
  
  // Returns fiber nodes with effect flags
  // DOESN'T touch any platform-specific APIs
}


// 3. COMMIT PHASE: Platform-specific mutations (renderer)
// ═══════════════════════════════════════════════════════

// ReactDOM's commit implementation:
function commitPlacement_DOM(finishedWork) {
  const domNode = finishedWork.stateNode;
  const parentDOM = getHostParent(finishedWork);
  
  // Browser-specific DOM APIs
  parentDOM.appendChild(domNode);
}

// React Native's commit implementation:
function commitPlacement_Native(finishedWork) {
  const viewTag = finishedWork.stateNode;
  const parentTag = getHostParent(finishedWork);
  
  // Native-specific bridge call
  UIManager.setChildren(parentTag, [viewTag]);
}
```

### Host Configs: Renderer Interface

```javascript
// Each renderer provides a "host config" - the interface between
// React's reconciler and the platform

// ReactDOM's Host Config (simplified)
const DOMHostConfig = {
  // Create a platform element
  createInstance(type, props) {
    const domElement = document.createElement(type);
    updateDOMProperties(domElement, {}, props);
    return domElement;
  },
  
  // Create text node
  createTextInstance(text) {
    return document.createTextNode(text);
  },
  
  // Append child
  appendChildToContainer(container, child) {
    container.appendChild(child);
  },
  
  // Remove child
  removeChildFromContainer(container, child) {
    container.removeChild(child);
  },
  
  // Commit updates to existing element
  commitUpdate(domElement, updatePayload, type, oldProps, newProps) {
    updateDOMProperties(domElement, oldProps, newProps);
  },
  
  // Schedule work (can use requestIdleCallback, etc.)
  scheduleMicrotask: queueMicrotask,
};


// React Native's Host Config (simplified)
const NativeHostConfig = {
  createInstance(type, props) {
    const viewTag = ReactNativePrivateInterface.createView(type, props);
    return viewTag;  // Returns a numeric tag, not a DOM node
  },
  
  appendChildToContainer(containerTag, childTag) {
    UIManager.setChildren(containerTag, [childTag]);
  },
  
  commitUpdate(viewTag, updatePayload, type, oldProps, newProps) {
    UIManager.updateView(viewTag, type, newProps);
  },
  
  // Different scheduling for native
  scheduleMicrotask: setImmediate,
};
```

### Interview Point: The Reconciliation Package

```javascript
// react-reconciler is the shared package
// Renderers inject their host config

import { createContainer, updateContainer } from 'react-reconciler';
import * as HostConfig from './ReactDOMHostConfig';

// Create the reconciler with DOM-specific host config
const reconciler = createReconciler(HostConfig);

// ReactDOM.render() implementation
export function render(element, container, callback) {
  // Create root container for this DOM node
  let root = container._reactRootContainer;
  if (!root) {
    root = reconciler.createContainer(container, 0, false, null);
    container._reactRootContainer = root;
  }
  
  // Start the update
  reconciler.updateContainer(element, root, null, callback);
  // ^ This triggers render phase (reconciler)
  // ^ Then commit phase (HostConfig functions)
}
```

---

## 5️⃣ Practical Code: Observing Commit Phase Timing

```jsx
import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';

function CommitPhaseDemo() {
  const [count, setCount] = useState(0);
  const renderCount = useRef(0);
  
  // Track render phase
  console.log(`1. RENDER PHASE: Component function called (render #${++renderCount.current})`);
  
  // Before mutation (getSnapshotBeforeUpdate equivalent for hooks is complex)
  // But we can observe layout and effect timing
  
  // COMMIT PHASE - Layout sub-phase
  useLayoutEffect(() => {
    console.log('2. COMMIT PHASE (Layout): useLayoutEffect runs');
    console.log('   - DOM is updated but not painted');
    console.log('   - Can measure DOM synchronously');
    console.log('   - Can trigger synchronous state updates');
    
    return () => {
      console.log('   [Cleanup] useLayoutEffect cleanup (before next effect)');
    };
  });
  
  // AFTER BROWSER PAINT
  useEffect(() => {
    console.log('3. AFTER PAINT: useEffect runs');
    console.log('   - Browser has painted');
    console.log('   - Safe for non-urgent side effects');
    
    return () => {
      console.log('   [Cleanup] useEffect cleanup (before next effect)');
    };
  });
  
  // Class component equivalent lifecycle order:
  // 1. render()
  // 2. getSnapshotBeforeUpdate() - Before mutation
  // 3. componentDidMount/Update() - Layout phase
  // 4. Browser paint
  // 5. useEffect (no class equivalent, runs async after paint)
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>
        Increment
      </button>
    </div>
  );
}

/*
Console output when clicking button:

1. RENDER PHASE: Component function called (render #2)
   [Cleanup] useLayoutEffect cleanup (before next effect)
   [Cleanup] useEffect cleanup (before next effect)
2. COMMIT PHASE (Layout): useLayoutEffect runs
   - DOM is updated but not painted
   - Can measure DOM synchronously
   - Can trigger synchronous state updates
3. AFTER PAINT: useEffect runs
   - Browser has painted
   - Safe for non-urgent side effects
*/
```

### Measuring DOM in useLayoutEffect (Common Pattern)

```jsx
function TooltipWithMeasurement({ children, content }) {
  const targetRef = useRef(null);
  const tooltipRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isPositioned, setIsPositioned] = useState(false);
  
  useLayoutEffect(() => {
    // COMMIT PHASE - DOM exists but not painted
    // Perfect time to measure and reposition
    
    if (targetRef.current && tooltipRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Calculate position to avoid viewport overflow
      let top = targetRect.bottom + 8;
      let left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;
      
      // Boundary checks
      if (left < 0) left = 8;
      if (left + tooltipRect.width > window.innerWidth) {
        left = window.innerWidth - tooltipRect.width - 8;
      }
      
      // This setState triggers ANOTHER render, but it completes
      // BEFORE the browser paints, so user sees no flash!
      setPosition({ top, left });
      setIsPositioned(true);
    }
  }, [children, content]);
  
  return (
    <>
      <span ref={targetRef}>{children}</span>
      <div 
        ref={tooltipRef}
        style={{
          position: 'fixed',
          top: position.top,
          left: position.left,
          opacity: isPositioned ? 1 : 0, // Hide until positioned
          transition: 'opacity 0.2s',
        }}
      >
        {content}
      </div>
    </>
  );
}
```

---

## 🏠 Analogies for Interview Explanations

### 1. Restaurant Analogy (From React Docs)

```
TRIGGER:  Customer places order
          └─ "I'd like the pasta special"
          
RENDER:   Kitchen prepares the order (can adjust recipe, restart)
          └─ Chef cooks, can taste-test, redo if needed
          └─ Nobody sees the food yet
          
COMMIT:   Waiter delivers food (synchronous, can't be interrupted)
          └─ Once waiter leaves kitchen, must complete delivery
          └─ Can't serve half the plate to table 5, then go somewhere else
          
PAINT:    Customer sees and eats the food
          └─ Food is on the table, visible to customer
```

### 2. Film Editing Analogy

```
RENDER PHASE:
├─ Director editing film in private editing room
├─ Can rewind, cut, rearrange scenes
├─ Can discard takes that don't work
├─ Audience sees NOTHING
└─ Work is "interruptible" - can pause editing

COMMIT PHASE:
├─ Film is duplicated to theater reels
├─ Must copy ENTIRE film atomically
├─ Can't show half old version, half new version
├─ Theaters receive complete, consistent film
└─ SYNCHRONOUS - copying must complete

PAINT:
├─ Film plays in theater
├─ Audience finally sees the movie
└─ Any changes need new edit→commit→play cycle
```

### 3. Video Game Double Buffering Analogy

```
BACK BUFFER (Work-in-Progress Tree):
├─ GPU renders next frame here
├─ Player can't see it
├─ Can be discarded if new input arrives
└─ "Planning" the next visual state

FRONT BUFFER (Current Tree):
├─ What's on the monitor
├─ Player sees this
├─ Stable, consistent image
└─ "Committed" visual state

VSYNC (Commit Phase):
├─ Swap back buffer → front buffer
├─ MUST be atomic (synchronous)
├─ Tearing occurs if interrupted
└─ Single pointer swap operation

DISPLAY (Paint):
├─ Monitor refreshes with new frame
├─ Player sees the update
└─ 60fps = 16.67ms per cycle
```

### 4. Bank Transaction Analogy

```
RENDER PHASE (Planning the transfer):
├─ Calculate new balances
├─ Verify sufficient funds
├─ Can be cancelled/restarted
├─ No money moves yet
└─ "Preparing the transaction"

COMMIT PHASE (Executing the transfer):
├─ Debit source account
├─ Credit destination account
├─ MUST be atomic (all-or-nothing)
├─ Cannot pause between debit and credit
├─ Synchronous for consistency
└─ "Committing the transaction"

PAINT (Statement updates):
├─ Account balances visible in app
├─ Transaction appears in history
└─ User sees the result
```

---

## 🎯 Interview Quick-Fire Questions

### Q1: What happens during the commit phase?
> **A:** The commit phase applies the changes calculated during render to the actual DOM. It has three sub-phases: Before Mutation (read DOM state), Mutation (apply DOM changes), and Layout (run useLayoutEffect, attach refs). It's synchronous and cannot be interrupted.

### Q2: Why is the commit phase synchronous?
> **A:** To prevent "torn UI" — inconsistent states where the user sees partial updates. If commit could be interrupted, users might see half-old and half-new UI simultaneously, leading to visual bugs and confused state.

### Q3: How does work-in-progress become current?
> **A:** Through a simple pointer swap: `root.current = finishedWork`. The entire tree is swapped atomically. The old current tree's fibers become available for reuse through the alternate pointer (double buffering pattern).

### Q4: What's the difference between useEffect and useLayoutEffect timing?
> **A:** `useLayoutEffect` runs synchronously during the commit phase, after DOM mutations but before browser paint. `useEffect` runs asynchronously after the browser has painted. Use `useLayoutEffect` when you need to measure DOM or prevent visual flicker.

### Q5: Why does React separate reconciler from renderer?
> **A:** Portability. The reconciler (render phase) is platform-agnostic — it figures out WHAT changed. Renderers (commit phase) are platform-specific — they know HOW to apply changes to DOM, Native views, VR scenes, etc. Same React code works across all platforms.

### Q6: What is "flushing" in React?
> **A:** Flushing means rendering the fiber's output onto the screen — applying the calculated changes from the effect list to the actual host environment (DOM, Native, etc.) during the commit phase.

### Q7: Can you pause the commit phase?
> **A:** No. The commit phase must complete synchronously to maintain UI consistency. Unlike the render phase (which can pause for concurrent mode), commit is atomic — once started, it runs to completion.

### Q8: What are effect flags?
> **A:** Bitmask values (like Placement, Update, Deletion) that mark fibers during render to indicate what DOM operation is needed during commit. The commit phase processes fibers that have effect flags.

---

## 📝 Summary Cheat Sheet

```
┌─────────────────────────────────────────────────────────────────────┐
│                    COMMIT PHASE SUMMARY                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  WHAT:    Applying calculated changes to actual host (DOM)          │
│  WHEN:    After render phase completes                              │
│  WHO:     Controlled by renderers (ReactDOM, React Native)          │
│  HOW:     Synchronously, cannot be interrupted                      │
│                                                                      │
│  SUB-PHASES:                                                        │
│  1. Before Mutation → Read DOM (getSnapshotBeforeUpdate)            │
│  2. Mutation → Write DOM (appendChild, removeChild, etc.)           │
│  3. Layout → Refs + useLayoutEffect + tree swap                     │
│                                                                      │
│  TREE SWAP:                                                         │
│  root.current = finishedWork  // Work-in-progress → Current         │
│                                                                      │
│  KEY TIMING:                                                        │
│  useLayoutEffect → Commit phase (sync, before paint)                │
│  useEffect → After paint (async)                                    │
│                                                                      │
│  INTERVIEW ANALOGY:                                                 │
│  "Commit is like publishing a newspaper — once you start printing,  │
│   you must finish. You can't publish half today's news and half     │
│   yesterday's. The render phase is like writing/editing articles."  │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🔗 Further Reading

- [React Fiber Architecture by Andrew Clark](https://github.com/acdlite/react-fiber-architecture)
- [React Docs: Render and Commit](https://react.dev/learn/render-and-commit)
- [Inside Fiber: Deep dive into the new React reconciler](https://blog.logrocket.com/deep-dive-react-fiber/)
- [React Source Code: ReactFiberCommitWork.js](https://github.com/facebook/react/blob/main/packages/react-reconciler/src/ReactFiberCommitWork.js)

---

*Created for interview preparation. Based on React documentation, Fiber architecture docs, and React team explanations.*
*Last updated: 2025*
