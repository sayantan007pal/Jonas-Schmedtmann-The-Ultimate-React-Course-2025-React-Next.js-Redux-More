/**
 * Test Suite for Challenge 7: Array.filter() - React Deletion Patterns
 * ======================================================================
 * 
 * Run this file with: node _7_test_example_filter_deletion.js
 */

const {
    deleteById,
    deleteByIds,
    deleteCompleted,
    softDelete,
    getActiveItems
} = require('./_7_example_filter_deletion.js');

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

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 7: filter() Deletion Patterns Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // deleteById() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: deleteById()');
    console.log('-'.repeat(40));

    assertType(deleteById, 'function', 'deleteById is a function');

    assertEqual(
        deleteById([{id: 1, name: 'A'}, {id: 2, name: 'B'}], 1),
        [{id: 2, name: 'B'}],
        'Deletes item with id 1'
    );

    assertEqual(
        deleteById([{id: 1, name: 'A'}], 1),
        [],
        'Returns empty array when deleting only item'
    );

    assertEqual(
        deleteById([{id: 1, name: 'A'}], 99),
        [{id: 1, name: 'A'}],
        'Returns unchanged when id not found'
    );

    assertEqual(
        deleteById([], 1),
        [],
        'Returns empty for empty input'
    );

    // Immutability test
    const originalItems = [{id: 1, name: 'A'}, {id: 2, name: 'B'}];
    const deletedResult = deleteById(originalItems, 1);
    assertEqual(
        originalItems,
        [{id: 1, name: 'A'}, {id: 2, name: 'B'}],
        'Original array not modified'
    );
    assertNotSame(originalItems, deletedResult, 'Returns new array');

    // Delete from middle
    assertEqual(
        deleteById([{id: 1}, {id: 2}, {id: 3}], 2),
        [{id: 1}, {id: 3}],
        'Deletes item from middle of array'
    );

    // =========================================================================
    // deleteByIds() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: deleteByIds()');
    console.log('-'.repeat(40));

    assertType(deleteByIds, 'function', 'deleteByIds is a function');

    assertEqual(
        deleteByIds([{id: 1}, {id: 2}, {id: 3}], [1, 3]),
        [{id: 2}],
        'Deletes multiple items by ids'
    );

    assertEqual(
        deleteByIds([{id: 1}, {id: 2}], []),
        [{id: 1}, {id: 2}],
        'Returns all when no ids to delete'
    );

    assertEqual(
        deleteByIds([], [1, 2, 3]),
        [],
        'Returns empty for empty input'
    );

    assertEqual(
        deleteByIds([{id: 1}, {id: 2}, {id: 3}], [1, 2, 3]),
        [],
        'Deletes all items'
    );

    assertEqual(
        deleteByIds([{id: 1}, {id: 2}], [99, 100]),
        [{id: 1}, {id: 2}],
        'Returns all when no ids match'
    );

    // =========================================================================
    // deleteCompleted() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: deleteCompleted()');
    console.log('-'.repeat(40));

    assertType(deleteCompleted, 'function', 'deleteCompleted is a function');

    assertEqual(
        deleteCompleted([
            {id: 1, text: 'Done', completed: true},
            {id: 2, text: 'Not Done', completed: false}
        ]),
        [{id: 2, text: 'Not Done', completed: false}],
        'Removes completed todos'
    );

    assertEqual(
        deleteCompleted([
            {id: 1, text: 'A', completed: true},
            {id: 2, text: 'B', completed: true}
        ]),
        [],
        'Returns empty when all completed'
    );

    assertEqual(
        deleteCompleted([
            {id: 1, text: 'A', completed: false},
            {id: 2, text: 'B', completed: false}
        ]),
        [
            {id: 1, text: 'A', completed: false},
            {id: 2, text: 'B', completed: false}
        ],
        'Returns all when none completed'
    );

    assertEqual(
        deleteCompleted([]),
        [],
        'Returns empty for empty input'
    );

    // =========================================================================
    // softDelete() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: softDelete()');
    console.log('-'.repeat(40));

    assertType(softDelete, 'function', 'softDelete is a function');

    assertEqual(
        softDelete([{id: 1, name: 'A'}, {id: 2, name: 'B'}], 1),
        [{id: 1, name: 'A', isDeleted: true}, {id: 2, name: 'B'}],
        'Marks item as soft deleted'
    );

    assertEqual(
        softDelete([{id: 1, name: 'A'}], 99),
        [{id: 1, name: 'A'}],
        'Does not modify when id not found'
    );

    assertEqual(
        softDelete([], 1),
        [],
        'Returns empty for empty input'
    );

    // Already has isDeleted false
    assertEqual(
        softDelete([{id: 1, name: 'A', isDeleted: false}], 1),
        [{id: 1, name: 'A', isDeleted: true}],
        'Updates isDeleted from false to true'
    );

    // Immutability test
    const originalForSoft = [{id: 1, name: 'A'}];
    const softResult = softDelete(originalForSoft, 1);
    assertEqual(
        originalForSoft,
        [{id: 1, name: 'A'}],
        'Original array not modified (soft delete)'
    );
    assertNotSame(originalForSoft, softResult, 'Returns new array (soft delete)');

    // =========================================================================
    // getActiveItems() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: getActiveItems()');
    console.log('-'.repeat(40));

    assertType(getActiveItems, 'function', 'getActiveItems is a function');

    assertEqual(
        getActiveItems([
            {id: 1, name: 'A', isDeleted: true},
            {id: 2, name: 'B', isDeleted: false},
            {id: 3, name: 'C'}
        ]),
        [
            {id: 2, name: 'B', isDeleted: false},
            {id: 3, name: 'C'}
        ],
        'Returns only active items'
    );

    assertEqual(
        getActiveItems([
            {id: 1, isDeleted: true},
            {id: 2, isDeleted: true}
        ]),
        [],
        'Returns empty when all deleted'
    );

    assertEqual(
        getActiveItems([
            {id: 1, name: 'A'},
            {id: 2, name: 'B'}
        ]),
        [
            {id: 1, name: 'A'},
            {id: 2, name: 'B'}
        ],
        'Returns all when none have isDeleted property'
    );

    assertEqual(
        getActiveItems([]),
        [],
        'Returns empty for empty input'
    );

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
        console.log('🚀 You\'ve mastered React deletion patterns with filter()!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
