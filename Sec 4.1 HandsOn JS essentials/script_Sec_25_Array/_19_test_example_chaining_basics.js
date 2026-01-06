/**
 * Test Suite for Challenge 19: Method Chaining - Basics
 * ========================================================
 * 
 * Run this file with: node _19_test_example_chaining_basics.js
 */

const {
    filterThenMap,
    mapThenFilter,
    processProducts,
    calculateDiscountedTotal,
    getTopScorers
} = require('./_19_example_chaining_basics.js');

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

function assertClose(actual, expected, tolerance, testName) {
    totalTests++;
    if (Math.abs(actual - expected) <= tolerance) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ~${expected} (±${tolerance})`);
        console.log(`   Actual:   ${actual}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Challenge 19: Method Chaining Basics Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// filterThenMap() Tests
// =========================================================================
console.log('\n📋 FUNCTION: filterThenMap()');
console.log('-'.repeat(40));

assertType(filterThenMap, 'function', 'filterThenMap is a function');

assertEqual(
    filterThenMap([1, 5, 3, 8, 2], 3),
    [10, 16],
    'Filters > 3 then doubles'
);

assertEqual(
    filterThenMap([1, 2, 3], 10),
    [],
    'Nothing passes filter'
);

assertEqual(
    filterThenMap([10, 20, 30], 5),
    [20, 40, 60],
    'All pass filter'
);

assertEqual(
    filterThenMap([], 0),
    [],
    'Empty array'
);

// =========================================================================
// mapThenFilter() Tests
// =========================================================================
console.log('\n📋 FUNCTION: mapThenFilter()');
console.log('-'.repeat(40));

assertType(mapThenFilter, 'function', 'mapThenFilter is a function');

assertEqual(
    mapThenFilter([1, 2, 3, 4, 5, 6]),
    [4, 8, 12],
    'Doubles then filters divisible by 4'
);

assertEqual(
    mapThenFilter([1, 3, 5]),
    [],
    'No results after filter'
);

assertEqual(
    mapThenFilter([2, 4, 6, 8]),
    [4, 8, 12, 16],
    'All even numbers pass'
);

assertEqual(
    mapThenFilter([]),
    [],
    'Empty array'
);

// =========================================================================
// processProducts() Tests
// =========================================================================
console.log('\n📋 FUNCTION: processProducts()');
console.log('-'.repeat(40));

assertType(processProducts, 'function', 'processProducts is a function');

assertEqual(
    processProducts([
        { name: 'Banana', inStock: true },
        { name: 'Apple', inStock: true },
        { name: 'Cherry', inStock: false }
    ]),
    ['Apple', 'Banana'],
    'Filters in-stock, maps names, sorts'
);

assertEqual(
    processProducts([
        { name: 'Zebra', inStock: true },
        { name: 'Apple', inStock: false },
        { name: 'Mango', inStock: true }
    ]),
    ['Mango', 'Zebra'],
    'Different products'
);

assertEqual(
    processProducts([
        { name: 'A', inStock: false },
        { name: 'B', inStock: false }
    ]),
    [],
    'Nothing in stock'
);

assertEqual(
    processProducts([]),
    [],
    'Empty array'
);

// =========================================================================
// calculateDiscountedTotal() Tests
// =========================================================================
console.log('\n📋 FUNCTION: calculateDiscountedTotal()');
console.log('-'.repeat(40));

assertType(calculateDiscountedTotal, 'function', 'calculateDiscountedTotal is a function');

assertClose(
    calculateDiscountedTotal([
        { name: 'A', price: 100, discount: 0.1 },
        { name: 'B', price: 50, discount: 0 },
        { name: 'C', price: 200, discount: 0.2 }
    ]),
    250,
    0.01,
    'Calculates discounted total (90 + 160)'
);

assertClose(
    calculateDiscountedTotal([
        { name: 'X', price: 100, discount: 0 },
        { name: 'Y', price: 200, discount: 0 }
    ]),
    0,
    0.01,
    'No discounts means 0 total'
);

assertClose(
    calculateDiscountedTotal([
        { name: 'Z', price: 100, discount: 0.5 }
    ]),
    50,
    0.01,
    'Single item with 50% discount'
);

assertEqual(
    calculateDiscountedTotal([]),
    0,
    'Empty array returns 0'
);

// =========================================================================
// getTopScorers() Tests
// =========================================================================
console.log('\n📋 FUNCTION: getTopScorers()');
console.log('-'.repeat(40));

assertType(getTopScorers, 'function', 'getTopScorers is a function');

assertEqual(
    getTopScorers([
        { name: 'Alice', score: 95 },
        { name: 'Bob', score: 60 },
        { name: 'Charlie', score: 85 },
        { name: 'Dave', score: 45 }
    ], 50, 2),
    ['Alice', 'Charlie'],
    'Gets top 2 passing students'
);

assertEqual(
    getTopScorers([
        { name: 'A', score: 100 },
        { name: 'B', score: 90 },
        { name: 'C', score: 80 }
    ], 70, 5),
    ['A', 'B', 'C'],
    'Returns all if topN > count'
);

assertEqual(
    getTopScorers([
        { name: 'X', score: 40 },
        { name: 'Y', score: 30 }
    ], 50, 2),
    [],
    'No one passes'
);

assertEqual(
    getTopScorers([], 50, 3),
    [],
    'Empty array'
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
    console.log('💡 You understand method chaining basics!\n');
} else {
    console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
}

process.exit(testsFailed > 0 ? 1 : 0);
