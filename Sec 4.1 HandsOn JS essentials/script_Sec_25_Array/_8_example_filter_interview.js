/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🎯 CHALLENGE 8: Array.filter() - Interview-Level                              ║
 * ║                              Difficulty: ⭐⭐⭐ (Advanced)                                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Advanced filter() patterns commonly asked in interviews
 * 
 * 🎯 INTERVIEW IMPORTANCE: CRITICAL
 *    - These are actual interview questions from top tech companies
 */

// =============================================================================
// CHALLENGE: Implement Your Own filter() Function
// =============================================================================
/**
 * Create a function `customFilter` that:
 * - Implements the functionality of Array.filter() from scratch
 * - Takes an array and a callback function
 * - Returns a new array with elements that pass the test
 * - DO NOT use the built-in .filter() method!
 * 
 * @param {Array} array - The array to filter
 * @param {Function} callback - Test function (element, index, array) => boolean
 * @returns {Array} - New filtered array
 * 
 * Examples:
 *   customFilter([1, 2, 3, 4, 5], x => x > 2) → [3, 4, 5]
 *   customFilter(['a', 'bb', 'ccc'], (el, i) => el.length > i) → ['a', 'bb', 'ccc']
 *   customFilter([], x => true) → []
 * 
 * 💡 HINTS:
 *   - Create a result array
 *   - Loop through input array
 *   - Only push elements where callback returns true
 */

function customFilter(array, callback) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter with External Lookup
// =============================================================================
/**
 * Create a function `filterByPermissions` that:
 * - Takes an array of resource objects with 'id' and 'name'
 * - Takes an array of allowed resource ids
 * - Returns only resources the user has permission to access
 * 
 * @param {Array<{id: number, name: string}>} resources
 * @param {number[]} allowedIds - IDs user has access to
 * @returns {Array} - Resources user can access
 * 
 * Examples:
 *   filterByPermissions(
 *     [{id: 1, name: 'Doc1'}, {id: 2, name: 'Doc2'}, {id: 3, name: 'Doc3'}],
 *     [1, 3]
 *   ) → [{id: 1, name: 'Doc1'}, {id: 3, name: 'Doc3'}]
 * 
 * 💡 HINTS:
 *   - Use Set for O(1) lookup performance
 *   - const allowedSet = new Set(allowedIds)
 *   - Filter where allowedSet.has(resource.id)
 */

function filterByPermissions(resources, allowedIds) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter Intersection
// =============================================================================
/**
 * Create a function `filterIntersection` that:
 * - Takes two arrays
 * - Returns elements that exist in BOTH arrays
 * - Result should be unique (no duplicates)
 * 
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array
 * @returns {Array} - Elements common to both arrays
 * 
 * Examples:
 *   filterIntersection([1, 2, 3, 4], [3, 4, 5, 6]) → [3, 4]
 *   filterIntersection([1, 2], [3, 4]) → []
 *   filterIntersection([1, 1, 2, 2], [2, 2, 3, 3]) → [2]
 * 
 * 💡 HINTS:
 *   - Filter arr1 for elements that exist in arr2
 *   - Then remove duplicates from result
 *   - Or use Set for both lookup and uniqueness
 */

function filterIntersection(arr1, arr2) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter Difference
// =============================================================================
/**
 * Create a function `filterDifference` that:
 * - Takes two arrays
 * - Returns elements that exist in arr1 but NOT in arr2
 * - Result should be unique (no duplicates)
 * 
 * @param {Array} arr1 - First array
 * @param {Array} arr2 - Second array to exclude
 * @returns {Array} - Elements in arr1 not in arr2
 * 
 * Examples:
 *   filterDifference([1, 2, 3, 4], [3, 4, 5, 6]) → [1, 2]
 *   filterDifference([1, 2], [3, 4]) → [1, 2]
 *   filterDifference([1, 1, 2, 2], [2, 2]) → [1]
 * 
 * 💡 HINTS:
 *   - Filter arr1 for elements NOT in arr2
 *   - Remove duplicates from result
 */

function filterDifference(arr1, arr2) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter by Nested Property Path
// =============================================================================
/**
 * Create a function `filterByPath` that:
 * - Takes an array of objects with nested properties
 * - Takes a dot-notation path string (e.g., 'user.address.city')
 * - Takes a value to match
 * - Returns objects where the nested property equals the value
 * 
 * @param {Array} objects - Array of objects with nested properties
 * @param {string} path - Dot-notation path to property
 * @param {any} value - Value to match
 * @returns {Array} - Objects matching the condition
 * 
 * Examples:
 *   filterByPath([
 *     {user: {address: {city: 'NYC'}}},
 *     {user: {address: {city: 'LA'}}}
 *   ], 'user.address.city', 'NYC') → [{user: {address: {city: 'NYC'}}}]
 * 
 * 💡 HINTS:
 *   - Split path by '.'
 *   - Use reduce to traverse the nested object
 *   - Handle undefined along the path gracefully
 */

function filterByPath(objects, path, value) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    customFilter,
    filterByPermissions,
    filterIntersection,
    filterDifference,
    filterByPath
};
