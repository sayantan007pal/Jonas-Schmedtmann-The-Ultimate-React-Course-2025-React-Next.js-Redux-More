/**
 * Test Suite for Challenge 15: Array.sort() - Interview-Level
 * =============================================================
 * 
 * Run this file with: node _15_test_example_sort_interview.js
 */

const {
    customSort,
    stableSort,
    sortByNestedProperty,
    sortWithCollation,
    kLargest
} = require('./_15_example_sort_interview.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
        return false;
    }
}

function assertType(value, expectedType, testName) {
    totalTests++;
    if (typeof value === expectedType) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${expectedType}`);
        console.log(`   Actual type:   ${typeof value}`);
        testsFailed++;
        return false;
    }
}

function assertNotSame(arr1, arr2, testName) {
    totalTests++;
    if (arr1 !== arr2) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Arrays should be different references (immutability)`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Challenge 15: sort() Interview-Level Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// customSort() Tests
// =========================================================================
console.log('\n📋 FUNCTION: customSort()');
console.log('-'.repeat(40));

assertType(customSort, 'function', 'customSort is a function');

assertEqual(
    customSort([3, 1, 2], (a, b) => a - b),
    [1, 2, 3],
    'Sorts numbers ascending'
);

assertEqual(
    customSort([3, 1, 2], (a, b) => b - a),
    [3, 2, 1],
    'Sorts numbers descending'
);

assertEqual(
    customSort(['c', 'a', 'b'], (a, b) => a.localeCompare(b)),
    ['a', 'b', 'c'],
    'Sorts strings alphabetically'
);

assertEqual(
    customSort([], (a, b) => a - b),
    [],
    'Empty array returns empty'
);

assertEqual(
    customSort([1], (a, b) => a - b),
    [1],
    'Single element'
);

const original1 = [3, 1, 2];
const sorted1 = customSort(original1, (a, b) => a - b);
assertNotSame(original1, sorted1, 'Returns new array (immutable)');
assertEqual(original1, [3, 1, 2], 'Original unchanged');

// =========================================================================
// stableSort() Tests
// =========================================================================
console.log('\n📋 FUNCTION: stableSort()');
console.log('-'.repeat(40));

assertType(stableSort, 'function', 'stableSort is a function');

const people = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 25 },
    { name: 'Charlie', age: 20 }
];

assertEqual(
    stableSort(people, (a, b) => a.age - b.age),
    [
        { name: 'Charlie', age: 20 },
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 25 }
    ],
    'Maintains relative order of equal elements'
);

const items = [
    { id: 1, category: 'A' },
    { id: 2, category: 'B' },
    { id: 3, category: 'A' },
    { id: 4, category: 'B' }
];

assertEqual(
    stableSort(items, (a, b) => a.category.localeCompare(b.category)),
    [
        { id: 1, category: 'A' },
        { id: 3, category: 'A' },
        { id: 2, category: 'B' },
        { id: 4, category: 'B' }
    ],
    'Stable sort by category maintains id order within category'
);

const original2 = [{ x: 1 }];
const sorted2 = stableSort(original2, (a, b) => a.x - b.x);
assertNotSame(original2, sorted2, 'Returns new array (immutable)');

// =========================================================================
// sortByNestedProperty() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortByNestedProperty()');
console.log('-'.repeat(40));

assertType(sortByNestedProperty, 'function', 'sortByNestedProperty is a function');

assertEqual(
    sortByNestedProperty([
        { user: { name: 'Bob' } },
        { user: { name: 'Alice' } }
    ], 'user.name'),
    [
        { user: { name: 'Alice' } },
        { user: { name: 'Bob' } }
    ],
    'Sorts by nested user.name'
);

assertEqual(
    sortByNestedProperty([
        { address: { city: { name: 'Zurich' } } },
        { address: { city: { name: 'Amsterdam' } } }
    ], 'address.city.name'),
    [
        { address: { city: { name: 'Amsterdam' } } },
        { address: { city: { name: 'Zurich' } } }
    ],
    'Sorts by deeply nested property'
);

assertEqual(
    sortByNestedProperty([
        { stats: { score: 50 } },
        { stats: { score: 100 } },
        { stats: { score: 25 } }
    ], 'stats.score'),
    [
        { stats: { score: 25 } },
        { stats: { score: 50 } },
        { stats: { score: 100 } }
    ],
    'Sorts by nested number property'
);

const original3 = [{ a: { b: 1 } }];
const sorted3 = sortByNestedProperty(original3, 'a.b');
assertNotSame(original3, sorted3, 'Returns new array (immutable)');

// =========================================================================
// sortWithCollation() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortWithCollation()');
console.log('-'.repeat(40));

assertType(sortWithCollation, 'function', 'sortWithCollation is a function');

assertEqual(
    sortWithCollation(['a', '1', '#', 'b', '2']),
    ['1', '2', 'a', 'b', '#'],
    'Numbers, then letters, then special chars'
);

assertEqual(
    sortWithCollation(['$', 'z', '0', 'A']),
    ['0', 'A', 'z', '$'],
    'Mixed characters sorted by collation'
);

assertEqual(
    sortWithCollation(['9', '1', '5']),
    ['1', '5', '9'],
    'Numbers sorted among themselves'
);

assertEqual(
    sortWithCollation(['c', 'a', 'b']),
    ['a', 'b', 'c'],
    'Letters sorted alphabetically'
);

const original4 = ['a', '1'];
const sorted4 = sortWithCollation(original4);
assertNotSame(original4, sorted4, 'Returns new array (immutable)');

// =========================================================================
// kLargest() Tests
// =========================================================================
console.log('\n📋 FUNCTION: kLargest()');
console.log('-'.repeat(40));

assertType(kLargest, 'function', 'kLargest is a function');

assertEqual(
    kLargest([3, 1, 4, 1, 5, 9, 2, 6], 3),
    [9, 6, 5],
    'Returns 3 largest elements'
);

assertEqual(
    kLargest([1, 2, 3], 5),
    [3, 2, 1],
    'Returns all if k > length'
);

assertEqual(
    kLargest([5, 5, 5, 5], 2),
    [5, 5],
    'Handles duplicates'
);

assertEqual(
    kLargest([10], 1),
    [10],
    'Single element'
);

assertEqual(
    kLargest([], 3),
    [],
    'Empty array returns empty'
);

assertEqual(
    kLargest([7, 3, 9, 1], 0),
    [],
    'k=0 returns empty'
);

const original5 = [3, 1, 2];
const sorted5 = kLargest(original5, 2);
assertNotSame(original5, sorted5, 'Returns new array (immutable)');
assertEqual(original5, [3, 1, 2], 'Original unchanged');

// =========================================================================
// Final Results
// =========================================================================
console.log('\n' + '='.repeat(60));
console.log('📊 TEST RESULTS');
console.log('='.repeat(60));
console.log(`Total Tests: ${totalTests}`);
console.log(`✅ Passed: ${testsPassed}`);
console.log(`❌ Failed: ${testsFailed}`);
console.log('='.repeat(60));

if (testsFailed === 0) {
    console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉');
    console.log('🚀 You\'ve mastered interview-level sorting challenges!\n');
} else {
    console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
}

process.exit(testsFailed > 0 ? 1 : 0);
