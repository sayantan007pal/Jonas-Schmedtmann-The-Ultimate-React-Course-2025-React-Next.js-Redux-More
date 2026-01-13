/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🗺️ CHALLENGE 3: Array.map() - React Patterns                                  ║
 * ║                              Difficulty: ⭐⭐ (Intermediate)                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Common map() patterns used in React development
 * 
 * 🎯 INTERVIEW IMPORTANCE: CRITICAL
 *    - These exact patterns appear in 90% of React applications
 *    - Understanding these is essential for React interviews
 */

// =============================================================================
// CHALLENGE: Prepare List Items for React Rendering
// =============================================================================
/**
 * Create a function `prepareListItems` that:
 * - Takes an array of todo objects with 'id', 'text', 'completed'
 * - Returns array ready for React with 'key', 'displayText', 'className'
 * - displayText should add ✅ prefix if completed, ⬜ if not
 * - className should be 'completed' or 'pending'
 * 
 * @param {Array<{id: number, text: string, completed: boolean}>} todos
 * @returns {Array<{key: number, displayText: string, className: string}>}
 * 
 * Examples:
 *   prepareListItems([
 *     {id: 1, text: 'Learn React', completed: true},
 *     {id: 2, text: 'Build project', completed: false}
 *   ]) → [
 *     {key: 1, displayText: '✅ Learn React', className: 'completed'},
 *     {key: 2, displayText: '⬜ Build project', className: 'pending'}
 *   ]
 * 
 * 💡 HINTS:
 *   - In React, each list item needs a unique 'key'
 *   - Use ternary for conditional logic
 */

function prepareListItems(todos) {
    // ==================== YOUR CODE HERE ====================
          let cpy = [...todos]
    let value = cpy.map((i)=> i)
    let arr = []
    for(let i = 0; i < value.length; i++){
        
        arr.push({key:value[i].id, displayText: `${value[i].completed ? '✅' : '⬜'} ${value[i].text}`, className:value[i].completed? 'completed' : 'pending' })
    }
    
    return arr  
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Transform API Response Data
// =============================================================================
/**
 * Create a function `normalizeApiResponse` that:
 * - Takes an array of user objects from an "API" with snake_case properties
 * - Returns array with camelCase properties suitable for React state
 * - Input: { user_id, first_name, last_name, email_address, is_active }
 * - Output: { userId, firstName, lastName, email, isActive }
 * 
 * @param {Array} apiUsers - Array of user objects with snake_case keys
 * @returns {Array} - Array of user objects with camelCase keys
 * 
 * Examples:
 *   normalizeApiResponse([{
 *     user_id: 1,
 *     first_name: 'John',
 *     last_name: 'Doe',
 *     email_address: 'john@test.com',
 *     is_active: true
 *   }]) → [{
 *     userId: 1,
 *     firstName: 'John',
 *     lastName: 'Doe',
 *     email: 'john@test.com',
 *     isActive: true
 *   }]
 * 
 * 💡 HINTS:
 *   - This is a common pattern when working with APIs
 *   - Simply rename the properties in the returned object
 */

function normalizeApiResponse(apiUsers) {
    // ==================== YOUR CODE HERE ====================
    let cpy = [...apiUsers]
    let value = cpy.map((i)=> i)
    let arr = []
    for(let i = 0; i< value.length; i++){
        arr.push({userId:value[i].user_id, firstName:value[i].first_name, lastName:value[i].last_name, email:value[i].email_address, isActive:value[i].is_active})
    }
    return arr    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Create Option Elements Data
// =============================================================================
/**
 * Create a function `createSelectOptions` that:
 * - Takes an array of category objects with 'id' and 'name'
 * - Returns array suitable for <select> dropdown options
 * - Each option should have 'value' (from id) and 'label' (from name)
 * - Add a "Select..." option at the beginning with value: '' and label: 'Select a category...'
 * 
 * @param {Array<{id: number, name: string}>} categories
 * @returns {Array<{value: string, label: string}>}
 * 
 * Examples:
 *   createSelectOptions([
 *     {id: 1, name: 'Electronics'},
 *     {id: 2, name: 'Books'}
 *   ]) → [
 *     {value: '', label: 'Select a category...'},
 *     {value: '1', label: 'Electronics'},
 *     {value: '2', label: 'Books'}
 *   ]
 * 
 * 💡 HINTS:
 *   - Note: value should be a STRING (common in HTML forms)
 *   - Use spread operator to add the default option: [defaultOption, ...mapped]
*/

function createSelectOptions(categories) {
    // ==================== YOUR CODE HERE ====================
    // Step 1: Create the default "placeholder" option
    const defaultOption = { value: '', label: 'Select a category...' };
    
    // Step 2: Map categories to options (converting id to STRING!)
    const mappedOptions = categories.map(cat => ({
        value: String(cat.id),  // Convert number to string for HTML forms
        label: cat.name
    }));
    
    // Step 3: Combine default + mapped using spread operator
    return [defaultOption, ...mappedOptions];
    // ========================================================
}

// function createSelectOptions(catagories){
//     let cpy = [...catagories]
//     let val = cpy.map((i)=>i)
//     let arr = []
//     for(let i = 1; i <= val.length; i++){
//          arr.push({value:i==0? val[i-1]:'',label:i==0? 'Select a category...':val[i-1].name })
//     }

//     console.log(arr)
// }

// =============================================================================
// CHALLENGE: Transform Data for Chart Library
// =============================================================================
/**
 * Create a function `prepareChartData` that:
 * - Takes an array of sales data with 'month', 'revenue', 'expenses'
 * - Returns array with 'label', 'profit' (revenue - expenses), 'color'
 * - Color should be 'green' if profit > 0, 'red' if profit < 0, 'gray' if profit = 0
 * 
 * @param {Array<{month: string, revenue: number, expenses: number}>} salesData
 * @returns {Array<{label: string, profit: number, color: string}>}
 * 
 * Examples:
 *   prepareChartData([
 *     {month: 'Jan', revenue: 5000, expenses: 3000},
 *     {month: 'Feb', revenue: 4000, expenses: 4500},
 *     {month: 'Mar', revenue: 6000, expenses: 6000}
 *   ]) → [
 *     {label: 'Jan', profit: 2000, color: 'green'},
 *     {label: 'Feb', profit: -500, color: 'red'},
 *     {label: 'Mar', profit: 0, color: 'gray'}
 *   ]
 * 
 * 💡 HINTS:
 *   - Calculate profit first, then determine color
 *   - Use nested ternary: profit > 0 ? 'green' : profit < 0 ? 'red' : 'gray'
 */

function prepareChartData(salesData) {
    // ==================== YOUR CODE HERE ====================
    let cpy = [...salesData]
    let val = cpy.map((i)=>({
        label:i.month,
        profit: (i.revenue-i.expenses),
        color: (i.revenue-i.expenses)>0? 'green' : (i.revenue-i.expenses) < 0 ? 'red': 'gray',

    }))
    return val
  
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    prepareListItems,
    normalizeApiResponse,
    createSelectOptions,
    prepareChartData
};


// =============================================================================
// 📚 INTERVIEW REVISION: Template Literals + Ternary Operators Inside Objects
// =============================================================================
/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║           🎯 MASTERING: Template Literals with Ternary Inside Object Literals                    ║
 * ║                        (The Tricky Pattern You Struggled With)                                   ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🧠 THE PROBLEM YOU FACED
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * You tried to write this (WRONG):
 * 
 *   displayText: {value[i].completed ? '✅' : '⬜'}+" "+value[i].text
 *                ↑                                ↑
 *                WRONG: {} is NOT for string interpolation here!
 * 
 * The CORRECT syntax:
 * 
 *   displayText: `${value[i].completed ? '✅' : '⬜'} ${value[i].text}`
 *                ↑  ↑                                 ↑               ↑
 *                |  |                                 |               |
 *                |  └─ ${} for interpolation          |               |
 *                └─ BACKTICK starts template literal   └─ BACKTICK ends it
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎭 ANALOGY: Think of it like a Mad Libs Game
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * Imagine you're playing Mad Libs where you have a sentence with blanks:
 * 
 *   "The _____ cat jumped over the _____ dog."
 * 
 * In JavaScript:
 *   - BACKTICKS (` `) = The Mad Libs template card
 *   - ${} = The blank spaces where you insert words
 *   - Regular text = The fixed parts that don't change
 * 
 * So:  `The ${adjective1} cat jumped over the ${adjective2} dog.`
 *       ↑                                                       ↑
 *       └──────────── BACKTICKS wrap the entire template ───────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📦 BREAKING DOWN THE COMPLEX LINE (Step-by-Step)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * The full line:
 *   arr.push({
 *     key: value[i].id,
 *     displayText: `${value[i].completed ? '✅' : '⬜'} ${value[i].text}`,
 *     className: value[i].completed ? 'completed' : 'pending'
 *   })
 * 
 * Let's break it into digestible pieces:
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ PIECE 1: key: value[i].id                                                                    │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │ • Simply assigning the 'id' property to 'key'                                                │
 * │ • Nothing fancy here                                                                         │
 * │ • Example: If value[i].id = 1, then key: 1                                                   │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ PIECE 2: displayText: `${value[i].completed ? '✅' : '⬜'} ${value[i].text}`                 │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │ This has 3 sub-parts:                                                                         │
 * │                                                                                               │
 * │ SUB-PART A: The Backticks (` `)                                                               │
 * │   → These create a "template literal" - a special string that can contain expressions         │
 * │   → Regular quotes ('') or ("") CANNOT do interpolation with ${}                             │
 * │                                                                                               │
 * │ SUB-PART B: ${value[i].completed ? '✅' : '⬜'}                                               │
 * │   → This is a TERNARY OPERATOR inside the ${}                                                │
 * │   → Reads as: "Is value[i].completed true? If yes → ✅, If no → ⬜"                          │
 * │   → Like asking: "Did you complete this task?" → "Yes! ✅" or "No ⬜"                        │
 * │                                                                                               │
 * │ SUB-PART C: ${value[i].text}                                                                 │
 * │   → Simply inserts the text property                                                         │
 * │   → Example: "Learn React"                                                                   │
 * │                                                                                               │
 * │ FINAL RESULT (examples):                                                                     │
 * │   → If completed=true, text="Learn React"  → "✅ Learn React"                               │
 * │   → If completed=false, text="Build app"   → "⬜ Build app"                                  │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ PIECE 3: className: value[i].completed ? 'completed' : 'pending'                             │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │ • This is a TERNARY OPERATOR directly (no template literal needed)                           │
 * │ • Because we're returning a SIMPLE string, not combining multiple values                     │
 * │ • Reads as: "Is it completed? If yes → 'completed', If no → 'pending'"                       │
 * │                                                                                               │
 * │ WHY NO BACKTICKS HERE?                                                                        │
 * │ → Because we're NOT combining strings, just picking ONE string                               │
 * │ → Backticks would be redundant:                                                               │
 * │     ❌ className: `${value[i].completed ? 'completed' : 'pending'}`  // Works but unnecessary│
 * │     ✅ className: value[i].completed ? 'completed' : 'pending'       // Cleaner!             │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * ⚠️ COMMON MISTAKES (And How to Avoid Them)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * ❌ MISTAKE 1: Using {} instead of ${}
 *    WRONG:  displayText: `{value[i].text}`           → Output: "{value[i].text}" (literal string!)
 *    RIGHT:  displayText: `${value[i].text}`          → Output: "Learn React"
 * 
 * ❌ MISTAKE 2: Using {} without backticks (what you did!)
 *    WRONG:  displayText: {value[i].completed ? '✅' : '⬜'} + " " + value[i].text
 *            ↑ JavaScript thinks this { } is an OBJECT, causing syntax error!
 *    RIGHT:  displayText: `${value[i].completed ? '✅' : '⬜'} ${value[i].text}`
 * 
 * ❌ MISTAKE 3: Using regular quotes with ${}
 *    WRONG:  displayText: "${value[i].text}"          → Output: "${value[i].text}" (literal!)
 *    RIGHT:  displayText: `${value[i].text}`          → Output: "Learn React"
 * 
 * ❌ MISTAKE 4: Forgetting the $ sign
 *    WRONG:  displayText: `{value[i].text}`           → Output: "{value[i].text}" (literal!)
 *    RIGHT:  displayText: `${value[i].text}`          → Output: "Learn React"
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🔑 THE GOLDEN RULES (Memorize These!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * RULE 1: BACKTICKS (` `) are REQUIRED for template literals
 *         → They're located on the same key as ~ (tilde), top-left of keyboard
 * 
 * RULE 2: ${} is the INTERPOLATION syntax
 *         → DOLLAR SIGN + CURLY BRACES = Insert JavaScript expression here
 * 
 * RULE 3: {} alone inside a string = literal text, NOT interpolation
 *         → Without $, curly braces are just characters
 * 
 * RULE 4: {} outside a string (in code) = Object literal OR code block
 *         → This is why your code threw a syntax error!
 * 
 * RULE 5: You can put ANY JavaScript expression inside ${}
 *         → Variables: ${name}
 *         → Math: ${price * quantity}
 *         → Ternary: ${isActive ? 'Yes' : 'No'}
 *         → Function calls: ${getName().toUpperCase()}
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🧪 PRACTICE EXAMPLES (Try These in Console!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * // Example 1: Basic interpolation
 * const name = "Sayantan";
 * console.log(`Hello, ${name}!`);  // "Hello, Sayantan!"
 * 
 * // Example 2: Expression inside ${}
 * const a = 5, b = 3;
 * console.log(`Sum is ${a + b}`);  // "Sum is 8"
 * 
 * // Example 3: Ternary inside template literal
 * const isLoggedIn = true;
 * console.log(`Status: ${isLoggedIn ? 'Logged In' : 'Guest'}`);  // "Status: Logged In"
 * 
 * // Example 4: Multiple interpolations
 * const user = { name: 'John', age: 25 };
 * console.log(`${user.name} is ${user.age} years old`);  // "John is 25 years old"
 * 
 * // Example 5: The exact pattern from prepareListItems
 * const todo = { id: 1, text: 'Learn React', completed: true };
 * const displayText = `${todo.completed ? '✅' : '⬜'} ${todo.text}`;
 * console.log(displayText);  // "✅ Learn React"
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎤 INTERVIEW TIP: How to Explain This
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * If asked "How do you dynamically construct strings in JavaScript?", say:
 * 
 * "I use template literals with backticks and ${} for interpolation. 
 *  For example, to create a display text with a conditional emoji, I'd write:
 *  `${isCompleted ? '✅' : '⬜'} ${taskName}`
 *  
 *  The backticks define the template, and ${} lets me embed JavaScript 
 *  expressions directly - including ternary operators for conditional values."
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📝 VISUAL SUMMARY (Print This Out!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *  ┌─────────────────────────────────────────────────────────────────────────┐
 *  │                    TEMPLATE LITERAL ANATOMY                             │
 *  ├─────────────────────────────────────────────────────────────────────────┤
 *  │                                                                         │
 *  │     `${condition ? 'value1' : 'value2'} ${variable}`                    │
 *  │     ↑ ↑                                  ↑          ↑                   │
 *  │     │ │                                  │          │                   │
 *  │     │ └─ Start of expression             │          └─ End backtick     │
 *  │     │                                    │                              │
 *  │     └─ Start backtick                    └─ Another expression          │
 *  │                                                                         │
 *  │  REMEMBER:                                                              │
 *  │  • BACKTICKS (` `) = Template container                                │
 *  │  • DOLLAR + CURLY BRACES (${}) = Insert JavaScript here               │
 *  │  • TERNARY (? :) = Conditional pick one of two values                  │
 *  │                                                                         │
 *  └─────────────────────────────────────────────────────────────────────────┘
 * 
 */


// =============================================================================
// 📚 INTERVIEW REVISION: The "Prepend Default Option" Pattern
// =============================================================================
/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║           🎯 MASTERING: Prepending a Default Option with Spread Operator                         ║
 * ║                        (The Pattern You Struggled With in createSelectOptions)                   ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🧠 THE PROBLEM YOU FACED
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * You tried to use TERNARY operators to conditionally add a default option:
 * 
 *   ❌ YOUR APPROACH (Overcomplicated):
 *   arr.push({
 *     value: val[i-1].id ? i : '',
 *     label: val[i-1].name ? val[i-1].name : 'Select a category...'
 *   })
 * 
 *   PROBLEM: This tries to make EACH item sometimes be the default option,
 *            but the default option should be ADDED ONCE at the BEGINNING!
 * 
 * 
 *   ✅ CORRECT APPROACH (Simple & Clean):
 *   const defaultOption = { value: '', label: 'Select a category...' };
 *   const mappedOptions = categories.map(cat => ({...}));
 *   return [defaultOption, ...mappedOptions];
 *          ↑               ↑
 *          |               └─ SPREAD: expands array into individual elements
 *          └─ Default option is ALWAYS first
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎭 ANALOGY: Think of it like Making a Playlist
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * Imagine you're creating a Spotify playlist:
 * 
 *   You have songs: ["Song A", "Song B", "Song C"]
 *   You want to add an INTRO at the beginning.
 * 
 *   ❌ WRONG WAY (what you tried):
 *   For each song, check "is this the intro?" - NO! They're all songs, not intros!
 * 
 *   ✅ RIGHT WAY:
 *   1. Create the intro separately: intro = "Welcome Message"
 *   2. Combine: [intro, ...songs] → ["Welcome Message", "Song A", "Song B", "Song C"]
 * 
 * In code:
 *   const intro = { value: '', label: 'Select...' };           // The welcome message
 *   const songs = categories.map(cat => ({...}));              // The actual songs
 *   return [intro, ...songs];                                  // Combined playlist!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📦 BREAKING DOWN THE CORRECT SOLUTION (Step-by-Step)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * EXPECTED OUTPUT:
 *   createSelectOptions([{id: 1, name: 'Electronics'}, {id: 2, name: 'Books'}])
 *   → [
 *       {value: '', label: 'Select a category...'},  // ← INDEX 0: Default (added by us)
 *       {value: '1', label: 'Electronics'},          // ← INDEX 1: Mapped from input
 *       {value: '2', label: 'Books'}                 // ← INDEX 2: Mapped from input
 *     ]
 * 
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ STEP 1: Create the default option SEPARATELY                                                  │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   const defaultOption = { value: '', label: 'Select a category...' };                        │
 * │                                                                                               │
 * │   WHY?                                                                                        │
 * │   • The default option is NOT part of the input data                                          │
 * │   • It's a UI requirement (placeholder for <select> dropdown)                                 │
 * │   • value: '' means "nothing selected yet"                                                    │
 * │   • This is the "intro" in our playlist analogy                                               │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ STEP 2: Map the actual data to the required format                                            │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   const mappedOptions = categories.map(cat => ({                                              │
 * │       value: String(cat.id),   // Convert number → string (HTML forms need strings!)         │
 * │       label: cat.name          // Use the name as the display label                          │
 * │   }));                                                                                        │
 * │                                                                                               │
 * │   INPUT:  [{id: 1, name: 'Electronics'}, {id: 2, name: 'Books'}]                             │
 * │   OUTPUT: [{value: '1', label: 'Electronics'}, {value: '2', label: 'Books'}]                 │
 * │                                                                                               │
 * │   WHY String(cat.id)?                                                                         │
 * │   • HTML <option value="..."> always treats values as strings                                 │
 * │   • Without String(), you'd get value: 1 (number) instead of value: '1' (string)            │
 * │   • This is a common React pattern for form handling                                          │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * ┌───────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ STEP 3: Combine default + mapped using SPREAD OPERATOR                                        │
 * ├───────────────────────────────────────────────────────────────────────────────────────────────┤
 * │                                                                                               │
 * │   return [defaultOption, ...mappedOptions];                                                  │
 * │          ↑                ↑                                                                  │
 * │          |                └─ SPREAD: "unpack" array into individual elements                 │
 * │          └─ Single object goes first                                                         │
 * │                                                                                               │
 * │   HOW IT WORKS:                                                                              │
 * │                                                                                               │
 * │   defaultOption = {value: '', label: 'Select...'}                                            │
 * │   mappedOptions = [{value: '1', label: 'Electronics'}, {value: '2', label: 'Books'}]        │
 * │                                                                                               │
 * │   ...mappedOptions = {value: '1', label: 'Electronics'}, {value: '2', label: 'Books'}       │
 * │   ↑                                                                                          │
 * │   └─ Spread "unpacks" the array, removing the outer brackets                                 │
 * │                                                                                               │
 * │   [defaultOption, ...mappedOptions]                                                          │
 * │   = [{value: '', label: 'Select...'}, {value: '1', label: 'Electronics'}, ...]              │
 * │                                                                                               │
 * └───────────────────────────────────────────────────────────────────────────────────────────────┘
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * ⚠️ WHY YOUR APPROACH DIDN'T WORK
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * ❌ YOUR CODE:
 *   for(let i = 1; i <= val.length; i++){
 *       arr.push({
 *           value: val[i-1].id ? i : '',
 *           label: val[i-1].name ? val[i-1].name : 'Select a category...'
 *       })
 *   }
 * 
 * PROBLEMS:
 * 
 * 1️⃣ WRONG MENTAL MODEL: You tried to make each item "sometimes be the default"
 *    → But the default is a SEPARATE item, not a conditional version of existing items!
 * 
 * 2️⃣ CONDITIONS DON'T MAKE SENSE:
 *    • `val[i-1].id ? i : ''` → This checks if id exists, but id ALWAYS exists!
 *    • `val[i-1].name ? val[i-1].name : 'Select...'` → name ALWAYS exists too!
 *    • These ternaries will NEVER return the false branch!
 * 
 * 3️⃣ MISSING THE DEFAULT OPTION:
 *    • Your loop starts at i=1 and only processes existing categories
 *    • The default option with value: '' is NEVER added!
 * 
 * 4️⃣ WRONG VALUE TYPE:
 *    • You used `value: i` (a number) instead of `String(cat.id)`
 *    • HTML forms expect string values!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🔑 THE GOLDEN PATTERN (Memorize This!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * When you need to ADD something at the BEGINNING of a mapped array:
 * 
 *   const firstItem = { ... };                    // Create the first item separately
 *   const restItems = array.map(item => {...});  // Map the rest
 *   return [firstItem, ...restItems];            // Combine using spread
 * 
 * This pattern is used for:
 *   • Dropdown placeholders ("Select an option...")
 *   • Table headers before data rows
 *   • "All" option in filter lists
 *   • Breadcrumb "Home" before page crumbs
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🧪 PRACTICE EXAMPLES (Try These in Console!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * // Example 1: Basic spread to prepend
 * const numbers = [2, 3, 4];
 * const withZero = [0, ...numbers];
 * console.log(withZero);  // [0, 2, 3, 4]
 * 
 * // Example 2: Prepend object to array of objects
 * const fruits = [{name: 'Apple'}, {name: 'Banana'}];
 * const allFruits = [{name: 'All Fruits'}, ...fruits];
 * console.log(allFruits);  // [{name: 'All Fruits'}, {name: 'Apple'}, {name: 'Banana'}]
 * 
 * // Example 3: The exact createSelectOptions pattern
 * const categories = [{id: 1, name: 'Electronics'}, {id: 2, name: 'Books'}];
 * const defaultOpt = {value: '', label: 'Select...'};
 * const mappedOpts = categories.map(c => ({value: String(c.id), label: c.name}));
 * const allOptions = [defaultOpt, ...mappedOpts];
 * console.log(allOptions);
 * // [{value: '', label: 'Select...'}, {value: '1', label: 'Electronics'}, {value: '2', label: 'Books'}]
 * 
 * // Example 4: Append instead of prepend (just flip the order!)
 * const withLast = [...numbers, 99];
 * console.log(withLast);  // [2, 3, 4, 99]
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🎤 INTERVIEW TIP: How to Explain This
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 * If asked "How do you add a placeholder option to a dropdown in React?", say:
 * 
 * "I create the placeholder as a separate object with an empty value, then combine it 
 *  with the mapped options using the spread operator: [placeholder, ...mappedOptions].
 *  
 *  This pattern is clean because:
 *  1. The placeholder is defined once, not conditionally in each iteration
 *  2. The mapping logic stays focused on transforming the actual data
 *  3. The spread operator makes combination readable and immutable"
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📝 VISUAL SUMMARY (Print This Out!)
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 
 *  ┌─────────────────────────────────────────────────────────────────────────┐
 *  │              THE "PREPEND WITH SPREAD" PATTERN                          │
 *  ├─────────────────────────────────────────────────────────────────────────┤
 *  │                                                                         │
 *  │  INPUT:     [{id: 1, name: 'A'}, {id: 2, name: 'B'}]                   │
 *  │                                                                         │
 *  │  STEP 1: defaultOption = {value: '', label: 'Select...'}               │
 *  │                                                                         │
 *  │  STEP 2: mappedOptions = [{value: '1', label: 'A'}, {value: '2'...}]   │
 *  │                                                                         │
 *  │  STEP 3: return [defaultOption, ...mappedOptions]                      │
 *  │                  ↑               ↑                                     │
 *  │                  |               └─ SPREAD unpacks the array           │
 *  │                  └─ First element (the placeholder)                    │
 *  │                                                                         │
 *  │  OUTPUT:  [{value: '', label: 'Select...'}, {value: '1'...}, ...]     │
 *  │                                                                         │
 *  │  ═══════════════════════════════════════════════════════════════════   │
 *  │  KEY INSIGHT:                                                           │
 *  │  • DON'T try to make existing items "become" the placeholder           │
 *  │  • CREATE the placeholder separately, then COMBINE with spread         │
 *  │  ═══════════════════════════════════════════════════════════════════   │
 *  │                                                                         │
 *  └─────────────────────────────────────────────────────────────────────────┘
 * 
 */
