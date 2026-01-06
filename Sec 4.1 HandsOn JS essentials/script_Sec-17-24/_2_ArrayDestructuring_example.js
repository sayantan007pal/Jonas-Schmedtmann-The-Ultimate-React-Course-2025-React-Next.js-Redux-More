/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 2: Array Destructuring - Position-Based Extraction               ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: Array Destructuring, Skipping Elements, Swapping, Nested Arrays    ║
 * ║  Difficulty: ⭐⭐ (Interview Ready)                                          ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// =============================================================================
// Sample Data (Similar to React useState or API responses)
// =============================================================================
const sampleCoordinates = [40.7128, -74.0060, "New York"];
const sampleColors = ["red", "green", "blue", "yellow", "purple"];
const sampleMatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

// =============================================================================
// Task 1: Basic Array Destructuring
// =============================================================================
/**
 * Create a function getFirstTwo(arr) that:
 * - Uses array destructuring to extract the first two elements
 * - Returns an object with properties `first` and `second`
 * 
 * @param {Array} arr - Any array with at least 2 elements
 * @returns {Object} - { first, second }
 * 
 * Example:
 *   getFirstTwo([10, 20, 30, 40])
 *   // Returns: { first: 10, second: 20 }
 */

function getFirstTwo(arr) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Skipping Elements in Destructuring
// =============================================================================
/**
 * Create a function getFirstAndThird(arr) that:
 * - Uses array destructuring to extract the 1st and 3rd elements
 * - SKIPS the 2nd element using a comma
 * - Returns an object with properties `first` and `third`
 * 
 * @param {Array} arr - Any array with at least 3 elements
 * @returns {Object} - { first, third }
 * 
 * Example:
 *   getFirstAndThird(["a", "b", "c", "d"])
 *   // Returns: { first: "a", third: "c" }
 */

function getFirstAndThird(arr) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Swapping Variables with Destructuring
// =============================================================================
/**
 * Create a function swapValues(a, b) that:
 * - Uses array destructuring to swap the two values
 * - Returns an array with the swapped values [b, a]
 * 
 * NOTE: You must use destructuring assignment for the swap!
 * 
 * @param {any} a - First value
 * @param {any} b - Second value
 * @returns {Array} - [b, a] (swapped)
 * 
 * Example:
 *   swapValues(1, 2)
 *   // Returns: [2, 1]
 *   
 *   swapValues("hello", "world")
 *   // Returns: ["world", "hello"]
 */

function swapValues(a, b) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Array Destructuring with Default Values
// =============================================================================
/**
 * Create a function extractWithDefaults(arr) that:
 * - Extracts the first 3 elements from the array
 * - Uses default values: "N/A" for missing elements
 * - Returns an object: { first, second, third }
 * 
 * @param {Array} arr - Array that may have fewer than 3 elements
 * @returns {Object} - { first, second, third }
 * 
 * Example:
 *   extractWithDefaults(["a", "b"])
 *   // Returns: { first: "a", second: "b", third: "N/A" }
 *   
 *   extractWithDefaults([])
 *   // Returns: { first: "N/A", second: "N/A", third: "N/A" }
 */

function extractWithDefaults(arr) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: Nested Array Destructuring
// =============================================================================
/**
 * Create a function extractFromNested(matrix) that:
 * - Takes a 3x3 matrix (array of arrays)
 * - Uses NESTED destructuring to extract:
 *   - First element of first row
 *   - Second element of second row (center of matrix)
 *   - Third element of third row
 * - Returns an object: { topLeft, center, bottomRight }
 * 
 * @param {Array[]} matrix - 3x3 matrix
 * @returns {Object} - { topLeft, center, bottomRight }
 * 
 * Example:
 *   extractFromNested([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
 *   // Returns: { topLeft: 1, center: 5, bottomRight: 9 }
 */

function extractFromNested(matrix) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: React useState Pattern Simulation
// =============================================================================
/**
 * Create a function simulateUseState(initialValue) that:
 * - Returns an array with two elements: [value, setter function]
 * - The setter function should return the new value when called
 * - This simulates React's useState hook pattern
 * 
 * Then use array destructuring to extract both elements and demonstrate usage.
 * 
 * @param {any} initialValue - The initial state value
 * @returns {Array} - [value, setterFunction]
 * 
 * Example:
 *   const [count, setCount] = simulateUseState(0);
 *   count // 0
 *   setCount(5) // Returns 5 (simulating the new state)
 */

function simulateUseState(initialValue) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    getFirstTwo,
    getFirstAndThird,
    swapValues,
    extractWithDefaults,
    extractFromNested,
    simulateUseState,
    sampleCoordinates,
    sampleColors,
    sampleMatrix
};
