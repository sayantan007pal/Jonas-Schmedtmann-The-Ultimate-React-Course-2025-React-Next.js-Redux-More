/**
 * Test Suite for Challenge 7: Ternary Operator
 * ==============================================
 * 
 * Run this file with: node _7_TernaryOperator_test_example.js
 */

const {
    getStatus,
    getDisplayName,
    getDiscountedPrice,
    getGrade,
    createUserConfig,
    renderComponent
} = require('./_7_TernaryOperator_example.js');

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
console.log('🧪 Running Ternary Operator Challenge Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: getStatus()
// =========================================================================
console.log('\n📋 TASK 1: getStatus()');
console.log('-'.repeat(40));

assertEqual(getStatus(true), "Active", 'Returns Active for true');
assertEqual(getStatus(false), "Inactive", 'Returns Inactive for false');

// Edge cases with truthy/falsy
assertEqual(getStatus(1), "Active", 'Truthy value (1) returns Active');
assertEqual(getStatus(0), "Inactive", 'Falsy value (0) returns Inactive');
assertEqual(getStatus("yes"), "Active", 'Truthy string returns Active');
assertEqual(getStatus(""), "Inactive", 'Empty string returns Inactive');

// =========================================================================
// Task 2 Tests: getDisplayName()
// =========================================================================
console.log('\n📋 TASK 2: getDisplayName()');
console.log('-'.repeat(40));

assertEqual(
    getDisplayName({ fullName: "John Doe", nickname: "JD" }),
    "JD",
    'Returns nickname when present'
);

assertEqual(
    getDisplayName({ fullName: "Jane Smith" }),
    "Jane Smith",
    'Returns fullName when nickname missing'
);

assertEqual(
    getDisplayName({ fullName: "Bob", nickname: "" }),
    "Bob",
    'Empty string nickname is falsy, returns fullName'
);

assertEqual(
    getDisplayName({ fullName: "Alice", nickname: null }),
    "Alice",
    'Null nickname returns fullName'
);

// =========================================================================
// Task 3 Tests: getDiscountedPrice()
// =========================================================================
console.log('\n📋 TASK 3: getDiscountedPrice()');
console.log('-'.repeat(40));

assertEqual(getDiscountedPrice(100, true), 80, 'Member gets 20% off $100');
assertEqual(getDiscountedPrice(100, false), 100, 'Non-member pays full price');
assertEqual(getDiscountedPrice(50, true), 40, 'Member gets 20% off $50');
assertEqual(getDiscountedPrice(0, true), 0, 'Handles zero price');

// =========================================================================
// Task 4 Tests: getGrade()
// =========================================================================
console.log('\n📋 TASK 4: getGrade()');
console.log('-'.repeat(40));

assertEqual(getGrade(95), "A", 'Score 95 is A');
assertEqual(getGrade(90), "A", 'Score 90 is A (boundary)');
assertEqual(getGrade(89), "B", 'Score 89 is B');
assertEqual(getGrade(80), "B", 'Score 80 is B (boundary)');
assertEqual(getGrade(75), "C", 'Score 75 is C');
assertEqual(getGrade(65), "D", 'Score 65 is D');
assertEqual(getGrade(59), "F", 'Score 59 is F');
assertEqual(getGrade(0), "F", 'Score 0 is F');
assertEqual(getGrade(100), "A", 'Score 100 is A');

// =========================================================================
// Task 5 Tests: createUserConfig()
// =========================================================================
console.log('\n📋 TASK 5: createUserConfig()');
console.log('-'.repeat(40));

assertEqual(
    createUserConfig({ name: "John" }, true),
    { username: "John", role: "admin", permissions: ["read", "write", "delete"] },
    'Admin user config'
);

assertEqual(
    createUserConfig({ name: "Jane" }, false),
    { username: "Jane", role: "user", permissions: ["read"] },
    'Regular user config'
);

// =========================================================================
// Task 6 Tests: renderComponent()
// =========================================================================
console.log('\n📋 TASK 6: renderComponent()');
console.log('-'.repeat(40));

assertEqual(
    renderComponent({ isLoading: true, error: null, data: null }),
    "Loading...",
    'Shows loading state'
);

assertEqual(
    renderComponent({ isLoading: false, error: "Network error", data: null }),
    "Error: Network error",
    'Shows error state'
);

assertEqual(
    renderComponent({ isLoading: false, error: null, data: "User info" }),
    "Data: User info",
    'Shows data state'
);

assertEqual(
    renderComponent({ isLoading: false, error: null, data: null }),
    "No data available",
    'Shows no data message'
);

// Priority tests
assertEqual(
    renderComponent({ isLoading: true, error: "Error", data: "Data" }),
    "Loading...",
    'Loading takes priority over error and data'
);

assertEqual(
    renderComponent({ isLoading: false, error: "Error", data: "Data" }),
    "Error: Error",
    'Error takes priority over data'
);

// Falsy data edge case
assertEqual(
    renderComponent({ isLoading: false, error: null, data: "" }),
    "No data available",
    'Empty string data is falsy, shows no data'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You mastered Ternary Operator!\n');
} else {
    console.log('💪 Keep working! Remember: condition ? ifTrue : ifFalse\n');
}
