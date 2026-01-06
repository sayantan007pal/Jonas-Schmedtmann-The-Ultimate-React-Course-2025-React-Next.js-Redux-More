/**
 * Test Suite for Challenge 1: Array.map() - Basic Transformation
 * ================================================================
 * 
 * Run this file with: node _1_test_example_map_basics.js
 */

const {
    doubleNumbers,
    extractNames,
    formatUsers
} = require('./_1_example_map_basics.js');

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
        console.log(`   Arrays should be different references (immutability check)`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 1: Array.map() Basic Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // doubleNumbers() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: doubleNumbers()');
    console.log('-'.repeat(40));

    // Test: Function exists
    assertType(doubleNumbers, 'function', 'doubleNumbers is a function');

    // Test: Basic doubling
    assertEqual(
        doubleNumbers([1, 2, 3, 4, 5]),
        [2, 4, 6, 8, 10],
        'Doubles [1, 2, 3, 4, 5] to [2, 4, 6, 8, 10]'
    );

    // Test: Empty array
    assertEqual(
        doubleNumbers([]),
        [],
        'Returns empty array for empty input'
    );

    // Test: Single element
    assertEqual(
        doubleNumbers([7]),
        [14],
        'Handles single element array'
    );

    // Test: Negative numbers
    assertEqual(
        doubleNumbers([-1, -2, -3]),
        [-2, -4, -6],
        'Handles negative numbers correctly'
    );

    // Test: Zero included
    assertEqual(
        doubleNumbers([0, 5, -5]),
        [0, 10, -10],
        'Handles zero correctly'
    );

    // Test: Immutability
    const original = [1, 2, 3];
    const result = doubleNumbers(original);
    assertEqual(original, [1, 2, 3], 'Original array is not modified');
    assertNotSame(original, result, 'Returns a new array (immutability)');

    // Test: Large numbers
    assertEqual(
        doubleNumbers([1000000, 999999]),
        [2000000, 1999998],
        'Handles large numbers correctly'
    );

    // Test: Decimal numbers
    assertEqual(
        doubleNumbers([1.5, 2.5, 3.5]),
        [3, 5, 7],
        'Handles decimal numbers correctly'
    );

    // =========================================================================
    // extractNames() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: extractNames()');
    console.log('-'.repeat(40));

    // Test: Function exists
    assertType(extractNames, 'function', 'extractNames is a function');

    // Test: Basic extraction
    assertEqual(
        extractNames([{name: 'Alice', age: 25}, {name: 'Bob', age: 30}]),
        ['Alice', 'Bob'],
        'Extracts names from objects'
    );

    // Test: Empty array
    assertEqual(
        extractNames([]),
        [],
        'Returns empty array for empty input'
    );

    // Test: Single person
    assertEqual(
        extractNames([{name: 'Charlie', age: 20}]),
        ['Charlie'],
        'Handles single person'
    );

    // Test: Names with spaces
    assertEqual(
        extractNames([{name: 'Mary Jane', age: 25}]),
        ['Mary Jane'],
        'Handles names with spaces'
    );

    // Test: Immutability
    const originalPeople = [{name: 'Test', age: 99}];
    const nameResult = extractNames(originalPeople);
    assertEqual(originalPeople, [{name: 'Test', age: 99}], 'Original array is not modified');
    assertNotSame(originalPeople, nameResult, 'Returns a new array');

    // =========================================================================
    // formatUsers() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: formatUsers()');
    console.log('-'.repeat(40));

    // Test: Function exists
    assertType(formatUsers, 'function', 'formatUsers is a function');

    // Test: Basic formatting
    assertEqual(
        formatUsers([{firstName: 'John', lastName: 'Doe'}]),
        [{fullName: 'John Doe'}],
        'Formats single user correctly'
    );

    // Test: Multiple users
    assertEqual(
        formatUsers([
            {firstName: 'Jane', lastName: 'Smith'},
            {firstName: 'Bob', lastName: 'Jones'}
        ]),
        [{fullName: 'Jane Smith'}, {fullName: 'Bob Jones'}],
        'Formats multiple users correctly'
    );

    // Test: Empty array
    assertEqual(
        formatUsers([]),
        [],
        'Returns empty array for empty input'
    );

    // Test: Names with special characters
    assertEqual(
        formatUsers([{firstName: "O'Brien", lastName: 'Jr.'}]),
        [{fullName: "O'Brien Jr."}],
        'Handles special characters in names'
    );

    // Test: Immutability
    const originalUsers = [{firstName: 'Test', lastName: 'User'}];
    const formattedResult = formatUsers(originalUsers);
    assertEqual(
        originalUsers,
        [{firstName: 'Test', lastName: 'User'}],
        'Original array is not modified'
    );
    assertNotSame(originalUsers, formattedResult, 'Returns a new array');

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
        console.log('🚀 You\'ve mastered basic map() transformations!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
