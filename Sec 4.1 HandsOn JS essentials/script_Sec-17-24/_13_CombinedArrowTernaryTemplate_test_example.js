/**
 * Test Suite for Challenge 13: Arrow + Ternary + Template Literals
 * ==================================================================
 * 
 * Run this file with: node _13_CombinedArrowTernaryTemplate_test_example.js
 */

const {
    getOrderStatus,
    doubleOdds,
    formatNames,
    summarizeScores,
    getButtonClasses,
    withPrefix,
    pluralize,
    formatCurrency,
    processProducts,
    transformBook
} = require('./_13_CombinedArrowTernaryTemplate_example.js');

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

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Arrow + Ternary + Template Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: getOrderStatus()
// =========================================================================
console.log('\n📋 TASK 1: getOrderStatus()');
console.log('-'.repeat(40));

assertEqual(
    getOrderStatus({ status: "pending", customerName: "John" }),
    "John, your order is being processed",
    'Pending status'
);
assertEqual(
    getOrderStatus({ status: "shipped", customerName: "Jane" }),
    "Jane, your order is on the way!",
    'Shipped status'
);
assertEqual(
    getOrderStatus({ status: "delivered", customerName: "Bob" }),
    "Bob, your order has arrived!",
    'Delivered status'
);
assertEqual(
    getOrderStatus({ status: "cancelled", customerName: "Alice" }),
    "Alice, unknown status: cancelled",
    'Unknown status'
);

// =========================================================================
// Task 2 Tests: Array Transformers
// =========================================================================
console.log('\n📋 TASK 2: Array Transformers');
console.log('-'.repeat(40));

assertEqual(doubleOdds([1, 2, 3, 4, 5]), [2, 2, 6, 4, 10], 'doubleOdds works');
assertEqual(doubleOdds([2, 4, 6]), [2, 4, 6], 'doubleOdds with all evens');

assertEqual(formatNames(["john", "jane"]), ["JOHN", "JANE"], 'formatNames uppercases');
assertEqual(formatNames([]), [], 'formatNames with empty array');

assertEqual(
    summarizeScores([{ name: "John", score: 75 }, { name: "Jane", score: 55 }]),
    ["John: PASS", "Jane: FAIL"],
    'summarizeScores creates summaries'
);

// =========================================================================
// Task 3 Tests: getButtonClasses()
// =========================================================================
console.log('\n📋 TASK 3: getButtonClasses()');
console.log('-'.repeat(40));

assertEqual(
    getButtonClasses({ variant: "primary", isDisabled: true }),
    "btn btn-primary btn-disabled",
    'Combines variant and disabled'
);
assertEqual(
    getButtonClasses({ size: "lg", isLoading: true }),
    "btn btn-lg btn-loading",
    'Combines size and loading'
);
assertEqual(
    getButtonClasses({}),
    "btn",
    'Base class only for empty'
);
assertEqual(
    getButtonClasses({ variant: "danger", size: "sm", isDisabled: true, isLoading: true }),
    "btn btn-danger btn-sm btn-disabled btn-loading",
    'All options combined'
);

// =========================================================================
// Task 4 Tests: Curried Functions
// =========================================================================
console.log('\n📋 TASK 4: Curried Functions');
console.log('-'.repeat(40));

const infoLog = withPrefix("INFO");
assertEqual(infoLog("Server started"), "[INFO] Server started", 'withPrefix works');
assertEqual(withPrefix("ERROR")("Failed!"), "[ERROR] Failed!", 'withPrefix inline');

const itemPlural = pluralize("item", "items");
assertEqual(itemPlural(1), "1 item", 'Singular form');
assertEqual(itemPlural(5), "5 items", 'Plural form');
assertEqual(itemPlural(0), "0 items", 'Zero uses plural');

const usd = formatCurrency("$");
assertEqual(usd(99.5), "$99.50", 'Formats with 2 decimals');
assertEqual(formatCurrency("€")(10), "€10.00", 'Euro format');

// =========================================================================
// Task 5 Tests: processProducts()
// =========================================================================
console.log('\n📋 TASK 5: processProducts()');
console.log('-'.repeat(40));

const products = [
    { name: "Laptop", price: 999, inStock: true },
    { name: "Mouse", price: 29, inStock: false },
    { name: "Keyboard", price: 79, inStock: true }
];

assertEqual(
    processProducts(products),
    "Laptop - $999\nKeyboard - $79",
    'Filters, formats, and joins products'
);
assertEqual(processProducts([]), "", 'Empty array returns empty string');

// =========================================================================
// Task 6 Tests: transformBook()
// =========================================================================
console.log('\n📋 TASK 6: transformBook()');
console.log('-'.repeat(40));

assertEqual(
    transformBook({ 
        title: "Dune", 
        author: "Frank Herbert", 
        year: 1965, 
        genres: ["sci-fi", "adventure"],
        rating: 4.5 
    }),
    { 
        display: "DUNE by Frank Herbert",
        era: "Classic",
        genreList: "sci-fi, adventure",
        recommendation: "Highly Recommended"
    },
    'Transforms classic book'
);

assertEqual(
    transformBook({ 
        title: "Harry Potter", 
        author: "J.K. Rowling", 
        year: 1997, 
        genres: ["fantasy"],
        rating: 4.2 
    }),
    { 
        display: "HARRY POTTER by J.K. Rowling",
        era: "Modern",
        genreList: "fantasy",
        recommendation: "Recommended"
    },
    'Transforms modern book'
);

assertEqual(
    transformBook({ 
        title: "The Martian", 
        author: "Andy Weir", 
        year: 2011, 
        genres: ["sci-fi", "thriller"],
        rating: 3.8 
    }),
    { 
        display: "THE MARTIAN by Andy Weir",
        era: "Contemporary",
        genreList: "sci-fi, thriller",
        recommendation: "Worth Reading"
    },
    'Transforms contemporary book'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You mastered combined patterns!\n');
} else {
    console.log('💪 Keep working! These functional patterns are powerful!\n');
}
