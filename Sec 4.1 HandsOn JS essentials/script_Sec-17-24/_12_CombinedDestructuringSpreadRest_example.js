/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 12: Combined - Destructuring + Spread + Rest                     ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: All Destructuring Patterns Combined for Real-World Use             ║
 * ║  Difficulty: ⭐⭐⭐⭐ (Interview Level)                                      ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// =============================================================================
// Task 1: Clone and Extend Object
// =============================================================================
/**
 * Create a function cloneAndExtend(original, extensions) that:
 * - Creates a shallow copy of original
 * - Adds/overwrites properties from extensions
 * - Returns the new object (original unchanged)
 * 
 * Uses: Spread operator for objects
 * 
 * @param {Object} original - Original object
 * @param {Object} extensions - New properties to add
 * @returns {Object} - New extended object
 */

function cloneAndExtend(original, extensions) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Extract and Rename in One Step
// =============================================================================
/**
 * Create a function transformUserData(rawUser) that:
 * - rawUser has: { user_name, user_email, user_id, created_at, ... }
 * - Extracts and renames to camelCase: { userName, userEmail, userId }
 * - Collects everything else into `metadata`
 * - Returns: { userName, userEmail, userId, metadata }
 * 
 * Uses: Destructuring with rename + rest
 * 
 * @param {Object} rawUser - Raw user data with snake_case keys
 * @returns {Object} - Transformed data with camelCase
 */

function transformUserData(rawUser) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Merge Arrays with Deduplication
// =============================================================================
/**
 * Create a function mergeUnique(...arrays) that:
 * - Takes any number of arrays
 * - Merges them all using spread
 * - Removes duplicates
 * - Returns sorted array (ascending)
 * 
 * Uses: Rest params + Spread + Set for dedup
 * 
 * @param {...number[]} arrays - Any number of number arrays
 * @returns {number[]} - Merged, unique, sorted array
 */

function mergeUnique(...arrays) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Deep Clone First Level + Modify Nested
// =============================================================================
/**
 * Create a function updateNestedUser(user, profileUpdates) that:
 * - Clones the user object
 * - Updates the nested profile with profileUpdates (immutably!)
 * - Returns new user object with updated profile
 * 
 * Uses: Nested spread for immutable update
 * 
 * @param {Object} user - { id, name, profile: { bio, avatar, ... } }
 * @param {Object} profileUpdates - Updates to apply to profile
 * @returns {Object} - New user with updated profile
 */

function updateNestedUser(user, profileUpdates) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: Array Item Update (React State Pattern)
// =============================================================================
/**
 * Create a function toggleTodo(todos, id) that:
 * - Finds the todo with matching id
 * - Toggles its `completed` property
 * - Returns NEW array with updated todo (immutable!)
 * 
 * Uses: map + spread for immutable update
 * 
 * @param {Object[]} todos - [{ id, text, completed }, ...]
 * @param {number} id - ID of todo to toggle
 * @returns {Object[]} - New array with toggled todo
 */

function toggleTodo(todos, id) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: Function with Destructured Params + Rest
// =============================================================================
/**
 * Create a function createApiRequest({ method, url, headers, ...options }) that:
 * - Destructures method (default: "GET"), url, headers (default: {})
 * - Collects remaining options with rest
 * - Returns complete request config object:
 *   {
 *     method,
 *     url,
 *     headers: { "Content-Type": "application/json", ...headers },
 *     ...options
 *   }
 * 
 * Uses: Param destructuring + defaults + rest + spread
 * 
 * @param {Object} config - Request configuration
 * @returns {Object} - Complete request config
 */

function createApiRequest({ method = "GET", url, headers = {}, ...options } = {}) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    cloneAndExtend,
    transformUserData,
    mergeUnique,
    updateNestedUser,
    toggleTodo,
    createApiRequest
};
