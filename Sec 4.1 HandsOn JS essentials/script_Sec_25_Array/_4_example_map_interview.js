/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🗺️ CHALLENGE 4: Array.map() - Interview-Level                                ║
 * ║                              Difficulty: ⭐⭐⭐ (Advanced)                                       ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Complex map() transformations commonly asked in interviews
 * 
 * 🎯 INTERVIEW IMPORTANCE: CRITICAL
 *    - These are actual interview questions from top tech companies
 *    - Tests deep understanding of map() and data transformation
 */

// =============================================================================
// CHALLENGE: Implement Your Own map() Function
// =============================================================================
/**
 * Create a function `customMap` that:
 * - Implements the functionality of Array.map() from scratch
 * - Takes an array and a callback function
 * - Returns a new array with transformed values
 * - DO NOT use the built-in .map() method!
 * 
 * @param {Array} array - The array to transform
 * @param {Function} callback - Function to apply to each element (element, index, array) => newValue
 * @returns {Array} - New transformed array
 * 
 * Examples:
 *   customMap([1, 2, 3], x => x * 2) → [2, 4, 6]
 *   customMap(['a', 'b'], (el, i) => el + i) → ['a0', 'b1']
 *   customMap([], x => x) → []
 * 
 * 💡 HINTS:
 *   - Use a for loop to iterate through the array
 *   - Create a new result array
 *   - Push transformed values to the result array
 *   - The callback receives (element, index, originalArray)
 */

function customMap(array, callback) {
    // ==================== YOUR CODE HERE ====================
    let cpy = [...array]
    let val =[]
    for (let i = 0; i< cpy.length; i++){
        let transformedValue = callback(cpy[i],i,cpy)
        val.push(transformedValue)
    }

    return val    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Matrix Transformation
// =============================================================================
/**
 * Create a function `transformMatrix` that:
 * - Takes a 2D array (matrix) of numbers
 * - Returns a new matrix where each element is squared
 * - Preserve the matrix structure (rows and columns)
 * 
 * @param {number[][]} matrix - 2D array of numbers
 * @returns {number[][]} - New matrix with squared values
 * 
 * Examples:
 *   transformMatrix([[1, 2], [3, 4]]) → [[1, 4], [9, 16]]
 *   transformMatrix([[1, 2, 3]]) → [[1, 4, 9]]
 *   transformMatrix([]) → []
 * 
 * 💡 HINTS:
 *   - You need NESTED map() calls
 *   - Outer map() iterates over rows
 *   - Inner map() iterates over elements in each row
 */

function transformMatrix(matrix) {
    // ==================== YOUR CODE HERE ====================
    let val =[...matrix]
    val = val.map((i)=>(i.map((j)=>j*j)))
    
    console.log(val)
    return val   
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Group and Transform
// =============================================================================
/**
 * Create a function `groupByCategory` that:
 * - Takes an array of product objects with 'name', 'category', 'price'
 * - Returns an OBJECT where keys are categories
 * - Each category contains array of product names in that category
 * 
 * @param {Array<{name: string, category: string, price: number}>} products
 * @returns {Object} - Object with categories as keys and arrays of names as values
 * 
 * Examples:
 *   groupByCategory([
 *     {name: 'iPhone', category: 'Electronics', price: 999},
 *     {name: 'MacBook', category: 'Electronics', price: 1999},
 *     {name: 'Shirt', category: 'Clothing', price: 50}
 *   ]) → {
 *     Electronics: ['iPhone', 'MacBook'],
 *     Clothing: ['Shirt']
 *   }
 * 
 * 💡 HINTS:
 *   - This is actually better solved with reduce(), but you CAN use map()
 *   - Consider using reduce() for the grouping logic
 *   - Or use map() + Object.fromEntries() pattern
*/

function groupByCategory(products) {
    // ==================== YOUR CODE HERE ====================
    let val =[...products]
    let arr = []
    arr = val.reduce((group, element)=>{
        (group[element.category]= group[element.category] || []).push(element.name)
        console.log(group)
        return group  
    },{})

    console.log(arr)
    return arr    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Flatten and Transform Nested Data
// =============================================================================
/**
 * Create a function `flattenOrderItems` that:
 * - Takes an array of order objects, each with 'orderId' and 'items' array
 * - Returns a flat array of all items with 'orderId' added to each item
 * 
 * @param {Array<{orderId: number, items: Array<{name: string, qty: number}>}>} orders
 * @returns {Array<{orderId: number, name: string, qty: number}>}
 * 
 * Examples:
 *   flattenOrderItems([
 *     {orderId: 1, items: [{name: 'Apple', qty: 2}, {name: 'Banana', qty: 3}]},
 *     {orderId: 2, items: [{name: 'Orange', qty: 1}]}
 *   ]) → [
 *     {orderId: 1, name: 'Apple', qty: 2},
 *     {orderId: 1, name: 'Banana', qty: 3},
 *     {orderId: 2, name: 'Orange', qty: 1}
 *   ]
 * 
 * 💡 HINTS:
 *   - Use flatMap() or map() + flat()
 *   - flatMap() = map() followed by flat(1)
 *   - For each order, map over items and add orderId
*/

function flattenOrderItems(orders) {
    // ==================== YOUR CODE HERE ====================
    
    










    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    customMap,
    transformMatrix,
    groupByCategory,
    flattenOrderItems
};


// =============================================================================
// 📚 INTERVIEW REVISION: How to Implement map() from Scratch
// =============================================================================
/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║           🎯 MASTERING: Implementing Array.map() from Scratch                                    ║
 * ║                        (A Very Common Interview Question!)                                        ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🧠 WHY THIS IS ASKED IN INTERVIEWS
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * Interviewers ask you to implement map() to check if you understand:
 * 1. How higher-order functions work (functions that take functions as arguments)
 * 2. What map() actually DOES under the hood
 * 3. The callback signature: (element, index, originalArray:array)
 * 4. Immutability - creating a NEW array, not modifying the original
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎭 ANALOGY: Think of map() like a Factory Assembly Line
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * Imagine a FACTORY that takes raw materials and transforms them:
 * 
 *   🏭 ASSEMBLY LINE:
 *   ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 *   │                                                                                            │
 *   │   📦 INPUT BELT        🔧 TRANSFORMER        📦 OUTPUT BELT                               │
 *   │   [Raw Materials]   →  (Your callback)   →  [Finished Products]                          │
 *   │                                                                                            │
 *   │   [1, 2, 3]         →  (x => x * 2)      →  [2, 4, 6]                                     │
 *   │                                                                                            │
 *   │   Each item goes through the transformer ONCE, gets modified, and placed on output belt   │
 *   └─────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * The CALLBACK is like a WORKER at the transformer station:
 *   • Worker receives: The item (element), its position in line (index), the whole batch (array)
 *   • Worker returns: The transformed item
 *   • Worker does NOT modify the original - creates a NEW item
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📦 BREAKING DOWN YOUR SOLUTION (Step-by-Step)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * YOUR CODE:
 * ```javascript
 * function customMap(array, callback) {
 *     let cpy = [...array]                              // STEP 1: Copy input
 *     let val = []                                      // STEP 2: Create output belt
 *     for (let i = 0; i < cpy.length; i++) {           // STEP 3: Loop through items
 *         let transformedValue = callback(cpy[i], i, cpy)  // STEP 4: Transform each item
 *         val.push(transformedValue)                   // STEP 5: Place on output belt
 *     }
 *     return val                                       // STEP 6: Return finished products
 * }
 * ```
 * 
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ STEP 1: let cpy = [...array]                                                                  │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   PURPOSE: Create a COPY of the input array                                                  │
 * │                                                                                               │
 * │   WHY?                                                                                        │
 * │   • IMMUTABILITY: We don't want to accidentally modify the original                          │
 * │   • SAFETY: If callback does something weird, original is protected                          │
 * │                                                                                               │
 * │   NOTE: Actually, for basic map(), you can also iterate over `array` directly since         │
 * │         we're only READING from it, not modifying it. But copying is a safe habit!           │
 * │                                                                                               │
 * │   ALTERNATIVE (also valid):                                                                  │
 * │   for (let i = 0; i < array.length; i++) { ... }  // Works fine too!                        │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ STEP 2: let val = []                                                                          │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   PURPOSE: Create the EMPTY OUTPUT ARRAY (the "output belt")                                 │
 * │                                                                                               │
 * │   This is where we'll collect all the transformed values.                                    │
 * │   It starts empty because we haven't processed anything yet!                                 │
 * │                                                                                               │
 * │   🎭 ANALOGY: This is like an empty box at the end of the assembly line,                    │
 * │              waiting to collect the finished products.                                       │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ STEP 3: for (let i = 0; i < cpy.length; i++)                                                  │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   PURPOSE: Iterate through EVERY element in the array                                        │
 * │                                                                                               │
 * │   WHY A FOR LOOP?                                                                             │
 * │   • We can't use .map() because we're IMPLEMENTING map!                                      │
 * │   • We need access to the INDEX (i) to pass to callback                                      │
 * │   • For loop gives us full control                                                           │
 * │                                                                                               │
 * │   IMPORTANT: i starts at 0, goes up to (length - 1)                                          │
 * │   Example: array = [a, b, c] → i = 0, 1, 2                                                   │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ STEP 4: let transformedValue = callback(cpy[i], i, cpy)    ⭐ THE CORE LOGIC!                │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   PURPOSE: Call the transformation function on each element                                  │
 * │                                                                                               │
 * │   THE CALLBACK RECEIVES 3 ARGUMENTS (this is the standard map() signature!):                 │
 * │                                                                                               │
 * │   callback(cpy[i], i, cpy)                                                                   │
 * │            ↑       ↑   ↑                                                                     │
 * │            |       |   └─ 3rd: The ENTIRE array (rarely used, but available)                 │
 * │            |       └─ 2nd: The INDEX/position (0, 1, 2, ...)                                 │
 * │            └─ 1st: The CURRENT ELEMENT being processed                                       │
 * │                                                                                               │
 * │   EXAMPLES:                                                                                  │
 * │   • callback = (x) => x * 2                                                                  │
 * │     → Only uses the element                                                                  │
 * │                                                                                               │
 * │   • callback = (el, i) => el + i                                                             │
 * │     → Uses element AND index                                                                 │
 * │     → ['a', 'b'] → ['a0', 'b1']                                                              │
 * │                                                                                               │
 * │   • callback = (el, i, arr) => el + arr.length                                               │
 * │     → Uses element AND the array reference                                                   │
 * │     → [1, 2, 3] → [4, 5, 6] (each + 3)                                                       │
 * │                                                                                               │
 * │   THE CALLBACK RETURNS: The transformed value                                                │
 * │   We store this in `transformedValue`                                                        │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ STEP 5: val.push(transformedValue)                                                            │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   PURPOSE: Add the transformed value to the output array                                     │
 * │                                                                                               │
 * │   .push() adds to the END of the array, maintaining ORDER:                                   │
 * │   • First iteration: val = [transformed_0]                                                   │
 * │   • Second iteration: val = [transformed_0, transformed_1]                                   │
 * │   • Third iteration: val = [transformed_0, transformed_1, transformed_2]                    │
 * │   • ... and so on                                                                            │
 * │                                                                                               │
 * │   🎭 ANALOGY: Placing each finished product into the collection box, one by one             │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ STEP 6: return val                                                                            │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   PURPOSE: Return the NEW array containing all transformed values                            │
 * │                                                                                               │
 * │   IMPORTANT PROPERTIES OF THE RESULT:                                                        │
 * │   • It's a NEW array (original is unchanged) → IMMUTABILITY ✅                              │
 * │   • Same LENGTH as the input → map() always returns same-length array                       │
 * │   • ORDER is preserved → element at index 0 stays at index 0                                │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🔍 VISUALIZING THE EXECUTION (Trace Through)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * Let's trace: customMap([1, 2, 3], x => x * 2)
 * 
 * INITIAL STATE:
 *   cpy = [1, 2, 3]
 *   val = []
 *   callback = x => x * 2
 * 
 * ITERATION 1 (i = 0):
 *   cpy[0] = 1
 *   transformedValue = callback(1, 0, [1,2,3]) = 1 * 2 = 2
 *   val.push(2) → val = [2]
 * 
 * ITERATION 2 (i = 1):
 *   cpy[1] = 2
 *   transformedValue = callback(2, 1, [1,2,3]) = 2 * 2 = 4
 *   val.push(4) → val = [2, 4]
 * 
 * ITERATION 3 (i = 2):
 *   cpy[2] = 3
 *   transformedValue = callback(3, 2, [1,2,3]) = 3 * 2 = 6
 *   val.push(6) → val = [2, 4, 6]
 * 
 * LOOP ENDS (i = 3 is not < 3)
 * 
 * RETURN: [2, 4, 6] ✅
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🔑 THE CALLBACK SIGNATURE (Memorize This!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *   callback(element, index, array)
 *            ↑        ↑      ↑
 *            1st      2nd    3rd
 * 
 *   MOST COMMON USAGES:
 *   • (el) => ...              → Just transform the element
 *   • (el, i) => ...           → Transform using element AND its position
 *   • (el, i, arr) => ...      → Transform using element, position, AND the whole array
 * 
 *   REMEMBER: The callback MUST RETURN something!
 *   Whatever it returns becomes the new value in the output array.
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🧪 PRACTICE EXAMPLES (Try These in Console!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * // Example 1: Simple transformation
 * customMap([1, 2, 3], x => x * 2)
 * // → [2, 4, 6]
 * 
 * // Example 2: Using index
 * customMap(['a', 'b', 'c'], (el, i) => `${el}${i}`)
 * // → ['a0', 'b1', 'c2']
 * 
 * // Example 3: Using the array reference
 * customMap([1, 2, 3], (el, i, arr) => el + arr.length)
 * // → [4, 5, 6]  (each element + 3)
 * 
 * // Example 4: Empty array edge case
 * customMap([], x => x * 2)
 * // → []  (loop never runs, returns empty array)
 * 
 * // Example 5: Transforming objects
 * customMap([{name: 'John'}, {name: 'Jane'}], obj => obj.name.toUpperCase())
 * // → ['JOHN', 'JANE']
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎤 INTERVIEW TIP: How to Explain This
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * If asked "Implement Array.map() from scratch", say:
 * 
 * "To implement map(), I need to:
 * 
 *  1. Create an empty result array to collect transformed values
 *  2. Loop through each element of the input array using a for loop
 *  3. For each element, call the callback function, passing:
 *     - The current element
 *     - Its index
 *     - The original array reference
 *  4. Push the callback's return value into the result array
 *  5. Return the result array
 * 
 *  The key insight is that map() is a higher-order function - it takes
 *  a function as an argument and applies it to each element, returning
 *  a NEW array without modifying the original."
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📝 VISUAL SUMMARY (Print This Out!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *  ┌─────────────────────────────────────────────────────────────────────────┐
 *  │                    HOW customMap() WORKS                                │
 *  ├─────────────────────────────────────────────────────────────────────────┤
 *  │                                                                         │
 *  │  INPUT:  [1, 2, 3]  +  callback(x => x * 2)                            │
 *  │                                                                         │
 *  │  PROCESS:                                                               │
 *  │  ┌─────┐    ┌─────────────────┐    ┌─────┐                             │
 *  │  │  1  │ →  │ callback(1,0,arr)│ → │  2  │ → push to result            │
 *  │  │  2  │ →  │ callback(2,1,arr)│ → │  4  │ → push to result            │
 *  │  │  3  │ →  │ callback(3,2,arr)│ → │  6  │ → push to result            │
 *  │  └─────┘    └─────────────────┘    └─────┘                             │
 *  │                                                                         │
 *  │  OUTPUT: [2, 4, 6]                                                     │
 *  │                                                                         │
 *  │  ═══════════════════════════════════════════════════════════════════   │
 *  │  CALLBACK SIGNATURE:                                                   │
 *  │  callback(element, index, array) → transformedValue                    │
 *  │           ↑         ↑       ↑                                          │
 *  │           |         |       └─ The original array                      │
 *  │           |         └─ Position (0, 1, 2, ...)                         │
 *  │           └─ Current element being processed                           │
 *  │  ═══════════════════════════════════════════════════════════════════   │
 *  │                                                                         │
 *  └─────────────────────────────────────────────────────────────────────────┘
 * 
*/

/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║           🎯 MASTERING: Nested map() for 2D Array (Matrix) Transformation                        ║
 * ║                        (Common Interview Pattern!)                                                ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎭 ANALOGY: Think of a 2D Array like an APARTMENT BUILDING
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *   🏢 APARTMENT BUILDING (2D Array / Matrix):
 *   ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 *   │                                                                                             │
 *   │   FLOOR 0 (Row 0):  [ Room 1, Room 2 ]    →   [[1, 2],                                     │
 *   │   FLOOR 1 (Row 1):  [ Room 3, Room 4 ]    →    [3, 4]]                                     │
 *   │                                                                                             │
 *   │   matrix[0] = [1, 2]  ← This is the FIRST FLOOR (an array itself!)                         │
 *   │   matrix[1] = [3, 4]  ← This is the SECOND FLOOR (also an array!)                          │
 *   │   matrix[0][0] = 1   ← Room 1 on Floor 0                                                   │
 *   │   matrix[1][1] = 4   ← Room 4 on Floor 1                                                   │
 *   │                                                                                             │
 *   └─────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 *   To visit EVERY ROOM in the building:
 *   • OUTER LOOP: Visit each FLOOR (each row)
 *   • INNER LOOP: Visit each ROOM on that floor (each element in that row)
 * 
 *   This is exactly what NESTED map() does!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📦 BREAKING DOWN: val.map((i) => (i.map((j) => j*j)))
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * YOUR CODE:
 * ```javascript
 * val.map((i) => (i.map((j) => j*j)))
 *     ↑      ↑        ↑      ↑    ↑
 *     |      |        |      |    └─ TRANSFORMATION: Square each number
 *     |      |        |      └─ j = Each NUMBER in the current row
 *     |      |        └─ INNER map(): Iterate over numbers IN each row
 *     |      └─ i = Each ROW (which is an array like [1, 2])
 *     └─ OUTER map(): Iterate over ROWS
 * ```
 * 
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  OUTER map(): val.map((i) => ...)                                                             │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   PURPOSE: Iterate over each ROW of the matrix                                                │
 * │                                                                                               │
 * │   WHAT IS 'i'?                                                                                │
 * │   • 'i' represents ONE ROW at a time                                                          │
 * │   • 'i' is NOT a number - it's an ARRAY (a row!)                                              │
 * │                                                                                               │
 * │   FOR matrix = [[1, 2], [3, 4]]:                                                              │
 * │   • First iteration:  i = [1, 2]  ← The first row                                            │
 * │   • Second iteration: i = [3, 4]  ← The second row                                           │
 * │                                                                                               │
 * │   🎭 ANALOGY: The OUTER map is like the ELEVATOR stopping at each FLOOR                      │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  INNER map(): i.map((j) => j*j)                                                               │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   PURPOSE: Iterate over each ELEMENT within the current row                                   │
 * │                                                                                               │
 * │   WHAT IS 'j'?                                                                                │
 * │   • 'j' represents ONE NUMBER at a time (from the current row)                               │
 * │   • 'j' is the actual number we want to transform                                            │
 * │                                                                                               │
 * │   FOR row i = [1, 2]:                                                                        │
 * │   • First iteration:  j = 1  →  1 * 1 = 1                                                    │
 * │   • Second iteration: j = 2  →  2 * 2 = 4                                                    │
 * │   • Result: [1, 4]                                                                           │
 * │                                                                                               │
 * │   🎭 ANALOGY: The INNER map is like WALKING through each ROOM on that floor                  │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🔍 STEP-BY-STEP EXECUTION TRACE
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * INPUT: matrix = [[1, 2], [3, 4]]
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * OUTER ITERATION 1: i = [1, 2]  (First row)
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   
 *   Now we call i.map((j) => j*j) on [1, 2]:
 *   
 *   INNER ITERATION 1.1: j = 1
 *     j * j = 1 * 1 = 1
 *     
 *   INNER ITERATION 1.2: j = 2
 *     j * j = 2 * 2 = 4
 *     
 *   INNER map() returns: [1, 4]
 *   
 *   So OUTER map() collects: [[1, 4], ...]
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * OUTER ITERATION 2: i = [3, 4]  (Second row)
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   
 *   Now we call i.map((j) => j*j) on [3, 4]:
 *   
 *   INNER ITERATION 2.1: j = 3
 *     j * j = 3 * 3 = 9
 *     
 *   INNER ITERATION 2.2: j = 4
 *     j * j = 4 * 4 = 16
 *     
 *   INNER map() returns: [9, 16]
 *   
 *   So OUTER map() collects: [[1, 4], [9, 16]]
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * FINAL RESULT: [[1, 4], [9, 16]] ✅
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎭 VISUAL ANALOGY: The Photo Booth Machine
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *   Imagine a PHOTO STRIP with multiple rows of photos:
 *   
 *   ORIGINAL STRIP:              AFTER TRANSFORMATION:
 *   ┌─────┬─────┐                ┌─────┬─────┐
 *   │  1  │  2  │     j*j →      │  1  │  4  │
 *   ├─────┼─────┤                ├─────┼─────┤
 *   │  3  │  4  │     j*j →      │  9  │ 16  │
 *   └─────┴─────┘                └─────┴─────┘
 *   
 *   • OUTER map = Process each ROW of photos
 *   • INNER map = Process each PHOTO in that row
 *   • j*j = Apply the "square filter" to each photo
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🔑 KEY INTERVIEW INSIGHT: Why Nested map()?
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *   QUESTION: "Why can't we use just ONE map()?"
 *   
 *   ANSWER: Because a 2D array has TWO levels of nesting!
 *   
 *   ❌ WRONG: matrix.map(j => j*j)
 *      → This would try to multiply [1, 2] * [1, 2] = NaN!
 *      → 'j' here would be an ARRAY, not a number!
 *   
 *   ✅ CORRECT: matrix.map(row => row.map(num => num*num))
 *      → OUTER map: row = [1, 2] (an array)
 *      → INNER map: num = 1, then num = 2 (actual numbers)
 *   
 *   RULE OF THUMB:
 *   • 1D array → 1 map()
 *   • 2D array → 2 nested map() (or forEach + map, etc.)
 *   • 3D array → 3 nested map() ... and so on!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📝 INTERVIEW TIP: How to Explain This
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *   "To transform a 2D array, I need NESTED map() calls:
 *   
 *    1. The OUTER map() iterates over each ROW (which is itself an array)
 *    2. The INNER map() iterates over each ELEMENT within that row
 *    3. The callback in the inner map() applies the actual transformation
 *    4. Both maps return NEW arrays, preserving immutability
 *   
 *    Think of it like visiting an apartment building:
 *    - Outer loop = visiting each floor
 *    - Inner loop = visiting each room on that floor"
 * 
 */


/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║  ⚠️ CRITICAL BUG: "Cannot read properties of undefined (reading 'Electronics')"                 ║
 * ║                    THE #1 REDUCE() MISTAKE THAT TRIPS UP DEVELOPERS!                             ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🐛 THE BUG: What Went Wrong?
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * BUGGY CODE:
 * ```javascript
 * function groupByCategory(products) {
 *     let arr = products.reduce((group, element) => {
 *         (group[element.category] = group[element.category] || []).push(element)
 *         console.log(arr)
 *     }, {})   // ❌ MISSING: return group!
 *     return arr
 * }
 * ```
 * 
 * ERROR MESSAGE:
 * ❌ "TypeError: Cannot read properties of undefined (reading 'Electronics')"
 * 
 * WHAT THIS ERROR MEANS:
 * • JavaScript is trying to access undefined['Electronics']
 * • You can't access ANY property on undefined
 * • Something that should have been an object is actually undefined
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎭 ANALOGY: The Relay Race with a Dropped Baton 🏃‍♂️🏃‍♀️🏃
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * Think of reduce() like a RELAY RACE:
 * 
 *   ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 *   │                                                                                             │
 *   │   🏃‍♂️ RUNNER 1          🏃‍♀️ RUNNER 2          🏃 RUNNER 3           🏁 FINISH             │
 *   │   (iteration 1)       (iteration 2)        (iteration 3)                                  │
 *   │                                                                                             │
 *   │   Receives: {} ─────► Receives: ??? ─────► Receives: ??? ─────► Final result              │
 *   │   (initial value)                                                                          │
 *   │                                                                                             │
 *   │   ✅ CORRECT: Each runner PASSES THE BATON to the next runner                              │
 *   │   ❌ BUG: Runner 1 DROPS THE BATON! Runner 2 has NOTHING to grab!                          │
 *   │                                                                                             │
 *   └─────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 *   THE BATON = The ACCUMULATOR (the 'group' variable)
 *   
 *   PASSING THE BATON = Returning the accumulator with `return group`
 *   
 *   If you DON'T return the accumulator:
 *   • Runner 2 receives UNDEFINED instead of the baton
 *   • Runner 2 tries to do work with undefined → 💥 CRASH!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🔍 STEP-BY-STEP: Why Does This Bug Happen?
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * Let's trace through the BUGGY code with this input:
 * ```javascript
 * groupByCategory([
 *   {name: 'iPhone', category: 'Electronics', price: 999},
 *   {name: 'MacBook', category: 'Electronics', price: 1999},
 *   {name: 'Shirt', category: 'Clothing', price: 50}
 * ])
 * ```
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * ITERATION 1: Processing iPhone
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   
 *   group = {}  (the initial value we passed)
 *   element = {name: 'iPhone', category: 'Electronics', price: 999}
 *   
 *   EXECUTING: (group[element.category] = group[element.category] || []).push(element)
 *   
 *   STEP-BY-STEP:
 *   1. element.category = 'Electronics'
 *   2. group['Electronics'] = undefined (doesn't exist yet)
 *   3. undefined || [] = []  (empty array because of fallback)
 *   4. group['Electronics'] = []  (assign the empty array)
 *   5. [].push(element) → group['Electronics'] = [{name: 'iPhone', ...}]
 *   
 *   AFTER: group = { Electronics: [{name: 'iPhone', ...}] }  ✅ Looking good!
 *   
 *   ⚠️ BUT THEN: No `return group` statement!
 *   → The function returns UNDEFINED by default
 *   → This undefined becomes the 'group' for the NEXT iteration! 💀
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * ITERATION 2: Processing MacBook — 💥 CRASH!
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   
 *   group = undefined  ← 💀 THIS IS THE PROBLEM! Should be { Electronics: [...] }
 *   element = {name: 'MacBook', category: 'Electronics', price: 1999}
 *   
 *   EXECUTING: (group[element.category] = group[element.category] || []).push(element)
 *   
 *   STEP-BY-STEP:
 *   1. element.category = 'Electronics'
 *   2. group['Electronics'] = undefined['Electronics']
 *      💥 CRASH! You can't access a property on undefined!
 *   
 *   ERROR: "Cannot read properties of undefined (reading 'Electronics')"
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * ✅ THE FIX: Always Return the Accumulator!
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * FIXED CODE:
 * ```javascript
 * function groupByCategory(products) {
 *     let arr = products.reduce((group, element) => {
 *         (group[element.category] = group[element.category] || []).push(element)
 *         return group  // ✅ PASS THE BATON!
 *     }, {})
 *     return arr
 * }
 * ```
 * 
 * Now let's trace the FIXED code:
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * ITERATION 1: Processing iPhone
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   group = {}
 *   → After: group = { Electronics: [{name: 'iPhone', ...}] }
 *   → return group  ✅
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * ITERATION 2: Processing MacBook
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   group = { Electronics: [{name: 'iPhone', ...}] }  ← Received from previous iteration! ✅
 *   → After: group = { Electronics: [{name: 'iPhone', ...}, {name: 'MacBook', ...}] }
 *   → return group  ✅
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * ITERATION 3: Processing Shirt
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   group = { Electronics: [...] }  ← Received from previous iteration! ✅
 *   → After: group = { Electronics: [...], Clothing: [{name: 'Shirt', ...}] }
 *   → return group  ✅
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * FINAL RESULT:
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   {
 *     Electronics: [{name: 'iPhone', ...}, {name: 'MacBook', ...}],
 *     Clothing: [{name: 'Shirt', ...}]
 *   }
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🧠 UNDERSTANDING reduce() ANATOMY
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *   array.reduce((accumulator, currentElement, index, array) => {
 *       ↑            ↑                ↑           ↑     ↑
 *       |            |                |           |     └─ The original array (rarely used)
 *       |            |                |           └─ Current index (optional)
 *       |            |                └─ The current element being processed
 *       |            └─ THE ACCUMULATOR: This is the "running total" / "baton"
 *       |               - Starts as the initial value
 *       |               - Gets passed from iteration to iteration
 *       |               - MUST be returned to pass to next iteration!
 *       └─ reduce() is called on this array
 *   
 *       // ... your logic here ...
 *       
 *       return accumulator  // ⚠️ CRITICAL: Always return the accumulator!
 *       
 *   }, initialValue)  ← The starting value of the accumulator (first iteration)
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎯 THE GOLDEN RULE OF reduce()
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *   ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 *   │                                                                                             │
 *   │   ⭐ ALWAYS RETURN THE ACCUMULATOR FROM YOUR REDUCE CALLBACK! ⭐                            │
 *   │                                                                                             │
 *   │   If you don't return it, the next iteration receives UNDEFINED instead!                   │
 *   │                                                                                             │
 *   │   Think of it like passing a baton in a relay race:                                        │
 *   │   • If you don't pass it → The next runner has nothing → Race fails!                       │
 *   │   • If you DO pass it → Race continues smoothly → Everyone wins!                           │
 *   │                                                                                             │
 *   └─────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📝 INTERVIEW PATTERN: The (group[key] = group[key] || []).push() Idiom
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * This pattern is a VERY common interview question for grouping objects by a key!
 * 
 * BREAKING IT DOWN:
 * ```javascript
 * (group[element.category] = group[element.category] || []).push(element)
 *  ↑                         ↑                         ↑     ↑
 *  │                         │                         │     └─ 4. Push element to that array
 *  │                         │                         └─ 3. Fallback: if undefined, use []
 *  │                         └─ 2. Get current array (might be undefined)
 *  └─ 1. The key we're grouping by
 * ```
 * 
 * EQUIVALENT VERBOSE CODE:
 * ```javascript
 * if (!group[element.category]) {       // If this category doesn't exist yet
 *     group[element.category] = []      // Create an empty array for it
 * }
 * group[element.category].push(element) // Add the element to that category's array
 * ```
 * 
 * The one-liner uses:
 * • Assignment expression (a = b returns b)
 * • Logical OR || for fallback (undefined || [] = [])
 * • Chaining .push() on the result
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎤 INTERVIEW TIP: How to Explain This Bug
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * If asked about this error in an interview, say:
 * 
 * "The error 'Cannot read properties of undefined' in a reduce() callback usually means
 * one thing: I forgot to RETURN THE ACCUMULATOR.
 * 
 * In reduce(), the callback function gets called for each element. The return value
 * of each call becomes the accumulator for the NEXT iteration. If I don't return
 * anything, JavaScript returns undefined by default, and that undefined becomes
 * the accumulator for the next iteration.
 * 
 * When the next iteration tries to access a property on undefined (like
 * undefined['Electronics']), it crashes with this error.
 * 
 * The fix is simple: add `return accumulator` at the end of the reduce callback.
 * 
 * I think of it like a relay race - you MUST pass the baton (return the accumulator)
 * to the next runner (next iteration), or the race fails!"
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🧪 PRACTICE: Fix These Buggy reduce() Examples
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * BUG 1: Sum of numbers
 * ```javascript
 * [1, 2, 3].reduce((sum, num) => {
 *     sum + num   // ❌ BUG: Not returning!
 * }, 0)
 * // Result: undefined
 * 
 * // FIX:
 * [1, 2, 3].reduce((sum, num) => {
 *     return sum + num  // ✅ Or: (sum, num) => sum + num (implicit return)
 * }, 0)
 * // Result: 6
 * ```
 * 
 * BUG 2: Object building
 * ```javascript
 * ['a', 'b', 'c'].reduce((obj, char, i) => {
 *     obj[char] = i
 *     // ❌ BUG: Not returning obj!
 * }, {})
 * // Crashes on second iteration
 * 
 * // FIX:
 * ['a', 'b', 'c'].reduce((obj, char, i) => {
 *     obj[char] = i
 *     return obj  // ✅ Pass the baton!
 * }, {})
 * // Result: { a: 0, b: 1, c: 2 }
 * ```
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📝 VISUAL SUMMARY: reduce() Flow
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *   ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 *   │                        HOW reduce() FLOWS DATA                                              │
 *   ├─────────────────────────────────────────────────────────────────────────────────────────────┤
 *   │                                                                                             │
 *   │   INITIAL VALUE: {}                                                                        │
 *   │         ↓                                                                                  │
 *   │   ┌─────────────────┐                                                                      │
 *   │   │  ITERATION 1    │  accumulator = {}, element = iPhone                                 │
 *   │   │  + iPhone       │  → { Electronics: [iPhone] }                                        │
 *   │   │  return acc!    │────────────────────────────────────────────────────────┐            │
 *   │   └─────────────────┘                                                        ↓            │
 *   │                                                                   ┌─────────────────┐     │
 *   │   WITHOUT return:   acc becomes UNDEFINED ──► 💥 CRASH!           │  ITERATION 2    │     │
 *   │                                                                   │  + MacBook      │     │
 *   │                                                                   │  return acc!    │──┐  │
 *   │                                                                   └─────────────────┘  │  │
 *   │                                                                                        ↓  │
 *   │                                                                      ┌─────────────────┐  │
 *   │                                                                      │  ITERATION 3    │  │
 *   │                                                                      │  + Shirt        │  │
 *   │                                                                      │  return acc!    │  │
 *   │                                                                      └────────┬────────┘  │
 *   │                                                                               ↓           │
 *   │   FINAL RESULT: { Electronics: [iPhone, MacBook], Clothing: [Shirt] }                    │
 *   │                                                                                             │
 *   └─────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 */


/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║           🎯 MASTERING: flatMap() - Flattening Nested Data Structures                            ║
 * ║                        (A Powerful Interview-Level Technique!)                                    ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🧠 WHY THIS IS ASKED IN INTERVIEWS
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * Real-world data is often NESTED - orders contain items, users have posts, posts have comments, etc.
 * Interviewers love these questions because they test:
 * 
 * 1. Understanding of NESTED DATA STRUCTURES
 * 2. Ability to TRANSFORM + FLATTEN in one pass
 * 3. Knowledge of flatMap() vs map() + flat()
 * 4. Adding PARENT data to CHILD records (denormalization)
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎭 ANALOGY: The Gift Box Unpacking Factory 🎁📦
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * Imagine you work at a GIFT DISTRIBUTION CENTER:
 * 
 *   ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 *   │                                                                                             │
 *   │   📦 INCOMING BOXES (Orders):                                                               │
 *   │   ┌────────────────────────────┐    ┌────────────────────────────┐                         │
 *   │   │  📦 Box #1 (Order 1)       │    │  📦 Box #2 (Order 2)       │                         │
 *   │   │  ├── 🍎 Apple (qty: 2)    │    │  ├── 🍊 Orange (qty: 1)    │                         │
 *   │   │  └── 🍌 Banana (qty: 3)   │    │  └── (that's all!)         │                         │
 *   │   └────────────────────────────┘    └────────────────────────────┘                         │
 *   │                                                                                             │
 *   │   YOUR JOB: Unpack ALL items and label each one with its BOX NUMBER!                       │
 *   │                                                                                             │
 *   │   📋 OUTPUT (Flat List with Labels):                                                        │
 *   │   ┌─────────────────────────────────────────────────────────────────────────────┐          │
 *   │   │  🍎 Apple (qty: 2)   - FROM BOX #1                                          │          │
 *   │   │  🍌 Banana (qty: 3)  - FROM BOX #1                                          │          │
 *   │   │  🍊 Orange (qty: 1)  - FROM BOX #2                                          │          │
 *   │   └─────────────────────────────────────────────────────────────────────────────┘          │
 *   │                                                                                             │
 *   └─────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 *   This is EXACTLY what flatMap() does:
 *   • OPEN each box (iterate over orders)
 *   • LABEL each item inside with the box number (add orderId to each item)
 *   • PUT everything on ONE flat conveyor belt (flatten into single array)
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📦 UNDERSTANDING THE DATA STRUCTURE
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * INPUT: Array of ORDERS, each order has an 'items' array inside
 * ```javascript
 * [
 *   { orderId: 1, items: [{name: 'Apple', qty: 2}, {name: 'Banana', qty: 3}] },
 *   { orderId: 2, items: [{name: 'Orange', qty: 1}] }
 * ]
 * ```
 * 
 * VISUALIZATION:
 *   orders[0] = { orderId: 1, items: [Apple, Banana] }
 *                            ↑
 *                      This is NESTED data!
 * 
 *   orders[0].items = [{name: 'Apple', qty: 2}, {name: 'Banana', qty: 3}]
 *   orders[0].items[0] = {name: 'Apple', qty: 2}  ← An individual item
 * 
 * 
 * GOAL: Create a FLAT array where each item includes its orderId!
 * ```javascript
 * [
 *   { orderId: 1, name: 'Apple', qty: 2 },    // From order 1
 *   { orderId: 1, name: 'Banana', qty: 3 },   // From order 1
 *   { orderId: 2, name: 'Orange', qty: 1 }    // From order 2
 * ]
 * ```
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * ✅ SOLUTION 1: Using flatMap() (THE CLEANEST WAY!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * ```javascript
 * function flattenOrderItems(orders) {
 *     return orders.flatMap(order => 
 *         order.items.map(item => ({
 *             orderId: order.orderId,
 *             ...item
 *         }))
 *     )
 * }
 * ```
 * 
 * BREAKING IT DOWN:
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  OUTER: orders.flatMap(order => ...)                                                          │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   flatMap does TWO things:                                                                   │
 * │   1. MAP: Apply a function to each element                                                   │
 * │   2. FLATTEN: Flatten the result by ONE level                                                │
 * │                                                                                               │
 * │   'order' is each order object:                                                               │
 * │   • First iteration: order = { orderId: 1, items: [Apple, Banana] }                          │
 * │   • Second iteration: order = { orderId: 2, items: [Orange] }                                │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  INNER: order.items.map(item => ({ orderId: order.orderId, ...item }))                        │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   For EACH order, we map over its items and TRANSFORM each item:                             │
 * │                                                                                               │
 * │   ORIGINAL ITEM:        { name: 'Apple', qty: 2 }                                            │
 * │                                 ↓                                                            │
 * │   TRANSFORMED ITEM:     { orderId: 1, name: 'Apple', qty: 2 }                                │
 * │                           ↑                                                                  │
 * │                    We ADD the orderId from the parent order!                                 │
 * │                                                                                               │
 * │   HOW? Using the SPREAD operator:                                                            │
 * │   { orderId: order.orderId, ...item }                                                        │
 * │     ↑                        ↑                                                               │
 * │     |                        └─ Spread all properties FROM item (name, qty)                  │
 * │     └─ Add orderId as a NEW property                                                         │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🔍 STEP-BY-STEP EXECUTION TRACE
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * INPUT:
 * ```javascript
 * [
 *   { orderId: 1, items: [{name: 'Apple', qty: 2}, {name: 'Banana', qty: 3}] },
 *   { orderId: 2, items: [{name: 'Orange', qty: 1}] }
 * ]
 * ```
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * ITERATION 1: order = { orderId: 1, items: [Apple, Banana] }
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   
 *   INNER MAP over order.items:
 *   
 *   • item = {name: 'Apple', qty: 2}
 *     → { orderId: 1, name: 'Apple', qty: 2 }
 *     
 *   • item = {name: 'Banana', qty: 3}
 *     → { orderId: 1, name: 'Banana', qty: 3 }
 *   
 *   RESULT of this iteration (BEFORE flattening):
 *   [ {orderId: 1, name: 'Apple', qty: 2}, {orderId: 1, name: 'Banana', qty: 3} ]
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * ITERATION 2: order = { orderId: 2, items: [Orange] }
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   
 *   INNER MAP over order.items:
 *   
 *   • item = {name: 'Orange', qty: 1}
 *     → { orderId: 2, name: 'Orange', qty: 1 }
 *   
 *   RESULT of this iteration (BEFORE flattening):
 *   [ {orderId: 2, name: 'Orange', qty: 1} ]
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * AFTER map() (BEFORE flat):
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   [
 *     [ {orderId: 1, name: 'Apple', qty: 2}, {orderId: 1, name: 'Banana', qty: 3} ],  // From order 1
 *     [ {orderId: 2, name: 'Orange', qty: 1} ]                                        // From order 2
 *   ]
 *   
 *   ⚠️ PROBLEM: This is still NESTED! We have an array OF arrays!
 * 
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 * AFTER flat() (THE MAGIC OF flatMap!):
 * ─────────────────────────────────────────────────────────────────────────────────────────────────
 *   [
 *     {orderId: 1, name: 'Apple', qty: 2},
 *     {orderId: 1, name: 'Banana', qty: 3},
 *     {orderId: 2, name: 'Orange', qty: 1}
 *   ]
 *   
 *   ✅ PERFECT! One flat array with all items labeled with their orderId!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🔄 ALTERNATIVE SOLUTION: map() + flat() (Same Result!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * ```javascript
 * function flattenOrderItems(orders) {
 *     return orders
 *         .map(order => 
 *             order.items.map(item => ({
 *                 orderId: order.orderId,
 *                 ...item
 *             }))
 *         )
 *         .flat()  // Flatten by 1 level
 * }
 * ```
 * 
 * WHY flatMap() IS BETTER:
 * • One method instead of two
 * • More readable: "flat" + "map" = one operation conceptually
 * • Slightly more efficient (single pass)
 * 
 * EQUIVALENT:
 *   array.flatMap(fn)  ===  array.map(fn).flat(1)
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎭 VISUAL ANALOGY: flatMap = Unwrap & Label
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *   BEFORE flatMap():                              AFTER flatMap():
 *   
 *   📦 Order 1                                     📋 Flat List:
 *   ├── 🍎 Apple                                   ├── 🍎 Apple (Order #1)
 *   └── 🍌 Banana                                  ├── 🍌 Banana (Order #1)
 *                              ──────────►         ├── 🍊 Orange (Order #2)
 *   📦 Order 2                                     └── (All items on same level!)
 *   └── 🍊 Orange
 *   
 *   NESTED (2 levels)                              FLAT (1 level)
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🧠 KEY CONCEPT: The Spread Operator {...item}
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * ```javascript
 * { orderId: order.orderId, ...item }
 * ```
 * 
 * This creates a NEW object by:
 * 1. Starting with { orderId: 1 }
 * 2. Spreading all properties from 'item': name, qty
 * 3. Final result: { orderId: 1, name: 'Apple', qty: 2 }
 * 
 * STEP-BY-STEP:
 * ```javascript
 * item = { name: 'Apple', qty: 2 }
 * order.orderId = 1
 * 
 * { orderId: order.orderId, ...item }
 * = { orderId: 1, ...{name: 'Apple', qty: 2} }
 * = { orderId: 1, name: 'Apple', qty: 2 }
 * ```
 * 
 * ALTERNATIVE (without spread, more verbose):
 * ```javascript
 * {
 *     orderId: order.orderId,
 *     name: item.name,
 *     qty: item.qty
 * }
 * ```
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * ⚠️ COMMON MISTAKE: Using Only map() (No Flattening!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * WRONG:
 * ```javascript
 * orders.map(order => 
 *     order.items.map(item => ({ orderId: order.orderId, ...item }))
 * )
 * ```
 * 
 * RESULT:
 * ```javascript
 * [
 *   [ {orderId: 1, name: 'Apple', qty: 2}, {orderId: 1, name: 'Banana', qty: 3} ],  // ← Array!
 *   [ {orderId: 2, name: 'Orange', qty: 1} ]                                        // ← Array!
 * ]
 * ```
 * 
 * ❌ This gives you an ARRAY OF ARRAYS, not a flat array!
 * 
 * FIX: Use flatMap() or .map(...).flat()
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📝 flatMap() vs map() vs flat() - CHEAT SHEET
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *   ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 *   │  METHOD      │  WHAT IT DOES                                                               │
 *   ├─────────────────────────────────────────────────────────────────────────────────────────────┤
 *   │  map()       │  Transforms each element → Returns array of SAME length                    │
 *   │              │  [1, 2, 3].map(x => x * 2) → [2, 4, 6]                                     │
 *   ├─────────────────────────────────────────────────────────────────────────────────────────────┤
 *   │  flat()      │  Flattens nested arrays by N levels (default 1)                            │
 *   │              │  [[1, 2], [3, 4]].flat() → [1, 2, 3, 4]                                    │
 *   ├─────────────────────────────────────────────────────────────────────────────────────────────┤
 *   │  flatMap()   │  map() + flat(1) in ONE step                                               │
 *   │              │  [1, 2].flatMap(x => [x, x*2]) → [1, 2, 2, 4]                              │
 *   │              │  (Each element returns an array, and all are flattened)                    │
 *   └─────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎤 INTERVIEW TIP: How to Explain flatMap()
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * If asked about flatMap() in an interview, say:
 * 
 * "flatMap() is a combination of map() and flat(). It's useful when:
 * 
 *  1. You have NESTED data (arrays within arrays, or arrays inside objects)
 *  2. You need to TRANSFORM each element AND flatten the result
 *  
 *  For example, if I have orders with items inside, and I want a flat list
 *  of all items with their orderId attached:
 *  
 *  • OUTER flatMap: Iterate over each order
 *  • INNER map: For each order, transform its items to include orderId
 *  • flatMap automatically flattens the result
 *  
 *  It's equivalent to .map(...).flat(1), but more concise and efficient.
 *  
 *  Think of it like opening gift boxes and laying all the items on one table,
 *  while labeling each item with which box it came from."
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🧪 PRACTICE EXAMPLES
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * EXAMPLE 1: Duplicate each element
 * ```javascript
 * [1, 2, 3].flatMap(x => [x, x])
 * // → [1, 1, 2, 2, 3, 3]
 * 
 * // Without flatMap:
 * [1, 2, 3].map(x => [x, x])      // [[1, 1], [2, 2], [3, 3]] ← Nested!
 * [1, 2, 3].map(x => [x, x]).flat() // [1, 1, 2, 2, 3, 3] ← Flat!
 * ```
 * 
 * EXAMPLE 2: Split words into characters
 * ```javascript
 * ['hello', 'world'].flatMap(word => word.split(''))
 * // → ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
 * ```
 * 
 * EXAMPLE 3: Filter AND transform (flatMap as filter!)
 * ```javascript
 * [1, 2, 3, 4, 5].flatMap(x => x % 2 === 0 ? [x * 2] : [])
 * // → [4, 8]  (Only even numbers, doubled)
 * 
 * // How it works:
 * // 1 → [] (odd, return empty)
 * // 2 → [4] (even, return [doubled])
 * // 3 → [] (odd, return empty)
 * // 4 → [8] (even, return [doubled])
 * // 5 → [] (odd, return empty)
 * // flatMap flattens: [] + [4] + [] + [8] + [] = [4, 8]
 * ```
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📝 VISUAL SUMMARY
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *   ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
 *   │                         HOW flatMap() WORKS                                                │
 *   ├─────────────────────────────────────────────────────────────────────────────────────────────┤
 *   │                                                                                             │
 *   │   INPUT: [Order1, Order2]  where each order has an 'items' array                           │
 *   │                                                                                             │
 *   │   ┌─────────────────┐      ┌─────────────────┐                                             │
 *   │   │    ORDER 1      │      │    ORDER 2      │                                             │
 *   │   │ orderId: 1      │      │ orderId: 2      │                                             │
 *   │   │ items: [🍎, 🍌]  │      │ items: [🍊]     │                                             │
 *   │   └─────────────────┘      └─────────────────┘                                             │
 *   │           │                        │                                                       │
 *   │           ↓ flatMap                ↓ flatMap                                               │
 *   │           │                        │                                                       │
 *   │   ┌───────────────────────────────────────────────────────────────────┐                    │
 *   │   │  [{id:1,🍎}, {id:1,🍌}]  +  [{id:2,🍊}]  →  FLATTEN!             │                    │
 *   │   └───────────────────────────────────────────────────────────────────┘                    │
 *   │                               │                                                            │
 *   │                               ↓                                                            │
 *   │   ┌───────────────────────────────────────────────────────────────────┐                    │
 *   │   │  OUTPUT: [{id:1,🍎}, {id:1,🍌}, {id:2,🍊}]  ← FLAT ARRAY!        │                    │
 *   │   └───────────────────────────────────────────────────────────────────┘                    │
 *   │                                                                                             │
 *   │   ═══════════════════════════════════════════════════════════════════                      │
 *   │   KEY FORMULA:  array.flatMap(fn)  =  array.map(fn).flat(1)                                │
 *   │   ═══════════════════════════════════════════════════════════════════                      │
 *   │                                                                                             │
 *   └─────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 */