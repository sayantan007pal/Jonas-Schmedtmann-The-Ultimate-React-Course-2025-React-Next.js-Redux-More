/**
 * Test Suite for Challenge 9: Short-Circuit AND (&&)
 * ====================================================
 * 
 * Run this file with: node _9_ShortCircuitAND_test_example.js
 */

const {
    getAndResult,
    maybeLog,
    renderIf,
    getChainedAnd,
    safeGet,
    renderList
} = require('./_9_ShortCircuitAND_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let capturedLogs = [];

// Capture console.log for testing
const originalLog = console.log;
function captureConsole() {
    capturedLogs = [];
    console.log = (...args) => capturedLogs.push(args.join(' '));
}
function restoreConsole() {
    console.log = originalLog;
}

function assertEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    
    if (actualStr === expectedStr) {
        originalLog(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        originalLog(`❌ FAIL: ${testName}`);
        originalLog(`   Expected: ${expectedStr}`);
        originalLog(`   Actual:   ${actualStr}`);
        testsFailed++;
    }
}

function assertStrictEqual(actual, expected, testName) {
    if (actual === expected) {
        originalLog(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        originalLog(`❌ FAIL: ${testName}`);
        originalLog(`   Expected: ${expected} (${typeof expected})`);
        originalLog(`   Actual:   ${actual} (${typeof actual})`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

originalLog('\n' + '='.repeat(60));
originalLog('🧪 Running Short-Circuit AND (&&) Challenge Tests');
originalLog('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: getAndResult()
// =========================================================================
originalLog('\n📋 TASK 1: getAndResult()');
originalLog('-'.repeat(40));

assertStrictEqual(getAndResult(true, "Hello"), "Hello", 'true && "Hello" → "Hello"');
assertStrictEqual(getAndResult(false, "Hello"), false, 'false && "Hello" → false');
assertStrictEqual(getAndResult("A", "B"), "B", '"A" && "B" → "B"');
assertStrictEqual(getAndResult(0, "Hello"), 0, '0 && "Hello" → 0');
assertStrictEqual(getAndResult("", "Hello"), "", '"" && "Hello" → ""');
assertStrictEqual(getAndResult(null, "Hello"), null, 'null && "Hello" → null');
assertStrictEqual(getAndResult(1, 2), 2, '1 && 2 → 2');

// =========================================================================
// Task 2 Tests: maybeLog()
// =========================================================================
originalLog('\n📋 TASK 2: maybeLog()');
originalLog('-'.repeat(40));

captureConsole();
const logResult1 = maybeLog(true, "Hello");
restoreConsole();
assertEqual(capturedLogs, ["Hello"], 'Logs message when condition is true');
assertStrictEqual(logResult1, "Hello", 'Returns message when logged');

captureConsole();
const logResult2 = maybeLog(false, "Hello");
restoreConsole();
assertEqual(capturedLogs, [], 'Does NOT log when condition is false');
assertStrictEqual(logResult2, false, 'Returns false when not logged');

captureConsole();
const logResult3 = maybeLog(0, "Hello");
restoreConsole();
assertStrictEqual(logResult3, 0, 'Returns 0 (falsy) when condition is 0');

// =========================================================================
// Task 3 Tests: renderIf()
// =========================================================================
originalLog('\n📋 TASK 3: renderIf()');
originalLog('-'.repeat(40));

assertStrictEqual(renderIf(true, "<div>Hello</div>"), "<div>Hello</div>", 'Returns content when true');
assertStrictEqual(renderIf(false, "<div>Hello</div>"), null, 'Returns null when false');
assertStrictEqual(renderIf(0, "<div>Hello</div>"), null, 'Returns null when 0 (falsy)');
assertStrictEqual(renderIf("", "<div>Hello</div>"), null, 'Returns null when empty string');
assertStrictEqual(renderIf(1, "Content"), "Content", 'Returns content when truthy (1)');
assertStrictEqual(renderIf([], "Content"), "Content", 'Returns content when truthy ([])');

// =========================================================================
// Task 4 Tests: getChainedAnd()
// =========================================================================
originalLog('\n📋 TASK 4: getChainedAnd()');
originalLog('-'.repeat(40));

assertStrictEqual(getChainedAnd("A", "B", "C"), "C", '"A" && "B" && "C" → "C"');
assertStrictEqual(getChainedAnd("A", 0, "C"), 0, '"A" && 0 && "C" → 0');
assertStrictEqual(getChainedAnd("A", null, "C"), null, '"A" && null && "C" → null');
assertStrictEqual(getChainedAnd(1, 2, 3, 4, 5), 5, 'All truthy → last value');
assertStrictEqual(getChainedAnd(false), false, 'Single false → false');
assertStrictEqual(getChainedAnd(), true, 'No args → true (edge case)');

// =========================================================================
// Task 5 Tests: safeGet()
// =========================================================================
originalLog('\n📋 TASK 5: safeGet()');
originalLog('-'.repeat(40));

assertEqual(safeGet({ a: { b: 1 } }, "a", "b"), 1, 'Gets nested property');
assertEqual(safeGet({ a: { b: 0 } }, "a", "b"), 0, 'Gets falsy nested property (0)');
assertEqual(safeGet({ a: {} }, "a", "b"), undefined, 'Returns undefined for missing prop');
assertEqual(safeGet({ a: { b: 1 } }, "x", "y"), undefined, 'Returns undefined for wrong path');
assertEqual(safeGet(null, "a", "b"), undefined, 'Returns undefined for null object');
assertEqual(safeGet(undefined, "a", "b"), undefined, 'Returns undefined for undefined object');

// =========================================================================
// Task 6 Tests: renderList()
// =========================================================================
originalLog('\n📋 TASK 6: renderList()');
originalLog('-'.repeat(40));

assertEqual(
    renderList([1, 2, 3], items => items.join("-")),
    "1-2-3",
    'Renders when array has items'
);

assertStrictEqual(
    renderList([], items => items.join("-")),
    null,
    'Returns null for empty array'
);

assertEqual(
    renderList(["a", "b"], items => items.length),
    2,
    'renderFn receives items array'
);

// =============================================================================
// Summary
// =============================================================================
originalLog('\n' + '='.repeat(60));
originalLog(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
originalLog('='.repeat(60) + '\n');

if (testsFailed === 0) {
    originalLog('🎉 All tests passed! You mastered && Short-Circuit!\n');
} else {
    originalLog('💪 Keep working! Remember: && returns FIRST FALSY or LAST value\n');
}
