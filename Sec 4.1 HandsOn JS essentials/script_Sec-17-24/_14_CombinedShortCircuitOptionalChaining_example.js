/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 14: Combined - Short-Circuit + Optional Chaining + ??            ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: Safe Data Access Patterns for API Data                             ║
 * ║  Difficulty: ⭐⭐⭐⭐ (Interview Level)                                      ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// =============================================================================
// Task 1: Safe Multi-Level Access
// =============================================================================
/**
 * Create a function getNestedValue(obj, path) that:
 * - path is array of keys: ["level1", "level2", "key"]
 * - Safely traverses the path using optional chaining pattern
 * - Returns undefined if any part is missing
 * 
 * CHALLENGE: Implement without using eval or obj?.[dynamic]
 * Use reduce with optional chaining logic
 * 
 * @param {Object} obj
 * @param {string[]} path
 * @returns {any}
 */

function getNestedValue(obj, path) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Default Value Chain
// =============================================================================
/**
 * Create a function getUserDisplayInfo(user) that returns:
 * {
 *   name: user.profile?.displayName ?? user.profile?.username ?? user.email ?? "Anonymous",
 *   avatar: user.profile?.avatar ?? user.settings?.defaultAvatar ?? "/default.png",
 *   theme: user.settings?.theme ?? "light"
 * }
 * 
 * This combines ?., ??, and object creation!
 * 
 * @param {Object} user
 * @returns {Object}
 */

function getUserDisplayInfo(user) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Conditional Rendering Data
// =============================================================================
/**
 * Create a function getComponentData(state) that:
 * - state has: { isLoading, error, data }
 * - Uses short-circuit && and || to determine what to render
 * 
 * Returns:
 * {
 *   showSpinner: true if isLoading,
 *   showError: true if not loading AND error exists,
 *   showContent: true if not loading AND no error AND data exists,
 *   showEmpty: true if not loading AND no error AND no data,
 *   message: appropriate message string
 * }
 * 
 * Messages:
 * - Loading: "Loading data..."
 * - Error: "Error: [error message]"
 * - Content: "Showing [data.length] items"
 * - Empty: "No data available"
 * 
 * @param {Object} state
 * @returns {Object}
 */

function getComponentData(state) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Safe Array Operations
// =============================================================================
/**
 * Create a function safeArrayOps(data) that:
 * - data might have: { items?: any[], counts?: { total?: number } }
 * - Returns:
 *   {
 *     firstItem: first item or null,
 *     lastItem: last item or null,
 *     itemCount: counts.total ?? items.length ?? 0,
 *     hasItems: boolean
 *   }
 * 
 * Handle all edge cases with ?. and ??
 * 
 * @param {Object} data
 * @returns {Object}
 */

function safeArrayOps(data) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: API Response Normalizer
// =============================================================================
/**
 * Create a function normalizeApiResponse(response) that:
 * - Handles various API response structures:
 *   - { data: [...] }
 *   - { results: [...] }
 *   - { items: [...] }
 *   - { payload: { data: [...] } }
 *   - Direct array: [...]
 * 
 * Returns:
 * {
 *   items: the array (empty array if not found),
 *   count: length of items,
 *   success: true if items found, false otherwise
 * }
 * 
 * Use || chain to find the array!
 * 
 * @param {any} response
 * @returns {Object}
 */

function normalizeApiResponse(response) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: Configuration Merger
// =============================================================================
/**
 * Create a function mergeConfig(defaultConfig, userConfig, overrides) that:
 * - Merges three config objects with priority: overrides > userConfig > defaultConfig
 * - Each config may be null/undefined
 * - Uses ?? for null checks and spread for merging
 * - For nested objects, also merge (single level deep)
 * 
 * @param {Object} defaultConfig
 * @param {Object} userConfig  
 * @param {Object} overrides
 * @returns {Object}
 */

function mergeConfig(defaultConfig, userConfig, overrides) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    getNestedValue,
    getUserDisplayInfo,
    getComponentData,
    safeArrayOps,
    normalizeApiResponse,
    mergeConfig
};
