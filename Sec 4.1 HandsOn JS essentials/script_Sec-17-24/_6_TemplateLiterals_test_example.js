/**
 * Test Suite for Challenge 6: Template Literals
 * ===============================================
 * 
 * Run this file with: node _6_TemplateLiterals_test_example.js
 */

const {
    greet,
    formatPrice,
    formatUserStatus,
    generateHTML,
    formatBookInfo,
    getClassName
} = require('./_6_TemplateLiterals_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: "${expected}"`);
        console.log(`   Actual:   "${actual}"`);
        testsFailed++;
    }
}

function assertIncludes(actual, substring, testName) {
    if (actual.includes(substring)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to include: "${substring}"`);
        console.log(`   Actual: "${actual}"`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Template Literals Challenge Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: greet()
// =========================================================================
console.log('\n📋 TASK 1: greet()');
console.log('-'.repeat(40));

assertEqual(
    greet("John", "morning"),
    "Good morning, John! Welcome back.",
    'Greets John in the morning'
);

assertEqual(
    greet("Jane", "evening"),
    "Good evening, Jane! Welcome back.",
    'Greets Jane in the evening'
);

assertEqual(
    greet("", "afternoon"),
    "Good afternoon, ! Welcome back.",
    'Handles empty name'
);

// =========================================================================
// Task 2 Tests: formatPrice()
// =========================================================================
console.log('\n📋 TASK 2: formatPrice()');
console.log('-'.repeat(40));

assertEqual(
    formatPrice(10, 3, 0.1),
    "Subtotal: $30.00, Tax: $3.00, Total: $33.00",
    'Calculates price with 10% tax'
);

assertEqual(
    formatPrice(25.50, 2, 0.08),
    "Subtotal: $51.00, Tax: $4.08, Total: $55.08",
    'Handles decimal prices'
);

assertEqual(
    formatPrice(100, 1, 0),
    "Subtotal: $100.00, Tax: $0.00, Total: $100.00",
    'Handles zero tax'
);

// =========================================================================
// Task 3 Tests: formatUserStatus()
// =========================================================================
console.log('\n📋 TASK 3: formatUserStatus()');
console.log('-'.repeat(40));

assertEqual(
    formatUserStatus({ name: "John", isOnline: true, lastSeen: "2 hours ago" }),
    "John is currently online",
    'Shows online status'
);

assertEqual(
    formatUserStatus({ name: "Jane", isOnline: false, lastSeen: "5 mins ago" }),
    "Jane was last seen 5 mins ago",
    'Shows last seen when offline'
);

assertEqual(
    formatUserStatus({ name: "Bob", isOnline: false, lastSeen: "yesterday" }),
    "Bob was last seen yesterday",
    'Shows last seen with different time format'
);

// =========================================================================
// Task 4 Tests: generateHTML()
// =========================================================================
console.log('\n📋 TASK 4: generateHTML()');
console.log('-'.repeat(40));

const html = generateHTML({ title: "Fruits", items: ["Apple", "Banana"] });
assertIncludes(html, '<div class="container">', 'Contains container div');
assertIncludes(html, '<h1>Fruits</h1>', 'Contains title in h1');
assertIncludes(html, '<li>Apple</li>', 'Contains Apple list item');
assertIncludes(html, '<li>Banana</li>', 'Contains Banana list item');
assertIncludes(html, '<ul>', 'Contains ul tag');
assertIncludes(html, '</ul>', 'Contains closing ul tag');

const emptyHtml = generateHTML({ title: "Empty", items: [] });
assertIncludes(emptyHtml, '<h1>Empty</h1>', 'Works with empty items array');

// =========================================================================
// Task 5 Tests: formatBookInfo()
// =========================================================================
console.log('\n📋 TASK 5: formatBookInfo()');
console.log('-'.repeat(40));

assertEqual(
    formatBookInfo({ 
        title: "Dune", 
        author: "Frank Herbert",
        publicationDate: "1965-01-01",
        genres: ["sci-fi", "adventure"]
    }),
    "DUNE by Frank Herbert (1965) - Genres: sci-fi, adventure",
    'Formats book info correctly'
);

assertEqual(
    formatBookInfo({ 
        title: "The Lord of the Rings", 
        author: "J.R.R. Tolkien",
        publicationDate: "1954-07-29",
        genres: ["fantasy", "adventure", "fiction"]
    }),
    "THE LORD OF THE RINGS by J.R.R. Tolkien (1954) - Genres: fantasy, adventure, fiction",
    'Handles multiple genres'
);

// =========================================================================
// Task 6 Tests: getClassName()
// =========================================================================
console.log('\n📋 TASK 6: getClassName()');
console.log('-'.repeat(40));

assertEqual(
    getClassName("btn", { isActive: true, size: "lg", variant: "primary" }),
    "btn btn-active btn-lg btn-primary",
    'Combines multiple class modifiers'
);

assertEqual(
    getClassName("card", { disabled: true }),
    "card card-disabled",
    'Adds disabled class'
);

assertEqual(
    getClassName("input", {}),
    "input",
    'Returns only base class for empty options'
);

assertEqual(
    getClassName("box", { size: "sm" }),
    "box box-sm",
    'Adds only size modifier'
);

assertEqual(
    getClassName("btn", { isActive: false, variant: "danger" }),
    "btn btn-danger",
    'Ignores false isActive, adds variant'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You mastered Template Literals!\n');
} else {
    console.log('💪 Keep working on it! Practice expressions inside ${}.\n');
}
