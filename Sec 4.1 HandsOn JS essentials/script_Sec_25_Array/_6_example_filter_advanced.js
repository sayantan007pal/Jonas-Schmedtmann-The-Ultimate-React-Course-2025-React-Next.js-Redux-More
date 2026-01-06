/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🎯 CHALLENGE 6: Array.filter() - Advanced Conditions                          ║
 * ║                              Difficulty: ⭐⭐ (Intermediate)                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Complex filter conditions and multiple criteria
 * 
 * 🎯 INTERVIEW IMPORTANCE: HIGH
 *    - Real applications have complex filtering requirements
 *    - Tests logical operator understanding (&&, ||)
 */

// =============================================================================
// CHALLENGE: Filter with Multiple Conditions (AND)
// =============================================================================
/**
 * Create a function `filterEligibleEmployees` that:
 * - Takes array of employees with 'name', 'age', 'yearsOfExperience', 'department'
 * - Returns employees who are:
 *   1. Age >= 25 AND
 *   2. Years of experience >= 3 AND
 *   3. In 'Engineering' or 'Product' department
 * 
 * @param {Array<{name: string, age: number, yearsOfExperience: number, department: string}>} employees
 * @returns {Array} - Filtered employees meeting ALL criteria
 * 
 * Examples:
 *   filterEligibleEmployees([
 *     {name: 'Alice', age: 30, yearsOfExperience: 5, department: 'Engineering'},
 *     {name: 'Bob', age: 24, yearsOfExperience: 4, department: 'Engineering'},
 *     {name: 'Charlie', age: 28, yearsOfExperience: 2, department: 'Product'},
 *     {name: 'Diana', age: 35, yearsOfExperience: 10, department: 'Sales'}
 *   ]) → [{name: 'Alice', age: 30, yearsOfExperience: 5, department: 'Engineering'}]
 * 
 * 💡 HINTS:
 *   - Use && for AND conditions
 *   - Use || for OR conditions (Engineering OR Product)
 *   - Or use ['Engineering', 'Product'].includes(dept)
 */

function filterEligibleEmployees(employees) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter with OR Conditions
// =============================================================================
/**
 * Create a function `filterUrgentTasks` that:
 * - Takes array of tasks with 'title', 'priority', 'dueDate', 'isOverdue'
 * - Returns tasks that are urgent (match ANY of these):
 *   1. Priority is 'high' OR
 *   2. isOverdue is true OR
 *   3. dueDate is today or earlier (use provided today parameter)
 * 
 * @param {Array<{title: string, priority: string, dueDate: string, isOverdue: boolean}>} tasks
 * @param {string} today - Today's date as 'YYYY-MM-DD' string
 * @returns {Array} - Tasks matching ANY urgency criteria
 * 
 * Examples:
 *   filterUrgentTasks([
 *     {title: 'Review PR', priority: 'high', dueDate: '2025-01-10', isOverdue: false},
 *     {title: 'Update docs', priority: 'low', dueDate: '2025-01-05', isOverdue: false},
 *     {title: 'Fix bug', priority: 'medium', dueDate: '2025-01-15', isOverdue: true}
 *   ], '2025-01-06') → [
 *     {title: 'Review PR', priority: 'high', dueDate: '2025-01-10', isOverdue: false},
 *     {title: 'Update docs', priority: 'low', dueDate: '2025-01-05', isOverdue: false},
 *     {title: 'Fix bug', priority: 'medium', dueDate: '2025-01-15', isOverdue: true}
 *   ]
 * 
 * 💡 HINTS:
 *   - String comparison works for YYYY-MM-DD dates: 'dueDate <= today'
 *   - Use || for OR conditions
 */

function filterUrgentTasks(tasks, today) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter with Nested Array Check
// =============================================================================
/**
 * Create a function `filterByGenres` that:
 * - Takes array of books (each with 'title' and 'genres' array)
 * - Takes array of targetGenres to match
 * - Returns books that have AT LEAST ONE genre from targetGenres
 * 
 * @param {Array<{title: string, genres: string[]}>} books
 * @param {string[]} targetGenres - Genres to filter by
 * @returns {Array} - Books with at least one matching genre
 * 
 * Examples:
 *   filterByGenres([
 *     {title: 'Dune', genres: ['sci-fi', 'adventure']},
 *     {title: 'LOTR', genres: ['fantasy', 'adventure']},
 *     {title: '1984', genres: ['dystopian', 'sci-fi']}
 *   ], ['fantasy', 'dystopian']) → [
 *     {title: 'LOTR', genres: ['fantasy', 'adventure']},
 *     {title: '1984', genres: ['dystopian', 'sci-fi']}
 *   ]
 * 
 * 💡 HINTS:
 *   - Use .some() to check if ANY genre matches
 *   - book.genres.some(g => targetGenres.includes(g))
 */

function filterByGenres(books, targetGenres) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter with Range Check
// =============================================================================
/**
 * Create a function `filterByPriceRange` that:
 * - Takes array of products with 'name', 'price', 'category'
 * - Takes minPrice and maxPrice (inclusive range)
 * - Returns products within the price range
 * 
 * @param {Array<{name: string, price: number, category: string}>} products
 * @param {number} minPrice - Minimum price (inclusive)
 * @param {number} maxPrice - Maximum price (inclusive)
 * @returns {Array} - Products within price range
 * 
 * Examples:
 *   filterByPriceRange([
 *     {name: 'Cheap', price: 10, category: 'A'},
 *     {name: 'Medium', price: 50, category: 'B'},
 *     {name: 'Expensive', price: 100, category: 'C'}
 *   ], 25, 75) → [{name: 'Medium', price: 50, category: 'B'}]
 * 
 * 💡 HINTS:
 *   - price >= minPrice && price <= maxPrice
 *   - Handle edge cases: minPrice = maxPrice (single value)
 */

function filterByPriceRange(products, minPrice, maxPrice) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    filterEligibleEmployees,
    filterUrgentTasks,
    filterByGenres,
    filterByPriceRange
};
