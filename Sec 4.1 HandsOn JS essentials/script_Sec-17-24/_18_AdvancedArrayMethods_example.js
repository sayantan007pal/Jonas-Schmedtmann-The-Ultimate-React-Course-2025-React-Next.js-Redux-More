/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 18: Advanced Array Methods + All Patterns                        ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: Map, Filter, Reduce with Modern JS Patterns                        ║
 * ║  Difficulty: ⭐⭐⭐⭐⭐ (Interview Level)                                    ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// =============================================================================
// Task 1: Group By Key (Common Interview Question)
// =============================================================================
/**
 * Create a function groupBy(items, keyOrFn) that:
 * - If keyOrFn is string: groups by that property
 * - If keyOrFn is function: groups by return value of function
 * 
 * Example:
 * groupBy([{ type: "a", v: 1 }, { type: "b", v: 2 }, { type: "a", v: 3 }], "type")
 * → { a: [{ type: "a", v: 1 }, { type: "a", v: 3 }], b: [{ type: "b", v: 2 }] }
 * 
 * Uses: reduce, destructuring, spread, ternary
 * 
 * @param {Array} items
 * @param {string|Function} keyOrFn
 * @returns {Object}
 */

function groupBy(items, keyOrFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Chunk Array (Split into Groups)
// =============================================================================
/**
 * Create a function chunk(array, size) that:
 * - Splits array into chunks of given size
 * - Last chunk may be smaller
 * 
 * Example:
 * chunk([1, 2, 3, 4, 5], 2) → [[1, 2], [3, 4], [5]]
 * 
 * Uses: reduce, spread
 * 
 * @param {Array} array
 * @param {number} size
 * @returns {Array[]}
 */

function chunk(array, size) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Deep Pick Properties
// =============================================================================
/**
 * Create a function deepPick(obj, paths) that:
 * - paths: array of dot-notation paths like ["user.name", "user.email", "meta.id"]
 * - Extracts values at those paths
 * - Returns flat object with path as key
 * 
 * Example:
 * deepPick(
 *   { user: { name: "John", email: "j@test.com", age: 30 }, meta: { id: 1 } },
 *   ["user.name", "meta.id"]
 * )
 * → { "user.name": "John", "meta.id": 1 }
 * 
 * Uses: reduce, optional chaining logic, spread
 */

function deepPick(obj, paths) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Difference and Intersection
// =============================================================================
/**
 * Create functions:
 * 
 * 1. difference(arr1, arr2) - Items in arr1 but not in arr2
 * 2. intersection(arr1, arr2) - Items in both arrays
 * 3. symmetricDifference(arr1, arr2) - Items in one but not both
 * 
 * For object arrays, provide compareFn as third parameter
 * 
 * @param {Array} arr1
 * @param {Array} arr2
 * @param {Function} [compareFn] - (a, b) => boolean
 */

function difference(arr1, arr2, compareFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

function intersection(arr1, arr2, compareFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

function symmetricDifference(arr1, arr2, compareFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: Sort with Multiple Criteria
// =============================================================================
/**
 * Create a function sortBy(array, ...criteria) that:
 * - criteria: array of { key: string, order: "asc" | "desc" }
 * - Sorts by first criteria, then by second for ties, etc.
 * - Returns NEW sorted array (immutable)
 * 
 * Example:
 * sortBy(
 *   [{ name: "B", age: 30 }, { name: "A", age: 25 }, { name: "A", age: 30 }],
 *   { key: "name", order: "asc" },
 *   { key: "age", order: "desc" }
 * )
 * → [{ name: "A", age: 30 }, { name: "A", age: 25 }, { name: "B", age: 30 }]
 */

function sortBy(array, ...criteria) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: Flatten with Depth
// =============================================================================
/**
 * Create a function flattenDeep(array, depth) that:
 * - Flattens array to specified depth
 * - depth = Infinity flattens completely
 * - Default depth = 1
 * 
 * Example:
 * flattenDeep([1, [2, [3, [4]]]], 2) → [1, 2, 3, [4]]
 * flattenDeep([1, [2, [3, [4]]]], Infinity) → [1, 2, 3, 4]
 * 
 * Uses: reduce, recursion, spread
 */

function flattenDeep(array, depth = 1) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 7: Transform Object Keys (Snake to Camel)
// =============================================================================
/**
 * Create a function camelizeKeys(obj) that:
 * - Converts all keys from snake_case to camelCase
 * - Works recursively on nested objects and arrays
 * - Preserves values
 * 
 * Example:
 * camelizeKeys({ user_name: "John", user_profile: { avatar_url: "x.png" } })
 * → { userName: "John", userProfile: { avatarUrl: "x.png" } }
 */

function camelizeKeys(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    groupBy,
    chunk,
    deepPick,
    difference,
    intersection,
    symmetricDifference,
    sortBy,
    flattenDeep,
    camelizeKeys
};
