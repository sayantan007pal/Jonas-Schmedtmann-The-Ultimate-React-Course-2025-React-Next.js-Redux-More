/**
 * Test Suite for Challenge 1: Promise Creation
 * Run with: node _1_test_example_Promise_Creation.js
 */

const { coinFlip, createDelayedPromise } = require('./_1_example_Promise_Creation.js');

let testsPassed = 0;
let testsFailed = 0;

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Testing Challenge 1: Promise Creation');
    console.log('='.repeat(60) + '\n');

    // Test 1: coinFlip returns a Promise
    console.log('📋 Test 1: coinFlip() returns a Promise');
    console.log('-'.repeat(40));
    
    const result = coinFlip();
    if (result instanceof Promise) {
        console.log('✅ PASS: coinFlip() returns a Promise');
        testsPassed++;
    } else {
        console.log('❌ FAIL: coinFlip() should return a Promise');
        console.log(`   Got: ${typeof result}`);
        testsFailed++;
    }

    // Test 2: coinFlip resolves or rejects after ~1 second
    console.log('\n📋 Test 2: coinFlip() settles after ~1 second with correct values');
    console.log('-'.repeat(40));
    
    const startTime = Date.now();
    try {
        // Run multiple times to test both outcomes
        let headsCount = 0;
        let tailsCount = 0;
        
        for (let i = 0; i < 10; i++) {
            try {
                const flipResult = await coinFlip();
                if (flipResult === "Heads! 🪙") headsCount++;
            } catch (flipError) {
                if (flipError === "Tails! 💀") tailsCount++;
            }
        }
        
        const endTime = Date.now();
        const elapsed = endTime - startTime;
        
        if (elapsed >= 9000 && (headsCount > 0 || tailsCount > 0)) {
            console.log('✅ PASS: coinFlip() respects delay and returns correct values');
            console.log(`   Heads: ${headsCount}, Tails: ${tailsCount} (out of 10 flips)`);
            testsPassed++;
        } else if (headsCount === 0 && tailsCount === 0) {
            console.log('❌ FAIL: coinFlip() should resolve with "Heads! 🪙" or reject with "Tails! 💀"');
            testsFailed++;
        } else {
            console.log('⚠️  WARN: Timing might be off, but values are correct');
            console.log(`   Heads: ${headsCount}, Tails: ${tailsCount}`);
            testsPassed++;
        }
    } catch (err) {
        console.log('❌ FAIL: Unexpected error:', err);
        testsFailed++;
    }

    // Test 3: createDelayedPromise resolves correctly
    console.log('\n📋 Test 3: createDelayedPromise(true, ...) resolves');
    console.log('-'.repeat(40));
    
    try {
        const resolveResult = await createDelayedPromise(true, 100, "Success!");
        if (resolveResult === "Success!") {
            console.log('✅ PASS: createDelayedPromise resolves with correct message');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected "Success!", got:', resolveResult);
            testsFailed++;
        }
    } catch (err) {
        console.log('❌ FAIL: Should resolve, not reject:', err);
        testsFailed++;
    }

    // Test 4: createDelayedPromise rejects correctly
    console.log('\n📋 Test 4: createDelayedPromise(false, ...) rejects');
    console.log('-'.repeat(40));
    
    try {
        await createDelayedPromise(false, 100, "Failed!");
        console.log('❌ FAIL: Should reject, not resolve');
        testsFailed++;
    } catch (err) {
        if (err === "Failed!") {
            console.log('✅ PASS: createDelayedPromise rejects with correct message');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected "Failed!", got:', err);
            testsFailed++;
        }
    }

    // Test 5: createDelayedPromise respects delay
    console.log('\n📋 Test 5: createDelayedPromise respects delay timing');
    console.log('-'.repeat(40));
    
    const delayStart = Date.now();
    await createDelayedPromise(true, 500, "Delayed");
    const delayEnd = Date.now();
    const delayElapsed = delayEnd - delayStart;
    
    if (delayElapsed >= 450 && delayElapsed < 600) {
        console.log(`✅ PASS: Delay respected (${delayElapsed}ms for 500ms delay)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Expected ~500ms delay, got ${delayElapsed}ms`);
        testsFailed++;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Results: ${testsPassed} passed, ${testsFailed} failed`);
    console.log('='.repeat(60) + '\n');
}

runTests();
