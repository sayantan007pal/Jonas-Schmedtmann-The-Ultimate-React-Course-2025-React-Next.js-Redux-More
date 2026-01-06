/**
 * Test Suite for Challenge 8: Array.filter() - Interview-Level
 * ==============================================================
 * 
 * Run this file with: node _8_test_example_filter_interview.js
 */

const {
    customFilter,
    filterByPermissions,
    filterIntersection,
    filterDifference,
    filterByPath
} = require('./_8_example_filter_interview.js');

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
        console.log(`   Should return a new array`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 8: filter() Interview-Level Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // customFilter() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: customFilter()');
    console.log('-'.repeat(40));

    assertType(customFilter, 'function', 'customFilter is a function');

    assertEqual(
        customFilter([1, 2, 3, 4, 5], x => x > 2),
        [3, 4, 5],
        'Filters numbers greater than 2'
    );

    assertEqual(
        customFilter(['a', 'bb', 'ccc'], (el, i) => el.length > i),
        ['a', 'bb', 'ccc'],
        'Uses index parameter correctly'
    );

    assertEqual(
        customFilter([], x => true),
        [],
        'Returns empty for empty input'
    );

    assertEqual(
        customFilter([1, 2, 3], x => false),
        [],
        'Returns empty when nothing passes'
    );

    assertEqual(
        customFilter([1, 2, 3], x => true),
        [1, 2, 3],
        'Returns all when everything passes'
    );

    // Test with array parameter
    assertEqual(
        customFilter([1, 2, 3], (el, i, arr) => el === arr[0]),
        [1],
        'Passes array reference to callback'
    );

    // Immutability test
    const original = [1, 2, 3, 4, 5];
    const result = customFilter(original, x => x > 2);
    assertNotSame(original, result, 'Returns a new array');

    // =========================================================================
    // filterByPermissions() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterByPermissions()');
    console.log('-'.repeat(40));

    assertType(filterByPermissions, 'function', 'filterByPermissions is a function');

    assertEqual(
        filterByPermissions(
            [{id: 1, name: 'Doc1'}, {id: 2, name: 'Doc2'}, {id: 3, name: 'Doc3'}],
            [1, 3]
        ),
        [{id: 1, name: 'Doc1'}, {id: 3, name: 'Doc3'}],
        'Filters by allowed IDs'
    );

    assertEqual(
        filterByPermissions([{id: 1, name: 'A'}], []),
        [],
        'Returns empty when no permissions'
    );

    assertEqual(
        filterByPermissions([], [1, 2, 3]),
        [],
        'Returns empty for empty resources'
    );

    assertEqual(
        filterByPermissions(
            [{id: 1, name: 'A'}, {id: 2, name: 'B'}],
            [1, 2]
        ),
        [{id: 1, name: 'A'}, {id: 2, name: 'B'}],
        'Returns all when all permitted'
    );

    assertEqual(
        filterByPermissions(
            [{id: 1, name: 'A'}],
            [99, 100]
        ),
        [],
        'Returns empty when no matching permissions'
    );

    // =========================================================================
    // filterIntersection() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterIntersection()');
    console.log('-'.repeat(40));

    assertType(filterIntersection, 'function', 'filterIntersection is a function');

    assertEqual(
        filterIntersection([1, 2, 3, 4], [3, 4, 5, 6]),
        [3, 4],
        'Finds intersection of two arrays'
    );

    assertEqual(
        filterIntersection([1, 2], [3, 4]),
        [],
        'Returns empty when no common elements'
    );

    assertEqual(
        filterIntersection([1, 1, 2, 2], [2, 2, 3, 3]),
        [2],
        'Returns unique intersection elements'
    );

    assertEqual(
        filterIntersection([], [1, 2, 3]),
        [],
        'Returns empty when first array is empty'
    );

    assertEqual(
        filterIntersection([1, 2, 3], []),
        [],
        'Returns empty when second array is empty'
    );

    assertEqual(
        filterIntersection(['a', 'b', 'c'], ['b', 'c', 'd']),
        ['b', 'c'],
        'Works with strings'
    );

    // =========================================================================
    // filterDifference() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterDifference()');
    console.log('-'.repeat(40));

    assertType(filterDifference, 'function', 'filterDifference is a function');

    assertEqual(
        filterDifference([1, 2, 3, 4], [3, 4, 5, 6]),
        [1, 2],
        'Finds difference (arr1 - arr2)'
    );

    assertEqual(
        filterDifference([1, 2], [3, 4]),
        [1, 2],
        'Returns all of arr1 when no overlap'
    );

    assertEqual(
        filterDifference([1, 1, 2, 2], [2, 2]),
        [1],
        'Returns unique difference elements'
    );

    assertEqual(
        filterDifference([], [1, 2, 3]),
        [],
        'Returns empty when first array is empty'
    );

    assertEqual(
        filterDifference([1, 2, 3], []),
        [1, 2, 3],
        'Returns all of arr1 when second array is empty'
    );

    assertEqual(
        filterDifference([1, 2, 3], [1, 2, 3]),
        [],
        'Returns empty when arrays are identical'
    );

    // =========================================================================
    // filterByPath() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterByPath()');
    console.log('-'.repeat(40));

    assertType(filterByPath, 'function', 'filterByPath is a function');

    assertEqual(
        filterByPath([
            {user: {address: {city: 'NYC'}}},
            {user: {address: {city: 'LA'}}}
        ], 'user.address.city', 'NYC'),
        [{user: {address: {city: 'NYC'}}}],
        'Filters by nested path'
    );

    assertEqual(
        filterByPath([{a: {b: 1}}, {a: {b: 2}}], 'a.b', 2),
        [{a: {b: 2}}],
        'Filters by simple nested path'
    );

    assertEqual(
        filterByPath([{name: 'Alice'}, {name: 'Bob'}], 'name', 'Alice'),
        [{name: 'Alice'}],
        'Filters by single-level path'
    );

    assertEqual(
        filterByPath([], 'any.path', 'value'),
        [],
        'Returns empty for empty input'
    );

    // Handle missing path gracefully
    assertEqual(
        filterByPath([
            {user: {address: {city: 'NYC'}}},
            {user: {name: 'Bob'}}  // missing address.city
        ], 'user.address.city', 'NYC'),
        [{user: {address: {city: 'NYC'}}}],
        'Handles objects with missing nested path'
    );

    assertEqual(
        filterByPath([{a: 1}, {a: 2}, {a: 3}], 'a', 2),
        [{a: 2}],
        'Filters by top-level property'
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
        console.log('🚀 You\'ve mastered interview-level filter() challenges!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
