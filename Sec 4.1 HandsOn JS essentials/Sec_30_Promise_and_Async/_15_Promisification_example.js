/**
 * Promises & Async/Await Challenge #15
 * =====================================
 * Topic: Promisification - Converting Callbacks to Promises
 * 
 * This exercise tests your ability to convert callback-based
 * functions into Promise-based functions.
 */

// =============================================================================
// Callback-based functions to convert (DO NOT MODIFY THESE)
// =============================================================================

// Traditional callback-style function
function readFileCallback(filename, callback) {
    setTimeout(() => {
        if (filename.includes("error")) {
            callback(new Error(`File not found: ${filename}`), null);
        } else {
            callback(null, `Contents of ${filename}`);
        }
    }, 100);
}

// Callback with multiple success values
function getStatsCallback(userId, callback) {
    setTimeout(() => {
        if (userId <= 0) {
            callback(new Error("Invalid user ID"), null, null);
        } else {
            callback(null, { posts: userId * 10 }, { followers: userId * 100 });
        }
    }, 100);
}

// Node.js style callback (error-first)
function connectDatabaseCallback(config, callback) {
    setTimeout(() => {
        if (!config.host) {
            callback(new Error("Missing host"));
        } else {
            callback(null, { connected: true, host: config.host });
        }
    }, 150);
}


// =============================================================================
// Task 1: Basic Promisification
// =============================================================================
/**
 * Create a function readFilePromise(filename) that:
 * - Wraps readFileCallback in a Promise
 * - Resolves with the file contents on success
 * - Rejects with the error on failure
 * 
 * Expected behavior:
 *   await readFilePromise("data.txt");        // "Contents of data.txt"
 *   await readFilePromise("error-file.txt");  // Rejects with Error
 */

function readFilePromise(filename) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Promisification with Multiple Return Values
// =============================================================================
/**
 * Create a function getStatsPromise(userId) that:
 * - Wraps getStatsCallback in a Promise
 * - Resolves with an object combining both results: { posts, followers }
 * - Rejects with the error on failure
 * 
 * Expected behavior:
 *   await getStatsPromise(5);   // { posts: { posts: 50 }, followers: { followers: 500 } }
 *   await getStatsPromise(-1);  // Rejects with Error
 */

function getStatsPromise(userId) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Generic Promisify Function
// =============================================================================
/**
 * Create a function promisify(fn) that:
 * - Takes any callback-based function (Node.js style: error-first callback)
 * - Returns a new function that returns a Promise
 * - The returned function accepts the same arguments (minus the callback)
 * 
 * Expected behavior:
 *   const connectDb = promisify(connectDatabaseCallback);
 *   await connectDb({ host: "localhost" });  // { connected: true, host: "localhost" }
 *   await connectDb({});                      // Rejects with Error: "Missing host"
 */

function promisify(fn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    readFileCallback,
    getStatsCallback,
    connectDatabaseCallback,
    readFilePromise,
    getStatsPromise,
    promisify
};
