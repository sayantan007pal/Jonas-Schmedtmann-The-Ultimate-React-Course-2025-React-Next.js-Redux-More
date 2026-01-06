/**
 * Test Suite for Promises & Async/Await Challenge #10
 * ====================================================
 * Topic: Promise.all() for Parallel Execution
 * 
 * Run this file with: node _10_Promise_All_test_example.js
 */

const {
    delay,
    fetchAllUsers,
    fetchWithPossibleError,
    fetchAllSafe,
    fetchUserProfile,
    fetchUserPosts,
    fetchUserFriends,
    getUserDashboard
} = require('./_10_Promise_All_example.js');

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
    console.log('🧪 Testing Challenge #10: Promise.all() for Parallel Execution\n');
    console.log('='.repeat(60));

    // Test 1: fetchAllUsers
    console.log('\n📝 Task 1: fetchAllUsers()\n');
    
    const startTime1 = Date.now();
    const users = await fetchAllUsers([1, 2, 3]);
    const elapsed1 = Date.now() - startTime1;
    
    assertDeepEqual(
        users,
        [{ id: 1, name: "User_1" }, { id: 2, name: "User_2" }, { id: 3, name: "User_3" }],
        'fetchAllUsers returns correct user objects'
    );
    assertTrue(
        elapsed1 < 400,
        `Parallel execution (~200ms, not 600ms). Actual: ${elapsed1}ms`
    );

    // Test 2: fetchWithPossibleError and fetchAllSafe
    console.log('\n📝 Task 2: fetchWithPossibleError() and fetchAllSafe()\n');
    
    const result2a = await fetchWithPossibleError(5);
    assertDeepEqual(result2a, { id: 5, data: "Data for 5" }, 'fetchWithPossibleError(5) resolves correctly');
    
    try {
        await fetchWithPossibleError(-1);
        assertTrue(false, 'fetchWithPossibleError(-1) should reject');
    } catch (err) {
        assertTrue(err.includes("-1") || err.includes("Invalid"), 'Rejects with error mentioning ID');
    }
    
    const safe2a = await fetchAllSafe([1, 2, 3]);
    assertDeepEqual(
        safe2a.success,
        true,
        'fetchAllSafe with valid IDs returns success: true'
    );
    assertTrue(
        safe2a.data.length === 3,
        'fetchAllSafe returns all data'
    );
    
    const safe2b = await fetchAllSafe([1, -2, 3]);
    assertDeepEqual(
        safe2b.success,
        false,
        'fetchAllSafe with invalid ID returns success: false'
    );
    assertTrue(
        safe2b.error !== undefined,
        'fetchAllSafe returns error message'
    );

    // Test 3: getUserDashboard
    console.log('\n📝 Task 3: getUserDashboard()\n');
    
    const profile = await fetchUserProfile(42);
    assertDeepEqual(profile, { userId: 42, name: "User 42" }, 'fetchUserProfile works');
    
    const posts = await fetchUserPosts(42);
    assertDeepEqual(posts, [{ id: 1, title: "Post by 42" }], 'fetchUserPosts works');
    
    const friends = await fetchUserFriends(42);
    assertDeepEqual(friends, ["Friend1", "Friend2"], 'fetchUserFriends works');
    
    const startTime3 = Date.now();
    const dashboard = await getUserDashboard(42);
    const elapsed3 = Date.now() - startTime3;
    
    assertDeepEqual(
        dashboard,
        {
            profile: { userId: 42, name: "User 42" },
            posts: [{ id: 1, title: "Post by 42" }],
            friends: ["Friend1", "Friend2"]
        },
        'getUserDashboard combines all data correctly'
    );
    assertTrue(
        elapsed3 < 500,
        `Parallel execution (~300ms). Actual: ${elapsed3}ms`
    );

    printSummary();
}

runTests().catch(console.error);
