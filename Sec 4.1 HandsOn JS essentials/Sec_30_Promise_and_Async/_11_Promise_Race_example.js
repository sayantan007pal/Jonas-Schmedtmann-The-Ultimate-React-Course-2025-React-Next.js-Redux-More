/**
 * Promises & Async/Await Challenge #11
 * =====================================
 * Topic: Promise.race() - First to Finish Wins
 * 
 * This exercise tests your understanding of Promise.race()
 * which resolves/rejects with the first Promise to settle.
 */

// =============================================================================
// Task 1: Basic Promise.race Usage
// =============================================================================
/**
 * Create a function raceToFinish(promises) that:
 * - Takes an array of Promises
 * - Uses Promise.race to return the first Promise to settle
 * - Returns the result of the winning Promise
 * 
 * Example usage:
 *   const fast = new Promise(resolve => setTimeout(() => resolve("Fast"), 100));
 *   const slow = new Promise(resolve => setTimeout(() => resolve("Slow"), 500));
 *   await raceToFinish([fast, slow]); // "Fast"
 */

function raceToFinish(promises) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Timeout with Promise.race
// =============================================================================
/**
 * Create a function createTimeout(ms) that:
 * - Returns a Promise that rejects after ms milliseconds
 * - Rejects with the message "Operation timed out after [ms]ms"
 * 
 * Create a function fetchWithTimeout(fetchPromise, timeoutMs) that:
 * - Uses Promise.race to race the fetchPromise against a timeout
 * - If fetch wins, returns the fetch result
 * - If timeout wins, the rejection bubbles up
 * 
 * Expected behavior:
 *   const slowFetch = new Promise(resolve => setTimeout(() => resolve("data"), 1000));
 *   await fetchWithTimeout(slowFetch, 500);  // Rejects: "Operation timed out after 500ms"
 *   
 *   const fastFetch = new Promise(resolve => setTimeout(() => resolve("data"), 100));
 *   await fetchWithTimeout(fastFetch, 500);  // Resolves: "data"
 */

function createTimeout(ms) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

function fetchWithTimeout(fetchPromise, timeoutMs) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: First Successful Response
// =============================================================================
/**
 * Create a function raceServers(serverUrls) that:
 * - Simulates fetching from multiple servers
 * - Each "fetch" takes a random time between 100-500ms
 * - Use Promise.race to return the first response
 * - Return format: { server: [url], responseTime: [time in ms] }
 * 
 * Helper: Create fetchFromServer(url) that simulates the fetch
 * 
 * Expected behavior:
 *   const result = await raceServers(["server1.com", "server2.com", "server3.com"]);
 *   // Returns whichever server responds first
 *   // { server: "server2.com", responseTime: 150 }
 */

function fetchFromServer(url) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

function raceServers(serverUrls) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    raceToFinish,
    createTimeout,
    fetchWithTimeout,
    fetchFromServer,
    raceServers
};
