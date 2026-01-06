/**
 * Test Suite for Challenge 1: Object Destructuring
 * =================================================
 * 
 * Run this file with: node _1_ObjectDestructuring_test_example.js
 */

const {
    extractUserInfo,
    getThemeSettings,
    transformBookData,
    extractNestedProfile,
    formatUserCard
} = require('./_1_ObjectDestructuring_example.js');

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

function assertType(value, type, testName) {
    if (typeof value === type) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${type}`);
        console.log(`   Actual type:   ${typeof value}`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Object Destructuring Challenge Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: extractUserInfo()
// =========================================================================
console.log('\n📋 TASK 1: extractUserInfo()');
console.log('-'.repeat(40));

assertType(extractUserInfo, 'function', 'extractUserInfo is a function');

assertEqual(
    extractUserInfo({ id: 1, name: "John", email: "john@test.com", age: 25 }),
    { id: 1, name: "John", email: "john@test.com" },
    'Extracts id, name, email from user object'
);

assertEqual(
    extractUserInfo({ id: 99, name: "Jane Doe", email: "jane@example.com", role: "admin" }),
    { id: 99, name: "Jane Doe", email: "jane@example.com" },
    'Ignores extra properties not needed'
);

assertEqual(
    extractUserInfo({ id: 0, name: "", email: "empty@test.com" }),
    { id: 0, name: "", email: "empty@test.com" },
    'Handles falsy values correctly (0 and empty string)'
);

// =========================================================================
// Task 2 Tests: getThemeSettings()
// =========================================================================
console.log('\n📋 TASK 2: getThemeSettings()');
console.log('-'.repeat(40));

assertType(getThemeSettings, 'function', 'getThemeSettings is a function');

assertEqual(
    getThemeSettings({ theme: "dark", fontSize: 20, language: "es" }),
    { theme: "dark", fontSize: 20, language: "es" },
    'Uses provided values when all properties exist'
);

assertEqual(
    getThemeSettings({ theme: "dark" }),
    { theme: "dark", fontSize: 16, language: "en" },
    'Uses default values for missing properties'
);

assertEqual(
    getThemeSettings({}),
    { theme: "light", fontSize: 16, language: "en" },
    'Uses all default values for empty object'
);

assertEqual(
    getThemeSettings({ fontSize: 0 }),
    { theme: "light", fontSize: 0, language: "en" },
    'Keeps 0 as fontSize (not default) - falsy value handling'
);

// =========================================================================
// Task 3 Tests: transformBookData()
// =========================================================================
console.log('\n📋 TASK 3: transformBookData()');
console.log('-'.repeat(40));

assertType(transformBookData, 'function', 'transformBookData is a function');

assertEqual(
    transformBookData({ title: "1984", author: "George Orwell", year: 1949 }),
    { bookTitle: "1984", authorName: "George Orwell", publishedYear: 1949 },
    'Renames properties correctly'
);

assertEqual(
    transformBookData({ title: "Dune", author: "Frank Herbert", year: 1965, pages: 658 }),
    { bookTitle: "Dune", authorName: "Frank Herbert", publishedYear: 1965 },
    'Ignores extra properties while renaming'
);

// =========================================================================
// Task 4 Tests: extractNestedProfile()
// =========================================================================
console.log('\n📋 TASK 4: extractNestedProfile()');
console.log('-'.repeat(40));

assertType(extractNestedProfile, 'function', 'extractNestedProfile is a function');

assertEqual(
    extractNestedProfile({
        name: "Jane",
        email: "jane@test.com",
        profile: { city: "London", country: "UK", age: 30 }
    }),
    { name: "Jane", city: "London", country: "UK" },
    'Extracts nested properties correctly'
);

assertEqual(
    extractNestedProfile({
        name: "Bob",
        profile: { city: "Tokyo", country: "Japan", postalCode: "100-0001" }
    }),
    { name: "Bob", city: "Tokyo", country: "Japan" },
    'Ignores extra nested properties'
);

// =========================================================================
// Task 5 Tests: formatUserCard()
// =========================================================================
console.log('\n📋 TASK 5: formatUserCard()');
console.log('-'.repeat(40));

assertType(formatUserCard, 'function', 'formatUserCard is a function');

assertEqual(
    formatUserCard({ name: "John", email: "john@test.com", profile: { city: "NYC", age: 25 } }),
    "Name: John, Email: john@test.com, Location: NYC, Age: 25",
    'Formats complete user data correctly'
);

assertEqual(
    formatUserCard({ name: "Jane", email: "jane@test.com" }),
    "Name: Jane, Email: jane@test.com, Location: Unknown, Age: N/A",
    'Handles missing profile with defaults'
);

assertEqual(
    formatUserCard({ name: "Bob", email: "bob@test.com", profile: { city: "LA" } }),
    "Name: Bob, Email: bob@test.com, Location: LA, Age: N/A",
    'Handles partial profile (missing age)'
);

assertEqual(
    formatUserCard({ name: "Alice", email: "alice@test.com", profile: { age: 30 } }),
    "Name: Alice, Email: alice@test.com, Location: Unknown, Age: 30",
    'Handles partial profile (missing city)'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! Great job on Object Destructuring!\n');
} else {
    console.log('💪 Keep working on it! Review the destructuring concepts.\n');
}
