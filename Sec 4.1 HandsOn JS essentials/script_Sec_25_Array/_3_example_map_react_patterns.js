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
    
    
    
    // ========================================================
}


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
