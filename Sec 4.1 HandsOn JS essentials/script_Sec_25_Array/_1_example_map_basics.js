/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🗺️ CHALLENGE 1: Array.map() - Basic Transformation                           ║
 * ║                              Difficulty: ⭐ (Beginner)                                           ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: map() transforms EVERY element and returns a NEW array
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - Most common array method in React for rendering lists
 *    - Tests understanding of immutability and transformation
 */

// =============================================================================
// CHALLENGE: Transform Numbers Array
// =============================================================================
/**
 * Create a function `doubleNumbers` that:
 * - Takes an array of numbers
 * - Returns a NEW array where each number is doubled
 * - Original array must NOT be modified
 * 
 * @param {number[]} numbers - Array of numbers to double
 * @returns {number[]} - New array with doubled values
 * 
 * Examples:
 *   doubleNumbers([1, 2, 3, 4, 5]) → [2, 4, 6, 8, 10]
 *   doubleNumbers([0, -5, 10]) → [0, -10, 20]
 *   doubleNumbers([]) → []
 * 
 * 💡 HINTS:
 *   - Use Array.map()
 *   - map() automatically creates a new array
 *   - Each element passes through your callback function
 */

function doubleNumbers(numbers) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Extract Property from Objects
// =============================================================================
/**
 * Create a function `extractNames` that:
 * - Takes an array of person objects (each with 'name' and 'age' properties)
 * - Returns a NEW array containing ONLY the names
 * 
 * @param {Array<{name: string, age: number}>} people - Array of person objects
 * @returns {string[]} - Array of names
 * 
 * Examples:
 *   extractNames([{name: 'Alice', age: 25}, {name: 'Bob', age: 30}]) → ['Alice', 'Bob']
 *   extractNames([]) → []
 *   extractNames([{name: 'Single', age: 1}]) → ['Single']
 * 
 * 💡 HINTS:
 *   - Access the 'name' property of each object
 *   - Use implicit return with arrow function: (person) => person.name
 */

function extractNames(people) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Transform Objects to New Shape
// =============================================================================
/**
 * Create a function `formatUsers` that:
 * - Takes an array of user objects with 'firstName' and 'lastName' properties
 * - Returns a NEW array of objects with a single 'fullName' property
 * 
 * @param {Array<{firstName: string, lastName: string}>} users - Array of user objects
 * @returns {Array<{fullName: string}>} - Array of formatted user objects
 * 
 * Examples:
 *   formatUsers([{firstName: 'John', lastName: 'Doe'}]) → [{fullName: 'John Doe'}]
 *   formatUsers([
 *     {firstName: 'Jane', lastName: 'Smith'},
 *     {firstName: 'Bob', lastName: 'Jones'}
 *   ]) → [{fullName: 'Jane Smith'}, {fullName: 'Bob Jones'}]
 * 
 * 💡 HINTS:
 *   - Return an object from map: (user) => ({ fullName: ... })
 *   - Note the parentheses around the object literal!
 *   - Concatenate firstName + ' ' + lastName
 */

function formatUsers(users) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    doubleNumbers,
    extractNames,
    formatUsers
};
