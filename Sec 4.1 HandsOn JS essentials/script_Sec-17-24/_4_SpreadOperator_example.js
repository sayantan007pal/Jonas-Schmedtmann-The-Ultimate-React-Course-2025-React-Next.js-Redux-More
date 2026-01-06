/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 4: Spread Operator - Expanding & Copying                          ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: Array Spread, Object Spread, Shallow Copy, Immutable Updates       ║
 * ║  Difficulty: ⭐⭐⭐ (Interview Critical - React State!)                      ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// =============================================================================
// Task 1: Array Spread - Concatenation
// =============================================================================
/**
 * Create a function mergeArrays(arr1, arr2) that:
 * - Uses spread to merge two arrays into a NEW array
 * - Does NOT mutate the original arrays
 * 
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {Array} - New merged array
 * 
 * Example:
 *   mergeArrays([1, 2], [3, 4])
 *   // Returns: [1, 2, 3, 4]
 */

function mergeArrays(arr1, arr2) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Array Spread - Adding Elements
// =============================================================================
/**
 * Create a function addToArrayImmutably(arr, element, position) that:
 * - Adds an element to an array WITHOUT mutating the original
 * - `position` can be: "start", "end", or a number (index)
 * - Returns a NEW array
 * 
 * @param {Array} arr - Original array
 * @param {any} element - Element to add
 * @param {string|number} position - Where to add: "start", "end", or index
 * @returns {Array} - New array with element added
 * 
 * Example:
 *   addToArrayImmutably([2, 3, 4], 1, "start")  // [1, 2, 3, 4]
 *   addToArrayImmutably([1, 2, 3], 4, "end")    // [1, 2, 3, 4]
 *   addToArrayImmutably([1, 2, 4], 3, 2)        // [1, 2, 3, 4]
 */

function addToArrayImmutably(arr, element, position) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Object Spread - Shallow Copy & Update
// =============================================================================
/**
 * Create a function updateObject(obj, updates) that:
 * - Creates a shallow copy of `obj`
 * - Applies `updates` (new/changed properties) to the copy
 * - Returns the NEW object (original unchanged)
 * 
 * @param {Object} obj - Original object
 * @param {Object} updates - Properties to add/update
 * @returns {Object} - New updated object
 * 
 * Example:
 *   updateObject({ name: "John", age: 25 }, { age: 26, city: "NYC" })
 *   // Returns: { name: "John", age: 26, city: "NYC" }
 */

function updateObject(obj, updates) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Nested Object Spread - Deep Update (React Pattern!)
// =============================================================================
/**
 * Create a function updateNestedProperty(obj, path, value) that:
 * - Updates a nested property IMMUTABLY
 * - `path` is an array of keys: ["level1", "level2", "property"]
 * - Returns a NEW object with the updated nested value
 * 
 * For simplicity, assume path has exactly 2 levels (obj.level1.property)
 * 
 * @param {Object} obj - Original nested object
 * @param {string[]} path - Array of keys to the property [parent, child]
 * @param {any} value - New value to set
 * @returns {Object} - New object with updated nested property
 * 
 * Example:
 *   updateNestedProperty(
 *     { user: { name: "John", age: 25 }, settings: { theme: "dark" } },
 *     ["user", "age"],
 *     26
 *   )
 *   // Returns: { user: { name: "John", age: 26 }, settings: { theme: "dark" } }
 */

function updateNestedProperty(obj, path, value) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: Remove Property Immutably (REST + SPREAD combo!)
// =============================================================================
/**
 * Create a function removeProperty(obj, propToRemove) that:
 * - Returns a NEW object WITHOUT the specified property
 * - Uses object destructuring with REST to achieve this
 * - Original object should remain unchanged
 * 
 * @param {Object} obj - Original object
 * @param {string} propToRemove - Property name to remove
 * @returns {Object} - New object without the property
 * 
 * Example:
 *   removeProperty({ a: 1, b: 2, c: 3 }, "b")
 *   // Returns: { a: 1, c: 3 }
 */

function removeProperty(obj, propToRemove) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: React State Update Simulation - Array of Objects
// =============================================================================
/**
 * Create a function updateItemInArray(arr, id, updates) that:
 * - Finds an item in an array by its `id` property
 * - Updates that item with the `updates` object
 * - Returns a NEW array with the updated item (immutable!)
 * - If id not found, return copy of original array
 * 
 * This is THE MOST COMMON React state pattern!
 * 
 * @param {Object[]} arr - Array of objects with `id` property
 * @param {number} id - ID of item to update
 * @param {Object} updates - Properties to update
 * @returns {Object[]} - New array with updated item
 * 
 * Example:
 *   updateItemInArray(
 *     [{ id: 1, name: "John" }, { id: 2, name: "Jane" }],
 *     2,
 *     { name: "Janet" }
 *   )
 *   // Returns: [{ id: 1, name: "John" }, { id: 2, name: "Janet" }]
 */

function updateItemInArray(arr, id, updates) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    mergeArrays,
    addToArrayImmutably,
    updateObject,
    updateNestedProperty,
    removeProperty,
    updateItemInArray
};
