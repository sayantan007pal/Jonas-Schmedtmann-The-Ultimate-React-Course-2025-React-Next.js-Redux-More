/**
 * Test Suite for Challenge 2: Array Destructuring
 * =================================================
 * 
 * Run this file with: node _2_ArrayDestructuring_test_example.js
 */

const {
    getFirstTwo,
    getFirstAndThird,
    swapValues,
    extractWithDefaults,
    extractFromNested,
    simulateUseState
} = require('./_2_ArrayDestructuring_example.js');

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

function assertType(value, type, testName) {
    if (typeof value === type) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${type}`);
        console.log(`   Actual type:   ${typeof value}`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Array Destructuring Challenge Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: getFirstTwo()
// =========================================================================
console.log('\n📋 TASK 1: getFirstTwo()');
console.log('-'.repeat(40));

assertType(getFirstTwo, 'function', 'getFirstTwo is a function');

assertEqual(
    getFirstTwo([10, 20, 30, 40]),
    { first: 10, second: 20 },
    'Extracts first two numbers'
);

assertEqual(
    getFirstTwo(["a", "b", "c"]),
    { first: "a", second: "b" },
    'Extracts first two strings'
);

assertEqual(
    getFirstTwo([null, undefined, 0]),
    { first: null, second: undefined },
    'Handles null and undefined correctly'
);

// =========================================================================
// Task 2 Tests: getFirstAndThird()
// =========================================================================
console.log('\n📋 TASK 2: getFirstAndThird()');
console.log('-'.repeat(40));

assertType(getFirstAndThird, 'function', 'getFirstAndThird is a function');

assertEqual(
    getFirstAndThird(["a", "b", "c", "d"]),
    { first: "a", third: "c" },
    'Skips second element correctly'
);

assertEqual(
    getFirstAndThird([1, 2, 3]),
    { first: 1, third: 3 },
    'Works with exactly 3 elements'
);

assertEqual(
    getFirstAndThird([true, false, true, false]),
    { first: true, third: true },
    'Works with boolean values'
);

// =========================================================================
// Task 3 Tests: swapValues()
// =========================================================================
console.log('\n📋 TASK 3: swapValues()');
console.log('-'.repeat(40));

assertType(swapValues, 'function', 'swapValues is a function');

assertEqual(
    swapValues(1, 2),
    [2, 1],
    'Swaps two numbers'
);

assertEqual(
    swapValues("hello", "world"),
    ["world", "hello"],
    'Swaps two strings'
);

assertEqual(
    swapValues(true, false),
    [false, true],
    'Swaps boolean values'
);

assertEqual(
    swapValues({ a: 1 }, { b: 2 }),
    [{ b: 2 }, { a: 1 }],
    'Swaps objects'
);

// =========================================================================
// Task 4 Tests: extractWithDefaults()
// =========================================================================
console.log('\n📋 TASK 4: extractWithDefaults()');
console.log('-'.repeat(40));

assertType(extractWithDefaults, 'function', 'extractWithDefaults is a function');

assertEqual(
    extractWithDefaults(["a", "b", "c"]),
    { first: "a", second: "b", third: "c" },
    'Uses all values when array is complete'
);

assertEqual(
    extractWithDefaults(["a", "b"]),
    { first: "a", second: "b", third: "N/A" },
    'Uses default for missing third element'
);

assertEqual(
    extractWithDefaults(["a"]),
    { first: "a", second: "N/A", third: "N/A" },
    'Uses defaults for missing second and third'
);

assertEqual(
    extractWithDefaults([]),
    { first: "N/A", second: "N/A", third: "N/A" },
    'Uses all defaults for empty array'
);

// Edge case: 0 should NOT trigger default
assertEqual(
    extractWithDefaults([0, "", false]),
    { first: 0, second: "", third: false },
    'Falsy values (0, "", false) should NOT trigger defaults'
);

// =========================================================================
// Task 5 Tests: extractFromNested()
// =========================================================================
console.log('\n📋 TASK 5: extractFromNested()');
console.log('-'.repeat(40));

assertType(extractFromNested, 'function', 'extractFromNested is a function');

assertEqual(
    extractFromNested([[1, 2, 3], [4, 5, 6], [7, 8, 9]]),
    { topLeft: 1, center: 5, bottomRight: 9 },
    'Extracts diagonal from 3x3 number matrix'
);

assertEqual(
    extractFromNested([["a", "b", "c"], ["d", "e", "f"], ["g", "h", "i"]]),
    { topLeft: "a", center: "e", bottomRight: "i" },
    'Extracts diagonal from 3x3 string matrix'
);

assertEqual(
    extractFromNested([[true, null, false], [0, "center", 1], [{}, [], undefined]]),
    { topLeft: true, center: "center", bottomRight: undefined },
    'Works with mixed types in matrix'
);

// =========================================================================
// Task 6 Tests: simulateUseState()
// =========================================================================
console.log('\n📋 TASK 6: simulateUseState()');
console.log('-'.repeat(40));

assertType(simulateUseState, 'function', 'simulateUseState is a function');

const [count, setCount] = simulateUseState(0);
assertEqual(count, 0, 'Initial value is correctly returned');
assertType(setCount, 'function', 'Setter is a function');
assertEqual(setCount(5), 5, 'Setter returns new value when called');

const [name, setName] = simulateUseState("John");
assertEqual(name, "John", 'Works with string initial value');
assertEqual(setName("Jane"), "Jane", 'Setter works with string value');

const [items, setItems] = simulateUseState([]);
assertEqual(items, [], 'Works with array initial value');
assertEqual(setItems([1, 2, 3]), [1, 2, 3], 'Setter works with array value');

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! Great job on Array Destructuring!\n');
} else {
    console.log('💪 Keep working on it! Review array destructuring patterns.\n');
}
