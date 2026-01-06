/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🎯 CHALLENGE 7: Array.filter() - React Deletion Patterns                      ║
 * ║                              Difficulty: ⭐⭐ (Intermediate)                                     ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 * 
 * 📚 CONCEPT: Using filter() for immutable deletion in React state
 * 
 * 🎯 INTERVIEW IMPORTANCE: CRITICAL
 *    - This is THE pattern for deleting items in React
 *    - Asked in almost every React interview
 */

// =============================================================================
// CHALLENGE: Delete by ID
// =============================================================================
/**
 * Create a function `deleteById` that:
 * - Takes an array of items (each with 'id' property)
 * - Takes an id to delete
 * - Returns NEW array without the item with that id
 * 
 * @param {Array<{id: number, [key: string]: any}>} items - Array of items with id
 * @param {number} idToDelete - ID of item to remove
 * @returns {Array} - New array without the deleted item
 * 
 * Examples:
 *   deleteById([{id: 1, name: 'A'}, {id: 2, name: 'B'}], 1) → [{id: 2, name: 'B'}]
 *   deleteById([{id: 1, name: 'A'}], 1) → []
 *   deleteById([{id: 1, name: 'A'}], 99) → [{id: 1, name: 'A'}] (no match, return all)
 * 
 * 💡 HINTS:
 *   - Filter keeps items where condition is TRUE
 *   - Keep items where id !== idToDelete
 */

function deleteById(items, idToDelete) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Delete Multiple by IDs
// =============================================================================
/**
 * Create a function `deleteByIds` that:
 * - Takes an array of items (each with 'id' property)
 * - Takes an array of ids to delete
 * - Returns NEW array without any items with those ids
 * 
 * @param {Array<{id: number, [key: string]: any}>} items
 * @param {number[]} idsToDelete - Array of IDs to remove
 * @returns {Array} - New array without deleted items
 * 
 * Examples:
 *   deleteByIds([{id: 1}, {id: 2}, {id: 3}], [1, 3]) → [{id: 2}]
 *   deleteByIds([{id: 1}, {id: 2}], []) → [{id: 1}, {id: 2}]
 *   deleteByIds([], [1, 2, 3]) → []
 * 
 * 💡 HINTS:
 *   - Keep items where id is NOT in idsToDelete array
 *   - Use !idsToDelete.includes(item.id)
 */

function deleteByIds(items, idsToDelete) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Delete by Condition
// =============================================================================
/**
 * Create a function `deleteCompleted` that:
 * - Takes an array of todo items with 'id', 'text', 'completed'
 * - Returns NEW array with all completed todos removed
 * 
 * @param {Array<{id: number, text: string, completed: boolean}>} todos
 * @returns {Array} - New array with only incomplete todos
 * 
 * Examples:
 *   deleteCompleted([
 *     {id: 1, text: 'Done', completed: true},
 *     {id: 2, text: 'Not Done', completed: false}
 *   ]) → [{id: 2, text: 'Not Done', completed: false}]
 * 
 * 💡 HINTS:
 *   - Keep items where completed is false
 *   - Same as filtering for !completed
 */

function deleteCompleted(todos) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Soft Delete (Mark as Deleted)
// =============================================================================
/**
 * Sometimes we don't want to actually remove items, but mark them as deleted.
 * Create a function `softDelete` that:
 * - Takes an array of items with 'id' and optionally 'isDeleted'
 * - Takes an id to soft-delete
 * - Returns NEW array where the matching item has isDeleted: true
 * - All other items remain unchanged
 * 
 * NOTE: This uses MAP, not filter! But it's related to deletion patterns.
 * 
 * @param {Array<{id: number, isDeleted?: boolean, [key: string]: any}>} items
 * @param {number} idToDelete - ID of item to mark as deleted
 * @returns {Array} - New array with item marked as deleted
 * 
 * Examples:
 *   softDelete([{id: 1, name: 'A'}, {id: 2, name: 'B'}], 1) →
 *     [{id: 1, name: 'A', isDeleted: true}, {id: 2, name: 'B'}]
 * 
 * 💡 HINTS:
 *   - Use map() for this, not filter()
 *   - Spread the item and add isDeleted: true for matching id
 */

function softDelete(items, idToDelete) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// CHALLENGE: Filter Out Soft-Deleted Items
// =============================================================================
/**
 * Create a function `getActiveItems` that:
 * - Takes an array of items that may have 'isDeleted' property
 * - Returns only items that are NOT soft-deleted
 * - Items without isDeleted property are considered active
 * 
 * @param {Array<{id: number, isDeleted?: boolean, [key: string]: any}>} items
 * @returns {Array} - Array of active (non-deleted) items
 * 
 * Examples:
 *   getActiveItems([
 *     {id: 1, name: 'A', isDeleted: true},
 *     {id: 2, name: 'B', isDeleted: false},
 *     {id: 3, name: 'C'}  // no isDeleted property
 *   ]) → [{id: 2, name: 'B', isDeleted: false}, {id: 3, name: 'C'}]
 * 
 * 💡 HINTS:
 *   - Filter where isDeleted is falsy (false, undefined, or missing)
 *   - !item.isDeleted works for all these cases
 */

function getActiveItems(items) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Export functions for testing
// =============================================================================
module.exports = {
    deleteById,
    deleteByIds,
    deleteCompleted,
    softDelete,
    getActiveItems
};
