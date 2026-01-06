/**
 * Test Suite for Challenge 9: Array.reduce() - Basic Accumulation
 * =================================================================
 * 
 * Run this file with: node _9_test_example_reduce_basics.js
 */

const {
    sumAll,
    findMax,
    countOccurrences,
    calculateTotal
} = require('./_9_example_reduce_basics.js');

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

function assertClose(actual, expected, tolerance, testName) {
    totalTests++;
    if (Math.abs(actual - expected) <= tolerance) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ~${expected} (±${tolerance})`);
        console.log(`   Actual:   ${actual}`);
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

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 9: reduce() Basic Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // sumAll() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: sumAll()');
    console.log('-'.repeat(40));

    assertType(sumAll, 'function', 'sumAll is a function');

    assertEqual(sumAll([1, 2, 3, 4, 5]), 15, 'Sum of [1,2,3,4,5] is 15');
    assertEqual(sumAll([10, -5, 3]), 8, 'Sum with negative number');
    assertEqual(sumAll([]), 0, 'Sum of empty array is 0');
    assertEqual(sumAll([100]), 100, 'Sum of single element');
    assertEqual(sumAll([0, 0, 0]), 0, 'Sum of zeros');
    assertEqual(sumAll([-1, -2, -3]), -6, 'Sum of all negatives');
    assertClose(sumAll([0.1, 0.2, 0.3]), 0.6, 0.001, 'Sum of decimals');

    // =========================================================================
    // findMax() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: findMax()');
    console.log('-'.repeat(40));

    assertType(findMax, 'function', 'findMax is a function');

    assertEqual(findMax([1, 5, 3, 9, 2]), 9, 'Max of [1,5,3,9,2] is 9');
    assertEqual(findMax([-10, -5, -1]), -1, 'Max of negatives');
    assertEqual(findMax([42]), 42, 'Max of single element');
    assertEqual(findMax([]), -Infinity, 'Max of empty array is -Infinity');
    assertEqual(findMax([5, 5, 5]), 5, 'Max when all same');
    assertEqual(findMax([1, 2, 3, 4, 5]), 5, 'Max at end');
    assertEqual(findMax([5, 4, 3, 2, 1]), 5, 'Max at beginning');
    assertEqual(findMax([0]), 0, 'Max is zero');

    // =========================================================================
    // countOccurrences() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: countOccurrences()');
    console.log('-'.repeat(40));

    assertType(countOccurrences, 'function', 'countOccurrences is a function');

    assertEqual(
        countOccurrences(['a', 'b', 'a', 'c', 'a', 'b']),
        {a: 3, b: 2, c: 1},
        'Counts string occurrences'
    );

    assertEqual(
        countOccurrences([1, 2, 1, 3, 1, 2]),
        {1: 3, 2: 2, 3: 1},
        'Counts number occurrences'
    );

    assertEqual(
        countOccurrences([]),
        {},
        'Empty array returns empty object'
    );

    assertEqual(
        countOccurrences(['x']),
        {x: 1},
        'Single element'
    );

    assertEqual(
        countOccurrences(['a', 'a', 'a', 'a']),
        {a: 4},
        'All same element'
    );

    assertEqual(
        countOccurrences([true, false, true]),
        {true: 2, false: 1},
        'Works with booleans'
    );

    // =========================================================================
    // calculateTotal() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: calculateTotal()');
    console.log('-'.repeat(40));

    assertType(calculateTotal, 'function', 'calculateTotal is a function');

    assertClose(
        calculateTotal([
            {name: 'Apple', price: 1.5, quantity: 3},
            {name: 'Banana', price: 0.5, quantity: 6}
        ]),
        7.5,
        0.001,
        'Total of mixed items'
    );

    assertEqual(
        calculateTotal([]),
        0,
        'Empty cart is 0'
    );

    assertEqual(
        calculateTotal([{name: 'Single', price: 10, quantity: 5}]),
        50,
        'Single item total'
    );

    assertEqual(
        calculateTotal([
            {name: 'A', price: 100, quantity: 0}
        ]),
        0,
        'Zero quantity is 0'
    );

    assertClose(
        calculateTotal([
            {name: 'A', price: 9.99, quantity: 2},
            {name: 'B', price: 4.99, quantity: 3}
        ]),
        34.95,
        0.01,
        'Handles decimal prices'
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
        console.log('🚀 You\'ve mastered basic reduce() operations!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
