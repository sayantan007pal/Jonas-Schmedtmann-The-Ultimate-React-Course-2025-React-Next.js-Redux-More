/**
 * Test Suite for Challenge 6: Array.filter() - Advanced Conditions
 * ==================================================================
 * 
 * Run this file with: node _6_test_example_filter_advanced.js
 */

const {
    filterEligibleEmployees,
    filterUrgentTasks,
    filterByGenres,
    filterByPriceRange
} = require('./_6_example_filter_advanced.js');

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

function assertLength(arr, expectedLength, testName) {
    totalTests++;
    if (arr.length === expectedLength) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected length: ${expectedLength}`);
        console.log(`   Actual length:   ${arr.length}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 6: Array.filter() Advanced Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // filterEligibleEmployees() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterEligibleEmployees()');
    console.log('-'.repeat(40));

    assertType(filterEligibleEmployees, 'function', 'filterEligibleEmployees is a function');

    const employees = [
        {name: 'Alice', age: 30, yearsOfExperience: 5, department: 'Engineering'},
        {name: 'Bob', age: 24, yearsOfExperience: 4, department: 'Engineering'},
        {name: 'Charlie', age: 28, yearsOfExperience: 2, department: 'Product'},
        {name: 'Diana', age: 35, yearsOfExperience: 10, department: 'Sales'},
        {name: 'Eve', age: 26, yearsOfExperience: 3, department: 'Product'}
    ];

    assertEqual(
        filterEligibleEmployees(employees),
        [
            {name: 'Alice', age: 30, yearsOfExperience: 5, department: 'Engineering'},
            {name: 'Eve', age: 26, yearsOfExperience: 3, department: 'Product'}
        ],
        'Filters employees meeting all criteria'
    );

    assertEqual(
        filterEligibleEmployees([]),
        [],
        'Returns empty for empty input'
    );

    // Edge case: exactly at thresholds
    assertEqual(
        filterEligibleEmployees([
            {name: 'Edge', age: 25, yearsOfExperience: 3, department: 'Engineering'}
        ]),
        [{name: 'Edge', age: 25, yearsOfExperience: 3, department: 'Engineering'}],
        'Includes at exact thresholds (age=25, exp=3)'
    );

    // No one eligible
    assertEqual(
        filterEligibleEmployees([
            {name: 'Young', age: 22, yearsOfExperience: 5, department: 'Engineering'},
            {name: 'Inexperienced', age: 30, yearsOfExperience: 1, department: 'Product'},
            {name: 'WrongDept', age: 30, yearsOfExperience: 5, department: 'Marketing'}
        ]),
        [],
        'Returns empty when no one meets all criteria'
    );

    // =========================================================================
    // filterUrgentTasks() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterUrgentTasks()');
    console.log('-'.repeat(40));

    assertType(filterUrgentTasks, 'function', 'filterUrgentTasks is a function');

    const tasks = [
        {title: 'Review PR', priority: 'high', dueDate: '2025-01-10', isOverdue: false},
        {title: 'Update docs', priority: 'low', dueDate: '2025-01-05', isOverdue: false},
        {title: 'Fix bug', priority: 'medium', dueDate: '2025-01-15', isOverdue: true},
        {title: 'Future task', priority: 'low', dueDate: '2025-12-31', isOverdue: false}
    ];

    assertLength(
        filterUrgentTasks(tasks, '2025-01-06'),
        3,
        'Returns 3 urgent tasks'
    );

    // High priority should always be urgent
    assertEqual(
        filterUrgentTasks([
            {title: 'HighPri', priority: 'high', dueDate: '2099-12-31', isOverdue: false}
        ], '2025-01-01'),
        [{title: 'HighPri', priority: 'high', dueDate: '2099-12-31', isOverdue: false}],
        'High priority tasks are always urgent'
    );

    // Overdue should always be urgent
    assertEqual(
        filterUrgentTasks([
            {title: 'Overdue', priority: 'low', dueDate: '2025-12-31', isOverdue: true}
        ], '2025-01-01'),
        [{title: 'Overdue', priority: 'low', dueDate: '2025-12-31', isOverdue: true}],
        'Overdue tasks are always urgent'
    );

    // Due today should be urgent
    assertEqual(
        filterUrgentTasks([
            {title: 'Today', priority: 'low', dueDate: '2025-01-06', isOverdue: false}
        ], '2025-01-06'),
        [{title: 'Today', priority: 'low', dueDate: '2025-01-06', isOverdue: false}],
        'Tasks due today are urgent'
    );

    // No urgent tasks
    assertEqual(
        filterUrgentTasks([
            {title: 'Chill', priority: 'low', dueDate: '2025-12-31', isOverdue: false}
        ], '2025-01-01'),
        [],
        'Returns empty when no urgent tasks'
    );

    assertEqual(
        filterUrgentTasks([], '2025-01-01'),
        [],
        'Returns empty for empty input'
    );

    // =========================================================================
    // filterByGenres() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterByGenres()');
    console.log('-'.repeat(40));

    assertType(filterByGenres, 'function', 'filterByGenres is a function');

    const books = [
        {title: 'Dune', genres: ['sci-fi', 'adventure']},
        {title: 'LOTR', genres: ['fantasy', 'adventure']},
        {title: '1984', genres: ['dystopian', 'sci-fi']}
    ];

    assertEqual(
        filterByGenres(books, ['fantasy', 'dystopian']),
        [
            {title: 'LOTR', genres: ['fantasy', 'adventure']},
            {title: '1984', genres: ['dystopian', 'sci-fi']}
        ],
        'Filters books with fantasy OR dystopian'
    );

    assertEqual(
        filterByGenres(books, ['adventure']),
        [
            {title: 'Dune', genres: ['sci-fi', 'adventure']},
            {title: 'LOTR', genres: ['fantasy', 'adventure']}
        ],
        'Filters books with adventure genre'
    );

    assertEqual(
        filterByGenres(books, ['romance']),
        [],
        'Returns empty when no books match genre'
    );

    assertEqual(
        filterByGenres([], ['sci-fi']),
        [],
        'Returns empty for empty books array'
    );

    assertEqual(
        filterByGenres(books, []),
        [],
        'Returns empty for empty target genres'
    );

    // All books match
    assertEqual(
        filterByGenres(books, ['sci-fi', 'fantasy', 'dystopian', 'adventure']),
        books,
        'Returns all when all match at least one genre'
    );

    // =========================================================================
    // filterByPriceRange() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: filterByPriceRange()');
    console.log('-'.repeat(40));

    assertType(filterByPriceRange, 'function', 'filterByPriceRange is a function');

    const products = [
        {name: 'Cheap', price: 10, category: 'A'},
        {name: 'Medium', price: 50, category: 'B'},
        {name: 'Expensive', price: 100, category: 'C'},
        {name: 'VeryExpensive', price: 500, category: 'D'}
    ];

    assertEqual(
        filterByPriceRange(products, 25, 75),
        [{name: 'Medium', price: 50, category: 'B'}],
        'Filters products in 25-75 range'
    );

    assertEqual(
        filterByPriceRange(products, 10, 100),
        [
            {name: 'Cheap', price: 10, category: 'A'},
            {name: 'Medium', price: 50, category: 'B'},
            {name: 'Expensive', price: 100, category: 'C'}
        ],
        'Includes products at exact min and max (inclusive)'
    );

    assertEqual(
        filterByPriceRange(products, 50, 50),
        [{name: 'Medium', price: 50, category: 'B'}],
        'Handles single value range (min = max)'
    );

    assertEqual(
        filterByPriceRange(products, 200, 300),
        [],
        'Returns empty when no products in range'
    );

    assertEqual(
        filterByPriceRange([], 0, 1000),
        [],
        'Returns empty for empty input'
    );

    assertEqual(
        filterByPriceRange(products, 0, 1000),
        products,
        'Returns all when all in range'
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
        console.log('🚀 You\'ve mastered advanced filter() conditions!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
