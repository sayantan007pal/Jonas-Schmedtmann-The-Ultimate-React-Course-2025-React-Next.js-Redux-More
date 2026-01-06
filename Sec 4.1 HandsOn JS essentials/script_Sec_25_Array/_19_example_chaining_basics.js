/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📊 CHALLENGE 19: Method Chaining - Basics                                     ║
 * ║                              Difficulty: ⭐⭐ (Intermediate)                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Combining map, filter, reduce, and sort in chains
 * 
 * Method chaining is a powerful pattern for data transformation:
 *   array.filter(...).map(...).sort(...).reduce(...)
 * 
 * Each method returns a new array, allowing the next method to operate on it.
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - Shows understanding of functional programming
 *    - Common in real-world React data processing
 */

// =============================================================================
// CHALLENGE: Filter Then Map
// =============================================================================
/**
 * Create a function `filterThenMap` that:
 * - Filters numbers greater than a threshold
 * - Maps remaining numbers by doubling them
 * - Returns the result
 * 
 * @param {number[]} numbers - Array of numbers
 * @param {number} threshold - Minimum value (exclusive)
 * @returns {number[]} - Filtered and doubled numbers
 * 
 * Examples:
 *   filterThenMap([1, 5, 3, 8, 2], 3) → [10, 16] // Only 5, 8 are > 3, then doubled
 *   filterThenMap([1, 2, 3], 10) → [] // Nothing > 10
 * 
 * 💡 HINTS:
 *   - Chain: numbers.filter(n => n > threshold).map(n => n * 2)
 */

function filterThenMap(numbers, threshold) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Map Then Filter
// =============================================================================
/**
 * Create a function `mapThenFilter` that:
 * - First doubles all numbers
 * - Then filters to keep only those divisible by 4
 * - Returns the result
 * 
 * @param {number[]} numbers - Array of numbers
 * @returns {number[]} - Doubled numbers that are divisible by 4
 * 
 * Examples:
 *   mapThenFilter([1, 2, 3, 4, 5, 6]) → [4, 8, 12] // doubled: [2,4,6,8,10,12], filter %4===0
 *   mapThenFilter([1, 3, 5]) → [] // doubled: [2, 6, 10], none divisible by 4
 * 
 * 💡 HINTS:
 *   - Chain: numbers.map(...).filter(...)
 */

function mapThenFilter(numbers) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter, Map, Sort
// =============================================================================
/**
 * Create a function `processProducts` that:
 * - Filters products that are in stock
 * - Maps to just the product names
 * - Sorts names alphabetically
 * - Returns the sorted names
 * 
 * @param {Object[]} products - Array of product objects
 * @returns {string[]} - Sorted names of in-stock products
 * 
 * Examples:
 *   processProducts([
 *     { name: 'Banana', inStock: true },
 *     { name: 'Apple', inStock: true },
 *     { name: 'Cherry', inStock: false }
 *   ]) → ['Apple', 'Banana']
 * 
 * 💡 HINTS:
 *   - products.filter(p => p.inStock).map(p => p.name).sort()
 */

function processProducts(products) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter, Map, Reduce
// =============================================================================
/**
 * Create a function `calculateDiscountedTotal` that:
 * - Filters items with discount applied
 * - Maps to calculate discounted prices
 * - Reduces to sum total
 * - Returns the total
 * 
 * @param {Object[]} items - Array of item objects with price and discount (as decimal)
 * @returns {number} - Total of discounted items
 * 
 * Examples:
 *   calculateDiscountedTotal([
 *     { name: 'A', price: 100, discount: 0.1 },  // discounted: 90
 *     { name: 'B', price: 50, discount: 0 },     // no discount, exclude
 *     { name: 'C', price: 200, discount: 0.2 }   // discounted: 160
 *   ]) → 250
 * 
 * 💡 HINTS:
 *   - Filter: item.discount > 0
 *   - Map: price * (1 - discount)
 *   - Reduce: sum all values
 */

function calculateDiscountedTotal(items) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Get Top N (Filter, Sort, Slice)
// =============================================================================
/**
 * Create a function `getTopScorers` that:
 * - Filters students with score above passing grade
 * - Sorts by score descending (highest first)
 * - Takes only top N students
 * - Returns their names
 * 
 * @param {Object[]} students - Array of student objects
 * @param {number} passingScore - Minimum passing score
 * @param {number} topN - Number of top students to return
 * @returns {string[]} - Names of top N passing students
 * 
 * Examples:
 *   getTopScorers([
 *     { name: 'Alice', score: 95 },
 *     { name: 'Bob', score: 60 },
 *     { name: 'Charlie', score: 85 },
 *     { name: 'Dave', score: 45 }
 *   ], 50, 2) → ['Alice', 'Charlie']  // Bob and Charlie pass, top 2 by score
 * 
 * 💡 HINTS:
 *   - Chain: filter → sort → slice → map
 */

function getTopScorers(students, passingScore, topN) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    filterThenMap,
    mapThenFilter,
    processProducts,
    calculateDiscountedTotal,
    getTopScorers
};
