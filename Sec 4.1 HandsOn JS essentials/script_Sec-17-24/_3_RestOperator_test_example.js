/**
 * Test Suite for Challenge 3: Rest Operator
 * ==========================================
 * 
 * Run this file with: node _3_RestOperator_test_example.js
 */

const {
    separateFirst,
    separateFirstTwo,
    extractId,
    sumAll,
    logWithPrefix,
    createButtonProps
} = require('./_3_RestOperator_example.js');

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
console.log('🧪 Running Rest Operator Challenge Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: separateFirst()
// =========================================================================
console.log('\n📋 TASK 1: separateFirst()');
console.log('-'.repeat(40));

assertType(separateFirst, 'function', 'separateFirst is a function');

assertEqual(
    separateFirst([1, 2, 3, 4, 5]),
    { first: 1, remaining: [2, 3, 4, 5] },
    'Separates first element from rest'
);

assertEqual(
    separateFirst(["a"]),
    { first: "a", remaining: [] },
    'Works with single element array'
);

// Test that remaining is a NEW array (not same reference)
const originalArr = [1, 2, 3];
const result = separateFirst(originalArr);
assertTrue(
    result.remaining !== originalArr,
    'Remaining array is a new array (different reference)'
);

// =========================================================================
// Task 2 Tests: separateFirstTwo()
// =========================================================================
console.log('\n📋 TASK 2: separateFirstTwo()');
console.log('-'.repeat(40));

assertType(separateFirstTwo, 'function', 'separateFirstTwo is a function');

assertEqual(
    separateFirstTwo(["a", "b", "c", "d", "e"]),
    { first: "a", second: "b", rest: ["c", "d", "e"] },
    'Separates first two and collects rest'
);

assertEqual(
    separateFirstTwo([1, 2]),
    { first: 1, second: 2, rest: [] },
    'Works with exactly 2 elements'
);

assertEqual(
    separateFirstTwo([100]),
    { first: 100, second: undefined, rest: [] },
    'Handles array with only 1 element'
);

// =========================================================================
// Task 3 Tests: extractId()
// =========================================================================
console.log('\n📋 TASK 3: extractId()');
console.log('-'.repeat(40));

assertType(extractId, 'function', 'extractId is a function');

assertEqual(
    extractId({ id: 1, name: "John", age: 25, city: "NYC" }),
    { id: 1, otherProps: { name: "John", age: 25, city: "NYC" } },
    'Extracts id and collects other properties'
);

assertEqual(
    extractId({ id: 99 }),
    { id: 99, otherProps: {} },
    'Works when only id exists'
);

assertEqual(
    extractId({ id: 0, active: true }),
    { id: 0, otherProps: { active: true } },
    'Handles falsy id (0) correctly'
);

// =========================================================================
// Task 4 Tests: sumAll()
// =========================================================================
console.log('\n📋 TASK 4: sumAll()');
console.log('-'.repeat(40));

assertType(sumAll, 'function', 'sumAll is a function');

assertEqual(sumAll(1, 2, 3), 6, 'Sums 3 numbers');
assertEqual(sumAll(10, 20), 30, 'Sums 2 numbers');
assertEqual(sumAll(5), 5, 'Returns single number');
assertEqual(sumAll(), 0, 'Returns 0 for no arguments');
assertEqual(sumAll(1, 2, 3, 4, 5, 6, 7, 8, 9, 10), 55, 'Sums 10 numbers');
assertEqual(sumAll(-5, 5), 0, 'Handles negative numbers');

// =========================================================================
// Task 5 Tests: logWithPrefix()
// =========================================================================
console.log('\n📋 TASK 5: logWithPrefix()');
console.log('-'.repeat(40));

assertType(logWithPrefix, 'function', 'logWithPrefix is a function');

assertEqual(
    logWithPrefix("INFO", "Server started", "Port 3000", "Ready"),
    ["[INFO] Server started", "[INFO] Port 3000", "[INFO] Ready"],
    'Formats multiple messages with prefix'
);

assertEqual(
    logWithPrefix("ERROR", "Connection failed"),
    ["[ERROR] Connection failed"],
    'Works with single message'
);

assertEqual(
    logWithPrefix("DEBUG"),
    [],
    'Returns empty array when no messages'
);

// =========================================================================
// Task 6 Tests: createButtonProps()
// =========================================================================
console.log('\n📋 TASK 6: createButtonProps()');
console.log('-'.repeat(40));

assertType(createButtonProps, 'function', 'createButtonProps is a function');

const mockFn = () => {};
assertEqual(
    createButtonProps({ variant: "secondary", onClick: mockFn, disabled: true }),
    { variant: "secondary", size: "medium", restProps: { onClick: mockFn, disabled: true } },
    'Extracts variant, uses default size, collects rest'
);

assertEqual(
    createButtonProps({ size: "large", id: "btn-1" }),
    { variant: "primary", size: "large", restProps: { id: "btn-1" } },
    'Uses default variant, extracts size, collects rest'
);

assertEqual(
    createButtonProps({}),
    { variant: "primary", size: "medium", restProps: {} },
    'Uses all defaults for empty props'
);

assertEqual(
    createButtonProps({ variant: "danger", size: "small" }),
    { variant: "danger", size: "small", restProps: {} },
    'Extracts variant and size with no rest'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! Great job on Rest Operator!\n');
} else {
    console.log('💪 Keep working on it! Review rest operator patterns.\n');
}
