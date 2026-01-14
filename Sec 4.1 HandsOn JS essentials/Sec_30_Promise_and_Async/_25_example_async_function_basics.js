/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 5: Async Function Basics - The Modern Way                      ║
 * ║  Topic: async Keyword and Function Declaration                            ║
 * ║  Difficulty: ⭐⭐ Intermediate | Interview Frequency: 🔥🔥🔥🔥🔥           ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT:
 * The `async` keyword before a function does TWO things:
 * 
 *   1. ALWAYS makes the function return a Promise
 *   2. Allows you to use `await` inside it
 * 
 * ```javascript
 * async function greet() {
 *     return "Hello";  // You return a string...
 * }
 * 
 * greet();  // ...but you GET a Promise! → Promise { 'Hello' }
 * greet().then(msg => console.log(msg));  // "Hello"
 * ```
 * 
 * DIFFERENT WAYS TO DECLARE ASYNC FUNCTIONS:
 * 
 * 1. Async Function Declaration
 *    async function fetchData() { ... }
 * 
 * 2. Async Function Expression
 *    const fetchData = async function() { ... }
 * 
 * 3. Async Arrow Function
 *    const fetchData = async () => { ... }
 * 
 * 4. Async Method in Object
 *    const obj = { async getData() { ... } }
 * 
 * 5. Async Method in Class
 *    class API { async fetch() { ... } }
 * 
 * 🎯 INTERVIEW TIP:
 * "An async function is syntactic sugar that wraps the return value in
 *  Promise.resolve(). Even if you return a plain value like 42, the
 *  caller receives Promise { 42 }."
 */


// =============================================================================
// CHALLENGE: Convert Regular Functions to Async
// =============================================================================
/**
 * Convert each of these patterns to async functions that return specific values.
 * Each async function should return the specified value (which will be wrapped in a Promise).
 */

/**
 * Task 1: Create an async function declaration called `getGreeting`
 * that returns "Hello, World!"
 */

// ==================== YOUR CODE HERE ====================

// ========================================================


/**
 * Task 2: Create an async function expression called `getNumber`
 * that returns 42
 */

// ==================== YOUR CODE HERE ====================

// ========================================================


/**
 * Task 3: Create an async arrow function called `getArray`
 * that returns [1, 2, 3]
 */

// ==================== YOUR CODE HERE ====================

// ========================================================


/**
 * Task 4: Create an object called `dataService` with an async method `fetch`
 * that returns { status: "success", data: "sample data" }
 */

// ==================== YOUR CODE HERE ====================

// ========================================================


// =============================================================================
// CHALLENGE: Async Function That Simulates Delay
// =============================================================================
/**
 * Create an async function `delayedCalculation(a, b, delay)` that:
 * 
 * 1. Waits for `delay` milliseconds
 * 2. Returns the sum of a + b
 * 
 * Hint: Create a helper that returns a Promise that resolves after delay
 * 
 * @param {number} a - First number
 * @param {number} b - Second number
 * @param {number} delay - Delay in milliseconds
 * @returns {Promise<number>} Sum of a and b
 * 
 * Example:
 *   await delayedCalculation(5, 3, 1000);  // Returns 8 after 1 second
 */

async function delayedCalculation(a, b, delay) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Async Function Returning Another Promise
// =============================================================================
/**
 * Create an async function `fetchMockUser(userId)` that:
 * 
 * 1. Returns a Promise that resolves after 300ms
 * 2. Resolves with: { id: userId, name: "User_" + userId, timestamp: Date.now() }
 * 
 * This demonstrates that async functions can return Promises,
 * and the outer Promise (from async) will "unwrap" the inner Promise.
 * 
 * @param {number} userId - The user ID
 * @returns {Promise<Object>} User object
 */

async function fetchMockUser(userId) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    getGreeting: typeof getGreeting !== 'undefined' ? getGreeting : undefined,
    getNumber: typeof getNumber !== 'undefined' ? getNumber : undefined,
    getArray: typeof getArray !== 'undefined' ? getArray : undefined,
    dataService: typeof dataService !== 'undefined' ? dataService : undefined,
    delayedCalculation,
    fetchMockUser
};
