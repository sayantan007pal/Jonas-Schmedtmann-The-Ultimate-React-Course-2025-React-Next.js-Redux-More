/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 7: Ternary Operator - Conditional Expressions                    ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: Ternary Basics, Nested Ternaries, React Patterns, Edge Cases       ║
 * ║  Difficulty: ⭐⭐ (Interview Ready)                                          ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// =============================================================================
// Task 1: Basic Ternary
// =============================================================================
/**
 * Create a function getStatus(isActive) that:
 * - Returns "Active" if isActive is true
 * - Returns "Inactive" if isActive is false
 * - Uses TERNARY operator (not if/else)
 * 
 * @param {boolean} isActive
 * @returns {string}
 * 
 * Example:
 *   getStatus(true)   // "Active"
 *   getStatus(false)  // "Inactive"
 */

function getStatus(isActive) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Ternary with Truthy/Falsy Values
// =============================================================================
/**
 * Create a function getDisplayName(user) that:
 * - If user.nickname exists (truthy), return the nickname
 * - Otherwise, return user.fullName
 * - Use TERNARY operator
 * 
 * @param {Object} user - { fullName: string, nickname?: string }
 * @returns {string}
 * 
 * Example:
 *   getDisplayName({ fullName: "John Doe", nickname: "JD" })  // "JD"
 *   getDisplayName({ fullName: "Jane Smith" })                // "Jane Smith"
 *   getDisplayName({ fullName: "Bob", nickname: "" })         // "Bob" (empty string is falsy)
 */

function getDisplayName(user) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Ternary for Value Assignment
// =============================================================================
/**
 * Create a function getDiscountedPrice(price, isMember) that:
 * - Members get 20% discount
 * - Non-members pay full price
 * - Uses ternary to calculate and return the final price
 * 
 * @param {number} price - Original price
 * @param {boolean} isMember - Is customer a member?
 * @returns {number} - Final price
 * 
 * Example:
 *   getDiscountedPrice(100, true)   // 80
 *   getDiscountedPrice(100, false)  // 100
 */

function getDiscountedPrice(price, isMember) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Nested Ternary (Use Sparingly!)
// =============================================================================
/**
 * Create a function getGrade(score) that:
 * - Returns letter grade based on score
 * - Uses NESTED ternary operators
 * 
 * Grading:
 * - 90+ : "A"
 * - 80-89: "B"
 * - 70-79: "C"
 * - 60-69: "D"
 * - Below 60: "F"
 * 
 * @param {number} score - Numeric score (0-100)
 * @returns {string} - Letter grade
 * 
 * Example:
 *   getGrade(95)  // "A"
 *   getGrade(72)  // "C"
 *   getGrade(45)  // "F"
 */

function getGrade(score) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: Ternary for Conditional Object Properties
// =============================================================================
/**
 * Create a function createUserConfig(user, isAdmin) that:
 * - Returns a config object
 * - Uses ternary to set permissions based on isAdmin
 * 
 * Return object structure:
 * {
 *   username: user.name,
 *   role: "admin" or "user" (based on isAdmin),
 *   permissions: ["read"] or ["read", "write", "delete"] (based on isAdmin)
 * }
 * 
 * @param {Object} user - { name: string }
 * @param {boolean} isAdmin
 * @returns {Object}
 * 
 * Example:
 *   createUserConfig({ name: "John" }, true)
 *   // { username: "John", role: "admin", permissions: ["read", "write", "delete"] }
 */

function createUserConfig(user, isAdmin) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: React-Style Conditional Rendering Simulation
// =============================================================================
/**
 * Create a function renderComponent(state) that:
 * - Simulates React conditional rendering logic
 * - state: { isLoading, error, data }
 * 
 * Priority order:
 * 1. If isLoading is true → return "Loading..."
 * 2. If error is truthy → return "Error: [error message]"
 * 3. If data is truthy → return "Data: [data]"
 * 4. Otherwise → return "No data available"
 * 
 * Use CHAINED ternary operators (like React patterns)
 * 
 * @param {Object} state - { isLoading, error, data }
 * @returns {string}
 * 
 * Example:
 *   renderComponent({ isLoading: true, error: null, data: null })
 *   // "Loading..."
 *   
 *   renderComponent({ isLoading: false, error: "Network error", data: null })
 *   // "Error: Network error"
 *   
 *   renderComponent({ isLoading: false, error: null, data: "User info" })
 *   // "Data: User info"
 */

function renderComponent(state) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    getStatus,
    getDisplayName,
    getDiscountedPrice,
    getGrade,
    createUserConfig,
    renderComponent
};
