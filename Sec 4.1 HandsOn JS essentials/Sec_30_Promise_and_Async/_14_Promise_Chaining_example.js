/**
 * Promises & Async/Await Challenge #14
 * =====================================
 * Topic: Promise Chaining Patterns
 * 
 * This exercise tests your understanding of proper Promise chaining
 * and how to transform data through a chain of operations.
 */

// =============================================================================
// Task 1: Data Transformation Chain
// =============================================================================
/**
 * Create a function buildDataPipeline() that returns a Promise chain:
 * 
 * Starting with the value 5, chain these transformations:
 * 1. Double the value (after 100ms delay)
 * 2. Add 10 (after 100ms delay)
 * 3. Convert to string: "Result: [value]" (after 100ms delay)
 * 
 * Expected: buildDataPipeline() resolves to "Result: 20" after ~300ms
 * 
 * Use .then() chaining (not async/await for this task)
 */

function buildDataPipeline() {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Error Recovery in Chain
// =============================================================================
/**
 * Create a function resilientChain(shouldFail) that:
 * - Starts a Promise chain with value "Start"
 * - Second step: if shouldFail is true, throw "Step 2 failed"
 *               otherwise, append " → Step 2"
 * - Add a .catch() that recovers: returns "Recovered from: [error]"
 * - Third step: append " → Step 3"
 * - Returns the final string
 * 
 * Expected:
 *   await resilientChain(false); // "Start → Step 2 → Step 3"
 *   await resilientChain(true);  // "Recovered from: Step 2 failed → Step 3"
 */

function resilientChain(shouldFail) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Chaining with Branching Logic
// =============================================================================
/**
 * Create a function processOrder(order) that:
 * - order object has: { type: "digital" | "physical", item: string, price: number }
 * - Start chain with the order
 * - Step 1: Validate price > 0, otherwise throw "Invalid price"
 * - Step 2: Add tax (10%): { ...order, totalPrice: price * 1.1 }
 * - Step 3: Branch based on type:
 *   - "digital": Add { deliveryMethod: "email", deliveryTime: "instant" }
 *   - "physical": Add { deliveryMethod: "shipping", deliveryTime: "3-5 days" }
 * - Step 4: Return final order with confirmation: "Order confirmed for [item]"
 * 
 * Final object should have all properties plus a `confirmation` property
 */

function processOrder(order) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    buildDataPipeline,
    resilientChain,
    processOrder
};
