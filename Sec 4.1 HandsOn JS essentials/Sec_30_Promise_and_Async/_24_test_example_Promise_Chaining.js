/**
 * Test Suite for Challenge 4: Promise Chaining
 * Run with: node _4_test_example_Promise_Chaining.js
 */

const { dataProcessingPipeline, userRegistrationFlow } = require('./_4_example_Promise_Chaining.js');

let testsPassed = 0;
let testsFailed = 0;

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Testing Challenge 4: Promise Chaining');
    console.log('='.repeat(60) + '\n');

    // Test 1: dataProcessingPipeline with mixed numbers
    console.log('📋 Test 1: dataProcessingPipeline processes correctly');
    console.log('-'.repeat(40));
    
    try {
        const result = await dataProcessingPipeline([1, -2, 3, -4, 5]);
        if (result.originalCount === 5 && result.processedCount === 3 && result.sum === 18) {
            console.log('✅ PASS: Correct processing { originalCount: 5, processedCount: 3, sum: 18 }');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected { originalCount: 5, processedCount: 3, sum: 18 }');
            console.log('   Got:', result);
            testsFailed++;
        }
    } catch (err) {
        console.log('❌ FAIL: Should not throw:', err);
        testsFailed++;
    }

    // Test 2: dataProcessingPipeline with all negatives
    console.log('\n📋 Test 2: dataProcessingPipeline with all negative numbers');
    console.log('-'.repeat(40));
    
    try {
        const result = await dataProcessingPipeline([-1, -2, -3]);
        if (result.originalCount === 3 && result.processedCount === 0 && result.sum === 0) {
            console.log('✅ PASS: Handles all negatives correctly');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected { originalCount: 3, processedCount: 0, sum: 0 }');
            console.log('   Got:', result);
            testsFailed++;
        }
    } catch (err) {
        console.log('❌ FAIL: Should not throw:', err);
        testsFailed++;
    }

    // Test 3: dataProcessingPipeline has proper delay
    console.log('\n📋 Test 3: dataProcessingPipeline has cumulative delay');
    console.log('-'.repeat(40));
    
    const start = Date.now();
    await dataProcessingPipeline([1, 2, 3]);
    const elapsed = Date.now() - start;
    
    if (elapsed >= 600) { // At least 600ms for 4 steps × ~200ms
        console.log(`✅ PASS: Pipeline took ${elapsed}ms (expected ~800ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Pipeline should have delays, took only ${elapsed}ms`);
        testsFailed++;
    }

    // Test 4: userRegistrationFlow with valid data
    console.log('\n📋 Test 4: userRegistrationFlow with valid data');
    console.log('-'.repeat(40));
    
    try {
        const user = await userRegistrationFlow({ email: "test@example.com", password: "secret123" });
        if (user && 
            user.email === "test@example.com" && 
            user.hashedPassword === "hashed_secret123" &&
            typeof user.id === 'number' &&
            user.createdAt instanceof Date) {
            console.log('✅ PASS: User created successfully');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Incorrect user object structure');
            console.log('   Got:', user);
            testsFailed++;
        }
    } catch (err) {
        console.log('❌ FAIL: Should create user, not reject:', err);
        testsFailed++;
    }

    // Test 5: userRegistrationFlow rejects invalid email
    console.log('\n📋 Test 5: userRegistrationFlow rejects invalid email');
    console.log('-'.repeat(40));
    
    try {
        await userRegistrationFlow({ email: "invalidemail", password: "secret123" });
        console.log('❌ FAIL: Should reject invalid email');
        testsFailed++;
    } catch (err) {
        if (err === "Invalid email format") {
            console.log('✅ PASS: Correctly rejects invalid email');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected "Invalid email format"');
            console.log('   Got:', err);
            testsFailed++;
        }
    }

    // Test 6: userRegistrationFlow rejects existing email
    console.log('\n📋 Test 6: userRegistrationFlow rejects existing email');
    console.log('-'.repeat(40));
    
    try {
        await userRegistrationFlow({ email: "taken@test.com", password: "secret123" });
        console.log('❌ FAIL: Should reject existing email');
        testsFailed++;
    } catch (err) {
        if (err === "Email already exists") {
            console.log('✅ PASS: Correctly rejects existing email');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected "Email already exists"');
            console.log('   Got:', err);
            testsFailed++;
        }
    }

    // Test 7: userRegistrationFlow rejects short password
    console.log('\n📋 Test 7: userRegistrationFlow rejects short password');
    console.log('-'.repeat(40));
    
    try {
        await userRegistrationFlow({ email: "new@test.com", password: "123" });
        console.log('❌ FAIL: Should reject short password');
        testsFailed++;
    } catch (err) {
        if (err === "Password too short") {
            console.log('✅ PASS: Correctly rejects short password');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected "Password too short"');
            console.log('   Got:', err);
            testsFailed++;
        }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Results: ${testsPassed} passed, ${testsFailed} failed`);
    console.log('='.repeat(60) + '\n');
}

runTests();
