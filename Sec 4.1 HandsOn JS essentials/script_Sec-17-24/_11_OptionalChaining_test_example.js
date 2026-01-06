/**
 * Test Suite for Challenge 11: Optional Chaining
 * ================================================
 * 
 * Run this file with: node _11_OptionalChaining_test_example.js
 */

const {
    getUserCity,
    getFirstItem,
    callToString,
    getBookRating,
    getReviewCount,
    extractApiData,
    getTotalRatings
} = require('./_11_OptionalChaining_example.js');

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

function assertStrictEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expected}`);
        console.log(`   Actual:   ${actual}`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Optional Chaining Challenge Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: getUserCity()
// =========================================================================
console.log('\n📋 TASK 1: getUserCity()');
console.log('-'.repeat(40));

assertStrictEqual(getUserCity({ address: { city: "NYC" } }), "NYC", 'Gets city from nested object');
assertStrictEqual(getUserCity({ address: {} }), undefined, 'Returns undefined for empty address');
assertStrictEqual(getUserCity({}), undefined, 'Returns undefined for missing address');
assertStrictEqual(getUserCity(null), undefined, 'Returns undefined for null user');
assertStrictEqual(getUserCity(undefined), undefined, 'Returns undefined for undefined user');

// =========================================================================
// Task 2 Tests: getFirstItem()
// =========================================================================
console.log('\n📋 TASK 2: getFirstItem()');
console.log('-'.repeat(40));

assertStrictEqual(getFirstItem({ items: ["a", "b"] }), "a", 'Gets first item');
assertStrictEqual(getFirstItem({ items: [] }), undefined, 'Returns undefined for empty array');
assertStrictEqual(getFirstItem({}), undefined, 'Returns undefined for missing items');
assertStrictEqual(getFirstItem(null), undefined, 'Returns undefined for null');
assertStrictEqual(getFirstItem({ items: [0] }), 0, 'Gets falsy first item (0)');

// =========================================================================
// Task 3 Tests: callToString()
// =========================================================================
console.log('\n📋 TASK 3: callToString()');
console.log('-'.repeat(40));

assertStrictEqual(callToString({ toString: () => "custom" }), "custom", 'Calls custom toString');
assertStrictEqual(callToString(123), "123", 'Calls toString on number');
assertStrictEqual(callToString(null), undefined, 'Returns undefined for null');
assertStrictEqual(callToString(undefined), undefined, 'Returns undefined for undefined');

// =========================================================================
// Task 4 Tests: getBookRating()
// =========================================================================
console.log('\n📋 TASK 4: getBookRating()');
console.log('-'.repeat(40));

assertStrictEqual(
    getBookRating({ reviews: { goodreads: { rating: 4.5 } } }),
    4.5,
    'Gets deeply nested rating'
);
assertStrictEqual(
    getBookRating({ reviews: { amazon: { rating: 4.0 } } }),
    undefined,
    'Returns undefined when goodreads missing'
);
assertStrictEqual(
    getBookRating({ reviews: {} }),
    undefined,
    'Returns undefined for empty reviews'
);
assertStrictEqual(getBookRating({}), undefined, 'Returns undefined for missing reviews');
assertStrictEqual(getBookRating(null), undefined, 'Returns undefined for null book');

// =========================================================================
// Task 5 Tests: getReviewCount()
// =========================================================================
console.log('\n📋 TASK 5: getReviewCount()');
console.log('-'.repeat(40));

assertStrictEqual(
    getReviewCount({ reviews: { goodreads: { count: 1000 } } }),
    1000,
    'Gets review count'
);
assertStrictEqual(
    getReviewCount({ reviews: { goodreads: { count: 0 } } }),
    0,
    'Keeps 0 count (not default!) - must use ??'
);
assertStrictEqual(
    getReviewCount({ reviews: {} }),
    0,
    'Returns 0 for missing goodreads'
);
assertStrictEqual(getReviewCount(null), 0, 'Returns 0 for null book');

// =========================================================================
// Task 6 Tests: extractApiData()
// =========================================================================
console.log('\n📋 TASK 6: extractApiData()');
console.log('-'.repeat(40));

assertEqual(
    extractApiData({ 
        data: { 
            user: { 
                profile: { name: "John", avatar: "/john.png" } 
            } 
        } 
    }),
    { name: "John", avatar: "/john.png", hasError: false },
    'Extracts complete user data'
);

assertEqual(
    extractApiData({ data: { user: { profile: {} } } }),
    { name: "Unknown", avatar: "/default-avatar.png", hasError: false },
    'Uses defaults for missing profile data'
);

assertEqual(
    extractApiData({ error: "Network error" }),
    { name: "Unknown", avatar: "/default-avatar.png", hasError: true },
    'Handles error response'
);

assertEqual(
    extractApiData({}),
    { name: "Unknown", avatar: "/default-avatar.png", hasError: false },
    'Handles empty response'
);

assertEqual(
    extractApiData(null),
    { name: "Unknown", avatar: "/default-avatar.png", hasError: false },
    'Handles null response'
);

// =========================================================================
// Task 7 Tests: getTotalRatings()
// =========================================================================
console.log('\n📋 TASK 7: getTotalRatings()');
console.log('-'.repeat(40));

assertStrictEqual(
    getTotalRatings([
        { reviews: { goodreads: { ratingsCount: 100 } } },
        { reviews: { amazon: { ratingsCount: 50 } } },
        { reviews: { goodreads: { ratingsCount: 200 } } }
    ]),
    300,
    'Sums ratings, treats missing as 0'
);

assertStrictEqual(
    getTotalRatings([
        { reviews: { goodreads: { ratingsCount: 0 } } },
        { reviews: { goodreads: { ratingsCount: 100 } } }
    ]),
    100,
    'Handles 0 ratings correctly'
);

assertStrictEqual(getTotalRatings([]), 0, 'Returns 0 for empty array');

assertStrictEqual(
    getTotalRatings([{}, null, { reviews: { goodreads: { ratingsCount: 50 } } }]),
    50,
    'Handles mixed invalid entries'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You mastered Optional Chaining!\n');
} else {
    console.log('💪 Keep working! Remember: ?. returns undefined if chain breaks\n');
}
