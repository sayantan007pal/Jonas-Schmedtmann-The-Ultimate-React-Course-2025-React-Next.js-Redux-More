/**
 * Promises & Async/Await Challenge #12
 * =====================================
 * Topic: Promise.allSettled() - Wait for All, Handle All
 * 
 * This exercise tests your understanding of Promise.allSettled()
 * which waits for all Promises to settle (resolve OR reject).
 */

// =============================================================================
// Task 1: Basic Promise.allSettled Usage
// =============================================================================
/**
 * Create a function checkAllServices(services) that:
 * - Takes an array of service objects: [{ name: "API", check: Promise }]
 * - Uses Promise.allSettled to wait for all checks
 * - Returns an array of results in format:
 *   { name: [service name], status: "online" | "offline" }
 *   - "online" if the Promise resolved
 *   - "offline" if the Promise rejected
 * 
 * Expected behavior:
 *   const services = [
 *     { name: "API", check: Promise.resolve("OK") },
 *     { name: "Database", check: Promise.reject("Connection failed") },
 *     { name: "Cache", check: Promise.resolve("OK") }
 *   ];
 *   await checkAllServices(services);
 *   // [{ name: "API", status: "online" }, { name: "Database", status: "offline" }, { name: "Cache", status: "online" }]
 */

async function checkAllServices(services) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Batch Processing with Partial Failures
// =============================================================================
/**
 * Create a function processEmails(emails) that:
 * - Simulates sending emails (200ms delay each)
 * - Even-indexed emails succeed, odd-indexed emails fail
 * - Uses Promise.allSettled to process all emails
 * - Returns a summary object:
 *   {
 *     total: [number],
 *     sent: [number of successful],
 *     failed: [number of failed],
 *     results: [array of { email, status: "sent" | "failed" }]
 *   }
 */

async function processEmails(emails) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Compare Promise.all vs Promise.allSettled
// =============================================================================
/**
 * Create two functions that demonstrate the difference:
 * 
 * fetchAllOrNothing(urls) - Uses Promise.all:
 * - If ANY request fails, the whole thing fails
 * - Returns { success: true, data: [...] } or { success: false, error: "..." }
 * 
 * fetchAllResults(urls) - Uses Promise.allSettled:
 * - Always succeeds, collecting all results
 * - Returns { successes: [...], failures: [...] }
 * 
 * Use this helper for both:
 *   simulatedFetch(url) - resolves with { url, data: "Data from " + url } after 100ms
 *                       - rejects if url contains "error"
 */

function simulatedFetch(url) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function fetchAllOrNothing(urls) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function fetchAllResults(urls) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    checkAllServices,
    processEmails,
    simulatedFetch,
    fetchAllOrNothing,
    fetchAllResults
};
