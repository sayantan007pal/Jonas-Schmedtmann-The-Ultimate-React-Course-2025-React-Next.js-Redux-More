/**
 * Test Suite for Promises & Async/Await Challenge #11
 * ====================================================
 * Topic: Promise.race() - First to Finish Wins
 * 
 * Run this file with: node _11_Promise_Race_test_example.js
 */

const {
    raceToFinish,
    createTimeout,
    fetchWithTimeout,
    fetchFromServer,
    raceServers
} = require('./_11_Promise_Race_example.js');

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
    console.log('🧪 Testing Challenge #11: Promise.race()\n');
    console.log('='.repeat(60));

    // Test 1: raceToFinish
    console.log('\n📝 Task 1: raceToFinish()\n');
    
    const fast = new Promise(resolve => setTimeout(() => resolve("Fast"), 100));
    const slow = new Promise(resolve => setTimeout(() => resolve("Slow"), 500));
    
    const result1 = await raceToFinish([fast, slow]);
    assertEqual(result1, "Fast", 'Faster promise wins');
    
    const first = new Promise(resolve => setTimeout(() => resolve("First"), 50));
    const second = new Promise(resolve => setTimeout(() => resolve("Second"), 100));
    const third = new Promise(resolve => setTimeout(() => resolve("Third"), 150));
    
    const result1b = await raceToFinish([second, third, first]);
    assertEqual(result1b, "First", 'Fastest wins regardless of order in array');

    // Test 2: createTimeout and fetchWithTimeout
    console.log('\n📝 Task 2: createTimeout() and fetchWithTimeout()\n');
    
    const timeout = createTimeout(100);
    assertTrue(timeout instanceof Promise, 'createTimeout returns a Promise');
    
    try {
        await createTimeout(50);
        assertTrue(false, 'createTimeout should reject');
    } catch (err) {
        assertTrue(err.includes('50'), 'Timeout message includes the time');
    }
    
    const fastFetch = new Promise(resolve => setTimeout(() => resolve("data"), 100));
    const result2a = await fetchWithTimeout(fastFetch, 500);
    assertEqual(result2a, "data", 'Fast fetch beats timeout');
    
    const slowFetch = new Promise(resolve => setTimeout(() => resolve("data"), 500));
    try {
        await fetchWithTimeout(slowFetch, 100);
        assertTrue(false, 'Slow fetch should timeout');
    } catch (err) {
        assertTrue(err.includes('100'), 'Timeout error includes time');
    }

    // Test 3: raceServers
    console.log('\n📝 Task 3: raceServers()\n');
    
    const serverResult = await raceServers(["server1.com", "server2.com"]);
    assertTrue(serverResult.server !== undefined, 'Result has server property');
    assertTrue(serverResult.responseTime !== undefined, 'Result has responseTime property');
    assertTrue(
        serverResult.server === "server1.com" || serverResult.server === "server2.com",
        'Server is one of the provided URLs'
    );
    assertTrue(
        serverResult.responseTime >= 100 && serverResult.responseTime <= 600,
        'Response time is in expected range'
    );

    printSummary();
}

runTests().catch(console.error);
