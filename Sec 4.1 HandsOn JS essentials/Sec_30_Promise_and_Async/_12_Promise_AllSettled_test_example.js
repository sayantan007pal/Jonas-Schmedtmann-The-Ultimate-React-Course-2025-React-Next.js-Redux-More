/**
 * Test Suite for Promises & Async/Await Challenge #12
 * ====================================================
 * Topic: Promise.allSettled() - Wait for All, Handle All
 * 
 * Run this file with: node _12_Promise_AllSettled_test_example.js
 */

const {
    checkAllServices,
    processEmails,
    simulatedFetch,
    fetchAllOrNothing,
    fetchAllResults
} = require('./_12_Promise_AllSettled_example.js');

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
    console.log('🧪 Testing Challenge #12: Promise.allSettled()\n');
    console.log('='.repeat(60));

    // Test 1: checkAllServices
    console.log('\n📝 Task 1: checkAllServices()\n');
    
    const services = [
        { name: "API", check: Promise.resolve("OK") },
        { name: "Database", check: Promise.reject("Connection failed") },
        { name: "Cache", check: Promise.resolve("OK") }
    ];
    
    const result1 = await checkAllServices(services);
    assertDeepEqual(
        result1,
        [
            { name: "API", status: "online" },
            { name: "Database", status: "offline" },
            { name: "Cache", status: "online" }
        ],
        'checkAllServices returns correct statuses'
    );

    // Test 2: processEmails
    console.log('\n📝 Task 2: processEmails()\n');
    
    const emails = ["a@test.com", "b@test.com", "c@test.com", "d@test.com"];
    const result2 = await processEmails(emails);
    
    assertEqual(result2.total, 4, 'Total count is correct');
    assertEqual(result2.sent, 2, 'Sent count is correct (even indices)');
    assertEqual(result2.failed, 2, 'Failed count is correct (odd indices)');
    assertTrue(result2.results.length === 4, 'Results array has all items');
    assertEqual(result2.results[0].status, "sent", 'Index 0 is sent');
    assertEqual(result2.results[1].status, "failed", 'Index 1 is failed');

    // Test 3: fetchAllOrNothing vs fetchAllResults
    console.log('\n📝 Task 3: fetchAllOrNothing() vs fetchAllResults()\n');
    
    // Test simulatedFetch
    const fetchResult = await simulatedFetch("api.com");
    assertTrue(fetchResult.url === "api.com", 'simulatedFetch returns url');
    
    try {
        await simulatedFetch("error-api.com");
        assertTrue(false, 'simulatedFetch with "error" should reject');
    } catch (e) {
        assertTrue(true, 'simulatedFetch with "error" rejects');
    }
    
    // Test fetchAllOrNothing - all succeed
    const goodUrls = ["api1.com", "api2.com"];
    const allGood = await fetchAllOrNothing(goodUrls);
    assertEqual(allGood.success, true, 'fetchAllOrNothing with valid URLs succeeds');
    
    // Test fetchAllOrNothing - one fails
    const mixedUrls = ["api1.com", "error-api.com"];
    const allMixed = await fetchAllOrNothing(mixedUrls);
    assertEqual(allMixed.success, false, 'fetchAllOrNothing with error URL fails');
    
    // Test fetchAllResults - collects all
    const allResults = await fetchAllResults(mixedUrls);
    assertTrue(allResults.successes.length === 1, 'fetchAllResults collects successes');
    assertTrue(allResults.failures.length === 1, 'fetchAllResults collects failures');

    printSummary();
}

runTests().catch(console.error);
