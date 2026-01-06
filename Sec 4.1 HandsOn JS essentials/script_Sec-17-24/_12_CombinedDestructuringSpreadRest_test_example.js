/**
 * Test Suite for Challenge 12: Combined Destructuring + Spread + Rest
 * =====================================================================
 * 
 * Run this file with: node _12_CombinedDestructuringSpreadRest_test_example.js
 */

const {
    cloneAndExtend,
    transformUserData,
    mergeUnique,
    updateNestedUser,
    toggleTodo,
    createApiRequest
} = require('./_12_CombinedDestructuringSpreadRest_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
    }
}

function assertTrue(condition, testName) {
    if (condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Combined Destructuring/Spread/Rest Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: cloneAndExtend()
// =========================================================================
console.log('\n📋 TASK 1: cloneAndExtend()');
console.log('-'.repeat(40));

const original1 = { a: 1, b: 2 };
const extended1 = cloneAndExtend(original1, { c: 3 });
assertEqual(extended1, { a: 1, b: 2, c: 3 }, 'Extends object with new property');
assertEqual(original1, { a: 1, b: 2 }, 'Original object unchanged');
assertTrue(extended1 !== original1, 'Returns new object reference');

const override = cloneAndExtend({ x: 1, y: 2 }, { y: 99 });
assertEqual(override, { x: 1, y: 99 }, 'Extensions override original values');

// =========================================================================
// Task 2 Tests: transformUserData()
// =========================================================================
console.log('\n📋 TASK 2: transformUserData()');
console.log('-'.repeat(40));

assertEqual(
    transformUserData({ 
        user_name: "John", 
        user_email: "john@test.com", 
        user_id: 1,
        created_at: "2024-01-01",
        role: "admin"
    }),
    { 
        userName: "John", 
        userEmail: "john@test.com", 
        userId: 1,
        metadata: { created_at: "2024-01-01", role: "admin" }
    },
    'Transforms and collects metadata'
);

assertEqual(
    transformUserData({ 
        user_name: "Jane", 
        user_email: "jane@test.com", 
        user_id: 2
    }),
    { 
        userName: "Jane", 
        userEmail: "jane@test.com", 
        userId: 2,
        metadata: {}
    },
    'Works with no extra metadata'
);

// =========================================================================
// Task 3 Tests: mergeUnique()
// =========================================================================
console.log('\n📋 TASK 3: mergeUnique()');
console.log('-'.repeat(40));

assertEqual(
    mergeUnique([1, 2, 3], [3, 4, 5], [5, 6]),
    [1, 2, 3, 4, 5, 6],
    'Merges and deduplicates'
);

assertEqual(
    mergeUnique([5, 3, 1], [4, 2]),
    [1, 2, 3, 4, 5],
    'Sorts result ascending'
);

assertEqual(mergeUnique(), [], 'Returns empty for no args');
assertEqual(mergeUnique([1, 1, 1]), [1], 'Removes all duplicates');

// =========================================================================
// Task 4 Tests: updateNestedUser()
// =========================================================================
console.log('\n📋 TASK 4: updateNestedUser()');
console.log('-'.repeat(40));

const user = { id: 1, name: "John", profile: { bio: "Hello", avatar: "old.png" } };
const updated = updateNestedUser(user, { avatar: "new.png" });

assertEqual(
    updated,
    { id: 1, name: "John", profile: { bio: "Hello", avatar: "new.png" } },
    'Updates nested profile'
);
assertEqual(user.profile.avatar, "old.png", 'Original nested object unchanged');
assertTrue(updated !== user, 'Returns new user object');
assertTrue(updated.profile !== user.profile, 'Creates new profile object');

// =========================================================================
// Task 5 Tests: toggleTodo()
// =========================================================================
console.log('\n📋 TASK 5: toggleTodo()');
console.log('-'.repeat(40));

const todos = [
    { id: 1, text: "Learn JS", completed: false },
    { id: 2, text: "Build App", completed: true }
];

const toggled = toggleTodo(todos, 1);
assertEqual(
    toggled,
    [
        { id: 1, text: "Learn JS", completed: true },
        { id: 2, text: "Build App", completed: true }
    ],
    'Toggles correct todo'
);
assertEqual(todos[0].completed, false, 'Original todo unchanged');
assertTrue(toggled !== todos, 'Returns new array');
assertTrue(toggled[0] !== todos[0], 'Toggled item is new object');
assertTrue(toggled[1] === todos[1] || JSON.stringify(toggled[1]) === JSON.stringify(todos[1]), 
    'Unchanged items can be same or equivalent reference');

// =========================================================================
// Task 6 Tests: createApiRequest()
// =========================================================================
console.log('\n📋 TASK 6: createApiRequest()');
console.log('-'.repeat(40));

assertEqual(
    createApiRequest({ url: "/api/users" }),
    { 
        method: "GET", 
        url: "/api/users", 
        headers: { "Content-Type": "application/json" } 
    },
    'Uses defaults for method and headers'
);

assertEqual(
    createApiRequest({ 
        method: "POST", 
        url: "/api/users", 
        headers: { "Authorization": "Bearer token" },
        body: { name: "John" }
    }),
    { 
        method: "POST", 
        url: "/api/users", 
        headers: { "Content-Type": "application/json", "Authorization": "Bearer token" },
        body: { name: "John" }
    },
    'Merges headers and spreads extra options'
);

assertEqual(
    createApiRequest({ url: "/api/data", timeout: 5000, retry: 3 }),
    { 
        method: "GET", 
        url: "/api/data", 
        headers: { "Content-Type": "application/json" },
        timeout: 5000,
        retry: 3
    },
    'Collects extra options with rest'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You mastered combined patterns!\n');
} else {
    console.log('💪 Keep working! These patterns are ESSENTIAL for React!\n');
}
