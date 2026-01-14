/**
 * Test Suite for Challenge 3: then/catch/finally
 * Run with: node _3_test_example_then_catch_finally.js
 */

const { simulateDBQuery, processUserData } = require('./_3_example_then_catch_finally.js');

let testsPassed = 0;
let testsFailed = 0;

async function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Testing Challenge 3: .then(), .catch(), .finally()');
    console.log('='.repeat(60) + '\n');

    // Test 1: SELECT query resolves correctly
    console.log('📋 Test 1: SELECT query resolves with data');
    console.log('-'.repeat(40));
    
    try {
        const result = await simulateDBQuery("SELECT * FROM users");
        if (result && Array.isArray(result.data) && result.data.length === 3) {
            console.log('✅ PASS: SELECT returns { data: [...] }');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected { data: ["row1", "row2", "row3"] }');
            console.log('   Got:', result);
            testsFailed++;
        }
    } catch (err) {
        console.log('❌ FAIL: SELECT should resolve, not reject');
        testsFailed++;
    }

    // Test 2: INSERT query resolves correctly
    console.log('\n📋 Test 2: INSERT query resolves with affected count');
    console.log('-'.repeat(40));
    
    try {
        const result = await simulateDBQuery("INSERT INTO users VALUES(...)");
        if (result && result.affected === 1) {
            console.log('✅ PASS: INSERT returns { affected: 1 }');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected { affected: 1 }');
            console.log('   Got:', result);
            testsFailed++;
        }
    } catch (err) {
        console.log('❌ FAIL: INSERT should resolve, not reject');
        testsFailed++;
    }

    // Test 3: Invalid query rejects
    console.log('\n📋 Test 3: Invalid query rejects with error message');
    console.log('-'.repeat(40));
    
    try {
        await simulateDBQuery("DROP TABLE users");
        console.log('❌ FAIL: Invalid query should reject');
        testsFailed++;
    } catch (err) {
        if (err === "Invalid query syntax") {
            console.log('✅ PASS: Invalid query rejects correctly');
            testsPassed++;
        } else {
            console.log('❌ FAIL: Expected "Invalid query syntax"');
            console.log('   Got:', err);
            testsFailed++;
        }
    }

    // Test 4: Valid userId returns transformed user
    console.log('\n📋 Test 4: Valid userId returns user with active:true');
    console.log('-'.repeat(40));
    
    const user = await processUserData(5);
    if (user && user.id === 5 && user.name === "User5" && user.active === true) {
        console.log('✅ PASS: Returns { id: 5, name: "User5", active: true }');
        testsPassed++;
    } else {
        console.log('❌ FAIL: Expected { id: 5, name: "User5", active: true }');
        console.log('   Got:', user);
        testsFailed++;
    }

    // Test 5: Invalid userId (negative) returns default user
    console.log('\n📋 Test 5: Negative userId returns default guest user');
    console.log('-'.repeat(40));
    
    const guest1 = await processUserData(-1);
    if (guest1 && guest1.id === 0 && guest1.name === "Guest" && guest1.active === false) {
        console.log('✅ PASS: Returns default guest user');
        testsPassed++;
    } else {
        console.log('❌ FAIL: Expected { id: 0, name: "Guest", active: false }');
        console.log('   Got:', guest1);
        testsFailed++;
    }

    // Test 6: Invalid userId (string) returns default user
    console.log('\n📋 Test 6: Non-number userId returns default guest user');
    console.log('-'.repeat(40));
    
    const guest2 = await processUserData("abc");
    if (guest2 && guest2.id === 0 && guest2.name === "Guest" && guest2.active === false) {
        console.log('✅ PASS: Returns default guest user for invalid input');
        testsPassed++;
    } else {
        console.log('❌ FAIL: Expected { id: 0, name: "Guest", active: false }');
        console.log('   Got:', guest2);
        testsFailed++;
    }

    // Test 7: Query has delay
    console.log('\n📋 Test 7: simulateDBQuery has ~1 second delay');
    console.log('-'.repeat(40));
    
    const start = Date.now();
    await simulateDBQuery("SELECT test");
    const elapsed = Date.now() - start;
    
    if (elapsed >= 900 && elapsed < 1200) {
        console.log(`✅ PASS: Query took ${elapsed}ms (expected ~1000ms)`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: Query should take ~1 second, took ${elapsed}ms`);
        testsFailed++;
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log(`📊 Results: ${testsPassed} passed, ${testsFailed} failed`);
    console.log('='.repeat(60) + '\n');
}

runTests();
