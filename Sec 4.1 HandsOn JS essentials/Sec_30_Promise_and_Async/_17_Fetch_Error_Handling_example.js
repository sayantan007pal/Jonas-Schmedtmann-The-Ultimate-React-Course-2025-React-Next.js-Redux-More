/**
 * Promises & Async/Await Challenge #17
 * =====================================
 * Topic: Advanced Fetch Error Handling
 * 
 * This exercise tests comprehensive error handling strategies
 * when working with fetch/HTTP requests.
 */

// =============================================================================
// Simulated Fetch (for Node.js testing)
// =============================================================================
function simulatedFetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (url.includes("network-error")) {
                reject(new Error("Network request failed"));
            } else if (url.includes("500")) {
                resolve({ ok: false, status: 500, statusText: "Internal Server Error", json: () => Promise.resolve({ error: "Server error" }) });
            } else if (url.includes("404")) {
                resolve({ ok: false, status: 404, statusText: "Not Found", json: () => Promise.resolve({ error: "Not found" }) });
            } else if (url.includes("401")) {
                resolve({ ok: false, status: 401, statusText: "Unauthorized", json: () => Promise.resolve({ error: "Unauthorized" }) });
            } else if (url.includes("invalid-json")) {
                resolve({ ok: true, status: 200, json: () => Promise.reject(new Error("Invalid JSON")) });
            } else {
                resolve({ ok: true, status: 200, json: () => Promise.resolve({ data: "Success data from " + url }) });
            }
        }, 100);
    });
}


// =============================================================================
// Task 1: Comprehensive Error Handler
// =============================================================================
/**
 * Create an async function robustFetch(url) that:
 * - Uses simulatedFetch to make the request
 * - Handles these error cases:
 *   1. Network errors (fetch itself throws)
 *   2. HTTP error status codes (!response.ok)
 *   3. JSON parsing errors
 * - Returns an object:
 *   On success: { success: true, data: [parsed JSON] }
 *   On network error: { success: false, errorType: "NETWORK", message: [error message] }
 *   On HTTP error: { success: false, errorType: "HTTP", status: [status code], message: [statusText] }
 *   On JSON error: { success: false, errorType: "PARSE", message: "Failed to parse response" }
 */

async function robustFetch(url) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Retry with Exponential Backoff
// =============================================================================
/**
 * Create an async function fetchWithRetry(url, maxRetries = 3) that:
 * - Attempts to fetch the URL
 * - If it fails with a network or 5xx error, retry
 * - Use exponential backoff: wait 100ms, then 200ms, then 400ms, etc.
 * - Don't retry for 4xx errors (client errors)
 * - Returns: { success: true, data: [...], attempts: [number] }
 *         or: { success: false, error: [...], attempts: [number] }
 * 
 * Helper: Create a delay function
 */

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, maxRetries = 3) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Request Timeout Wrapper
// =============================================================================
/**
 * Create an async function fetchWithTimeout(url, timeoutMs = 5000) that:
 * - Races the fetch against a timeout
 * - Returns: { success: true, data: [...] } on success
 * - Returns: { success: false, errorType: "TIMEOUT", message: "Request timed out" } on timeout
 * - Returns: { success: false, errorType: "FETCH", message: [...] } on fetch error
 * 
 * Use Promise.race() to implement the timeout
 */

async function fetchWithTimeout(url, timeoutMs = 5000) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    simulatedFetch,
    robustFetch,
    delay,
    fetchWithRetry,
    fetchWithTimeout
};
