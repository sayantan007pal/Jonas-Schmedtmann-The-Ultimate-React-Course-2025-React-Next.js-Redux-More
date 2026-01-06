/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📊 CHALLENGE 11: Array.reduce() - Array Building & Flattening                 ║
 * ║                              Difficulty: ⭐⭐ (Intermediate)                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Using reduce() to build arrays - flattening, unique, etc.
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - Demonstrates reduce() versatility
 *    - Common interview pattern for data transformation
 */

// =============================================================================
// CHALLENGE: Flatten Array One Level
// =============================================================================
/**
 * Create a function `flatten` that:
 * - Takes an array of arrays (2D array)
 * - Returns a flattened 1D array
 * - Only flatten one level deep
 * 
 * @param {Array[]} nestedArray - 2D array
 * @returns {Array} - Flattened 1D array
 * 
 * Examples:
 *   flatten([[1, 2], [3, 4], [5]]) → [1, 2, 3, 4, 5]
 *   flatten([['a', 'b'], ['c']]) → ['a', 'b', 'c']
 *   flatten([]) → []
 *   flatten([[1, [2, 3]], [4]]) → [1, [2, 3], 4]  // Only one level!
 * 
 * 💡 HINTS:
 *   - acc.concat(currentArray) or [...acc, ...currentArray]
 *   - Initial value: []
 */

function flatten(nestedArray) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Deep Flatten (Recursive)
// =============================================================================
/**
 * Create a function `deepFlatten` that:
 * - Takes an arbitrarily nested array
 * - Returns a completely flattened 1D array
 * - Handle any level of nesting
 * 
 * @param {Array} nestedArray - Nested array of any depth
 * @returns {Array} - Completely flattened array
 * 
 * Examples:
 *   deepFlatten([1, [2, [3, [4]], 5]]) → [1, 2, 3, 4, 5]
 *   deepFlatten([[[[1]]]]) → [1]
 *   deepFlatten([1, 2, 3]) → [1, 2, 3]
 *   deepFlatten([]) → []
 * 
 * 💡 HINTS:
 *   - Check if current item is an array: Array.isArray(item)
 *   - If array, recursively flatten and concat
 *   - If not array, just add to accumulator
 */

function deepFlatten(nestedArray) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Get Unique Values
// =============================================================================
/**
 * Create a function `unique` that:
 * - Takes an array with potential duplicates
 * - Returns an array with only unique values
 * - Preserve the order of first occurrence
 * - Use reduce() (not Set directly)
 * 
 * @param {Array} array - Array with potential duplicates
 * @returns {Array} - Array with unique values
 * 
 * Examples:
 *   unique([1, 2, 2, 3, 1, 4]) → [1, 2, 3, 4]
 *   unique(['a', 'b', 'a']) → ['a', 'b']
 *   unique([]) → []
 * 
 * 💡 HINTS:
 *   - Check if item already in accumulator: acc.includes(item)
 *   - Only add if not already present
 */

function unique(array) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Partition Array
// =============================================================================
/**
 * Create a function `partition` that:
 * - Takes an array and a predicate function
 * - Returns an array of two arrays: [passing, failing]
 * - First array contains elements that pass the test
 * - Second array contains elements that fail
 * 
 * @param {Array} array - Array to partition
 * @param {Function} predicate - Test function
 * @returns {[Array, Array]} - Tuple of [passing, failing]
 * 
 * Examples:
 *   partition([1, 2, 3, 4, 5], x => x % 2 === 0) → [[2, 4], [1, 3, 5]]
 *   partition(['apple', 'banana', 'cherry'], s => s.length > 5) → [['banana', 'cherry'], ['apple']]
 *   partition([], x => true) → [[], []]
 * 
 * 💡 HINTS:
 *   - Initial value: [[], []]
 *   - If predicate(item) is true, add to acc[0]
 *   - If false, add to acc[1]
 */

function partition(array, predicate) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    flatten,
    deepFlatten,
    unique,
    partition
};
