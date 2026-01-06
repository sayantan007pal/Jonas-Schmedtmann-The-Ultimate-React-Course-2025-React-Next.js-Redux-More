/**
 * Test Suite for Promises & Async/Await Challenge #2
 * ===================================================
 * Topic: Promise States (Pending, Fulfilled, Rejected)
 * 
 * Run this file with: node _2_Promise_States_test_example.js
 */

const {
    getImmediatelyResolved,
    getImmediatelyRejected,
    simulateRandomOutcome
} = require('./_2_Promise_States_example.js');

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
    console.log('🧪 Testing Challenge #2: Promise States\n');
    console.log('='.repeat(60));

    // Test 1: getImmediatelyResolved
    console.log('\n📝 Task 1: getImmediatelyResolved()\n');
    
    const promise1 = getImmediatelyResolved();
    assertTrue(promise1 instanceof Promise, 'getImmediatelyResolved returns a Promise');
    
    const startTime1 = Date.now();
    const result1 = await promise1;
    const elapsed1 = Date.now() - startTime1;
    
    assertEqual(result1, "Instantly resolved!", 'Promise resolves with correct value');
    assertTrue(elapsed1 < 50, 'Promise resolves immediately (no delay)');

    // Test 2: getImmediatelyRejected
    console.log('\n📝 Task 2: getImmediatelyRejected()\n');
    
    const promise2 = getImmediatelyRejected();
    assertTrue(promise2 instanceof Promise, 'getImmediatelyRejected returns a Promise');
    
    const startTime2 = Date.now();
    try {
        await promise2;
        assertTrue(false, 'Promise should reject');
    } catch (err) {
        const elapsed2 = Date.now() - startTime2;
        assertEqual(err, "Instantly rejected!", 'Promise rejects with correct error');
        assertTrue(elapsed2 < 50, 'Promise rejects immediately (no delay)');
    }

    // Test 3: simulateRandomOutcome
    console.log('\n📝 Task 3: simulateRandomOutcome()\n');
    
    const promise3 = simulateRandomOutcome();
    assertTrue(promise3 instanceof Promise, 'simulateRandomOutcome returns a Promise');
    
    // Run multiple times to verify randomness
    let successes = 0;
    let failures = 0;
    
    for (let i = 0; i < 10; i++) {
        try {
            const result = await simulateRandomOutcome();
            if (result === "Operation succeeded!") successes++;
        } catch (err) {
            if (err === "Operation failed!") failures++;
        }
    }
    
    assertTrue(successes > 0 || failures > 0, 'simulateRandomOutcome produces results');
    assertTrue(
        successes + failures === 10,
        'All outcomes are either success or failure with correct messages'
    );
    
    // Test timing
    const startTime3 = Date.now();
    try {
        await simulateRandomOutcome();
    } catch (e) {}
    const elapsed3 = Date.now() - startTime3;
    assertTrue(elapsed3 >= 400 && elapsed3 <= 700, 'Operation takes ~500ms');

    printSummary();
}

runTests().catch(console.error);
