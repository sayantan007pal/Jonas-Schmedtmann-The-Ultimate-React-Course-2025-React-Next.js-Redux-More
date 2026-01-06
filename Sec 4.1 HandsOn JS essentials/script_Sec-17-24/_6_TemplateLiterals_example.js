/**
 * ╔══════════════════════════════════════════════════════════════════════════════╗
 * ║  Challenge 6: Template Literals - Dynamic String Building                   ║
 * ╠══════════════════════════════════════════════════════════════════════════════╣
 * ║  Topics: String Interpolation, Multi-line, Expressions, Tagged Templates   ║
 * ║  Difficulty: ⭐⭐ (Interview Ready)                                          ║
 * ╚══════════════════════════════════════════════════════════════════════════════╝
 */

// =============================================================================
// Task 1: Basic String Interpolation
// =============================================================================
/**
 * Create a function greet(name, time) that:
 * - Uses template literals to create a greeting
 * - Returns: "Good [time], [name]! Welcome back."
 * 
 * @param {string} name - Person's name
 * @param {string} time - Time of day ("morning", "afternoon", "evening")
 * @returns {string} - Formatted greeting
 * 
 * Example:
 *   greet("John", "morning")
 *   // Returns: "Good morning, John! Welcome back."
 */

function greet(name, time) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Expressions in Template Literals
// =============================================================================
/**
 * Create a function formatPrice(price, quantity, taxRate) that:
 * - Calculates subtotal (price * quantity)
 * - Calculates tax (subtotal * taxRate)
 * - Calculates total (subtotal + tax)
 * - Returns formatted string using template literals with calculations INSIDE ${}
 * 
 * Return format:
 * "Subtotal: $[subtotal], Tax: $[tax], Total: $[total]"
 * (Round all values to 2 decimal places)
 * 
 * @param {number} price - Unit price
 * @param {number} quantity - Number of items
 * @param {number} taxRate - Tax rate (e.g., 0.1 for 10%)
 * @returns {string} - Formatted price breakdown
 * 
 * Example:
 *   formatPrice(10, 3, 0.1)
 *   // Returns: "Subtotal: $30.00, Tax: $3.00, Total: $33.00"
 */

function formatPrice(price, quantity, taxRate) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Conditional Logic in Template Literals
// =============================================================================
/**
 * Create a function formatUserStatus(user) that:
 * - Takes a user object with: { name, isOnline, lastSeen }
 * - Returns different strings based on online status
 * - Uses ternary operator INSIDE the template literal
 * 
 * Return:
 * - If online: "[name] is currently online"
 * - If offline: "[name] was last seen [lastSeen]"
 * 
 * @param {Object} user - { name: string, isOnline: boolean, lastSeen: string }
 * @returns {string} - Formatted status
 * 
 * Example:
 *   formatUserStatus({ name: "John", isOnline: true, lastSeen: "2 hours ago" })
 *   // Returns: "John is currently online"
 *   
 *   formatUserStatus({ name: "Jane", isOnline: false, lastSeen: "5 mins ago" })
 *   // Returns: "Jane was last seen 5 mins ago"
 */

function formatUserStatus(user) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 4: Multi-line Template Literals
// =============================================================================
/**
 * Create a function generateHTML(data) that:
 * - Takes data: { title, items: string[] }
 * - Returns a multi-line HTML string using template literals
 * - Uses .map() to generate list items INSIDE the template
 * 
 * Expected HTML structure:
 * <div class="container">
 *   <h1>[title]</h1>
 *   <ul>
 *     <li>[item1]</li>
 *     <li>[item2]</li>
 *     ...
 *   </ul>
 * </div>
 * 
 * @param {Object} data - { title: string, items: string[] }
 * @returns {string} - HTML string
 * 
 * Example:
 *   generateHTML({ title: "Fruits", items: ["Apple", "Banana"] })
 */

function generateHTML(data) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 5: Method Calls Inside Template Literals
// =============================================================================
/**
 * Create a function formatBookInfo(book) that:
 * - Takes a book object: { title, author, publicationDate, genres }
 * - publicationDate is ISO format: "1954-07-29"
 * - genres is an array: ["fantasy", "adventure"]
 * 
 * Returns:
 * "[TITLE] by [author] ([year]) - Genres: [genre1], [genre2], ..."
 * 
 * - Title should be UPPERCASE
 * - Year should be extracted from publicationDate using split("-")[0]
 * - Genres should be joined with ", "
 * 
 * @param {Object} book - Book object
 * @returns {string} - Formatted book info
 * 
 * Example:
 *   formatBookInfo({ 
 *     title: "Dune", 
 *     author: "Frank Herbert",
 *     publicationDate: "1965-01-01",
 *     genres: ["sci-fi", "adventure"]
 *   })
 *   // Returns: "DUNE by Frank Herbert (1965) - Genres: sci-fi, adventure"
 */

function formatBookInfo(book) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 6: Dynamic React className Pattern
// =============================================================================
/**
 * Create a function getClassName(baseClass, options) that:
 * - Builds a CSS className string dynamically
 * - options: { isActive, size, variant, disabled }
 * - All options are optional
 * 
 * Logic:
 * - Always include baseClass
 * - Add "-active" if isActive is true
 * - Add "-[size]" if size is provided
 * - Add "-[variant]" if variant is provided
 * - Add "-disabled" if disabled is true
 * 
 * @param {string} baseClass - Base CSS class
 * @param {Object} options - { isActive?, size?, variant?, disabled? }
 * @returns {string} - Combined className string
 * 
 * Example:
 *   getClassName("btn", { isActive: true, size: "lg", variant: "primary" })
 *   // Returns: "btn btn-active btn-lg btn-primary"
 *   
 *   getClassName("card", { disabled: true })
 *   // Returns: "card card-disabled"
 */

function getClassName(baseClass, options = {}) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    greet,
    formatPrice,
    formatUserStatus,
    generateHTML,
    formatBookInfo,
    getClassName
};
