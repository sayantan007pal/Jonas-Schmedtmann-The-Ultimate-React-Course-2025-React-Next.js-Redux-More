/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 5: Rest vs Spread - Know The Difference!                         ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: Context determines Rest vs Spread, Common Interview Question       ║
 * ║  Difficulty: ⭐⭐⭐ (Interview Critical - Must Know!)                        ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// =============================================================================
// Task 1: Identify Rest vs Spread
// =============================================================================
/**
 * Create a function demonstrateRestVsSpread() that:
 * - Returns an object explaining when ... is REST vs SPREAD
 * - Include examples of each usage
 * 
 * Return format:
 * {
 *   restUsages: [
 *     { context: "description", example: "code snippet" },
 *     ...
 *   ],
 *   spreadUsages: [
 *     { context: "description", example: "code snippet" },
 *     ...
 *   ],
 *   rule: "The simple rule to remember"
 * }
 */

function demonstrateRestVsSpread() {
    // ==================== YOUR CODE HERE ====================
    
    return {
        restUsages: [
            // Fill in at least 3 REST usage contexts
        ],
        spreadUsages: [
            // Fill in at least 3 SPREAD usage contexts
        ],
        rule: "" // Fill in the simple rule
    };
    
    // ========================================================
}


// =============================================================================
// Task 2: Collect and Spread Pattern
// =============================================================================
/**
 * Create a function collectAndDouble(...numbers) that:
 * - Uses REST to collect any number of arguments
 * - Doubles each number
 * - Uses SPREAD to return them as individual elements in an array
 * 
 * @param {...number} numbers - Any number of numeric arguments
 * @returns {number[]} - Array of doubled numbers
 * 
 * Example:
 *   collectAndDouble(1, 2, 3)  // [2, 4, 6]
 */

function collectAndDouble(...numbers) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Object Pick and Omit
// =============================================================================
/**
 * Create TWO functions:
 * 
 * 1. pickProperties(obj, ...keys) - Returns NEW object with ONLY specified keys
 * 2. omitProperties(obj, ...keys) - Returns NEW object WITHOUT specified keys
 * 
 * Both should use REST to collect keys and produce immutable results.
 * 
 * Example:
 *   pickProperties({ a: 1, b: 2, c: 3 }, "a", "c")  // { a: 1, c: 3 }
 *   omitProperties({ a: 1, b: 2, c: 3 }, "b")       // { a: 1, c: 3 }
 */

function pickProperties(obj, ...keys) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

function omitProperties(obj, ...keys) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Function Composition with Rest/Spread
// =============================================================================
/**
 * Create a function pipe(...fns) that:
 * - Accepts any number of functions via REST
 * - Returns a NEW function that applies them left-to-right
 * - The returned function should accept any number of initial arguments
 * 
 * @param {...Function} fns - Functions to compose
 * @returns {Function} - Composed function
 * 
 * Example:
 *   const addOne = x => x + 1;
 *   const double = x => x * 2;
 *   const addThenDouble = pipe(addOne, double);
 *   addThenDouble(5)  // (5 + 1) * 2 = 12
 */

function pipe(...fns) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: Merge Multiple Objects (Real Interview Question!)
// =============================================================================
/**
 * Create a function mergeObjects(...objects) that:
 * - Accepts any number of objects via REST
 * - Merges all of them into a single NEW object using SPREAD
 * - Later objects should override earlier ones (like Object.assign)
 * 
 * @param {...Object} objects - Objects to merge
 * @returns {Object} - Merged object
 * 
 * Example:
 *   mergeObjects({ a: 1 }, { b: 2 }, { a: 3, c: 4 })
 *   // { a: 3, b: 2, c: 4 }
 */

function mergeObjects(...objects) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: React Props Pattern - Extract & Forward
// =============================================================================
/**
 * Create a function createComponent(props) that simulates React component props:
 * - Extracts `className` and `style` using destructuring with defaults
 * - Collects all OTHER props using REST
 * - Returns object: { className, style, forwardedProps }
 * 
 * Default values:
 * - className: ""
 * - style: {}
 * 
 * @param {Object} props - Component props
 * @returns {Object} - { className, style, forwardedProps }
 * 
 * Example:
 *   createComponent({ className: "btn", onClick: fn, disabled: true })
 *   // { className: "btn", style: {}, forwardedProps: { onClick: fn, disabled: true } }
 */

function createComponent(props) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    demonstrateRestVsSpread,
    collectAndDouble,
    pickProperties,
    omitProperties,
    pipe,
    mergeObjects,
    createComponent
};
