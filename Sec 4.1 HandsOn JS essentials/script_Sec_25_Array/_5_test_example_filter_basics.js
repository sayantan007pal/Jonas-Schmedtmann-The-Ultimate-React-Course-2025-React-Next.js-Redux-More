/**
 * Test Suite for Challenge 5: Array.filter() - Basic Selection
 * ==============================================================
 * 
 * Run this file with: node _5_test_example_filter_basics.js
 */

const {
    filterAbove,
    filterActiveUsers,
    filterBySearch,
    filterDuplicates
} = require('./_5_example_filter_basics.js');

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
        console.log(`   Arrays should be different references`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 5: Array.filter() Basic Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // filterAbove() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterAbove()');
    console.log('-'.repeat(40));

    assertType(filterAbove, 'function', 'filterAbove is a function');

    assertEqual(
        filterAbove([1, 5, 10, 15, 20], 10),
        [15, 20],
        'Filters numbers above 10'
    );

    assertEqual(
        filterAbove([1, 2, 3], 10),
        [],
        'Returns empty when no numbers pass'
    );

    assertEqual(
        filterAbove([100, 200, 300], 0),
        [100, 200, 300],
        'Returns all when all numbers pass'
    );

    assertEqual(
        filterAbove([], 5),
        [],
        'Returns empty for empty input'
    );

    assertEqual(
        filterAbove([10], 10),
        [],
        'Excludes exact threshold (greater than, not equal)'
    );

    assertEqual(
        filterAbove([-5, -1, 0, 1, 5], 0),
        [1, 5],
        'Handles negative numbers and zero'
    );

    // Immutability test
    const original = [1, 2, 3, 4, 5];
    const result = filterAbove(original, 2);
    assertEqual(original, [1, 2, 3, 4, 5], 'Original array not modified');
    assertNotSame(original, result, 'Returns new array');

    // =========================================================================
    // filterActiveUsers() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterActiveUsers()');
    console.log('-'.repeat(40));

    assertType(filterActiveUsers, 'function', 'filterActiveUsers is a function');

    assertEqual(
        filterActiveUsers([
            {name: 'Alice', email: 'a@test.com', isActive: true},
            {name: 'Bob', email: 'b@test.com', isActive: false}
        ]),
        [{name: 'Alice', email: 'a@test.com', isActive: true}],
        'Filters to only active users'
    );

    assertEqual(
        filterActiveUsers([]),
        [],
        'Returns empty for empty input'
    );

    assertEqual(
        filterActiveUsers([
            {name: 'Inactive1', email: 'i1@test.com', isActive: false},
            {name: 'Inactive2', email: 'i2@test.com', isActive: false}
        ]),
        [],
        'Returns empty when no active users'
    );

    assertEqual(
        filterActiveUsers([
            {name: 'A', email: 'a@test.com', isActive: true},
            {name: 'B', email: 'b@test.com', isActive: true}
        ]),
        [
            {name: 'A', email: 'a@test.com', isActive: true},
            {name: 'B', email: 'b@test.com', isActive: true}
        ],
        'Returns all when all users are active'
    );

    // =========================================================================
    // filterBySearch() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterBySearch()');
    console.log('-'.repeat(40));

    assertType(filterBySearch, 'function', 'filterBySearch is a function');

    assertEqual(
        filterBySearch(['iPhone', 'iPad', 'MacBook', 'Apple Watch'], 'i'),
        ['iPhone', 'iPad'],
        'Filters products containing "i" (case-insensitive)'
    );

    assertEqual(
        filterBySearch(['iPhone', 'iPad', 'MacBook'], 'IPHONE'),
        ['iPhone'],
        'Case-insensitive search for "IPHONE"'
    );

    assertEqual(
        filterBySearch(['A', 'B', 'C'], 'xyz'),
        [],
        'Returns empty when no matches'
    );

    assertEqual(
        filterBySearch([], 'test'),
        [],
        'Returns empty for empty input'
    );

    assertEqual(
        filterBySearch(['Apple', 'Banana', 'Apricot'], 'ap'),
        ['Apple', 'Apricot'],
        'Matches multiple products with "ap"'
    );

    assertEqual(
        filterBySearch(['TEST', 'test', 'TeSt'], 'test'),
        ['TEST', 'test', 'TeSt'],
        'Case-insensitive matches all variations'
    );

    assertEqual(
        filterBySearch(['abc', 'def', 'ghi'], ''),
        ['abc', 'def', 'ghi'],
        'Empty search term matches all (includes empty string)'
    );

    // =========================================================================
    // filterDuplicates() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterDuplicates()');
    console.log('-'.repeat(40));

    assertType(filterDuplicates, 'function', 'filterDuplicates is a function');

    assertEqual(
        filterDuplicates([1, 2, 2, 3, 3, 3]),
        [1, 2, 3],
        'Removes duplicate numbers'
    );

    assertEqual(
        filterDuplicates(['a', 'b', 'a', 'c']),
        ['a', 'b', 'c'],
        'Removes duplicate strings'
    );

    assertEqual(
        filterDuplicates([]),
        [],
        'Returns empty for empty input'
    );

    assertEqual(
        filterDuplicates([1, 1, 1, 1]),
        [1],
        'Returns single element for all duplicates'
    );

    assertEqual(
        filterDuplicates([1, 2, 3, 4, 5]),
        [1, 2, 3, 4, 5],
        'Returns same for already unique array'
    );

    assertEqual(
        filterDuplicates(['x', 'y', 'x', 'z', 'y', 'x']),
        ['x', 'y', 'z'],
        'Keeps first occurrence of each value'
    );

    // Mixed types edge case
    assertEqual(
        filterDuplicates([1, '1', 2, '2']),
        [1, '1', 2, '2'],
        'Treats 1 and "1" as different values'
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
        console.log('🚀 You\'ve mastered basic filter() operations!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
