/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🗺️ CHALLENGE 2: Array.map() - Advanced Transformation                        ║
 * ║                              Difficulty: ⭐⭐ (Intermediate)                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Using index parameter and handling nested data with map()
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - Index is crucial for React keys and numbering
 *    - Nested data transformation is common in real APIs
 */

// =============================================================================
// CHALLENGE: Add Index to Elements
// =============================================================================
/**
 * Create a function `addRanking` that:
 * - Takes an array of player names
 * - Returns array of objects with 'rank' (1-based) and 'name'
 * 
 * @param {string[]} players - Array of player names
 * @returns {Array<{rank: number, name: string}>} - Array with ranking info
 * 
 * Examples:
 *   addRanking(['Alice', 'Bob', 'Charlie']) → 
 *     [{rank: 1, name: 'Alice'}, {rank: 2, name: 'Bob'}, {rank: 3, name: 'Charlie'}]
 *   addRanking([]) → []
 * 
 * 💡 HINTS:
 *   - map() callback receives (element, index, array)
 *   - index is 0-based, rank should be 1-based (index + 1)
 */

function addRanking(players) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Calculate Derived Values
// =============================================================================
/**
 * Create a function `calculateTotalPrice` that:
 * - Takes an array of cart items with 'name', 'price', and 'quantity'
 * - Returns array with added 'total' property (price × quantity)
 * 
 * @param {Array<{name: string, price: number, quantity: number}>} items
 * @returns {Array<{name: string, price: number, quantity: number, total: number}>}
 * 
 * Examples:
 *   calculateTotalPrice([
 *     {name: 'Apple', price: 1.5, quantity: 3},
 *     {name: 'Banana', price: 0.5, quantity: 6}
 *   ]) → [
 *     {name: 'Apple', price: 1.5, quantity: 3, total: 4.5},
 *     {name: 'Banana', price: 0.5, quantity: 6, total: 3}
 *   ]
 * 
 * 💡 HINTS:
 *   - Use spread operator: {...item, total: calculation}
 *   - This pattern is VERY common in React for adding derived state
 */

function calculateTotalPrice(items) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Transform Nested Data
// =============================================================================
/**
 * Create a function `extractBookInfo` that:
 * - Takes an array of book objects with nested 'reviews' object
 * - Returns array with 'title', 'author', and 'avgRating' (average of reviews)
 * 
 * Book structure:
 * {
 *   title: string,
 *   author: string,
 *   reviews: {
 *     goodreads: { rating: number },
 *     amazon: { rating: number }
 *   }
 * }
 * 
 * @param {Array} books - Array of book objects
 * @returns {Array<{title: string, author: string, avgRating: number}>}
 * 
 * Examples:
 *   extractBookInfo([{
 *     title: 'Dune',
 *     author: 'Frank Herbert',
 *     reviews: { goodreads: { rating: 4.5 }, amazon: { rating: 4.3 } }
 *   }]) → [{title: 'Dune', author: 'Frank Herbert', avgRating: 4.4}]
 * 
 * 💡 HINTS:
 *   - Access nested properties: book.reviews.goodreads.rating
 *   - Average = (rating1 + rating2) / 2
 *   - Handle missing review platforms with optional chaining (?.) or defaults
 */

function extractBookInfo(books) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Conditional Transformation
// =============================================================================
/**
 * Create a function `applyDiscount` that:
 * - Takes an array of products with 'name', 'price', and 'onSale' boolean
 * - Returns new array where items with onSale=true have 20% discount applied
 * - Items NOT on sale keep original price
 * 
 * @param {Array<{name: string, price: number, onSale: boolean}>} products
 * @returns {Array<{name: string, price: number, onSale: boolean}>}
 * 
 * Examples:
 *   applyDiscount([
 *     {name: 'Shirt', price: 50, onSale: true},
 *     {name: 'Pants', price: 80, onSale: false}
 *   ]) → [
 *     {name: 'Shirt', price: 40, onSale: true},
 *     {name: 'Pants', price: 80, onSale: false}
 *   ]
 * 
 * 💡 HINTS:
 *   - Use ternary operator: condition ? value1 : value2
 *   - 20% discount means multiply by 0.8
 *   - Remember to spread the original object first!
 */

function applyDiscount(products) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    addRanking,
    calculateTotalPrice,
    extractBookInfo,
    applyDiscount
};
