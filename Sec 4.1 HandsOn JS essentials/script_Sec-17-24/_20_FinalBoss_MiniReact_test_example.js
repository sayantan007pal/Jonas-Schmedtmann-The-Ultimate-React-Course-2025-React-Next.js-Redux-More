/**
 * Test Suite for Challenge 20: Final Boss - Mini React
 * ======================================================
 * 
 * Run this file with: node _20_FinalBoss_MiniReact_test_example.js
 */

const {
    createElement,
    render,
    createHooks,
    createHooksWithReducer,
    createComponent,
    createContext
} = require('./_20_FinalBoss_MiniReact_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
    }
}

function assertTrue(condition, testName) {
    if (condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🏆 FINAL BOSS CHALLENGE: Mini React Implementation');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: createElement()
// =========================================================================
console.log('\n📋 TASK 1: createElement()');
console.log('-'.repeat(40));

assertEqual(
    createElement("div", null),
    { type: "div", props: { children: [] } },
    'Simple element without props'
);

assertEqual(
    createElement("div", { className: "test" }, "Hello"),
    { type: "div", props: { className: "test", children: ["Hello"] } },
    'Element with props and text child'
);

assertEqual(
    createElement("div", null, "Hello", "World"),
    { type: "div", props: { children: ["Hello", "World"] } },
    'Multiple children'
);

assertEqual(
    createElement("div", null, [1, 2], 3),
    { type: "div", props: { children: ["1", "2", "3"] } },
    'Flattens arrays and converts numbers'
);

assertEqual(
    createElement("div", null, "Text", null, false, undefined, "More"),
    { type: "div", props: { children: ["Text", "More"] } },
    'Filters out null, false, undefined'
);

function MyComponent(props) { return createElement("span", null, props.text); }
assertTrue(
    createElement(MyComponent, { text: "Hi" }).type === MyComponent,
    'Function component as type'
);

// =========================================================================
// Task 2 Tests: render()
// =========================================================================
console.log('\n📋 TASK 2: render()');
console.log('-'.repeat(40));

assertEqual(
    render(createElement("div", null)),
    '<div></div>',
    'Renders empty element'
);

assertEqual(
    render(createElement("div", { id: "main", className: "container" })),
    '<div id="main" class="container"></div>',
    'Renders with attributes (className → class)'
);

assertEqual(
    render(createElement("div", null, "Hello ", "World")),
    '<div>Hello World</div>',
    'Renders text children'
);

assertEqual(
    render(createElement("div", null, createElement("span", null, "Nested"))),
    '<div><span>Nested</span></div>',
    'Renders nested elements'
);

assertEqual(
    render(createElement("input", { disabled: true, hidden: false })),
    '<input disabled>',
    'Handles boolean attributes'
);

assertEqual(
    render(createElement("div", { style: { color: "red", fontSize: "14px" } })),
    '<div style="color: red; font-size: 14px;"></div>',
    'Handles style object'
);

function Greeting({ name }) {
    return createElement("span", null, `Hello, ${name}!`);
}
assertEqual(
    render(createElement(Greeting, { name: "World" })),
    '<span>Hello, World!</span>',
    'Renders function component'
);

// =========================================================================
// Task 3 Tests: createHooks() - useState
// =========================================================================
console.log('\n📋 TASK 3: createHooks() - useState');
console.log('-'.repeat(40));

const hooks1 = createHooks();

const [count, setCount] = hooks1.useState(0);
assertEqual(count, 0, 'Initial state');

setCount(5);
hooks1.resetHooks();
const [count2] = hooks1.useState(0);
assertEqual(count2, 5, 'State persisted after reset');

hooks1.resetHooks();
const [name, setName] = hooks1.useState(""); // This accesses second slot
hooks1.useState("John"); // Third slot
assertEqual(hooks1.getStates(), [5, "", "John"], 'getStates returns all states');

// =========================================================================
// Task 4 Tests: createHooksWithReducer()
// =========================================================================
console.log('\n📋 TASK 4: createHooksWithReducer() - useReducer');
console.log('-'.repeat(40));

const hooks2 = createHooksWithReducer();

const reducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT": return { count: state.count + 1 };
        case "SET": return { count: action.payload };
        default: return state;
    }
};

const [state, dispatch] = hooks2.useReducer(reducer, { count: 0 });
assertEqual(state, { count: 0 }, 'Initial reducer state');

dispatch({ type: "INCREMENT" });
hooks2.resetHooks();
const [state2] = hooks2.useReducer(reducer, { count: 0 });
assertEqual(state2, { count: 1 }, 'State updated by dispatch');

dispatch({ type: "SET", payload: 100 });
hooks2.resetHooks();
const [state3] = hooks2.useReducer(reducer, { count: 0 });
assertEqual(state3, { count: 100 }, 'Action with payload');

// =========================================================================
// Task 5 Tests: createComponent()
// =========================================================================
console.log('\n📋 TASK 5: createComponent()');
console.log('-'.repeat(40));

// We need a fresh hooks instance for the component
const hooksForComponent = createHooksWithReducer();
global.useState = hooksForComponent.useState;

function Counter({ initial }) {
    const [count, setCount] = global.useState(initial);
    return createElement("div", null, `Count: ${count}`);
}

const counterComponent = createComponent(Counter);
const html1 = counterComponent.render({ initial: 10 });
assertEqual(html1, '<div>Count: 10</div>', 'Renders component');

assertEqual(counterComponent.getState()[0], 10, 'Can access component state');

// =========================================================================
// Task 6 Tests: createContext()
// =========================================================================
console.log('\n📋 TASK 6: createContext()');
console.log('-'.repeat(40));

const ThemeContext = createContext("light");

assertTrue(ThemeContext.Provider !== undefined, 'Context has Provider');
assertTrue(ThemeContext.Consumer !== undefined, 'Context has Consumer');
assertEqual(ThemeContext._currentValue, "light", 'Has default value');

// Provider should update _currentValue
const providerElement = createElement(ThemeContext.Provider, { value: "dark" });
assertTrue(providerElement.props.value === "dark", 'Provider receives value prop');

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🏆 CONGRATULATIONS! YOU DEFEATED THE FINAL BOSS! 🏆       ║
║                                                              ║
║   You've demonstrated mastery of:                            ║
║                                                              ║
║   ✅ Object & Array Destructuring                           ║
║   ✅ Rest Parameters (...rest)                              ║
║   ✅ Spread Operator (...spread)                            ║
║   ✅ Template Literals (\`backticks\`)                        ║
║   ✅ Ternary Operator (? :)                                 ║
║   ✅ Arrow Functions (=>)                                   ║
║   ✅ Short-Circuit Evaluation (&&, ||)                      ║
║   ✅ Nullish Coalescing (??)                                ║
║   ✅ Optional Chaining (?.)                                 ║
║   ✅ Closures & Higher-Order Functions                      ║
║   ✅ Array Methods (map, filter, reduce)                    ║
║   ✅ Immutable State Patterns                               ║
║                                                              ║
║   YOU ARE NOW INTERVIEW READY! 🎉                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `);
} else {
    console.log('💪 The Final Boss is tough! Keep practicing and try again!\n');
}
