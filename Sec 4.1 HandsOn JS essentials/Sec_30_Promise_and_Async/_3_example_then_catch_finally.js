/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 3: Consuming Promises with .then(), .catch(), .finally()       ║
 * ║  Topic: Promise Consumption Methods                                        ║
 * ║  Difficulty: ⭐ Beginner | Interview Frequency: 🔥🔥🔥🔥🔥                 ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT:
 * Promises are consumed using three methods:
 * 
 *   .then(onFulfilled)  → Runs when Promise RESOLVES (success)
 *   .catch(onRejected)  → Runs when Promise REJECTS (error)
 *   .finally(onFinally) → Runs ALWAYS, regardless of outcome
 * 
 * ```javascript
 * promise
 *   .then(data => console.log("Success:", data))   // Only if resolved
 *   .catch(err => console.log("Error:", err))      // Only if rejected
 *   .finally(() => console.log("Cleanup done"));   // Always runs
 * ```
 * 
 * 🎯 INTERVIEW TIP:
 * ".finally() is perfect for cleanup operations like hiding loading spinners,
 *  closing database connections, or resetting state - things that should
 *  happen whether the operation succeeded or failed."
 */


// =============================================================================
// CHALLENGE: Simulate a Database Query
// =============================================================================
/**
 * Create a function `simulateDBQuery(query)` that:
 * 
 * 1. Returns a Promise
 * 2. After 1 second:
 *    - If query includes "SELECT": resolve with { data: ["row1", "row2", "row3"] }
 *    - If query includes "INSERT": resolve with { affected: 1 }
 *    - Otherwise: reject with "Invalid query syntax"
 * 
 * @param {string} query - The SQL-like query string
 * @returns {Promise<Object>}
 * 
 * Example:
 *   simulateDBQuery("SELECT * FROM users")
 *     .then(result => console.log(result))   // { data: ["row1", "row2", "row3"] }
 *     .catch(err => console.log(err))
 *     .finally(() => console.log("Query completed"));
 */

function simulateDBQuery(query) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Process Data with Proper Error Handling
// =============================================================================
/**
 * Create a function `processUserData(userId)` that:
 * 
 * 1. Simulates fetching user data (resolve after 500ms with { id: userId, name: "User" + userId })
 * 2. But if userId is less than 1 or not a number, reject with "Invalid user ID"
 * 3. Uses .then() to transform the data by adding an `active: true` property
 * 4. Uses .catch() to return a default user: { id: 0, name: "Guest", active: false }
 * 5. Uses .finally() to log "Fetch attempt completed" (use console.log)
 * 
 * @param {number} userId - The user ID to fetch
 * @returns {Promise<Object>} The user object (either real or default)
 * 
 * Expected behavior:
 *   processUserData(5)  → { id: 5, name: "User5", active: true }
 *   processUserData(-1) → { id: 0, name: "Guest", active: false }
 *   processUserData("abc") → { id: 0, name: "Guest", active: false }
 */

function processUserData(userId) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    simulateDBQuery,
    processUserData
};
