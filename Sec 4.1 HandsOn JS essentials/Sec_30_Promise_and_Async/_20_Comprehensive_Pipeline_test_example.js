/**
 * Test Suite for Promises & Async/Await Challenge #20
 * ====================================================
 * Topic: Comprehensive Async Pipeline - Final Challenge
 * 
 * Run this file with: node _20_Comprehensive_Pipeline_test_example.js
 */

const {
    fetchUser,
    fetchDepartment,
    fetchUserTasks,
    generateComprehensiveReport,
    withRetry,
    processWithLimit
} = require('./_20_Comprehensive_Pipeline_example.js');

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
        console.log('🎉 ALL TESTS PASSED! CONGRATULATIONS! 🎊');
        console.log('You have mastered Promises and async/await!');
    } else {
        console.log(`⚠️  ${testsFailed} test(s) failed. Keep trying!`);
    }
    console.log('='.repeat(60));
}

// =============================================================================
// Tests
// =============================================================================

async function runTests() {
    console.log('🧪 Testing Challenge #20: Comprehensive Async Pipeline\n');
    console.log('='.repeat(60));
    console.log('🏆 FINAL CHALLENGE - Combining Everything!\n');

    // Test the base functions first
    console.log('📝 Verifying base functions...\n');
    
    const user = await fetchUser(1);
    assertEqual(user.name, "Alice", 'fetchUser works');
    
    const dept = await fetchDepartment(1);
    assertEqual(dept.name, "Engineering", 'fetchDepartment works');
    
    const tasks = await fetchUserTasks(1);
    assertEqual(tasks.length, 2, 'fetchUserTasks works');

    // Test the main challenge
    console.log('\n📝 Testing generateComprehensiveReport()\n');
    
    const startTime = Date.now();
    const report = await generateComprehensiveReport([1, 2, 3, 99]); // 99 doesn't exist
    const elapsed = Date.now() - startTime;
    
    // Check structure
    assertTrue(report.generatedAt !== undefined, 'Report has generatedAt timestamp');
    assertTrue(typeof report.totalUsers === 'number', 'Report has totalUsers count');
    assertTrue(Array.isArray(report.users), 'Report has users array');
    assertTrue(Array.isArray(report.errors), 'Report has errors array');
    assertTrue(report.departmentSummary !== undefined, 'Report has departmentSummary');
    
    // Check user count (3 valid users)
    assertEqual(report.totalUsers, 3, 'Total users is 3 (excluding invalid)');
    assertEqual(report.users.length, 3, 'Users array has 3 entries');
    
    // Check error handling
    assertEqual(report.errors.length, 1, 'Errors array has 1 entry (user 99)');
    assertTrue(report.errors[0].userId === 99, 'Error references user 99');
    
    // Check user structure
    const alice = report.users.find(u => u.name === "Alice");
    assertTrue(alice !== undefined, 'Alice is in the report');
    assertTrue(alice.department !== undefined, 'Alice has department');
    assertEqual(alice.department.name, "Engineering", 'Alice is in Engineering');
    assertTrue(alice.tasks !== undefined, 'Alice has tasks');
    assertTrue(alice.stats !== undefined, 'Alice has stats');
    
    // Check stats calculation
    assertEqual(alice.stats.completedTasks, 1, 'Alice has 1 completed task');
    assertEqual(alice.stats.pendingTasks, 1, 'Alice has 1 pending task');
    assertEqual(alice.stats.completionRate, 50, 'Alice has 50% completion rate');
    
    // Check department summary
    const engSummary = report.departmentSummary["Engineering"];
    assertTrue(engSummary !== undefined, 'Engineering in department summary');
    assertEqual(engSummary.userCount, 2, 'Engineering has 2 users');
    
    // Check performance (should use parallel processing)
    assertTrue(elapsed < 500, `Should be fast with parallelism (actual: ${elapsed}ms)`);
    
    console.log('\n📝 Testing Bonus Challenges...\n');
    
    // Test withRetry if implemented
    if (withRetry) {
        let attempts = 0;
        const flakyFn = async () => {
            attempts++;
            if (attempts < 3) throw new Error("Flaky!");
            return "Success!";
        };
        
        try {
            attempts = 0;
            const retryResult = await withRetry(flakyFn, 5, 10);
            assertEqual(retryResult, "Success!", 'withRetry eventually succeeds');
            assertEqual(attempts, 3, 'withRetry took 3 attempts');
        } catch (e) {
            console.log('   ℹ️  withRetry bonus not implemented yet');
        }
    }
    
    // Test processWithLimit if implemented
    if (processWithLimit) {
        let concurrent = 0;
        let maxConcurrent = 0;
        
        const limitedTask = async (item) => {
            concurrent++;
            maxConcurrent = Math.max(maxConcurrent, concurrent);
            await delay(50);
            concurrent--;
            return item * 2;
        };
        
        try {
            const limitResults = await processWithLimit([1, 2, 3, 4, 5], limitedTask, 2);
            assertEqual(maxConcurrent, 2, 'processWithLimit respects concurrency limit');
            assertEqual(limitResults.length, 5, 'processWithLimit returns all results');
        } catch (e) {
            console.log('   ℹ️  processWithLimit bonus not implemented yet');
        }
    }

    printSummary();
}

runTests().catch(console.error);
