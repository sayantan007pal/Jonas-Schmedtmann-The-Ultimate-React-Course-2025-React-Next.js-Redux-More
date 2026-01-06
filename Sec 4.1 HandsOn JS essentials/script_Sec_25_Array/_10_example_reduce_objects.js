/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📊 CHALLENGE 10: Array.reduce() - Object Building                             ║
 * ║                              Difficulty: ⭐⭐ (Intermediate)                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Using reduce() to build objects from arrays
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - Very common pattern in real applications
 *    - Demonstrates understanding of reduce() with object accumulator
 */

// =============================================================================
// CHALLENGE: Array to Object by ID
// =============================================================================
/**
 * Create a function `arrayToObjectById` that:
 * - Takes an array of objects, each with an 'id' property
 * - Returns an object where keys are ids and values are the objects
 * 
 * @param {Array<{id: number|string, [key: string]: any}>} array
 * @returns {Object} - Object keyed by id
 * 
 * Examples:
 *   arrayToObjectById([
 *     {id: 1, name: 'Alice'},
 *     {id: 2, name: 'Bob'}
 *   ]) → {
 *     1: {id: 1, name: 'Alice'},
 *     2: {id: 2, name: 'Bob'}
 *   }
 * 
 * 💡 HINTS:
 *   - Initial value: {}
 *   - For each item: acc[item.id] = item
 *   - Don't forget to return acc!
 */

function arrayToObjectById(array) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Group By Property
// =============================================================================
/**
 * Create a function `groupBy` that:
 * - Takes an array of objects
 * - Takes a property name to group by
 * - Returns an object where keys are unique values of that property
 * - Values are arrays of objects with that property value
 * 
 * @param {Array} array - Array of objects
 * @param {string} property - Property name to group by
 * @returns {Object} - Grouped object
 * 
 * Examples:
 *   groupBy([
 *     {name: 'Alice', department: 'Engineering'},
 *     {name: 'Bob', department: 'Sales'},
 *     {name: 'Charlie', department: 'Engineering'}
 *   ], 'department') → {
 *     Engineering: [{name: 'Alice', department: 'Engineering'}, {name: 'Charlie', department: 'Engineering'}],
 *     Sales: [{name: 'Bob', department: 'Sales'}]
 *   }
 * 
 * 💡 HINTS:
 *   - Get the property value: item[property]
 *   - If key doesn't exist, initialize with empty array
 *   - Push item to the array for that key
 */

function groupBy(array, property) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Create Lookup Table
// =============================================================================
/**
 * Create a function `createLookup` that:
 * - Takes an array of objects
 * - Takes a key property name
 * - Takes a value property name
 * - Returns an object mapping keys to values
 * 
 * @param {Array} array - Array of objects
 * @param {string} keyProp - Property to use as key
 * @param {string} valueProp - Property to use as value
 * @returns {Object} - Lookup object
 * 
 * Examples:
 *   createLookup([
 *     {code: 'US', name: 'United States'},
 *     {code: 'UK', name: 'United Kingdom'}
 *   ], 'code', 'name') → {
 *     US: 'United States',
 *     UK: 'United Kingdom'
 *   }
 * 
 * 💡 HINTS:
 *   - acc[item[keyProp]] = item[valueProp]
 */

function createLookup(array, keyProp, valueProp) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Compute Statistics Object
// =============================================================================
/**
 * Create a function `computeStats` that:
 * - Takes an array of numbers
 * - Returns an object with: sum, count, average, min, max
 * - For empty array, return appropriate defaults
 * 
 * @param {number[]} numbers - Array of numbers
 * @returns {{sum: number, count: number, average: number, min: number, max: number}}
 * 
 * Examples:
 *   computeStats([1, 2, 3, 4, 5]) → {
 *     sum: 15,
 *     count: 5,
 *     average: 3,
 *     min: 1,
 *     max: 5
 *   }
 *   computeStats([]) → {sum: 0, count: 0, average: 0, min: Infinity, max: -Infinity}
 * 
 * 💡 HINTS:
 *   - Use reduce to build stats object in one pass
 *   - Or compute each property separately
 *   - Handle empty array edge case for average
 */

function computeStats(numbers) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    arrayToObjectById,
    groupBy,
    createLookup,
    computeStats
};
