/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🗺️ CHALLENGE 1: Array.map() - Basic Transformation                           ║
 * ║                              Difficulty: ⭐ (Beginner)                                           ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: map() transforms EVERY element and returns a NEW array
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - Most common array method in React for rendering lists
 *    - Tests understanding of immutability and transformation
 */

// =============================================================================
// CHALLENGE: Transform Numbers Array
// =============================================================================
/**
 * Create a function `doubleNumbers` that:
 * - Takes an array of numbers
 * - Returns a NEW array where each number is doubled
 * - Original array must NOT be modified
 * 
 * @param {number[]} numbers - Array of numbers to double
 * @returns {number[]} - New array with doubled values
 * 
 * Examples:
 *   doubleNumbers([1, 2, 3, 4, 5]) → [2, 4, 6, 8, 10]
 *   doubleNumbers([0, -5, 10]) → [0, -10, 20]
 *   doubleNumbers([]) → []
 * 
 * 💡 HINTS:
 *   - Use Array.map()
 *   - map() automatically creates a new array
 *   - Each element passes through your callback function
 */

function doubleNumbers(numbers) {
    // ==================== YOUR CODE HERE ====================
    return numbers.map((i)=> i*2)
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Extract Property from Objects
// =============================================================================
/**
 * Create a function `extractNames` that:
 * - Takes an array of person objects (each with 'name' and 'age' properties)
 * - Returns a NEW array containing ONLY the names
 * 
 * @param {Array<{name: string, age: number}>} people - Array of person objects
 * @returns {string[]} - Array of names
 * 
 * Examples:
 *   extractNames([{name: 'Alice', age: 25}, {name: 'Bob', age: 30}]) → ['Alice', 'Bob']
 *   extractNames([]) → []
 *   extractNames([{name: 'Single', age: 1}]) → ['Single']
 * 
 * 💡 HINTS:
 *   - Access the 'name' property of each object
 *   - Use implicit return with arrow function: (person) => person.name
 */




function extractNames(people) {
    // ==================== YOUR CODE HERE ====================
    let arr = [...people]
    let val = arr.map((i)=> i.name)
    return val
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Transform Objects to New Shape
// =============================================================================
/**
 * Create a function `formatUsers` that:
 * - Takes an array of user objects with 'firstName' and 'lastName' properties
 * - Returns a NEW array of objects with a single 'fullName' property
 * 
 * @param {Array<{firstName: string, lastName: string}>} users - Array of user objects
 * @returns {Array<{fullName: string}>} - Array of formatted user objects
 * 
 * Examples:
 *   formatUsers([{firstName: 'John', lastName: 'Doe'}]) → [{fullName: 'John Doe'}]
 *   formatUsers([
 *     {firstName: 'Jane', lastName: 'Smith'},
 *     {firstName: 'Bob', lastName: 'Jones'}
 *   ]) → [{fullName: 'Jane Smith'}, {fullName: 'Bob Jones'}]
 * 
 * 💡 HINTS:
 *   - Return an object from map: (user) => ({ fullName: ... })
 *   - Note the parentheses around the object literal!
 *   - Concatenate firstName + ' ' + lastName
*/

function formatUsers(users){
    let val = [...users]
    let arr1 = val.map((i)=> i.firstName +" "+ i.lastName)
    let v =[]
     for(let i = 0; i < arr1.length; i++){
        v.push({fullName:arr1[i]})
    }
    let arr = [...v]
    return arr

}






// function formatUsers(users) {
//     // ==================== YOUR CODE HERE ====================
//         let val = [...users]
//     let arr1 = val.map((i)=> i.firstName +" "+ i.lastName)
//      for(let i = 0; i < arr1.length; i++){
//         return [{fullName:arr1[i]}]
//      }
    
//     // ========================================================
// }


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    doubleNumbers,
    extractNames,
    formatUsers
};


/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    📝 LEARNING NOTES: WHY MY INITIAL APPROACH FAILED                             ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ ❌ MY INITIAL (FAILED) APPROACH:                                                                │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 *   function formatUsers(users) {
 *       let val = [...users]
 *       let arr1 = val.map((i)=> i.firstName +" "+ i.lastName)
 *       for(let i = 0; i < arr1.length; i++){
 *           return [{fullName:arr1[i]}]   // ❌ PROBLEM: Return INSIDE the loop!
 *       }
 *   }
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ ✅ MY CORRECTED (WORKING) APPROACH:                                                             │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 *   function formatUsers(users){
 *       let val = [...users]
 *       let arr1 = val.map((i)=> i.firstName +" "+ i.lastName)
 *       let v = []
 *       for(let i = 0; i < arr1.length; i++){
 *           v.push({fullName:arr1[i]})  // ✅ Push to array instead of returning
 *       }
 *       let arr = [...v]
 *       return arr  // ✅ Return AFTER the loop completes
 *   }
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                              🔴 CONCEPT 1: RETURN INSIDE A LOOP EXITS THE FUNCTION IMMEDIATELY
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * 🧠 THE FUNDAMENTAL MISTAKE:
 *    When you use `return` inside a loop, the function STOPS executing immediately!
 *    It doesn't wait for the loop to finish - it exits the ENTIRE function on the first iteration.
 * 
 * 📦 ANALOGY - The Conveyor Belt:
 *    Imagine you're packing boxes on a conveyor belt:
 *    ❌ WRONG: You put ONE box, then leave the factory immediately (return inside loop)
 *    ✅ RIGHT: You pack ALL boxes, THEN leave with the full shipment (return after loop)
 * 
 * 🔬 UNDER THE HOOD - What happened:
 * 
 *    FAILED CODE EXECUTION:
 *    ┌─────────────────────────────────────────────────────────────────────┐
 *    │ Input: [{firstName: 'Jane', lastName: 'Smith'},                     │
 *    │         {firstName: 'Bob', lastName: 'Jones'}]                      │
 *    │                                                                     │
 *    │ Step 1: arr1 = ['Jane Smith', 'Bob Jones']  ✅ This worked!         │
 *    │                                                                     │
 *    │ Step 2: Loop Iteration 1 (i = 0):                                   │
 *    │         return [{fullName: 'Jane Smith'}]  ← FUNCTION EXITS HERE!  │
 *    │                                                                     │
 *    │ Step 3: Loop Iteration 2 (i = 1):                                   │
 *    │         ❌ NEVER REACHED! Bob Jones is LOST!                        │
 *    │                                                                     │
 *    │ Output: [{fullName: 'Jane Smith'}]  ← ONLY ONE ELEMENT!             │
 *    │ Expected: [{fullName: 'Jane Smith'}, {fullName: 'Bob Jones'}]       │
 *    └─────────────────────────────────────────────────────────────────────┘
 * 
 * 💡 INTERVIEW TIP:
 *    "return" is like an emergency exit - once you use it, you're OUT of the function.
 *    Always ask yourself: "Do I want to exit NOW, or after processing ALL elements?"
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                              🔴 CONCEPT 2: ARRAY ACCUMULATION PATTERN
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * 🧠 THE PATTERN I SHOULD HAVE USED:
 *    When you need to build an array from a loop, you need the "Accumulator Pattern":
 *    
 *    1. Create an empty array BEFORE the loop (the accumulator)
 *    2. Push elements INTO the array INSIDE the loop
 *    3. Return the array AFTER the loop completes
 * 
 * 📦 ANALOGY - The Shopping Cart:
 *    ❌ WRONG: Go to store, pick up item, pay and leave, repeat for each item
 *    ✅ RIGHT: Go to store, pick up ALL items into cart, then pay once and leave
 * 
 * 🔬 UNDER THE HOOD - The Accumulator Pattern:
 * 
 *    let result = []                    // 1️⃣ Create empty cart (accumulator)
 *    for(...) {
 *        result.push(transformedItem)   // 2️⃣ Add items to cart (accumulate)
 *    }
 *    return result                      // 3️⃣ Return full cart (after loop)
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                              🔴 CONCEPT 3: MAP CAN DO "TWO THINGS AT ONCE" - OBJECT TRANSFORMATION
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * 🧠 THE OPTIMAL SOLUTION I COULD HAVE WRITTEN:
 * 
 *    function formatUsers(users) {
 *        return users.map((user) => ({ fullName: user.firstName + " " + user.lastName }))
 *    }
 * 
 *    This is just ONE LINE - no loop, no push, no extra variables!
 * 
 * 🤔 WHAT I FAILED TO REALIZE:
 *    map() doesn't just transform VALUES, it can transform STRUCTURE too!
 *    
 *    My approach:
 *    Step 1: Extract strings with map → ['Jane Smith', 'Bob Jones']
 *    Step 2: Convert strings to objects with loop → [{fullName:'Jane Smith'}, ...]
 *    
 *    Optimal approach:
 *    ONE STEP: Transform objects directly → [{fullName:'Jane Smith'}, ...]
 * 
 * 📦 ANALOGY - The Gift Wrapper:
 *    ❌ MY WAY: Unwrap gift, put in a bag, then rewrap the bag (two steps)
 *    ✅ OPTIMAL: Rewrap the gift directly with new paper (one step)
 * 
 * 🔬 UNDER THE HOOD - Returning Objects from map():
 * 
 *    IMPORTANT SYNTAX RULE:
 *    When returning an object literal from an arrow function, 
 *    you MUST wrap it in parentheses!
 * 
 *    ❌ WRONG: (user) => { fullName: user.name }  
 *              // JS thinks {} is a function body, not an object!
 * 
 *    ✅ RIGHT: (user) => ({ fullName: user.name })
 *              // The () tells JS this is an expression (an object)
 * 
 *    WHY? Without parentheses, JavaScript interprets:
 *    { fullName: user.name } as a labeled statement inside a function body
 *    
 *    With parentheses, JavaScript interprets:
 *    ({ fullName: user.name }) as an object literal being returned
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                              🔴 CONCEPT 4: UNNECESSARY SPREAD OPERATORS
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * 🧠 WHAT I COULD HAVE AVOIDED:
 * 
 *    let val = [...users]      // ❓ Why copy? map() already creates a new array!
 *    let arr = [...v]          // ❓ Why copy? v is already the array we need!
 * 
 * 💡 KEY INSIGHT:
 *    map() ALWAYS returns a NEW array. It never mutates the original.
 *    So spreading into a new array first is redundant.
 * 
 *    users.map(...)            // ✅ Already creates a new array, no spread needed
 * 
 * 📦 ANALOGY:
 *    It's like photocopying a document, making edits on the original, 
 *    then photocopying it again. The first photocopy was pointless!
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                              📊 COMPARISON: MY APPROACH vs OPTIMAL APPROACH
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *    ┌──────────────────────────────────────────────────────────────────────────────────────────────┐
 *    │                           MY WORKING APPROACH (VERBOSE)                                      │
 *    ├──────────────────────────────────────────────────────────────────────────────────────────────┤
 *    │  function formatUsers(users){                                                                │
 *    │      let val = [...users]                          // Line 1: Unnecessary copy              │
 *    │      let arr1 = val.map((i)=> i.firstName +" "+ i.lastName)  // Line 2: Get strings        │
 *    │      let v = []                                    // Line 3: Create accumulator            │
 *    │      for(let i = 0; i < arr1.length; i++){         // Line 4: Loop                         │
 *    │          v.push({fullName:arr1[i]})                // Line 5: Build objects                │
 *    │      }                                                                                       │
 *    │      let arr = [...v]                              // Line 6: Unnecessary copy              │
 *    │      return arr                                    // Line 7: Return                        │
 *    │  }                                                                                           │
 *    │                                                                                              │
 *    │  LINES OF LOGIC: 7  |  LOOPS: 2 (map + for)  |  EXTRA VARIABLES: 4                          │
 *    └──────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 *    ┌──────────────────────────────────────────────────────────────────────────────────────────────┐
 *    │                           OPTIMAL APPROACH (CONCISE)                                         │
 *    ├──────────────────────────────────────────────────────────────────────────────────────────────┤
 *    │  function formatUsers(users) {                                                               │
 *    │      return users.map(user => ({ fullName: user.firstName + " " + user.lastName }))         │
 *    │  }                                                                                           │
 *    │                                                                                              │
 *    │  LINES OF LOGIC: 1  |  LOOPS: 1 (just map)  |  EXTRA VARIABLES: 0                           │
 *    └──────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                              🎯 KEY TAKEAWAYS FOR INTERVIEWS
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *    1. ⚠️  NEVER return inside a loop unless you intentionally want to exit early
 *    
 *    2. 📦  When building arrays, use the Accumulator Pattern:
 *           - Create empty array → Push in loop → Return after loop
 *    
 *    3. 🗺️  map() can transform BOTH values AND structure in ONE step
 *           - Don't chain map + loop when one map can do both
 *    
 *    4. 📝  When returning objects from arrow functions, wrap in parentheses:
 *           (item) => ({ key: value })
 *    
 *    5. 🔄  map() already creates a new array - spreading before map is redundant
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                              🧪 PRACTICE: TRY REWRITING THESE
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *    Challenge 1: Convert this verbose code to use single map():
 *    
 *    // Verbose:
 *    let prices = products.map(p => p.price)
 *    let formatted = []
 *    for (let i = 0; i < prices.length; i++) {
 *        formatted.push({ displayPrice: '$' + prices[i] })
 *    }
 *    return formatted
 *    
 *    // Optimal (try writing this yourself first!):
 *    // Answer: return products.map(p => ({ displayPrice: '$' + p.price }))
 * 
 * 
 *    Challenge 2: Fix this broken code (return inside loop):
 *    
 *    function getFirstLetters(words) {
 *        for (let word of words) {
 *            return word[0]  // ❌ Only returns first letter of first word!
 *        }
 *    }
 *    
 *    // Fixed version (try writing this yourself first!):
 *    // Answer: return words.map(word => word[0])
 * 
 */
