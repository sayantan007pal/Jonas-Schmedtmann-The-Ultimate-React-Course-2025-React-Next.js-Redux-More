/**
 * Promises & Async/Await Challenge #9
 * ====================================
 * Topic: Microtask Queue vs Callback Queue
 * 
 * This exercise tests your understanding of the Event Loop,
 * and how Promises (microtasks) are prioritized over setTimeout callbacks.
 */

// =============================================================================
// Task 1: Predict the Output Order
// =============================================================================
/**
 * Create a function demonstrateEventLoop() that:
 * - Collects log messages in an array (don't use console.log directly)
 * - Demonstrates the event loop by scheduling:
 *   1. A synchronous log: "1. Sync"
 *   2. A setTimeout with 0ms delay logging: "2. Timeout"
 *   3. A Promise.resolve().then() logging: "3. Promise"
 *   4. Another synchronous log: "4. Sync End"
 * - Returns a Promise that resolves with the array of logs IN THE ORDER THEY EXECUTE
 * 
 * Expected order: ["1. Sync", "4. Sync End", "3. Promise", "2. Timeout"]
 * 
 * Why? Sync code runs first, then microtasks (Promises), then macrotasks (setTimeout)
 */

function demonstrateEventLoop() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Multiple Microtasks vs Macrotasks
// =============================================================================
/**
 * Create a function compareMicrosAndMacros() that:
 * - Schedules multiple Promises and setTimeouts
 * - Returns a Promise that resolves with an array of execution order
 * 
 * Schedule in this order:
 *   1. setTimeout 0ms: push "Timeout 1"
 *   2. Promise.resolve(): push "Promise 1"
 *   3. setTimeout 0ms: push "Timeout 2"
 *   4. Promise.resolve(): push "Promise 2"
 *   5. Promise.resolve(): push "Promise 3"
 *   6. setTimeout 0ms: push "Timeout 3"
 * 
 * Return the array after all have executed (use a setTimeout to collect results)
 * 
 * Expected order: All Promises before all Timeouts
 * ["Promise 1", "Promise 2", "Promise 3", "Timeout 1", "Timeout 2", "Timeout 3"]
 */

function compareMicrosAndMacros() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Nested Promises and Timeouts
// =============================================================================
/**
 * Create a function nestedAsyncOperations() that:
 * - Demonstrates how nesting affects execution order
 * - Returns a Promise with the execution order array
 * 
 * Schedule:
 *   1. Push "Start"
 *   2. setTimeout 0ms that:
 *      - Pushes "Timeout Outer"
 *      - Has a Promise.resolve().then() that pushes "Promise Inside Timeout"
 *   3. Promise.resolve().then() that:
 *      - Pushes "Promise Outer"
 *      - Has a setTimeout 0ms that pushes "Timeout Inside Promise"
 *   4. Push "End"
 * 
 * Return array after all complete
 * 
 * Expected: ["Start", "End", "Promise Outer", "Timeout Outer", 
 *            "Promise Inside Timeout", "Timeout Inside Promise"]
 */

function nestedAsyncOperations() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    demonstrateEventLoop,
    compareMicrosAndMacros,
    nestedAsyncOperations
};
