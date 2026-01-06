/**
 * Test Suite for Promises & Async/Await Challenge #8
 * ===================================================
 * Topic: Fetch API Basics
 * 
 * Run this file with: node _8_Fetch_API_Basics_test_example.js
 */

const {
    simulatedFetch,
    fetchUser,
    fetchUserAsync,
    fetchUserSafe
} = require('./_8_Fetch_API_Basics_example.js');

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
    console.log('🧪 Testing Challenge #8: Fetch API Basics\n');
    console.log('='.repeat(60));

    // Test 1: fetchUser with .then()
    console.log('\n📝 Task 1: fetchUser() with .then()\n');
    
    const promise1 = fetchUser(1);
    assertTrue(promise1 instanceof Promise, 'fetchUser returns a Promise');
    
    const user1 = await fetchUser(1);
    assertDeepEqual(
        user1,
        { id: 1, name: "User 1", email: "user1@example.com" },
        'fetchUser(1) returns correct user object'
    );
    
    const user2 = await fetchUser(5);
    assertDeepEqual(
        user2,
        { id: 5, name: "User 5", email: "user5@example.com" },
        'fetchUser(5) returns correct user object'
    );

    // Test 2: fetchUserAsync
    console.log('\n📝 Task 2: fetchUserAsync() with async/await\n');
    
    const promise2 = fetchUserAsync(1);
    assertTrue(promise2 instanceof Promise, 'fetchUserAsync returns a Promise');
    
    const userAsync1 = await fetchUserAsync(1);
    assertDeepEqual(
        userAsync1,
        { id: 1, name: "User 1", email: "user1@example.com" },
        'fetchUserAsync(1) returns correct user object'
    );
    
    const userAsync3 = await fetchUserAsync(3);
    assertDeepEqual(
        userAsync3,
        { id: 3, name: "User 3", email: "user3@example.com" },
        'fetchUserAsync(3) returns correct user object'
    );

    // Test 3: fetchUserSafe
    console.log('\n📝 Task 3: fetchUserSafe() with error handling\n');
    
    const userSafe1 = await fetchUserSafe(1);
    assertDeepEqual(
        userSafe1,
        { id: 1, name: "User 1", email: "user1@example.com" },
        'fetchUserSafe(1) returns correct user'
    );
    
    try {
        await fetchUserSafe(999);
        assertTrue(false, 'fetchUserSafe(999) should throw');
    } catch (err) {
        assertTrue(
            err.message.includes('404') || err.message.includes('error'),
            'fetchUserSafe(999) throws error with status'
        );
    }
    
    try {
        await fetchUserSafe(0);
        assertTrue(false, 'fetchUserSafe(0) should throw');
    } catch (err) {
        assertTrue(
            err.message.includes('404') || err.message.includes('error'),
            'fetchUserSafe(0) throws error for invalid ID'
        );
    }

    printSummary();
}

runTests().catch(console.error);
