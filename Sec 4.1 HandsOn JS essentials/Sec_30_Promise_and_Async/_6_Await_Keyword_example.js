/**
 * Promises & Async/Await Challenge #6
 * ====================================
 * Topic: The await Keyword
 * 
 * This exercise tests your understanding of the await keyword
 * and how it pauses async function execution until a Promise settles.
 */

// =============================================================================
// Task 1: Sequential await Calls
// =============================================================================
/**
 * Given the helper function below:
 */
function delay(ms, value) {
    return new Promise((resolve) => {
    setTimeout(() => {
        resolve (value)
    }, ms);

})
}
/**
 * Create an async function getSequentialValues() that:
 * - Awaits delay(200, "First") and stores the result
 * - Then awaits delay(200, "Second") and stores the result
 * - Then awaits delay(200, "Third") and stores the result
 * - Returns an array of all three values: ["First", "Second", "Third"]
 * 
 * Expected behavior:
 *   const values = await getSequentialValues();
 *   console.log(values); // ["First", "Second", "Third"]
 *   // Should take ~600ms total (sequential)
 */

async function getSequentialValues() {
    // ==================== YOUR CODE HERE ====================
    const result = await delay(200, "First");
    const result2 = await delay(200, "Second");
    const result3 = await delay(200, "Third");
    return [result, result2, result3]

    
    
    // ========================================================
}


// =============================================================================
// Task 2: await with Conditional Logic
// =============================================================================
/**
 * Create an async function getUserStatus(userId) that:
 * - First awaits a simulated "fetch" that takes 300ms and returns:
 *   - { active: true, name: "Active User" } if userId is even
 *   - { active: false, name: "Inactive User" } if userId is odd
 * - If the user is active, await another 200ms delay then return:
 *   "Welcome back, [name]!"
 * - If the user is inactive, immediately return:
 *   "[name] needs to reactivate account"
 * 
 * Expected behavior:
 *   await getUserStatus(2);  // "Welcome back, Active User!" (~500ms)
 *   await getUserStatus(3);  // "Inactive User needs to reactivate account" (~300ms)
 */

async function getUserStatus(userId) {
    // ==================== YOUR CODE HERE ====================
    if(userId%2 ==0){
        const user = await delay(300, { active: true, name: "Active User" });
        await delay(200);
        return`Welcome back, Active User!`
    }
    else{
        const user = await delay(300, { active: false, name: "Inactive User" });
        return `Inactive User needs to reactivate account`
    }
    
    
    // ========================================================
}


// =============================================================================
// Task 3: await in Loops
// =============================================================================
/**
 * Create an async function processItems(items) that:
 * - Takes an array of items
 * - For each item, awaits a 100ms delay (simulating processing)
 * - Collects processed items in format: "Processed: [item]"
 * - Returns array of all processed items
 * 
 * IMPORTANT: Process items SEQUENTIALLY (one after another, not in parallel)
 * 
 * Expected behavior:
 *   const results = await processItems(["A", "B", "C"]);
 *   console.log(results); // ["Processed: A", "Processed: B", "Processed: C"]
 *   // Should take ~300ms total (100ms × 3)
 */

async function processItems(items) {
    // ==================== YOUR CODE HERE ====================
    const arr = []
    for(let item of items){
        await delay(100);
        arr.push(`Processed: ${item}`)
    }
return arr

    
    
    // ========================================================
}


// Export for testing
module.exports = {
    delay,
    getSequentialValues,
    getUserStatus,
    processItems
};
