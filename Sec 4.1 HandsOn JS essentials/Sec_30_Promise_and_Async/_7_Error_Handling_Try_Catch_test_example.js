/**
 * Test Suite for Promises & Async/Await Challenge #7
 * ===================================================
 * Topic: Error Handling with try/catch in async Functions
 * 
 * Run this file with: node _7_Error_Handling_Try_Catch_test_example.js
 */

const {
    safeFetch,
    fetchWithErrorHandling,
    processUserData,
    processUserSafely,
    unreliableOperation,
    retryOperation
} = require('./_7_Error_Handling_Try_Catch_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

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
    console.log('🧪 Testing Challenge #7: Error Handling with try/catch\n');
    console.log('='.repeat(60));

    // Test 1: safeFetch and fetchWithErrorHandling
    console.log('\n📝 Task 1: safeFetch() and fetchWithErrorHandling()\n');
    
    const result1a = await safeFetch(true);
    assertEqual(result1a, "Data retrieved successfully", 'safeFetch(true) returns success message');
    
    try {
        await safeFetch(false);
        assertTrue(false, 'safeFetch(false) should throw');
    } catch (err) {
        assertEqual(err.message, "Network error", 'safeFetch(false) throws correct error');
    }
    
    const handled1a = await fetchWithErrorHandling(true);
    assertDeepEqual(
        handled1a,
        { success: true, data: "Data retrieved successfully" },
        'fetchWithErrorHandling(true) returns success object'
    );
    
    const handled1b = await fetchWithErrorHandling(false);
    assertDeepEqual(
        handled1b,
        { success: false, error: "Network error" },
        'fetchWithErrorHandling(false) catches error'
    );

    // Test 2: processUserData and processUserSafely
    console.log('\n📝 Task 2: processUserData() and processUserSafely()\n');
    
    const validUser = { name: "John", email: "john@example.com", age: 25 };
    const result2a = await processUserData(validUser);
    assertEqual(result2a, "User John registered successfully", 'Valid user is processed');
    
    try {
        await processUserData({ name: "", email: "test@test.com", age: 20 });
        assertTrue(false, 'Empty name should throw');
    } catch (err) {
        assertEqual(err.message || err, "Invalid name", 'Invalid name throws correct error');
    }
    
    try {
        await processUserData({ name: "Jane", email: "invalid", age: 20 });
        assertTrue(false, 'Invalid email should throw');
    } catch (err) {
        assertEqual(err.message || err, "Invalid email", 'Invalid email throws correct error');
    }
    
    try {
        await processUserData({ name: "Jane", email: "jane@test.com", age: 16 });
        assertTrue(false, 'Underage should throw');
    } catch (err) {
        assertEqual(err.message || err, "Must be 18 or older", 'Underage throws correct error');
    }
    
    const safe2a = await processUserSafely(validUser);
    assertDeepEqual(
        safe2a,
        { registered: true, message: "User John registered successfully" },
        'Valid user returns success object'
    );
    
    const safe2b = await processUserSafely({ name: "", email: "test@test.com", age: 20 });
    assertDeepEqual(
        safe2b,
        { registered: false, error: "Invalid name" },
        'Invalid user returns error object'
    );

    // Test 3: unreliableOperation and retryOperation
    console.log('\n📝 Task 3: unreliableOperation() and retryOperation()\n');
    
    // Test that unreliableOperation works (can succeed or fail)
    let succeeded = false;
    let failed = false;
    for (let i = 0; i < 20; i++) {
        try {
            await unreliableOperation();
            succeeded = true;
        } catch (e) {
            failed = true;
        }
        if (succeeded && failed) break;
    }
    assertTrue(succeeded || failed, 'unreliableOperation produces results');
    
    // Test retryOperation
    const retry1 = await retryOperation(10);
    assertTrue(
        (retry1.success === true && retry1.attempts >= 1) ||
        (retry1.success === false && retry1.attempts === 10),
        'retryOperation returns valid result object'
    );
    assertTrue(typeof retry1.attempts === 'number', 'retryOperation tracks attempts');

    printSummary();
}

runTests().catch(console.error);
