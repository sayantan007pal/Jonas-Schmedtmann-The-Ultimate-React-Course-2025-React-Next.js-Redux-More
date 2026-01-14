/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 2: Promise States - Understanding Pending, Fulfilled, Rejected ║
 * ║  Topic: The Three States of a Promise                                      ║
 * ║  Difficulty: ⭐ Beginner | Interview Frequency: 🔥🔥🔥🔥🔥                 ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * 📖 CONCEPT:
 * A Promise has exactly THREE states:
 * 
 *   1. PENDING   → Initial state, operation in progress
 *   2. FULFILLED → Operation completed successfully (resolved)
 *   3. REJECTED  → Operation failed (rejected)
 * 
 * Once a Promise is fulfilled or rejected, it is "settled" and CANNOT change!
 * 
 * 🎯 INTERVIEW TIP:
 * "Once a Promise settles, it's immutable - you can't change a fulfilled
 *  Promise to rejected or vice versa. This is crucial for predictable
 *  async behavior."
 * 
 *      ┌─────────────┐         ┌─────────────┐
 *      │  PENDING    │ ──────▶ │  FULFILLED  │
 *      │  (Waiting)  │         └─────────────┘
 *      └──────┬──────┘
 *             │
 *             └──────────────▶ ┌─────────────┐
 *                              │  REJECTED   │
 *                              └─────────────┘
 */


// =============================================================================
// CHALLENGE: Demonstrate Promise States
// =============================================================================
/**
 * Create a function `demonstratePromiseStates()` that returns an object with
 * three promises demonstrating each state:
 * 
 * 1. `pendingPromise`: A Promise that stays pending for 5 seconds
 *    - Should eventually resolve with "Finally resolved!"
 * 
 * 2. `fulfilledPromise`: A Promise that resolves immediately
 *    - Should resolve with "I am fulfilled!"
 * 
 * 3. `rejectedPromise`: A Promise that rejects immediately
 *    - Should reject with "I am rejected!"
 * 
 * @returns {Object} { pendingPromise, fulfilledPromise, rejectedPromise }
 * 
 * Example Usage:
 *   const states = demonstratePromiseStates();
 *   console.log(states.pendingPromise);   // Promise { <pending> }
 *   console.log(states.fulfilledPromise); // Promise { 'I am fulfilled!' }
 *   
 *   states.fulfilledPromise.then(v => console.log(v)); // "I am fulfilled!"
 *   states.rejectedPromise.catch(e => console.log(e)); // "I am rejected!"
 */

function demonstratePromiseStates() {
    // ==================== YOUR CODE HERE ====================
    
    // Hint: Use Promise.resolve() and Promise.reject() for immediate settlement
    // Hint: Use new Promise() with setTimeout for pending state
    const pendingPromise =  new Promise((resolve)=>{
        setTimeout(() => {
            resolve("Finally resolved!")
        }, 5000);
    })

    const fulfilledPromise=  Promise.resolve("I am fulfilled!")
        


    const rejectedPromise = Promise.reject("I am rejected!")


        return {pendingPromise, fulfilledPromise, rejectedPromise}

    // ========================================================
}


// =============================================================================
// CHALLENGE: Check if Promise is Settled
// =============================================================================
/**
 * Create a function `isPromiseSettled(promise, timeout)` that:
 * 
 * 1. Takes a promise and a timeout in milliseconds
 * 2. Returns a Promise that resolves to an object describing the state:
 *    - If the promise settles within timeout: { settled: true, state: 'fulfilled'/'rejected', value/reason }
 *    - If the promise doesn't settle within timeout: { settled: false, state: 'pending' }
 * 
 * @param {Promise} promise - The promise to check
 * @param {number} timeout - Maximum time to wait in milliseconds
 * @returns {Promise<Object>}
 * 
 * Example:
 *   const quick = Promise.resolve("fast");
 *   const slow = new Promise(r => setTimeout(() => r("slow"), 5000));
 *   
 *   await isPromiseSettled(quick, 100); // { settled: true, state: 'fulfilled', value: 'fast' }
 *   await isPromiseSettled(slow, 100);  // { settled: false, state: 'pending' }
 */

async function isPromiseSettled(promise, timeout) {
    // ==================== YOUR CODE HERE ====================
    
    // Hint: Use Promise.race() with a timeout promise
    // Hint: Use a special symbol or object to identify timeout
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    demonstratePromiseStates,
    isPromiseSettled
};


// =============================================================================
// 📚 LEARNING NOTES: What Went Wrong & How to Fix It (Interview Preparation)
// =============================================================================
/**
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  🔴 YOUR ORIGINAL ATTEMPT (Lines 65-82) - WHAT YOU WROTE:                 ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 *   let pendingPromise = new Promise((resolve, reject)=>{
 *       return setTimeout(() => { resolve("Finally resolved!") }, 5000);
 *   })
 *   let fulfilledPromise = new Promise((resolve, reject)=>{
 *       return resolve("I am fulfilled!")
 *   })
 *   let rejectedPromise = new Promise((resolve, reject)=>{
 *       return reject("I am rejected!")
 *   })
 *   try {
 *       return {[pendingPromise, fulfilledPromise, rejectedPromise]}  // ❌ SYNTAX ERROR!
 *   } catch (err) {
 *       console.log(err)
 *   }
 * 
 * 
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  🟢 THE CORRECT SOLUTION:                                                 ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 *   function demonstratePromiseStates() {
 *       const pendingPromise = new Promise((resolve) => {
 *           setTimeout(() => resolve("Finally resolved!"), 5000);
 *       });
 *       
 *       const fulfilledPromise = Promise.resolve("I am fulfilled!");
 *       
 *       const rejectedPromise = Promise.reject("I am rejected!");
 *       
 *       return { pendingPromise, fulfilledPromise, rejectedPromise };
 *   }
 * 
 * 
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  🎯 KEY CONCEPTS YOU MISSED (4 Critical Mistakes)                         ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ❌ MISTAKE #1: INVALID OBJECT LITERAL SYNTAX
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 *   What you wrote:    return {[pendingPromise, fulfilledPromise, rejectedPromise]}
 *   What you meant:    return { pendingPromise, fulfilledPromise, rejectedPromise }
 * 
 *   🍕 PIZZA BOX ANALOGY:
 *   ─────────────────────
 *   Imagine you're labeling pizza boxes for delivery:
 *   
 *   ❌ WRONG: { [🍕, 🍕, 🍕] }
 *      → You put pizzas inside, but forgot to write labels on the boxes!
 *      → JavaScript: "I don't know what key to use for these values!"
 *   
 *   ✅ CORRECT: { margherita: 🍕, pepperoni: 🍕, veggie: 🍕 }
 *      → Each box has a label (key) and pizza inside (value)
 *      → JavaScript: "I know exactly where each pizza belongs!"
 *   
 *   📝 WHAT HAPPENED:
 *   - `{ key: value }` → Valid object literal
 *   - `{ [expression]: value }` → Computed property name (needs a value after colon!)
 *   - `{ [value1, value2] }` → ❌ SYNTAX ERROR - makes no sense to JavaScript
 *   
 *   📝 THE FIX (ES6 Shorthand Property):
 *   When the variable name IS the key you want, just list them:
 *   
 *       return { pendingPromise, fulfilledPromise, rejectedPromise };
 *       
 *   This is shorthand for:
 *       return { 
 *           pendingPromise: pendingPromise, 
 *           fulfilledPromise: fulfilledPromise, 
 *           rejectedPromise: rejectedPromise 
 *       };
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ❌ MISTAKE #2: UNNECESSARY 'return' INSIDE PROMISE EXECUTOR
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 *   What you wrote:    return setTimeout(() => {...}, 5000);
 *                      return resolve("I am fulfilled!")
 *   
 *   What's correct:    setTimeout(() => {...}, 5000);    // No return needed
 *                      resolve("I am fulfilled!")         // No return needed
 * 
 *   🍳 COOKING ANALOGY:
 *   ─────────────────────
 *   Think of the Promise executor as a kitchen, and `resolve`/`reject` as 
 *   the serving window to the dining room:
 *   
 *   ❌ WRONG THINKING:
 *       "I need to RETURN the food to the customer"
 *       → return resolve("food") 
 *       → The 'return' adds nothing; resolve() already sends the food out!
 *   
 *   ✅ CORRECT THINKING:
 *       "I PUSH the food through the serving window (resolve/reject)"
 *       → resolve("food") is like pushing food through the window
 *       → The promise takes care of delivery to .then() customers
 *   
 *   📝 WHY 'return' IS MEANINGLESS HERE:
 *   
 *   new Promise((resolve, reject) => {
 *       return resolve("value");  // The return value is IGNORED by Promise
 *   });
 *   
 *   - The Promise constructor IGNORES whatever the executor returns
 *   - resolve() doesn't return anything meaningful (returns undefined)
 *   - So `return resolve()` is same as `return undefined` → useless
 *   
 *   📝 THE ONLY EXCEPTION - EARLY EXIT:
 *   Sometimes return is used for EARLY EXIT (control flow), not for value:
 *   
 *   new Promise((resolve, reject) => {
 *       if (error) {
 *           reject("error");
 *           return;  // ← Just to EXIT early, prevent code below from running
 *       }
 *       // ... more code that shouldn't run if error
 *       resolve("success");
 *   });
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ❌ MISTAKE #3: UNNECESSARY try-catch AROUND return STATEMENT
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 *   What you wrote:
 *       try {
 *           return { ... }
 *       } catch (err) {
 *           console.log(err)
 *       }
 * 
 *   🎣 FISHING ANALOGY:
 *   ─────────────────────
 *   try-catch is like a fishing net to catch THROWN errors:
 *   
 *   ❌ WRONG: Putting a net where no fish (errors) exist
 *       → A simple `return` statement doesn't throw errors
 *       → You're holding an empty fishing net in the middle of a desert!
 *   
 *   ✅ WHEN TO USE try-catch:
 *       → Operations that can THROW: JSON.parse(), API calls, file operations
 *       → Code that explicitly does: throw new Error("something")
 *   
 *   📝 KEY INSIGHT:
 *   - Promises have THEIR OWN error handling (.catch method)
 *   - try-catch catches SYNCHRONOUS errors
 *   - Promise rejections are ASYNCHRONOUS - you can't catch them with sync try-catch!
 *   
 *       // This try-catch is USELESS for Promise rejections:
 *       try {
 *           let p = Promise.reject("error");  // Won't be caught!
 *       } catch(e) {
 *           console.log("Never runs for promise rejections!");
 *       }
 *   
 *   📝 THE FIX:
 *   Simply remove the try-catch. It's not needed here:
 *   
 *       return { pendingPromise, fulfilledPromise, rejectedPromise };
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 * ❌ MISTAKE #4: OVERCOMPLICATING - MISSING Promise.resolve() & Promise.reject()
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 *   What you wrote (verbose):
 *       let fulfilledPromise = new Promise((resolve, reject)=>{
 *           return resolve("I am fulfilled!")
 *       })
 *   
 *   What's simpler:
 *       const fulfilledPromise = Promise.resolve("I am fulfilled!");
 * 
 *   🏭 FACTORY ANALOGY:
 *   ─────────────────────
 *   Think of creating a Promise like ordering a product:
 *   
 *   ❌ YOUR WAY (Building from scratch):
 *       "I'll get raw materials, set up machinery, hire workers, 
 *        create a factory... just to make one pre-made sandwich."
 *       → new Promise((resolve) => resolve("sandwich"))
 *   
 *   ✅ SIMPLER WAY (Using the shortcut):
 *       "I'll just order from the ready-made sandwich counter."
 *       → Promise.resolve("sandwich")
 *   
 *   📝 THE THREE PROMISE CREATION PATTERNS:
 *   
 *   ┌─────────────────────────────────────────────────────────────────────┐
 *   │  PATTERN 1: new Promise() - For ASYNC operations                   │
 *   ├─────────────────────────────────────────────────────────────────────┤
 *   │  Use when: You need to wrap async code (setTimeout, API calls)     │
 *   │                                                                     │
 *   │  const pendingPromise = new Promise((resolve) => {                 │
 *   │      setTimeout(() => resolve("Done!"), 5000);                     │
 *   │  });                                                                │
 *   └─────────────────────────────────────────────────────────────────────┘
 *   
 *   ┌─────────────────────────────────────────────────────────────────────┐
 *   │  PATTERN 2: Promise.resolve() - For IMMEDIATE success              │
 *   ├─────────────────────────────────────────────────────────────────────┤
 *   │  Use when: You already have the value, want a resolved Promise     │
 *   │                                                                     │
 *   │  const fulfilledPromise = Promise.resolve("Already done!");        │
 *   │  // Same as: new Promise(resolve => resolve("Already done!"))      │
 *   │  // But CLEANER and signals "this is immediately resolved"         │
 *   └─────────────────────────────────────────────────────────────────────┘
 *   
 *   ┌─────────────────────────────────────────────────────────────────────┐
 *   │  PATTERN 3: Promise.reject() - For IMMEDIATE failure               │
 *   ├─────────────────────────────────────────────────────────────────────┤
 *   │  Use when: You want to return a rejected Promise immediately       │
 *   │                                                                     │
 *   │  const rejectedPromise = Promise.reject("Failed!");                │
 *   │  // Same as: new Promise((_, reject) => reject("Failed!"))         │
 *   │  // But CLEANER and signals "this fails immediately"               │
 *   └─────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  🎯 COMPLETE MENTAL MODEL: The Promise State Machine                      ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 *   🚗 CAR JOURNEY ANALOGY:
 *   ─────────────────────────
 *   A Promise is like a car journey from point A to point B:
 *   
 *   ┌─────────────────┐
 *   │    PENDING      │  🚗 "Car has left, currently on the highway"
 *   │   (Traveling)   │     → The journey is in progress
 *   └────────┬────────┘     → You're waiting for arrival confirmation
 *            │
 *            ├─── SUCCESS ──→  ┌─────────────────┐
 *            │                 │   FULFILLED     │  🏁 "Car arrived safely!"
 *            │                 │   (Resolved)    │     → resolve("I'm here!")
 *            │                 └─────────────────┘
 *            │
 *            └─── FAILURE ──→  ┌─────────────────┐
 *                              │   REJECTED      │  💥 "Car broke down!"
 *                              │   (Failed)      │     → reject("Flat tire!")
 *                              └─────────────────┘
 *   
 *   📝 KEY RULES:
 *   1. A Promise starts in PENDING state (the car is on its way)
 *   2. It can only transition ONCE (car can't arrive twice or crash twice)
 *   3. Once SETTLED (fulfilled/rejected), it NEVER changes
 *   4. .then() is like your phone - it rings when car arrives
 *   5. .catch() is like emergency services - called only if car crashes
 * 
 * 
 * ╔═══════════════════════════════════════════════════════════════════════════╗
 * ║  🎤 INTERVIEW CHEAT SHEET                                                 ║
 * ╚═══════════════════════════════════════════════════════════════════════════╝
 * 
 *   Q: "What are the three states of a Promise?"
 *   A: "PENDING (initial), FULFILLED (success), REJECTED (failure).
 *       Once settled, a Promise is immutable - it cannot change states."
 * 
 *   Q: "When would you use Promise.resolve() vs new Promise()?"
 *   A: "Promise.resolve() for immediate values - like wrapping a sync value
 *       in a Promise for API consistency. new Promise() for actual async
 *       operations like setTimeout or wrapping callback APIs."
 * 
 *   Q: "Can you change a fulfilled Promise to rejected?"
 *   A: "No. Once a Promise settles (fulfilled or rejected), it's immutable.
 *       This ensures predictable async behavior - consumers always get
 *       the same result no matter when they attach .then() or .catch()."
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 *   💡 FINAL TIP: When you encounter a Promise problem, ask yourself:
 *   
 *   1. Do I need ASYNC behavior? → Use `new Promise()` with resolve/reject
 *   2. Do I have the value ALREADY? → Use `Promise.resolve(value)`
 *   3. Do I need to FAIL immediately? → Use `Promise.reject(error)`
 *   4. Am I returning an OBJECT? → Use `{ key: value }` or `{ key }` shorthand
 * ═══════════════════════════════════════════════════════════════════════════
 */
