/**
 * Promises & Async/Await Challenge #16
 * =====================================
 * Topic: async Functions Always Return Promises
 * 
 * This exercise reinforces the concept that async functions
 * ALWAYS wrap their return value in a Promise.
 */

// =============================================================================
// Task 1: Return Value Wrapping
// =============================================================================
/**
 * Create these async functions and observe what they return:
 * 
 * returnNumber() - returns 42
 * returnString() - returns "hello"
 * returnObject() - returns { key: "value" }
 * returnArray() - returns [1, 2, 3]
 * returnUndefined() - returns nothing (undefined)
 * 
 * Then create a function testReturnTypes() that:
 * - Calls each function and checks if the return is a Promise
 * - Returns an object: { number: true, string: true, ... } 
 *   where true means it IS a Promise
 */

async function returnNumber() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function returnString() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function returnObject() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function returnArray() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function returnUndefined() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

function testReturnTypes() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Returning a Promise from async Function
// =============================================================================
/**
 * What happens when an async function returns a Promise?
 * 
 * Create returnPromise() that:
 * - Returns Promise.resolve("inner value")
 * 
 * Create returnNestedPromise() that:
 * - Returns Promise.resolve(Promise.resolve("deeply nested"))
 * 
 * Create testPromiseUnwrapping() that:
 * - Awaits both functions
 * - Returns { single: [value], nested: [value] }
 * 
 * Note: Promises are automatically "unwrapped" - you don't get Promise<Promise<T>>
 */

async function returnPromise() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function returnNestedPromise() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function testPromiseUnwrapping() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Throwing in async Functions
// =============================================================================
/**
 * Create async function throwError() that:
 * - Throws new Error("Async error")
 * 
 * Create async function returnRejectedPromise() that:
 * - Returns Promise.reject("Rejected promise")
 * 
 * Create async function compareThrowAndReject() that:
 * - Tries both throwError() and returnRejectedPromise()
 * - Catches errors from both
 * - Returns { throwCaught: [error message], rejectCaught: [error message] }
 * 
 * Key insight: throw and Promise.reject() behave the same in async functions
 */

async function throwError() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function returnRejectedPromise() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function compareThrowAndReject() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    returnNumber,
    returnString,
    returnObject,
    returnArray,
    returnUndefined,
    testReturnTypes,
    returnPromise,
    returnNestedPromise,
    testPromiseUnwrapping,
    throwError,
    returnRejectedPromise,
    compareThrowAndReject
};
