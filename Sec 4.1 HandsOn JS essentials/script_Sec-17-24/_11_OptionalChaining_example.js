/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 11: Optional Chaining - Safe Property Access                     ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: ?. for Objects, Arrays, Methods, Combined with ??                  ║
 * ║  Difficulty: ⭐⭐⭐ (Interview Critical - API Data!)                         ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 RULE: ?. short-circuits and returns undefined if left side is null/undefined
 */

// =============================================================================
// Task 1: Basic Optional Chaining
// =============================================================================
/**
 * Create a function getUserCity(user) that:
 * - Returns user.address.city using optional chaining
 * - Returns undefined if any part of the chain is null/undefined
 * 
 * @param {Object} user - User object (may have missing properties)
 * @returns {string|undefined} - City or undefined
 * 
 * Example:
 *   getUserCity({ address: { city: "NYC" } })  → "NYC"
 *   getUserCity({ address: {} })               → undefined
 *   getUserCity({})                            → undefined
 *   getUserCity(null)                          → undefined
 */

function getUserCity(user) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Optional Chaining with Array Access
// =============================================================================
/**
 * Create a function getFirstItem(data) that:
 * - Returns data.items[0] using optional chaining
 * - Returns undefined if data, items, or first element doesn't exist
 * 
 * @param {Object} data - { items?: any[] }
 * @returns {any} - First item or undefined
 * 
 * Example:
 *   getFirstItem({ items: ["a", "b"] })  → "a"
 *   getFirstItem({ items: [] })          → undefined
 *   getFirstItem({})                     → undefined
 *   getFirstItem(null)                   → undefined
 */

function getFirstItem(data) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Optional Method Calls
// =============================================================================
/**
 * Create a function callToString(obj) that:
 * - Calls obj.toString() if it exists
 * - Returns undefined if obj is null/undefined
 * - Uses optional chaining for method call
 * 
 * @param {any} obj - Object that may have toString method
 * @returns {string|undefined} - String representation or undefined
 * 
 * Example:
 *   callToString({ toString: () => "custom" })  → "custom"
 *   callToString(123)                           → "123"
 *   callToString(null)                          → undefined
 */

function callToString(obj) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Deep Optional Chaining
// =============================================================================
/**
 * Create a function getBookRating(book) that:
 * - Returns book.reviews.goodreads.rating using optional chaining
 * - Returns undefined if any part is missing
 * 
 * @param {Object} book - Book object with nested reviews
 * @returns {number|undefined} - Rating or undefined
 * 
 * Example:
 *   getBookRating({ reviews: { goodreads: { rating: 4.5 } } })  → 4.5
 *   getBookRating({ reviews: { amazon: { rating: 4.0 } } })     → undefined
 *   getBookRating({ reviews: {} })                              → undefined
 *   getBookRating({})                                           → undefined
 */

function getBookRating(book) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: Optional Chaining with ?? for Defaults
// =============================================================================
/**
 * Create a function getReviewCount(book) that:
 * - Gets book.reviews.goodreads.count with optional chaining
 * - Returns 0 if any part of the chain is missing
 * - Combines ?. with ??
 * 
 * @param {Object} book - Book object with nested reviews
 * @returns {number} - Count or 0
 * 
 * Example:
 *   getReviewCount({ reviews: { goodreads: { count: 1000 } } })  → 1000
 *   getReviewCount({ reviews: { goodreads: { count: 0 } } })     → 0 (not default!)
 *   getReviewCount({ reviews: {} })                              → 0 (default)
 *   getReviewCount(null)                                         → 0 (default)
 */

function getReviewCount(book) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: API Response Handler (Real-World Pattern)
// =============================================================================
/**
 * Create a function extractApiData(response) that:
 * - Handles typical API response structure
 * - response: { data?: { user?: { profile?: { name?, avatar? } } }, error?: string }
 * 
 * Returns:
 * {
 *   name: user's name or "Unknown",
 *   avatar: user's avatar or "/default-avatar.png",
 *   hasError: true if error exists, false otherwise
 * }
 * 
 * Use optional chaining and ?? throughout!
 * 
 * @param {Object} response - API response object
 * @returns {Object} - Extracted data with defaults
 */

function extractApiData(response) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 7: Optional Chaining in Array Methods
// =============================================================================
/**
 * Create a function getTotalRatings(books) that:
 * - Takes an array of book objects
 * - Sums up all reviews.goodreads.ratingsCount values
 * - Uses optional chaining to handle missing nested properties
 * - Missing ratingsCount should be treated as 0
 * 
 * @param {Object[]} books - Array of book objects
 * @returns {number} - Total ratings count
 * 
 * Example:
 *   getTotalRatings([
 *     { reviews: { goodreads: { ratingsCount: 100 } } },
 *     { reviews: { amazon: { ratingsCount: 50 } } },   // No goodreads
 *     { reviews: { goodreads: { ratingsCount: 200 } } }
 *   ])
 *   → 300 (100 + 0 + 200)
 */

function getTotalRatings(books) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    getUserCity,
    getFirstItem,
    callToString,
    getBookRating,
    getReviewCount,
    extractApiData,
    getTotalRatings
};
