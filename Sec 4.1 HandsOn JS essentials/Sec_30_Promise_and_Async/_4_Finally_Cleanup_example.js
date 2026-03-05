/**
 * Promises & Async/Await Challenge #4
 * ====================================
 * Topic: Using .finally() for Cleanup
 * 
 * This exercise tests your understanding of the .finally() method
 * which runs regardless of whether the Promise resolves or rejects.
 */

// =============================================================================
// Task 1: Basic .finally() Usage
// =============================================================================
/**
 * Create a function fetchWithLogging(shouldSucceed) that:
 * - Simulates a fetch operation
 * - Uses a shared variable `isLoading` that starts as true
 * - After 500ms:
 *   - If shouldSucceed is true, resolve with "Data fetched successfully"
 *   - If shouldSucceed is false, reject with "Fetch failed"
 * - Use .finally() to set isLoading to false
 * - Return an object { promise, getLoadingState }
 *   - promise: the Promise chain with .finally()
 *   - getLoadingState: a function that returns the current isLoading value
 * 
 * Expected behavior:
 *   const { promise, getLoadingState } = fetchWithLogging(true);
 *   console.log(getLoadingState()); // true (loading)
 *   await promise;
 *   console.log(getLoadingState()); // false (loading complete)
 */

function fetchWithLogging(shouldSucceed) {
    // ==================== YOUR CODE HERE ====================
    let isLoading = true;
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) resolve("Data fetched successfully");
            else reject("Fetch failed");
        }, 500);
    }).finally(() => {
        isLoading = false;
    });
    
    return {
        promise,
        getLoadingState: () => isLoading
    };
    // ========================================================
}


// =============================================================================
// Task 2: Cleanup with .finally()
// =============================================================================
/**
 * Create a function connectToDatabase(shouldConnect) that:
 * - Simulates a database connection
 * - Keeps track of connection state in a variable
 * - After 300ms:
 *   - If shouldConnect is true, resolve with "Connected to database"
 *   - If shouldConnect is false, reject with "Connection failed"
 * - Use .finally() to log "Cleanup: closing temporary resources"
 * - Return an object { promise, connectionAttempted }
 *   - promise: the full Promise chain
 *   - connectionAttempted: will be set to true after the promise settles
 * 
 * NOTE: For testing purposes, store messages in an array called `logs`
 * and include a getLogs() function in the returned object.
 */

function connectToDatabase(shouldConnect) {
    // ==================== YOUR CODE HERE ====================
        const logs = []

    const val = new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(shouldConnect) resolve (`Connected to database`)
            else reject (`Connection failed`)
        }, 300);
    }).finally(()=>{
        logs.push(`Cleanup: closing temporary resources`)
    })
    return {
        promise: val,
        connectionAttempted: true,
        getLogs: () => logs
    }
    
    // ========================================================
}


// =============================================================================
// Task 3: Full Promise Chain with .then(), .catch(), .finally()
// =============================================================================
/**
 * Create a function processOrder(orderId) that:
 * - Returns an object { promise, getStatus }
 * - The promise should:
 *   - After 200ms, check if orderId is valid (orderId > 0)
 *   - If valid, resolve with "Order #[orderId] processed"
 *   - If invalid (orderId <= 0), reject with "Invalid order ID"
 * - Use .then() to add " - Confirmation sent" to the success message
 * - Use .catch() to transform error to "Error: [original error message]"
 * - Use .finally() to set status to "complete"
 * - getStatus() should return the current status ("pending" initially, "complete" after)
 * 
 * Expected behavior:
 *   const { promise, getStatus } = processOrder(123);
 *   console.log(getStatus()); // "pending"
 *   const result = await promise;
 *   console.log(result); // "Order #123 processed - Confirmation sent"
 *   console.log(getStatus()); // "complete"
 */

function processOrder(orderId) {
    // ==================== YOUR CODE HERE ====================
    let status = "pending";
    let promise = new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(orderId<=0){
                reject(`Invalid order ID`)
            }
            else{
                resolve(`Order #${orderId} processed`)

            }
        }, 200);
    }).then((result) => {
        return result + " - Confirmation sent";
    }).catch((err)=>{
        return `Error: ${err}`;
    }).finally(()=>{
        status = "complete";
    })
    
    return {
        promise,
        getStatus: () => status
    }
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    fetchWithLogging,
    connectToDatabase,
    processOrder
};
