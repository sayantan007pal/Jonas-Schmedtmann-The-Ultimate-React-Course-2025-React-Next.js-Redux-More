/**
 * Promises & Async/Await Challenge #13
 * =====================================
 * Topic: Sequential vs Parallel Execution
 * 
 * This exercise tests your understanding of when to use
 * sequential vs parallel async operations.
 */

// =============================================================================
// Helper Function
// =============================================================================
function delay(ms, value) {
    return new Promise(resolve => setTimeout(() => resolve(value), ms));
}


// =============================================================================
// Task 1: Sequential Execution (When Order Matters)
// =============================================================================
/**
 * Create an async function processSequentially(tasks) that:
 * - Takes an array of tasks, each task is { name: string, duration: number }
 * - Processes each task one after another (NOT in parallel)
 * - Each task "processing" is simulated by waiting for its duration
 * - Returns array of { name, completedAt: [timestamp relative to start] }
 * 
 * Expected behavior:
 *   const tasks = [
 *     { name: "Task1", duration: 100 },
 *     { name: "Task2", duration: 100 },
 *     { name: "Task3", duration: 100 }
 *   ];
 *   await processSequentially(tasks);
 *   // Takes ~300ms total
 *   // Task1 completes at ~100ms, Task2 at ~200ms, Task3 at ~300ms
 */

async function processSequentially(tasks) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Parallel Execution (When Order Doesn't Matter)
// =============================================================================
/**
 * Create an async function processInParallel(tasks) that:
 * - Takes the same array of tasks
 * - Processes ALL tasks simultaneously using Promise.all
 * - Returns array of { name, completedAt: [timestamp relative to start] }
 * 
 * Expected behavior:
 *   const tasks = [
 *     { name: "Task1", duration: 100 },
 *     { name: "Task2", duration: 200 },
 *     { name: "Task3", duration: 150 }
 *   ];
 *   await processInParallel(tasks);
 *   // Takes ~200ms total (longest task)
 *   // All tasks complete around their individual durations
 */

async function processInParallel(tasks) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Hybrid Approach (Batched Parallel)
// =============================================================================
/**
 * Create an async function processBatched(tasks, batchSize) that:
 * - Processes tasks in batches of size batchSize
 * - Within each batch, tasks run in parallel
 * - Batches run sequentially (wait for batch to complete before next)
 * - Returns array of { name, batch: [batch number], completedAt: [time] }
 * 
 * Expected behavior:
 *   const tasks = [
 *     { name: "A", duration: 100 }, { name: "B", duration: 100 },
 *     { name: "C", duration: 100 }, { name: "D", duration: 100 }
 *   ];
 *   await processBatched(tasks, 2);
 *   // Batch 1: A and B run in parallel (~100ms)
 *   // Batch 2: C and D run in parallel (~100ms)
 *   // Total: ~200ms
 */

async function processBatched(tasks, batchSize) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    delay,
    processSequentially,
    processInParallel,
    processBatched
};
