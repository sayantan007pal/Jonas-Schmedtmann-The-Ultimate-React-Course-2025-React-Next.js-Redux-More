/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📊 CHALLENGE 15: Array.sort() - Interview-Level                               ║
 * ║                              Difficulty: ⭐⭐⭐ (Advanced)                                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Complex sorting patterns from actual interviews
 * 
 * 🎯 INTERVIEW IMPORTANCE: CRITICAL
 *    - Shows understanding of stable vs unstable sort
 *    - Custom sort algorithms
 */

// =============================================================================
// CHALLENGE: Implement Your Own sort() Using Bubble Sort
// =============================================================================
/**
 * Create a function `customSort` that:
 * - Implements sorting using bubble sort algorithm
 * - Takes a compare function like native sort()
 * - Returns a NEW sorted array (do NOT mutate original)
 * - DO NOT use the built-in .sort() method!
 * 
 * @param {Array} array - Array to sort
 * @param {Function} compareFn - Compare function (a, b) => number
 * @returns {Array} - New sorted array
 * 
 * Examples:
 *   customSort([3, 1, 2], (a, b) => a - b) → [1, 2, 3]
 *   customSort(['c', 'a', 'b'], (a, b) => a.localeCompare(b)) → ['a', 'b', 'c']
 * 
 * 💡 HINTS - Bubble Sort Algorithm:
 *   - Compare adjacent elements, swap if in wrong order
 *   - Repeat until no swaps needed
 *   - If compareFn(a, b) > 0, swap a and b
 */

function customSort(array, compareFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Stable Sort Implementation
// =============================================================================
/**
 * Create a function `stableSort` that:
 * - Sorts maintaining relative order of equal elements
 * - Preserves original indices for elements that compare equal
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {Array} array - Array to sort
 * @param {Function} compareFn - Compare function
 * @returns {Array} - New stably sorted array
 * 
 * Examples:
 *   // Stable: equal elements maintain original order
 *   stableSort([
 *     { name: 'Alice', age: 25 },
 *     { name: 'Bob', age: 25 },  // Bob comes after Alice
 *     { name: 'Charlie', age: 20 }
 *   ], (a, b) => a.age - b.age) → [
 *     { name: 'Charlie', age: 20 },
 *     { name: 'Alice', age: 25 },   // Alice still before Bob
 *     { name: 'Bob', age: 25 }
 *   ]
 * 
 * 💡 HINTS:
 *   - Decorate elements with their original index
 *   - Sort, and use index as tiebreaker when compare returns 0
 *   - Undecorate after sorting
 */

function stableSort(array, compareFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Sort By Nested Property
// =============================================================================
/**
 * Create a function `sortByNestedProperty` that:
 * - Sorts by a nested property using dot notation
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {Object[]} array - Array of objects
 * @param {string} propertyPath - Dot-notated path (e.g., 'address.city')
 * @returns {Object[]} - New sorted array
 * 
 * Examples:
 *   sortByNestedProperty([
 *     { user: { name: 'Bob' } },
 *     { user: { name: 'Alice' } }
 *   ], 'user.name') → [{ user: { name: 'Alice' } }, { user: { name: 'Bob' } }]
 * 
 * 💡 HINTS:
 *   - Split path by '.' and reduce to get nested value
 *   - Handle cases where nested property doesn't exist
 */

function sortByNestedProperty(array, propertyPath) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Sort with Custom Collation
// =============================================================================
/**
 * Create a function `sortWithCollation` that:
 * - Sorts strings with special collation rules
 * - Numbers come before letters
 * - Special characters come last
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {string[]} array - Array of strings
 * @returns {string[]} - New sorted array with custom collation
 * 
 * Examples:
 *   sortWithCollation(['a', '1', '#', 'b', '2']) → ['1', '2', 'a', 'b', '#']
 *   sortWithCollation(['$', 'z', '0', 'A']) → ['0', 'A', 'z', '$']
 * 
 * 💡 HINTS:
 *   - Create a function to get priority: numbers=1, letters=2, others=3
 *   - First sort by priority, then alphabetically within group
 */

function sortWithCollation(array) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: K Largest Elements
// =============================================================================
/**
 * Create a function `kLargest` that:
 * - Returns the k largest elements in descending order
 * - More efficient than sorting entire array (for large arrays)
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {number[]} array - Array of numbers
 * @param {number} k - Number of largest elements to return
 * @returns {number[]} - Array of k largest elements (descending)
 * 
 * Examples:
 *   kLargest([3, 1, 4, 1, 5, 9, 2, 6], 3) → [9, 6, 5]
 *   kLargest([1, 2, 3], 5) → [3, 2, 1] (return all if k > length)
 * 
 * 💡 HINTS:
 *   - For simplicity, you can sort descending and slice first k
 *   - Bonus: Use partial sorting or heap for O(n log k) efficiency
 */

function kLargest(array, k) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    customSort,
    stableSort,
    sortByNestedProperty,
    sortWithCollation,
    kLargest
};
