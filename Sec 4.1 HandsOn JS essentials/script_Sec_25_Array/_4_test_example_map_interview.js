/**
 * Test Suite for Challenge 4: Array.map() - Interview-Level
 * ===========================================================
 * 
 * Run this file with: node _4_test_example_map_interview.js
 */

const {
    customMap,
    transformMatrix,
    groupByCategory,
    flattenOrderItems
} = require('./_4_example_map_interview.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
        return false;
    }
}

function assertType(value, expectedType, testName) {
    totalTests++;
    if (typeof value === expectedType) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${expectedType}`);
        console.log(`   Actual type:   ${typeof value}`);
        testsFailed++;
        return false;
    }
}

function assertNotSame(arr1, arr2, testName) {
    totalTests++;
    if (arr1 !== arr2) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Should return a new array, not the same reference`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 4: Array.map() Interview-Level Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // customMap() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: customMap()');
    console.log('-'.repeat(40));

    assertType(customMap, 'function', 'customMap is a function');

    assertEqual(
        customMap([1, 2, 3], x => x * 2),
        [2, 4, 6],
        'Doubles each number'
    );

    assertEqual(
        customMap(['a', 'b', 'c'], (el, i) => el + i),
        ['a0', 'b1', 'c2'],
        'Uses index parameter correctly'
    );

    assertEqual(
        customMap([], x => x),
        [],
        'Returns empty array for empty input'
    );

    assertEqual(
        customMap([1, 2, 3], (el, i, arr) => el + arr.length),
        [4, 5, 6],
        'Passes array reference to callback'
    );

    assertEqual(
        customMap(['hello'], x => x.toUpperCase()),
        ['HELLO'],
        'Works with string transformation'
    );

    // Immutability test
    const original = [1, 2, 3];
    const result = customMap(original, x => x);
    assertNotSame(original, result, 'Returns a new array (immutability)');

    // Edge case: undefined values
    assertEqual(
        customMap([undefined, null, 0], x => x ?? 'default'),
        ['default', 'default', 0],
        'Handles undefined and null values'
    );

    // =========================================================================
    // transformMatrix() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: transformMatrix()');
    console.log('-'.repeat(40));

    assertType(transformMatrix, 'function', 'transformMatrix is a function');

    assertEqual(
        transformMatrix([[1, 2], [3, 4]]),
        [[1, 4], [9, 16]],
        'Squares 2x2 matrix correctly'
    );

    assertEqual(
        transformMatrix([[1, 2, 3]]),
        [[1, 4, 9]],
        'Handles single row matrix'
    );

    assertEqual(
        transformMatrix([[1], [2], [3]]),
        [[1], [4], [9]],
        'Handles single column matrix'
    );

    assertEqual(
        transformMatrix([]),
        [],
        'Returns empty array for empty input'
    );

    assertEqual(
        transformMatrix([[0, -1, -2]]),
        [[0, 1, 4]],
        'Handles zero and negative numbers'
    );

    assertEqual(
        transformMatrix([[1, 2], [3, 4], [5, 6]]),
        [[1, 4], [9, 16], [25, 36]],
        'Handles 3x2 matrix'
    );

    // Immutability test
    const originalMatrix = [[1, 2], [3, 4]];
    const matrixResult = transformMatrix(originalMatrix);
    assertEqual(originalMatrix, [[1, 2], [3, 4]], 'Original matrix not modified');

    // =========================================================================
    // groupByCategory() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: groupByCategory()');
    console.log('-'.repeat(40));

    assertType(groupByCategory, 'function', 'groupByCategory is a function');

    assertEqual(
        groupByCategory([
            {name: 'iPhone', category: 'Electronics', price: 999},
            {name: 'MacBook', category: 'Electronics', price: 1999},
            {name: 'Shirt', category: 'Clothing', price: 50}
        ]),
        {
            Electronics: ['iPhone', 'MacBook'],
            Clothing: ['Shirt']
        },
        'Groups products by category'
    );

    assertEqual(
        groupByCategory([]),
        {},
        'Returns empty object for empty input'
    );

    assertEqual(
        groupByCategory([{name: 'Single', category: 'Only', price: 10}]),
        {Only: ['Single']},
        'Handles single product'
    );

    assertEqual(
        groupByCategory([
            {name: 'A', category: 'Cat1', price: 1},
            {name: 'B', category: 'Cat2', price: 2},
            {name: 'C', category: 'Cat3', price: 3}
        ]),
        {Cat1: ['A'], Cat2: ['B'], Cat3: ['C']},
        'Handles all different categories'
    );

    assertEqual(
        groupByCategory([
            {name: 'A', category: 'Same', price: 1},
            {name: 'B', category: 'Same', price: 2},
            {name: 'C', category: 'Same', price: 3}
        ]),
        {Same: ['A', 'B', 'C']},
        'Handles all same category'
    );

    // =========================================================================
    // flattenOrderItems() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: flattenOrderItems()');
    console.log('-'.repeat(40));

    assertType(flattenOrderItems, 'function', 'flattenOrderItems is a function');

    assertEqual(
        flattenOrderItems([
            {orderId: 1, items: [{name: 'Apple', qty: 2}, {name: 'Banana', qty: 3}]},
            {orderId: 2, items: [{name: 'Orange', qty: 1}]}
        ]),
        [
            {orderId: 1, name: 'Apple', qty: 2},
            {orderId: 1, name: 'Banana', qty: 3},
            {orderId: 2, name: 'Orange', qty: 1}
        ],
        'Flattens order items with orderId'
    );

    assertEqual(
        flattenOrderItems([]),
        [],
        'Returns empty array for empty input'
    );

    assertEqual(
        flattenOrderItems([{orderId: 1, items: []}]),
        [],
        'Handles order with no items'
    );

    assertEqual(
        flattenOrderItems([
            {orderId: 1, items: [{name: 'A', qty: 1}]},
            {orderId: 2, items: [{name: 'B', qty: 2}]},
            {orderId: 3, items: [{name: 'C', qty: 3}]}
        ]),
        [
            {orderId: 1, name: 'A', qty: 1},
            {orderId: 2, name: 'B', qty: 2},
            {orderId: 3, name: 'C', qty: 3}
        ],
        'Handles multiple single-item orders'
    );

    assertEqual(
        flattenOrderItems([{orderId: 99, items: [{name: 'X', qty: 5}, {name: 'Y', qty: 10}, {name: 'Z', qty: 15}]}]),
        [
            {orderId: 99, name: 'X', qty: 5},
            {orderId: 99, name: 'Y', qty: 10},
            {orderId: 99, name: 'Z', qty: 15}
        ],
        'Handles single order with multiple items'
    );

    // =========================================================================
    // Final Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));

    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉');
        console.log('🚀 You\'ve mastered interview-level map() challenges!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
