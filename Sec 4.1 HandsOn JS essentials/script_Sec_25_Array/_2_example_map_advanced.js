/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🗺️ CHALLENGE 2: Array.map() - Advanced Transformation                        ║
 * ║                              Difficulty: ⭐⭐ (Intermediate)                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Using index parameter and handling nested data with map()
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - Index is crucial for React keys and numbering
 *    - Nested data transformation is common in real APIs
 */

// =============================================================================
// CHALLENGE: Add Index to Elements
// =============================================================================
/**
 * Create a function `addRanking` that:
 * - Takes an array of player names
 * - Returns array of objects with 'rank' (1-based) and 'name'
 * 
 * @param {string[]} players - Array of player names
 * @returns {Array<{rank: number, name: string}>} - Array with ranking info
 * 
 * Examples:
 *   addRanking(['Alice', 'Bob', 'Charlie']) → 
 *     [{rank: 1, name: 'Alice'}, {rank: 2, name: 'Bob'}, {rank: 3, name: 'Charlie'}]
 *   addRanking([]) → []
 * 
 * 💡 HINTS:
 *   - map() callback receives (element, index, array)
 *   - index is 0-based, rank should be 1-based (index + 1)
 */

function addRanking(players) {
    // ==================== YOUR CODE HERE ====================
    let val = [...players]
let arr1 = val.map((m)=> m)
console.log(arr1)
let arr = []
for(let i =0; i< arr1.length; i++){
    arr.push( {rank:i+1,name:arr1[i]})


}
   return arr 
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Calculate Derived Values
// =============================================================================
/**
 * Create a function `calculateTotalPrice` that:
 * - Takes an array of cart items with 'name', 'price', and 'quantity'
 * - Returns array with added 'total' property (price × quantity)
 * 
 * @param {Array<{name: string, price: number, quantity: number}>} items
 * @returns {Array<{name: string, price: number, quantity: number, total: number}>}
 * 
 * Examples:
 *   calculateTotalPrice([
 *     {name: 'Apple', price: 1.5, quantity: 3},
 *     {name: 'Banana', price: 0.5, quantity: 6}
 *   ]) → [
 *     {name: 'Apple', price: 1.5, quantity: 3, total: 4.5},
 *     {name: 'Banana', price: 0.5, quantity: 6, total: 3}
 *   ]
 * 
 * 💡 HINTS:
 *   - Use spread operator: {...item, total: calculation}
 *   - This pattern is VERY common in React for adding derived state
 */

function calculateTotalPrice(items) {
    // ==================== YOUR CODE HERE ====================
        let val = [...items]
    let arr1 = val.map((i)=> i.price* i.quantity)
    console.log(val)
    let arr = []
    for(let i =0; i<val.length;i++){
        arr.push({...val[i],total:arr1[i]})
        console.log(arr[i])
 
    }
    return arr
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Transform Nested Data
// =============================================================================
/**
 * Create a function `extractBookInfo` that:
 * - Takes an array of book objects with nested 'reviews' object
 * - Returns array with 'title', 'author', and 'avgRating' (average of reviews)
 * 
 * Book structure:
 * {
 *   title: string,
 *   author: string,
 *   reviews: {
 *     goodreads: { rating: number },
 *     amazon: { rating: number }
 *   }
 * }
 * 
 * @param {Array} books - Array of book objects
 * @returns {Array<{title: string, author: string, avgRating: number}>}
 * 
 * Examples:
 *   extractBookInfo([{
 *     title: 'Dune',
 *     author: 'Frank Herbert',
 *     reviews: { goodreads: { rating: 4.5 }, amazon: { rating: 4.3 } }
 *   }]) → [{title: 'Dune', author: 'Frank Herbert', avgRating: 4.4}]
 * 
 * 💡 HINTS:
 *   - Access nested properties: book.reviews.goodreads.rating
 *   - Average = (rating1 + rating2) / 2
 *   - Handle missing review platforms with optional chaining (?.) or defaults
 */

function extractBookInfo(books) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Conditional Transformation
// =============================================================================
/**
 * Create a function `applyDiscount` that:
 * - Takes an array of products with 'name', 'price', and 'onSale' boolean
 * - Returns new array where items with onSale=true have 20% discount applied
 * - Items NOT on sale keep original price
 * 
 * @param {Array<{name: string, price: number, onSale: boolean}>} products
 * @returns {Array<{name: string, price: number, onSale: boolean}>}
 * 
 * Examples:
 *   applyDiscount([
 *     {name: 'Shirt', price: 50, onSale: true},
 *     {name: 'Pants', price: 80, onSale: false}
 *   ]) → [
 *     {name: 'Shirt', price: 40, onSale: true},
 *     {name: 'Pants', price: 80, onSale: false}
 *   ]
 * 
 * 💡 HINTS:
 *   - Use ternary operator: condition ? value1 : value2
 *   - 20% discount means multiply by 0.8
 *   - Remember to spread the original object first!
 */

function applyDiscount(products) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    addRanking,
    calculateTotalPrice,
    extractBookInfo,
    applyDiscount
};


/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║              📝 LEARNING NOTES: CONCEPTS I WAS MISSING IN MY APPROACH                            ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                         🔵 CHALLENGE 1: addRanking() - MY APPROACH vs OPTIMAL
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ ❌ MY VERBOSE APPROACH:                                                                         │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 *   function addRanking(players) {
 *       let val = [...players]              // Unnecessary copy
 *       let arr1 = val.map((m) => m)         // ❌ Pointless map - just copies the array!
 *       console.log(arr1)
 *       let arr = []
 *       for(let i = 0; i < arr1.length; i++){
 *           arr.push({rank: i+1, name: arr1[i]})
 *       }
 *       return arr 
 *   }
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ ✅ OPTIMAL APPROACH:                                                                            │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 *   function addRanking(players) {
 *       return players.map((name, index) => ({ rank: index + 1, name }))
 *   }
 * 
 *   // Just ONE LINE - no loop, no extra variables!
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                     🔴 CONCEPT 1: MAP'S HIDDEN POWER - THE INDEX PARAMETER
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * 🧠 WHAT I FAILED TO REALIZE:
 *    map() gives you the INDEX for FREE! You don't need a for loop to get it!
 * 
 *    map() callback signature:
 *    ┌──────────────────────────────────────────────────────────────────────────┐
 *    │  array.map((element, index, originalArray) => { ... })                   │
 *    │              ↑        ↑      ↑                                           │
 *    │              │        │      └─ The entire original array (rarely used)  │
 *    │              │        └─ Position in array (0, 1, 2, ...)                 │
 *    │              └─ Current element being processed                          │
 *    └──────────────────────────────────────────────────────────────────────────┘
 * 
 * 📦 ANALOGY - The Queue Number Machine:
 *    ❌ MY WAY: Take everyone's name, then manually number them 1, 2, 3...
 *    ✅ OPTIMAL: The machine automatically stamps a number as each person passes
 * 
 * 🔬 UNDER THE HOOD - What I did vs What I should have done:
 * 
 *    MY APPROACH (Redundant):
 *    ┌─────────────────────────────────────────────────────────────────────────┐
 *    │ Step 1: let arr1 = val.map((m) => m)                                    │
 *    │         This is LITERALLY just copying the array! m => m returns the   │
 *    │         same value. This is identical to [...players] - POINTLESS!     │
 *    │                                                                         │
 *    │ Step 2: for loop with manual index                                      │
 *    │         The index I'm using (i) is ALREADY available in map!           │
 *    └─────────────────────────────────────────────────────────────────────────┘
 * 
 *    OPTIMAL APPROACH:
 *    ┌─────────────────────────────────────────────────────────────────────────┐
 *    │ players.map((name, index) => ({ rank: index + 1, name }))              │
 *    │              ↑      ↑                  ↑           ↑                   │
 *    │              │      │                  │           └─ ES6 shorthand    │
 *    │              │      │                  └─ index + 1 for 1-based rank   │
 *    │              │      └─ FREE index from map!                            │
 *    │              └─ Current player name                                    │
 *    └─────────────────────────────────────────────────────────────────────────┘
 * 
 * 💡 ES6 SHORTHAND I COULD HAVE USED:
 *    When the property name matches the variable name, you can use shorthand:
 *    
 *    { name: name }  →  { name }     // These are IDENTICAL!
 * 
 *    So { rank: index + 1, name: name } becomes { rank: index + 1, name }
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                         🔵 CHALLENGE 2: calculateTotalPrice() - MY APPROACH vs OPTIMAL
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ ❌ MY VERBOSE APPROACH:                                                                         │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 *   function calculateTotalPrice(items) {
 *       let val = [...items]                                  // Copy 1 (unnecessary)
 *       let arr1 = val.map((i) => i.price * i.quantity)       // Step 1: Get totals
 *       let arr = []
 *       for(let i = 0; i < val.length; i++){
 *           arr.push({...val[i], total: arr1[i]})             // Step 2: Merge with spread
 *       }
 *       return arr
 *   }
 * 
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ ✅ OPTIMAL APPROACH:                                                                            │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 *   function calculateTotalPrice(items) {
 *       return items.map(item => ({ ...item, total: item.price * item.quantity }))
 *   }
 * 
 *   // ONE LINE - spread AND calculate in the SAME map!
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                     🔴 CONCEPT 2: SPREAD + ENHANCEMENT IN A SINGLE MAP
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * 🧠 WHAT I FAILED TO REALIZE:
 *    You DON'T need to calculate values first, then merge them in a loop.
 *    Everything can happen in ONE map() call!
 * 
 *    Pattern for ADDING a property to objects:
 *    ┌──────────────────────────────────────────────────────────────────────────┐
 *    │  items.map(item => ({                                                    │
 *    │      ...item,                        // Copy ALL existing properties     │
 *    │      newProperty: calculation        // ADD the new property             │
 *    │  }))                                                                     │
 *    └──────────────────────────────────────────────────────────────────────────┘
 * 
 * 📦 ANALOGY - The Sticker Machine:
 *    ❌ MY WAY: 
 *       Step 1: Read all prices and quantities, write totals on sticky notes
 *       Step 2: Go through products again, stick the notes on them
 *    ✅ OPTIMAL:
 *       ONE PASS: Calculate as each product passes, immediately add sticker
 * 
 * 🔬 UNDER THE HOOD - The Spread + Enhance Pattern:
 * 
 *    Given: { name: 'Apple', price: 1.5, quantity: 3 }
 * 
 *    ┌─────────────────────────────────────────────────────────────────────────┐
 *    │ ({ ...item, total: item.price * item.quantity })                        │
 *    │                                                                         │
 *    │ Step 1: ...item spreads all properties:                                 │
 *    │         { name: 'Apple', price: 1.5, quantity: 3, ... }                │
 *    │                                                                         │
 *    │ Step 2: total: item.price * item.quantity adds the new property:        │
 *    │         { name: 'Apple', price: 1.5, quantity: 3, total: 4.5 }         │
 *    └─────────────────────────────────────────────────────────────────────────┘
 * 
 *    ⚠️ ORDER MATTERS! If you want to OVERRIDE a property:
 *    
 *    { price: 100, ...item }     // item.price WINS (overwrites 100)
 *    { ...item, price: 100 }     // 100 WINS (overwrites item.price)
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                     🔴 CONCEPT 3: RECOGNIZING REDUNDANT TRANSFORMATIONS
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * 🧠 RED FLAGS IN MY CODE:
 * 
 *    1️⃣ val.map((m) => m)  
 *       ❌ This returns the exact same array! m => m changes NOTHING.
 *       📖 Rule: If your map callback just returns the element unchanged, 
 *          you don't need map at all!
 * 
 *    2️⃣ let val = [...items] before map()
 *       ❌ map() already creates a new array, so pre-copying is wasteful.
 *       📖 Rule: map() is non-mutating - it never changes the original.
 * 
 *    3️⃣ Two separate passes (map for values → loop for merging)
 *       ❌ Slow: iterates through array TWICE
 *       ❌ Verbose: more code, more variables, more bugs
 *       📖 Rule: If you can do it in ONE map, do it in ONE map.
 * 
 * 📦 ANALOGY - The Assembly Line:
 *    ❌ MY WAY: Assembly line 1 adds wheels. Assembly line 2 adds paint.
 *    ✅ OPTIMAL: ONE assembly line that adds wheels AND paint to each car.
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                              📊 SIDE-BY-SIDE COMPARISON
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *    ┌────────────────────────────────────────────────────────────────────────────────────────────┐
 *    │  METRIC                    │  MY APPROACH           │  OPTIMAL APPROACH                   │
 *    ├────────────────────────────┼────────────────────────┼─────────────────────────────────────┤
 *    │  Lines of code             │  7-8 lines             │  1 line                             │
 *    ├────────────────────────────┼────────────────────────┼─────────────────────────────────────┤
 *    │  Array iterations          │  2 (map + for loop)    │  1 (single map)                     │
 *    ├────────────────────────────┼────────────────────────┼─────────────────────────────────────┤
 *    │  Extra variables           │  3-4 (val, arr1, arr)  │  0                                  │
 *    ├────────────────────────────┼────────────────────────┼─────────────────────────────────────┤
 *    │  Memory usage              │  Higher (temp arrays)  │  Lower (single transformation)     │
 *    ├────────────────────────────┼────────────────────────┼─────────────────────────────────────┤
 *    │  Readability               │  Harder to follow      │  Clear, declarative intent         │
 *    └────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                              🎯 KEY TAKEAWAYS FOR INTERVIEWS
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *    1. 📍  map() GIVES you the index for FREE - use it: map((item, index) => ...)
 *    
 *    2. 🔄  To ADD a property to objects: { ...item, newProp: value }
 *           Do this INSIDE the same map, not in a separate loop!
 *    
 *    3. ⚠️  Avoid identity maps like map(x => x) - they're pointless copies
 *    
 *    4. 🚀  One map > two loops. Always try to accomplish the transformation
 *           in a SINGLE pass through the array.
 *    
 *    5. 📝  Remember: map((item, index) => ({ ...item, rank: index + 1 }))
 *           This pattern is EVERYWHERE in React for adding derived data!
 * 
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 *                              🧪 PRACTICE: REFACTOR THESE
 * ══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *    Challenge 1: Refactor this verbose code to a single map:
 *    
 *    // Verbose (DON'T DO THIS):
 *    let categories = products.map(p => p.category)
 *    let arr = []
 *    for (let i = 0; i < products.length; i++) {
 *        arr.push({ ...products[i], categoryUpper: categories[i].toUpperCase() })
 *    }
 *    return arr
 *    
 *    // Optimal (try writing this yourself first!):
 *    // Answer: return products.map(p => ({ ...p, categoryUpper: p.category.toUpperCase() }))
 * 
 * 
 *    Challenge 2: Add line numbers to text lines:
 *    
 *    // Input: ['Hello', 'World', 'Foo']
 *    // Output: [{ lineNum: 1, text: 'Hello' }, { lineNum: 2, text: 'World' }, ...]
 *    
 *    // Answer: lines.map((text, index) => ({ lineNum: index + 1, text }))
 * 
 * 
 *    Challenge 3: Why is this code redundant?
 *    
 *    let copy = [...users]
 *    let result = copy.map(u => u.name)
 *    
 *    // Answer: The [...users] spread is unnecessary because map() already 
 *    //         creates a new array and doesn't mutate the original.
 *    // Fixed:  let result = users.map(u => u.name)
 * 
 */
