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

/**
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║     🚀 ESSENTIAL JAVASCRIPT FOR REACT - INTERVIEW REVISION GUIDE (WITH UNDER THE HOOD) 🚀       ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 *
 * ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ 📦 1. DESTRUCTURING (Object & Array)                                                            │
 * ├──────────────────────────────────────────────────────────────────────────────────────────────────┤
 * │ 🎒 ANALOGY: Like unpacking a suitcase - instead of digging through it every time,               │
 * │            you take items out and place them separately on hangers/shelves.                     │
 * │                                                                                                  │
 * │ 🔧 UNDER THE HOOD:                                                                               │
 * │   JavaScript engine reads the pattern on LEFT and matches property names/indices on RIGHT:      │
 * │                                                                                                  │
 * │   // OBJECT DESTRUCTURING - Matches by KEY NAME                                                  │
 * │   const book = { title: "Dune", author: "Herbert", pages: 658 };                                │
 * │   const { title, author } = book;                                                                │
 * │   // Engine does: title = book["title"], author = book["author"]                                │
 * │                                                                                                  │
 * │   // ARRAY DESTRUCTURING - Matches by POSITION (index)                                          │
 * │   const genres = ["sci-fi", "adventure", "fiction"];                                            │
 * │   const [first, second] = genres;                                                                │
 * │   // Engine does: first = genres[0], second = genres[1]                                         │
 * │                                                                                                  │
 * │   // DEFAULT VALUES - Fallback if undefined                                                      │
 * │   const { rating = 0 } = book;  // rating = 0 (book.rating doesn't exist)                       │
 * │                                                                                                  │
 * │   // RENAMING - Different variable name than property                                            │
 * │   const { title: bookName } = book;  // bookName = "Dune"                                       │
 * │                                                                                                  │
 * │ 🔥 IN REACT: Props, useState, useContext all use destructuring!                                 │
 * │   const [count, setCount] = useState(0);  // Array destructuring                                │
 * │   function Card({ title, image }) { }     // Object destructuring in params                     │
 * └──────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ 🌊 2. REST OPERATOR (...rest) - "Pack the remaining items"                                      │
 * ├──────────────────────────────────────────────────────────────────────────────────────────────────┤
 * │ 🛒 ANALOGY: Shopping cart - "I'll take milk and eggs specifically, put the REST in one bag"    │
 * │                                                                                                  │
 * │ 🔧 UNDER THE HOOD:                                                                               │
 * │   Rest operator COLLECTS leftover elements. MUST be LAST in destructuring!                      │
 * │                                                                                                  │
 * │   // ARRAY REST                                                                                  │
 * │   const nums = [1, 2, 3, 4, 5];                                                                 │
 * │   const [first, second, ...remaining] = nums;                                                   │
 * │   // first = 1, second = 2, remaining = [3, 4, 5] (new array created!)                          │
 * │                                                                                                  │
 * │   // OBJECT REST                                                                                 │
 * │   const user = { name: "John", age: 25, city: "NYC", job: "Dev" };                              │
 * │   const { name, ...otherInfo } = user;                                                          │
 * │   // name = "John", otherInfo = { age: 25, city: "NYC", job: "Dev" }                            │
 * │                                                                                                  │
 * │   // FUNCTION PARAMETERS - Collect unknown number of args                                        │
 * │   function sum(...numbers) { return numbers.reduce((a, b) => a + b); }                          │
 * │   sum(1, 2, 3, 4); // numbers = [1, 2, 3, 4], returns 10                                        │
 * │                                                                                                  │
 * │ 🔥 IN REACT: Forward remaining props to child components!                                       │
 * │   function Button({ variant, size, ...rest }) {                                                 │
 * │     return <button className={`${variant} ${size}`} {...rest} />;                               │
 * │   }                                                                                              │
 * │   <Button variant="primary" size="lg" onClick={fn} disabled /> // rest = {onClick, disabled}   │
 * └──────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ 💨 3. SPREAD OPERATOR (...spread) - "Unpack all items"                                          │
 * ├──────────────────────────────────────────────────────────────────────────────────────────────────┤
 * │ 📂 ANALOGY: Photocopy machine - Makes a copy of all papers and lets you add new ones           │
 * │                                                                                                  │
 * │ 🔧 UNDER THE HOOD:                                                                               │
 * │   Spread operator EXPANDS/UNPACKS elements. Creates SHALLOW COPY (nested refs still shared!)   │
 * │                                                                                                  │
 * │   // ARRAY SPREAD - Unpacks into individual elements                                            │
 * │   const arr1 = [1, 2, 3];                                                                       │
 * │   const arr2 = [...arr1, 4, 5];     // [1, 2, 3, 4, 5] - new array!                             │
 * │   const arr3 = [0, ...arr1];        // [0, 1, 2, 3] - prepend                                   │
 * │   const copy = [...arr1];           // [1, 2, 3] - shallow copy                                 │
 * │                                                                                                  │
 * │   // OBJECT SPREAD - Unpacks all key-value pairs                                                │
 * │   const user = { name: "John", age: 25 };                                                       │
 * │   const updated = { ...user, age: 26 };  // { name: "John", age: 26 }                           │
 * │   // Order matters! Later properties OVERRIDE earlier ones                                      │
 * │                                                                                                  │
 * │   // ⚠️ SHALLOW vs DEEP COPY                                                                    │
 * │   const obj = { a: 1, nested: { b: 2 } };                                                       │
 * │   const copy = { ...obj };           // copy.nested === obj.nested (SAME reference!)            │
 * │   copy.nested.b = 99;                // ALSO changes obj.nested.b to 99!                        │
 * │                                                                                                  │
 * │ 🔥 IN REACT: CRITICAL for immutable state updates!                                              │
 * │   // ❌ WRONG: setState(state.push(item))  - Mutates, React won't re-render                     │
 * │   // ✅ RIGHT: setState([...state, item])  - New array, triggers re-render                      │
 * │                                                                                                  │
 * │   // Update nested object in state:                                                             │
 * │   setUser({ ...user, address: { ...user.address, city: "NYC" } });                              │
 * └──────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ 📝 4. TEMPLATE LITERALS (`backticks`)                                                           │
 * ├──────────────────────────────────────────────────────────────────────────────────────────────────┤
 * │ 📧 ANALOGY: Mail merge - A template letter with ${placeholders} that get filled in              │
 * │                                                                                                  │
 * │ � UNDER THE HOOD:                                                                               │
 * │   Engine EVALUATES expressions inside ${} and CONVERTS result to string via String()           │
 * │                                                                                                  │
 * │   const name = "John", count = 5;                                                               │
 * │   const msg = `Hello ${name}, you have ${count} items`;                                         │
 * │   // Engine: "Hello " + String(name) + ", you have " + String(count) + " items"                 │
 * │                                                                                                  │
 * │   // ANY expression works inside ${}:                                                           │
 * │   `Total: ${price * qty}`                    // Math                                            │
 * │   `Year: ${date.split('-')[0]}`              // Method calls                                    │
 * │   `Status: ${isActive ? 'ON' : 'OFF'}`       // Ternary                                         │
 * │   `Items: ${items.join(', ')}`               // Array methods                                   │
 * │                                                                                                  │
 * │   // MULTI-LINE STRINGS (preserves line breaks):                                                │
 * │   const html = `                                                                                │
 * │     <div>                                                                                       │
 * │       <h1>${title}</h1>                                                                         │
 * │     </div>                                                                                      │
 * │   `;                                                                                            │
 * │                                                                                                  │
 * │ 🔥 IN REACT: Dynamic classNames, inline styles, conditional text!                               │
 * │   <div className={`card ${isActive ? 'active' : ''} ${size}`}>                                  │
 * └──────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ ❓ 5. TERNARY OPERATOR (condition ? valueIfTrue : valueIfFalse)                                 │
 * ├──────────────────────────────────────────────────────────────────────────────────────────────────┤
 * │ 🚦 ANALOGY: Traffic light - Green? Go : Stop. One decision, two paths.                         │
 * │                                                                                                  │
 * │ � UNDER THE HOOD:                                                                               │
 * │   1. Evaluate condition → convert to boolean (truthy/falsy check)                               │
 * │   2. If true → evaluate and return FIRST expression                                             │
 * │   3. If false → evaluate and return SECOND expression                                           │
 * │   NOTE: Only ONE branch is evaluated (short-circuit behavior)                                   │
 * │                                                                                                  │
 * │   // BASIC USAGE                                                                                │
 * │   const status = age >= 18 ? "adult" : "minor";                                                 │
 * │                                                                                                  │
 * │   // NESTED TERNARY (use sparingly - harder to read)                                            │
 * │   const grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";                │
 * │                                                                                                  │
 * │   // AS FUNCTION ARGUMENT                                                                       │
 * │   console.log(isLoading ? "Loading..." : data);                                                 │
 * │                                                                                                  │
 * │ 🔥 IN REACT: THE primary way to conditionally render JSX!                                       │
 * │   {isLoggedIn ? <Dashboard /> : <Login />}                                                      │
 * │   {error ? <ErrorMsg error={error} /> : <Content data={data} />}                                │
 * │   {items.length > 0 ? items.map(i => <Item {...i} />) : <Empty />}                              │
 * └──────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ ➡️ 6. ARROW FUNCTIONS (() => {})                                                                │
 * ├──────────────────────────────────────────────────────────────────────────────────────────────────┤
 * │ ✂️ ANALOGY: Shorthand notes - "Add A+B" instead of "To add, take A and B, then return A+B"      │
 * │                                                                                                  │
 * │ 🔧 UNDER THE HOOD:                                                                               │
 * │   Arrow functions differ from regular functions in 3 KEY WAYS:                                  │
 * │                                                                                                  │
 * │   1️⃣ NO OWN `this` - Inherits `this` from surrounding scope (lexical binding)                  │
 * │      Regular: this = whoever CALLS the function                                                 │
 * │      Arrow:   this = whoever DEFINES the function                                               │
 * │                                                                                                  │
 * │      const obj = {                                                                              │
 * │        name: "Book",                                                                            │
 * │        regular: function() { console.log(this.name); }, // "Book" (this = obj)                  │
 * │        arrow: () => console.log(this.name)              // undefined (this = outer scope)       │
 * │      };                                                                                         │
 * │                                                                                                  │
 * │   2️⃣ IMPLICIT RETURN - One-liners return automatically (no braces, no return keyword)          │
 * │      const double = x => x * 2;           // Returns x * 2                                      │
 * │      const double = x => { return x * 2 } // Same, but explicit                                 │
 * │      const double = x => { x * 2 }        // ❌ Returns undefined! (missing return)             │
 * │                                                                                                  │
 * │   3️⃣ NO `arguments` OBJECT - Use rest params instead                                           │
 * │      const fn = (...args) => console.log(args);                                                 │
 * │                                                                                                  │
 * │ 🔥 IN REACT: Preferred syntax for callbacks and components!                                     │
 * │   onClick={() => handleClick(id)}           // Event handler                                    │
 * │   items.map(item => <Card key={item.id} />) // Callback                                         │
 * │   const Header = ({ title }) => <h1>{title}</h1>; // Functional component                       │
 * └──────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ ⚡ 7. SHORT-CIRCUIT EVALUATION (&&, ||, ??)                                                     │
 * ├──────────────────────────────────────────────────────────────────────────────────────────────────┤
 * │ 🚪 ANALOGY: Security checkpoints - Stop checking once you know the final answer                │
 * │                                                                                                  │
 * │ 🔧 UNDER THE HOOD:                                                                               │
 * │                                                                                                  │
 * │   ┌─── && (AND) ───────────────────────────────────────────────────────────────────┐            │
 * │   │ Returns FIRST FALSY value, or LAST value if all truthy                         │            │
 * │   │                                                                                 │            │
 * │   │ true && "Hello"   → "Hello" (first is truthy, return second)                   │            │
 * │   │ false && "Hello"  → false   (first is falsy, return it, skip second)           │            │
 * │   │ "A" && "B" && "C" → "C"     (all truthy, return last)                          │            │
 * │   │ "A" && 0 && "C"   → 0       (0 is falsy, stop there)                           │            │
 * │   └─────────────────────────────────────────────────────────────────────────────────┘            │
 * │                                                                                                  │
 * │   ┌─── || (OR) ────────────────────────────────────────────────────────────────────┐            │
 * │   │ Returns FIRST TRUTHY value, or LAST value if all falsy                         │            │
 * │   │                                                                                 │            │
 * │   │ true || "Hello"   → true    (first is truthy, return it, skip second)          │            │
 * │   │ false || "Hello"  → "Hello" (first is falsy, check second, return it)          │            │
 * │   │ 0 || "" || "Hi"   → "Hi"    (first truthy)                                     │            │
 * │   │ 0 || "" || null   → null    (all falsy, return last)                           │            │
 * │   └─────────────────────────────────────────────────────────────────────────────────┘            │
 * │                                                                                                  │
 * │   ┌─── ?? (NULLISH COALESCING) ────────────────────────────────────────────────────┐            │
 * │   │ Returns RIGHT side ONLY if left is null/undefined (not 0, "", false!)          │            │
 * │   │                                                                                 │            │
 * │   │ null ?? "default"      → "default"                                             │            │
 * │   │ undefined ?? "default" → "default"                                             │            │
 * │   │ 0 ?? "default"         → 0        (0 is NOT nullish!)                          │            │
 * │   │ "" ?? "default"        → ""       ("" is NOT nullish!)                         │            │
 * │   │ false ?? "default"     → false    (false is NOT nullish!)                      │            │
 * │   └─────────────────────────────────────────────────────────────────────────────────┘            │
 * │                                                                                                  │
 * │   TRUTHY: true, 1, "text", {}, [], "0"                                                          │
 * │   FALSY:  false, 0, "", null, undefined, NaN                                                    │
 * │                                                                                                  │
 * │ 🔥 IN REACT:                                                                                     │
 * │   {isLoading && <Spinner />}       // Render only if true                                       │
 * │   {error || <SuccessMessage />}    // Fallback if error is falsy                                │
 * │   const count = data.count ?? 0;   // Default only for null/undefined                           │
 * └──────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
 * │ 🔗 8. OPTIONAL CHAINING (?.)                                                                    │
 * ├──────────────────────────────────────────────────────────────────────────────────────────────────┤
 * │ 🏠 ANALOGY: GPS navigation - "If road exists, continue. If blocked, return 'no route found'"   │
 * │                                                                                                  │
 * │ 🔧 UNDER THE HOOD:                                                                               │
 * │   At each ?. the engine checks: "Is value null or undefined?"                                   │
 * │   - If YES → Stop immediately, return undefined                                                 │
 * │   - If NO  → Continue to next property                                                          │
 * │                                                                                                  │
 * │   // WITHOUT OPTIONAL CHAINING (old way - verbose!)                                             │
 * │   const rating = book && book.reviews && book.reviews.goodreads                                 │
 * │                  && book.reviews.goodreads.rating;                                              │
 * │                                                                                                  │
 * │   // WITH OPTIONAL CHAINING (clean!)                                                            │
 * │   const rating = book?.reviews?.goodreads?.rating;                                              │
 * │                                                                                                  │
 * │   // STEP-BY-STEP EXECUTION:                                                                    │
 * │   book?.reviews?.goodreads?.rating                                                              │
 * │   │                                                                                              │
 * │   ├─ Is book null/undefined? → If yes, return undefined                                        │
 * │   ├─ Is book.reviews null/undefined? → If yes, return undefined                                │
 * │   ├─ Is book.reviews.goodreads null/undefined? → If yes, return undefined                      │
 * │   └─ Return book.reviews.goodreads.rating                                                       │
 * │                                                                                                  │
 * │   // OPTIONAL METHOD CALL                                                                       │
 * │   obj.method?.();  // Calls method only if it exists                                            │
 * │                                                                                                  │
 * │   // OPTIONAL ARRAY ACCESS                                                                      │
 * │   arr?.[0];        // Access first element only if arr exists                                   │
 * │                                                                                                  │
 * │   // COMBINE WITH ?? FOR FALLBACK                                                               │
 * │   const count = book?.reviews?.goodreads?.count ?? 0;                                           │
 * │                                                                                                  │
 * │ 🔥 IN REACT: Essential for API data that may be loading or incomplete!                         │
 * │   {user?.profile?.avatar && <img src={user.profile.avatar} />}                                  │
 * │   const userName = apiResponse?.data?.user?.name ?? "Guest";                                    │
 * └──────────────────────────────────────────────────────────────────────────────────────────────────┘
 *
 * ╔══════════════════════════════════════════════════════════════════════════════════════════════════╗
 * ║                                    🎯 INTERVIEW CHEAT SHEET 🎯                                  ║
 * ╠══════════════════════════════════════════════════════════════════════════════════════════════════╣
 * ║  Q: REST vs SPREAD - same syntax (...), what's the difference?                                  ║
 * ║  A: CONTEXT determines which! REST = collecting (in destructuring/params)                       ║
 * ║     SPREAD = expanding (in array/object literals, function calls)                               ║
 * ║                                                                                                  ║
 * ║  Q: Why does React need spread for state updates?                                               ║
 * ║  A: React uses Object.is() to compare old vs new state. Mutation keeps same reference =        ║
 * ║     React thinks nothing changed! Spread creates NEW reference = triggers re-render.            ║
 * ║                                                                                                  ║
 * ║  Q: || vs ?? - when to use which?                                                               ║
 * ║  A: Use ?? when 0, "", false are VALID values you want to keep.                                 ║
 * ║     Use || when you want fallback for ANY falsy value.                                          ║
 * ║     Example: userCount ?? 0 (keeps 0 if set), userName || "Guest" (fallback for empty string)   ║
 * ║                                                                                                  ║
 * ║  Q: Why use arrow functions in React?                                                           ║
 * ║  A: Lexical `this` binding! Arrow functions inherit `this` from parent scope, avoiding          ║
 * ║     the need for .bind(this) in class components. Also: cleaner inline callbacks.               ║
 * ╚══════════════════════════════════════════════════════════════════════════════════════════════════╝
 */

function getBooks() {
  return data;
}

function getBook(id) {
  return data.find((d) => d.id === id);
}

const books = getBook(2)
books;
// const {  title , author, genres, reviews, pages,publicationDate, hasMovieAdaptation,translations, ...restOfBookData} = books
// title ; author; genres; reviews; pages;publicationDate; hasMovieAdaptation;translations;

/** Main block "const {  title , author, genres, reviews, pages,publicationDate, hasMovieAdaptation, ...restOfBookData} = data[1]" from where whole code is controled  */
//This is called object destructuring
const {  title , author, genres, reviews, pages,publicationDate, hasMovieAdaptation,translations, ...restOfBookData} = data[1]; //
title , author, genres, reviews, pages,publicationDate, hasMovieAdaptation,translations;
restOfBookData;
//This is called array destructuring
const [book1 , book2] = data;
book1 ;
book2;

//This is called array destructuring by using the variable name and ...rest operator which is used to store the remaining elements in an array
const [primaryGenre, secondaryGenre, ...restGen] = data[0].genres
primaryGenre, secondaryGenre, restGen;

//This is called array destructuring by using the variable name and ...rest operator which is used to store the remaining elements in an array
const [primaGenre, secondGenre, ...restGenres] = genres
primaGenre, secondGenre, restGenres


//This is called creating a shallow copy of the array using the spread operator
const bookData = [...data]; 
bookData;


//This is called creating a shallow copy of the array using 
// the spread operator but it doesn't add the new element to the original array as it cannot mutate the original array
let newGenre = [genres, "epic fantasy"]
newGenre
genres


//This is called creating a shallow copy of the array using 
// the spread operator but it adds the new element to the original array as it takes all the elements from the original array and adds the new element to it
let newGenre1 = [...genres, "epic fantasy"]
newGenre1
genres



let newGenre2 = [ "epic fantasy", ...genres]
newGenre2;
genres;



//Spread operator in objects


//This is called creating a shallow copy of the object using the spread operator 
// but it doesn't add the new element to the original object as it cannot mutate the original object
const notProperlyUpdatedBook = {books, publicationDate: "2022-01-01"}
notProperlyUpdatedBook

//This is called creating a shallow copy of the object using the spread operator 
// but it adds the new element to the original object as it takes all the elements from the original object and adds the new element to it
const updatedBook = {...books, publicationDate: "2022-01-01"}
updatedBook



//Template literals

const bookTitle = `The book title is "${title}", with pages "${pages}", and Publication Date "${publicationDate.split("-")[0]}. This book has "${hasMovieAdaptation ? "" : "not"}" been adapted into a movie `// here in "${publicationDate.split("-")[0]}" we are using the split method to split the string into an array and then we are using the first element of the array
console.log(bookTitle)



//Ternary operator


const pageCount = pages > 1000 ? "Long Book" : "Short Book"
pageCount;



//Arrow functions

// normal function expression
function getBooks(title) {
    return title  ;
}
console.log(getBooks(data[0].title)); // calling the function


//Arrow function
const getBookArrow = (title) => title; //you can return value in one line without calling the function but if you use {} then you have to use "return" keyword
console.log(getBookArrow(data[0].title)); // calling the function



//Short Circuiting with logical operators :&&, || or ??

console.log(true && "Hello");
console.log(false && "Hello");
console.log(true || "Hello");
console.log(false || "Hello");
console.log(true ?? "Hello");
console.log(false ?? "Hello");

console.log(hasMovieAdaptation && "This book has been adapted into a movie");
console.log(pages > 1000 && "Long Book");
// so in this way we can use truthy and falsy values to perform some actions
//trthy values : true, 1, "Hello", {}, []
//falsy values : false, 0, "", null, undefined

console.log("jonas " && "Some string");
console.log(0 && "Some string");

console.log(0 || "Some string");
console.log(1 || "Some string");

console.log(data[0].translations.spanish);

const translationAvailable = books.translations.spanish || "No translation available";
translationAvailable;


//Optional Chaining

function getReviewCount1(books){
  const countgoodreads = books?.reviews?.goodreads?.reviewsCount ?? 0; // if reviews is not available then it will return undefined thus to handle this we use the nullish coalescing operator
  const countlibrarything = books?.reviews?.librarything?.reviewsCount ?? 0; // if reviews is not available then it will return undefined thus to handle this we use the nullish coalescing operator
  countgoodreads;
  countlibrarything;
  return countgoodreads + countlibrarything;
}
console.log(getReviewCount1(data[2]));



function getReviewCount(books){
  const countgoodreads = books.reviews.goodreads.reviewsCount ?? 0; // if reviews is not available then it will return undefined thus to handle this we use the nullish coalescing operator
  const countlibrarything = books.reviews.librarything.reviewsCount ?? 0; // if reviews is not available then it will return undefined thus to handle this we use the nullish coalescing operator but without optional chaining it will throw an error and we wont be able to use the nullish coalescing operator
  countgoodreads;
  countlibrarything;
  return countgoodreads + countlibrarything;
}
console.log(getReviewCount(data[2]));