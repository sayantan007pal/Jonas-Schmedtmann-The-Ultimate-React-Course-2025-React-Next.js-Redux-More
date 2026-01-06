/**
 * Test Suite for Challenge 8: Arrow Functions
 * =============================================
 * 
 * Run this file with: node _8_ArrowFunctions_test_example.js
 */

const {
    double,
    isEven,
    getFullName,
    createPerson,
    filterAdults,
    getNames,
    sumAges,
    processOrder,
    createTimer,
    multiplyBy,
    createGreeter,
    compose
} = require('./_8_ArrowFunctions_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
    }
}

function assertType(value, type, testName) {
    if (typeof value === type) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${type}`);
        console.log(`   Actual type:   ${typeof value}`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running Arrow Functions Challenge Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: Implicit Return Arrow Functions
// =========================================================================
console.log('\n📋 TASK 1: Implicit Return Arrow Functions');
console.log('-'.repeat(40));

assertType(double, 'function', 'double is a function');
assertEqual(double(5), 10, 'double(5) returns 10');
assertEqual(double(0), 0, 'double(0) returns 0');
assertEqual(double(-3), -6, 'double(-3) returns -6');

assertType(isEven, 'function', 'isEven is a function');
assertEqual(isEven(4), true, 'isEven(4) returns true');
assertEqual(isEven(5), false, 'isEven(5) returns false');
assertEqual(isEven(0), true, 'isEven(0) returns true');

assertType(getFullName, 'function', 'getFullName is a function');
assertEqual(getFullName("John", "Doe"), "John Doe", 'getFullName combines names');

// =========================================================================
// Task 2 Tests: Arrow Function Object Return
// =========================================================================
console.log('\n📋 TASK 2: Arrow Function Object Return');
console.log('-'.repeat(40));

assertType(createPerson, 'function', 'createPerson is a function');
assertEqual(
    createPerson("John", 25),
    { name: "John", age: 25 },
    'createPerson returns correct object'
);
assertEqual(
    createPerson("Jane", 30),
    { name: "Jane", age: 30 },
    'createPerson works with different values'
);

// =========================================================================
// Task 3 Tests: Arrow Functions as Callbacks
// =========================================================================
console.log('\n📋 TASK 3: Arrow Functions as Callbacks');
console.log('-'.repeat(40));

const testPeople = [
    { name: "John", age: 25 },
    { name: "Jane", age: 17 },
    { name: "Bob", age: 30 },
    { name: "Alice", age: 15 }
];

assertType(filterAdults, 'function', 'filterAdults is a function');
assertEqual(
    filterAdults(testPeople),
    [{ name: "John", age: 25 }, { name: "Bob", age: 30 }],
    'filterAdults returns people 18+'
);

assertType(getNames, 'function', 'getNames is a function');
assertEqual(
    getNames(testPeople),
    ["John", "Jane", "Bob", "Alice"],
    'getNames extracts all names'
);

assertType(sumAges, 'function', 'sumAges is a function');
assertEqual(sumAges(testPeople), 87, 'sumAges returns total of all ages');
assertEqual(sumAges([]), 0, 'sumAges returns 0 for empty array');

// =========================================================================
// Task 4 Tests: Multi-line Arrow Function
// =========================================================================
console.log('\n📋 TASK 4: Multi-line Arrow Function (processOrder)');
console.log('-'.repeat(40));

assertType(processOrder, 'function', 'processOrder is a function');

const orderResult = processOrder([
    { name: "Book", price: 10, quantity: 2 },
    { name: "Pen", price: 2, quantity: 5 }
]);

assertEqual(
    orderResult.items[0].total,
    20,
    'First item total calculated correctly'
);
assertEqual(
    orderResult.items[1].total,
    10,
    'Second item total calculated correctly'
);
assertEqual(
    orderResult.grandTotal,
    30,
    'Grand total is sum of all item totals'
);

// =========================================================================
// Task 5 Tests: createTimer (this binding)
// =========================================================================
console.log('\n📋 TASK 5: createTimer (this binding)');
console.log('-'.repeat(40));

assertType(createTimer, 'function', 'createTimer is a function');

const timer = createTimer();
assertEqual(timer.seconds, 0, 'Timer starts at 0 seconds');
assertType(timer.start, 'function', 'Timer has start method');
assertType(timer.stop, 'function', 'Timer has stop method');

// Quick test - start and immediately stop
timer.start();
timer.stop();
assertEqual(typeof timer.intervalId, 'object', 'intervalId was set');

// =========================================================================
// Task 6 Tests: Higher-Order Arrow Functions
// =========================================================================
console.log('\n📋 TASK 6: Higher-Order Arrow Functions');
console.log('-'.repeat(40));

assertType(multiplyBy, 'function', 'multiplyBy is a function');
const triple = multiplyBy(3);
assertType(triple, 'function', 'multiplyBy returns a function');
assertEqual(triple(4), 12, 'multiplyBy(3)(4) = 12');
assertEqual(multiplyBy(5)(2), 10, 'multiplyBy(5)(2) = 10');

assertType(createGreeter, 'function', 'createGreeter is a function');
const sayHello = createGreeter("Hello");
assertType(sayHello, 'function', 'createGreeter returns a function');
assertEqual(sayHello("John"), "Hello, John!", 'createGreeter("Hello")("John") works');
assertEqual(createGreeter("Hi")("Jane"), "Hi, Jane!", 'createGreeter("Hi")("Jane") works');

assertType(compose, 'function', 'compose is a function');
const addOne = x => x + 1;
const doubleNum = x => x * 2;
const composed = compose(addOne, doubleNum);
assertType(composed, 'function', 'compose returns a function');
assertEqual(composed(3), 7, 'compose(addOne, double)(3) = (3*2)+1 = 7');
assertEqual(compose(doubleNum, addOne)(3), 8, 'compose(double, addOne)(3) = (3+1)*2 = 8');

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You mastered Arrow Functions!\n');
} else {
    console.log('💪 Keep working! Remember: () => value for implicit return\n');
}
