/**
 * Promises & Async/Await Challenge #3
 * ====================================
 * Topic: Using .then() and .catch() for Promise Consumption
 * 
 * This exercise tests your understanding of how to consume Promises
 * using the traditional .then() and .catch() methods.
 */

// =============================================================================
// Task 1: Basic .then() Chain
// =============================================================================
/**
 * Create a function doubleAfterDelay(num) that:
 * - Returns a Promise that resolves with num * 2 after 500ms
 * 
 * Then create a function quadrupleNumber(num) that:
 * - Uses doubleAfterDelay TWICE in a .then() chain
 * - First doubles the number, then doubles the result again
 * - Returns a Promise that resolves with the final value (num * 4)
 * 
 * Expected behavior:
 *   quadrupleNumber(5).then(result => console.log(result));
 *   // After ~1 second: 20
 */

function doubleAfterDelay(num) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

function quadrupleNumber(num) {
    // ==================== YOUR CODE HERE ====================
    // Use doubleAfterDelay and .then() chaining
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Handling Errors with .catch()
// =============================================================================
/**
 * Create a function divideNumbers(a, b) that:
 * - Returns a Promise
 * - If b is 0, reject with "Cannot divide by zero"
 * - Otherwise, resolve with a / b
 * 
 * Then create a function safeDivide(a, b) that:
 * - Calls divideNumbers(a, b)
 * - Uses .catch() to handle the error
 * - Returns a Promise that resolves with the division result
 * - If there's an error, the Promise should resolve with 0 instead (don't re-throw)
 * 
 * Expected behavior:
 *   safeDivide(10, 2).then(r => console.log(r));  // 5
 *   safeDivide(10, 0).then(r => console.log(r));  // 0 (error was caught)
 */

function divideNumbers(a, b) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

function safeDivide(a, b) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Transform Data in .then() Chain
// =============================================================================
/**
 * Create a function processUserData(user) that:
 * - Takes a user object like { firstName: "John", lastName: "Doe", age: 25 }
 * - Returns a Promise
 * - Use a .then() chain to:
 *   1. First, create fullName by combining firstName and lastName
 *   2. Then, create a greeting: "Hello, [fullName]! You are [age] years old."
 *   3. Finally, resolve with the greeting in UPPERCASE
 * 
 * Expected behavior:
 *   processUserData({ firstName: "John", lastName: "Doe", age: 25 })
 *     .then(greeting => console.log(greeting));
 *   // "HELLO, JOHN DOE! YOU ARE 25 YEARS OLD."
 */

function processUserData(user) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    doubleAfterDelay,
    quadrupleNumber,
    divideNumbers,
    safeDivide,
    processUserData
};
