/**
 * Test Suite for Promises & Async/Await Challenge #3
 * ===================================================
 * Topic: Using .then() and .catch() for Promise Consumption
 * 
 * Run this file with: node _3_Then_and_Catch_test_example.js
 */

const {
    doubleAfterDelay,
    quadrupleNumber,
    divideNumbers,
    safeDivide,
    processUserData
} = require('./_3_Then_and_Catch_example.js');

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
    console.log('🧪 Testing Challenge #3: .then() and .catch()\n');
    console.log('='.repeat(60));

    // Test 1: doubleAfterDelay and quadrupleNumber
    console.log('\n📝 Task 1: doubleAfterDelay() and quadrupleNumber()\n');
    
    const promise1a = doubleAfterDelay(5);
    assertTrue(promise1a instanceof Promise, 'doubleAfterDelay returns a Promise');
    
    const result1a = await doubleAfterDelay(5);
    assertEqual(result1a, 10, 'doubleAfterDelay(5) returns 10');
    
    const result1b = await doubleAfterDelay(7);
    assertEqual(result1b, 14, 'doubleAfterDelay(7) returns 14');
    
    const promise1c = quadrupleNumber(5);
    assertTrue(promise1c instanceof Promise, 'quadrupleNumber returns a Promise');
    
    const startTime = Date.now();
    const result1c = await quadrupleNumber(5);
    const elapsed = Date.now() - startTime;
    
    assertEqual(result1c, 20, 'quadrupleNumber(5) returns 20');
    assertTrue(elapsed >= 900, 'quadrupleNumber chains two delays (~1 second total)');
    
    const result1d = await quadrupleNumber(3);
    assertEqual(result1d, 12, 'quadrupleNumber(3) returns 12');

    // Test 2: divideNumbers and safeDivide
    console.log('\n📝 Task 2: divideNumbers() and safeDivide()\n');
    
    const promise2a = divideNumbers(10, 2);
    assertTrue(promise2a instanceof Promise, 'divideNumbers returns a Promise');
    
    const result2a = await divideNumbers(10, 2);
    assertEqual(result2a, 5, 'divideNumbers(10, 2) returns 5');
    
    const result2b = await divideNumbers(15, 3);
    assertEqual(result2b, 5, 'divideNumbers(15, 3) returns 5');
    
    try {
        await divideNumbers(10, 0);
        assertTrue(false, 'divideNumbers(10, 0) should reject');
    } catch (err) {
        assertEqual(err, "Cannot divide by zero", 'divideNumbers rejects with correct message');
    }
    
    const result2c = await safeDivide(10, 2);
    assertEqual(result2c, 5, 'safeDivide(10, 2) returns 5');
    
    const result2d = await safeDivide(10, 0);
    assertEqual(result2d, 0, 'safeDivide(10, 0) returns 0 (catches error)');

    // Test 3: processUserData
    console.log('\n📝 Task 3: processUserData()\n');
    
    const user1 = { firstName: "John", lastName: "Doe", age: 25 };
    const promise3 = processUserData(user1);
    assertTrue(promise3 instanceof Promise, 'processUserData returns a Promise');
    
    const result3a = await processUserData(user1);
    assertEqual(
        result3a,
        "HELLO, JOHN DOE! YOU ARE 25 YEARS OLD.",
        'processUserData formats greeting correctly'
    );
    
    const user2 = { firstName: "Jane", lastName: "Smith", age: 30 };
    const result3b = await processUserData(user2);
    assertEqual(
        result3b,
        "HELLO, JANE SMITH! YOU ARE 30 YEARS OLD.",
        'processUserData works with different user'
    );

    printSummary();
}

runTests().catch(console.error);
