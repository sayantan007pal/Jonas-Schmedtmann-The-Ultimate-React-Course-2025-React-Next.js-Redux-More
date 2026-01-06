/**
 * Test Suite for Promises & Async/Await Challenge #18
 * ====================================================
 * Topic: Async Iteration and Loops
 * 
 * Run this file with: node _18_Async_Iteration_Loops_test_example.js
 */

const {
    delay,
    fetchItem,
    fetchItemsSequentially,
    demonstrateForEachProblem,
    fetchItemsParallel,
    processWithRunningTotal
} = require('./_18_Async_Iteration_Loops_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

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
    console.log('🧪 Testing Challenge #18: Async Iteration and Loops\n');
    console.log('='.repeat(60));

    // Test 1: fetchItemsSequentially
    console.log('\n📝 Task 1: fetchItemsSequentially()\n');
    
    const ids = [1, 2, 3];
    const startSeq = Date.now();
    const seqResults = await fetchItemsSequentially(ids);
    const seqTime = Date.now() - startSeq;
    
    assertEqual(seqResults.length, 3, 'Returns all 3 items');
    assertTrue(seqResults[0].id === 1, 'First item has id 1');
    assertTrue(seqResults[2].id === 3, 'Last item has id 3');
    assertTrue(seqTime >= 280, `Sequential takes ~300ms (actual: ${seqTime}ms)`);

    // Test 2: demonstrateForEachProblem
    console.log('\n📝 Task 2: demonstrateForEachProblem() - Showing the Problem\n');
    
    const forEachResult = demonstrateForEachProblem([1, 2, 3]);
    assertTrue(
        forEachResult.length === 0 || forEachResult.length < 3,
        'forEach does NOT wait - array is empty or incomplete'
    );
    console.log('   ℹ️  This demonstrates that forEach + async = bad!');

    // Test 3: fetchItemsParallel
    console.log('\n📝 Task 3: fetchItemsParallel()\n');
    
    const startPar = Date.now();
    const parResults = await fetchItemsParallel([1, 2, 3, 4, 5]);
    const parTime = Date.now() - startPar;
    
    assertEqual(parResults.length, 5, 'Returns all 5 items');
    assertTrue(parResults.every(item => item.fetched), 'All items are fetched');
    assertTrue(parTime < 300, `Parallel takes ~100ms (actual: ${parTime}ms)`);

    // Test 4: processWithRunningTotal
    console.log('\n📝 Task 4: processWithRunningTotal()\n');
    
    const result4 = await processWithRunningTotal([1, 2, 3]);
    assertDeepEqual(result4.values, [2, 4, 6], 'Values are doubled');
    assertEqual(result4.total, 12, 'Total is sum of doubled values');
    
    const result4b = await processWithRunningTotal([5, 10]);
    assertDeepEqual(result4b.values, [10, 20], 'Works with different numbers');
    assertEqual(result4b.total, 30, 'Total is correct');

    printSummary();
}

runTests().catch(console.error);
