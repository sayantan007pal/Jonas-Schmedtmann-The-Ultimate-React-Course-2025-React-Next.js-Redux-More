/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 1: Object Destructuring - Extract & Transform                     ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: Object Destructuring, Default Values, Renaming, Nested Destructuring║
 * ║  Difficulty: ⭐⭐ (Interview Ready)                                          ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// =============================================================================
// Sample Data (Similar to React component props or API responses)
// =============================================================================
const sampleUser = {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    profile: {
        age: 28,
        city: "New York",
        country: "USA"
    },
    preferences: {
        theme: "dark",
        notifications: true
    }
};

const sampleBook = {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    reviews: {
        goodreads: { rating: 3.93, count: 4500000 },
        amazon: { rating: 4.5, count: 125000 }
    }
};

// =============================================================================
// Task 1: Basic Object Destructuring
// =============================================================================
/**
 * Create a function extractUserInfo(user) that:
 * - Uses object destructuring to extract `name`, `email`, and `id` from user
 * - Returns an object with these three properties
 * 
 * @param {Object} user - User object with id, name, email properties
 * @returns {Object} - { id, name, email }
 * 
 * Example:
 *   extractUserInfo({ id: 1, name: "John", email: "john@test.com", age: 25 })
 *   // Returns: { id: 1, name: "John", email: "john@test.com" }
 */

function extractUserInfo(user) {
    // ==================== YOUR CODE HERE ====================
    let {name, email, id, ...rest} = user
    console.log({id, name, email })
    return {id, name, email }
    
    // ========================================================
}


// =============================================================================
// Task 2: Destructuring with Default Values
// =============================================================================
/**
 * Create a function getThemeSettings(settings) that:
 * - Extracts `theme` with default value "light"
 * - Extracts `fontSize` with default value 16
 * - Extracts `language` with default value "en"
 * - Returns an object with all three properties
 * 
 * @param {Object} settings - Settings object (may have missing properties)
 * @returns {Object} - { theme, fontSize, language }
 * 
 * Example:
 *   getThemeSettings({ theme: "dark" })
 *   // Returns: { theme: "dark", fontSize: 16, language: "en" }
 *   
 *   getThemeSettings({})
 *   // Returns: { theme: "light", fontSize: 16, language: "en" }
 */

function getThemeSettings(settings) {
    // ==================== YOUR CODE HERE ====================
    let {theme="light", fontSize=16,language="en", ...rest} = settings
    console.log({theme, fontSize, language })
    return {theme, fontSize, language }
    
    // ========================================================
}


// =============================================================================
// Task 3: Destructuring with Renaming
// =============================================================================
/**
 * Create a function transformBookData(book) that:
 * - Extracts `title` and renames it to `bookTitle`
 * - Extracts `author` and renames it to `authorName`
 * - Extracts `year` and renames it to `publishedYear`
 * - Returns an object with the renamed properties
 * 
 * @param {Object} book - Book object with title, author, year
 * @returns {Object} - { bookTitle, authorName, publishedYear }
 * 
 * Example:
 *   transformBookData({ title: "1984", author: "George Orwell", year: 1949 })
 *   // Returns: { bookTitle: "1984", authorName: "George Orwell", publishedYear: 1949 }
 */

function transformBookData(book) {
    // ==================== YOUR CODE HERE ====================
    
    let {title, author, year} = {...book}
    console.log(title)
    let bookTitle = title
    let authorName = author
    let publishedYear = year


    return {bookTitle, authorName, publishedYear}
    // ========================================================
}


// =============================================================================
// Task 4: Nested Object Destructuring
// =============================================================================
/**
 * Create a function extractNestedProfile(user) that:
 * - Uses NESTED destructuring to extract:
 *   - `name` from user
 *   - `city` and `country` from user.profile
 * - Returns an object: { name, city, country }
 * 
 * @param {Object} user - User object with nested profile
 * @returns {Object} - { name, city, country }
 * 
 * Example:
 *   extractNestedProfile({
 *     name: "Jane",
 *     profile: { city: "London", country: "UK", age: 30 }
 *   })
 *   // Returns: { name: "Jane", city: "London", country: "UK" }
 */

function extractNestedProfile(user) {
    // ==================== YOUR CODE HERE ====================
    let {name, profile:{city}, profile:{country}} = user
    return {name, city, country}
    
    // ========================================================
}


// =============================================================================
// Task 5: Combined Challenge - Destructuring in Function Parameters
// =============================================================================
/**
 * Create a function formatUserCard({ name, email, profile: { city, age } = {} }) that:
 * - Uses destructuring DIRECTLY in the function parameters
 * - Handles missing profile gracefully (default to empty object)
 * - Returns a formatted string: "Name: [name], Email: [email], Location: [city], Age: [age]"
 * - If city or age is undefined, use "Unknown" for city and "N/A" for age
 * 
 * @param {Object} user - User object with name, email, and optional profile
 * @returns {string} - Formatted user card string
 * 
 * Example:
 *   formatUserCard({ name: "John", email: "john@test.com", profile: { city: "NYC", age: 25 } })
 *   // Returns: "Name: John, Email: john@test.com, Location: NYC, Age: 25"
 *   
 *   formatUserCard({ name: "Jane", email: "jane@test.com" })
 *   // Returns: "Name: Jane, Email: jane@test.com, Location: Unknown, Age: N/A"
 */

function formatUserCard({ name, email, profile: { city, age } = {} } = {}) {
    // ==================== YOUR CODE HERE ====================
    let Name = name || 'Unknown';
    let Email = email || 'Unknown';
    let Location = city || 'Unknown';
    let Age = age || 'N/A';
    return `Name: ${Name}, Email: ${Email}, Location: ${Location}, Age: ${Age}`
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    extractUserInfo,
    getThemeSettings,
    transformBookData,
    extractNestedProfile,
    formatUserCard,
    sampleUser,
    sampleBook
};


// =============================================================================
// 📚 DEEP DIVE: Task 2 - getThemeSettings() Explained
// =============================================================================
/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  THE SOLUTION:                                                               │
 * │  let {theme="light", fontSize=16, language="en", ...rest} = settings        │
 * │  return {theme, fontSize, language}                                         │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🧠 THOUGHT PROCESS - How to Approach This Problem
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * STEP 1: Understand What the Problem is Asking
 * ──────────────────────────────────────────────
 * The function receives a `settings` object that MAY OR MAY NOT have certain keys.
 * We need to:
 *   ✅ Extract `theme`, `fontSize`, `language`
 *   ✅ Provide fallback values if they don't exist
 *   ✅ Return them as an object
 * 
 * Example inputs & expected outputs:
 *   getThemeSettings({ theme: "dark" })        → { theme: "dark", fontSize: 16, language: "en" }
 *   getThemeSettings({})                       → { theme: "light", fontSize: 16, language: "en" }
 *   getThemeSettings({ fontSize: 20 })         → { theme: "light", fontSize: 20, language: "en" }
 * 
 * 
 * STEP 2: Identify the Core Concept
 * ──────────────────────────────────
 * This is about "DESTRUCTURING WITH DEFAULT VALUES" - a single syntax that:
 *   1. Extracts values from an object
 *   2. Assigns fallback values if the key is missing OR the value is `undefined`
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔍 THE SYNTAX BREAKDOWN
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 *   let { theme = "light", fontSize = 16, language = "en" } = settings
 *         ─────   ───────  ────────   ──  ────────   ────    ────────
 *           │        │        │        │      │        │         │
 *           │        │        │        │      │        │         └── Source object
 *           │        │        │        │      │        └── Default if missing
 *           │        │        │        │      └── Variable name
 *           │        │        │        └── Default if missing
 *           │        │        └── Variable name
 *           │        └── Default value if `theme` is undefined/missing
 *           └── Variable name to extract
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * ❌ COMMON MISTAKES & WHAT YOU MIGHT HAVE TRIED
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * MISTAKE 1: Using || for Default Values (Verbose Approach)
 * ──────────────────────────────────────────────────────────
 * You might have thought:
 *   const theme = settings.theme || "light";
 *   const fontSize = settings.fontSize || 16;
 *   const language = settings.language || "en";
 * 
 * This WORKS but:
 *   ⚠️ It's verbose (3 lines instead of 1)
 *   ⚠️ It has a bug: `settings.fontSize || 16` will use 16 if fontSize is `0` (falsy)
 *   ✅ Destructuring defaults only trigger on `undefined`, not other falsy values
 * 
 * 
 * MISTAKE 2: Forgetting the Syntax for Default Values
 * ────────────────────────────────────────────────────
 * Wrong:  let { theme: "light" } = settings      // ❌ This is RENAMING, not defaulting
 * Right:  let { theme = "light" } = settings     // ✅ This is DEFAULTING
 * 
 * The `:` in destructuring is for RENAMING:
 *   let { theme: myTheme } = settings  // Extracts `theme` into variable `myTheme`
 * 
 * The `=` in destructuring is for DEFAULTS:
 *   let { theme = "light" } = settings // Uses "light" if theme is undefined
 * 
 * 
 * MISTAKE 3: Not Knowing How to Return as an Object
 * ──────────────────────────────────────────────────
 * After destructuring, you have individual variables (theme, fontSize, language).
 * To return them as an object, use shorthand property syntax:
 * 
 *   return { theme, fontSize, language }
 *   // This is shorthand for:
 *   return { theme: theme, fontSize: fontSize, language: language }
 * 
 * 
 * MISTAKE 4: Thinking You Need Conditional Logic
 * ───────────────────────────────────────────────
 * You might have written:
 *   function getThemeSettings(settings) {
 *       let theme = "light";
 *       if (settings.theme) theme = settings.theme;
 *       // ... repeat for each property
 *   }
 * 
 * This is way too verbose! Destructuring with defaults handles this in ONE line.
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 THE MENTAL MODEL YOU NEED
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Think of destructuring with defaults like ordering food with substitutions:
 * 
 *   "Give me {burger, fries, drink} from the menu"
 *   
 *   BUT:
 *   - If burger is unavailable → use veggie patty (default)
 *   - If fries are unavailable → use onion rings (default)
 *   - If drink is unavailable → use water (default)
 * 
 * In code:
 *   let { burger = "veggie", fries = "onion rings", drink = "water" } = menu
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📝 INTERVIEW TIP: When to Use Destructuring Defaults
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * USE DESTRUCTURING DEFAULTS WHEN:
 *   ✅ Extracting config/settings from options objects
 *   ✅ Handling optional function parameters
 *   ✅ Working with API responses that may have missing fields
 *   ✅ Setting up React component props with defaults
 * 
 * Example in React:
 *   function Button({ text = "Click me", color = "blue", size = "medium" }) {
 *       // All props have sensible defaults
 *   }
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🧪 WHY ...rest WAS USED (OPTIONAL)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * In the solution: `let {theme="light", fontSize=16, language="en", ...rest} = settings`
 * 
 * The `...rest` is the REST operator - it collects all remaining properties 
 * that weren't explicitly destructured into a new object called `rest`.
 * 
 * For this problem, it's technically NOT needed since we only return 
 * {theme, fontSize, language}. However, it's a good practice when you want 
 * to preserve other properties that might exist in the original object.
 * 
 * Example:
 *   settings = { theme: "dark", fontSize: 20, language: "fr", debug: true, beta: false }
 *   
 *   After destructuring:
 *   - theme = "dark"
 *   - fontSize = 20
 *   - language = "fr"
 *   - rest = { debug: true, beta: false }   // Everything else
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔑 KEY TAKEAWAY
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * The pattern: { key = defaultValue } = sourceObject
 * 
 * This ONE syntax does THREE things:
 *   1. Extracts `key` from `sourceObject`
 *   2. Creates a variable named `key`
 *   3. Uses `defaultValue` if the key is missing/undefined
 * 
 * It's a DECLARATIVE way of saying:
 *   "Give me this value, but if it doesn't exist, use this fallback instead."
 */


// =============================================================================
// 📚 DEEP DIVE: Task 5 - formatUserCard() - YOUR QUESTION EXPLAINED
// =============================================================================
/**
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  YOUR SOLUTION (Lines 181-187):                                             │
 * │  let { profile:{ city}, profile:{age} }= {profile: { city, age }};          │
 * │  let Name = name || 'Unknown';                                              │
 * │  let Email = email || 'Unknown';                                            │
 * │  let Location = city || 'Unknown';                                          │
 * │  let Age = age || 'N/A';                                                    │
 * │  return {Name, Email, Location, Age}                                        │
 * └─────────────────────────────────────────────────────────────────────────────┘
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🧠 WHAT YOU MIGHT HAVE MISSED: The Destructuring Already Happened!
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * CRITICAL INSIGHT: Look at the function signature (Line 179):
 * 
 *   function formatUserCard({ name, email, profile: { city, age } = {} } = {})
 *                          └──────────────────────────────────────────────────┘
 *                                           ↑
 *                          THIS IS DESTRUCTURING IN THE PARAMETER ITSELF!
 * 
 * By the time you're INSIDE the function body, these variables ALREADY EXIST:
 *   ✅ name        → Already extracted from the input object
 *   ✅ email       → Already extracted from the input object
 *   ✅ city        → Already extracted from input.profile
 *   ✅ age         → Already extracted from input.profile
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * ❌ WHY YOUR LINE 181 WAS REDUNDANT (AND CONFUSING)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Your code:  let { profile:{ city}, profile:{age} } = {profile: { city, age }};
 * 
 * What this does:
 *   1. Creates a NEW temporary object: { profile: { city, age } }
 *      - This uses the `city` and `age` that were ALREADY destructured in the parameter
 *   2. Then destructures the same values BACK OUT of this new object
 * 
 * It's like:
 *   - Step 1: You unpack a box and take out `city` and `age` (function parameter did this)
 *   - Step 2: You put them BACK into a new box
 *   - Step 3: You unpack that new box again to get the same items
 * 
 * This is CIRCULAR and UNNECESSARY! You already have `city` and `age` as variables!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔑 THE THOUGHT PROCESS YOU WERE MISSING
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * MENTAL GAP #1: Not Recognizing Parameter Destructuring
 * ───────────────────────────────────────────────────────
 * When you see:
 *   function foo({ a, b, nested: { c } } = {})
 * 
 * This is NOT just a function that takes an object. The {} in the parameter
 * IS the destructuring happening at the moment of function call.
 * 
 * By the time you're writing code INSIDE the function, `a`, `b`, and `c` 
 * are already regular variables you can use directly!
 * 
 * 
 * MENTAL GAP #2: Understanding When to Destructure
 * ─────────────────────────────────────────────────
 * You destructure when you have:
 *   ✅ An object → and you want to extract specific values from it
 * 
 * You DON'T destructure when:
 *   ❌ You already have the values as individual variables
 * 
 * In this case, the function parameter already gave you individual variables.
 * No more destructuring needed inside the function body!
 * 
 * 
 * MENTAL GAP #3: What the Problem Actually Asked For
 * ───────────────────────────────────────────────────
 * The task said "Uses destructuring DIRECTLY in the function parameters"
 * 
 * This means: The destructuring should happen in the function signature,
 * NOT inside the function body. The function signature already does this!
 * 
 * Your job inside the function is ONLY to:
 *   1. Handle undefined values (use || for defaults)
 *   2. Return the formatted STRING (not an object!)
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * ✅ THE CORRECT SOLUTION (Returns a STRING, not an object!)
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * function formatUserCard({ name, email, profile: { city, age } = {} } = {}) {
 *     // Variables already exist: name, email, city, age
 *     // Just handle the fallbacks and return a FORMATTED STRING:
 *     
 *     let Name = name || 'Unknown';
 *     let Email = email || 'Unknown';
 *     let Location = city || 'Unknown';
 *     let Age = age || 'N/A';
 *     
 *     return `Name: ${Name}, Email: ${Email}, Location: ${Location}, Age: ${Age}`;
 * }
 * 
 * ⚠️ ADDITIONAL MISTAKE YOU MADE: Returning an Object Instead of a String
 * ─────────────────────────────────────────────────────────────────────────
 * You returned: return {Name, Email, Location, Age}   ← This is an OBJECT!
 * 
 * But the task asked for a formatted STRING like:
 *   "Name: John, Email: john@test.com, Location: NYC, Age: 25"
 * 
 * ALWAYS read the expected output format carefully!
 *   - Object: { Name: "John", Email: "..." }  ← Uses curly braces, key-value pairs
 *   - String: "Name: John, Email: ..."        ← Uses quotes, human-readable format
 * 
 * Use TEMPLATE LITERALS (backticks ``) to create formatted strings:
 *   return `Name: ${Name}, Email: ${Email}, Location: ${Location}, Age: ${Age}`
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔍 BREAKING DOWN THE FUNCTION SIGNATURE
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Let's decode: function formatUserCard({ name, email, profile: { city, age } = {} } = {})
 * 
 * LAYER 1: The Outermost `= {}`
 * ─────────────────────────────
 *   { ... } = {}
 *           ↑
 *   This is the DEFAULT if formatUserCard() is called with NO arguments.
 *   → formatUserCard() won't crash; it uses {} as the input object.
 * 
 * 
 * LAYER 2: The Main Destructuring `{ name, email, profile: {...} }`
 * ─────────────────────────────────────────────────────────────────
 *   { name, email, profile: { city, age } = {} }
 *     ↑     ↑      └────────────────────────────┘
 *     │     │                  │
 *     │     │                  └── Nested destructuring (see layer 3)
 *     │     └── Extracts `email` from input
 *     └── Extracts `name` from input
 * 
 * 
 * LAYER 3: The Nested Destructuring `profile: { city, age } = {}`
 * ───────────────────────────────────────────────────────────────
 *   profile: { city, age } = {}
 *   ───────  ─────────────  ──
 *      │           │         │
 *      │           │         └── Default if `profile` is undefined
 *      │           └── Destructure `city` and `age` FROM profile
 *      └── This is NOT a variable name! It says "go INTO profile"
 * 
 *   IMPORTANT: This does NOT create a variable called `profile`!
 *   It creates `city` and `age` by reaching INTO profile.
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📊 TRACE THROUGH: What Variables Exist After the Destructuring?
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Input: { name: "John", email: "john@test.com", profile: { city: "NYC", age: 25 } }
 * 
 * After the parameter destructuring:
 *   ┌──────────────────────────────┐
 *   │ name  = "John"               │  ← Extracted from input.name
 *   │ email = "john@test.com"      │  ← Extracted from input.email
 *   │ city  = "NYC"                │  ← Extracted from input.profile.city
 *   │ age   = 25                   │  ← Extracted from input.profile.age
 *   └──────────────────────────────┘
 * 
 * Note: There is NO `profile` variable! We went INTO profile to get city and age.
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 📊 TRACE THROUGH: When Profile is Missing
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * Input: { name: "Jane", email: "jane@test.com" }
 * (profile is undefined)
 * 
 * The `= {}` default kicks in:
 *   profile: { city, age } = {}
 *   ───────────────────────  ──
 *          ↑                  ↑
 *          │                  └── profile is undefined, so use {}
 *          └── Now destructure {} to get city and age
 * 
 * Result:
 *   ┌──────────────────────────────┐
 *   │ name  = "Jane"               │
 *   │ email = "jane@test.com"      │
 *   │ city  = undefined            │  ← {} has no city property
 *   │ age   = undefined            │  ← {} has no age property
 *   └──────────────────────────────┘
 * 
 * Then inside the function, this is why we use || for fallbacks:
 *   Location = city || 'Unknown'   → 'Unknown' (because city is undefined)
 *   Age = age || 'N/A'             → 'N/A' (because age is undefined)
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🎯 KEY TAKEAWAY: The Mental Model for Parameter Destructuring
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * When you see: function foo({ a, b, nested: { c } } = {})
 * 
 * Think of it as TWO steps that happen BEFORE your function body runs:
 * 
 *   STEP 1 (Implicit): The function receives an object argument
 *           let input = { ... whatever was passed in ... }
 * 
 *   STEP 2 (Automatic): JavaScript destructures it for you
 *           let { a, b, nested: { c } } = input
 * 
 * By the time you write code INSIDE the function, you have `a`, `b`, `c` as
 * regular variables. No need to destructure again!
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 💡 INTERVIEW TIP: This Pattern is EVERYWHERE in React
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * React components constantly use parameter destructuring:
 * 
 *   // Instead of:
 *   function UserCard(props) {
 *       const name = props.name;
 *       const email = props.email;
 *       // ...
 *   }
 * 
 *   // We write:
 *   function UserCard({ name, email, avatar = 'default.png' }) {
 *       // name, email, avatar are already variables!
 *   }
 * 
 * Understanding this pattern is ESSENTIAL for reading React code.
 * 
 * 
 * ═══════════════════════════════════════════════════════════════════════════════
 * 🔑 SUMMARY: Why You Couldn't Solve It
 * ═══════════════════════════════════════════════════════════════════════════════
 * 
 * 1. You didn't recognize that the function SIGNATURE was already doing 
 *    the destructuring work.
 * 
 * 2. You thought you needed to destructure again inside the function body.
 * 
 * 3. You created unnecessary complexity by rebuilding an object just to 
 *    destructure it again.
 * 
 * 4. The key insight: When destructuring is in the function parameters, 
 *    you get FREE variables to use directly inside the function!
 * 
 * Next time you see complex function signatures with {}, remember:
 *   "The destructuring already happened. These are my variables now."
 */
