/**
 * Promises & Async/Await Challenge #5
 * ====================================
 * Topic: async Function Basics
 * 
 * This exercise tests your understanding of async functions
 * and how they always return Promises.
 */

// =============================================================================
// Task 1: Basic async Function
// =============================================================================
/**
 * Create an async function greetUser(name) that:
 * - Returns the string "Hello, [name]!"
 * - Remember: async functions ALWAYS return a Promise!
 * 
 * Expected behavior:
 *   greetUser("Alice").then(msg => console.log(msg));
 *   // "Hello, Alice!"
 *   
 *   const result = greetUser("Bob");
 *   console.log(result); // Promise { 'Hello, Bob!' }
 */

async function greetUser(name) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: async Function with Delay
// =============================================================================
/**
 * Create an async function fetchUserById(id) that:
 * - Simulates fetching a user from a database
 * - Waits for 500ms (use a helper Promise with setTimeout)
 * - Returns an object: { id: id, name: "User_" + id, email: "user" + id + "@example.com" }
 * 
 * Expected behavior:
 *   const user = await fetchUserById(42);
 *   console.log(user);
 *   // { id: 42, name: "User_42", email: "user42@example.com" }
 */

async function fetchUserById(id) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: async Function Returning Computed Value
// =============================================================================
/**
 * Create an async function calculateSum(numbers) that:
 * - Takes an array of numbers
 * - Simulates a "heavy computation" by waiting 300ms
 * - Returns the sum of all numbers in the array
 * 
 * Expected behavior:
 *   const sum = await calculateSum([1, 2, 3, 4, 5]);
 *   console.log(sum); // 15
 */

async function calculateSum(numbers) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Verify async Functions Return Promises
// =============================================================================
/**
 * Create a regular function isAsyncFunction(fn) that:
 * - Takes a function as an argument
 * - Calls the function with no arguments
 * - Returns true if the function returns a Promise
 * - Returns false otherwise
 * 
 * Expected behavior:
 *   isAsyncFunction(greetUser);     // true
 *   isAsyncFunction(() => 42);       // false
 *   isAsyncFunction(async () => {}); // true
 */

function isAsyncFunction(fn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    greetUser,
    fetchUserById,
    calculateSum,
    isAsyncFunction
};
