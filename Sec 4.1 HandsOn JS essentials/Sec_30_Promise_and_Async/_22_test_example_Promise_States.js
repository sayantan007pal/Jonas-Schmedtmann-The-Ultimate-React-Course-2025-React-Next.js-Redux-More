/**
 * Test Suite for Challenge 2: Promise States
 * Run with: node _2_test_example_Promise_States.js
 */

const { demonstratePromiseStates, isPromiseSettled } = require('./_2_example_Promise_States.js');

let testsPassed = 0;
let testsFailed = 0;

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Testing Challenge 2: Promise States');
    console.log('='.repeat(60) + '\n');

    // Test 1: demonstratePromiseStates returns correct structure
    console.log('📋 Test 1: demonstratePromiseStates() returns object with 3 promises');
    console.log('-'.repeat(40));
    
    const states = demonstratePromiseStates();
    
    if (states && 
        states.pendingPromise instanceof Promise &&
        states.fulfilledPromise instanceof Promise &&
        states.rejectedPromise instanceof Promise) {
        console.log('✅ PASS: Returns object with 3 Promise properties');
        testsPassed++;
    } else {
        console.log('❌ FAIL: Should return { pendingPromise, fulfilledPromise, rejectedPromise }');
        testsFailed++;
    }

    // Test 2: fulfilledPromise resolves with correct value
    console.log('\n📋 Test 2: fulfilledPromise resolves with "I am fulfilled!"');
    console.log('-'.repeat(40));
    
    try {
        const fulfilled = await states.fulfilledPromise;
        if (fulfilled === "I am fulfilled!") {
            console.log('✅ PASS: fulfilledPromise resolves correctly');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected "I am fulfilled!", got:', fulfilled);
            testsFailed++;
        }
    } catch (err) {
        console.log('❌ FAIL: fulfilledPromise should resolve, not reject');
        testsFailed++;
    }

    // Test 3: rejectedPromise rejects with correct reason
    console.log('\n📋 Test 3: rejectedPromise rejects with "I am rejected!"');
    console.log('-'.repeat(40));
    
    try {
        await states.rejectedPromise;
        console.log('❌ FAIL: rejectedPromise should reject, not resolve');
        testsFailed++;
    } catch (err) {
        if (err === "I am rejected!") {
            console.log('✅ PASS: rejectedPromise rejects correctly');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected "I am rejected!", got:', err);
            testsFailed++;
        }
    }

    // Test 4: pendingPromise is initially pending
    console.log('\n📋 Test 4: pendingPromise stays pending for a while');
    console.log('-'.repeat(40));
    
    let isPending = true;
    states.pendingPromise.then(() => { isPending = false; });
    
    await new Promise(r => setTimeout(r, 100)); // Wait 100ms
    
    if (isPending) {
        console.log('✅ PASS: pendingPromise is still pending after 100ms');
        testsPassed++;
    } else {
        console.log('❌ FAIL: pendingPromise resolved too quickly');
        testsFailed++;
    }

    // Test 5: isPromiseSettled detects fulfilled promise
    console.log('\n📋 Test 5: isPromiseSettled detects fulfilled promise');
    console.log('-'.repeat(40));
    
    const quickPromise = Promise.resolve("fast");
    const result1 = await isPromiseSettled(quickPromise, 100);
    
    if (result1 && result1.settled === true && result1.state === 'fulfilled' && result1.value === 'fast') {
        console.log('✅ PASS: Correctly detected fulfilled promise');
        testsPassed++;
    } else {
        console.log('❌ FAIL: Expected { settled: true, state: "fulfilled", value: "fast" }');
        console.log('   Got:', result1);
        testsFailed++;
    }

    // Test 6: isPromiseSettled detects rejected promise
    console.log('\n📋 Test 6: isPromiseSettled detects rejected promise');
    console.log('-'.repeat(40));
    
    const rejectPromise = Promise.reject("error");
    const result2 = await isPromiseSettled(rejectPromise, 100);
    
    if (result2 && result2.settled === true && result2.state === 'rejected' && result2.reason === 'error') {
        console.log('✅ PASS: Correctly detected rejected promise');
        testsPassed++;
    } else {
        console.log('❌ FAIL: Expected { settled: true, state: "rejected", reason: "error" }');
        console.log('   Got:', result2);
        testsFailed++;
    }

    // Test 7: isPromiseSettled detects pending promise (timeout)
    console.log('\n📋 Test 7: isPromiseSettled detects pending promise');
    console.log('-'.repeat(40));
    
    const slowPromise = new Promise(r => setTimeout(() => r("slow"), 5000));
    const result3 = await isPromiseSettled(slowPromise, 100);
    
    if (result3 && result3.settled === false && result3.state === 'pending') {
        console.log('✅ PASS: Correctly detected pending promise');
        testsPassed++;
    } else {
        console.log('❌ FAIL: Expected { settled: false, state: "pending" }');
        console.log('   Got:', result3);
        testsFailed++;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Results: ${testsPassed} passed, ${testsFailed} failed`);
    console.log('='.repeat(60) + '\n');
}

runTests();
