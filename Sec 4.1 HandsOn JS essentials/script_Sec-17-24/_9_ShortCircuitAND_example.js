/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 9: Short-Circuit Evaluation - && Operator                        ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: AND (&&) Short-Circuit, React Conditional Rendering                ║
 * ║  Difficulty: ⭐⭐⭐ (Interview Critical - React Patterns!)                   ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 RULE: && returns FIRST FALSY value, or LAST value if all truthy
 */

// =============================================================================
// Task 1: Basic && Short-Circuit
// =============================================================================
/**
 * Create a function getAndResult(a, b) that:
 * - Returns the result of: a && b
 * - DO NOT use if/else, just return the && expression
 * 
 * This helps you understand what && actually returns!
 * 
 * @param {any} a - First value
 * @param {any} b - Second value
 * @returns {any} - Result of a && b
 * 
 * Examples:
 *   getAndResult(true, "Hello")   → "Hello"
 *   getAndResult(false, "Hello")  → false
 *   getAndResult("A", "B")        → "B"
 *   getAndResult(0, "Hello")      → 0
 */

function getAndResult(a, b) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: && for Conditional Execution
// =============================================================================
/**
 * Create a function maybeLog(condition, message) that:
 * - Logs the message ONLY if condition is truthy
 * - Uses && short-circuit (not if statement)
 * - Returns the message if logged, or the falsy condition value if not
 * 
 * @param {any} condition - Condition to check
 * @param {string} message - Message to potentially log
 * @returns {any} - Message if logged, condition value if not
 * 
 * Example:
 *   maybeLog(true, "Hello")  → logs "Hello", returns "Hello"
 *   maybeLog(false, "Hello") → doesn't log, returns false
 */

function maybeLog(condition, message) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: React-Style Conditional Rendering with &&
// =============================================================================
/**
 * Create a function renderIf(condition, content) that:
 * - Returns content if condition is truthy
 * - Returns null if condition is falsy
 * - Uses && short-circuit
 * 
 * This simulates: {condition && <Component />} in React
 * 
 * @param {any} condition - Condition to check
 * @param {any} content - Content to render
 * @returns {any} - content or null
 * 
 * Example:
 *   renderIf(true, "<div>Hello</div>")   → "<div>Hello</div>"
 *   renderIf(false, "<div>Hello</div>")  → null
 *   renderIf(0, "<div>Hello</div>")      → null (0 is falsy!)
 */

function renderIf(condition, content) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Chained && Evaluation
// =============================================================================
/**
 * Create a function getChainedAnd(...values) that:
 * - Takes any number of values
 * - Returns what a && b && c && ... would return
 * - (First falsy, or last value if all truthy)
 * 
 * @param {...any} values - Values to chain with &&
 * @returns {any} - Result of chained && evaluation
 * 
 * Example:
 *   getChainedAnd("A", "B", "C")     → "C"
 *   getChainedAnd("A", 0, "C")       → 0
 *   getChainedAnd("A", null, "C")    → null
 *   getChainedAnd()                  → true (edge case)
 */

function getChainedAnd(...values) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: Safe Property Access with &&
// =============================================================================
/**
 * Create a function safeGet(obj, prop1, prop2) that:
 * - Safely accesses obj[prop1][prop2] using && short-circuit
 * - Returns undefined if any part of the chain doesn't exist
 * - DO NOT use optional chaining (?.) - use && instead!
 * 
 * @param {Object} obj - Object to access
 * @param {string} prop1 - First level property
 * @param {string} prop2 - Second level property
 * @returns {any} - The value or undefined
 * 
 * Example:
 *   safeGet({ a: { b: 1 } }, "a", "b")  → 1
 *   safeGet({ a: { b: 1 } }, "x", "y")  → undefined
 *   safeGet(null, "a", "b")             → undefined
 */

function safeGet(obj, prop1, prop2) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: React Pattern - Show Component Based on Array Length
// =============================================================================
/**
 * Create a function renderList(items, renderFn) that:
 * - Returns null if items array is empty
 * - Returns renderFn(items) if items array has elements
 * - Uses && short-circuit
 * 
 * This simulates: {items.length > 0 && <List items={items} />}
 * 
 * @param {Array} items - Array of items
 * @param {Function} renderFn - Function to call with items
 * @returns {any} - Result of renderFn(items) or null
 * 
 * Example:
 *   renderList([1, 2, 3], items => items.join("-"))  → "1-2-3"
 *   renderList([], items => items.join("-"))         → null
 */

function renderList(items, renderFn) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    getAndResult,
    maybeLog,
    renderIf,
    getChainedAnd,
    safeGet,
    renderList
};
