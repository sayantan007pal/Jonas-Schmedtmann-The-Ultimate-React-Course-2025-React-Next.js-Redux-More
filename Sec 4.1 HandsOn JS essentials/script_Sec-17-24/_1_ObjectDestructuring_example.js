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
