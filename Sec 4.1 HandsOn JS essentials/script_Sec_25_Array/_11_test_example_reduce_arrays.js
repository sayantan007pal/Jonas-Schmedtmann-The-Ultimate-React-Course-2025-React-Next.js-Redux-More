/**
 * Test Suite for Challenge 11: Array.reduce() - Array Building & Flattening
 * ===========================================================================
 * 
 * Run this file with: node _11_test_example_reduce_arrays.js
 */

const {
    flatten,
    deepFlatten,
    unique,
    partition
} = require('./_11_example_reduce_arrays.js');

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

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 11: reduce() Array Building Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // flatten() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: flatten()');
    console.log('-'.repeat(40));

    assertType(flatten, 'function', 'flatten is a function');

    assertEqual(
        flatten([[1, 2], [3, 4], [5]]),
        [1, 2, 3, 4, 5],
        'Flattens 2D number array'
    );

    assertEqual(
        flatten([['a', 'b'], ['c']]),
        ['a', 'b', 'c'],
        'Flattens 2D string array'
    );

    assertEqual(
        flatten([]),
        [],
        'Empty array returns empty'
    );

    assertEqual(
        flatten([[], [], []]),
        [],
        'Array of empty arrays returns empty'
    );

    assertEqual(
        flatten([[1, [2, 3]], [4]]),
        [1, [2, 3], 4],
        'Only flattens one level'
    );

    assertEqual(
        flatten([[1]]),
        [1],
        'Single nested element'
    );

    // =========================================================================
    // deepFlatten() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: deepFlatten()');
    console.log('-'.repeat(40));

    assertType(deepFlatten, 'function', 'deepFlatten is a function');

    assertEqual(
        deepFlatten([1, [2, [3, [4]], 5]]),
        [1, 2, 3, 4, 5],
        'Deeply flattens nested array'
    );

    assertEqual(
        deepFlatten([[[[1]]]]),
        [1],
        'Flattens deeply nested single element'
    );

    assertEqual(
        deepFlatten([1, 2, 3]),
        [1, 2, 3],
        'Already flat array unchanged'
    );

    assertEqual(
        deepFlatten([]),
        [],
        'Empty array returns empty'
    );

    assertEqual(
        deepFlatten([1, [2, 3], [[4, 5], [6, [7, 8]]]]),
        [1, 2, 3, 4, 5, 6, 7, 8],
        'Complex nesting'
    );

    assertEqual(
        deepFlatten(['a', ['b', ['c']]]),
        ['a', 'b', 'c'],
        'Works with strings'
    );

    // =========================================================================
    // unique() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: unique()');
    console.log('-'.repeat(40));

    assertType(unique, 'function', 'unique is a function');

    assertEqual(
        unique([1, 2, 2, 3, 1, 4]),
        [1, 2, 3, 4],
        'Removes duplicate numbers'
    );

    assertEqual(
        unique(['a', 'b', 'a']),
        ['a', 'b'],
        'Removes duplicate strings'
    );

    assertEqual(
        unique([]),
        [],
        'Empty array returns empty'
    );

    assertEqual(
        unique([1, 1, 1, 1]),
        [1],
        'All duplicates returns single element'
    );

    assertEqual(
        unique([1, 2, 3, 4]),
        [1, 2, 3, 4],
        'Already unique array unchanged'
    );

    assertEqual(
        unique(['first', 'second', 'first', 'third', 'second']),
        ['first', 'second', 'third'],
        'Preserves first occurrence order'
    );

    // =========================================================================
    // partition() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: partition()');
    console.log('-'.repeat(40));

    assertType(partition, 'function', 'partition is a function');

    assertEqual(
        partition([1, 2, 3, 4, 5], x => x % 2 === 0),
        [[2, 4], [1, 3, 5]],
        'Partitions by even/odd'
    );

    assertEqual(
        partition(['apple', 'banana', 'cherry'], s => s.length > 5),
        [['banana', 'cherry'], ['apple']],
        'Partitions by string length'
    );

    assertEqual(
        partition([], x => true),
        [[], []],
        'Empty array returns two empty arrays'
    );

    assertEqual(
        partition([1, 2, 3], x => true),
        [[1, 2, 3], []],
        'All pass returns all in first array'
    );

    assertEqual(
        partition([1, 2, 3], x => false),
        [[], [1, 2, 3]],
        'None pass returns all in second array'
    );

    assertEqual(
        partition([{age: 15}, {age: 25}, {age: 18}], p => p.age >= 18),
        [[{age: 25}, {age: 18}], [{age: 15}]],
        'Works with objects'
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
        console.log('🚀 You\'ve mastered reduce() for array building!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
