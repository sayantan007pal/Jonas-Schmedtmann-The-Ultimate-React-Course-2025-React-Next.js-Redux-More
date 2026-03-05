/**
 * Promises & Async/Await Challenge #3
 * ====================================
 * Topic: Using .then() and .catch() for Promise Consumption
 * 
 * This exercise tests your understanding of how to consume Promises
 * using the traditional .then() and .catch() methods.
 */

// =============================================================================
// Task 1: Basic .then() Chain
// =============================================================================
/**
 * Create a function doubleAfterDelay(num) that:
 * - Returns a Promise that resolves with num * 2 after 500ms
 * 
 * Then create a function quadrupleNumber(num) that:
 * - Uses doubleAfterDelay TWICE in a .then() chain
 * - First doubles the number, then doubles the result again
 * - Returns a Promise that resolves with the final value (num * 4)
 * 
 * Expected behavior:
 *   quadrupleNumber(5).then(result => console.log(result));
 *   // After ~1 second: 20
 */

function doubleAfterDelay(num) {
    // ==================== YOUR CODE HERE ====================
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num * 2);
        }, 500);
    });
    // ========================================================
}

function quadrupleNumber(num) {
    // ==================== YOUR CODE HERE ====================
    // Use doubleAfterDelay and .then() chaining
    
    return doubleAfterDelay(num).then(value=> doubleAfterDelay(value))
                                
    
    // ========================================================
}


// =============================================================================
// Task 2: Handling Errors with .catch()
// =============================================================================
/**
 * Create a function divideNumbers(a, b) that:
 * - Returns a Promise
 * - If b is 0, reject with "Cannot divide by zero"
 * - Otherwise, resolve with a / b
 * 
 * Then create a function safeDivide(a, b) that:
 * - Calls divideNumbers(a, b)
 * - Uses .catch() to handle the error
 * - Returns a Promise that resolves with the division result
 * - If there's an error, the Promise should resolve with 0 instead (don't re-throw)
 * 
 * Expected behavior:
 *   safeDivide(10, 2).then(r => console.log(r));  // 5
 *   safeDivide(10, 0).then(r => console.log(r));  // 0 (error was caught)
 */

function divideNumbers(a, b) {
    // ==================== YOUR CODE HERE ====================
    return new Promise((resolve,reject)=>{
        if(b==0){
            reject(`Cannot divide by zero`)
        }
        else{
            resolve(a/b)
        }
    })
    
    
    // ========================================================
}

function safeDivide(a, b) {
    // ==================== YOUR CODE HERE ====================
    return divideNumbers(a, b)
        .catch(err => 0);  // If error, return 0 instead
    // ========================================================
}


// =============================================================================
// Task 3: Transform Data in .then() Chain
// =============================================================================
/**
 * Create a function processUserData(user) that:
 * - Takes a user object like { firstName: "John", lastName: "Doe", age: 25 }
 * - Returns a Promise
 * - Use a .then() chain to:
 *   1. First, create fullName by combining firstName and lastName
 *   2. Then, create a greeting: "Hello, [fullName]! You are [age] years old."
 *   3. Finally, resolve with the greeting in UPPERCASE
 * 
 * Expected behavior:
 *   processUserData({ firstName: "John", lastName: "Doe", age: 25 })
 *     .then(greeting => console.log(greeting));
 *   // "HELLO, JOHN DOE! YOU ARE 25 YEARS OLD."
 */

function processUserData(user) {
    // ==================== YOUR CODE HERE ====================
    return Promise.resolve(user)
        .then(u => ({
            fullName: `${u.firstName} ${u.lastName}`,
            ag:`${u.age}`,
        }))
        .then(u => `Hello, ${u.fullName}! You are ${u.ag} years old.`)
        .then(greeting => greeting.toUpperCase());
    // ========================================================
}


// Export for testing
module.exports = {
    doubleAfterDelay,
    quadrupleNumber,
    divideNumbers,
    safeDivide,
    processUserData
};


// =============================================================================
// 📚 INTERVIEW REVISION GUIDE: .then() and .catch() - Deep Dive with Analogies
// =============================================================================
/**
 * ============================================================================
 * 🔴 WHY I FAILED (Common Beginner Mistakes to Avoid)
 * ============================================================================
 * 
 * MISTAKE 1: Treating a Function as a Value
 * ------------------------------------------
 * ❌ WRONG: resolve(doubleAfterDelay * 2)
 * 
 * This is like saying: "Take the recipe for baking a cake and multiply it by 2"
 * That doesn't make sense! A recipe is a SET OF INSTRUCTIONS, not a number.
 * 
 * `doubleAfterDelay` is a FUNCTION (a recipe).
 * `doubleAfterDelay(5)` CALLS the function and gives you the Promise (the cake).
 * 
 * 
 * MISTAKE 2: Creating a NEW Promise Instead of Chaining
 * ------------------------------------------------------
 * ❌ WRONG: return new Promise((resolve, reject) => { ... setTimeout ... })
 * 
 * When you already have a function that returns a Promise (like doubleAfterDelay),
 * you should CHAIN off of it using .then(), not create a brand new Promise!
 * 
 * This is like: The restaurant (doubleAfterDelay) already has a conveyor belt 
 * system (Promise) that delivers food. Why would you build a completely NEW 
 * conveyor belt when you can just add another chef station on the existing one?
 * 
 * 
 * ============================================================================
 * 🎯 THE CORE CONCEPT: What is .then() Chaining?
 * ============================================================================
 * 
 * 🍕 PIZZA ORDERING ANALOGY:
 * --------------------------
 * Imagine ordering pizza online:
 * 
 *   orderPizza()                    // Step 1: Place order → Returns a Promise
 *     .then(pizza => addToppings(pizza))    // Step 2: When pizza arrives, add toppings
 *     .then(pizza => deliverToHome(pizza))  // Step 3: When toppings added, deliver
 *     .catch(err => handleError(err));      // If ANY step fails, handle it
 * 
 * Each .then() waits for the previous step to COMPLETE before running.
 * The output of one .then() becomes the input of the next!
 * 
 * 
 * 🏭 FACTORY ASSEMBLY LINE ANALOGY:
 * ----------------------------------
 * Think of .then() like an assembly line in a factory:
 * 
 *   Raw Material → [Station 1] → Half Product → [Station 2] → Finished Product
 *        ↑              ↑              ↑              ↑              ↑
 *     Initial      First .then()    Result      Second .then()   Final
 *      Value                                                     Result
 * 
 * The correct solution:
 *   doubleAfterDelay(5)           // Station 1: 5 enters, 10 comes out
 *     .then(doubled =>            // doubled = 10 (result from station 1)
 *       doubleAfterDelay(doubled) // Station 2: 10 enters, 20 comes out
 *     );
 * 
 * 
 * ============================================================================
 * 🔑 KEY RULES FOR .then() CHAINING (Interview Must-Know!)
 * ============================================================================
 * 
 * RULE 1: .then() ALWAYS returns a Promise
 * -----------------------------------------
 * Whatever you return inside .then(), it gets wrapped in a Promise automatically.
 * 
 *   promise.then(x => x * 2)  // Returns: Promise that resolves to x * 2
 *   promise.then(x => anotherPromise(x))  // Returns: That anotherPromise
 * 
 * 
 * RULE 2: The next .then() waits for the previous one
 * ----------------------------------------------------
 * If you return a PROMISE inside .then(), the chain WAITS for it to resolve.
 * 
 *   fetch('/data')                           // 1. Initiate request (Promise)
 *     .then(response => response.json())     // 2. Wait, then parse JSON (Promise)
 *     .then(data => console.log(data))       // 3. Wait, then log data
 * 
 * 
 * RULE 3: .catch() handles errors from ANY preceding .then()
 * ----------------------------------------------------------
 *   step1()
 *     .then(step2)   // If step2 throws...
 *     .then(step3)   // step3 is SKIPPED
 *     .catch(err);   // ...error is caught here!
 * 
 * 
 * ============================================================================
 * 📝 INTERVIEW PATTERN: How to Answer ".then() vs async/await" Questions
 * ============================================================================
 * 
 * .then() Chaining:
 *   doubleAfterDelay(5)
 *     .then(result => doubleAfterDelay(result))
 *     .then(final => console.log(final));
 * 
 * async/await (Modern Syntax - Same Logic!):
 *   async function quadruple() {
 *     const first = await doubleAfterDelay(5);
 *     const final = await doubleAfterDelay(first);
 *     console.log(final);
 *   }
 * 
 * Both do the EXACT same thing! async/await is just "syntactic sugar" 
 * (cleaner way to write the same logic).
 * 
 * 
 * ============================================================================
 * ⚠️ COMMON INTERVIEW GOTCHAS
 * ============================================================================
 * 
 * GOTCHA 1: Forgetting to RETURN inside .then()
 * ----------------------------------------------
 * ❌ WRONG:
 *   promise.then(x => { doSomething(x); });  // Returns undefined!
 * 
 * ✅ RIGHT:
 *   promise.then(x => { return doSomething(x); });
 *   // OR
 *   promise.then(x => doSomething(x));  // Implicit return
 * 
 * 
 * GOTCHA 2: Nesting .then() instead of chaining
 * ----------------------------------------------
 * ❌ WRONG (Callback Hell pattern):
 *   step1().then(result1 => {
 *     step2(result1).then(result2 => {
 *       step3(result2).then(result3 => { ... });
 *     });
 *   });
 * 
 * ✅ RIGHT (Flat chain):
 *   step1()
 *     .then(result1 => step2(result1))
 *     .then(result2 => step3(result2))
 *     .then(result3 => { ... });
 * 
 * 
 * ============================================================================
 * 🎓 SUMMARY: What You Should Remember for Interviews
 * ============================================================================
 * 
 * 1. A FUNCTION that returns a Promise is NOT the same as THE PROMISE itself
 *    → Always CALL the function: fn(arg), not just fn
 * 
 * 2. .then() is used to CHAIN async operations sequentially
 *    → Each .then() waits for the previous one to complete
 * 
 * 3. Return value of .then() becomes input to the next .then()
 *    → Like passing a baton in a relay race!
 * 
 * 4. .catch() handles errors from ANY step in the chain
 *    → Put it at the end to catch all errors
 * 
 * 5. Don't create new Promises when you can chain existing ones
 *    → Use the conveyor belt that's already there!
 * 
 */