/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 4: Promise Chaining - Sequential Async Operations              ║
 * ║  Topic: Chaining .then() for Sequential Execution                         ║
 * ║  Difficulty: ⭐⭐ Intermediate | Interview Frequency: 🔥🔥🔥🔥            ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT:
 * Each .then() returns a NEW Promise, allowing you to chain operations:
 * 
 * ```javascript
 * fetch(url)
 *   .then(response => response.json())     // Returns Promise<data>
 *   .then(data => processData(data))       // Returns Promise<processed>
 *   .then(processed => saveToDb(processed)) // Returns Promise<result>
 *   .catch(err => handleError(err));       // Catches any error in the chain
 * ```
 * 
 * KEY RULES:
 * 1. Return a value → Next .then() receives that value
 * 2. Return a Promise → Next .then() waits for it and receives its value
 * 3. Throw an error → Jumps to nearest .catch()
 * 
 * 🎯 INTERVIEW TIP:
 * "Promise chaining lets us express sequential async operations linearly,
 *  avoiding deeply nested callbacks (callback hell). Each .then() returns
 *  a new Promise, creating a flat chain of operations."
 */


// =============================================================================
// CHALLENGE: Data Processing Pipeline
// =============================================================================
/**
 * Create a function `dataProcessingPipeline(numbers)` that:
 * 
 * 1. Takes an array of numbers
 * 2. Chains the following transformations (each in a .then()):
 *    Step 1: Filter out negative numbers (after 200ms delay)
 *    Step 2: Double each remaining number (after 200ms delay)
 *    Step 3: Calculate the sum of all numbers (after 200ms delay)
 *    Step 4: Return an object: { originalCount, processedCount, sum }
 * 
 * @param {number[]} numbers - Array of numbers to process
 * @returns {Promise<Object>} { originalCount, processedCount, sum }
 * 
 * Example:
 *   dataProcessingPipeline([1, -2, 3, -4, 5])
 *   // Returns: { originalCount: 5, processedCount: 3, sum: 18 }
 *   // (1, 3, 5 → 2, 6, 10 → sum = 18)
 */

function dataProcessingPipeline(numbers) {
    // ==================== YOUR CODE HERE ====================
    
    // Hint: Start with Promise.resolve(numbers) and chain .then() calls
    // Hint: Use a helper function for delay: 
    //       const delay = (ms, value) => new Promise(r => setTimeout(() => r(value), ms))
    
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: User Registration Flow
// =============================================================================
/**
 * Create a function `userRegistrationFlow(userData)` that simulates:
 * 
 * 1. validateEmail(email) - Returns Promise, resolves after 100ms if email contains "@"
 *                           Rejects with "Invalid email format" otherwise
 * 
 * 2. checkEmailExists(email) - Returns Promise, resolves after 100ms with false (email is new)
 *                              If email is "taken@test.com", reject with "Email already exists"
 * 
 * 3. hashPassword(password) - Returns Promise, resolves after 100ms with "hashed_" + password
 *                             Rejects if password length < 6 with "Password too short"
 * 
 * 4. createUser(email, hashedPassword) - Returns Promise, resolves after 100ms with:
 *                                        { id: Date.now(), email, hashedPassword, createdAt: new Date() }
 * 
 * Chain these operations and return the created user object.
 * 
 * @param {Object} userData - { email: string, password: string }
 * @returns {Promise<Object>} The created user object
 * 
 * Example:
 *   userRegistrationFlow({ email: "test@example.com", password: "secret123" })
 *   // Returns: { id: ..., email: "test@example.com", hashedPassword: "hashed_secret123", createdAt: ... }
 */

function userRegistrationFlow(userData) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    dataProcessingPipeline,
    userRegistrationFlow
};
