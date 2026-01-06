/**
 * Test Suite for Challenge 10: Array.reduce() - Object Building
 * ===============================================================
 * 
 * Run this file with: node _10_test_example_reduce_objects.js
 */

const {
    arrayToObjectById,
    groupBy,
    createLookup,
    computeStats
} = require('./_10_example_reduce_objects.js');

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

function assertObjectHasKeys(obj, keys, testName) {
    totalTests++;
    const hasAllKeys = keys.every(key => key in obj);
    if (hasAllKeys) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected keys: ${keys.join(', ')}`);
        console.log(`   Actual keys:   ${Object.keys(obj).join(', ')}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 10: reduce() Object Building Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // arrayToObjectById() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: arrayToObjectById()');
    console.log('-'.repeat(40));

    assertType(arrayToObjectById, 'function', 'arrayToObjectById is a function');

    assertEqual(
        arrayToObjectById([
            {id: 1, name: 'Alice'},
            {id: 2, name: 'Bob'}
        ]),
        {
            1: {id: 1, name: 'Alice'},
            2: {id: 2, name: 'Bob'}
        },
        'Converts array to object by id'
    );

    assertEqual(
        arrayToObjectById([]),
        {},
        'Empty array returns empty object'
    );

    assertEqual(
        arrayToObjectById([{id: 'a', value: 100}]),
        {a: {id: 'a', value: 100}},
        'Works with string ids'
    );

    // Multiple properties
    assertEqual(
        arrayToObjectById([
            {id: 1, name: 'Test', extra: true}
        ]),
        {1: {id: 1, name: 'Test', extra: true}},
        'Preserves all properties'
    );

    // =========================================================================
    // groupBy() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: groupBy()');
    console.log('-'.repeat(40));

    assertType(groupBy, 'function', 'groupBy is a function');

    assertEqual(
        groupBy([
            {name: 'Alice', department: 'Engineering'},
            {name: 'Bob', department: 'Sales'},
            {name: 'Charlie', department: 'Engineering'}
        ], 'department'),
        {
            Engineering: [
                {name: 'Alice', department: 'Engineering'},
                {name: 'Charlie', department: 'Engineering'}
            ],
            Sales: [{name: 'Bob', department: 'Sales'}]
        },
        'Groups by department'
    );

    assertEqual(
        groupBy([], 'any'),
        {},
        'Empty array returns empty object'
    );

    assertEqual(
        groupBy([{type: 'A'}, {type: 'A'}, {type: 'A'}], 'type'),
        {A: [{type: 'A'}, {type: 'A'}, {type: 'A'}]},
        'All same group'
    );

    assertEqual(
        groupBy([{x: 1}, {x: 2}, {x: 3}], 'x'),
        {1: [{x: 1}], 2: [{x: 2}], 3: [{x: 3}]},
        'Each item in own group'
    );

    // =========================================================================
    // createLookup() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: createLookup()');
    console.log('-'.repeat(40));

    assertType(createLookup, 'function', 'createLookup is a function');

    assertEqual(
        createLookup([
            {code: 'US', name: 'United States'},
            {code: 'UK', name: 'United Kingdom'}
        ], 'code', 'name'),
        {
            US: 'United States',
            UK: 'United Kingdom'
        },
        'Creates lookup table'
    );

    assertEqual(
        createLookup([], 'key', 'value'),
        {},
        'Empty array returns empty object'
    );

    assertEqual(
        createLookup([
            {id: 1, price: 100},
            {id: 2, price: 200}
        ], 'id', 'price'),
        {1: 100, 2: 200},
        'Lookup with numbers'
    );

    // =========================================================================
    // computeStats() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: computeStats()');
    console.log('-'.repeat(40));

    assertType(computeStats, 'function', 'computeStats is a function');

    const stats1 = computeStats([1, 2, 3, 4, 5]);
    assertObjectHasKeys(stats1, ['sum', 'count', 'average', 'min', 'max'], 'Returns object with all stat keys');
    assertEqual(stats1.sum, 15, 'Sum is 15');
    assertEqual(stats1.count, 5, 'Count is 5');
    assertEqual(stats1.average, 3, 'Average is 3');
    assertEqual(stats1.min, 1, 'Min is 1');
    assertEqual(stats1.max, 5, 'Max is 5');

    const statsEmpty = computeStats([]);
    assertEqual(statsEmpty.sum, 0, 'Empty sum is 0');
    assertEqual(statsEmpty.count, 0, 'Empty count is 0');
    assertEqual(statsEmpty.average, 0, 'Empty average is 0');
    assertEqual(statsEmpty.min, Infinity, 'Empty min is Infinity');
    assertEqual(statsEmpty.max, -Infinity, 'Empty max is -Infinity');

    const statsSingle = computeStats([42]);
    assertEqual(statsSingle.sum, 42, 'Single element sum');
    assertEqual(statsSingle.count, 1, 'Single element count');
    assertEqual(statsSingle.average, 42, 'Single element average');
    assertEqual(statsSingle.min, 42, 'Single element min');
    assertEqual(statsSingle.max, 42, 'Single element max');

    const statsNegative = computeStats([-5, -10, -3]);
    assertEqual(statsNegative.sum, -18, 'Negative sum');
    assertEqual(statsNegative.average, -6, 'Negative average');
    assertEqual(statsNegative.min, -10, 'Min of negatives');
    assertEqual(statsNegative.max, -3, 'Max of negatives');

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
        console.log('🚀 You\'ve mastered reduce() for object building!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
