/**
 * Test Suite for Challenge 18: Immutable Operations - Update Elements
 * =====================================================================
 * 
 * Run this file with: node _18_test_example_immutable_update.js
 */

const {
    updateAtIndex,
    updateById,
    toggleProperty,
    updateAllMatching,
    incrementProperty
} = require('./_18_example_immutable_update.js');

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

function assertObjectNotSame(obj1, obj2, testName) {
    totalTests++;
    if (obj1 !== obj2) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Objects should be different references (immutability)`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Challenge 18: Immutable Update Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// updateAtIndex() Tests
// =========================================================================
console.log('\n📋 FUNCTION: updateAtIndex()');
console.log('-'.repeat(40));

assertType(updateAtIndex, 'function', 'updateAtIndex is a function');

assertEqual(
    updateAtIndex([1, 2, 3], 1, 20),
    [1, 20, 3],
    'Updates middle element'
);

assertEqual(
    updateAtIndex(['a', 'b', 'c'], 0, 'z'),
    ['z', 'b', 'c'],
    'Updates first element'
);

assertEqual(
    updateAtIndex([1, 2, 3], 2, 30),
    [1, 2, 30],
    'Updates last element'
);

const original1 = [1, 2, 3];
const result1 = updateAtIndex(original1, 1, 20);
assertNotSame(original1, result1, 'Returns new array (immutable)');
assertEqual(original1, [1, 2, 3], 'Original unchanged');

// =========================================================================
// updateById() Tests
// =========================================================================
console.log('\n📋 FUNCTION: updateById()');
console.log('-'.repeat(40));

assertType(updateById, 'function', 'updateById is a function');

assertEqual(
    updateById(
        [{ id: 1, name: 'A', age: 20 }, { id: 2, name: 'B' }],
        1,
        { name: 'Updated' }
    ),
    [{ id: 1, name: 'Updated', age: 20 }, { id: 2, name: 'B' }],
    'Updates object and preserves other properties'
);

assertEqual(
    updateById(
        [{ id: 1, count: 5 }],
        1,
        { count: 10, newProp: 'added' }
    ),
    [{ id: 1, count: 10, newProp: 'added' }],
    'Can add new properties'
);

assertEqual(
    updateById(
        [{ id: 1, name: 'A' }],
        999,
        { name: 'X' }
    ),
    [{ id: 1, name: 'A' }],
    'Non-existent id changes nothing'
);

const original2 = [{ id: 1, name: 'A' }];
const result2 = updateById(original2, 1, { name: 'B' });
assertNotSame(original2, result2, 'Returns new array (immutable)');
assertObjectNotSame(original2[0], result2[0], 'Updated object is new reference');

// =========================================================================
// toggleProperty() Tests
// =========================================================================
console.log('\n📋 FUNCTION: toggleProperty()');
console.log('-'.repeat(40));

assertType(toggleProperty, 'function', 'toggleProperty is a function');

assertEqual(
    toggleProperty(
        [{ id: 1, completed: false }, { id: 2, completed: true }],
        1,
        'completed'
    ),
    [{ id: 1, completed: true }, { id: 2, completed: true }],
    'Toggles false to true'
);

assertEqual(
    toggleProperty(
        [{ id: 1, active: true }],
        1,
        'active'
    ),
    [{ id: 1, active: false }],
    'Toggles true to false'
);

const original3 = [{ id: 1, done: false }];
const result3 = toggleProperty(original3, 1, 'done');
assertNotSame(original3, result3, 'Returns new array (immutable)');
assertEqual(original3[0].done, false, 'Original object unchanged');

// =========================================================================
// updateAllMatching() Tests
// =========================================================================
console.log('\n📋 FUNCTION: updateAllMatching()');
console.log('-'.repeat(40));

assertType(updateAllMatching, 'function', 'updateAllMatching is a function');

assertEqual(
    updateAllMatching(
        [
            { type: 'fruit', price: 5 },
            { type: 'veggie', price: 3 },
            { type: 'fruit', price: 8 }
        ],
        item => item.type === 'fruit',
        { onSale: true }
    ),
    [
        { type: 'fruit', price: 5, onSale: true },
        { type: 'veggie', price: 3 },
        { type: 'fruit', price: 8, onSale: true }
    ],
    'Updates all matching items'
);

assertEqual(
    updateAllMatching(
        [{ score: 10 }, { score: 20 }, { score: 15 }],
        item => item.score > 12,
        { passed: true }
    ),
    [{ score: 10 }, { score: 20, passed: true }, { score: 15, passed: true }],
    'Updates based on numeric condition'
);

const original4 = [{ a: 1 }, { a: 2 }];
const result4 = updateAllMatching(original4, i => i.a === 1, { b: 99 });
assertNotSame(original4, result4, 'Returns new array (immutable)');

// =========================================================================
// incrementProperty() Tests
// =========================================================================
console.log('\n📋 FUNCTION: incrementProperty()');
console.log('-'.repeat(40));

assertType(incrementProperty, 'function', 'incrementProperty is a function');

assertEqual(
    incrementProperty(
        [{ id: 1, quantity: 5 }, { id: 2, quantity: 3 }],
        1,
        'quantity',
        2
    ),
    [{ id: 1, quantity: 7 }, { id: 2, quantity: 3 }],
    'Increments property'
);

assertEqual(
    incrementProperty(
        [{ id: 1, count: 10 }],
        1,
        'count',
        -3
    ),
    [{ id: 1, count: 7 }],
    'Decrements with negative amount'
);

assertEqual(
    incrementProperty(
        [{ id: 1, score: 100 }],
        1,
        'score',
        0
    ),
    [{ id: 1, score: 100 }],
    'Zero increment changes nothing'
);

const original5 = [{ id: 1, qty: 5 }];
const result5 = incrementProperty(original5, 1, 'qty', 1);
assertNotSame(original5, result5, 'Returns new array (immutable)');
assertEqual(original5[0].qty, 5, 'Original object unchanged');

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
    console.log('💡 You understand immutable update operations!\n');
} else {
    console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
}

process.exit(testsFailed > 0 ? 1 : 0);
