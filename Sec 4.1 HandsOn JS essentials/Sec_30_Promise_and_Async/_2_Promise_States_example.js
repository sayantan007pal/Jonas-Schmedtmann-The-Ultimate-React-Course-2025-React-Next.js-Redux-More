/**
 * Promises & Async/Await Challenge #2
 * ====================================
 * Topic: Promise States (Pending, Fulfilled, Rejected)
 * 
 * This exercise tests your understanding of the three Promise states
 * and how to work with them.
 */

// =============================================================================
// Task 1: Immediate Resolution
// =============================================================================
/**
 * Create a function getImmediatelyResolved() that:
 * - Returns a Promise that is IMMEDIATELY resolved with the value "Instantly resolved!"
 * - Use Promise.resolve() for this
 * 
 * Expected behavior:
 *   getImmediatelyResolved().then(val => console.log(val));
 *   // Immediately logs: "Instantly resolved!"
 */

function getImmediatelyResolved() {
    // ==================== YOUR CODE HERE ====================
    let promise = Promise.resolve("Instantly resolved!")
    
    return promise
    // ========================================================
}


// =============================================================================
// Task 2: Immediate Rejection
// =============================================================================
/**
 * Create a function getImmediatelyRejected() that:
 * - Returns a Promise that is IMMEDIATELY rejected with the error "Instantly rejected!"
 * - Use Promise.reject() for this
 * 
 * Expected behavior:
 *   getImmediatelyRejected().catch(err => console.log(err));
 *   // Immediately logs: "Instantly rejected!"
 */

function getImmediatelyRejected() {
    // ==================== YOUR CODE HERE ====================
    
    let reject = Promise.reject("Instantly rejected!")
    return reject
    
    // ========================================================
}


// =============================================================================
// Task 3: Promise State Checker
// =============================================================================
/**
 * Create a function simulateRandomOutcome() that:
 * - Returns a Promise
 * - After 500ms, randomly either:
 *   - Resolves with "Operation succeeded!" (50% chance)
 *   - Rejects with "Operation failed!" (50% chance)
 * - Use Math.random() to determine the outcome
 * 
 * Expected behavior:
 *   simulateRandomOutcome()
 *     .then(msg => console.log(msg))
 *     .catch(err => console.log(err));
 *   // After 500ms: Either "Operation succeeded!" or "Operation failed!"
 */

function simulateRandomOutcome() {
    // ==================== YOUR CODE HERE ====================
    return new Promise((resolve, reject)=>{
        let val = Math.random()
        setTimeout(() => {
            if(val){
                resolve("Operation succeeded!")
            }
            else{
                reject("Operation failed!")
            }
            
        }, 500);
    })
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    getImmediatelyResolved,
    getImmediatelyRejected,
    simulateRandomOutcome
};
