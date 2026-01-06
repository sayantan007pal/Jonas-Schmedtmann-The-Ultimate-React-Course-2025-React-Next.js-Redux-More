/**
 * Test Suite for Challenge 2: Array.map() - Advanced Transformation
 * ===================================================================
 * 
 * Run this file with: node _2_test_example_map_advanced.js
 */

const {
    addRanking,
    calculateTotalPrice,
    extractBookInfo,
    applyDiscount
} = require('./_2_example_map_advanced.js');

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
        console.log(`   Arrays should be different references`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 2: Array.map() Advanced Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // addRanking() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: addRanking()');
    console.log('-'.repeat(40));

    assertType(addRanking, 'function', 'addRanking is a function');

    assertEqual(
        addRanking(['Alice', 'Bob', 'Charlie']),
        [{rank: 1, name: 'Alice'}, {rank: 2, name: 'Bob'}, {rank: 3, name: 'Charlie'}],
        'Adds 1-based ranking to player names'
    );

    assertEqual(
        addRanking([]),
        [],
        'Returns empty array for empty input'
    );

    assertEqual(
        addRanking(['Solo']),
        [{rank: 1, name: 'Solo'}],
        'Handles single player'
    );

    assertEqual(
        addRanking(['First', 'Second', 'Third', 'Fourth', 'Fifth']),
        [
            {rank: 1, name: 'First'},
            {rank: 2, name: 'Second'},
            {rank: 3, name: 'Third'},
            {rank: 4, name: 'Fourth'},
            {rank: 5, name: 'Fifth'}
        ],
        'Handles multiple players with correct ranking'
    );

    // Immutability test
    const originalPlayers = ['A', 'B'];
    const rankedResult = addRanking(originalPlayers);
    assertEqual(originalPlayers, ['A', 'B'], 'Original array not modified');
    assertNotSame(originalPlayers, rankedResult, 'Returns new array');

    // =========================================================================
    // calculateTotalPrice() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: calculateTotalPrice()');
    console.log('-'.repeat(40));

    assertType(calculateTotalPrice, 'function', 'calculateTotalPrice is a function');

    assertEqual(
        calculateTotalPrice([
            {name: 'Apple', price: 1.5, quantity: 3},
            {name: 'Banana', price: 0.5, quantity: 6}
        ]),
        [
            {name: 'Apple', price: 1.5, quantity: 3, total: 4.5},
            {name: 'Banana', price: 0.5, quantity: 6, total: 3}
        ],
        'Calculates total price correctly'
    );

    assertEqual(
        calculateTotalPrice([]),
        [],
        'Returns empty array for empty input'
    );

    assertEqual(
        calculateTotalPrice([{name: 'Item', price: 10, quantity: 0}]),
        [{name: 'Item', price: 10, quantity: 0, total: 0}],
        'Handles zero quantity'
    );

    assertEqual(
        calculateTotalPrice([{name: 'Expensive', price: 999.99, quantity: 1}]),
        [{name: 'Expensive', price: 999.99, quantity: 1, total: 999.99}],
        'Handles decimal prices'
    );

    // Immutability test
    const originalItems = [{name: 'Test', price: 5, quantity: 2}];
    const priceResult = calculateTotalPrice(originalItems);
    assertEqual(originalItems, [{name: 'Test', price: 5, quantity: 2}], 'Original array not modified');

    // =========================================================================
    // extractBookInfo() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: extractBookInfo()');
    console.log('-'.repeat(40));

    assertType(extractBookInfo, 'function', 'extractBookInfo is a function');

    const bookResult = extractBookInfo([{
        title: 'Dune',
        author: 'Frank Herbert',
        reviews: { goodreads: { rating: 4.5 }, amazon: { rating: 4.3 } }
    }]);
    assertEqual(bookResult[0].title, 'Dune', 'Extracts title correctly');
    assertEqual(bookResult[0].author, 'Frank Herbert', 'Extracts author correctly');
    assertClose(bookResult[0].avgRating, 4.4, 0.01, 'Calculates average rating correctly');

    assertEqual(
        extractBookInfo([]),
        [],
        'Returns empty array for empty input'
    );

    // Multiple books test
    const multipleBooks = extractBookInfo([
        {
            title: 'Book1',
            author: 'Author1',
            reviews: { goodreads: { rating: 4.0 }, amazon: { rating: 4.0 } }
        },
        {
            title: 'Book2',
            author: 'Author2',
            reviews: { goodreads: { rating: 5.0 }, amazon: { rating: 3.0 } }
        }
    ]);
    assertClose(multipleBooks[0].avgRating, 4.0, 0.01, 'First book average is 4.0');
    assertClose(multipleBooks[1].avgRating, 4.0, 0.01, 'Second book average is 4.0');

    // =========================================================================
    // applyDiscount() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: applyDiscount()');
    console.log('-'.repeat(40));

    assertType(applyDiscount, 'function', 'applyDiscount is a function');

    assertEqual(
        applyDiscount([
            {name: 'Shirt', price: 50, onSale: true},
            {name: 'Pants', price: 80, onSale: false}
        ]),
        [
            {name: 'Shirt', price: 40, onSale: true},
            {name: 'Pants', price: 80, onSale: false}
        ],
        'Applies 20% discount only to sale items'
    );

    assertEqual(
        applyDiscount([]),
        [],
        'Returns empty array for empty input'
    );

    assertEqual(
        applyDiscount([{name: 'NoSale', price: 100, onSale: false}]),
        [{name: 'NoSale', price: 100, onSale: false}],
        'Does not modify non-sale items'
    );

    assertEqual(
        applyDiscount([{name: 'AllSale', price: 100, onSale: true}]),
        [{name: 'AllSale', price: 80, onSale: true}],
        'Applies 20% discount (100 → 80)'
    );

    // Edge case: multiple discounted items
    assertEqual(
        applyDiscount([
            {name: 'A', price: 10, onSale: true},
            {name: 'B', price: 20, onSale: true},
            {name: 'C', price: 30, onSale: true}
        ]),
        [
            {name: 'A', price: 8, onSale: true},
            {name: 'B', price: 16, onSale: true},
            {name: 'C', price: 24, onSale: true}
        ],
        'Applies discount to all sale items'
    );

    // Immutability test
    const originalProducts = [{name: 'Test', price: 100, onSale: true}];
    const discountResult = applyDiscount(originalProducts);
    assertEqual(
        originalProducts,
        [{name: 'Test', price: 100, onSale: true}],
        'Original array not modified'
    );
    assertNotSame(originalProducts, discountResult, 'Returns new array');

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
        console.log('🚀 You\'ve mastered advanced map() transformations!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
