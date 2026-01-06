/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📊 CHALLENGE 16: Immutable Operations - Add Elements                          ║
 * ║                              Difficulty: ⭐ (Beginner)                                           ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Adding elements to arrays without mutation
 * 
 * ⚠️ KEY WARNING: In React, you MUST create new arrays when updating state!
 *    - ❌ DON'T: arr.push(newItem)  - mutates original
 *    - ✅ DO: [...arr, newItem]     - creates new array
 * 
 * 🎯 INTERVIEW IMPORTANCE: CRITICAL for React interviews
 */

// =============================================================================
// CHALLENGE: Add Element at End
// =============================================================================
/**
 * Create a function `addToEnd` that:
 * - Adds an element to the end of an array
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {Array} array - Original array
 * @param {any} element - Element to add
 * @returns {Array} - New array with element added at end
 * 
 * Examples:
 *   addToEnd([1, 2, 3], 4) → [1, 2, 3, 4]
 *   addToEnd([], 'first') → ['first']
 * 
 * 💡 HINTS:
 *   - Use spread operator: [...array, element]
 */

function addToEnd(array, element) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Add Element at Beginning
// =============================================================================
/**
 * Create a function `addToStart` that:
 * - Adds an element to the beginning of an array
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {Array} array - Original array
 * @param {any} element - Element to add
 * @returns {Array} - New array with element at start
 * 
 * Examples:
 *   addToStart([1, 2, 3], 0) → [0, 1, 2, 3]
 *   addToStart([], 'first') → ['first']
 * 
 * 💡 HINTS:
 *   - Use spread operator: [element, ...array]
 */

function addToStart(array, element) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Insert at Specific Index
// =============================================================================
/**
 * Create a function `insertAtIndex` that:
 * - Inserts an element at a specific index
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {Array} array - Original array
 * @param {number} index - Position to insert at
 * @param {any} element - Element to insert
 * @returns {Array} - New array with element inserted
 * 
 * Examples:
 *   insertAtIndex([1, 2, 4], 2, 3) → [1, 2, 3, 4]
 *   insertAtIndex(['a', 'c'], 1, 'b') → ['a', 'b', 'c']
 *   insertAtIndex([1, 2], 0, 0) → [0, 1, 2]
 * 
 * 💡 HINTS:
 *   - Use slice to split: [...arr.slice(0, index), element, ...arr.slice(index)]
 */

function insertAtIndex(array, index, element) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Add Multiple Elements
// =============================================================================
/**
 * Create a function `addMultiple` that:
 * - Adds multiple elements to the end of an array
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {Array} array - Original array
 * @param {Array} elements - Elements to add
 * @returns {Array} - New array with all elements added
 * 
 * Examples:
 *   addMultiple([1, 2], [3, 4, 5]) → [1, 2, 3, 4, 5]
 *   addMultiple([], ['a', 'b']) → ['a', 'b']
 * 
 * 💡 HINTS:
 *   - Spread both arrays: [...array, ...elements]
 */

function addMultiple(array, elements) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Add to Object in Array (React Pattern)
// =============================================================================
/**
 * Create a function `addToObjectArray` that:
 * - Adds a new object to an array of objects
 * - Automatically generates an ID (max existing ID + 1)
 * - Returns a NEW array (do NOT mutate original)
 * 
 * This is a common React pattern for adding items to state!
 * 
 * @param {Object[]} array - Array of objects with id property
 * @param {Object} newItem - New item to add (without id)
 * @returns {Object[]} - New array with item added (with generated id)
 * 
 * Examples:
 *   addToObjectArray(
 *     [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }],
 *     { name: 'Charlie' }
 *   ) → [
 *     { id: 1, name: 'Alice' },
 *     { id: 2, name: 'Bob' },
 *     { id: 3, name: 'Charlie' }
 *   ]
 * 
 *   addToObjectArray([], { name: 'First' }) → [{ id: 1, name: 'First' }]
 * 
 * 💡 HINTS:
 *   - Find max id: Math.max(0, ...array.map(item => item.id))
 *   - Add 1 to max id for new item
 */

function addToObjectArray(array, newItem) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    addToEnd,
    addToStart,
    insertAtIndex,
    addMultiple,
    addToObjectArray
};
