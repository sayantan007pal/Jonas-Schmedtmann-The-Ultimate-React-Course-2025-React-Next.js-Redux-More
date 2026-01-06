/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 20: Final Boss - Build a Mini React-like Library                 ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: EVERYTHING Combined - Ultimate JavaScript Challenge               ║
 * ║  Difficulty: ⭐⭐⭐⭐⭐⭐ (BOSS LEVEL)                                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * Congratulations on making it to the final challenge!
 * 
 * You will implement a MINI version of React's core concepts using pure JavaScript.
 * This challenge tests EVERY concept you've learned!
 */

// =============================================================================
// Task 1: createElement (Virtual DOM)
// =============================================================================
/**
 * Create a function createElement(type, props, ...children) that:
 * - type: string (element type) or function (component)
 * - props: object of properties (can be null)
 * - children: any number of children (strings, numbers, or elements)
 * 
 * Returns virtual DOM node:
 * {
 *   type: string | function,
 *   props: { ...props, children: flattenedChildren }
 * }
 * 
 * Special handling:
 * - Flatten nested arrays in children
 * - Filter out null, undefined, false from children
 * - Convert numbers to strings
 * 
 * REQUIRES: Rest, spread, destructuring, filter, map
 */

function createElement(type, props, ...children) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: render (Virtual DOM to String)
// =============================================================================
/**
 * Create a function render(element) that:
 * - Converts virtual DOM to HTML string
 * - If type is string: render as HTML element
 * - If type is function: call it with props and render result
 * - Handle children recursively
 * 
 * Props handling:
 * - className → class attribute
 * - style object → inline style string
 * - event handlers (on*) → skip
 * - boolean true → attribute without value
 * - boolean false → skip attribute
 * 
 * Example:
 * render(createElement("div", { className: "test", id: "main" }, "Hello"))
 * → '<div class="test" id="main">Hello</div>'
 * 
 * REQUIRES: Recursion, destructuring, template literals, ternary, optional chaining
 */

function render(element) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: useState Hook Simulation
// =============================================================================
/**
 * Create a function createHooks() that returns:
 * {
 *   useState: (initialValue) => [value, setValue],
 *   resetHooks: () => void,
 *   getStates: () => array of all states
 * }
 * 
 * Implementation:
 * - Maintain internal array of states
 * - Track current hook index
 * - useState returns current state and setter
 * - Setter updates state at correct index
 * - resetHooks resets index to 0 (for re-renders)
 * 
 * Example:
 * const { useState, resetHooks } = createHooks();
 * const [count, setCount] = useState(0);
 * const [name, setName] = useState("John");
 * setCount(5);
 * resetHooks();
 * const [count2] = useState(0); // Returns 5 (persisted)
 * 
 * REQUIRES: Closures, destructuring, arrow functions
 */

function createHooks() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: useReducer Hook Simulation
// =============================================================================
/**
 * Extend createHooks to include useReducer:
 * {
 *   useState,
 *   useReducer: (reducer, initialState) => [state, dispatch],
 *   resetHooks,
 *   getStates
 * }
 * 
 * useReducer:
 * - Takes reducer function and initial state
 * - Returns current state and dispatch function
 * - dispatch calls reducer(state, action) and updates state
 * 
 * Example:
 * const [state, dispatch] = useReducer(counterReducer, { count: 0 });
 * dispatch({ type: "INCREMENT" });
 * 
 * REQUIRES: Closures, higher-order functions, destructuring
 */

function createHooksWithReducer() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: Component with Hooks
// =============================================================================
/**
 * Create a function createComponent(componentFn) that:
 * - Takes a function component
 * - Returns object with:
 *   {
 *     render: (props) => htmlString,
 *     update: () => htmlString (re-renders with same props),
 *     getState: () => array of hook states
 *   }
 * 
 * Usage:
 * function Counter({ initial }) {
 *   const [count, setCount] = useState(initial);
 *   return createElement("div", null, `Count: ${count}`);
 * }
 * 
 * const counter = createComponent(Counter);
 * console.log(counter.render({ initial: 0 })); // <div>Count: 0</div>
 * 
 * REQUIRES: All concepts combined!
 */

function createComponent(componentFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: Context API Simulation
// =============================================================================
/**
 * Create functions:
 * 
 * createContext(defaultValue):
 *   Returns { Provider, Consumer, _currentValue }
 * 
 * Provider: Special element that provides value to children
 * Consumer: Function that receives current value
 * 
 * Example:
 * const ThemeContext = createContext("light");
 * 
 * function App() {
 *   return createElement(
 *     ThemeContext.Provider,
 *     { value: "dark" },
 *     createElement(ThemeContext.Consumer, {
 *       children: (theme) => createElement("div", { className: theme })
 *     })
 *   );
 * }
 * 
 * REQUIRES: Closures, higher-order functions, special element types
 */

function createContext(defaultValue) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    createElement,
    render,
    createHooks,
    createHooksWithReducer,
    createComponent,
    createContext
};
