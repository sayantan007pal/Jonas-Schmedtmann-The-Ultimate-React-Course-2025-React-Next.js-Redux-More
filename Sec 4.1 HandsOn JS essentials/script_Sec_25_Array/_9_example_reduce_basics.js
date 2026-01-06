/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📊 CHALLENGE 9: Array.reduce() - Basic Accumulation                           ║
 * ║                              Difficulty: ⭐ (Beginner)                                           ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: reduce() "boils down" an array to a single value using an accumulator
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - Most powerful array method - can implement map, filter, and more
 *    - Tests understanding of accumulator pattern
 */

// =============================================================================
// CHALLENGE: Sum All Numbers
// =============================================================================
/**
 * Create a function `sumAll` that:
 * - Takes an array of numbers
 * - Returns the sum of all numbers
 * 
 * @param {number[]} numbers - Array of numbers
 * @returns {number} - Sum of all numbers
 * 
 * Examples:
 *   sumAll([1, 2, 3, 4, 5]) → 15
 *   sumAll([10, -5, 3]) → 8
 *   sumAll([]) → 0
 *   sumAll([100]) → 100
 * 
 * 💡 HINTS:
 *   - Use reduce with initial value of 0
 *   - Accumulator + current = new accumulator
 */

function sumAll(numbers) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Find Maximum Value
// =============================================================================
/**
 * Create a function `findMax` that:
 * - Takes an array of numbers
 * - Returns the maximum value
 * - For empty array, return -Infinity
 * 
 * @param {number[]} numbers - Array of numbers
 * @returns {number} - Maximum value
 * 
 * Examples:
 *   findMax([1, 5, 3, 9, 2]) → 9
 *   findMax([-10, -5, -1]) → -1
 *   findMax([42]) → 42
 *   findMax([]) → -Infinity
 * 
 * 💡 HINTS:
 *   - Initial value should be -Infinity (smallest possible)
 *   - Compare accumulator with current, return the larger
 *   - Use Math.max(acc, curr) or ternary operator
 */

function findMax(numbers) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Count Occurrences
// =============================================================================
/**
 * Create a function `countOccurrences` that:
 * - Takes an array of values
 * - Returns an object where keys are unique values, values are counts
 * 
 * @param {Array} array - Array of values to count
 * @returns {Object} - Object with counts
 * 
 * Examples:
 *   countOccurrences(['a', 'b', 'a', 'c', 'a', 'b']) → {a: 3, b: 2, c: 1}
 *   countOccurrences([1, 2, 1, 3, 1, 2]) → {1: 3, 2: 2, 3: 1}
 *   countOccurrences([]) → {}
 * 
 * 💡 HINTS:
 *   - Initial value is an empty object {}
 *   - For each element, increment its count (or set to 1 if first time)
 *   - acc[curr] = (acc[curr] || 0) + 1
 */

function countOccurrences(array) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Calculate Total Price
// =============================================================================
/**
 * Create a function `calculateTotal` that:
 * - Takes an array of cart items with 'price' and 'quantity'
 * - Returns the total price of all items
 * 
 * @param {Array<{name: string, price: number, quantity: number}>} items
 * @returns {number} - Total price
 * 
 * Examples:
 *   calculateTotal([
 *     {name: 'Apple', price: 1.5, quantity: 3},
 *     {name: 'Banana', price: 0.5, quantity: 6}
 *   ]) → 7.5  (1.5*3 + 0.5*6)
 *   calculateTotal([]) → 0
 * 
 * 💡 HINTS:
 *   - accumulator + (item.price * item.quantity)
 *   - Initial value is 0
 */

function calculateTotal(items) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    sumAll,
    findMax,
    countOccurrences,
    calculateTotal
};
