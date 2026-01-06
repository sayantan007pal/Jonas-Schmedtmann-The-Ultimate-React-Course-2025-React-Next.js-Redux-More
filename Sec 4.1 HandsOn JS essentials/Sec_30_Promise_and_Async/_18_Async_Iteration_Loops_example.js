/**
 * Promises & Async/Await Challenge #18
 * =====================================
 * Topic: Async Iteration and Loops
 * 
 * This exercise tests proper handling of async operations
 * within different types of loops.
 */

// =============================================================================
// Helper Functions
// =============================================================================
function delay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

async function fetchItem(id) {
    await delay(100);
    return { id, name: `Item ${id}`, fetched: true };
}


// =============================================================================
// Task 1: for...of Loop with await
// =============================================================================
/**
 * Create an async function fetchItemsSequentially(ids) that:
 * - Takes an array of IDs
 * - Uses a for...of loop to fetch each item ONE AT A TIME
 * - Returns array of fetched items
 * 
 * Expected: Takes 100ms per item (sequential)
 */

async function fetchItemsSequentially(ids) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: forEach DOES NOT work with await (demonstrate this)
// =============================================================================
/**
 * Create a function demonstrateForEachProblem(ids) that:
 * - Uses forEach with async callback
 * - Pushes fetched items to an array
 * - Returns the array IMMEDIATELY after forEach
 * 
 * This demonstrates that forEach doesn't wait for async callbacks!
 * The returned array will likely be empty or incomplete.
 * 
 * NOTE: This is showing what NOT to do - the array will be empty!
 */

function demonstrateForEachProblem(ids) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: map + Promise.all (Correct Parallel Approach)
// =============================================================================
/**
 * Create an async function fetchItemsParallel(ids) that:
 * - Uses map to create an array of Promises
 * - Uses Promise.all to wait for all of them
 * - Returns array of fetched items
 * 
 * Expected: Takes ~100ms total regardless of array size (parallel)
 */

async function fetchItemsParallel(ids) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Reduce with async (Sequential with Accumulator)
// =============================================================================
/**
 * Create an async function processWithRunningTotal(numbers) that:
 * - Takes an array of numbers
 * - Processes each number sequentially (100ms delay)
 * - Doubles each number and adds to running total
 * - Returns { values: [doubled values], total: [sum of doubled values] }
 * 
 * Use reduce with an async callback (chain promises)
 * 
 * Example:
 *   processWithRunningTotal([1, 2, 3])
 *   // { values: [2, 4, 6], total: 12 }
 */

async function processWithRunningTotal(numbers) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    delay,
    fetchItem,
    fetchItemsSequentially,
    demonstrateForEachProblem,
    fetchItemsParallel,
    processWithRunningTotal
};
