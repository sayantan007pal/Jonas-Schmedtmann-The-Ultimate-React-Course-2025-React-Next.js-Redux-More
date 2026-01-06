/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🎯 CHALLENGE 5: Array.filter() - Basic Selection                              ║
 * ║                              Difficulty: ⭐ (Beginner)                                           ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: filter() selects elements that pass a test, returns NEW array
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - Essential for conditional rendering in React
 *    - Used for search, filtering lists, removing items
 */

// =============================================================================
// CHALLENGE: Filter Numbers Above Threshold
// =============================================================================
/**
 * Create a function `filterAbove` that:
 * - Takes an array of numbers and a threshold value
 * - Returns a NEW array containing only numbers GREATER than the threshold
 * 
 * @param {number[]} numbers - Array of numbers
 * @param {number} threshold - The minimum value (exclusive)
 * @returns {number[]} - Numbers greater than threshold
 * 
 * Examples:
 *   filterAbove([1, 5, 10, 15, 20], 10) → [15, 20]
 *   filterAbove([1, 2, 3], 10) → []
 *   filterAbove([100, 200, 300], 0) → [100, 200, 300]
 *   filterAbove([], 5) → []
 * 
 * 💡 HINTS:
 *   - filter() callback should return true to INCLUDE an element
 *   - Return num > threshold (not >=)
 */

function filterAbove(numbers, threshold) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter Objects by Property
// =============================================================================
/**
 * Create a function `filterActiveUsers` that:
 * - Takes an array of user objects with 'name', 'email', 'isActive'
 * - Returns array containing ONLY active users (isActive === true)
 * 
 * @param {Array<{name: string, email: string, isActive: boolean}>} users
 * @returns {Array<{name: string, email: string, isActive: boolean}>}
 * 
 * Examples:
 *   filterActiveUsers([
 *     {name: 'Alice', email: 'a@test.com', isActive: true},
 *     {name: 'Bob', email: 'b@test.com', isActive: false}
 *   ]) → [{name: 'Alice', email: 'a@test.com', isActive: true}]
 * 
 * 💡 HINTS:
 *   - Access the isActive property: user.isActive
 *   - Can simplify to just (user) => user.isActive
 */

function filterActiveUsers(users) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter by String Match
// =============================================================================
/**
 * Create a function `filterBySearch` that:
 * - Takes an array of product names and a search term
 * - Returns products that INCLUDE the search term (case-insensitive)
 * 
 * @param {string[]} products - Array of product names
 * @param {string} searchTerm - Term to search for
 * @returns {string[]} - Matching products
 * 
 * Examples:
 *   filterBySearch(['iPhone', 'iPad', 'MacBook', 'Apple Watch'], 'i') 
 *     → ['iPhone', 'iPad']
 *   filterBySearch(['iPhone', 'iPad', 'MacBook'], 'IPHONE') 
 *     → ['iPhone']
 *   filterBySearch(['A', 'B', 'C'], 'xyz') → []
 * 
 * 💡 HINTS:
 *   - Use .toLowerCase() on BOTH the product and searchTerm
 *   - Use .includes() to check if term is in the string
 */

function filterBySearch(products, searchTerm) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter Unique Values
// =============================================================================
/**
 * Create a function `filterDuplicates` that:
 * - Takes an array that may contain duplicate values
 * - Returns a NEW array with only unique values (first occurrence kept)
 * 
 * @param {Array} array - Array with potential duplicates
 * @returns {Array} - Array with unique values only
 * 
 * Examples:
 *   filterDuplicates([1, 2, 2, 3, 3, 3]) → [1, 2, 3]
 *   filterDuplicates(['a', 'b', 'a', 'c']) → ['a', 'b', 'c']
 *   filterDuplicates([]) → []
 *   filterDuplicates([1, 1, 1, 1]) → [1]
 * 
 * 💡 HINTS:
 *   - filter() receives (element, index, array)
 *   - indexOf() returns the FIRST index of an element
 *   - Keep element only if current index === indexOf(element)
 */

function filterDuplicates(array) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    filterAbove,
    filterActiveUsers,
    filterBySearch,
    filterDuplicates
};
