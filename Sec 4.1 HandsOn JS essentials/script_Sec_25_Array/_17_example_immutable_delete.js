/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📊 CHALLENGE 17: Immutable Operations - Delete Elements                       ║
 * ║                              Difficulty: ⭐⭐ (Intermediate)                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Removing elements from arrays without mutation
 * 
 * ⚠️ KEY WARNING: In React, you MUST create new arrays when deleting!
 *    - ❌ DON'T: arr.splice(index, 1)  - mutates original
 *    - ✅ DO: arr.filter(...)          - creates new array
 * 
 * 🎯 INTERVIEW IMPORTANCE: CRITICAL for React interviews
 */

// =============================================================================
// CHALLENGE: Delete by Index
// =============================================================================
/**
 * Create a function `deleteAtIndex` that:
 * - Removes an element at a specific index
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {Array} array - Original array
 * @param {number} index - Index to remove
 * @returns {Array} - New array with element removed
 * 
 * Examples:
 *   deleteAtIndex([1, 2, 3], 1) → [1, 3]
 *   deleteAtIndex(['a', 'b', 'c'], 0) → ['b', 'c']
 *   deleteAtIndex([1, 2, 3], 2) → [1, 2]
 * 
 * 💡 HINTS:
 *   - Use filter: array.filter((_, i) => i !== index)
 *   - OR slice: [...arr.slice(0, index), ...arr.slice(index + 1)]
 */

function deleteAtIndex(array, index) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Delete by Value
// =============================================================================
/**
 * Create a function `deleteByValue` that:
 * - Removes ALL occurrences of a value from array
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {Array} array - Original array
 * @param {any} value - Value to remove
 * @returns {Array} - New array without the value
 * 
 * Examples:
 *   deleteByValue([1, 2, 3, 2, 4], 2) → [1, 3, 4]
 *   deleteByValue(['a', 'b', 'a'], 'a') → ['b']
 *   deleteByValue([1, 2, 3], 5) → [1, 2, 3] (value not found)
 * 
 * 💡 HINTS:
 *   - Use filter: array.filter(item => item !== value)
 */

function deleteByValue(array, value) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Delete by ID (React Pattern)
// =============================================================================
/**
 * Create a function `deleteById` that:
 * - Removes an object from array by its id property
 * - Returns a NEW array (do NOT mutate original)
 * 
 * This is the most common React deletion pattern!
 * 
 * @param {Object[]} array - Array of objects with id property
 * @param {number|string} id - ID of item to remove
 * @returns {Object[]} - New array without the item
 * 
 * Examples:
 *   deleteById(
 *     [{ id: 1, name: 'A' }, { id: 2, name: 'B' }],
 *     1
 *   ) → [{ id: 2, name: 'B' }]
 * 
 * 💡 HINTS:
 *   - Use filter: array.filter(item => item.id !== id)
 */

function deleteById(array, id) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Delete Multiple by IDs
// =============================================================================
/**
 * Create a function `deleteByIds` that:
 * - Removes multiple objects by their ids
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {Object[]} array - Array of objects with id property
 * @param {Array} ids - Array of IDs to remove
 * @returns {Object[]} - New array without the items
 * 
 * Examples:
 *   deleteByIds(
 *     [{ id: 1 }, { id: 2 }, { id: 3 }],
 *     [1, 3]
 *   ) → [{ id: 2 }]
 * 
 * 💡 HINTS:
 *   - Use filter with includes: array.filter(item => !ids.includes(item.id))
 */

function deleteByIds(array, ids) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Delete First N Elements
// =============================================================================
/**
 * Create a function `deleteFirstN` that:
 * - Removes the first N elements from array
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {Array} array - Original array
 * @param {number} n - Number of elements to remove from start
 * @returns {Array} - New array with first n elements removed
 * 
 * Examples:
 *   deleteFirstN([1, 2, 3, 4, 5], 2) → [3, 4, 5]
 *   deleteFirstN([1, 2, 3], 0) → [1, 2, 3]
 *   deleteFirstN([1, 2], 5) → [] (remove more than exists)
 * 
 * 💡 HINTS:
 *   - Use slice: array.slice(n)
 */

function deleteFirstN(array, n) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Delete Last N Elements
// =============================================================================
/**
 * Create a function `deleteLastN` that:
 * - Removes the last N elements from array
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {Array} array - Original array
 * @param {number} n - Number of elements to remove from end
 * @returns {Array} - New array with last n elements removed
 * 
 * Examples:
 *   deleteLastN([1, 2, 3, 4, 5], 2) → [1, 2, 3]
 *   deleteLastN([1, 2, 3], 0) → [1, 2, 3]
 *   deleteLastN([1, 2], 5) → [] (remove more than exists)
 * 
 * 💡 HINTS:
 *   - Use slice: array.slice(0, -n) but handle n=0 case
 */

function deleteLastN(array, n) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    deleteAtIndex,
    deleteByValue,
    deleteById,
    deleteByIds,
    deleteFirstN,
    deleteLastN
};
