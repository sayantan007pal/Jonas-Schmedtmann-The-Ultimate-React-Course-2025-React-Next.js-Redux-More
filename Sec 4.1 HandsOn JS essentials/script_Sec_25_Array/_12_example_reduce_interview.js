/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📊 CHALLENGE 12: Array.reduce() - Interview-Level                             ║
 * ║                              Difficulty: ⭐⭐⭐ (Advanced)                                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Advanced reduce() patterns from actual interviews
 * 
 * 🎯 INTERVIEW IMPORTANCE: CRITICAL
 *    - reduce() can implement ANY array method
 *    - Shows deep understanding of functional programming
 */

// =============================================================================
// CHALLENGE: Implement Your Own reduce() Function
// =============================================================================
/**
 * Create a function `customReduce` that:
 * - Implements the functionality of Array.reduce() from scratch
 * - Takes an array, callback, and optional initial value
 * - DO NOT use the built-in .reduce() method!
 * 
 * @param {Array} array - Array to reduce
 * @param {Function} callback - Reducer function (acc, curr, index, array) => newAcc
 * @param {any} initialValue - Optional initial value
 * @returns {any} - Reduced value
 * 
 * Examples:
 *   customReduce([1, 2, 3], (acc, curr) => acc + curr, 0) → 6
 *   customReduce([1, 2, 3], (acc, curr) => acc + curr) → 6 (first element as initial)
 *   customReduce([], (acc, curr) => acc + curr, 0) → 0
 * 
 * 💡 HINTS:
 *   - If no initialValue, use first element and start loop at index 1
 *   - If array is empty and no initialValue, throw TypeError (like native)
 */

function customReduce(array, callback, initialValue) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Implement map() Using reduce()
// =============================================================================
/**
 * Create a function `mapWithReduce` that:
 * - Implements Array.map() using ONLY reduce()
 * - DO NOT use the built-in .map() method!
 * 
 * @param {Array} array - Array to map
 * @param {Function} callback - Transform function (element, index, array) => newValue
 * @returns {Array} - Transformed array
 * 
 * Examples:
 *   mapWithReduce([1, 2, 3], x => x * 2) → [2, 4, 6]
 *   mapWithReduce(['a', 'b'], (el, i) => el + i) → ['a0', 'b1']
 * 
 * 💡 HINTS:
 *   - Accumulator is an array: []
 *   - Push transformed value and return accumulator
 */

function mapWithReduce(array, callback) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Implement filter() Using reduce()
// =============================================================================
/**
 * Create a function `filterWithReduce` that:
 * - Implements Array.filter() using ONLY reduce()
 * - DO NOT use the built-in .filter() method!
 * 
 * @param {Array} array - Array to filter
 * @param {Function} callback - Test function (element, index, array) => boolean
 * @returns {Array} - Filtered array
 * 
 * Examples:
 *   filterWithReduce([1, 2, 3, 4], x => x % 2 === 0) → [2, 4]
 *   filterWithReduce(['a', 'bb', 'ccc'], s => s.length > 1) → ['bb', 'ccc']
 * 
 * 💡 HINTS:
 *   - Only push to accumulator if callback returns true
 */

function filterWithReduce(array, callback) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Pipe/Compose Functions
// =============================================================================
/**
 * Create a function `pipe` that:
 * - Takes an array of functions
 * - Returns a new function that applies them left-to-right
 * - Each function's output becomes the next function's input
 * 
 * @param {Function[]} functions - Array of functions to pipe
 * @returns {Function} - Composed function
 * 
 * Examples:
 *   const add1 = x => x + 1;
 *   const double = x => x * 2;
 *   const square = x => x * x;
 *   
 *   pipe([add1, double, square])(3) → 64  // ((3 + 1) * 2)^2 = 64
 *   pipe([double, add1])(5) → 11  // (5 * 2) + 1 = 11
 *   pipe([])(5) → 5  // No functions, return input
 * 
 * 💡 HINTS:
 *   - Return a function that takes an initial value
 *   - reduce over functions, passing result of each to next
 *   - Initial value of reduce is the input to the returned function
 */

function pipe(functions) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Promise Waterfall
// =============================================================================
/**
 * Create a function `promiseWaterfall` that:
 * - Takes an array of async functions
 * - Executes them in sequence (one after another)
 * - Each function receives the result of the previous
 * - Returns a promise with the final result
 * 
 * @param {Array<(prev: any) => Promise<any>>} asyncFunctions - Array of async functions
 * @param {any} initialValue - Initial value to pass to first function
 * @returns {Promise<any>} - Promise with final result
 * 
 * Examples:
 *   promiseWaterfall([
 *     x => Promise.resolve(x + 1),
 *     x => Promise.resolve(x * 2),
 *     x => Promise.resolve(x + 3)
 *   ], 5) → Promise(15)  // ((5 + 1) * 2) + 3 = 15
 * 
 * 💡 HINTS:
 *   - Use reduce with Promise as accumulator
 *   - acc.then(result => fn(result))
 *   - Initial value: Promise.resolve(initialValue)
 */

function promiseWaterfall(asyncFunctions, initialValue) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    customReduce,
    mapWithReduce,
    filterWithReduce,
    pipe,
    promiseWaterfall
};
