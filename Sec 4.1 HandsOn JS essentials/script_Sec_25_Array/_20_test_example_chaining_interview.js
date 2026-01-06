/**
 * Test Suite for Challenge 20: Method Chaining - Interview-Level
 * ================================================================
 * 
 * Run this file with: node _20_test_example_chaining_interview.js
 */

const {
    getUserAnalytics,
    getAveragesByCategory,
    extractAllTags,
    processOrders,
    getTopWords
} = require('./_20_example_chaining_interview.js');

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

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Challenge 20: Method Chaining Interview Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// getUserAnalytics() Tests
// =========================================================================
console.log('\n📋 FUNCTION: getUserAnalytics()');
console.log('-'.repeat(40));

assertType(getUserAnalytics, 'function', 'getUserAnalytics is a function');

assertEqual(
    getUserAnalytics([
        { name: 'Alice', active: true, purchases: [100, 50, 30] },
        { name: 'Bob', active: false, purchases: [200, 100] },
        { name: 'Charlie', active: true, purchases: [25] },
        { name: 'Dave', active: true, purchases: [80, 90, 70] }
    ], 2, 2),
    [
        { name: 'Dave', totalSpent: 240 },
        { name: 'Alice', totalSpent: 180 }
    ],
    'Returns top 2 active users with 2+ purchases'
);

assertEqual(
    getUserAnalytics([
        { name: 'A', active: true, purchases: [100, 200, 300] },
        { name: 'B', active: true, purchases: [50, 50] }
    ], 1, 1),
    [{ name: 'A', totalSpent: 600 }],
    'Returns top 1 user'
);

assertEqual(
    getUserAnalytics([
        { name: 'A', active: false, purchases: [100] },
        { name: 'B', active: true, purchases: [50] }
    ], 2, 5),
    [],
    'No one meets criteria'
);

assertEqual(
    getUserAnalytics([], 1, 10),
    [],
    'Empty array'
);

// =========================================================================
// getAveragesByCategory() Tests
// =========================================================================
console.log('\n📋 FUNCTION: getAveragesByCategory()');
console.log('-'.repeat(40));

assertType(getAveragesByCategory, 'function', 'getAveragesByCategory is a function');

assertEqual(
    getAveragesByCategory([
        { name: 'A', category: 'fruit', price: 10 },
        { name: 'B', category: 'veggie', price: 5 },
        { name: 'C', category: 'fruit', price: 20 },
        { name: 'D', category: 'veggie', price: 15 }
    ]),
    [
        { category: 'veggie', averagePrice: 10 },
        { category: 'fruit', averagePrice: 15 }
    ],
    'Calculates averages and sorts by price'
);

assertEqual(
    getAveragesByCategory([
        { name: 'X', category: 'electronics', price: 500 }
    ]),
    [{ category: 'electronics', averagePrice: 500 }],
    'Single item category'
);

assertEqual(
    getAveragesByCategory([]),
    [],
    'Empty array'
);

// =========================================================================
// extractAllTags() Tests
// =========================================================================
console.log('\n📋 FUNCTION: extractAllTags()');
console.log('-'.repeat(40));

assertType(extractAllTags, 'function', 'extractAllTags is a function');

assertEqual(
    extractAllTags([
        { name: 'A', tags: ['react', 'javascript'] },
        { name: 'B', tags: ['node', 'javascript'] },
        { name: 'C' },
        { name: 'D', tags: ['react', 'typescript'] }
    ]),
    ['javascript', 'node', 'react', 'typescript'],
    'Extracts, dedupes, and sorts tags'
);

assertEqual(
    extractAllTags([
        { name: 'A', tags: ['z', 'a', 'm'] }
    ]),
    ['a', 'm', 'z'],
    'Single item with tags'
);

assertEqual(
    extractAllTags([
        { name: 'A' },
        { name: 'B' }
    ]),
    [],
    'No items have tags'
);

assertEqual(
    extractAllTags([]),
    [],
    'Empty array'
);

// =========================================================================
// processOrders() Tests
// =========================================================================
console.log('\n📋 FUNCTION: processOrders()');
console.log('-'.repeat(40));

assertType(processOrders, 'function', 'processOrders is a function');

assertEqual(
    processOrders([
        { customer: 'Alice', value: 100, status: 'completed', date: '2024-01-15' },
        { customer: 'Bob', value: 200, status: 'completed', date: '2024-03-20' },
        { customer: 'Alice', value: 150, status: 'completed', date: '2024-06-10' },
        { customer: 'Alice', value: 50, status: 'pending', date: '2024-07-01' },
        { customer: 'Bob', value: 100, status: 'completed', date: '2023-12-01' }
    ], 2024),
    [
        { customer: 'Alice', orderCount: 2, totalValue: 250, averageValue: 125 },
        { customer: 'Bob', orderCount: 1, totalValue: 200, averageValue: 200 }
    ],
    'Processes 2024 completed orders'
);

assertEqual(
    processOrders([
        { customer: 'X', value: 100, status: 'completed', date: '2023-01-01' }
    ], 2024),
    [],
    'No orders in specified year'
);

assertEqual(
    processOrders([], 2024),
    [],
    'Empty array'
);

// =========================================================================
// getTopWords() Tests
// =========================================================================
console.log('\n📋 FUNCTION: getTopWords()');
console.log('-'.repeat(40));

assertType(getTopWords, 'function', 'getTopWords is a function');

assertEqual(
    getTopWords([
        'The quick brown fox',
        'The lazy dog and the quick cat'
    ], 3, 3),
    [
        { word: 'the', count: 3 },
        { word: 'quick', count: 2 },
        { word: 'and', count: 1 }
    ],
    'Gets top 3 words with 3+ chars'
);

assertEqual(
    getTopWords(['hello world hello'], 4, 2),
    [
        { word: 'hello', count: 2 },
        { word: 'world', count: 1 }
    ],
    'Simple word count'
);

assertEqual(
    getTopWords(['a b c d'], 2, 10),
    [],
    'All words too short'
);

assertEqual(
    getTopWords([], 1, 5),
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
    console.log('🚀 You\'ve mastered advanced method chaining!');
    console.log('🎊 You are now INTERVIEW READY on Array methods! 🎊\n');
} else {
    console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
}

process.exit(testsFailed > 0 ? 1 : 0);
