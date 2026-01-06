/**
 * Test Suite for Promises & Async/Await Challenge #17
 * ====================================================
 * Topic: Advanced Fetch Error Handling
 * 
 * Run this file with: node _17_Fetch_Error_Handling_test_example.js
 */

const {
    simulatedFetch,
    robustFetch,
    delay,
    fetchWithRetry,
    fetchWithTimeout
} = require('./_17_Fetch_Error_Handling_example.js');

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
    console.log('🧪 Testing Challenge #17: Advanced Fetch Error Handling\n');
    console.log('='.repeat(60));

    // Test 1: robustFetch
    console.log('\n📝 Task 1: robustFetch()\n');
    
    const success = await robustFetch("api.example.com/data");
    assertEqual(success.success, true, 'Success returns success: true');
    assertTrue(success.data !== undefined, 'Success includes data');
    
    const networkError = await robustFetch("network-error.com");
    assertEqual(networkError.success, false, 'Network error returns success: false');
    assertEqual(networkError.errorType, "NETWORK", 'Network error has correct type');
    
    const httpError = await robustFetch("api.com/500");
    assertEqual(httpError.success, false, 'HTTP error returns success: false');
    assertEqual(httpError.errorType, "HTTP", 'HTTP error has correct type');
    assertEqual(httpError.status, 500, 'HTTP error includes status code');
    
    const notFound = await robustFetch("api.com/404");
    assertEqual(notFound.status, 404, '404 error has correct status');
    
    const parseError = await robustFetch("api.com/invalid-json");
    assertEqual(parseError.success, false, 'Parse error returns success: false');
    assertEqual(parseError.errorType, "PARSE", 'Parse error has correct type');

    // Test 2: fetchWithRetry
    console.log('\n📝 Task 2: fetchWithRetry()\n');
    
    const retrySuccess = await fetchWithRetry("api.example.com/data");
    assertEqual(retrySuccess.success, true, 'Successful fetch returns success');
    assertEqual(retrySuccess.attempts, 1, 'Successful fetch takes 1 attempt');
    
    // 500 errors should be retried
    const retryServer = await fetchWithRetry("api.com/500", 2);
    assertEqual(retryServer.success, false, '500 error fails after retries');
    assertEqual(retryServer.attempts, 2, '500 error uses all retry attempts');
    
    // 404 errors should NOT be retried
    const retryClient = await fetchWithRetry("api.com/404", 3);
    assertEqual(retryClient.success, false, '404 error fails');
    assertEqual(retryClient.attempts, 1, '404 error does NOT retry (client error)');

    // Test 3: fetchWithTimeout
    console.log('\n📝 Task 3: fetchWithTimeout()\n');
    
    const timeoutSuccess = await fetchWithTimeout("api.example.com/data", 5000);
    assertEqual(timeoutSuccess.success, true, 'Fast request succeeds');
    
    // Our simulated fetch takes 100ms, so 50ms timeout should fail
    const timeoutFail = await fetchWithTimeout("api.example.com/data", 50);
    assertEqual(timeoutFail.success, false, 'Slow request times out');
    assertEqual(timeoutFail.errorType, "TIMEOUT", 'Timeout has correct error type');

    printSummary();
}

runTests().catch(console.error);
