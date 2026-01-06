/**
 * Test Suite for Challenge 14: Array.sort() - Advanced Compare Functions
 * ========================================================================
 * 
 * Run this file with: node _14_test_example_sort_advanced.js
 */

const {
    sortByProperty,
    sortByMultiple,
    sortByDate,
    sortWithNulls,
    sortByPriority
} = require('./_14_example_sort_advanced.js');

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
console.log('🧪 Running Challenge 14: sort() Advanced Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// sortByProperty() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortByProperty()');
console.log('-'.repeat(40));

assertType(sortByProperty, 'function', 'sortByProperty is a function');

assertEqual(
    sortByProperty([{ age: 30 }, { age: 20 }, { age: 25 }], 'age'),
    [{ age: 20 }, { age: 25 }, { age: 30 }],
    'Sorts by number property ascending'
);

assertEqual(
    sortByProperty([{ name: 'Bob' }, { name: 'Alice' }], 'name'),
    [{ name: 'Alice' }, { name: 'Bob' }],
    'Sorts by string property ascending'
);

assertEqual(
    sortByProperty([{ age: 20 }, { age: 30 }], 'age', 'desc'),
    [{ age: 30 }, { age: 20 }],
    'Sorts descending when specified'
);

assertEqual(
    sortByProperty([{ name: 'Bob' }, { name: 'Alice' }], 'name', 'desc'),
    [{ name: 'Bob' }, { name: 'Alice' }],
    'Sorts strings descending'
);

const original1 = [{ x: 2 }, { x: 1 }];
const sorted1 = sortByProperty(original1, 'x');
assertNotSame(original1, sorted1, 'Returns new array (immutable)');

// =========================================================================
// sortByMultiple() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortByMultiple()');
console.log('-'.repeat(40));

assertType(sortByMultiple, 'function', 'sortByMultiple is a function');

const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 25 },
    { name: 'Alice', age: 30 }
];

assertEqual(
    sortByMultiple(users, 'name', 'age'),
    [
        { name: 'Alice', age: 25 },
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 25 }
    ],
    'Sorts by name first, then age for ties'
);

const products = [
    { category: 'A', price: 20 },
    { category: 'B', price: 10 },
    { category: 'A', price: 10 }
];

assertEqual(
    sortByMultiple(products, 'category', 'price'),
    [
        { category: 'A', price: 10 },
        { category: 'A', price: 20 },
        { category: 'B', price: 10 }
    ],
    'Sorts products by category then price'
);

const original2 = [{ a: 1, b: 2 }];
const sorted2 = sortByMultiple(original2, 'a', 'b');
assertNotSame(original2, sorted2, 'Returns new array (immutable)');

// =========================================================================
// sortByDate() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortByDate()');
console.log('-'.repeat(40));

assertType(sortByDate, 'function', 'sortByDate is a function');

const posts = [
    { title: 'Old', date: '2023-01-01' },
    { title: 'New', date: '2024-06-15' },
    { title: 'Mid', date: '2023-06-01' }
];

assertEqual(
    sortByDate(posts, 'date'),
    [
        { title: 'New', date: '2024-06-15' },
        { title: 'Mid', date: '2023-06-01' },
        { title: 'Old', date: '2023-01-01' }
    ],
    'Sorts by date (newest first)'
);

const events = [
    { name: 'A', createdAt: '2024-01-15T10:00:00Z' },
    { name: 'B', createdAt: '2024-01-15T09:00:00Z' }
];

assertEqual(
    sortByDate(events, 'createdAt'),
    [
        { name: 'A', createdAt: '2024-01-15T10:00:00Z' },
        { name: 'B', createdAt: '2024-01-15T09:00:00Z' }
    ],
    'Handles ISO datetime strings'
);

const original3 = [{ d: '2024-01-01' }];
const sorted3 = sortByDate(original3, 'd');
assertNotSame(original3, sorted3, 'Returns new array (immutable)');

// =========================================================================
// sortWithNulls() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortWithNulls()');
console.log('-'.repeat(40));

assertType(sortWithNulls, 'function', 'sortWithNulls is a function');

assertEqual(
    sortWithNulls([
        { name: 'Bob' },
        { name: null },
        { name: 'Alice' }
    ], 'name'),
    [
        { name: 'Alice' },
        { name: 'Bob' },
        { name: null }
    ],
    'Pushes null to end'
);

assertEqual(
    sortWithNulls([
        { age: undefined },
        { age: 25 },
        { age: null },
        { age: 20 }
    ], 'age'),
    [
        { age: 20 },
        { age: 25 },
        { age: undefined },
        { age: null }
    ],
    'Pushes undefined and null to end'
);

assertEqual(
    sortWithNulls([{ x: 1 }, { x: 2 }], 'x'),
    [{ x: 1 }, { x: 2 }],
    'No nulls - normal sort'
);

const original4 = [{ x: null }, { x: 1 }];
const sorted4 = sortWithNulls(original4, 'x');
assertNotSame(original4, sorted4, 'Returns new array (immutable)');

// =========================================================================
// sortByPriority() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortByPriority()');
console.log('-'.repeat(40));

assertType(sortByPriority, 'function', 'sortByPriority is a function');

assertEqual(
    sortByPriority(
        ['high', 'low', 'medium', 'critical'],
        ['critical', 'high', 'medium', 'low']
    ),
    ['critical', 'high', 'medium', 'low'],
    'Sorts by custom priority order'
);

assertEqual(
    sortByPriority(
        ['c', 'a', 'b', 'x'],
        ['a', 'b', 'c']
    ),
    ['a', 'b', 'c', 'x'],
    'Unknown items go to end'
);

assertEqual(
    sortByPriority(['red', 'blue', 'green'], ['green', 'red']),
    ['green', 'red', 'blue'],
    'Blue not in priority, goes last'
);

const original5 = ['a', 'b'];
const sorted5 = sortByPriority(original5, ['b', 'a']);
assertNotSame(original5, sorted5, 'Returns new array (immutable)');

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
    console.log('💡 You can handle complex sorting scenarios!\n');
} else {
    console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
}

process.exit(testsFailed > 0 ? 1 : 0);
