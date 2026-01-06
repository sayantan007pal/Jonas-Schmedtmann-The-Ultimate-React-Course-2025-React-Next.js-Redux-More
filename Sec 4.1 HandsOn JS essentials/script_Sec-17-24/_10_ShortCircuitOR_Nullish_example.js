/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 10: Short-Circuit Evaluation - || and ?? Operators               ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: OR (||), Nullish Coalescing (??), Default Values                   ║
 * ║  Difficulty: ⭐⭐⭐ (Interview Critical!)                                    ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 RULES:
 * - || returns FIRST TRUTHY value, or LAST value if all falsy
 * - ?? returns RIGHT side ONLY if left is null/undefined (NOT for 0, "", false)
 */

// =============================================================================
// Task 1: Basic || Short-Circuit
// =============================================================================
/**
 * Create a function getOrResult(a, b) that:
 * - Returns the result of: a || b
 * - DO NOT use if/else, just return the || expression
 * 
 * @param {any} a - First value
 * @param {any} b - Second value
 * @returns {any} - Result of a || b
 * 
 * Examples:
 *   getOrResult(true, "Hello")   → true
 *   getOrResult(false, "Hello")  → "Hello"
 *   getOrResult(0, "Default")    → "Default"
 *   getOrResult("Hi", "Default") → "Hi"
 */

function getOrResult(a, b) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Default Values with ||
// =============================================================================
/**
 * Create a function greetUser(name) that:
 * - Returns "Hello, [name]!" if name is truthy
 * - Returns "Hello, Guest!" if name is falsy
 * - Uses || for default value
 * 
 * @param {string} name - User's name (may be undefined, null, or empty)
 * @returns {string} - Greeting message
 * 
 * Example:
 *   greetUser("John")     → "Hello, John!"
 *   greetUser("")         → "Hello, Guest!"
 *   greetUser(undefined)  → "Hello, Guest!"
 */

function greetUser(name) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Nullish Coalescing (??) Basics
// =============================================================================
/**
 * Create a function getNullishResult(a, b) that:
 * - Returns the result of: a ?? b
 * 
 * KEY DIFFERENCE from ||:
 * - ?? only falls back for null/undefined
 * - || falls back for ANY falsy value (0, "", false, null, undefined, NaN)
 * 
 * @param {any} a - First value
 * @param {any} b - Second value (fallback)
 * @returns {any} - Result of a ?? b
 * 
 * Examples:
 *   getNullishResult(null, "default")      → "default"
 *   getNullishResult(undefined, "default") → "default"
 *   getNullishResult(0, "default")         → 0 (NOT "default"!)
 *   getNullishResult("", "default")        → "" (NOT "default"!)
 *   getNullishResult(false, "default")     → false (NOT "default"!)
 */

function getNullishResult(a, b) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: || vs ?? - The Critical Difference
// =============================================================================
/**
 * Create a function getConfigValue(config, key) that:
 * - Gets config[key] with a default value of 0
 * - MUST use ?? (not ||) to handle the case where value IS 0
 * 
 * This is critical when 0 is a valid value!
 * 
 * @param {Object} config - Configuration object
 * @param {string} key - Key to access
 * @returns {number} - The value or 0 as default
 * 
 * Example:
 *   getConfigValue({ volume: 0 }, "volume")    → 0 (NOT the default!)
 *   getConfigValue({ volume: 50 }, "volume")   → 50
 *   getConfigValue({}, "volume")               → 0 (default)
 *   getConfigValue({ volume: null }, "volume") → 0 (default)
 */

function getConfigValue(config, key) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: Chained || and ?? for Complex Defaults
// =============================================================================
/**
 * Create a function getUsername(user) that:
 * - Returns user.displayName if it exists and is not empty
 * - OR user.email if displayName is empty/missing
 * - OR "Anonymous" if both are missing
 * 
 * Use chained || operators
 * 
 * @param {Object} user - { displayName?, email? }
 * @returns {string} - Username to display
 * 
 * Example:
 *   getUsername({ displayName: "JohnD", email: "john@test.com" }) → "JohnD"
 *   getUsername({ displayName: "", email: "john@test.com" })      → "john@test.com"
 *   getUsername({ email: "john@test.com" })                       → "john@test.com"
 *   getUsername({})                                               → "Anonymous"
 */

function getUsername(user) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: Function Parameter Defaults with ||
// =============================================================================
/**
 * Create a function createConfig(options) that:
 * - Takes an options object with optional properties
 * - Returns a config with defaults applied using ||
 * 
 * Defaults:
 * - theme: "light"
 * - language: "en"
 * - notifications: true
 * - pageSize: 10
 * 
 * NOTE: There's a BUG waiting to happen with pageSize and notifications!
 * Use || for theme and language, but ?? for pageSize and notifications
 * 
 * @param {Object} options - { theme?, language?, notifications?, pageSize? }
 * @returns {Object} - Config with defaults applied
 */

function createConfig(options = {}) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    getOrResult,
    greetUser,
    getNullishResult,
    getConfigValue,
    getUsername,
    createConfig
};
