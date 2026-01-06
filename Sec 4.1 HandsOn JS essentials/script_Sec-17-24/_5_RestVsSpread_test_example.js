/**
 * Test Suite for Challenge 5: Rest vs Spread
 * ============================================
 * 
 * Run this file with: node _5_RestVsSpread_test_example.js
 */

const {
    demonstrateRestVsSpread,
    collectAndDouble,
    pickProperties,
    omitProperties,
    pipe,
    mergeObjects,
    createComponent
} = require('./_5_RestVsSpread_example.js');

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
console.log('🧪 Running Rest vs Spread Challenge Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: demonstrateRestVsSpread()
// =========================================================================
console.log('\n📋 TASK 1: demonstrateRestVsSpread()');
console.log('-'.repeat(40));

const explanation = demonstrateRestVsSpread();
assertTrue(
    Array.isArray(explanation.restUsages) && explanation.restUsages.length >= 3,
    'Returns at least 3 REST usage examples'
);
assertTrue(
    Array.isArray(explanation.spreadUsages) && explanation.spreadUsages.length >= 3,
    'Returns at least 3 SPREAD usage examples'
);
assertTrue(
    typeof explanation.rule === 'string' && explanation.rule.length > 10,
    'Includes a rule explaining the difference'
);

// =========================================================================
// Task 2 Tests: collectAndDouble()
// =========================================================================
console.log('\n📋 TASK 2: collectAndDouble()');
console.log('-'.repeat(40));

assertEqual(
    collectAndDouble(1, 2, 3),
    [2, 4, 6],
    'Doubles three numbers'
);

assertEqual(
    collectAndDouble(5),
    [10],
    'Doubles single number'
);

assertEqual(
    collectAndDouble(),
    [],
    'Returns empty array for no arguments'
);

assertEqual(
    collectAndDouble(0, -1, 10),
    [0, -2, 20],
    'Handles zero and negative numbers'
);

// =========================================================================
// Task 3 Tests: pickProperties() and omitProperties()
// =========================================================================
console.log('\n📋 TASK 3: pickProperties() & omitProperties()');
console.log('-'.repeat(40));

assertEqual(
    pickProperties({ a: 1, b: 2, c: 3 }, "a", "c"),
    { a: 1, c: 3 },
    'pickProperties selects specified keys'
);

assertEqual(
    pickProperties({ name: "John", age: 25, city: "NYC" }, "name"),
    { name: "John" },
    'pickProperties with single key'
);

assertEqual(
    omitProperties({ a: 1, b: 2, c: 3 }, "b"),
    { a: 1, c: 3 },
    'omitProperties removes specified key'
);

assertEqual(
    omitProperties({ name: "John", age: 25, city: "NYC" }, "age", "city"),
    { name: "John" },
    'omitProperties removes multiple keys'
);

// Test immutability
const testObj = { a: 1, b: 2 };
const picked = pickProperties(testObj, "a");
const omitted = omitProperties(testObj, "a");
assertTrue(picked !== testObj, 'pickProperties returns new object');
assertTrue(omitted !== testObj, 'omitProperties returns new object');

// =========================================================================
// Task 4 Tests: pipe()
// =========================================================================
console.log('\n📋 TASK 4: pipe()');
console.log('-'.repeat(40));

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const addThenDouble = pipe(addOne, double);
assertEqual(addThenDouble(5), 12, 'Pipes addOne then double: (5+1)*2 = 12');

const doubleThenAdd = pipe(double, addOne);
assertEqual(doubleThenAdd(5), 11, 'Pipes double then addOne: 5*2+1 = 11');

const tripleCompose = pipe(addOne, double, square);
assertEqual(tripleCompose(2), 36, 'Pipes three functions: ((2+1)*2)^2 = 36');

const identity = pipe();
assertEqual(identity(5), 5, 'Empty pipe returns identity function');

// =========================================================================
// Task 5 Tests: mergeObjects()
// =========================================================================
console.log('\n📋 TASK 5: mergeObjects()');
console.log('-'.repeat(40));

assertEqual(
    mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 }),
    { a: 3, b: 2, c: 4 },
    'Merges three objects, later overrides earlier'
);

assertEqual(
    mergeObjects({ x: 1 }),
    { x: 1 },
    'Works with single object'
);

assertEqual(
    mergeObjects(),
    {},
    'Returns empty object for no arguments'
);

assertEqual(
    mergeObjects({}, { a: 1 }, {}, { b: 2 }),
    { a: 1, b: 2 },
    'Handles empty objects in between'
);

// =========================================================================
// Task 6 Tests: createComponent()
// =========================================================================
console.log('\n📋 TASK 6: createComponent()');
console.log('-'.repeat(40));

const mockFn = () => {};
assertEqual(
    createComponent({ className: "btn", onClick: mockFn, disabled: true }),
    { className: "btn", style: {}, forwardedProps: { onClick: mockFn, disabled: true } },
    'Extracts className, uses default style, forwards rest'
);

assertEqual(
    createComponent({ style: { color: "red" }, id: "my-btn" }),
    { className: "", style: { color: "red" }, forwardedProps: { id: "my-btn" } },
    'Extracts style, uses default className, forwards rest'
);

assertEqual(
    createComponent({}),
    { className: "", style: {}, forwardedProps: {} },
    'Uses all defaults for empty props'
);

assertEqual(
    createComponent({ className: "active", style: { margin: 10 } }),
    { className: "active", style: { margin: 10 }, forwardedProps: {} },
    'Extracts both with no forwarded props'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You understand Rest vs Spread!\n');
} else {
    console.log('💪 Keep working! REST collects, SPREAD expands!\n');
}
