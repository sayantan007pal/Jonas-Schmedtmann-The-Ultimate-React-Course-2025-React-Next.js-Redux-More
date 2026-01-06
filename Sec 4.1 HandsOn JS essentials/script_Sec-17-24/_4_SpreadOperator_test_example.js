/**
 * Test Suite for Challenge 4: Spread Operator
 * =============================================
 * 
 * Run this file with: node _4_SpreadOperator_test_example.js
 */

const {
    mergeArrays,
    addToArrayImmutably,
    updateObject,
    updateNestedProperty,
    removeProperty,
    updateItemInArray
} = require('./_4_SpreadOperator_example.js');

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

function assertTrue(condition, testName) {
    if (condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Spread Operator Challenge Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: mergeArrays()
// =========================================================================
console.log('\n📋 TASK 1: mergeArrays()');
console.log('-'.repeat(40));

assertEqual(
    mergeArrays([1, 2], [3, 4]),
    [1, 2, 3, 4],
    'Merges two number arrays'
);

assertEqual(
    mergeArrays([], [1, 2, 3]),
    [1, 2, 3],
    'Merges empty array with filled array'
);

// Test immutability
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = mergeArrays(arr1, arr2);
assertTrue(merged !== arr1 && merged !== arr2, 'Returns new array (immutable)');
assertEqual(arr1, [1, 2], 'Original arr1 unchanged');
assertEqual(arr2, [3, 4], 'Original arr2 unchanged');

// =========================================================================
// Task 2 Tests: addToArrayImmutably()
// =========================================================================
console.log('\n📋 TASK 2: addToArrayImmutably()');
console.log('-'.repeat(40));

assertEqual(
    addToArrayImmutably([2, 3, 4], 1, "start"),
    [1, 2, 3, 4],
    'Adds element at start'
);

assertEqual(
    addToArrayImmutably([1, 2, 3], 4, "end"),
    [1, 2, 3, 4],
    'Adds element at end'
);

assertEqual(
    addToArrayImmutably([1, 2, 4], 3, 2),
    [1, 2, 3, 4],
    'Adds element at specific index'
);

assertEqual(
    addToArrayImmutably([1, 4], 2, 1),
    [1, 2, 4],
    'Adds element at index 1'
);

// Test immutability
const original = [1, 2, 3];
const added = addToArrayImmutably(original, 4, "end");
assertTrue(added !== original, 'Returns new array (immutable)');
assertEqual(original, [1, 2, 3], 'Original array unchanged');

// =========================================================================
// Task 3 Tests: updateObject()
// =========================================================================
console.log('\n📋 TASK 3: updateObject()');
console.log('-'.repeat(40));

assertEqual(
    updateObject({ name: "John", age: 25 }, { age: 26, city: "NYC" }),
    { name: "John", age: 26, city: "NYC" },
    'Updates existing property and adds new'
);

assertEqual(
    updateObject({}, { a: 1, b: 2 }),
    { a: 1, b: 2 },
    'Adds properties to empty object'
);

// Test immutability
const originalObj = { a: 1, b: 2 };
const updatedObj = updateObject(originalObj, { b: 3 });
assertTrue(updatedObj !== originalObj, 'Returns new object (immutable)');
assertEqual(originalObj, { a: 1, b: 2 }, 'Original object unchanged');

// =========================================================================
// Task 4 Tests: updateNestedProperty()
// =========================================================================
console.log('\n📋 TASK 4: updateNestedProperty()');
console.log('-'.repeat(40));

assertEqual(
    updateNestedProperty(
        { user: { name: "John", age: 25 }, settings: { theme: "dark" } },
        ["user", "age"],
        26
    ),
    { user: { name: "John", age: 26 }, settings: { theme: "dark" } },
    'Updates nested property immutably'
);

assertEqual(
    updateNestedProperty(
        { profile: { bio: "Hello" } },
        ["profile", "bio"],
        "Updated bio"
    ),
    { profile: { bio: "Updated bio" } },
    'Updates string nested property'
);

// Test immutability of nested objects
const nestedOriginal = { level1: { prop: "old" } };
const nestedUpdated = updateNestedProperty(nestedOriginal, ["level1", "prop"], "new");
assertTrue(nestedUpdated !== nestedOriginal, 'Returns new outer object');
assertTrue(nestedUpdated.level1 !== nestedOriginal.level1, 'Creates new nested object too');
assertEqual(nestedOriginal.level1.prop, "old", 'Original nested property unchanged');

// =========================================================================
// Task 5 Tests: removeProperty()
// =========================================================================
console.log('\n📋 TASK 5: removeProperty()');
console.log('-'.repeat(40));

assertEqual(
    removeProperty({ a: 1, b: 2, c: 3 }, "b"),
    { a: 1, c: 3 },
    'Removes specified property'
);

assertEqual(
    removeProperty({ id: 1, name: "John", age: 25 }, "age"),
    { id: 1, name: "John" },
    'Removes age property'
);

assertEqual(
    removeProperty({ single: "value" }, "single"),
    {},
    'Removes only property, returns empty object'
);

// Test immutability
const objWithProp = { a: 1, b: 2 };
const objWithoutProp = removeProperty(objWithProp, "a");
assertTrue(objWithoutProp !== objWithProp, 'Returns new object (immutable)');
assertEqual(objWithProp, { a: 1, b: 2 }, 'Original object unchanged');

// =========================================================================
// Task 6 Tests: updateItemInArray()
// =========================================================================
console.log('\n📋 TASK 6: updateItemInArray()');
console.log('-'.repeat(40));

assertEqual(
    updateItemInArray(
        [{ id: 1, name: "John" }, { id: 2, name: "Jane" }],
        2,
        { name: "Janet" }
    ),
    [{ id: 1, name: "John" }, { id: 2, name: "Janet" }],
    'Updates item by id'
);

assertEqual(
    updateItemInArray(
        [{ id: 1, completed: false }, { id: 2, completed: false }],
        1,
        { completed: true }
    ),
    [{ id: 1, completed: true }, { id: 2, completed: false }],
    'Toggles completed status'
);

assertEqual(
    updateItemInArray(
        [{ id: 1, name: "John" }],
        999,
        { name: "New" }
    ),
    [{ id: 1, name: "John" }],
    'Returns copy of array if id not found'
);

// Test immutability
const arrWithObjs = [{ id: 1, val: "old" }];
const updatedArr = updateItemInArray(arrWithObjs, 1, { val: "new" });
assertTrue(updatedArr !== arrWithObjs, 'Returns new array (immutable)');
assertTrue(updatedArr[0] !== arrWithObjs[0], 'Updated item is new object');
assertEqual(arrWithObjs[0].val, "old", 'Original item unchanged');

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You mastered Spread Operator for React!\n');
} else {
    console.log('💪 Keep working on it! These patterns are CRITICAL for React.\n');
}
