/**
 * ╔═══════════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    PROMISES & ASYNC/AWAIT - The Complete Interview Guide                              ║
 * ║                     For First-Year CSE Students | Interview Revision Notes                            ║
 * ╚═══════════════════════════════════════════════════════════════════════════════════════════════════════╝
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  📖 WHAT IS A PROMISE?                                                                                  │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * @definition
 * A Promise is an object that represents the EVENTUAL completion (or failure) of an asynchronous operation
 * and its resulting value. It's JavaScript's way of handling operations that take time to complete.
 *
 * @analogy - The Restaurant Order 🍕
 * ┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  Imagine you're at a pizza restaurant:                                                                  │
 * │                                                                                                         │
 * │  1. You ORDER a pizza (you make a request) → This is like calling an async function                   │
 * │                                                                                                         │
 * │  2. The waiter gives you a BUZZER (the Promise) → The buzzer is a "promise" that you'll get pizza     │
 * │     - The buzzer doesn't have pizza yet!                                                               │
 * │     - But it PROMISES the pizza will come                                                              │
 * │                                                                                                         │
 * │  3. While waiting, you can do OTHER THINGS → This is NON-BLOCKING behavior!                           │
 * │     - Check your phone, chat with friends                                                              │
 * │     - You're not frozen, standing at the counter                                                       │
 * │                                                                                                         │
 * │  4. Eventually, the buzzer RESOLVES:                                                                   │
 * │     ✅ FULFILLED: Buzzer vibrates → Pizza is ready! (Promise resolved with data)                      │
 * │     ❌ REJECTED: Waiter says "Sorry, out of dough" → Error occurred (Promise rejected)                │
 * └────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  🔄 THREE STATES OF A PROMISE                                                                           │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 *      ┌─────────────┐         ┌─────────────┐
 *      │  PENDING    │ ──────▶ │  FULFILLED  │  (Success! Here's your data)
 *      │  (Waiting)  │         └─────────────┘
 *      └──────┬──────┘
 *             │
 *             └──────────────▶ ┌─────────────┐
 *                              │  REJECTED   │  (Error! Something went wrong)
 *                              └─────────────┘
 *
 *  PENDING   → Initial state, neither fulfilled nor rejected (pizza is cooking)
 *  FULFILLED → Operation completed successfully (pizza delivered!)
 *  REJECTED  → Operation failed (oven broke, no pizza tonight)
 *
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  ⚙️ HOW PROMISES WORK UNDER THE HOOD                                                                    │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * JavaScript is SINGLE-THREADED (can do one thing at a time), but uses:
 *
 *    ┌───────────────────────────────────────────────────────────────────────────────────────────┐
 *    │                           THE EVENT LOOP ARCHITECTURE                                     │
 *    │                                                                                           │
 *    │   ┌─────────────┐    ┌─────────────────┐    ┌──────────────────┐    ┌───────────────┐   │
 *    │   │ CALL STACK  │    │   WEB APIs      │    │ CALLBACK QUEUE   │    │ MICROTASK     │   │
 *    │   │ (Your code) │    │ (fetch, timers) │    │ (setTimeout etc) │    │ QUEUE         │   │
 *    │   └──────┬──────┘    └────────┬────────┘    └────────┬─────────┘    │ (.then, await)│   │
 *    │          │                    │                      │              └───────┬───────┘   │
 *    │          └─────────────┬──────┴──────────────────────┴──────────────────────┘           │
 *    │                        ▼                                                                 │
 *    │                  ┌──────────────┐                                                        │
 *    │                  │  EVENT LOOP  │  ← Continuously checks: "Is the stack empty?         │
 *    │                  │              │    If yes, grab next task from queues"               │
 *    │                  └──────────────┘                                                        │
 *    └───────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * @execution_order (IMPORTANT FOR INTERVIEWS!)
 *
 * 1. Synchronous code runs FIRST (Call Stack)
 * 2. Microtask Queue runs NEXT (Promises - .then(), await)      ← HIGHER PRIORITY!
 * 3. Callback Queue runs LAST (setTimeout, setInterval)         ← LOWER PRIORITY
 *
 * @example_execution_order
 * ```javascript
 * console.log("1");                           // Sync - runs first
 * setTimeout(() => console.log("2"), 0);      // Callback Queue - runs last!
 * Promise.resolve().then(() => console.log("3")); // Microtask Queue - runs second
 * console.log("4");                           // Sync - runs first
 *
 * // OUTPUT: 1, 4, 3, 2  (NOT 1, 4, 2, 3!)
 * ```
 *
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  🎯 CREATING AND CONSUMING PROMISES                                                                     │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * @creating_a_promise (The Producer)
 * ```javascript
 * const myPromise = new Promise((resolve, reject) => {
 *     // Simulate async operation (like fetching data)
 *     const success = true;
 *     
 *     setTimeout(() => {
 *         if (success) {
 *             resolve("Here's your data! 🎉");  // Fulfills the promise
 *         } else {
 *             reject("Something went wrong! 💥"); // Rejects the promise
 *         }
 *     }, 2000);
 * });
 * ```
 *
 * @consuming_a_promise (The Consumer)
 *
 * METHOD 1: Using .then() and .catch() (Traditional Way)
 * ```javascript
 * myPromise
 *     .then(data => console.log(data))     // Runs if fulfilled
 *     .catch(error => console.log(error))  // Runs if rejected
 *     .finally(() => console.log("Done")); // Runs either way
 * ```
 *
 * METHOD 2: Using async/await (Modern Way - Cleaner!)
 * ```javascript
 * async function getData() {
 *     try {
 *         const data = await myPromise;     // Waits for promise to resolve
 *         console.log(data);
 *     } catch (error) {
 *         console.log(error);               // Catches rejection
 *     }
 * }
 * ```
 *
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  ✨ ASYNC/AWAIT - SYNTACTIC SUGAR FOR PROMISES                                                          │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * @what_is_async
 * The `async` keyword before a function does TWO things:
 *   1. ALWAYS returns a Promise (even if you return a plain value!)
 *   2. Allows you to use `await` inside it
 *
 * @what_is_await
 * The `await` keyword:
 *   1. PAUSES the function execution until the Promise resolves
 *   2. Extracts the resolved VALUE from the Promise
 *   3. Makes async code LOOK synchronous (easier to read!)
 *
 * @analogy - The Vending Machine 🥤
 * ┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  Without await: You put money in, the machine gives you a TICKET saying "drink coming"               │
 * │                 You walk away with the ticket, not the drink!                                         │
 * │                                                                                                        │
 * │  With await:    You put money in and WAIT at the machine until the drink drops                        │
 * │                 You walk away with the ACTUAL DRINK!                                                   │
 * └────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * @comparison
 * ┌─────────────────────────────────────────┬──────────────────────────────────────────────────────────────┐
 * │         .then() chains                   │              async/await                                     │
 * ├─────────────────────────────────────────┼──────────────────────────────────────────────────────────────┤
 * │  fetch(url)                             │  const response = await fetch(url);                         │
 * │    .then(res => res.json())             │  const data = await response.json();                        │
 * │    .then(data => console.log(data))     │  console.log(data);                                         │
 * │    .catch(err => console.log(err));     │  // Much cleaner and readable!                              │
 * └─────────────────────────────────────────┴──────────────────────────────────────────────────────────────┘
 *
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  🌐 THE FETCH API - Making HTTP Requests                                                                │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * @what_is_fetch
 * fetch() is a built-in browser API for making HTTP requests.
 * It returns a Promise that resolves to a Response object.
 *
 * @key_concept - TWO AWAITS ARE NEEDED!
 * ┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │                                                                                                        │
 * │  fetch(url)  ──────────▶  Promise<Response>  ──────────▶  response.json()  ──────────▶ Promise<Data>  │
 * │                               │                                                           │            │
 * │                               ▼                                                           ▼            │
 * │                       FIRST await:                                                SECOND await:        │
 * │                   Gets the Response object                                    Gets the actual data     │
 * │                   (like getting an envelope)                                  (opening the envelope)   │
 * │                                                                                                        │
 * └────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * @analogy - The Mail Delivery 📬
 * ┌────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  Think of fetch() like receiving a letter:                                                             │
 * │                                                                                                        │
 * │  1st await (fetch):      The postman hands you the ENVELOPE (Response object)                         │
 * │                          - You have the envelope, but haven't read the letter inside yet              │
 * │                          - The envelope has metadata: status code, headers, etc.                      │
 * │                                                                                                        │
 * │  2nd await (.json()):    You OPEN the envelope and READ the letter (parse to JSON)                    │
 * │                          - Now you have the actual content/data!                                       │
 * │                          - This is also async because reading takes time                              │
 * └────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  ⚡ WHY ASYNC FUNCTIONS ALWAYS RETURN PROMISES                                                          │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * @critical_concept
 * An async function ALWAYS wraps its return value in a Promise!
 *
 * ```javascript
 * async function getValue() {
 *     return 42;  // You return a number...
 * }
 *
 * const result = getValue();
 * console.log(result);  // Promise { 42 } - But you GET a Promise!
 *
 * // To get the actual value:
 * getValue().then(value => console.log(value));  // 42
 * // OR
 * const value = await getValue();  // 42 (inside another async function)
 * ```
 *
 * @why_this_matters
 * In the code below, `promiseTesting()` returns a Promise, NOT the data!
 * So `console.log(todos)` prints `Promise { <pending> }`, not the actual todos.
 *
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  🚨 ERROR HANDLING - try/catch vs .catch()                                                              │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * With async/await, use try/catch (just like in Java or Python!):
 *
 * ```javascript
 * async function fetchData() {
 *     try {
 *         const response = await fetch(url);
 *         if (!response.ok) {
 *             throw new Error(`HTTP error! Status: ${response.status}`);
 *         }
 *         const data = await response.json();
 *         return data;
 *     } catch (error) {
 *         console.error("Failed to fetch:", error.message);
 *         // Handle the error appropriately
 *     }
 * }
 * ```
 *
 * @important_note
 * fetch() only rejects on NETWORK errors (no internet, server unreachable)
 * It does NOT reject for HTTP errors (404, 500, etc.)
 * You must manually check `response.ok` or `response.status`!
 *
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  ❓ ANSWERING YOUR QUESTION: When do we need req/res?                                                   │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * @answer
 * req (request) and res (response) are SERVER-SIDE concepts!
 *
 * ┌────────────────────────────────────────┬──────────────────────────────────────────────────────────────┐
 * │   CLIENT-SIDE (This code - Browser)    │            SERVER-SIDE (Node.js/Express)                    │
 * ├────────────────────────────────────────┼──────────────────────────────────────────────────────────────┤
 * │  - Uses fetch() to MAKE requests       │  - Uses req/res to HANDLE requests                          │
 * │  - You ARE the customer ordering pizza │  - You ARE the restaurant receiving orders                  │
 * │  - You send requests, receive data     │  - You receive requests (req), send back data (res)         │
 * │                                        │                                                              │
 * │  fetch('api/users')  // Send request   │  app.get('/api/users', (req, res) => {                      │
 * │    .then(res => ...) // Handle response│      res.json(users);  // Send response                     │
 * │                                        │  });                                                         │
 * └────────────────────────────────────────┴──────────────────────────────────────────────────────────────┘
 *
 * @example_with_req_res (Express.js server)
 * ```javascript
 * // This runs on a SERVER (Node.js with Express)
 * const express = require('express');
 * const app = express();
 *
 * app.get('/api/todos', (req, res) => {
 *     //  req = incoming request (has query params, headers, body, etc.)
 *     //  res = what you send back to the client
 *     
 *     console.log(req.query);     // { limit: '10' } if URL was /api/todos?limit=10
 *     console.log(req.headers);   // { authorization: 'Bearer token...' }
 *     
 *     res.status(200).json([      // Send JSON response to client
 *         { id: 1, task: "Learn Promises" },
 *         { id: 2, task: "Master async/await" }
 *     ]);
 * });
 * ```
 *
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │  📝 INTERVIEW CHEAT SHEET                                                                               │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * ✅ Promise = An object representing eventual completion/failure of async operation
 * ✅ Three states: Pending → Fulfilled OR Rejected
 * ✅ async = Makes function return a Promise + allows await
 * ✅ await = Pauses until Promise resolves, extracts the value
 * ✅ fetch() returns Promise<Response>, need two awaits for JSON data
 * ✅ Microtasks (Promises) run before Callback Queue (setTimeout)
 * ✅ fetch() doesn't reject on 404/500, only on network errors
 * ✅ req/res = Server-side (Express), fetch = Client-side (Browser)
 *
 * @common_interview_questions
 * Q1: "What are the states of a Promise?"
 * A1: Pending, Fulfilled, and Rejected. Once settled (fulfilled/rejected), it's immutable.
 *
 * Q2: "Difference between .then() and async/await?"
 * A2: Same functionality, but async/await has cleaner syntax and easier error handling with try/catch.
 *
 * Q3: "What does await do?"
 * A3: Pauses async function execution until Promise resolves, then returns the resolved value.
 *
 * Q4: "Why does calling an async function return a Promise?"
 * A4: Because the function might contain await statements that take time; the Promise lets the 
 *     caller know when the result is ready.
 *
 * Q5: "What's the output of this code?"
 *     console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);
 * A5: 1, 4, 3, 2 — Microtasks (Promises) run before Callback Queue (setTimeout)!
 *
 */

// ═══════════════════════════════════════════════════════════════════════════
// 🎯 PRACTICAL EXAMPLE: Fetching Data with Async/Await
// ═══════════════════════════════════════════════════════════════════════════

const promiseTesting = async () => {
    try {
        // 📬 FIRST AWAIT: Get the Response object (the "envelope")
        // fetch() makes an HTTP GET request and returns a Promise<Response>
        let response = await fetch('https://jsonplaceholder.typicode.com/todos');
        
        // 📖 SECOND AWAIT: Parse the JSON body (open the "envelope" and read the "letter")
        // response.json() returns a Promise<Data>, so we need another await!
        // ❌ WRONG: await res.json(fetchingData)  ← 'res' doesn't exist here!
        // ✅ CORRECT: await response.json()       ← call .json() on the fetch response
        let receivedData = await response.json();
        
        console.log(receivedData);  // Now we have the actual data!
        return receivedData;        // This gets wrapped in a Promise automatically!
        
    } catch (err) {
        // 🚨 Catches both network errors AND our thrown errors
        console.log(`Response not received: ${err}`);
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧪 DEMONSTRATING THE PROMISE BEHAVIOR
// ═══════════════════════════════════════════════════════════════════════════

console.log(`Fetching Data ....`);  // This runs FIRST (synchronous)

const todos = promiseTesting();      // This STARTS the fetch but doesn't wait
console.log(todos);                  // This prints Promise { <pending> }!
                                     // Because async function returns a Promise immediately

// 💡 TO GET THE ACTUAL DATA, you need to either:

// Option 1: Use .then() 
// promiseTesting().then(data => console.log("Actual data:", data));

// Option 2: Use await (inside another async function or top-level await)
// (async () => {
//     const data = await promiseTesting();
//     console.log("Actual data:", data);
// })();