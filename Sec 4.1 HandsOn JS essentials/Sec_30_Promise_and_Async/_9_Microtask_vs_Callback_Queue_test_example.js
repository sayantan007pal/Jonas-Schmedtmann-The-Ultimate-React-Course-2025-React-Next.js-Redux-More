/**
 * Test Suite for Promises & Async/Await Challenge #9
 * ===================================================
 * Topic: Microtask Queue vs Callback Queue
 * 
 * Run this file with: node _9_Microtask_vs_Callback_Queue_test_example.js
 */

const {
    demonstrateEventLoop,
    compareMicrosAndMacros,
    nestedAsyncOperations
} = require('./_9_Microtask_vs_Callback_Queue_example.js');

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
    console.log('🧪 Testing Challenge #9: Microtask Queue vs Callback Queue\n');
    console.log('='.repeat(60));

    // Test 1: demonstrateEventLoop
    console.log('\n📝 Task 1: demonstrateEventLoop()\n');
    
    const result1 = await demonstrateEventLoop();
    assertTrue(Array.isArray(result1), 'demonstrateEventLoop returns an array');
    assertDeepEqual(
        result1,
        ["1. Sync", "4. Sync End", "3. Promise", "2. Timeout"],
        'Correct execution order: sync → microtask → macrotask'
    );

    // Test 2: compareMicrosAndMacros
    console.log('\n📝 Task 2: compareMicrosAndMacros()\n');
    
    const result2 = await compareMicrosAndMacros();
    assertTrue(Array.isArray(result2), 'compareMicrosAndMacros returns an array');
    
    // Check that all promises come before all timeouts
    const promiseIndices = result2.map((item, i) => item.includes('Promise') ? i : -1).filter(i => i >= 0);
    const timeoutIndices = result2.map((item, i) => item.includes('Timeout') ? i : -1).filter(i => i >= 0);
    
    const allPromisesBeforeTimeouts = promiseIndices.every(pi => 
        timeoutIndices.every(ti => pi < ti)
    );
    
    assertTrue(
        allPromisesBeforeTimeouts,
        'All Promises execute before all Timeouts'
    );
    
    assertDeepEqual(
        result2,
        ["Promise 1", "Promise 2", "Promise 3", "Timeout 1", "Timeout 2", "Timeout 3"],
        'Exact expected order'
    );

    // Test 3: nestedAsyncOperations
    console.log('\n📝 Task 3: nestedAsyncOperations()\n');
    
    const result3 = await nestedAsyncOperations();
    assertTrue(Array.isArray(result3), 'nestedAsyncOperations returns an array');
    
    // Check key ordering constraints
    const startIndex = result3.indexOf("Start");
    const endIndex = result3.indexOf("End");
    const promiseOuterIndex = result3.indexOf("Promise Outer");
    const timeoutOuterIndex = result3.indexOf("Timeout Outer");
    
    assertTrue(startIndex === 0, '"Start" is first');
    assertTrue(endIndex === 1, '"End" is second (sync code)');
    assertTrue(promiseOuterIndex < timeoutOuterIndex, 'Promise Outer before Timeout Outer');
    
    assertDeepEqual(
        result3,
        ["Start", "End", "Promise Outer", "Timeout Outer", "Promise Inside Timeout", "Timeout Inside Promise"],
        'Exact expected order for nested operations'
    );

    printSummary();
}

runTests().catch(console.error);
