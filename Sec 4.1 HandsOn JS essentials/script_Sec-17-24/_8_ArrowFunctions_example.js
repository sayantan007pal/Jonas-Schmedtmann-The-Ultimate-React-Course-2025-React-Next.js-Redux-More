/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 8: Arrow Functions - Modern Function Syntax                       ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: Arrow Syntax, Implicit Return, `this` Binding, Callbacks           ║
 * ║  Difficulty: ⭐⭐⭐ (Interview Critical!)                                    ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// =============================================================================
// Task 1: Convert to Arrow Function - Implicit Return
// =============================================================================
/**
 * Convert these regular functions to ARROW functions with IMPLICIT return:
 * 
 * 1. double(n) - Returns n * 2
 * 2. isEven(n) - Returns true if n is even
 * 3. getFullName(first, last) - Returns "[first] [last]"
 */

// Original: function double(n) { return n * 2; }
const double = (n) => undefined; /* YOUR CODE HERE - replace undefined */

// Original: function isEven(n) { return n % 2 === 0; }
const isEven = (n) => undefined; /* YOUR CODE HERE - replace undefined */

// Original: function getFullName(first, last) { return first + " " + last; }
const getFullName = (first, last) => undefined; /* YOUR CODE HERE - replace undefined */


// =============================================================================
// Task 2: Arrow Function with Object Return
// =============================================================================
/**
 * Create an arrow function createPerson(name, age) that:
 * - Returns an object { name, age }
 * - Uses IMPLICIT return (hint: wrap object in parentheses!)
 * 
 * @param {string} name
 * @param {number} age
 * @returns {Object} - { name, age }
 * 
 * Example:
 *   createPerson("John", 25)  // { name: "John", age: 25 }
 */

const createPerson = (name, age) => undefined; /* YOUR CODE HERE - replace undefined */


// =============================================================================
// Task 3: Arrow Functions as Callbacks
// =============================================================================
/**
 * Create these functions using arrow functions:
 * 
 * 1. filterAdults(people) - Returns array of people with age >= 18
 *    people: [{ name, age }, ...]
 * 
 * 2. getNames(people) - Returns array of just the names
 *    people: [{ name, age }, ...]
 * 
 * 3. sumAges(people) - Returns sum of all ages
 *    people: [{ name, age }, ...]
 */

const filterAdults = (people) => undefined; /* YOUR CODE HERE - replace undefined */

const getNames = (people) => undefined; /* YOUR CODE HERE - replace undefined */

const sumAges = (people) => undefined; /* YOUR CODE HERE - replace undefined */


// =============================================================================
// Task 4: Arrow Function - No Implicit Return (Multi-line)
// =============================================================================
/**
 * Create a function processOrder(items) that:
 * - Takes an array of { name, price, quantity }
 * - Calculates total for each item (price * quantity)
 * - Returns object: { items: processed items with total, grandTotal }
 * 
 * This requires EXPLICIT return since we have multiple statements.
 * 
 * @param {Object[]} items - [{ name, price, quantity }, ...]
 * @returns {Object} - { items: [{ name, price, quantity, total }], grandTotal }
 * 
 * Example:
 *   processOrder([{ name: "Book", price: 10, quantity: 2 }])
 *   // { items: [{ name: "Book", price: 10, quantity: 2, total: 20 }], grandTotal: 20 }
 */

const processOrder = (items) => {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
};


// =============================================================================
// Task 5: Arrow Functions and `this` (Critical Interview Topic!)
// =============================================================================
/**
 * This task demonstrates the difference between regular and arrow functions
 * regarding `this` binding.
 * 
 * Create a timer object with these methods:
 * 
 * 1. start() - Uses setInterval with ARROW function
 *    - Should correctly log "Timer: [seconds] seconds" every second
 *    - Arrow function inherits `this` from start()
 * 
 * 2. stop() - Clears the interval
 * 
 * The object has a `seconds` property and an `intervalId` property.
 */

const createTimer = () => {
    return {
        seconds: 0,
        intervalId: null,
        
        // Method to start the timer - ARROW function in callback works!
        start() {
            // ==================== YOUR CODE HERE ====================
            // Use arrow function in setInterval so `this` refers to timer object
            
            
            
            // ========================================================
        },
        
        // Method to stop the timer
        stop() {
            // ==================== YOUR CODE HERE ====================
            
            
            
            // ========================================================
        }
    };
};


// =============================================================================
// Task 6: Higher-Order Arrow Functions
// =============================================================================
/**
 * Create these higher-order functions using arrow syntax:
 * 
 * 1. multiplyBy(factor) - Returns a function that multiplies by factor
 *    multiplyBy(3)(4) => 12
 * 
 * 2. createGreeter(greeting) - Returns a function that greets with the greeting
 *    createGreeter("Hello")("John") => "Hello, John!"
 * 
 * 3. compose(f, g) - Returns a function that applies g first, then f
 *    compose(x => x + 1, x => x * 2)(3) => (3 * 2) + 1 = 7
 */

const multiplyBy = (factor) => undefined; /* YOUR CODE HERE - replace undefined */

const createGreeter = (greeting) => undefined; /* YOUR CODE HERE - replace undefined */

const compose = (f, g) => undefined; /* YOUR CODE HERE - replace undefined */


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    double,
    isEven,
    getFullName,
    createPerson,
    filterAdults,
    getNames,
    sumAges,
    processOrder,
    createTimer,
    multiplyBy,
    createGreeter,
    compose
};
