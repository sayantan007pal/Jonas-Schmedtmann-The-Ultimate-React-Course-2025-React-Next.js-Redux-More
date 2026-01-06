/**
 * Test Suite for Promises & Async/Await Challenge #5
 * ===================================================
 * Topic: async Function Basics
 * 
 * Run this file with: node _5_Async_Function_Basics_test_example.js
 */

const {
    greetUser,
    fetchUserById,
    calculateSum,
    isAsyncFunction
} = require('./_5_Async_Function_Basics_example.js');

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
    console.log('🧪 Testing Challenge #5: async Function Basics\n');
    console.log('='.repeat(60));

    // Test 1: greetUser
    console.log('\n📝 Task 1: greetUser()\n');
    
    const promise1 = greetUser("Alice");
    assertTrue(promise1 instanceof Promise, 'greetUser returns a Promise');
    
    const result1a = await greetUser("Alice");
    assertEqual(result1a, "Hello, Alice!", 'greetUser("Alice") returns correct greeting');
    
    const result1b = await greetUser("Bob");
    assertEqual(result1b, "Hello, Bob!", 'greetUser("Bob") returns correct greeting');

    // Test 2: fetchUserById
    console.log('\n📝 Task 2: fetchUserById()\n');
    
    const promise2 = fetchUserById(42);
    assertTrue(promise2 instanceof Promise, 'fetchUserById returns a Promise');
    
    const startTime = Date.now();
    const user = await fetchUserById(42);
    const elapsed = Date.now() - startTime;
    
    assertDeepEqual(
        user,
        { id: 42, name: "User_42", email: "user42@example.com" },
        'fetchUserById(42) returns correct user object'
    );
    assertTrue(elapsed >= 400, 'fetchUserById has ~500ms delay');
    
    const user2 = await fetchUserById(1);
    assertDeepEqual(
        user2,
        { id: 1, name: "User_1", email: "user1@example.com" },
        'fetchUserById(1) returns correct user object'
    );

    // Test 3: calculateSum
    console.log('\n📝 Task 3: calculateSum()\n');
    
    const promise3 = calculateSum([1, 2, 3]);
    assertTrue(promise3 instanceof Promise, 'calculateSum returns a Promise');
    
    const startTime3 = Date.now();
    const sum1 = await calculateSum([1, 2, 3, 4, 5]);
    const elapsed3 = Date.now() - startTime3;
    
    assertEqual(sum1, 15, 'calculateSum([1,2,3,4,5]) returns 15');
    assertTrue(elapsed3 >= 250, 'calculateSum has ~300ms delay');
    
    const sum2 = await calculateSum([10, 20, 30]);
    assertEqual(sum2, 60, 'calculateSum([10,20,30]) returns 60');
    
    const sum3 = await calculateSum([]);
    assertEqual(sum3, 0, 'calculateSum([]) returns 0');

    // Test 4: isAsyncFunction
    console.log('\n📝 Task 4: isAsyncFunction()\n');
    
    assertEqual(isAsyncFunction(greetUser), true, 'isAsyncFunction(greetUser) returns true');
    assertEqual(isAsyncFunction(async () => {}), true, 'isAsyncFunction(async () => {}) returns true');
    assertEqual(isAsyncFunction(() => 42), false, 'isAsyncFunction(() => 42) returns false');
    assertEqual(isAsyncFunction(function() { return 5; }), false, 'Regular function returns false');
    assertEqual(
        isAsyncFunction(() => Promise.resolve(1)),
        true,
        'Function returning Promise is detected'
    );

    printSummary();
}

runTests().catch(console.error);
