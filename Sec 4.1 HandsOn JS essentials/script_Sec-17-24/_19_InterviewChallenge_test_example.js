/**
 * Test Suite for Challenge 19: Interview Challenge - Comprehensive Review
 * =========================================================================
 * 
 * Run this file with: node _19_InterviewChallenge_test_example.js
 */

const {
    transformOrderData,
    getComponentRenderInfo,
    createStateUpdater,
    createEventDelegator,
    createSelector,
    createStateMachine
} = require('./_19_InterviewChallenge_example.js');

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

function assertIncludes(actual, expected, testName) {
    let passed = true;
    for (const [key, value] of Object.entries(expected)) {
        if (JSON.stringify(actual[key]) !== JSON.stringify(value)) {
            passed = false;
            break;
        }
    }
    if (passed) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to include: ${JSON.stringify(expected)}`);
        console.log(`   Actual: ${JSON.stringify(actual)}`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Interview Challenge Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: transformOrderData()
// =========================================================================
console.log('\n📋 TASK 1: transformOrderData()');
console.log('-'.repeat(40));

const fullOrder = {
    order_id: "ORD-123",
    customer: {
        first_name: "John",
        last_name: "Doe",
        contact: { email: "john@test.com", phone: "555-1234" }
    },
    items: [
        { product_id: "P1", product_name: "Widget", quantity: 2, unit_price: 10 },
        { product_id: "P2", product_name: "Gadget", quantity: 1, unit_price: 25 }
    ],
    shipping: { address: { city: "NYC", country: "USA" } },
    discount_code: "SAVE10",
    created_at: "2024-01-15T00:00:00Z"
};

const transformed = transformOrderData(fullOrder);
assertIncludes(transformed, {
    id: "ORD-123",
    subtotal: 45,
    hasDiscount: true,
    discountCode: "SAVE10"
}, 'Transforms full order');

assertIncludes(transformed.customer, {
    fullName: "John Doe",
    email: "john@test.com",
    phone: "555-1234"
}, 'Transforms customer data');

assertEqual(transformed.items[0].total, 20, 'Calculates item total');

const minimalOrder = {
    order_id: "ORD-456",
    customer: { first_name: "Jane", last_name: "Smith" },
    items: [],
    created_at: "2024-06-01T00:00:00Z"
};

const minTransformed = transformOrderData(minimalOrder);
assertIncludes(minTransformed.customer, {
    email: "No email",
    phone: "No phone"
}, 'Uses defaults for missing contact');

assertIncludes(minTransformed.shipping, {
    city: "Unknown",
    country: "Unknown"
}, 'Uses defaults for missing shipping');

// =========================================================================
// Task 2 Tests: getComponentRenderInfo()
// =========================================================================
console.log('\n📋 TASK 2: getComponentRenderInfo()');
console.log('-'.repeat(40));

assertEqual(
    getComponentRenderInfo({ isLoading: true }, {}).renderType,
    "loading",
    'Loading state'
);

assertEqual(
    getComponentRenderInfo({ error: "Failed" }, { errorFallback: "Custom error" }).message,
    "Custom error",
    'Error with fallback message'
);

assertEqual(
    getComponentRenderInfo({}, { requireAuth: true }).renderType,
    "auth-required",
    'Auth required without user'
);

assertEqual(
    getComponentRenderInfo({ data: [] }, { allowEmpty: true }).renderType,
    "empty",
    'Empty data with allowEmpty'
);

assertEqual(
    getComponentRenderInfo({ data: [1, 2, 3] }, {}).renderType,
    "content",
    'Content with data'
);

// =========================================================================
// Task 3 Tests: createStateUpdater()
// =========================================================================
console.log('\n📋 TASK 3: createStateUpdater()');
console.log('-'.repeat(40));

const updater = createStateUpdater({ count: 0, items: [], user: null });

assertEqual(
    updater.set("count", 5).getState(),
    { count: 5, items: [], user: null },
    'set() updates single key'
);

assertEqual(
    updater.merge({ user: { name: "John" }, extra: true }).getState(),
    { count: 0, items: [], user: { name: "John" }, extra: true },
    'merge() adds/updates keys'
);

assertEqual(
    updater.push("items", "item1").push("items", "item2").getState().items,
    ["item1", "item2"],
    'push() adds to array'
);

assertEqual(
    createStateUpdater({ active: false }).toggle("active").getState().active,
    true,
    'toggle() flips boolean'
);

// =========================================================================
// Task 4 Tests: createEventDelegator()
// =========================================================================
console.log('\n📋 TASK 4: createEventDelegator()');
console.log('-'.repeat(40));

let clickedData = null;
const delegator = createEventDelegator({
    handlers: {
        "[data-action='test']": (e, el, data) => { clickedData = data; }
    }
});

assertTrue(typeof delegator === "function", 'Returns a function');

// Simulate event
const mockElement = { 
    matches: (sel) => sel === "[data-action='test']",
    dataset: { action: "test", id: "123" },
    parentElement: null
};
const mockEvent = { target: mockElement, stopPropagation: () => {}, preventDefault: () => {} };

delegator(mockEvent);
assertIncludes(clickedData, { action: "test", id: "123" }, 'Handler receives data from dataset');

// =========================================================================
// Task 5 Tests: createSelector()
// =========================================================================
console.log('\n📋 TASK 5: createSelector()');
console.log('-'.repeat(40));

let computeCount = 0;
const getVisibleTodos = createSelector(
    state => state.todos,
    state => state.filter,
    (todos, filter) => {
        computeCount++;
        if (filter === "active") return todos.filter(t => !t.completed);
        if (filter === "completed") return todos.filter(t => t.completed);
        return todos;
    }
);

const state1 = { 
    todos: [{ id: 1, completed: false }, { id: 2, completed: true }],
    filter: "active"
};

assertEqual(
    getVisibleTodos(state1),
    [{ id: 1, completed: false }],
    'Selector filters correctly'
);

const beforeCount = computeCount;
getVisibleTodos(state1);
assertEqual(computeCount, beforeCount, 'Memoizes for same state');

const state2 = { ...state1, filter: "completed" };
getVisibleTodos(state2);
assertTrue(computeCount > beforeCount, 'Recomputes for changed state');

// =========================================================================
// Task 6 Tests: createStateMachine()
// =========================================================================
console.log('\n📋 TASK 6: createStateMachine()');
console.log('-'.repeat(40));

const machine = createStateMachine({
    initial: "idle",
    states: {
        idle: { on: { FETCH: "loading" } },
        loading: { on: { SUCCESS: "success", ERROR: "error" } },
        success: { on: { RESET: "idle" } },
        error: { on: { RETRY: "loading", RESET: "idle" } }
    }
});

assertEqual(machine.getState(), "idle", 'Initial state');
assertTrue(machine.matches("idle"), 'matches() works');

machine.send("FETCH");
assertEqual(machine.getState(), "loading", 'Transitions on event');

machine.send("SUCCESS");
assertEqual(machine.getState(), "success", 'Transitions to success');

machine.send("INVALID");
assertEqual(machine.getState(), "success", 'Invalid event does nothing');

machine.send("RESET");
assertEqual(machine.getState(), "idle", 'Resets to idle');

// Test subscription
let lastState = null;
const unsubscribe = machine.subscribe(state => { lastState = state; });
machine.send("FETCH");
assertEqual(lastState, "loading", 'Subscriber notified');

unsubscribe();
machine.send("ERROR");
assertEqual(lastState, "loading", 'Unsubscribed listener not called');

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 CONGRATULATIONS! You\'re INTERVIEW READY!\n');
    console.log('You\'ve mastered:');
    console.log('  ✅ Destructuring (Object & Array)');
    console.log('  ✅ Rest & Spread Operators');
    console.log('  ✅ Template Literals');
    console.log('  ✅ Ternary Operator');
    console.log('  ✅ Arrow Functions');
    console.log('  ✅ Short-Circuit Evaluation');
    console.log('  ✅ Optional Chaining & Nullish Coalescing');
    console.log('\n');
} else {
    console.log('💪 Keep working! These interview-level challenges are tough!\n');
}
