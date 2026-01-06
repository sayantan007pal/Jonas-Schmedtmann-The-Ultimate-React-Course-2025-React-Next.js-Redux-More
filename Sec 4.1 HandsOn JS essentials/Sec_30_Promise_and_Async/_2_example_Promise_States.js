/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 2: Promise States - Understanding Pending, Fulfilled, Rejected ║
 * ║  Topic: The Three States of a Promise                                      ║
 * ║  Difficulty: ⭐ Beginner | Interview Frequency: 🔥🔥🔥🔥🔥                 ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT:
 * A Promise has exactly THREE states:
 * 
 *   1. PENDING   → Initial state, operation in progress
 *   2. FULFILLED → Operation completed successfully (resolved)
 *   3. REJECTED  → Operation failed (rejected)
 * 
 * Once a Promise is fulfilled or rejected, it is "settled" and CANNOT change!
 * 
 * 🎯 INTERVIEW TIP:
 * "Once a Promise settles, it's immutable - you can't change a fulfilled
 *  Promise to rejected or vice versa. This is crucial for predictable
 *  async behavior."
 * 
 *      ┌─────────────┐         ┌─────────────┐
 *      │  PENDING    │ ──────▶ │  FULFILLED  │
 *      │  (Waiting)  │         └─────────────┘
 *      └──────┬──────┘
 *             │
 *             └──────────────▶ ┌─────────────┐
 *                              │  REJECTED   │
 *                              └─────────────┘
 */


// =============================================================================
// CHALLENGE: Demonstrate Promise States
// =============================================================================
/**
 * Create a function `demonstratePromiseStates()` that returns an object with
 * three promises demonstrating each state:
 * 
 * 1. `pendingPromise`: A Promise that stays pending for 5 seconds
 *    - Should eventually resolve with "Finally resolved!"
 * 
 * 2. `fulfilledPromise`: A Promise that resolves immediately
 *    - Should resolve with "I am fulfilled!"
 * 
 * 3. `rejectedPromise`: A Promise that rejects immediately
 *    - Should reject with "I am rejected!"
 * 
 * @returns {Object} { pendingPromise, fulfilledPromise, rejectedPromise }
 * 
 * Example Usage:
 *   const states = demonstratePromiseStates();
 *   console.log(states.pendingPromise);   // Promise { <pending> }
 *   console.log(states.fulfilledPromise); // Promise { 'I am fulfilled!' }
 *   
 *   states.fulfilledPromise.then(v => console.log(v)); // "I am fulfilled!"
 *   states.rejectedPromise.catch(e => console.log(e)); // "I am rejected!"
 */

function demonstratePromiseStates() {
    // ==================== YOUR CODE HERE ====================
    
    // Hint: Use Promise.resolve() and Promise.reject() for immediate settlement
    // Hint: Use new Promise() with setTimeout for pending state
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Check if Promise is Settled
// =============================================================================
/**
 * Create a function `isPromiseSettled(promise, timeout)` that:
 * 
 * 1. Takes a promise and a timeout in milliseconds
 * 2. Returns a Promise that resolves to an object describing the state:
 *    - If the promise settles within timeout: { settled: true, state: 'fulfilled'/'rejected', value/reason }
 *    - If the promise doesn't settle within timeout: { settled: false, state: 'pending' }
 * 
 * @param {Promise} promise - The promise to check
 * @param {number} timeout - Maximum time to wait in milliseconds
 * @returns {Promise<Object>}
 * 
 * Example:
 *   const quick = Promise.resolve("fast");
 *   const slow = new Promise(r => setTimeout(() => r("slow"), 5000));
 *   
 *   await isPromiseSettled(quick, 100); // { settled: true, state: 'fulfilled', value: 'fast' }
 *   await isPromiseSettled(slow, 100);  // { settled: false, state: 'pending' }
 */

async function isPromiseSettled(promise, timeout) {
    // ==================== YOUR CODE HERE ====================
    
    // Hint: Use Promise.race() with a timeout promise
    // Hint: Use a special symbol or object to identify timeout
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    demonstratePromiseStates,
    isPromiseSettled
};
