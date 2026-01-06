/**
 * Test Suite for Promises & Async/Await Challenge #16
 * ====================================================
 * Topic: async Functions Always Return Promises
 * 
 * Run this file with: node _16_Async_Returns_Promises_test_example.js
 */

const {
    returnNumber,
    returnString,
    returnObject,
    returnArray,
    returnUndefined,
    testReturnTypes,
    returnPromise,
    returnNestedPromise,
    testPromiseUnwrapping,
    throwError,
    returnRejectedPromise,
    compareThrowAndReject
} = require('./_16_Async_Returns_Promises_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: "${expected}"`);
        console.log(`   Actual:   "${actual}"`);
        testsFailed++;
        return false;
    }
}

function assertDeepEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${JSON.stringify(expected)}`);
        console.log(`   Actual:   ${JSON.stringify(actual)}`);
        testsFailed++;
        return false;
    }
}

function assertTrue(condition, testName) {
    totalTests++;
    if (condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
        return false;
    }
}

function printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log(`📊 TEST SUMMARY: ${testsPassed}/${totalTests} tests passed`);
    if (testsFailed === 0) {
        console.log('🎉 ALL TESTS PASSED! Great job!');
    } else {
        console.log(`⚠️  ${testsFailed} test(s) failed. Keep trying!`);
    }
    console.log('='.repeat(60));
}

// =============================================================================
// Tests
// =============================================================================

async function runTests() {
    console.log('🧪 Testing Challenge #16: async Functions Always Return Promises\n');
    console.log('='.repeat(60));

    // Test 1: Return Value Wrapping
    console.log('\n📝 Task 1: Return Value Wrapping\n');
    
    assertTrue(returnNumber() instanceof Promise, 'returnNumber() returns a Promise');
    assertEqual(await returnNumber(), 42, 'returnNumber() resolves to 42');
    
    assertTrue(returnString() instanceof Promise, 'returnString() returns a Promise');
    assertEqual(await returnString(), "hello", 'returnString() resolves to "hello"');
    
    assertTrue(returnObject() instanceof Promise, 'returnObject() returns a Promise');
    assertDeepEqual(await returnObject(), { key: "value" }, 'returnObject() resolves correctly');
    
    assertTrue(returnArray() instanceof Promise, 'returnArray() returns a Promise');
    assertDeepEqual(await returnArray(), [1, 2, 3], 'returnArray() resolves correctly');
    
    assertTrue(returnUndefined() instanceof Promise, 'returnUndefined() returns a Promise');
    assertEqual(await returnUndefined(), undefined, 'returnUndefined() resolves to undefined');
    
    const types = testReturnTypes();
    assertTrue(types.number === true, 'testReturnTypes detects number Promise');
    assertTrue(types.string === true, 'testReturnTypes detects string Promise');

    // Test 2: Promise Unwrapping
    console.log('\n📝 Task 2: Returning a Promise from async Function\n');
    
    const promiseResult = await returnPromise();
    assertEqual(promiseResult, "inner value", 'returnPromise unwraps to inner value');
    
    const nestedResult = await returnNestedPromise();
    assertEqual(nestedResult, "deeply nested", 'Nested promises are fully unwrapped');
    
    const unwrapTest = await testPromiseUnwrapping();
    assertDeepEqual(
        unwrapTest,
        { single: "inner value", nested: "deeply nested" },
        'testPromiseUnwrapping returns correct values'
    );

    // Test 3: Throwing in async Functions
    console.log('\n📝 Task 3: Throwing in async Functions\n');
    
    try {
        await throwError();
        assertTrue(false, 'throwError should throw');
    } catch (err) {
        assertEqual(err.message, "Async error", 'throwError throws correct message');
    }
    
    try {
        await returnRejectedPromise();
        assertTrue(false, 'returnRejectedPromise should reject');
    } catch (err) {
        assertEqual(err, "Rejected promise", 'returnRejectedPromise rejects correctly');
    }
    
    const comparison = await compareThrowAndReject();
    assertEqual(comparison.throwCaught, "Async error", 'Throw is caught correctly');
    assertEqual(comparison.rejectCaught, "Rejected promise", 'Reject is caught correctly');

    printSummary();
}

runTests().catch(console.error);
