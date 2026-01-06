/**
 * Promises & Async/Await Challenge #7
 * ====================================
 * Topic: Error Handling with try/catch in async Functions
 * 
 * This exercise tests your understanding of how to handle errors
 * in async functions using try/catch blocks.
 */

// =============================================================================
// Task 1: Basic try/catch in async Function
// =============================================================================
/**
 * Create an async function safeFetch(shouldSucceed) that:
 * - Simulates a fetch operation (300ms delay)
 * - If shouldSucceed is true, return "Data retrieved successfully"
 * - If shouldSucceed is false, throw an Error with message "Network error"
 * 
 * Then create an async function fetchWithErrorHandling(shouldSucceed) that:
 * - Calls safeFetch inside a try block
 * - If successful, returns { success: true, data: [result] }
 * - If error, catches it and returns { success: false, error: [error message] }
 * 
 * Expected behavior:
 *   await fetchWithErrorHandling(true);  // { success: true, data: "Data retrieved successfully" }
 *   await fetchWithErrorHandling(false); // { success: false, error: "Network error" }
 */

async function safeFetch(shouldSucceed) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function fetchWithErrorHandling(shouldSucceed) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Multiple Operations with Error Recovery
// =============================================================================
/**
 * Create an async function processUserData(userData) that:
 * - userData is an object that might have: { name, email, age }
 * - Step 1: Validate name exists and is non-empty (throw "Invalid name" if not)
 * - Step 2: Validate email contains "@" (throw "Invalid email" if not)
 * - Step 3: Validate age is >= 18 (throw "Must be 18 or older" if not)
 * - If all validations pass, return "User [name] registered successfully"
 * 
 * Then create processUserSafely(userData) that:
 * - Wraps processUserData in try/catch
 * - On success: returns { registered: true, message: [result] }
 * - On error: returns { registered: false, error: [error message] }
 */

async function processUserData(userData) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function processUserSafely(userData) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Retrying Failed Operations
// =============================================================================
/**
 * Create an async function unreliableOperation() that:
 * - Has a 70% chance of throwing "Operation failed"
 * - Has a 30% chance of returning "Operation succeeded"
 * - Simulate with 100ms delay
 * 
 * Then create async function retryOperation(maxRetries) that:
 * - Attempts unreliableOperation up to maxRetries times
 * - If any attempt succeeds, return { success: true, attempts: [number of attempts] }
 * - If all attempts fail, return { success: false, attempts: maxRetries }
 * - Use try/catch inside a loop
 */

async function unreliableOperation() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function retryOperation(maxRetries) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    safeFetch,
    fetchWithErrorHandling,
    processUserData,
    processUserSafely,
    unreliableOperation,
    retryOperation
};
