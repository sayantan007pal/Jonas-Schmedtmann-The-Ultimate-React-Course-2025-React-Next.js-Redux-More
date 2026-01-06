/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📊 CHALLENGE 14: Array.sort() - Advanced Compare Functions                    ║
 * ║                              Difficulty: ⭐⭐ (Intermediate)                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Complex compare functions for objects and multi-criteria sorting
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - Sorting objects is extremely common in React apps
 *    - Multi-criteria sorting shows problem-solving skills
 */

// =============================================================================
// CHALLENGE: Sort Objects by Property
// =============================================================================
/**
 * Create a function `sortByProperty` that:
 * - Sorts an array of objects by a given property
 * - Handles both string and number properties
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {Object[]} array - Array of objects
 * @param {string} property - Property name to sort by
 * @param {string} order - 'asc' or 'desc' (default: 'asc')
 * @returns {Object[]} - New sorted array
 * 
 * Examples:
 *   sortByProperty([{age: 30}, {age: 20}], 'age') → [{age: 20}, {age: 30}]
 *   sortByProperty([{name: 'Bob'}, {name: 'Alice'}], 'name') → [{name: 'Alice'}, {name: 'Bob'}]
 *   sortByProperty([{age: 20}, {age: 30}], 'age', 'desc') → [{age: 30}, {age: 20}]
 * 
 * 💡 HINTS:
 *   - Check typeof for string vs number comparison
 *   - Use localeCompare() for strings
 */

function sortByProperty(array, property, order = 'asc') {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Sort by Multiple Criteria
// =============================================================================
/**
 * Create a function `sortByMultiple` that:
 * - Sorts by primary property first, then secondary if tied
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {Object[]} array - Array of objects
 * @param {string} primary - Primary property to sort by
 * @param {string} secondary - Secondary property for ties
 * @returns {Object[]} - New sorted array
 * 
 * Examples:
 *   const users = [
 *     { name: 'Alice', age: 25 },
 *     { name: 'Bob', age: 25 },
 *     { name: 'Alice', age: 30 }
 *   ];
 *   sortByMultiple(users, 'name', 'age') → [
 *     { name: 'Alice', age: 25 },
 *     { name: 'Alice', age: 30 },
 *     { name: 'Bob', age: 25 }
 *   ]
 * 
 * 💡 HINTS:
 *   - If primary comparison is 0 (equal), use secondary
 *   - Use || to chain comparisons: primary || secondary
 */

function sortByMultiple(array, primary, secondary) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Sort Dates
// =============================================================================
/**
 * Create a function `sortByDate` that:
 * - Sorts objects by a date property (newest first)
 * - Date property can be Date object or ISO string
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {Object[]} array - Array of objects with date property
 * @param {string} dateProperty - Name of the date property
 * @returns {Object[]} - New sorted array (newest first)
 * 
 * Examples:
 *   sortByDate([
 *     { title: 'A', date: '2023-01-01' },
 *     { title: 'B', date: '2024-01-01' }
 *   ], 'date') → [{ title: 'B', ... }, { title: 'A', ... }]
 * 
 * 💡 HINTS:
 *   - new Date(a) - new Date(b) compares dates
 *   - For newest first, sort descending: b - a
 */

function sortByDate(array, dateProperty) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Sort with Null/Undefined Handling
// =============================================================================
/**
 * Create a function `sortWithNulls` that:
 * - Sorts by a property, putting null/undefined values at the end
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {Object[]} array - Array of objects
 * @param {string} property - Property to sort by
 * @returns {Object[]} - New sorted array (nulls at end)
 * 
 * Examples:
 *   sortWithNulls([
 *     { name: 'Bob' },
 *     { name: null },
 *     { name: 'Alice' }
 *   ], 'name') → [{ name: 'Alice' }, { name: 'Bob' }, { name: null }]
 * 
 * 💡 HINTS:
 *   - Check if value is null or undefined first
 *   - Return 1 to push nulls down, -1 to push nulls up
 */

function sortWithNulls(array, property) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Custom Priority Sort
// =============================================================================
/**
 * Create a function `sortByPriority` that:
 * - Sorts based on a priority array (custom order)
 * - Items not in priority array go to the end
 * - Returns a NEW sorted array (do NOT mutate original)
 * 
 * @param {any[]} array - Array to sort
 * @param {any[]} priorityOrder - Array defining priority (first = highest)
 * @returns {any[]} - New sorted array by priority
 * 
 * Examples:
 *   sortByPriority(
 *     ['high', 'low', 'medium', 'critical'],
 *     ['critical', 'high', 'medium', 'low']
 *   ) → ['critical', 'high', 'medium', 'low']
 *   
 *   sortByPriority(
 *     ['c', 'a', 'b', 'x'],
 *     ['a', 'b', 'c']
 *   ) → ['a', 'b', 'c', 'x']  // 'x' not in priority, goes to end
 * 
 * 💡 HINTS:
 *   - Use indexOf() to get priority position
 *   - indexOf returns -1 if not found, treat as Infinity for end position
 */

function sortByPriority(array, priorityOrder) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    sortByProperty,
    sortByMultiple,
    sortByDate,
    sortWithNulls,
    sortByPriority
};
