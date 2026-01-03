/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                    🚀 JAVASCRIPT ARRAY METHODS & IMMUTABILITY - INTERVIEW GUIDE 🚀                ║
 * ║              Essential Concepts for React Development (First-Year CSE Student Edition)             ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 📌 TABLE OF CONTENTS
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 1. Overview & Why This Matters for React
 * 2. Array.map() - The Transformer
 * 3. Array.filter() - The Selector
 * 4. Array.reduce() - The Accumulator
 * 5. Array.sort() - The Organizer
 * 6. Immutable Array Operations (Add, Delete, Update)
 * 7. Method Chaining
 * 8. Interview Cheat Sheet
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 1️⃣ OVERVIEW: WHY THESE METHODS MATTER FOR REACT
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 *
 * 🎯 THE BIG PICTURE:
 * React is all about rendering UI based on data (state). When data changes, React re-renders.
 * These array methods are the BACKBONE of data manipulation in React:
 *   - map()    → Rendering lists of components (90% of React lists use this!)
 *   - filter() → Conditional rendering, hiding/showing items
 *   - reduce() → Computing derived state (totals, aggregates)
 *   - sort()   → Ordering data for display
 *
 * 🔑 KEY PRINCIPLE: IMMUTABILITY
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ React needs to DETECT changes to trigger re-renders. If you mutate arrays directly,            │
 * │ React can't tell something changed (same memory reference = "no change" to React).             │
 * │                                                                                                 │
 * │ ANALOGY: Imagine React is a security guard checking ID cards. If you hand back the SAME       │
 * │ card (same memory reference), the guard says "already checked, nothing new." But if you        │
 * │ hand a NEW card (new array reference), the guard inspects it fresh. That's why we ALWAYS      │
 * │ create new arrays instead of modifying existing ones!                                          │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 2️⃣ ARRAY.MAP() - THE TRANSFORMER 🔄
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 *
 * 📖 DEFINITION:
 * Creates a NEW array by applying a function to EVERY element of the original array.
 * Original array remains UNCHANGED (immutable operation).
 *
 * 🎭 ANALOGY - THE FACTORY ASSEMBLY LINE:
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ Imagine a factory where raw materials enter on a conveyor belt. Each item passes through       │
 * │ a TRANSFORMATION MACHINE that converts it into a finished product.                             │
 * │                                                                                                 │
 * │   RAW INPUT:    🥔 → 🥔 → 🥔 → 🥔 → 🥔   (potatoes)                                            │
 * │                      ⬇ [TRANSFORMATION MACHINE: slice & fry]                                   │
 * │   OUTPUT:       🍟 → 🍟 → 🍟 → 🍟 → 🍟   (french fries)                                        │
 * │                                                                                                 │
 * │ map() is that transformation machine - same number of items in, same number out,               │
 * │ but each item is TRANSFORMED according to your function!                                       │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * 🔧 SYNTAX:
 *   array.map((currentElement, index, originalArray) => transformedValue)
 *   - currentElement: The item being processed (MOST COMMONLY USED)
 *   - index: Position in array (optional, useful for keys in React)
 *   - originalArray: Reference to the array being mapped (rarely used)
 *
 * 🔬 UNDER THE HOOD - HOW IT WORKS:
 * When you call array.map(callback):
 *
 *   function map(callback) {
 *     const result = [];                    // Step 1: Create empty NEW array
 *     for (let i = 0; i < this.length; i++) {
 *       const transformed = callback(this[i], i, this);  // Step 2: Call your function
 *       result.push(transformed);           // Step 3: Add result to new array
 *     }
 *     return result;                        // Step 4: Return the NEW array
 *   }
 *
 * MEMORY VISUALIZATION:
 *   Original:  [📚, 📚, 📚, 📚, 📚]  ← Memory Address: 0x001 (UNTOUCHED!)
 *                      ⬇ map()
 *   New Array: [📖, 📖, 📖, 📖, 📖]  ← Memory Address: 0x002 (BRAND NEW!)
 *
 * 💻 CODE EXAMPLES FROM THIS FILE:
 *
 * EXAMPLE 1 - Simple transformation:
 *   const x = [1, 2, 3, 4, 5].map((el) => el * 2);
 *   // Result: [2, 4, 6, 8, 10]
 *   // Each number is doubled - transformation applied to every element
 *
 * EXAMPLE 2 - Extracting properties:
 *   const titles = books.map((book) => book.title);
 *   // Result: ["The Lord of the Rings", "The Cyberiad", "Dune", ...]
 *   // Transforms array of objects → array of strings
 *
 * EXAMPLE 3 - Creating new object structure:
 *   const essentialData = books.map((book) => ({
 *     title: book.title,
 *     author: book.author,
 *     reviewsCount: getReviewCount1(book)
 *   }));
 *   // Transforms complex objects → simplified objects with only needed fields
 *
 * 🔗 REACT CONNECTION:
 *   // This is how you render lists in React - map() is ESSENTIAL!
 *   function BookList({ books }) {
 *     return (
 *       <ul>
 *         {books.map((book, index) => (
 *           <li key={book.id}>{book.title}</li>  // map transforms data → JSX
 *         ))}
 *       </ul>
 *     );
 *   }
 *
 * ⚠️ COMMON MISTAKES:
 *   ❌ Forgetting to return (in block body): books.map(book => { book.title })  // Returns [undefined, undefined, ...]
 *   ✅ With return: books.map(book => { return book.title; })
 *   ✅ Or implicit return: books.map(book => book.title)
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 3️⃣ ARRAY.FILTER() - THE SELECTOR 🎯
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 *
 * 📖 DEFINITION:
 * Creates a NEW array containing ONLY elements that pass a test (return true from callback).
 * Original array remains UNCHANGED (immutable operation).
 *
 * 🎭 ANALOGY - THE BOUNCER AT A CLUB:
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ Imagine a nightclub bouncer checking IDs at the door. The bouncer has ONE rule              │
 * │ (your callback function). Each person in line is checked:                                     │
 * │   ✅ Pass the test → You're IN (included in new array)                                        │
 * │   ❌ Fail the test → You're OUT (excluded from new array)                                     │
 * │                                                                                                 │
 * │   LINE OF PEOPLE:  👦 → 👨 → 👧 → 👴 → 👩   (ages: 16, 25, 17, 45, 22)                        │
 * │                            ⬇ [BOUNCER: age >= 21?]                                            │
 * │   ALLOWED IN:           👨 →      👴 → 👩   (only 25, 45, 22 year-olds)                       │
 * │                                                                                                 │
 * │ filter() is the bouncer - might let fewer people in than came, but never more!                │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * 🔧 SYNTAX:
 *   array.filter((currentElement, index, originalArray) => booleanCondition)
 *   - Return TRUE → element is INCLUDED
 *   - Return FALSE → element is EXCLUDED
 *
 * 🔬 UNDER THE HOOD - HOW IT WORKS:
 *
 *   function filter(callback) {
 *     const result = [];                    // Step 1: Create empty NEW array
 *     for (let i = 0; i < this.length; i++) {
 *       if (callback(this[i], i, this)) {   // Step 2: Test each element
 *         result.push(this[i]);             // Step 3: Only add if TRUE
 *       }
 *     }
 *     return result;                        // Step 4: Return filtered array
 *   }
 *
 * KEY INSIGHT: filter() may return an array with:
 *   - Same length (all elements pass)
 *   - Zero length (no elements pass) → returns []
 *   - Anywhere in between
 *
 * 💻 CODE EXAMPLES FROM THIS FILE:
 *
 * EXAMPLE 1 - Simple condition:
 *   const shortBooks = books.filter((book) => book.pages < 500);
 *   // Only keeps books with fewer than 500 pages
 *
 * EXAMPLE 2 - Filter chaining (multiple conditions):
 *   const longBooks = books.filter((book) => book.pages > 500)
 *                          .filter((book) => book.hasMovieAdaptation);
 *   // First filter: pages > 500
 *   // Second filter: has movie → BOTH conditions must be true
 *   // Equivalent to: books.filter(book => book.pages > 500 && book.hasMovieAdaptation)
 *
 * EXAMPLE 3 - filter + map chaining:
 *   const adventureBooks = books
 *     .filter((book) => book.genres.includes("adventure"))
 *     .map((book) => book.title);
 *   // Step 1: Filter to only adventure books
 *   // Step 2: Extract just the titles from those books
 *
 * EXAMPLE 4 - Deleting items immutably (CRITICAL FOR REACT):
 *   const booksAfterDelete = books.filter((book) => book.id !== 3);
 *   // "Delete" book with id 3 by creating new array WITHOUT it
 *   // Original 'books' array is UNCHANGED!
 *
 * 🔗 REACT CONNECTION:
 *   // Conditional rendering based on data
 *   function CompletedTodos({ todos }) {
 *     const completedTodos = todos.filter(todo => todo.completed);
 *     return <ul>{completedTodos.map(todo => <li>{todo.text}</li>)}</ul>;
 *   }
 *
 *   // State update (immutable delete)
 *   const handleDelete = (idToDelete) => {
 *     setBooks(prevBooks => prevBooks.filter(book => book.id !== idToDelete));
 *   };
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 4️⃣ ARRAY.REDUCE() - THE ACCUMULATOR 📊
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 *
 * 📖 DEFINITION:
 * Reduces an array to a SINGLE VALUE by applying a function against an accumulator.
 * Think of it as "boiling down" an array into one result.
 *
 * 🎭 ANALOGY - THE SNOWBALL EFFECT:
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ Imagine rolling a snowball down a snowy hill. At each point, the snowball (accumulator)        │
 * │ picks up more snow (current element) and gets bigger:                                          │
 * │                                                                                                 │
 * │   🏔️ Start with initial snowball (initial value: 0)                                           │
 * │       ⬇                                                                                        │
 * │   ⚪ + ❄️(1216 pages) = 🔵 (snowball now: 1216)                                                │
 * │       ⬇                                                                                        │
 * │   🔵 + ❄️(295 pages) = 🔷 (snowball now: 1511)                                                 │
 * │       ⬇                                                                                        │
 * │   🔷 + ❄️(658 pages) = 💎 (snowball now: 2169)                                                 │
 * │       ⬇ ... continues until all elements processed                                            │
 * │   🌐 Final giant snowball = 3227 (total pages!)                                                │
 * │                                                                                                 │
 * │ reduce() is the snowball - it accumulates everything into ONE final result!                   │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * 🔧 SYNTAX:
 *   array.reduce((accumulator, currentElement, index, originalArray) => newAccumulator, initialValue)
 *   - accumulator: The "snowball" that grows with each iteration
 *   - currentElement: The current item being processed
 *   - initialValue: What the accumulator starts as (ALWAYS PROVIDE THIS!)
 *
 * 🔬 UNDER THE HOOD - HOW IT WORKS:
 *
 *   function reduce(callback, initialValue) {
 *     let accumulator = initialValue;       // Step 1: Start with initial value
 *     for (let i = 0; i < this.length; i++) {
 *       accumulator = callback(             // Step 2: Update accumulator each iteration
 *         accumulator,                      // Previous accumulated value
 *         this[i],                          // Current element
 *         i,                                // Current index
 *         this                              // Original array
 *       );
 *     }
 *     return accumulator;                   // Step 3: Return final accumulated value
 *   }
 *
 * STEP-BY-STEP EXECUTION:
 *   books.reduce((sum, book) => sum + book.pages, 0)
 *
 *   Iteration 0: sum = 0,    book.pages = 1216 → return 0 + 1216 = 1216
 *   Iteration 1: sum = 1216, book.pages = 295  → return 1216 + 295 = 1511
 *   Iteration 2: sum = 1511, book.pages = 658  → return 1511 + 658 = 2169
 *   Iteration 3: sum = 2169, book.pages = 223  → return 2169 + 223 = 2392
 *   Iteration 4: sum = 2392, book.pages = 835  → return 2392 + 835 = 3227
 *   Final result: 3227
 *
 * 💻 CODE EXAMPLES FROM THIS FILE:
 *
 *   const addPagesOfAllBooks = books.reduce((sum, eachBook) => sum + eachBook.pages, 0);
 *   // Result: 3227 (total pages across all books)
 *
 * 🎯 POWERFUL USE CASES:
 *
 *   // 1. Summing values
 *   const total = [10, 20, 30].reduce((sum, n) => sum + n, 0); // 60
 *
 *   // 2. Finding max/min
 *   const max = [5, 2, 9, 1].reduce((max, n) => n > max ? n : max, -Infinity); // 9
 *
 *   // 3. Counting occurrences (object as accumulator!)
 *   const count = ['a', 'b', 'a', 'c', 'a'].reduce((acc, char) => {
 *     acc[char] = (acc[char] || 0) + 1;
 *     return acc;
 *   }, {}); // {a: 3, b: 1, c: 1}
 *
 *   // 4. Flattening arrays
 *   const flat = [[1, 2], [3, 4]].reduce((acc, arr) => [...acc, ...arr], []); // [1, 2, 3, 4]
 *
 *   // 5. Grouping by property
 *   const byAuthor = books.reduce((groups, book) => {
 *     (groups[book.author] = groups[book.author] || []).push(book);
 *     return groups;
 *   }, {});
 *
 * ⚠️ COMMON MISTAKE:
 *   ❌ Forgetting initial value: [].reduce((sum, n) => sum + n);  // TypeError!
 *   ✅ Always provide initial value: [].reduce((sum, n) => sum + n, 0);  // Returns 0
 *
 * 🔗 REACT CONNECTION:
 *   // Calculate totals for shopping cart
 *   const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 5️⃣ ARRAY.SORT() - THE ORGANIZER 📋
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 *
 * 📖 DEFINITION:
 * Sorts the elements of an array IN PLACE (MUTATES the original array!).
 * Returns the sorted array (same reference, not a copy).
 *
 * ⚠️ CRITICAL WARNING - MUTATION ALERT!
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ Unlike map() and filter(), sort() MODIFIES the original array!                                 │
 * │ This is DANGEROUS in React because it won't trigger re-renders properly.                      │
 * │                                                                                                 │
 * │ SOLUTION: Always create a copy FIRST, then sort the copy:                                      │
 * │   ✅ const sorted = [...array].sort()      // Spread operator copy                            │
 * │   ✅ const sorted = array.slice().sort()   // slice() copy                                    │
 * │   ❌ array.sort()  // Danger! Mutates original!                                               │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * 🎭 ANALOGY - COMPARING TWO STUDENTS' TEST SCORES:
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ Imagine you're a teacher arranging students by test scores. You compare TWO students           │
 * │ at a time and decide who goes first:                                                           │
 * │                                                                                                 │
 * │   Compare(Alice: 85, Bob: 92):                                                                 │
 * │     - If Alice - Bob = 85 - 92 = -7 (NEGATIVE) → Alice comes FIRST (ascending)                │
 * │     - If Bob - Alice = 92 - 85 = +7 (POSITIVE) → Bob comes FIRST (ascending)                  │
 * │     - If same score = 0 → Order doesn't change                                                │
 * │                                                                                                 │
 * │   THE RULE:                                                                                    │
 * │     (a, b) => a - b  →  ASCENDING  (small → big)  [negative keeps a first]                   │
 * │     (a, b) => b - a  →  DESCENDING (big → small)  [positive swaps order]                     │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * 🔧 SYNTAX:
 *   array.sort((a, b) => comparisonResult)
 *   - Return NEGATIVE: a comes before b (keep order)
 *   - Return POSITIVE: b comes before a (swap order)
 *   - Return ZERO: order doesn't matter
 *
 * 🔬 UNDER THE HOOD - HOW THE COMPARE FUNCTION WORKS:
 *
 *   // For ascending order: (a, b) => a - b
 *   [64, 11, 4].sort((a, b) => a - b);
 *
 *   // JavaScript picks pairs and compares them:
 *   Compare(64, 11): 64 - 11 = 53 (positive) → swap! Now: [11, 64, 4]
 *   Compare(64, 4):  64 - 4 = 60 (positive) → swap! Now: [11, 4, 64]
 *   Compare(11, 4):  11 - 4 = 7 (positive)  → swap! Now: [4, 11, 64]
 *   // Multiple passes until fully sorted...
 *
 *   // For descending: (a, b) => b - a (just reverse the subtraction!)
 *   Compare(11, 64): 64 - 11 = 53 (positive) → swap! [64, 11, ...] ← 64 stays first
 *
 * 💻 CODE EXAMPLES FROM THIS FILE:
 *
 * EXAMPLE 1 - Ascending sort (with copy):
 *   const xx = [11, 4, 6, 2, 87, 5, 64, 3, 5, 6];
 *   const shallowCopyOfXxAsc = [...xx];  // Create copy FIRST!
 *   shallowCopyOfXxAsc.sort((small, big) => small - big);
 *   // Result: [2, 3, 4, 5, 5, 6, 6, 11, 64, 87]
 *   // Original xx is UNTOUCHED!
 *
 * EXAMPLE 2 - Descending sort:
 *   const shallowCopyOfXxDesc = [...xx];
 *   shallowCopyOfXxDesc.sort((small, big) => big - small);
 *   // Result: [87, 64, 11, 6, 6, 5, 5, 4, 3, 2]
 *
 * EXAMPLE 3 - Sorting objects by property:
 *   const sortedByPages = books.slice().sort((a, b) => a.pages - b.pages);
 *   // Sorts books from shortest to longest
 *   // Note: We access a.pages and b.pages, not just a and b!
 *
 * 🔗 REACT CONNECTION:
 *   // Always copy before sorting in React!
 *   const handleSortByPrice = () => {
 *     setProducts(prevProducts => [...prevProducts].sort((a, b) => a.price - b.price));
 *   };
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 6️⃣ IMMUTABLE ARRAY OPERATIONS - ADD, DELETE, UPDATE 🔐
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 *
 * 📖 WHY IMMUTABILITY?
 * In React, state should NEVER be mutated directly. Instead, we create NEW arrays/objects.
 * This allows React to detect changes (by comparing memory references) and trigger re-renders.
 *
 * 🎭 ANALOGY - THE PHOTO ALBUM:
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ Think of your state as a photo album. Instead of erasing/modifying existing photos:            │
 * │                                                                                                 │
 * │   MUTABLE (BAD):                                                                               │
 * │   📕 Original Album → ✂️ Cut out photo → 📕 Same album modified                               │
 * │   (React: "Same album? Nothing changed!")                                                      │
 * │                                                                                                 │
 * │   IMMUTABLE (GOOD):                                                                            │
 * │   📕 Original Album → 📷 Copy all photos → 📗 New album (sans one photo)                      │
 * │   (React: "NEW album! Something changed! Re-render!")                                          │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ OPERATION    │ MUTABLE (AVOID!)        │ IMMUTABLE (USE THIS!)                                 │
 * │──────────────│─────────────────────────│────────────────────────────────────────────────────────│
 * │ ADD          │ array.push(item)        │ [...array, newItem]                                   │
 * │ DELETE       │ array.splice(i, 1)      │ array.filter(item => item.id !== idToDelete)         │
 * │ UPDATE       │ array[i] = newValue     │ array.map(item => item.id === id ? {...item, ...updates} : item) │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * 💻 CODE EXAMPLES FROM THIS FILE:
 *
 * ADDING AN ITEM:
 *   const newBook = { id: 6, title: "The Last Kingdom", ... };
 *   const booksAfterAddingNewBook = [...books, newBook];
 *   // Spread all existing books, then add newBook at the end
 *   // To add at beginning: [newBook, ...books]
 *
 * DELETING AN ITEM:
 *   const booksAfterDeletingBook = booksAfterAddingNewBook.filter((book) => book.id !== 3);
 *   // Creates new array with all books EXCEPT the one with id 3
 *
 * UPDATING AN ITEM:
 *   const booksAfterUpdatingBook = booksAfterDeletingBook.map((book) =>
 *     book.id === 6 ? { ...book, pages: 100000000 } : book
 *   );
 *   // For each book:
 *   //   - If id is 6: Create new object with all properties + updated pages
 *   //   - Otherwise: Return the original book unchanged
 *
 * 🔬 UNDER THE HOOD - SPREAD OPERATOR FOR UPDATES:
 *   { ...book, pages: 100000000 }
 *
 *   // This is equivalent to:
 *   Object.assign({}, book, { pages: 100000000 });
 *
 *   // Memory-wise:
 *   book = { id: 6, title: "The Last Kingdom", pages: 823, ... }  // Address: 0x001
 *   { ...book, pages: 100000000 }                                  // Address: 0x002 (NEW!)
 *   // All properties copied, but 'pages' is overwritten with new value
 *
 * 🔗 REACT CONNECTION:
 *   // React state updates using these patterns
 *   const [books, setBooks] = useState(initialBooks);
 *
 *   // Add
 *   const handleAddBook = (newBook) => {
 *     setBooks(prevBooks => [...prevBooks, newBook]);
 *   };
 *
 *   // Delete
 *   const handleDeleteBook = (bookId) => {
 *     setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId));
 *   };
 *
 *   // Update
 *   const handleUpdateBook = (bookId, updates) => {
 *     setBooks(prevBooks => prevBooks.map(book =>
 *       book.id === bookId ? { ...book, ...updates } : book
 *     ));
 *   };
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 7️⃣ METHOD CHAINING ⛓️
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 *
 * 📖 DEFINITION:
 * Since map(), filter(), slice(), etc. return NEW arrays, you can call another method immediately
 * on the result. This creates a "chain" of operations.
 *
 * 🎭 ANALOGY - THE ASSEMBLY LINE:
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ Think of a manufacturing assembly line where products pass through multiple stations:          │
 * │                                                                                                 │
 * │   RAW DATA:  [🥩, 🥬, 🥩, 🧀, 🥬, 🥩]                                                          │
 * │                      ⬇ .filter(item => item === 🥩)                                           │
 * │   STATION 1: [🥩, 🥩, 🥩]           ← Only meat passes through                                │
 * │                      ⬇ .map(meat => 🍔)                                                        │
 * │   STATION 2: [🍔, 🍔, 🍔]           ← Each meat becomes a burger                              │
 * │                      ⬇ .sort((a, b) => a.size - b.size)                                        │
 * │   STATION 3: [🍔, 🍔, 🍔]           ← Sorted by size                                          │
 * │                                                                                                 │
 * │   Each station outputs something the next station can work on!                                 │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * 💻 CODE EXAMPLE FROM THIS FILE:
 *   const adventureBooks = books
 *     .filter((book) => book.genres.includes("adventure"))  // Step 1: Filter adventure books
 *     .map((book) => book.title);                           // Step 2: Extract just titles
 *
 *   // Data flow:
 *   // books (5 items) → filter → (3 adventure books) → map → ["Lord of the Rings", "Dune", "Harry Potter"]
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 8️⃣ INTERVIEW CHEAT SHEET 📝
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 *
 * ┌─────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ METHOD   │ RETURNS       │ MUTATES? │ USE WHEN                                                 │
 * │──────────│───────────────│──────────│──────────────────────────────────────────────────────────│
 * │ map()    │ New array     │ No ✅    │ Transform each element                                   │
 * │ filter() │ New array     │ No ✅    │ Keep elements matching condition                         │
 * │ reduce() │ Single value  │ No ✅    │ Compute aggregate (sum, count, group)                   │
 * │ sort()   │ Same array*   │ YES ⚠️   │ Order elements (* use copy first!)                      │
 * │ find()   │ Single element│ No ✅    │ Get first match                                          │
 * │ some()   │ Boolean       │ No ✅    │ Check if ANY element passes test                        │
 * │ every()  │ Boolean       │ No ✅    │ Check if ALL elements pass test                         │
 * └─────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * 🎯 QUICK DECISION FLOWCHART:
 *
 *   "What do I need from this array?"
 *           │
 *           ├── Same number of items, but transformed? → map()
 *           │
 *           ├── Fewer items based on condition? → filter()
 *           │
 *           ├── One computed value (sum, max, object)? → reduce()
 *           │
 *           ├── Items in different order? → slice().sort() or [...arr].sort()
 *           │
 *           ├── Just one specific item? → find()
 *           │
 *           └── Just checking if something exists? → some() or every()
 *
 * 🔥 COMMON INTERVIEW QUESTIONS:
 *
 * Q1: "What's the difference between map() and forEach()?"
 * A: map() returns a NEW array with transformed values; forEach() returns undefined (just executes side effects).
 *
 * Q2: "Why is sort() dangerous in React?"
 * A: It mutates the original array. React compares references; same reference = no re-render detected.
 *
 * Q3: "How do you delete an item from array immutably?"
 * A: Use filter(): arr.filter(item => item.id !== idToDelete)
 *
 * Q4: "Can you implement map() using reduce()?"
 * A: Yes! arr.reduce((acc, item) => [...acc, transform(item)], [])
 *
 * Q5: "What happens if you call reduce() on empty array without initial value?"
 * A: TypeError! Always provide initial value.
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 * 🏁 SUMMARY - THE BIG PICTURE
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 *
 *   🔄 map()    = Transform each item (same count, new values)
 *   🎯 filter() = Select items (might have fewer items)
 *   📊 reduce() = Combine into one result (total, object, array)
 *   📋 sort()   = Reorder (ALWAYS copy first!)
 *
 *   🔑 Golden Rule: NEVER mutate arrays in React. Always return NEW arrays/objects!
 *
 *   📚 These methods are the BREAD AND BUTTER of React development. Master them!
 *
 * ═══════════════════════════════════════════════════════════════════════════════════════════════════
 */

const data = [
  {
    id: 1,
    title: "The Lord of the Rings",
    publicationDate: "1954-07-29",
    author: "J. R. R. Tolkien",
    genres: [
      "fantasy",
      "high-fantasy",
      "adventure",
      "fiction",
      "novels",
      "literature",
    ],
    hasMovieAdaptation: true,
    pages: 1216,
    translations: {
      spanish: "El señor de los anillos",
      chinese: "魔戒",
      french: "Le Seigneur des anneaux",
    },
    reviews: {
      goodreads: {
        rating: 4.52,
        ratingsCount: 630994,
        reviewsCount: 13417,
      },
      librarything: {
        rating: 4.53,
        ratingsCount: 47166,
        reviewsCount: 452,
      },
    },
  },
  {
    id: 2,
    title: "The Cyberiad",
    publicationDate: "1965-01-01",
    author: "Stanislaw Lem",
    genres: [
      "science fiction",
      "humor",
      "speculative fiction",
      "short stories",
      "fantasy",
    ],
    hasMovieAdaptation: false,
    pages: 295,
    translations: {},
    reviews: {
      goodreads: {
        rating: 4.16,
        ratingsCount: 11663,
        reviewsCount: 812,
      },
      librarything: {
        rating: 4.13,
        ratingsCount: 2434,
        reviewsCount: 0,
      },
    },
  },
  {
    id: 3,
    title: "Dune",
    publicationDate: "1965-01-01",
    author: "Frank Herbert",
    genres: ["science fiction", "novel", "adventure"],
    hasMovieAdaptation: true,
    pages: 658,
    translations: {
      spanish: "",
    },
    reviews: {
      goodreads: {
        rating: 4.25,
        ratingsCount: 1142893,
        reviewsCount: 49701,
      },
    },
  },
  {
    id: 4,
    title: "Harry Potter and the Philosopher's Stone",
    publicationDate: "1997-06-26",
    author: "J. K. Rowling",
    genres: ["fantasy", "adventure"],
    hasMovieAdaptation: true,
    pages: 223,
    translations: {
      spanish: "Harry Potter y la piedra filosofal",
      korean: "해리 포터와 마법사의 돌",
      bengali: "হ্যারি পটার এন্ড দ্য ফিলোসফার্স স্টোন",
      portuguese: "Harry Potter e a Pedra Filosofal",
    },
    reviews: {
      goodreads: {
        rating: 4.47,
        ratingsCount: 8910059,
        reviewsCount: 140625,
      },
      librarything: {
        rating: 4.29,
        ratingsCount: 120941,
        reviewsCount: 1960,
      },
    },
  },
  {
    id: 5,
    title: "A Game of Thrones",
    publicationDate: "1996-08-01",
    author: "George R. R. Martin",
    genres: ["fantasy", "high-fantasy", "novel", "fantasy fiction"],
    hasMovieAdaptation: true,
    pages: 835,
    translations: {
      korean: "왕좌의 게임",
      polish: "Gra o tron",
      portuguese: "A Guerra dos Tronos",
      spanish: "Juego de tronos",
    },
    reviews: {
      goodreads: {
        rating: 4.44,
        ratingsCount: 2295233,
        reviewsCount: 59058,
      },
      librarything: {
        rating: 4.36,
        ratingsCount: 38358,
        reviewsCount: 1095,
      },
    },
  },
];
// all books
function getBooks() {
  return data;
}
// single book
function getBook(id) {
  return data.find((d) => d.id === id);
}
// array of books
const books = getBooks()
books;

const {  title , author, genres, reviews, pages,publicationDate, hasMovieAdaptation,translations, ...restOfBookData} = books[0]

const x = [1,2,3,4,5].map((el)=> el * 2)
x;

function getReviewCount1(books){
  const countgoodreads = books.reviews?.goodreads?.reviewsCount ?? 0; // if reviews is not available then it will return undefined thus to handle this we use the nullish coalescing operator
  const countlibrarything = books.reviews?.librarything?.reviewsCount ?? 0; // if reviews is not available then it will return undefined thus to handle this we use the nullish coalescing operator
  countgoodreads;
  countlibrarything;
  return countgoodreads + countlibrarything;
}
console.log(getReviewCount1(books[0]));

//array map method

const titles = books.map((book)=> book.title)
titles;

const essentialData = books.map((book)=> {
    return {
        title: book.title,
        author: book.author,
        reviewsCount: getReviewCount1(book)
    }
})
essentialData;

//we can also use arrow function with ({}) instead of return to achieve the same result

const essentialData2 = books.map((book)=> ({
    title: book.title,
    author: book.author,
    reviewsCount: getReviewCount1(book) //here we iteretively go to eaach book by the map function and count the number of reviews thus we do not explecitely apply which book to the function
}))
essentialData2;


//filter method

const shortBooks = books.filter((book) => book.pages < 500)
shortBooks

//filter chaining

const longBooks = books.filter((book) => book.pages > 500).filter((book) => book.hasMovieAdaptation)
longBooks

//filtering  with includes

const adventureBooks = books.filter((book)=> book.genres.includes("adventure")).map((bookAnything) => bookAnything.title)
adventureBooks


//Reduce method

const addPagesOfAllBooks = books.reduce((sum, eachBook)=> sum + eachBook.pages, 0)
addPagesOfAllBooks


//sort method

const xx = [11,4,6,2,87,5,64,3,5,6]
const shallowCopyOfXxAsc = [...xx] //we created a copy as sort mutates the original array
shallowCopyOfXxAsc.sort((small, big)=> small - big)//ascending sort method mutates the original array and here  small and big are the two elements of the array
shallowCopyOfXxAsc
xx //original array is not mutated


const shallowCopyOfXxDesc = [...xx] //we created a copy as sort mutates the original array
shallowCopyOfXxDesc.sort((small, big)=> big - small)//descending sort method mutates the original array and here  small and big are the two elements of the array
shallowCopyOfXxDesc

xx//original array is not mutated

const sliceCopyOfXxAsc = xx.slice().sort((small, big)=> small - big)// here slice  method creates a shallow copy of the array and ascending sort method mutates the original array and here  small and big are the two elements of the array
sliceCopyOfXxAsc
xx//original array is not mutated

//slice() and [...arr] are the same


const sortedByPages = books.slice().sort((a,b)=> a.pages - b.pages) // here we take a.pages not a , and similarly b.pages not b as we are sorting the array of objects so we take the property of the object to sort the array which is pages in this case

sortedByPages


// working with immutable arrays

//add a new book object to the books array
const newBook = {
    id: 6,
    title: "The Last Kingdom",
    author: "Bernard Cornwell",
    genres: ["history", "fiction", "adventure"],
    hasMovieAdaptation: true,
    pages: 823,
    translations: {
        spanish: "El Reino de los últimos",
    },
    reviews: {
        goodreads: {
            rating: 4.13,
            ratingsCount: 11663,
            reviewsCount: 812,
        },
        librarything: {
            rating: 4.13,
            ratingsCount: 2434,
            reviewsCount: 0,
        },
    },
}
const booksAfterAddingNewBook = [...books, newBook]
booksAfterAddingNewBook


//delete a book object from the books array
const booksAfterDeletingBook = booksAfterAddingNewBook.filter((book)=> book.id !== 3)
booksAfterDeletingBook


//update a book object in the books array
const booksAfterUpdatingBook = booksAfterDeletingBook.map((book)=> book.id === 6 ? {...book, pages: 100000000} : book)
booksAfterUpdatingBook

