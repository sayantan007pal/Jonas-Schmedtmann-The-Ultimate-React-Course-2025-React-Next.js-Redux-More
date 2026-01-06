/**
 * Test Suite for Promises & Async/Await Challenge #6
 * ===================================================
 * Topic: The await Keyword
 * 
 * Run this file with: node _6_Await_Keyword_test_example.js
 */

const {
    delay,
    getSequentialValues,
    getUserStatus,
    processItems
} = require('./_6_Await_Keyword_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function assertDeepEqual(actual, expected, testName) {
    totalTests++;
    if (JSON.stringify(actual) === JSON.stringify(expected)) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${JSON.stringify(expected)}`);
        console.log(`   Actual:   ${JSON.stringify(actual)}`);
        testsFailed++;
        return false;
    }
}

function assertEqual(actual, expected, testName) {
    totalTests++;
    if (actual === expected) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: "${expected}"`);
        console.log(`   Actual:   "${actual}"`);
        testsFailed++;
        return false;
    }
}

function assertTrue(condition, testName) {
    totalTests++;
    if (condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        testsFailed++;
        return false;
    }
}

function printSummary() {
    console.log('\n' + '='.repeat(60));
    console.log(`📊 TEST SUMMARY: ${testsPassed}/${totalTests} tests passed`);
    if (testsFailed === 0) {
        console.log('🎉 ALL TESTS PASSED! Great job!');
    } else {
        console.log(`⚠️  ${testsFailed} test(s) failed. Keep trying!`);
    }
    console.log('='.repeat(60));
}

// =============================================================================
// Tests
// =============================================================================

async function runTests() {
    console.log('🧪 Testing Challenge #6: The await Keyword\n');
    console.log('='.repeat(60));

    // Test 1: getSequentialValues
    console.log('\n📝 Task 1: getSequentialValues()\n');
    
    const startTime1 = Date.now();
    const values = await getSequentialValues();
    const elapsed1 = Date.now() - startTime1;
    
    assertDeepEqual(values, ["First", "Second", "Third"], 'Returns correct array of values');
    assertTrue(elapsed1 >= 500, 'Takes ~600ms (sequential execution)');

    // Test 2: getUserStatus
    console.log('\n📝 Task 2: getUserStatus()\n');
    
    const startTime2a = Date.now();
    const status2a = await getUserStatus(2);
    const elapsed2a = Date.now() - startTime2a;
    
    assertEqual(status2a, "Welcome back, Active User!", 'Even userId returns active message');
    assertTrue(elapsed2a >= 400, 'Active user takes ~500ms (two awaits)');
    
    const startTime2b = Date.now();
    const status2b = await getUserStatus(3);
    const elapsed2b = Date.now() - startTime2b;
    
    assertEqual(status2b, "Inactive User needs to reactivate account", 'Odd userId returns inactive message');
    assertTrue(elapsed2b < 400, 'Inactive user takes ~300ms (one await)');
    
    const status2c = await getUserStatus(4);
    assertEqual(status2c, "Welcome back, Active User!", 'Another even userId works');

    // Test 3: processItems
    console.log('\n📝 Task 3: processItems()\n');
    
    const startTime3 = Date.now();
    const results = await processItems(["A", "B", "C"]);
    const elapsed3 = Date.now() - startTime3;
    
    assertDeepEqual(
        results,
        ["Processed: A", "Processed: B", "Processed: C"],
        'Returns correctly formatted array'
    );
    assertTrue(elapsed3 >= 250, 'Takes ~300ms (sequential processing)');
    
    const results2 = await processItems(["X"]);
    assertDeepEqual(results2, ["Processed: X"], 'Works with single item');
    
    const results3 = await processItems([]);
    assertDeepEqual(results3, [], 'Works with empty array');

    printSummary();
}

runTests().catch(console.error);
