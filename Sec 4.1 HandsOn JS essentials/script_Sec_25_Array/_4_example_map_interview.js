/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🗺️ CHALLENGE 4: Array.map() - Interview-Level                                ║
 * ║                              Difficulty: ⭐⭐⭐ (Advanced)                                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Complex map() transformations commonly asked in interviews
 * 
 * 🎯 INTERVIEW IMPORTANCE: CRITICAL
 *    - These are actual interview questions from top tech companies
 *    - Tests deep understanding of map() and data transformation
 */

// =============================================================================
// CHALLENGE: Implement Your Own map() Function
// =============================================================================
/**
 * Create a function `customMap` that:
 * - Implements the functionality of Array.map() from scratch
 * - Takes an array and a callback function
 * - Returns a new array with transformed values
 * - DO NOT use the built-in .map() method!
 * 
 * @param {Array} array - The array to transform
 * @param {Function} callback - Function to apply to each element (element, index, array) => newValue
 * @returns {Array} - New transformed array
 * 
 * Examples:
 *   customMap([1, 2, 3], x => x * 2) → [2, 4, 6]
 *   customMap(['a', 'b'], (el, i) => el + i) → ['a0', 'b1']
 *   customMap([], x => x) → []
 * 
 * 💡 HINTS:
 *   - Use a for loop to iterate through the array
 *   - Create a new result array
 *   - Push transformed values to the result array
 *   - The callback receives (element, index, originalArray)
 */

function customMap(array, callback) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Matrix Transformation
// =============================================================================
/**
 * Create a function `transformMatrix` that:
 * - Takes a 2D array (matrix) of numbers
 * - Returns a new matrix where each element is squared
 * - Preserve the matrix structure (rows and columns)
 * 
 * @param {number[][]} matrix - 2D array of numbers
 * @returns {number[][]} - New matrix with squared values
 * 
 * Examples:
 *   transformMatrix([[1, 2], [3, 4]]) → [[1, 4], [9, 16]]
 *   transformMatrix([[1, 2, 3]]) → [[1, 4, 9]]
 *   transformMatrix([]) → []
 * 
 * 💡 HINTS:
 *   - You need NESTED map() calls
 *   - Outer map() iterates over rows
 *   - Inner map() iterates over elements in each row
 */

function transformMatrix(matrix) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Group and Transform
// =============================================================================
/**
 * Create a function `groupByCategory` that:
 * - Takes an array of product objects with 'name', 'category', 'price'
 * - Returns an OBJECT where keys are categories
 * - Each category contains array of product names in that category
 * 
 * @param {Array<{name: string, category: string, price: number}>} products
 * @returns {Object} - Object with categories as keys and arrays of names as values
 * 
 * Examples:
 *   groupByCategory([
 *     {name: 'iPhone', category: 'Electronics', price: 999},
 *     {name: 'MacBook', category: 'Electronics', price: 1999},
 *     {name: 'Shirt', category: 'Clothing', price: 50}
 *   ]) → {
 *     Electronics: ['iPhone', 'MacBook'],
 *     Clothing: ['Shirt']
 *   }
 * 
 * 💡 HINTS:
 *   - This is actually better solved with reduce(), but you CAN use map()
 *   - Consider using reduce() for the grouping logic
 *   - Or use map() + Object.fromEntries() pattern
 */

function groupByCategory(products) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Flatten and Transform Nested Data
// =============================================================================
/**
 * Create a function `flattenOrderItems` that:
 * - Takes an array of order objects, each with 'orderId' and 'items' array
 * - Returns a flat array of all items with 'orderId' added to each item
 * 
 * @param {Array<{orderId: number, items: Array<{name: string, qty: number}>}>} orders
 * @returns {Array<{orderId: number, name: string, qty: number}>}
 * 
 * Examples:
 *   flattenOrderItems([
 *     {orderId: 1, items: [{name: 'Apple', qty: 2}, {name: 'Banana', qty: 3}]},
 *     {orderId: 2, items: [{name: 'Orange', qty: 1}]}
 *   ]) → [
 *     {orderId: 1, name: 'Apple', qty: 2},
 *     {orderId: 1, name: 'Banana', qty: 3},
 *     {orderId: 2, name: 'Orange', qty: 1}
 *   ]
 * 
 * 💡 HINTS:
 *   - Use flatMap() or map() + flat()
 *   - flatMap() = map() followed by flat(1)
 *   - For each order, map over items and add orderId
 */

function flattenOrderItems(orders) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    customMap,
    transformMatrix,
    groupByCategory,
    flattenOrderItems
};
