/**
 * Test Suite for Challenge 13: Array.sort() - Basics
 * ====================================================
 * 
 * Run this file with: node _13_test_example_sort_basics.js
 */

const {
    sortNumbersAsc,
    sortNumbersDesc,
    sortStringsAlpha,
    sortByLength,
    sortBooleans
} = require('./_13_example_sort_basics.js');

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
console.log('🧪 Running Challenge 13: sort() Basics Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// sortNumbersAsc() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortNumbersAsc()');
console.log('-'.repeat(40));

assertType(sortNumbersAsc, 'function', 'sortNumbersAsc is a function');

assertEqual(
    sortNumbersAsc([3, 1, 4, 1, 5]),
    [1, 1, 3, 4, 5],
    'Sorts [3, 1, 4, 1, 5] ascending'
);

assertEqual(
    sortNumbersAsc([10, 2, 100]),
    [2, 10, 100],
    'Sorts [10, 2, 100] correctly (not string sort)'
);

assertEqual(
    sortNumbersAsc([]),
    [],
    'Empty array returns empty'
);

assertEqual(
    sortNumbersAsc([5]),
    [5],
    'Single element'
);

const original1 = [3, 1, 2];
const sorted1 = sortNumbersAsc(original1);
assertNotSame(original1, sorted1, 'Returns new array (immutable)');
assertEqual(original1, [3, 1, 2], 'Original array unchanged');

assertEqual(
    sortNumbersAsc([-5, 3, -1, 0]),
    [-5, -1, 0, 3],
    'Handles negative numbers'
);

// =========================================================================
// sortNumbersDesc() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortNumbersDesc()');
console.log('-'.repeat(40));

assertType(sortNumbersDesc, 'function', 'sortNumbersDesc is a function');

assertEqual(
    sortNumbersDesc([3, 1, 4, 1, 5]),
    [5, 4, 3, 1, 1],
    'Sorts [3, 1, 4, 1, 5] descending'
);

assertEqual(
    sortNumbersDesc([10, 2, 100]),
    [100, 10, 2],
    'Sorts [10, 2, 100] descending'
);

assertEqual(
    sortNumbersDesc([]),
    [],
    'Empty array returns empty'
);

const original2 = [3, 1, 2];
const sorted2 = sortNumbersDesc(original2);
assertNotSame(original2, sorted2, 'Returns new array (immutable)');

// =========================================================================
// sortStringsAlpha() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortStringsAlpha()');
console.log('-'.repeat(40));

assertType(sortStringsAlpha, 'function', 'sortStringsAlpha is a function');

assertEqual(
    sortStringsAlpha(['banana', 'Apple', 'cherry']),
    ['Apple', 'banana', 'cherry'],
    'Case-insensitive alphabetical sort'
);

assertEqual(
    sortStringsAlpha(['Z', 'a', 'M']),
    ['a', 'M', 'Z'],
    'Single letters case-insensitive'
);

assertEqual(
    sortStringsAlpha([]),
    [],
    'Empty array returns empty'
);

const original3 = ['c', 'a', 'b'];
const sorted3 = sortStringsAlpha(original3);
assertNotSame(original3, sorted3, 'Returns new array (immutable)');

// =========================================================================
// sortByLength() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortByLength()');
console.log('-'.repeat(40));

assertType(sortByLength, 'function', 'sortByLength is a function');

assertEqual(
    sortByLength(['aaa', 'a', 'aa']),
    ['a', 'aa', 'aaa'],
    'Sorts by length (shortest first)'
);

assertEqual(
    sortByLength(['hello', 'hi', 'hey']),
    ['hi', 'hey', 'hello'],
    'Sorts words by length'
);

assertEqual(
    sortByLength([]),
    [],
    'Empty array returns empty'
);

const original4 = ['long', 'a'];
const sorted4 = sortByLength(original4);
assertNotSame(original4, sorted4, 'Returns new array (immutable)');

// =========================================================================
// sortBooleans() Tests
// =========================================================================
console.log('\n📋 FUNCTION: sortBooleans()');
console.log('-'.repeat(40));

assertType(sortBooleans, 'function', 'sortBooleans is a function');

assertEqual(
    sortBooleans([false, true, false, true]),
    [true, true, false, false],
    'Sorts with true first'
);

assertEqual(
    sortBooleans([false, false, true]),
    [true, false, false],
    'Moves true to front'
);

assertEqual(
    sortBooleans([true, true, true]),
    [true, true, true],
    'All true unchanged'
);

assertEqual(
    sortBooleans([false, false]),
    [false, false],
    'All false unchanged'
);

const original5 = [false, true];
const sorted5 = sortBooleans(original5);
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
    console.log('💡 You understand basic sort() usage!\n');
} else {
    console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
}

process.exit(testsFailed > 0 ? 1 : 0);
