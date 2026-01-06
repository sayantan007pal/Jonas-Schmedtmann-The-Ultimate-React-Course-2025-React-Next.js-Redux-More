/**
 * Test Suite for Challenge 5: Async Function Basics
 * Run with: node _5_test_example_async_function_basics.js
 */

const { 
    getGreeting, 
    getNumber, 
    getArray, 
    dataService,
    delayedCalculation,
    fetchMockUser 
} = require('./_5_example_async_function_basics.js');

let testsPassed = 0;
let testsFailed = 0;

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Testing Challenge 5: Async Function Basics');
    console.log('='.repeat(60) + '\n');

    // Test 1: getGreeting is async and returns correct value
    console.log('📋 Test 1: getGreeting is async and returns "Hello, World!"');
    console.log('-'.repeat(40));
    
    if (typeof getGreeting === 'function') {
        const result = getGreeting();
        if (result instanceof Promise) {
            const value = await result;
            if (value === "Hello, World!") {
                console.log('✅ PASS: getGreeting returns Promise resolving to "Hello, World!"');
                testsPassed++;
            } else {
                console.log('❌ FAIL: Expected "Hello, World!", got:', value);
                testsFailed++;
            }
        } else {
            console.log('❌ FAIL: getGreeting should return a Promise');
            testsFailed++;
        }
    } else {
        console.log('❌ FAIL: getGreeting is not defined');
        testsFailed++;
    }

    // Test 2: getNumber is async and returns 42
    console.log('\n📋 Test 2: getNumber is async function expression returning 42');
    console.log('-'.repeat(40));
    
    if (typeof getNumber === 'function') {
        const result = getNumber();
        if (result instanceof Promise) {
            const value = await result;
            if (value === 42) {
                console.log('✅ PASS: getNumber returns Promise resolving to 42');
                testsPassed++;
            } else {
                console.log('❌ FAIL: Expected 42, got:', value);
                testsFailed++;
            }
        } else {
            console.log('❌ FAIL: getNumber should return a Promise');
            testsFailed++;
        }
    } else {
        console.log('❌ FAIL: getNumber is not defined');
        testsFailed++;
    }

    // Test 3: getArray is async arrow function returning [1, 2, 3]
    console.log('\n📋 Test 3: getArray is async arrow function returning [1, 2, 3]');
    console.log('-'.repeat(40));
    
    if (typeof getArray === 'function') {
        const result = getArray();
        if (result instanceof Promise) {
            const value = await result;
            if (Array.isArray(value) && value.length === 3 && 
                value[0] === 1 && value[1] === 2 && value[2] === 3) {
                console.log('✅ PASS: getArray returns Promise resolving to [1, 2, 3]');
                testsPassed++;
            } else {
                console.log('❌ FAIL: Expected [1, 2, 3], got:', value);
                testsFailed++;
            }
        } else {
            console.log('❌ FAIL: getArray should return a Promise');
            testsFailed++;
        }
    } else {
        console.log('❌ FAIL: getArray is not defined');
        testsFailed++;
    }

    // Test 4: dataService has async fetch method
    console.log('\n📋 Test 4: dataService.fetch is async method');
    console.log('-'.repeat(40));
    
    if (dataService && typeof dataService.fetch === 'function') {
        const result = dataService.fetch();
        if (result instanceof Promise) {
            const value = await result;
            if (value && value.status === "success" && value.data === "sample data") {
                console.log('✅ PASS: dataService.fetch returns correct object');
                testsPassed++;
            } else {
                console.log('❌ FAIL: Expected { status: "success", data: "sample data" }');
                console.log('   Got:', value);
                testsFailed++;
            }
        } else {
            console.log('❌ FAIL: dataService.fetch should return a Promise');
            testsFailed++;
        }
    } else {
        console.log('❌ FAIL: dataService or dataService.fetch is not defined');
        testsFailed++;
    }

    // Test 5: delayedCalculation returns sum after delay
    console.log('\n📋 Test 5: delayedCalculation returns sum after delay');
    console.log('-'.repeat(40));
    
    const start = Date.now();
    const sum = await delayedCalculation(5, 3, 500);
    const elapsed = Date.now() - start;
    
    if (sum === 8 && elapsed >= 450) {
        console.log(`✅ PASS: Returns ${sum} after ${elapsed}ms`);
        testsPassed++;
    } else if (sum !== 8) {
        console.log('❌ FAIL: Expected 8, got:', sum);
        testsFailed++;
    } else {
        console.log('❌ FAIL: Should wait for delay before returning');
        testsFailed++;
    }

    // Test 6: fetchMockUser returns user object
    console.log('\n📋 Test 6: fetchMockUser returns user object after delay');
    console.log('-'.repeat(40));
    
    const userStart = Date.now();
    const user = await fetchMockUser(123);
    const userElapsed = Date.now() - userStart;
    
    if (user && user.id === 123 && user.name === "User_123" && typeof user.timestamp === 'number') {
        if (userElapsed >= 250) {
            console.log('✅ PASS: Returns correct user object after delay');
            testsPassed++;
        } else {
            console.log('⚠️  PARTIAL: Correct object but delay may be too short');
            testsPassed++;
        }
    } else {
        console.log('❌ FAIL: Expected { id: 123, name: "User_123", timestamp: ... }');
        console.log('   Got:', user);
        testsFailed++;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Results: ${testsPassed} passed, ${testsFailed} failed`);
    console.log('='.repeat(60) + '\n');
}

runTests();
