/**
 * Test Suite for Promises & Async/Await Challenge #13
 * ====================================================
 * Topic: Sequential vs Parallel Execution
 * 
 * Run this file with: node _13_Sequential_vs_Parallel_test_example.js
 */

const {
    delay,
    processSequentially,
    processInParallel,
    processBatched
} = require('./_13_Sequential_vs_Parallel_example.js');

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
    console.log('🧪 Testing Challenge #13: Sequential vs Parallel Execution\n');
    console.log('='.repeat(60));

    // Test 1: processSequentially
    console.log('\n📝 Task 1: processSequentially()\n');
    
    const seqTasks = [
        { name: "Task1", duration: 100 },
        { name: "Task2", duration: 100 },
        { name: "Task3", duration: 100 }
    ];
    
    const startSeq = Date.now();
    const seqResults = await processSequentially(seqTasks);
    const seqTime = Date.now() - startSeq;
    
    assertEqual(seqResults.length, 3, 'Sequential returns all tasks');
    assertTrue(seqTime >= 280, `Sequential takes ~300ms (actual: ${seqTime}ms)`);
    
    // Check that tasks complete in order with increasing times
    assertTrue(
        seqResults[0].completedAt < seqResults[1].completedAt &&
        seqResults[1].completedAt < seqResults[2].completedAt,
        'Tasks complete in sequential order'
    );

    // Test 2: processInParallel
    console.log('\n📝 Task 2: processInParallel()\n');
    
    const parTasks = [
        { name: "Task1", duration: 100 },
        { name: "Task2", duration: 200 },
        { name: "Task3", duration: 150 }
    ];
    
    const startPar = Date.now();
    const parResults = await processInParallel(parTasks);
    const parTime = Date.now() - startPar;
    
    assertEqual(parResults.length, 3, 'Parallel returns all tasks');
    assertTrue(parTime < 350, `Parallel takes ~200ms (actual: ${parTime}ms)`);
    assertTrue(parTime >= 180, 'Parallel takes at least as long as longest task');

    // Test 3: processBatched
    console.log('\n📝 Task 3: processBatched()\n');
    
    const batchTasks = [
        { name: "A", duration: 100 },
        { name: "B", duration: 100 },
        { name: "C", duration: 100 },
        { name: "D", duration: 100 }
    ];
    
    const startBatch = Date.now();
    const batchResults = await processBatched(batchTasks, 2);
    const batchTime = Date.now() - startBatch;
    
    assertEqual(batchResults.length, 4, 'Batched returns all tasks');
    assertTrue(batchTime >= 180, `Batched takes ~200ms (actual: ${batchTime}ms)`);
    assertTrue(batchTime < 350, 'Batched is faster than fully sequential');
    
    // Check batch numbers
    assertEqual(batchResults[0].batch, 1, 'First task in batch 1');
    assertEqual(batchResults[1].batch, 1, 'Second task in batch 1');
    assertEqual(batchResults[2].batch, 2, 'Third task in batch 2');
    assertEqual(batchResults[3].batch, 2, 'Fourth task in batch 2');

    printSummary();
}

runTests().catch(console.error);
