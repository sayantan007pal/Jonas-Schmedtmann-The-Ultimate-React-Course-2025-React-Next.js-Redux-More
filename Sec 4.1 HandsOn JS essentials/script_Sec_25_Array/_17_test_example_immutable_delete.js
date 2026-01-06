/**
 * Test Suite for Challenge 17: Immutable Operations - Delete Elements
 * =====================================================================
 * 
 * Run this file with: node _17_test_example_immutable_delete.js
 */

const {
    deleteAtIndex,
    deleteByValue,
    deleteById,
    deleteByIds,
    deleteFirstN,
    deleteLastN
} = require('./_17_example_immutable_delete.js');

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
console.log('🧪 Running Challenge 17: Immutable Delete Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// deleteAtIndex() Tests
// =========================================================================
console.log('\n📋 FUNCTION: deleteAtIndex()');
console.log('-'.repeat(40));

assertType(deleteAtIndex, 'function', 'deleteAtIndex is a function');

assertEqual(
    deleteAtIndex([1, 2, 3], 1),
    [1, 3],
    'Deletes middle element'
);

assertEqual(
    deleteAtIndex(['a', 'b', 'c'], 0),
    ['b', 'c'],
    'Deletes first element'
);

assertEqual(
    deleteAtIndex([1, 2, 3], 2),
    [1, 2],
    'Deletes last element'
);

const original1 = [1, 2, 3];
const result1 = deleteAtIndex(original1, 1);
assertNotSame(original1, result1, 'Returns new array (immutable)');
assertEqual(original1, [1, 2, 3], 'Original unchanged');

// =========================================================================
// deleteByValue() Tests
// =========================================================================
console.log('\n📋 FUNCTION: deleteByValue()');
console.log('-'.repeat(40));

assertType(deleteByValue, 'function', 'deleteByValue is a function');

assertEqual(
    deleteByValue([1, 2, 3, 2, 4], 2),
    [1, 3, 4],
    'Removes ALL occurrences'
);

assertEqual(
    deleteByValue(['a', 'b', 'a'], 'a'),
    ['b'],
    'Works with strings'
);

assertEqual(
    deleteByValue([1, 2, 3], 5),
    [1, 2, 3],
    'Value not found returns same elements'
);

const original2 = [1, 2, 2];
const result2 = deleteByValue(original2, 2);
assertNotSame(original2, result2, 'Returns new array (immutable)');
assertEqual(original2, [1, 2, 2], 'Original unchanged');

// =========================================================================
// deleteById() Tests
// =========================================================================
console.log('\n📋 FUNCTION: deleteById()');
console.log('-'.repeat(40));

assertType(deleteById, 'function', 'deleteById is a function');

assertEqual(
    deleteById(
        [{ id: 1, name: 'A' }, { id: 2, name: 'B' }],
        1
    ),
    [{ id: 2, name: 'B' }],
    'Removes object by id'
);

assertEqual(
    deleteById(
        [{ id: 1 }, { id: 2 }, { id: 3 }],
        2
    ),
    [{ id: 1 }, { id: 3 }],
    'Removes from middle'
);

assertEqual(
    deleteById([{ id: 1 }], 5),
    [{ id: 1 }],
    'ID not found returns same elements'
);

const original3 = [{ id: 1 }, { id: 2 }];
const result3 = deleteById(original3, 1);
assertNotSame(original3, result3, 'Returns new array (immutable)');

// =========================================================================
// deleteByIds() Tests
// =========================================================================
console.log('\n📋 FUNCTION: deleteByIds()');
console.log('-'.repeat(40));

assertType(deleteByIds, 'function', 'deleteByIds is a function');

assertEqual(
    deleteByIds(
        [{ id: 1 }, { id: 2 }, { id: 3 }],
        [1, 3]
    ),
    [{ id: 2 }],
    'Removes multiple by ids'
);

assertEqual(
    deleteByIds(
        [{ id: 1 }, { id: 2 }],
        []
    ),
    [{ id: 1 }, { id: 2 }],
    'Empty ids array removes nothing'
);

assertEqual(
    deleteByIds(
        [{ id: 1 }, { id: 2 }],
        [3, 4, 5]
    ),
    [{ id: 1 }, { id: 2 }],
    'Non-existent ids removes nothing'
);

const original4 = [{ id: 1 }, { id: 2 }, { id: 3 }];
const result4 = deleteByIds(original4, [1, 2]);
assertNotSame(original4, result4, 'Returns new array (immutable)');

// =========================================================================
// deleteFirstN() Tests
// =========================================================================
console.log('\n📋 FUNCTION: deleteFirstN()');
console.log('-'.repeat(40));

assertType(deleteFirstN, 'function', 'deleteFirstN is a function');

assertEqual(
    deleteFirstN([1, 2, 3, 4, 5], 2),
    [3, 4, 5],
    'Removes first 2 elements'
);

assertEqual(
    deleteFirstN([1, 2, 3], 0),
    [1, 2, 3],
    'Removing 0 elements changes nothing'
);

assertEqual(
    deleteFirstN([1, 2], 5),
    [],
    'Removing more than exists returns empty'
);

const original5 = [1, 2, 3];
const result5 = deleteFirstN(original5, 1);
assertNotSame(original5, result5, 'Returns new array (immutable)');

// =========================================================================
// deleteLastN() Tests
// =========================================================================
console.log('\n📋 FUNCTION: deleteLastN()');
console.log('-'.repeat(40));

assertType(deleteLastN, 'function', 'deleteLastN is a function');

assertEqual(
    deleteLastN([1, 2, 3, 4, 5], 2),
    [1, 2, 3],
    'Removes last 2 elements'
);

assertEqual(
    deleteLastN([1, 2, 3], 0),
    [1, 2, 3],
    'Removing 0 elements changes nothing'
);

assertEqual(
    deleteLastN([1, 2], 5),
    [],
    'Removing more than exists returns empty'
);

const original6 = [1, 2, 3];
const result6 = deleteLastN(original6, 1);
assertNotSame(original6, result6, 'Returns new array (immutable)');

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
    console.log('💡 You understand immutable delete operations!\n');
} else {
    console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
}

process.exit(testsFailed > 0 ? 1 : 0);
