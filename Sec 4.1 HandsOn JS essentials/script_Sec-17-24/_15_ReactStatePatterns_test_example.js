/**
 * Test Suite for Challenge 15: React State Management Patterns
 * =============================================================
 * 
 * Run this file with: node _15_ReactStatePatterns_test_example.js
 */

const {
    counterReducer,
    todoReducer,
    getTodoStats,
    formReducer,
    cartReducer,
    getCartTotals
} = require('./_15_ReactStatePatterns_example.js');

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
console.log('🧪 Running React State Management Pattern Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: counterReducer()
// =========================================================================
console.log('\n📋 TASK 1: counterReducer()');
console.log('-'.repeat(40));

let state = { count: 0, step: 1 };
assertEqual(
    counterReducer(state, { type: "INCREMENT" }),
    { count: 1, step: 1 },
    'INCREMENT adds step'
);
assertTrue(counterReducer(state, { type: "INCREMENT" }) !== state, 'Returns new object');

assertEqual(
    counterReducer({ count: 5, step: 2 }, { type: "DECREMENT" }),
    { count: 3, step: 2 },
    'DECREMENT subtracts step'
);

assertEqual(
    counterReducer({ count: 5, step: 1 }, { type: "SET", payload: 100 }),
    { count: 100, step: 1 },
    'SET changes count directly'
);

assertEqual(
    counterReducer({ count: 5, step: 1 }, { type: "SET_STEP", payload: 10 }),
    { count: 5, step: 10 },
    'SET_STEP changes step'
);

assertEqual(
    counterReducer({ count: 99, step: 5 }, { type: "RESET" }),
    { count: 0, step: 1 },
    'RESET returns to initial'
);

assertEqual(
    counterReducer({ count: 5, step: 1 }, { type: "UNKNOWN" }),
    { count: 5, step: 1 },
    'Unknown action returns state'
);

// =========================================================================
// Task 2 Tests: todoReducer()
// =========================================================================
console.log('\n📋 TASK 2: todoReducer()');
console.log('-'.repeat(40));

// We need to mock Date.now for predictable tests
const originalDateNow = Date.now;
Date.now = () => 12345;

const todoState = { todos: [], filter: "all" };

const added = todoReducer(todoState, { type: "ADD_TODO", payload: { text: "Learn React" } });
assertEqual(
    added.todos[0],
    { id: 12345, text: "Learn React", completed: false },
    'ADD_TODO adds new todo'
);

const withTodo = { todos: [{ id: 1, text: "Test", completed: false }], filter: "all" };
assertEqual(
    todoReducer(withTodo, { type: "TOGGLE_TODO", payload: { id: 1 } }),
    { todos: [{ id: 1, text: "Test", completed: true }], filter: "all" },
    'TOGGLE_TODO toggles completed'
);

assertEqual(
    todoReducer(withTodo, { type: "DELETE_TODO", payload: { id: 1 } }),
    { todos: [], filter: "all" },
    'DELETE_TODO removes todo'
);

assertEqual(
    todoReducer(withTodo, { type: "EDIT_TODO", payload: { id: 1, text: "Updated" } }),
    { todos: [{ id: 1, text: "Updated", completed: false }], filter: "all" },
    'EDIT_TODO updates text'
);

assertEqual(
    todoReducer(withTodo, { type: "SET_FILTER", payload: { filter: "active" } }),
    { todos: [{ id: 1, text: "Test", completed: false }], filter: "active" },
    'SET_FILTER sets filter'
);

const mixed = { 
    todos: [
        { id: 1, text: "A", completed: true },
        { id: 2, text: "B", completed: false }
    ], 
    filter: "all" 
};
assertEqual(
    todoReducer(mixed, { type: "CLEAR_COMPLETED" }),
    { todos: [{ id: 2, text: "B", completed: false }], filter: "all" },
    'CLEAR_COMPLETED removes completed'
);

Date.now = originalDateNow;

// =========================================================================
// Task 3 Tests: getTodoStats()
// =========================================================================
console.log('\n📋 TASK 3: getTodoStats()');
console.log('-'.repeat(40));

const statsState = {
    todos: [
        { id: 1, text: "A", completed: true },
        { id: 2, text: "B", completed: false },
        { id: 3, text: "C", completed: true },
        { id: 4, text: "D", completed: false }
    ],
    filter: "all"
};

const stats = getTodoStats(statsState);
assertEqual(stats.total, 4, 'Total count');
assertEqual(stats.active, 2, 'Active count');
assertEqual(stats.completed, 2, 'Completed count');
assertEqual(stats.percentComplete, 50, 'Percent complete');
assertEqual(stats.filteredTodos.length, 4, 'All filter shows all');

assertEqual(
    getTodoStats({ ...statsState, filter: "active" }).filteredTodos.length,
    2,
    'Active filter shows active only'
);

assertEqual(
    getTodoStats({ ...statsState, filter: "completed" }).filteredTodos.length,
    2,
    'Completed filter shows completed only'
);

// =========================================================================
// Task 4 Tests: formReducer()
// =========================================================================
console.log('\n📋 TASK 4: formReducer()');
console.log('-'.repeat(40));

const formState = { values: {}, errors: {}, touched: {}, isSubmitting: false };

assertEqual(
    formReducer(formState, { type: "SET_FIELD", payload: { field: "email", value: "test@test.com" } }),
    { values: { email: "test@test.com" }, errors: {}, touched: {}, isSubmitting: false },
    'SET_FIELD sets value'
);

const withError = { ...formState, errors: { email: "Invalid" } };
assertEqual(
    formReducer(withError, { type: "SET_FIELD", payload: { field: "email", value: "new" } }).errors.email,
    undefined,
    'SET_FIELD clears field error'
);

assertEqual(
    formReducer(formState, { type: "SET_TOUCHED", payload: { field: "name" } }),
    { values: {}, errors: {}, touched: { name: true }, isSubmitting: false },
    'SET_TOUCHED marks field'
);

assertEqual(
    formReducer(formState, { type: "SUBMIT_START" }).isSubmitting,
    true,
    'SUBMIT_START sets submitting'
);

// =========================================================================
// Task 5 Tests: cartReducer()
// =========================================================================
console.log('\n📋 TASK 5: cartReducer()');
console.log('-'.repeat(40));

const cartState = { items: [], discountCode: null };

const added1 = cartReducer(cartState, { 
    type: "ADD_ITEM", 
    payload: { item: { id: 1, name: "Widget", price: 10 } } 
});
assertEqual(
    added1.items[0],
    { id: 1, name: "Widget", price: 10, quantity: 1 },
    'ADD_ITEM adds with quantity 1'
);

const cart1 = { items: [{ id: 1, name: "Widget", price: 10, quantity: 1 }], discountCode: null };
const incremented = cartReducer(cart1, { 
    type: "ADD_ITEM", 
    payload: { item: { id: 1, name: "Widget", price: 10 } } 
});
assertEqual(incremented.items[0].quantity, 2, 'ADD_ITEM increments existing');

assertEqual(
    cartReducer(cart1, { type: "REMOVE_ITEM", payload: { id: 1 } }),
    { items: [], discountCode: null },
    'REMOVE_ITEM removes item'
);

assertEqual(
    cartReducer(cart1, { type: "UPDATE_QUANTITY", payload: { id: 1, quantity: 5 } }),
    { items: [{ id: 1, name: "Widget", price: 10, quantity: 5 }], discountCode: null },
    'UPDATE_QUANTITY sets quantity'
);

assertEqual(
    cartReducer(cart1, { type: "APPLY_DISCOUNT", payload: { code: "SAVE10" } }),
    { items: [{ id: 1, name: "Widget", price: 10, quantity: 1 }], discountCode: "SAVE10" },
    'APPLY_DISCOUNT sets code'
);

// =========================================================================
// Task 6 Tests: getCartTotals()
// =========================================================================
console.log('\n📋 TASK 6: getCartTotals()');
console.log('-'.repeat(40));

const cartWithItems = {
    items: [
        { id: 1, price: 10, quantity: 2 },
        { id: 2, price: 25, quantity: 1 }
    ],
    discountCode: null
};

assertEqual(
    getCartTotals(cartWithItems),
    { subtotal: 45, discountPercent: 0, discountAmount: 0, total: 45, itemCount: 3 },
    'Calculates totals without discount'
);

const discounts = { "SAVE10": 10, "HALF": 50 };

assertEqual(
    getCartTotals({ ...cartWithItems, discountCode: "SAVE10" }, discounts),
    { subtotal: 45, discountPercent: 10, discountAmount: 4.5, total: 40.5, itemCount: 3 },
    'Applies 10% discount'
);

assertEqual(
    getCartTotals({ ...cartWithItems, discountCode: "HALF" }, discounts),
    { subtotal: 45, discountPercent: 50, discountAmount: 22.5, total: 22.5, itemCount: 3 },
    'Applies 50% discount'
);

assertEqual(
    getCartTotals({ items: [], discountCode: null }),
    { subtotal: 0, discountPercent: 0, discountAmount: 0, total: 0, itemCount: 0 },
    'Empty cart'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You\'re ready for React state management!\n');
} else {
    console.log('💪 Keep working! These patterns are used in every React app!\n');
}
