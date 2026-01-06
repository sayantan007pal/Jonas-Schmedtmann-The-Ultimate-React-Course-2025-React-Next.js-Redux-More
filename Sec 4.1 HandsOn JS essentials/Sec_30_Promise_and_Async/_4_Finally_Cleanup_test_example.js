/**
 * Test Suite for Promises & Async/Await Challenge #4
 * ===================================================
 * Topic: Using .finally() for Cleanup
 * 
 * Run this file with: node _4_Finally_Cleanup_test_example.js
 */

const {
    fetchWithLogging,
    connectToDatabase,
    processOrder
} = require('./_4_Finally_Cleanup_example.js');

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
    console.log('🧪 Testing Challenge #4: .finally() for Cleanup\n');
    console.log('='.repeat(60));

    // Test 1: fetchWithLogging
    console.log('\n📝 Task 1: fetchWithLogging()\n');
    
    const result1a = fetchWithLogging(true);
    assertTrue(result1a.promise instanceof Promise, 'fetchWithLogging returns object with promise');
    assertTrue(typeof result1a.getLoadingState === 'function', 'fetchWithLogging returns getLoadingState function');
    assertEqual(result1a.getLoadingState(), true, 'Loading state is true initially');
    
    const data1a = await result1a.promise;
    assertEqual(data1a, "Data fetched successfully", 'Promise resolves with success message');
    assertEqual(result1a.getLoadingState(), false, 'Loading state is false after resolve');
    
    // Test with failure
    const result1b = fetchWithLogging(false);
    assertEqual(result1b.getLoadingState(), true, 'Loading state is true initially (failure case)');
    
    try {
        await result1b.promise;
    } catch (err) {
        assertEqual(err, "Fetch failed", 'Promise rejects with error message');
    }
    assertEqual(result1b.getLoadingState(), false, 'Loading state is false after reject (.finally ran)');

    // Test 2: connectToDatabase
    console.log('\n📝 Task 2: connectToDatabase()\n');
    
    const result2a = connectToDatabase(true);
    assertTrue(result2a.promise instanceof Promise, 'connectToDatabase returns object with promise');
    
    await result2a.promise;
    const logs2a = result2a.getLogs();
    assertTrue(
        logs2a.includes("Cleanup: closing temporary resources"),
        'Cleanup message logged via .finally()'
    );
    
    // Test with failure
    const result2b = connectToDatabase(false);
    try {
        await result2b.promise;
    } catch (err) {
        assertEqual(err, "Connection failed", 'Promise rejects correctly');
    }
    const logs2b = result2b.getLogs();
    assertTrue(
        logs2b.includes("Cleanup: closing temporary resources"),
        'Cleanup runs even on rejection'
    );

    // Test 3: processOrder
    console.log('\n📝 Task 3: processOrder()\n');
    
    const result3a = processOrder(123);
    assertTrue(result3a.promise instanceof Promise, 'processOrder returns object with promise');
    assertEqual(result3a.getStatus(), "pending", 'Status is pending initially');
    
    const orderResult = await result3a.promise;
    assertEqual(
        orderResult,
        "Order #123 processed - Confirmation sent",
        'Success message is transformed correctly'
    );
    assertEqual(result3a.getStatus(), "complete", 'Status is complete after resolution');
    
    // Test with invalid order
    const result3b = processOrder(-5);
    assertEqual(result3b.getStatus(), "pending", 'Status is pending initially (error case)');
    
    const errorResult = await result3b.promise;
    assertEqual(
        errorResult,
        "Error: Invalid order ID",
        'Error is caught and transformed'
    );
    assertEqual(result3b.getStatus(), "complete", 'Status is complete after rejection');

    printSummary();
}

runTests().catch(console.error);
