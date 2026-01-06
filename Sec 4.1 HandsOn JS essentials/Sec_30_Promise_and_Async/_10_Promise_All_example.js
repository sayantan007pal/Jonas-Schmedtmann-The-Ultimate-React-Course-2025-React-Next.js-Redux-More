/**
 * Promises & Async/Await Challenge #10
 * =====================================
 * Topic: Promise.all() for Parallel Execution
 * 
 * This exercise tests your understanding of Promise.all()
 * and how to run multiple async operations in parallel.
 */

// =============================================================================
// Helper Function
// =============================================================================
function delay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}


// =============================================================================
// Task 1: Basic Promise.all Usage
// =============================================================================
/**
 * Create an async function fetchAllUsers(ids) that:
 * - Takes an array of user IDs
 * - For each ID, simulates fetching a user (use delay of 200ms)
 * - Each user object should be: { id: [id], name: "User_" + id }
 * - Uses Promise.all to fetch ALL users in PARALLEL
 * - Returns array of all user objects
 * 
 * Expected behavior:
 *   const users = await fetchAllUsers([1, 2, 3]);
 *   // Takes ~200ms total (parallel), NOT ~600ms (sequential)
 *   // Returns: [{ id: 1, name: "User_1" }, { id: 2, name: "User_2" }, { id: 3, name: "User_3" }]
 */

async function fetchAllUsers(ids) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Promise.all with Error Handling
// =============================================================================
/**
 * Create a function fetchWithPossibleError(id) that:
 * - Returns a Promise that resolves after 100ms
 * - If id is negative, rejects with "Invalid ID: [id]"
 * - Otherwise resolves with { id, data: "Data for " + id }
 * 
 * Create an async function fetchAllSafe(ids) that:
 * - Uses Promise.all to fetch all IDs
 * - Wraps in try/catch
 * - On success: returns { success: true, data: [array of results] }
 * - On failure: returns { success: false, error: [error message] }
 * 
 * Remember: Promise.all fails fast - if ANY promise rejects, the whole thing rejects!
 */

function fetchWithPossibleError(id) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function fetchAllSafe(ids) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Combining Results from Multiple Sources
// =============================================================================
/**
 * Create async functions:
 * - fetchUserProfile(userId) - returns { userId, name: "User " + userId } after 200ms
 * - fetchUserPosts(userId) - returns [{ id: 1, title: "Post by " + userId }] after 300ms
 * - fetchUserFriends(userId) - returns ["Friend1", "Friend2"] after 250ms
 * 
 * Create an async function getUserDashboard(userId) that:
 * - Uses Promise.all to fetch profile, posts, and friends IN PARALLEL
 * - Returns combined object: { profile: {...}, posts: [...], friends: [...] }
 * - Should take ~300ms (longest operation), not ~750ms (sequential)
 */

async function fetchUserProfile(userId) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function fetchUserPosts(userId) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function fetchUserFriends(userId) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

async function getUserDashboard(userId) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    delay,
    fetchAllUsers,
    fetchWithPossibleError,
    fetchAllSafe,
    fetchUserProfile,
    fetchUserPosts,
    fetchUserFriends,
    getUserDashboard
};
