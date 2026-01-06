/**
 * Test Suite for Challenge 12: Array.reduce() - Interview-Level
 * ===============================================================
 * 
 * Run this file with: node _12_test_example_reduce_interview.js
 */

const {
    customReduce,
    mapWithReduce,
    filterWithReduce,
    pipe,
    promiseWaterfall
} = require('./_12_example_reduce_interview.js');

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

function assertThrows(fn, testName) {
    totalTests++;
    try {
        fn();
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected function to throw, but it did not`);
        testsFailed++;
        return false;
    } catch (e) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    }
}

async function assertAsyncEqual(promise, expected, testName) {
    totalTests++;
    try {
        const actual = await promise;
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
    } catch (e) {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Error: ${e.message}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 12: reduce() Interview-Level Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // customReduce() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: customReduce()');
    console.log('-'.repeat(40));

    assertType(customReduce, 'function', 'customReduce is a function');

    assertEqual(
        customReduce([1, 2, 3], (acc, curr) => acc + curr, 0),
        6,
        'Sum with initial value 0'
    );

    assertEqual(
        customReduce([1, 2, 3], (acc, curr) => acc + curr),
        6,
        'Sum without initial value (uses first element)'
    );

    assertEqual(
        customReduce([5], (acc, curr) => acc + curr, 10),
        15,
        'Single element with initial value'
    );

    assertEqual(
        customReduce([5], (acc, curr) => acc + curr),
        5,
        'Single element without initial value'
    );

    assertEqual(
        customReduce([], (acc, curr) => acc + curr, 0),
        0,
        'Empty array with initial value returns initial'
    );

    // Test index and array parameters
    assertEqual(
        customReduce([1, 2, 3], (acc, curr, idx) => acc + idx, 0),
        3,
        'Uses index parameter (0 + 1 + 2)'
    );

    // Test throwing on empty array without initial
    assertThrows(
        () => customReduce([], (acc, curr) => acc + curr),
        'Throws on empty array without initial value'
    );

    // =========================================================================
    // mapWithReduce() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: mapWithReduce()');
    console.log('-'.repeat(40));

    assertType(mapWithReduce, 'function', 'mapWithReduce is a function');

    assertEqual(
        mapWithReduce([1, 2, 3], x => x * 2),
        [2, 4, 6],
        'Doubles each element'
    );

    assertEqual(
        mapWithReduce(['a', 'b'], (el, i) => el + i),
        ['a0', 'b1'],
        'Uses index parameter'
    );

    assertEqual(
        mapWithReduce([], x => x),
        [],
        'Empty array returns empty'
    );

    assertEqual(
        mapWithReduce([1], x => x * 10),
        [10],
        'Single element'
    );

    // =========================================================================
    // filterWithReduce() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterWithReduce()');
    console.log('-'.repeat(40));

    assertType(filterWithReduce, 'function', 'filterWithReduce is a function');

    assertEqual(
        filterWithReduce([1, 2, 3, 4], x => x % 2 === 0),
        [2, 4],
        'Filters even numbers'
    );

    assertEqual(
        filterWithReduce(['a', 'bb', 'ccc'], s => s.length > 1),
        ['bb', 'ccc'],
        'Filters by string length'
    );

    assertEqual(
        filterWithReduce([], x => true),
        [],
        'Empty array returns empty'
    );

    assertEqual(
        filterWithReduce([1, 2, 3], x => false),
        [],
        'All fail returns empty'
    );

    assertEqual(
        filterWithReduce([1, 2, 3], x => true),
        [1, 2, 3],
        'All pass returns all'
    );

    // =========================================================================
    // pipe() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: pipe()');
    console.log('-'.repeat(40));

    assertType(pipe, 'function', 'pipe is a function');

    const add1 = x => x + 1;
    const double = x => x * 2;
    const square = x => x * x;

    assertEqual(
        pipe([add1, double, square])(3),
        64,
        'pipe([add1, double, square])(3) = 64'
    );

    assertEqual(
        pipe([double, add1])(5),
        11,
        'pipe([double, add1])(5) = 11'
    );

    assertEqual(
        pipe([])(5),
        5,
        'Empty pipe returns input unchanged'
    );

    assertEqual(
        pipe([add1])(10),
        11,
        'Single function pipe'
    );

    assertEqual(
        pipe([x => x.toUpperCase(), s => s + '!'])('hello'),
        'HELLO!',
        'Works with strings'
    );

    // =========================================================================
    // promiseWaterfall() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: promiseWaterfall()');
    console.log('-'.repeat(40));

    assertType(promiseWaterfall, 'function', 'promiseWaterfall is a function');

    await assertAsyncEqual(
        promiseWaterfall([
            x => Promise.resolve(x + 1),
            x => Promise.resolve(x * 2),
            x => Promise.resolve(x + 3)
        ], 5),
        15,
        'Waterfall: ((5 + 1) * 2) + 3 = 15'
    );

    await assertAsyncEqual(
        promiseWaterfall([], 42),
        42,
        'Empty waterfall returns initial value'
    );

    await assertAsyncEqual(
        promiseWaterfall([x => Promise.resolve(x * 10)], 5),
        50,
        'Single function waterfall'
    );

    await assertAsyncEqual(
        promiseWaterfall([
            s => Promise.resolve(s.toUpperCase()),
            s => Promise.resolve(s + '!!!')
        ], 'hello'),
        'HELLO!!!',
        'Works with strings'
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
        console.log('🚀 You\'ve mastered interview-level reduce() challenges!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
