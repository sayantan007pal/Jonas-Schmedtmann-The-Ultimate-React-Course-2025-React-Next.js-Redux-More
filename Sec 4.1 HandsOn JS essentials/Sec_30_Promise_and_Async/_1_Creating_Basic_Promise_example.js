/**
 * Promises & Async/Await Challenge #1
 * ====================================
 * Topic: Creating a Basic Promise
 * 
 * This exercise tests your understanding of how to create a Promise
 * and use resolve/reject to control its outcome.
 */

// =============================================================================
// Task 1: Create a Simple Promise
// =============================================================================
/**
 * Create a function createSimplePromise() that:
 * - Returns a new Promise
 * - The Promise should resolve with the string "Success!" after 1 second
 * 
 * Expected behavior:
 *   createSimplePromise().then(result => console.log(result));
 *   // After 1 second: "Success!"
 */

function createSimplePromise() {
    // ==================== YOUR CODE HERE ====================
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(`Success!`)
        }, 1000)
    })
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Promise with Conditional Resolution
// =============================================================================
/**
 * Create a function checkNumber(num) that:
 * - Returns a Promise
 * - If num is greater than 10, resolve with "Number is greater than 10"
 * - If num is 10 or less, reject with "Number is 10 or less"
 * - The resolution/rejection should happen immediately (no delay needed)
 * 
 * Expected behavior:
 *   checkNumber(15).then(msg => console.log(msg));  // "Number is greater than 10"
 *   checkNumber(5).catch(err => console.log(err));  // "Number is 10 or less"
 */

function checkNumber(num) {
    // ==================== YOUR CODE HERE ====================
    return new Promise((resolve, reject)=> {
        if(num>10){
            resolve("Number is greater than 10")
        }
        else{
            reject("Number is 10 or less")
        }
    })
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Delayed Value Promise
// =============================================================================
/**
 * Create a function delayedValue(value, delay) that:
 * - Returns a Promise that resolves with the given value after the specified delay (in ms)
 * 
 * Expected behavior:
 *   delayedValue("Hello", 2000).then(val => console.log(val));
 *   // After 2 seconds: "Hello"
 */

function delayedValue(value, delay) {
    // ==================== YOUR CODE HERE ====================
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            resolve(value)
        }, delay);
    })
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    createSimplePromise,
    checkNumber,
    delayedValue
};
