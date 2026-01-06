/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 3: Rest Operator - Collecting Remaining Elements                  ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: Rest in Arrays, Rest in Objects, Rest in Function Parameters       ║
 * ║  Difficulty: ⭐⭐ (Interview Ready)                                          ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// =============================================================================
// Task 1: Rest Operator with Arrays
// =============================================================================
/**
 * Create a function separateFirst(arr) that:
 * - Uses array destructuring with REST to separate the first element
 * - Returns an object: { first, remaining }
 * - `remaining` should be a NEW array (not the original)
 * 
 * @param {Array} arr - Any array with at least 1 element
 * @returns {Object} - { first, remaining }
 * 
 * Example:
 *   separateFirst([1, 2, 3, 4, 5])
 *   // Returns: { first: 1, remaining: [2, 3, 4, 5] }
 */

function separateFirst(arr) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Rest Operator with Multiple Leading Elements
// =============================================================================
/**
 * Create a function separateFirstTwo(arr) that:
 * - Extracts the first and second elements individually
 * - Collects the REST into a new array
 * - Returns: { first, second, rest }
 * 
 * @param {Array} arr - Any array
 * @returns {Object} - { first, second, rest }
 * 
 * Example:
 *   separateFirstTwo(["a", "b", "c", "d", "e"])
 *   // Returns: { first: "a", second: "b", rest: ["c", "d", "e"] }
 */

function separateFirstTwo(arr) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Rest Operator with Objects
// =============================================================================
/**
 * Create a function extractId(obj) that:
 * - Extracts the `id` property from the object
 * - Collects all OTHER properties using rest
 * - Returns: { id, otherProps }
 * 
 * @param {Object} obj - Object with an `id` property and other properties
 * @returns {Object} - { id, otherProps }
 * 
 * Example:
 *   extractId({ id: 1, name: "John", age: 25, city: "NYC" })
 *   // Returns: { id: 1, otherProps: { name: "John", age: 25, city: "NYC" } }
 */

function extractId(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Rest Parameters in Functions
// =============================================================================
/**
 * Create a function sumAll(...numbers) that:
 * - Uses REST PARAMETERS to accept any number of arguments
 * - Returns the sum of all numbers
 * - Returns 0 if no arguments are provided
 * 
 * @param {...number} numbers - Any number of numeric arguments
 * @returns {number} - Sum of all arguments
 * 
 * Example:
 *   sumAll(1, 2, 3)       // Returns: 6
 *   sumAll(10, 20)        // Returns: 30
 *   sumAll(5)             // Returns: 5
 *   sumAll()              // Returns: 0
 */

function sumAll(...numbers) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: First Param + Rest Pattern (Common in React)
// =============================================================================
/**
 * Create a function logWithPrefix(prefix, ...messages) that:
 * - Takes a prefix as the first argument
 * - Collects all remaining messages using REST
 * - Returns an array of formatted strings: "[prefix] message"
 * 
 * @param {string} prefix - The prefix to prepend
 * @param {...string} messages - Any number of messages
 * @returns {string[]} - Array of formatted messages
 * 
 * Example:
 *   logWithPrefix("INFO", "Server started", "Port 3000", "Ready")
 *   // Returns: ["[INFO] Server started", "[INFO] Port 3000", "[INFO] Ready"]
 */

function logWithPrefix(prefix, ...messages) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: Object Rest for Props Forwarding (React Pattern)
// =============================================================================
/**
 * Create a function createButtonProps(props) that:
 * - Extracts `variant` and `size` from props (with defaults: "primary", "medium")
 * - Collects all OTHER props using rest (like onClick, disabled, etc.)
 * - Returns: { variant, size, restProps }
 * 
 * This simulates how React components handle custom props vs forwarded props.
 * 
 * @param {Object} props - Button props object
 * @returns {Object} - { variant, size, restProps }
 * 
 * Example:
 *   createButtonProps({ variant: "secondary", onClick: fn, disabled: true })
 *   // Returns: { variant: "secondary", size: "medium", restProps: { onClick: fn, disabled: true } }
 */

function createButtonProps(props) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    separateFirst,
    separateFirstTwo,
    extractId,
    sumAll,
    logWithPrefix,
    createButtonProps
};
