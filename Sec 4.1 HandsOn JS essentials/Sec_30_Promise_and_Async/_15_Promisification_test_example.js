/**
 * Test Suite for Promises & Async/Await Challenge #15
 * ====================================================
 * Topic: Promisification - Converting Callbacks to Promises
 * 
 * Run this file with: node _15_Promisification_test_example.js
 */

const {
    readFileCallback,
    getStatsCallback,
    connectDatabaseCallback,
    readFilePromise,
    getStatsPromise,
    promisify
} = require('./_15_Promisification_example.js');

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
    console.log('🧪 Testing Challenge #15: Promisification\n');
    console.log('='.repeat(60));

    // Test 1: readFilePromise
    console.log('\n📝 Task 1: readFilePromise()\n');
    
    const promise1 = readFilePromise("data.txt");
    assertTrue(promise1 instanceof Promise, 'readFilePromise returns a Promise');
    
    const result1a = await readFilePromise("data.txt");
    assertEqual(result1a, "Contents of data.txt", 'Resolves with file contents');
    
    try {
        await readFilePromise("error-file.txt");
        assertTrue(false, 'Should reject for error file');
    } catch (err) {
        assertTrue(err instanceof Error, 'Rejects with Error object');
        assertTrue(err.message.includes("error-file.txt"), 'Error mentions filename');
    }

    // Test 2: getStatsPromise
    console.log('\n📝 Task 2: getStatsPromise()\n');
    
    const promise2 = getStatsPromise(5);
    assertTrue(promise2 instanceof Promise, 'getStatsPromise returns a Promise');
    
    const result2a = await getStatsPromise(5);
    assertDeepEqual(
        result2a,
        { posts: { posts: 50 }, followers: { followers: 500 } },
        'Resolves with combined stats object'
    );
    
    try {
        await getStatsPromise(-1);
        assertTrue(false, 'Should reject for invalid user');
    } catch (err) {
        assertTrue(err instanceof Error, 'Rejects with Error object');
    }

    // Test 3: promisify
    console.log('\n📝 Task 3: promisify()\n');
    
    const connectDb = promisify(connectDatabaseCallback);
    assertTrue(typeof connectDb === 'function', 'promisify returns a function');
    
    const promise3 = connectDb({ host: "localhost" });
    assertTrue(promise3 instanceof Promise, 'Promisified function returns Promise');
    
    const result3a = await connectDb({ host: "localhost" });
    assertDeepEqual(
        result3a,
        { connected: true, host: "localhost" },
        'Promisified function resolves correctly'
    );
    
    try {
        await connectDb({});
        assertTrue(false, 'Should reject for missing host');
    } catch (err) {
        assertTrue(err instanceof Error, 'Rejects with Error object');
        assertTrue(err.message.includes("host") || err.message.includes("Missing"), 'Error mentions host');
    }
    
    // Test promisify with another function
    const readFileAsync = promisify(readFileCallback);
    const result3b = await readFileAsync("test.txt");
    assertEqual(result3b, "Contents of test.txt", 'promisify works with readFileCallback');

    printSummary();
}

runTests().catch(console.error);
