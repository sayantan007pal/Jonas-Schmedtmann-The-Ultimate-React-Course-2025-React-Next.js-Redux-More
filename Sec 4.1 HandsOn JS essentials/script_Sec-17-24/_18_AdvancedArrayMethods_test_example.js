/**
 * Test Suite for Challenge 18: Advanced Array Methods
 * =====================================================
 * 
 * Run this file with: node _18_AdvancedArrayMethods_test_example.js
 */

const {
    groupBy,
    chunk,
    deepPick,
    difference,
    intersection,
    symmetricDifference,
    sortBy,
    flattenDeep,
    camelizeKeys
} = require('./_18_AdvancedArrayMethods_example.js');

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
console.log('🧪 Running Advanced Array Methods Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: groupBy()
// =========================================================================
console.log('\n📋 TASK 1: groupBy()');
console.log('-'.repeat(40));

assertEqual(
    groupBy([{ type: "a", v: 1 }, { type: "b", v: 2 }, { type: "a", v: 3 }], "type"),
    { a: [{ type: "a", v: 1 }, { type: "a", v: 3 }], b: [{ type: "b", v: 2 }] },
    'Groups by string key'
);

assertEqual(
    groupBy([1, 2, 3, 4, 5, 6], n => n % 2 === 0 ? "even" : "odd"),
    { odd: [1, 3, 5], even: [2, 4, 6] },
    'Groups by function'
);

assertEqual(groupBy([], "key"), {}, 'Empty array returns empty object');

// =========================================================================
// Task 2 Tests: chunk()
// =========================================================================
console.log('\n📋 TASK 2: chunk()');
console.log('-'.repeat(40));

assertEqual(
    chunk([1, 2, 3, 4, 5], 2),
    [[1, 2], [3, 4], [5]],
    'Chunks with remainder'
);

assertEqual(
    chunk([1, 2, 3, 4], 2),
    [[1, 2], [3, 4]],
    'Even chunks'
);

assertEqual(
    chunk([1, 2, 3], 5),
    [[1, 2, 3]],
    'Size larger than array'
);

assertEqual(chunk([], 2), [], 'Empty array');

// =========================================================================
// Task 3 Tests: deepPick()
// =========================================================================
console.log('\n📋 TASK 3: deepPick()');
console.log('-'.repeat(40));

assertEqual(
    deepPick(
        { user: { name: "John", email: "j@test.com", age: 30 }, meta: { id: 1 } },
        ["user.name", "meta.id"]
    ),
    { "user.name": "John", "meta.id": 1 },
    'Picks nested values'
);

assertEqual(
    deepPick({ a: { b: { c: "deep" } } }, ["a.b.c", "a.b.d"]),
    { "a.b.c": "deep", "a.b.d": undefined },
    'Undefined for missing paths'
);

assertEqual(deepPick({}, ["a.b"]), { "a.b": undefined }, 'Empty object');

// =========================================================================
// Task 4 Tests: difference(), intersection(), symmetricDifference()
// =========================================================================
console.log('\n📋 TASK 4: Set Operations');
console.log('-'.repeat(40));

assertEqual(
    difference([1, 2, 3, 4], [2, 4, 6]),
    [1, 3],
    'difference: items in first not in second'
);

assertEqual(
    intersection([1, 2, 3, 4], [2, 4, 6]),
    [2, 4],
    'intersection: items in both'
);

assertEqual(
    symmetricDifference([1, 2, 3], [2, 3, 4]),
    [1, 4],
    'symmetricDifference: items in one not both'
);

// Object comparison
const users1 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const users2 = [{ id: 2 }, { id: 4 }];
const byId = (a, b) => a.id === b.id;

assertEqual(
    difference(users1, users2, byId),
    [{ id: 1 }, { id: 3 }],
    'difference with compareFn'
);

assertEqual(
    intersection(users1, users2, byId),
    [{ id: 2 }],
    'intersection with compareFn'
);

// =========================================================================
// Task 5 Tests: sortBy()
// =========================================================================
console.log('\n📋 TASK 5: sortBy()');
console.log('-'.repeat(40));

assertEqual(
    sortBy(
        [{ name: "B", age: 30 }, { name: "A", age: 25 }, { name: "A", age: 30 }],
        { key: "name", order: "asc" },
        { key: "age", order: "desc" }
    ),
    [{ name: "A", age: 30 }, { name: "A", age: 25 }, { name: "B", age: 30 }],
    'Sorts by multiple criteria'
);

assertEqual(
    sortBy([3, 1, 2], { key: null, order: "asc" }),
    [1, 2, 3],
    'Sorts primitives (null key uses value)'
);

const original = [{ a: 3 }, { a: 1 }];
const sorted = sortBy(original, { key: "a", order: "asc" });
assertEqual(
    original,
    [{ a: 3 }, { a: 1 }],
    'Original array unchanged (immutable)'
);

// =========================================================================
// Task 6 Tests: flattenDeep()
// =========================================================================
console.log('\n📋 TASK 6: flattenDeep()');
console.log('-'.repeat(40));

assertEqual(
    flattenDeep([1, [2, [3, [4]]]], 1),
    [1, 2, [3, [4]]],
    'Flatten depth 1'
);

assertEqual(
    flattenDeep([1, [2, [3, [4]]]], 2),
    [1, 2, 3, [4]],
    'Flatten depth 2'
);

assertEqual(
    flattenDeep([1, [2, [3, [4]]]], Infinity),
    [1, 2, 3, 4],
    'Flatten completely'
);

assertEqual(
    flattenDeep([[1], [2], [3]]),
    [1, 2, 3],
    'Default depth 1'
);

// =========================================================================
// Task 7 Tests: camelizeKeys()
// =========================================================================
console.log('\n📋 TASK 7: camelizeKeys()');
console.log('-'.repeat(40));

assertEqual(
    camelizeKeys({ user_name: "John", user_email: "j@test.com" }),
    { userName: "John", userEmail: "j@test.com" },
    'Converts simple object'
);

assertEqual(
    camelizeKeys({ user_profile: { avatar_url: "x.png", bio_text: "Hello" } }),
    { userProfile: { avatarUrl: "x.png", bioText: "Hello" } },
    'Converts nested objects'
);

assertEqual(
    camelizeKeys({ items: [{ item_name: "A" }, { item_name: "B" }] }),
    { items: [{ itemName: "A" }, { itemName: "B" }] },
    'Converts arrays of objects'
);

assertEqual(camelizeKeys(null), null, 'Handles null');
assertEqual(camelizeKeys("string"), "string", 'Passes through primitives');

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You mastered advanced array methods!\n');
} else {
    console.log('💪 Keep working! These are common interview questions!\n');
}
