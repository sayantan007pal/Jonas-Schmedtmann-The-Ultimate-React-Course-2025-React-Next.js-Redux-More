/**
 * Test Suite for Promises & Async/Await Challenge #14
 * ====================================================
 * Topic: Promise Chaining Patterns
 * 
 * Run this file with: node _14_Promise_Chaining_test_example.js
 */

const {
    buildDataPipeline,
    resilientChain,
    processOrder
} = require('./_14_Promise_Chaining_example.js');

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
    console.log('🧪 Testing Challenge #14: Promise Chaining Patterns\n');
    console.log('='.repeat(60));

    // Test 1: buildDataPipeline
    console.log('\n📝 Task 1: buildDataPipeline()\n');
    
    const promise1 = buildDataPipeline();
    assertTrue(promise1 instanceof Promise, 'buildDataPipeline returns a Promise');
    
    const startTime = Date.now();
    const result1 = await buildDataPipeline();
    const elapsed = Date.now() - startTime;
    
    assertEqual(result1, "Result: 20", 'Pipeline produces correct result');
    assertTrue(elapsed >= 250, `Takes ~300ms for chain (actual: ${elapsed}ms)`);

    // Test 2: resilientChain
    console.log('\n📝 Task 2: resilientChain()\n');
    
    const result2a = await resilientChain(false);
    assertEqual(result2a, "Start → Step 2 → Step 3", 'Success path works');
    
    const result2b = await resilientChain(true);
    assertEqual(result2b, "Recovered from: Step 2 failed → Step 3", 'Recovery path works');

    // Test 3: processOrder
    console.log('\n📝 Task 3: processOrder()\n');
    
    const digitalOrder = { type: "digital", item: "E-book", price: 10 };
    const result3a = await processOrder(digitalOrder);
    
    assertTrue(result3a.totalPrice === 11, 'Tax is added correctly (10%)');
    assertEqual(result3a.deliveryMethod, "email", 'Digital delivery is email');
    assertEqual(result3a.deliveryTime, "instant", 'Digital delivery is instant');
    assertEqual(result3a.confirmation, "Order confirmed for E-book", 'Confirmation message correct');
    
    const physicalOrder = { type: "physical", item: "Book", price: 20 };
    const result3b = await processOrder(physicalOrder);
    
    assertTrue(result3b.totalPrice === 22, 'Tax is added correctly for physical');
    assertEqual(result3b.deliveryMethod, "shipping", 'Physical delivery is shipping');
    assertEqual(result3b.deliveryTime, "3-5 days", 'Physical delivery time correct');
    
    // Test invalid price
    try {
        await processOrder({ type: "digital", item: "Free", price: 0 });
        assertTrue(false, 'Should reject invalid price');
    } catch (err) {
        assertTrue(err.includes("Invalid price") || err.message?.includes("Invalid price"), 'Invalid price throws correct error');
    }

    printSummary();
}

runTests().catch(console.error);
