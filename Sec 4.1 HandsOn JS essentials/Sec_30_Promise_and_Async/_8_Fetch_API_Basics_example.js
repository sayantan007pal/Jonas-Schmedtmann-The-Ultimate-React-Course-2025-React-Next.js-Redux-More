/**
 * Promises & Async/Await Challenge #8
 * ====================================
 * Topic: Fetch API Basics
 * 
 * This exercise tests your understanding of the Fetch API
 * and how to work with network requests using Promises.
 * 
 * NOTE: These exercises simulate fetch behavior for Node.js compatibility.
 * The concepts apply directly to browser fetch() calls.
 */

// =============================================================================
// Simulated Fetch Function (for Node.js testing)
// =============================================================================
/**
 * This simulates the browser's fetch API for testing purposes.
 * In a real browser, you would use the native fetch() function.
 */
function simulatedFetch(url, options = {}) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Simulate different endpoints
            if (url.includes('/users/')) {
                const id = parseInt(url.split('/users/')[1]);
                if (id > 0 && id <= 10) {
                    resolve({
                        ok: true,
                        status: 200,
                        json: () => Promise.resolve({ id, name: `User ${id}`, email: `user${id}@example.com` })
                    });
                } else {
                    resolve({
                        ok: false,
                        status: 404,
                        json: () => Promise.resolve({ error: "User not found" })
                    });
                }
            } else if (url.includes('/posts')) {
                resolve({
                    ok: true,
                    status: 200,
                    json: () => Promise.resolve([
                        { id: 1, title: "Post 1" },
                        { id: 2, title: "Post 2" }
                    ])
                });
            } else if (url.includes('/error')) {
                reject(new Error("Network error"));
            } else {
                resolve({
                    ok: false,
                    status: 404,
                    json: () => Promise.resolve({ error: "Not found" })
                });
            }
        }, 200);
    });
}


// =============================================================================
// Task 1: Basic Fetch with .then()
// =============================================================================
/**
 * Create a function fetchUser(id) that:
 * - Uses simulatedFetch to call `/users/${id}`
 * - Uses .then() to parse the JSON response
 * - Returns the user object
 * 
 * Expected behavior:
 *   fetchUser(1).then(user => console.log(user));
 *   // { id: 1, name: "User 1", email: "user1@example.com" }
 */

function fetchUser(id) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 2: Fetch with async/await
// =============================================================================
/**
 * Create an async function fetchUserAsync(id) that:
 * - Uses simulatedFetch with await to call `/users/${id}`
 * - Parses the JSON response with await
 * - Returns the user object
 * 
 * Expected behavior:
 *   const user = await fetchUserAsync(1);
 *   console.log(user); // { id: 1, name: "User 1", email: "user1@example.com" }
 */

async function fetchUserAsync(id) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// =============================================================================
// Task 3: Handle HTTP Error Status
// =============================================================================
/**
 * Create an async function fetchUserSafe(id) that:
 * - Uses simulatedFetch to call `/users/${id}`
 * - Checks if response.ok is false
 * - If response is not ok, throw an Error with the status
 * - If response is ok, return the parsed JSON
 * 
 * Expected behavior:
 *   await fetchUserSafe(1);   // { id: 1, name: "User 1", ... }
 *   await fetchUserSafe(999); // throws Error: "HTTP error! Status: 404"
 */

async function fetchUserSafe(id) {
    // ==================== YOUR CODE HERE ====================
    
    
    
    // ========================================================
}


// Export for testing
module.exports = {
    simulatedFetch,
    fetchUser,
    fetchUserAsync,
    fetchUserSafe
};
