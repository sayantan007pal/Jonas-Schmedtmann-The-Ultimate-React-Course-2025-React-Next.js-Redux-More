/**
 * Promises & Async/Await Challenge #20
 * =====================================
 * Topic: Comprehensive Async Pipeline - Final Challenge
 * 
 * This is the ultimate challenge combining everything you've learned!
 * Build a complete data processing pipeline using Promises and async/await.
 */

// =============================================================================
// Simulated External Services
// =============================================================================

// Simulated database
const database = {
    users: [
        { id: 1, name: "Alice", departmentId: 1 },
        { id: 2, name: "Bob", departmentId: 2 },
        { id: 3, name: "Charlie", departmentId: 1 }
    ],
    departments: [
        { id: 1, name: "Engineering", budget: 100000 },
        { id: 2, name: "Marketing", budget: 50000 }
    ],
    tasks: [
        { id: 1, userId: 1, title: "Build API", completed: true },
        { id: 2, userId: 1, title: "Write tests", completed: false },
        { id: 3, userId: 2, title: "Create campaign", completed: true },
        { id: 4, userId: 3, title: "Code review", completed: true }
    ]
};

// Simulated API calls (with delays)
async function fetchUser(id) {
    await new Promise(r => setTimeout(r, 50));
    const user = database.users.find(u => u.id === id);
    if (!user) throw new Error(`User ${id} not found`);
    return { ...user };
}

async function fetchDepartment(id) {
    await new Promise(r => setTimeout(r, 50));
    const dept = database.departments.find(d => d.id === id);
    if (!dept) throw new Error(`Department ${id} not found`);
    return { ...dept };
}

async function fetchUserTasks(userId) {
    await new Promise(r => setTimeout(r, 50));
    return database.tasks.filter(t => t.userId === userId).map(t => ({ ...t }));
}


// =============================================================================
// THE ULTIMATE CHALLENGE
// =============================================================================
/**
 * Create an async function generateComprehensiveReport(userIds) that:
 * 
 * 1. Fetches all users in PARALLEL (use Promise.all)
 * 
 * 2. For each user, fetch their department AND tasks in PARALLEL
 * 
 * 3. Handle errors gracefully:
 *    - If a user doesn't exist, include them in errors array
 *    - Continue processing other users
 * 
 * 4. Calculate statistics for each user:
 *    - completedTasks: number of completed tasks
 *    - pendingTasks: number of pending tasks
 *    - completionRate: percentage of completed tasks (0-100)
 * 
 * 5. Return a report object:
 *    {
 *      generatedAt: [ISO timestamp],
 *      totalUsers: [number of successfully processed users],
 *      users: [
 *        {
 *          id: 1,
 *          name: "Alice",
 *          department: { id: 1, name: "Engineering", budget: 100000 },
 *          tasks: [...],
 *          stats: { completedTasks: 1, pendingTasks: 1, completionRate: 50 }
 *        },
 *        ...
 *      ],
 *      errors: [
 *        { userId: 99, error: "User 99 not found" },
 *        ...
 *      ],
 *      departmentSummary: {
 *        "Engineering": { userCount: 2, totalTasks: 3 },
 *        "Marketing": { userCount: 1, totalTasks: 1 }
 *      }
 *    }
 * 
 * Requirements:
 * - Use async/await throughout
 * - Maximize parallelism where possible
 * - Handle all errors gracefully
 * - Calculate all statistics accurately
 */

async function generateComprehensiveReport(userIds) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Bonus Challenge Functions
// =============================================================================

/**
 * BONUS 1: Create a function that implements retry logic with exponential backoff
 */
async function withRetry(asyncFn, maxRetries = 3, baseDelay = 100) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}

/**
 * BONUS 2: Create a function that processes items with concurrency limit
 */
async function processWithLimit(items, asyncFn, limit = 3) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    fetchUser,
    fetchDepartment,
    fetchUserTasks,
    generateComprehensiveReport,
    withRetry,
    processWithLimit
};
