/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 1: Promise Creation - Building Your First Promise              ║
 * ║  Topic: Creating Promises with new Promise(), resolve(), reject()         ║
 * ║  Difficulty: ⭐ Beginner | Interview Frequency: 🔥🔥🔥🔥🔥                 ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT:
 * A Promise is created using the `new Promise()` constructor. It takes an
 * executor function with two parameters:
 *   - resolve(value): Call this when the operation succeeds
 *   - reject(error): Call this when the operation fails
 * 
 * 🎯 INTERVIEW TIP:
 * "A Promise is an object representing the eventual completion or failure
 *  of an asynchronous operation. It's like a restaurant buzzer - you get
 *  the buzzer (Promise) immediately, but the pizza (data) comes later."
 */


// =============================================================================
// CHALLENGE: Create a Promise that Simulates a Coin Flip
// =============================================================================
/**
 * Create a function `coinFlip()` that:
 * 
 * 1. Returns a new Promise
 * 2. Uses Math.random() to simulate a 50/50 coin flip
 * 3. After 1 second (use setTimeout):
 *    - If random >= 0.5: resolve with "Heads! 🪙"
 *    - If random < 0.5: reject with "Tails! 💀"
 * 
 * @returns {Promise<string>} A promise that resolves with "Heads! 🪙" or rejects with "Tails! 💀"
 * 
 * Example Usage:
 *   coinFlip()
 *     .then(result => console.log("You win:", result))
 *     .catch(error => console.log("You lose:", error));
 * 
 * Expected Behavior:
 *   - Promise resolves after 1 second with "Heads! 🪙" (50% chance)
 *   - Promise rejects after 1 second with "Tails! 💀" (50% chance)
 */

function coinFlip() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// BONUS CHALLENGE: Create a Deterministic Promise
// =============================================================================
/**
 * Create a function `createDelayedPromise(shouldSucceed, delay, message)` that:
 * 
 * 1. Returns a new Promise
 * 2. After `delay` milliseconds:
 *    - If shouldSucceed is true: resolve with `message`
 *    - If shouldSucceed is false: reject with `message`
 * 
 * @param {boolean} shouldSucceed - Whether the promise should resolve or reject
 * @param {number} delay - Delay in milliseconds before settling
 * @param {string} message - Message to resolve/reject with
 * @returns {Promise<string>}
 * 
 * Example Usage:
 *   createDelayedPromise(true, 500, "Success!").then(console.log);  // "Success!" after 500ms
 *   createDelayedPromise(false, 500, "Failed!").catch(console.log); // "Failed!" after 500ms
 */

function createDelayedPromise(shouldSucceed, delay, message) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    coinFlip,
    createDelayedPromise
};
