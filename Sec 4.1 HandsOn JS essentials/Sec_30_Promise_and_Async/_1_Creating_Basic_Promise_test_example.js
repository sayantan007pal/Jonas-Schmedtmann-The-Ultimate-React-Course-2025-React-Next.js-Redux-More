/**
 * Test Suite for Promises & Async/Await Challenge #1
 * ===================================================
 * Topic: Creating a Basic Promise
 * 
 * Run this file with: node _1_Creating_Basic_Promise_test_example.js
 */

const {
    createSimplePromise,
    checkNumber,
    delayedValue
} = require('./_1_Creating_Basic_Promise_example.js');

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
    console.log('🧪 Testing Challenge #1: Creating a Basic Promise\n');
    console.log('='.repeat(60));

    // Test 1: createSimplePromise
    console.log('\n📝 Task 1: createSimplePromise()\n');
    
    const promise1 = createSimplePromise();
    assertTrue(promise1 instanceof Promise, 'createSimplePromise returns a Promise');
    
    const startTime = Date.now();
    const result1 = await promise1;
    const elapsed = Date.now() - startTime;
    
    assertEqual(result1, "Success!", 'Promise resolves with "Success!"');
    assertTrue(elapsed >= 900 && elapsed <= 1500, 'Promise resolves after ~1 second');

    // Test 2: checkNumber
    console.log('\n📝 Task 2: checkNumber(num)\n');
    
    const promise2a = checkNumber(15);
    assertTrue(promise2a instanceof Promise, 'checkNumber returns a Promise');
    
    const result2a = await checkNumber(15);
    assertEqual(result2a, "Number is greater than 10", 'checkNumber(15) resolves correctly');
    
    const result2b = await checkNumber(100);
    assertEqual(result2b, "Number is greater than 10", 'checkNumber(100) resolves correctly');
    
    try {
        await checkNumber(5);
        assertTrue(false, 'checkNumber(5) should reject');
    } catch (err) {
        assertEqual(err, "Number is 10 or less", 'checkNumber(5) rejects correctly');
    }
    
    try {
        await checkNumber(10);
        assertTrue(false, 'checkNumber(10) should reject');
    } catch (err) {
        assertEqual(err, "Number is 10 or less", 'checkNumber(10) rejects correctly');
    }

    // Test 3: delayedValue
    console.log('\n📝 Task 3: delayedValue(value, delay)\n');
    
    const promise3 = delayedValue("Hello", 500);
    assertTrue(promise3 instanceof Promise, 'delayedValue returns a Promise');
    
    const startTime3 = Date.now();
    const result3 = await promise3;
    const elapsed3 = Date.now() - startTime3;
    
    assertEqual(result3, "Hello", 'delayedValue resolves with correct value');
    assertTrue(elapsed3 >= 400 && elapsed3 <= 700, 'delayedValue respects the delay');
    
    const result3b = await delayedValue(42, 100);
    assertEqual(result3b, 42, 'delayedValue works with numbers');

    printSummary();
}

runTests().catch(console.error);
