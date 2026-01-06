/**
 * Test Suite for Challenge 16: Immutable Operations - Add Elements
 * ==================================================================
 * 
 * Run this file with: node _16_test_example_immutable_add.js
 */

const {
    addToEnd,
    addToStart,
    insertAtIndex,
    addMultiple,
    addToObjectArray
} = require('./_16_example_immutable_add.js');

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
console.log('🧪 Running Challenge 16: Immutable Add Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// addToEnd() Tests
// =========================================================================
console.log('\n📋 FUNCTION: addToEnd()');
console.log('-'.repeat(40));

assertType(addToEnd, 'function', 'addToEnd is a function');

assertEqual(
    addToEnd([1, 2, 3], 4),
    [1, 2, 3, 4],
    'Adds element to end'
);

assertEqual(
    addToEnd([], 'first'),
    ['first'],
    'Adds to empty array'
);

assertEqual(
    addToEnd(['a'], 'b'),
    ['a', 'b'],
    'Works with strings'
);

const original1 = [1, 2];
const result1 = addToEnd(original1, 3);
assertNotSame(original1, result1, 'Returns new array (immutable)');
assertEqual(original1, [1, 2], 'Original unchanged');

// =========================================================================
// addToStart() Tests
// =========================================================================
console.log('\n📋 FUNCTION: addToStart()');
console.log('-'.repeat(40));

assertType(addToStart, 'function', 'addToStart is a function');

assertEqual(
    addToStart([1, 2, 3], 0),
    [0, 1, 2, 3],
    'Adds element to start'
);

assertEqual(
    addToStart([], 'first'),
    ['first'],
    'Adds to empty array'
);

const original2 = [1, 2];
const result2 = addToStart(original2, 0);
assertNotSame(original2, result2, 'Returns new array (immutable)');
assertEqual(original2, [1, 2], 'Original unchanged');

// =========================================================================
// insertAtIndex() Tests
// =========================================================================
console.log('\n📋 FUNCTION: insertAtIndex()');
console.log('-'.repeat(40));

assertType(insertAtIndex, 'function', 'insertAtIndex is a function');

assertEqual(
    insertAtIndex([1, 2, 4], 2, 3),
    [1, 2, 3, 4],
    'Inserts at middle'
);

assertEqual(
    insertAtIndex(['a', 'c'], 1, 'b'),
    ['a', 'b', 'c'],
    'Inserts between elements'
);

assertEqual(
    insertAtIndex([1, 2], 0, 0),
    [0, 1, 2],
    'Inserts at beginning (index 0)'
);

assertEqual(
    insertAtIndex([1, 2], 2, 3),
    [1, 2, 3],
    'Inserts at end (index = length)'
);

const original3 = [1, 3];
const result3 = insertAtIndex(original3, 1, 2);
assertNotSame(original3, result3, 'Returns new array (immutable)');
assertEqual(original3, [1, 3], 'Original unchanged');

// =========================================================================
// addMultiple() Tests
// =========================================================================
console.log('\n📋 FUNCTION: addMultiple()');
console.log('-'.repeat(40));

assertType(addMultiple, 'function', 'addMultiple is a function');

assertEqual(
    addMultiple([1, 2], [3, 4, 5]),
    [1, 2, 3, 4, 5],
    'Adds multiple elements'
);

assertEqual(
    addMultiple([], ['a', 'b']),
    ['a', 'b'],
    'Adds to empty array'
);

assertEqual(
    addMultiple([1], []),
    [1],
    'Adding empty array changes nothing'
);

const original4 = [1];
const result4 = addMultiple(original4, [2, 3]);
assertNotSame(original4, result4, 'Returns new array (immutable)');
assertEqual(original4, [1], 'Original unchanged');

// =========================================================================
// addToObjectArray() Tests
// =========================================================================
console.log('\n📋 FUNCTION: addToObjectArray()');
console.log('-'.repeat(40));

assertType(addToObjectArray, 'function', 'addToObjectArray is a function');

assertEqual(
    addToObjectArray(
        [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
        { name: 'Charlie' }
    ),
    [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ],
    'Adds with auto-generated id'
);

assertEqual(
    addToObjectArray([], { name: 'First' }),
    [{ id: 1, name: 'First' }],
    'First item gets id 1'
);

assertEqual(
    addToObjectArray(
        [{ id: 5, value: 'x' }],
        { value: 'y' }
    ),
    [
        { id: 5, value: 'x' },
        { id: 6, value: 'y' }
    ],
    'Uses max id + 1 (not array length)'
);

const original5 = [{ id: 1, name: 'A' }];
const result5 = addToObjectArray(original5, { name: 'B' });
assertNotSame(original5, result5, 'Returns new array (immutable)');
assertEqual(original5, [{ id: 1, name: 'A' }], 'Original unchanged');

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
    console.log('💡 You understand immutable add operations!\n');
} else {
    console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
}

process.exit(testsFailed > 0 ? 1 : 0);
