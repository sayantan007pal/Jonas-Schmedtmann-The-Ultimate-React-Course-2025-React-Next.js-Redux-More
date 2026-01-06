/**
 * Test Suite for Promises & Async/Await Challenge #19
 * ====================================================
 * Topic: Real-World Async Patterns
 * 
 * Run this file with: node _19_Real_World_Patterns_test_example.js
 */

const {
    createDebouncedFetch,
    createCachedFetch,
    createRequestQueue
} = require('./_19_Real_World_Patterns_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
    console.log('🧪 Testing Challenge #19: Real-World Async Patterns\n');
    console.log('='.repeat(60));

    // Test 1: createDebouncedFetch
    console.log('\n📝 Task 1: createDebouncedFetch()\n');
    
    let fetchCount = 0;
    const mockFetch = async (query) => {
        fetchCount++;
        return `Result for: ${query}`;
    };
    
    const debouncedFetch = createDebouncedFetch(mockFetch, 100);
    
    fetchCount = 0;
    debouncedFetch("a");
    debouncedFetch("ab");
    const debounceResult = await debouncedFetch("abc");
    
    await delay(150);
    assertEqual(fetchCount, 1, 'Only last call is executed');
    assertEqual(debounceResult, "Result for: abc", 'Returns result of last call');

    // Test 2: createCachedFetch
    console.log('\n📝 Task 2: createCachedFetch()\n');
    
    let cacheCallCount = 0;
    const mockCacheFetch = async (url) => {
        cacheCallCount++;
        await delay(50);
        return { url, data: "data", callNumber: cacheCallCount };
    };
    
    const cachedFetch = createCachedFetch(mockCacheFetch, 200);
    
    cacheCallCount = 0;
    const first = await cachedFetch("/api/test");
    const second = await cachedFetch("/api/test");
    
    assertEqual(cacheCallCount, 1, 'Second call uses cache (1 fetch total)');
    assertEqual(first.callNumber, second.callNumber, 'Same data returned');
    
    // Different URL should fetch
    await cachedFetch("/api/other");
    assertEqual(cacheCallCount, 2, 'Different URL triggers new fetch');
    
    // Wait for cache to expire
    await delay(250);
    await cachedFetch("/api/test");
    assertEqual(cacheCallCount, 3, 'Expired cache triggers new fetch');

    // Test 3: createRequestQueue
    console.log('\n📝 Task 3: createRequestQueue()\n');
    
    let concurrent = 0;
    let maxConcurrent = 0;
    
    const slowTask = async (id) => {
        concurrent++;
        maxConcurrent = Math.max(maxConcurrent, concurrent);
        await delay(100);
        concurrent--;
        return `Task ${id} done`;
    };
    
    const queue = createRequestQueue(2);
    
    concurrent = 0;
    maxConcurrent = 0;
    
    const results = await Promise.all([
        queue(() => slowTask(1)),
        queue(() => slowTask(2)),
        queue(() => slowTask(3)),
        queue(() => slowTask(4))
    ]);
    
    assertEqual(maxConcurrent, 2, 'Max 2 concurrent requests');
    assertEqual(results.length, 4, 'All results returned');
    assertTrue(results.every(r => r.includes("done")), 'All tasks completed');

    printSummary();
}

runTests().catch(console.error);
