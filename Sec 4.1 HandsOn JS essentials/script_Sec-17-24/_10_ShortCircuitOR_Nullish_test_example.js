/**
 * Test Suite for Challenge 10: Short-Circuit OR (||) and Nullish (??)
 * =====================================================================
 * 
 * Run this file with: node _10_ShortCircuitOR_Nullish_test_example.js
 */

const {
    getOrResult,
    greetUser,
    getNullishResult,
    getConfigValue,
    getUsername,
    createConfig
} = require('./_10_ShortCircuitOR_Nullish_example.js');

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

function assertStrictEqual(actual, expected, testName) {
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expected} (${typeof expected})`);
        console.log(`   Actual:   ${actual} (${typeof actual})`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Short-Circuit OR (||) and Nullish (??) Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: getOrResult()
// =========================================================================
console.log('\n📋 TASK 1: getOrResult()');
console.log('-'.repeat(40));

assertStrictEqual(getOrResult(true, "Hello"), true, 'true || "Hello" → true');
assertStrictEqual(getOrResult(false, "Hello"), "Hello", 'false || "Hello" → "Hello"');
assertStrictEqual(getOrResult(0, "Default"), "Default", '0 || "Default" → "Default"');
assertStrictEqual(getOrResult("Hi", "Default"), "Hi", '"Hi" || "Default" → "Hi"');
assertStrictEqual(getOrResult("", "Fallback"), "Fallback", '"" || "Fallback" → "Fallback"');
assertStrictEqual(getOrResult(null, "Value"), "Value", 'null || "Value" → "Value"');

// =========================================================================
// Task 2 Tests: greetUser()
// =========================================================================
console.log('\n📋 TASK 2: greetUser()');
console.log('-'.repeat(40));

assertEqual(greetUser("John"), "Hello, John!", 'Greets by name');
assertEqual(greetUser(""), "Hello, Guest!", 'Empty string uses Guest');
assertEqual(greetUser(undefined), "Hello, Guest!", 'Undefined uses Guest');
assertEqual(greetUser(null), "Hello, Guest!", 'Null uses Guest');

// =========================================================================
// Task 3 Tests: getNullishResult()
// =========================================================================
console.log('\n📋 TASK 3: getNullishResult()');
console.log('-'.repeat(40));

assertStrictEqual(getNullishResult(null, "default"), "default", 'null ?? "default" → "default"');
assertStrictEqual(getNullishResult(undefined, "default"), "default", 'undefined ?? "default" → "default"');
assertStrictEqual(getNullishResult(0, "default"), 0, '0 ?? "default" → 0 (CRITICAL!)');
assertStrictEqual(getNullishResult("", "default"), "", '"" ?? "default" → "" (CRITICAL!)');
assertStrictEqual(getNullishResult(false, "default"), false, 'false ?? "default" → false (CRITICAL!)');
assertStrictEqual(getNullishResult("value", "default"), "value", '"value" ?? "default" → "value"');

// =========================================================================
// Task 4 Tests: getConfigValue()
// =========================================================================
console.log('\n📋 TASK 4: getConfigValue()');
console.log('-'.repeat(40));

assertStrictEqual(getConfigValue({ volume: 0 }, "volume"), 0, 'Keeps 0 (valid value!)');
assertStrictEqual(getConfigValue({ volume: 50 }, "volume"), 50, 'Returns existing value');
assertStrictEqual(getConfigValue({}, "volume"), 0, 'Returns default for missing key');
assertStrictEqual(getConfigValue({ volume: null }, "volume"), 0, 'Returns default for null');
assertStrictEqual(getConfigValue({ volume: undefined }, "volume"), 0, 'Returns default for undefined');

// =========================================================================
// Task 5 Tests: getUsername()
// =========================================================================
console.log('\n📋 TASK 5: getUsername()');
console.log('-'.repeat(40));

assertEqual(
    getUsername({ displayName: "JohnD", email: "john@test.com" }),
    "JohnD",
    'Uses displayName when present'
);
assertEqual(
    getUsername({ displayName: "", email: "john@test.com" }),
    "john@test.com",
    'Falls back to email when displayName empty'
);
assertEqual(
    getUsername({ email: "john@test.com" }),
    "john@test.com",
    'Uses email when displayName missing'
);
assertEqual(
    getUsername({}),
    "Anonymous",
    'Uses Anonymous when both missing'
);
assertEqual(
    getUsername({ displayName: null, email: null }),
    "Anonymous",
    'Uses Anonymous when both null'
);

// =========================================================================
// Task 6 Tests: createConfig()
// =========================================================================
console.log('\n📋 TASK 6: createConfig()');
console.log('-'.repeat(40));

assertEqual(
    createConfig({}),
    { theme: "light", language: "en", notifications: true, pageSize: 10 },
    'All defaults for empty options'
);

assertEqual(
    createConfig({ theme: "dark" }),
    { theme: "dark", language: "en", notifications: true, pageSize: 10 },
    'Custom theme, rest defaults'
);

// Critical test: 0 and false should NOT trigger defaults!
assertEqual(
    createConfig({ pageSize: 0, notifications: false }),
    { theme: "light", language: "en", notifications: false, pageSize: 0 },
    'Keeps 0 for pageSize and false for notifications (must use ??)'
);

assertEqual(
    createConfig({ theme: "dark", language: "es", notifications: false, pageSize: 5 }),
    { theme: "dark", language: "es", notifications: false, pageSize: 5 },
    'All custom values'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You mastered || and ?? operators!\n');
} else {
    console.log('💪 Keep working! Remember: || for falsy, ?? for null/undefined only\n');
}
