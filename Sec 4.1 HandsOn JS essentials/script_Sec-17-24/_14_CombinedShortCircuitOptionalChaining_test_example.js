/**
 * Test Suite for Challenge 14: Short-Circuit + Optional Chaining + ??
 * =====================================================================
 * 
 * Run this file with: node _14_CombinedShortCircuitOptionalChaining_test_example.js
 */

const {
    getNestedValue,
    getUserDisplayInfo,
    getComponentData,
    safeArrayOps,
    normalizeApiResponse,
    mergeConfig
} = require('./_14_CombinedShortCircuitOptionalChaining_example.js');

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

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Short-Circuit + Optional Chaining + ?? Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: getNestedValue()
// =========================================================================
console.log('\n📋 TASK 1: getNestedValue()');
console.log('-'.repeat(40));

assertEqual(
    getNestedValue({ a: { b: { c: 42 } } }, ["a", "b", "c"]),
    42,
    'Gets deeply nested value'
);
assertEqual(
    getNestedValue({ a: { b: { c: 0 } } }, ["a", "b", "c"]),
    0,
    'Gets falsy value (0)'
);
assertEqual(
    getNestedValue({ a: {} }, ["a", "b", "c"]),
    undefined,
    'Returns undefined for missing path'
);
assertEqual(
    getNestedValue(null, ["a"]),
    undefined,
    'Returns undefined for null object'
);

// =========================================================================
// Task 2 Tests: getUserDisplayInfo()
// =========================================================================
console.log('\n📋 TASK 2: getUserDisplayInfo()');
console.log('-'.repeat(40));

assertEqual(
    getUserDisplayInfo({ 
        profile: { displayName: "John Doe", username: "johnd", avatar: "/john.png" },
        email: "john@test.com",
        settings: { theme: "dark" }
    }),
    { name: "John Doe", avatar: "/john.png", theme: "dark" },
    'Gets all values from profile'
);

assertEqual(
    getUserDisplayInfo({ 
        profile: { username: "johnd" },
        email: "john@test.com"
    }),
    { name: "johnd", avatar: "/default.png", theme: "light" },
    'Falls back through chain'
);

assertEqual(
    getUserDisplayInfo({}),
    { name: "Anonymous", avatar: "/default.png", theme: "light" },
    'Uses all defaults for empty user'
);

assertEqual(
    getUserDisplayInfo({ settings: { defaultAvatar: "/custom.png" } }),
    { name: "Anonymous", avatar: "/custom.png", theme: "light" },
    'Uses settings defaultAvatar'
);

// =========================================================================
// Task 3 Tests: getComponentData()
// =========================================================================
console.log('\n📋 TASK 3: getComponentData()');
console.log('-'.repeat(40));

assertEqual(
    getComponentData({ isLoading: true, error: null, data: null }),
    { 
        showSpinner: true, 
        showError: false, 
        showContent: false, 
        showEmpty: false,
        message: "Loading data..."
    },
    'Loading state'
);

assertEqual(
    getComponentData({ isLoading: false, error: "Network failed", data: null }),
    { 
        showSpinner: false, 
        showError: true, 
        showContent: false, 
        showEmpty: false,
        message: "Error: Network failed"
    },
    'Error state'
);

assertEqual(
    getComponentData({ isLoading: false, error: null, data: [1, 2, 3] }),
    { 
        showSpinner: false, 
        showError: false, 
        showContent: true, 
        showEmpty: false,
        message: "Showing 3 items"
    },
    'Content state'
);

assertEqual(
    getComponentData({ isLoading: false, error: null, data: null }),
    { 
        showSpinner: false, 
        showError: false, 
        showContent: false, 
        showEmpty: true,
        message: "No data available"
    },
    'Empty state'
);

// =========================================================================
// Task 4 Tests: safeArrayOps()
// =========================================================================
console.log('\n📋 TASK 4: safeArrayOps()');
console.log('-'.repeat(40));

assertEqual(
    safeArrayOps({ items: [1, 2, 3], counts: { total: 10 } }),
    { firstItem: 1, lastItem: 3, itemCount: 10, hasItems: true },
    'Full data with counts.total'
);

assertEqual(
    safeArrayOps({ items: ["a", "b"] }),
    { firstItem: "a", lastItem: "b", itemCount: 2, hasItems: true },
    'Items without counts uses length'
);

assertEqual(
    safeArrayOps({ items: [] }),
    { firstItem: null, lastItem: null, itemCount: 0, hasItems: false },
    'Empty items array'
);

assertEqual(
    safeArrayOps({}),
    { firstItem: null, lastItem: null, itemCount: 0, hasItems: false },
    'Empty object'
);

assertEqual(
    safeArrayOps(null),
    { firstItem: null, lastItem: null, itemCount: 0, hasItems: false },
    'Null data'
);

// =========================================================================
// Task 5 Tests: normalizeApiResponse()
// =========================================================================
console.log('\n📋 TASK 5: normalizeApiResponse()');
console.log('-'.repeat(40));

assertEqual(
    normalizeApiResponse({ data: [1, 2, 3] }),
    { items: [1, 2, 3], count: 3, success: true },
    'Handles { data: [...] }'
);

assertEqual(
    normalizeApiResponse({ results: ["a", "b"] }),
    { items: ["a", "b"], count: 2, success: true },
    'Handles { results: [...] }'
);

assertEqual(
    normalizeApiResponse({ payload: { data: [1] } }),
    { items: [1], count: 1, success: true },
    'Handles { payload: { data: [...] } }'
);

assertEqual(
    normalizeApiResponse([1, 2, 3, 4]),
    { items: [1, 2, 3, 4], count: 4, success: true },
    'Handles direct array'
);

assertEqual(
    normalizeApiResponse({}),
    { items: [], count: 0, success: false },
    'Handles empty object'
);

// =========================================================================
// Task 6 Tests: mergeConfig()
// =========================================================================
console.log('\n📋 TASK 6: mergeConfig()');
console.log('-'.repeat(40));

assertEqual(
    mergeConfig(
        { theme: "light", timeout: 5000 },
        { theme: "dark" },
        { timeout: 10000 }
    ),
    { theme: "dark", timeout: 10000 },
    'Merges with correct priority'
);

assertEqual(
    mergeConfig({ a: 1, b: 2 }, null, { c: 3 }),
    { a: 1, b: 2, c: 3 },
    'Handles null userConfig'
);

assertEqual(
    mergeConfig(null, null, null),
    {},
    'Handles all null configs'
);

assertEqual(
    mergeConfig(
        { api: { url: "default.com", timeout: 1000 } },
        { api: { url: "user.com" } },
        {}
    ),
    { api: { url: "user.com", timeout: 1000 } },
    'Merges nested objects'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You mastered safe data access patterns!\n');
} else {
    console.log('💪 Keep working! These patterns are CRITICAL for handling API data!\n');
}
