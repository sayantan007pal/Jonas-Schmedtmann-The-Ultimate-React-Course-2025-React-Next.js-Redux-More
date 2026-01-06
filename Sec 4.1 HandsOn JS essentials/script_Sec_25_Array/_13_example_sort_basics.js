/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📊 CHALLENGE 13: Array.sort() - Basics                                        ║
 * ║                              Difficulty: ⭐ (Beginner)                                           ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Understanding sort() behavior and basic compare functions
 * 
 * ⚠️ KEY WARNING: sort() MUTATES the original array!
 *    - Always work on a copy for React state: [...arr].sort()
 *    - Default sort converts to strings: [2, 10].sort() → [10, 2]
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - sort() mutation is a common React bug
 *    - Understanding compare functions is essential
 */

// =============================================================================
// CHALLENGE: Sort Numbers Ascending
// =============================================================================
/**
 * Create a function `sortNumbersAsc` that:
 * - Sorts an array of numbers in ascending order (smallest first)
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {number[]} numbers - Array of numbers
 * @returns {number[]} - New sorted array (ascending)
 * 
 * Examples:
 *   sortNumbersAsc([3, 1, 4, 1, 5]) → [1, 1, 3, 4, 5]
 *   sortNumbersAsc([10, 2, 100]) → [2, 10, 100] (NOT [10, 100, 2])
 *   sortNumbersAsc([]) → []
 * 
 * 💡 HINTS:
 *   - Use [...numbers].sort() to avoid mutation
 *   - Compare function: (a, b) => a - b for ascending
 */

function sortNumbersAsc(numbers) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Sort Numbers Descending
// =============================================================================
/**
 * Create a function `sortNumbersDesc` that:
 * - Sorts an array of numbers in descending order (largest first)
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {number[]} numbers - Array of numbers
 * @returns {number[]} - New sorted array (descending)
 * 
 * Examples:
 *   sortNumbersDesc([3, 1, 4, 1, 5]) → [5, 4, 3, 1, 1]
 *   sortNumbersDesc([10, 2, 100]) → [100, 10, 2]
 * 
 * 💡 HINTS:
 *   - Compare function: (a, b) => b - a for descending
 */

function sortNumbersDesc(numbers) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Sort Strings Alphabetically
// =============================================================================
/**
 * Create a function `sortStringsAlpha` that:
 * - Sorts an array of strings alphabetically (A-Z)
 * - Case-insensitive sort
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {string[]} strings - Array of strings
 * @returns {string[]} - New sorted array (alphabetically)
 * 
 * Examples:
 *   sortStringsAlpha(['banana', 'Apple', 'cherry']) → ['Apple', 'banana', 'cherry']
 *   sortStringsAlpha(['Z', 'a', 'M']) → ['a', 'M', 'Z']
 * 
 * 💡 HINTS:
 *   - Use localeCompare() for proper string comparison
 *   - (a, b) => a.toLowerCase().localeCompare(b.toLowerCase())
 */

function sortStringsAlpha(strings) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Sort Strings by Length
// =============================================================================
/**
 * Create a function `sortByLength` that:
 * - Sorts an array of strings by their length (shortest first)
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {string[]} strings - Array of strings
 * @returns {string[]} - New sorted array (by length)
 * 
 * Examples:
 *   sortByLength(['aaa', 'a', 'aa']) → ['a', 'aa', 'aaa']
 *   sortByLength(['hello', 'hi', 'hey']) → ['hi', 'hey', 'hello']
 * 
 * 💡 HINTS:
 *   - Compare a.length vs b.length
 */

function sortByLength(strings) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Sort Booleans (true first)
// =============================================================================
/**
 * Create a function `sortBooleans` that:
 * - Sorts booleans with true values first
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {boolean[]} bools - Array of booleans
 * @returns {boolean[]} - New sorted array (true first)
 * 
 * Examples:
 *   sortBooleans([false, true, false, true]) → [true, true, false, false]
 *   sortBooleans([false, false, true]) → [true, false, false]
 * 
 * 💡 HINTS:
 *   - true is "greater" when true=1, false=0
 *   - Sort descending: (a, b) => b - a works because true > false
 */

function sortBooleans(bools) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    sortNumbersAsc,
    sortNumbersDesc,
    sortStringsAlpha,
    sortByLength,
    sortBooleans
};
