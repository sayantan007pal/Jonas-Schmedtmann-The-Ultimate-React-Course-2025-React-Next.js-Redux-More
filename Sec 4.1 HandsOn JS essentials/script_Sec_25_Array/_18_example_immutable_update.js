/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📊 CHALLENGE 18: Immutable Operations - Update Elements                       ║
 * ║                              Difficulty: ⭐⭐ (Intermediate)                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Updating elements in arrays without mutation
 * 
 * ⚠️ KEY WARNING: In React, you MUST create new arrays AND new objects!
 *    - ❌ DON'T: arr[index].name = newName  - mutates original
 *    - ✅ DO: arr.map(item => item.id === id ? {...item, name: newName} : item)
 * 
 * 🎯 INTERVIEW IMPORTANCE: CRITICAL for React interviews
 */

// =============================================================================
// CHALLENGE: Update Element at Index
// =============================================================================
/**
 * Create a function `updateAtIndex` that:
 * - Updates an element at a specific index
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {Array} array - Original array
 * @param {number} index - Index to update
 * @param {any} newValue - New value for that index
 * @returns {Array} - New array with updated value
 * 
 * Examples:
 *   updateAtIndex([1, 2, 3], 1, 20) → [1, 20, 3]
 *   updateAtIndex(['a', 'b', 'c'], 0, 'z') → ['z', 'b', 'c']
 * 
 * 💡 HINTS:
 *   - Use map: array.map((el, i) => i === index ? newValue : el)
 */

function updateAtIndex(array, index, newValue) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Update Object by ID (React Pattern)
// =============================================================================
/**
 * Create a function `updateById` that:
 * - Updates an object in array by its id
 * - Merges the updates with existing object properties
 * - Returns a NEW array with NEW object (do NOT mutate original)
 * 
 * This is THE most important React update pattern!
 * 
 * @param {Object[]} array - Array of objects with id property
 * @param {number|string} id - ID of item to update
 * @param {Object} updates - Object with properties to update
 * @returns {Object[]} - New array with updated object
 * 
 * Examples:
 *   updateById(
 *     [{ id: 1, name: 'A', age: 20 }, { id: 2, name: 'B' }],
 *     1,
 *     { name: 'Updated' }
 *   ) → [{ id: 1, name: 'Updated', age: 20 }, { id: 2, name: 'B' }]
 * 
 * 💡 HINTS:
 *   - Use map with spread: item.id === id ? {...item, ...updates} : item
 */

function updateById(array, id, updates) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Toggle Boolean Property (React Pattern)
// =============================================================================
/**
 * Create a function `toggleProperty` that:
 * - Toggles a boolean property of an object in array
 * - Returns a NEW array with NEW object (do NOT mutate original)
 * 
 * Common React pattern for checkboxes, completed states, etc.
 * 
 * @param {Object[]} array - Array of objects
 * @param {number|string} id - ID of item to toggle
 * @param {string} property - Name of boolean property to toggle
 * @returns {Object[]} - New array with toggled object
 * 
 * Examples:
 *   toggleProperty(
 *     [{ id: 1, completed: false }, { id: 2, completed: true }],
 *     1,
 *     'completed'
 *   ) → [{ id: 1, completed: true }, { id: 2, completed: true }]
 * 
 * 💡 HINTS:
 *   - Use map: item.id === id ? {...item, [prop]: !item[prop]} : item
 */

function toggleProperty(array, id, property) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Update All Matching Items
// =============================================================================
/**
 * Create a function `updateAllMatching` that:
 * - Updates ALL items that match a condition
 * - Returns a NEW array (do NOT mutate original)
 * 
 * @param {Object[]} array - Array of objects
 * @param {Function} predicate - Function to test each element
 * @param {Object} updates - Object with properties to update
 * @returns {Object[]} - New array with matching objects updated
 * 
 * Examples:
 *   updateAllMatching(
 *     [{ type: 'fruit', price: 5 }, { type: 'veggie', price: 3 }, { type: 'fruit', price: 8 }],
 *     item => item.type === 'fruit',
 *     { onSale: true }
 *   ) → [
 *     { type: 'fruit', price: 5, onSale: true },
 *     { type: 'veggie', price: 3 },
 *     { type: 'fruit', price: 8, onSale: true }
 *   ]
 * 
 * 💡 HINTS:
 *   - Use map with conditional: predicate(item) ? {...item, ...updates} : item
 */

function updateAllMatching(array, predicate, updates) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Increment/Decrement Property (React Pattern)
// =============================================================================
/**
 * Create a function `incrementProperty` that:
 * - Increments (or decrements) a numeric property of an object
 * - Returns a NEW array with NEW object (do NOT mutate original)
 * 
 * Common React pattern for counters, quantities, etc.
 * 
 * @param {Object[]} array - Array of objects
 * @param {number|string} id - ID of item to update
 * @param {string} property - Name of numeric property
 * @param {number} amount - Amount to add (negative to subtract)
 * @returns {Object[]} - New array with incremented object
 * 
 * Examples:
 *   incrementProperty(
 *     [{ id: 1, quantity: 5 }, { id: 2, quantity: 3 }],
 *     1,
 *     'quantity',
 *     2
 *   ) → [{ id: 1, quantity: 7 }, { id: 2, quantity: 3 }]
 * 
 *   incrementProperty(
 *     [{ id: 1, count: 10 }],
 *     1,
 *     'count',
 *     -3
 *   ) → [{ id: 1, count: 7 }]
 * 
 * 💡 HINTS:
 *   - Use map: {...item, [prop]: item[prop] + amount}
 */

function incrementProperty(array, id, property, amount) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    updateAtIndex,
    updateById,
    toggleProperty,
    updateAllMatching,
    incrementProperty
};
