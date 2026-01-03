/**
 * ============================================================================
 * @concept Redux & State Management in React - A Complete Guide for Interviews
 * ============================================================================
 *
 * @summary
 * Redux is a predictable state container for JavaScript apps, primarily used for
 * GLOBAL STATE MANAGEMENT. Think of it as a centralized "brain" for your entire
 * application where all shared data lives.
 *
 * ============================================================================
 * 🎯 THE BIG PICTURE: Why Do We Need Redux?
 * ============================================================================
 *
 * @analogy - The Restaurant Kitchen 🍳
 * Imagine a busy restaurant:
 *
 * WITHOUT Redux (Prop Drilling):
 * - Each waiter carries food from cook → manager → head waiter → your waiter
 * - If you want a refill, your waiter tells head waiter → manager → cook
 * - Slow, confusing, prone to miscommunication!
 *
 * WITH Redux (Centralized State):
 * - There's ONE central kitchen counter (Redux Store)
 * - Any waiter can pick up/drop orders directly from the counter
 * - Everyone knows the current status by looking at ONE place
 * - Fast, organized, consistent!
 *
 * ============================================================================
 * 📊 TYPES OF STATE IN REACT APPLICATIONS
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                         STATE CLASSIFICATION                            │
 * ├─────────────────────────────────────────────────────────────────────────┤
 * │                                                                         │
 * │  ┌─────────────────────────────────────────────────────────────────┐   │
 * │  │                    BY SCOPE (Where it lives)                     │   │
 * │  ├─────────────────────────┬───────────────────────────────────────┤   │
 * │  │    LOCAL STATE          │        GLOBAL STATE                   │   │
 * │  │   (Component-level)     │       (App-wide)                      │   │
 * │  │                         │                                       │   │
 * │  │  • Lives in ONE         │  • Shared across MANY                 │   │
 * │  │    component            │    components                         │   │
 * │  │  • useState/useReducer  │  • Redux, Context API                 │   │
 * │  │  • Ex: form input,      │  • Ex: user auth, theme,              │   │
 * │  │    modal open/close     │    shopping cart                      │   │
 * │  └─────────────────────────┴───────────────────────────────────────┘   │
 * │                                                                         │
 * │  ┌─────────────────────────────────────────────────────────────────┐   │
 * │  │                   BY SOURCE (Where data comes from)              │   │
 * │  ├─────────────────────────┬───────────────────────────────────────┤   │
 * │  │    UI STATE             │        REMOTE STATE                   │   │
 * │  │   (Client-only)         │       (Server data)                   │   │
 * │  │                         │                                       │   │
 * │  │  • Data that exists     │  • Data fetched from                  │   │
 * │  │    only in frontend     │    backend/API servers                │   │
 * │  │  • NO server sync       │  • Needs caching, refetching          │   │
 * │  │  • Ex: sidebar open,    │  • Ex: user profile, products,        │   │
 * │  │    dark mode, tabs      │    blog posts from database           │   │
 * │  └─────────────────────────┴───────────────────────────────────────┘   │
 * │                                                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 🔧 WHEN TO USE WHAT? (Decision Matrix)
 * ============================================================================
 *
 *                     ┌────────────────┬────────────────────────────────────┐
 *                     │   LOCAL STATE  │         GLOBAL STATE               │
 * ┌───────────────────┼────────────────┼────────────────────────────────────┤
 * │                   │                │                                    │
 * │   UI STATE        │  useState      │  Redux / Context API               │
 * │   (no server)     │  useReducer    │  (for complex UI state)            │
 * │                   │                │                                    │
 * ├───────────────────┼────────────────┼────────────────────────────────────┤
 * │                   │                │                                    │
 * │   REMOTE STATE    │  fetch +       │  RTK Query / React Query / SWR     │
 * │   (from server)   │  useEffect +   │  (handles caching, refetching,     │
 * │                   │  useState      │   and sync automatically)          │
 * │                   │                │                                    │
 * └───────────────────┴────────────────┴────────────────────────────────────┘
 *
 * 💡 KEY INSIGHT:
 * - Use Redux for UI state that needs to be shared globally
 * - Use RTK Query/React Query for remote state (server data)
 * - Modern apps are mostly REMOTE STATE → RTK Query is often the better choice!
 *
 * ============================================================================
 * 🏗️ REDUX ARCHITECTURE - Under The Hood
 * ============================================================================
 *
 * @analogy - The Bank Transaction System 🏦
 *
 * Redux works like a strict bank:
 *
 * 1. STORE = The Bank Vault (holds all the money/state)
 * 2. STATE = The current balance of all accounts
 * 3. ACTION = A deposit/withdrawal slip (describes WHAT you want to do)
 * 4. REDUCER = The bank teller (processes the slip and updates balance)
 * 5. DISPATCH = Submitting your slip to the teller
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                     REDUX DATA FLOW (One-Way)                           │
 * │                                                                         │
 * │     ┌─────────┐                                                         │
 * │     │   UI    │ ◄──────────────────────────────────────────┐           │
 * │     │Component│                                             │           │
 * │     └────┬────┘                                             │           │
 * │          │                                                  │           │
 * │          │ 1. User clicks button                            │           │
 * │          ▼                                                  │           │
 * │     ┌─────────┐                                             │           │
 * │     │ ACTION  │ { type: 'counter/increment', payload: 1 }   │           │
 * │     │ Creator │                                             │           │
 * │     └────┬────┘                                             │           │
 * │          │                                                  │           │
 * │          │ 2. dispatch(action)                              │           │
 * │          ▼                                                  │           │
 * │     ┌─────────┐                                             │           │
 * │     │DISPATCH │ → Sends action to the store                 │           │
 * │     └────┬────┘                                             │           │
 * │          │                                                  │           │
 * │          │ 3. Store forwards action to reducer              │           │
 * │          ▼                                                  │           │
 * │     ┌─────────┐                                             │           │
 * │     │ REDUCER │ (currentState, action) => newState          │           │
 * │     │  Pure   │ Calculates new state based on action        │           │
 * │     │Function │                                             │           │
 * │     └────┬────┘                                             │           │
 * │          │                                                  │           │
 * │          │ 4. Returns NEW state (immutable update)          │           │
 * │          ▼                                                  │           │
 * │     ┌─────────┐                                             │           │
 * │     │  STORE  │ Stores the new state                        │           │
 * │     │ (State) │                                             │           │
 * │     └────┬────┘                                             │           │
 * │          │                                                  │           │
 * │          │ 5. Notifies all subscribed components            │
 * │          └──────────────────────────────────────────────────┘           │
 * │                                                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * 📝 CORE CONCEPTS EXPLAINED
 * ============================================================================
 *
 * 1️⃣ STORE - The Single Source of Truth
 * ────────────────────────────────────────
 * - ONE store for the entire application
 * - Holds the complete state tree
 * - Created using createStore() or configureStore() (RTK)
 *
 * @example
 * // Creating a store (Modern RTK way)
 * import { configureStore } from '@reduxjs/toolkit';
 *
 * const store = configureStore({
 *   reducer: {
 *     counter: counterReducer,
 *     user: userReducer
 *   }
 * });
 *
 * // The store's state looks like:
 * // { counter: { value: 0 }, user: { name: '', loggedIn: false } }
 *
 *
 * 2️⃣ ACTION - What Happened?
 * ────────────────────────────────────────
 * - Plain JavaScript object describing WHAT happened
 * - Must have a 'type' property (string)
 * - Can have a 'payload' for additional data
 *
 * @analogy Think of it like a newspaper headline:
 * "DEPOSIT_MADE" with details "amount: $100"
 *
 * @example
 * // Action object
 * const incrementAction = {
 *   type: 'counter/increment',  // What happened
 *   payload: 5                   // Additional info
 * };
 *
 *
 * 3️⃣ ACTION CREATORS - Functions that Create Actions
 * ────────────────────────────────────────
 * - Functions that RETURN action objects
 * - Makes code cleaner and reusable
 * - In RTK, they're auto-generated!
 *
 * @example
 * // Manual action creator
 * function increment(amount) {
 *   return { type: 'counter/increment', payload: amount };
 * }
 *
 * // Using it
 * dispatch(increment(5));
 *
 * // RTK auto-generates them from slice:
 * const counterSlice = createSlice({
 *   name: 'counter',
 *   initialState: { value: 0 },
 *   reducers: {
 *     increment: (state, action) => {
 *       state.value += action.payload;  // RTK uses Immer, so mutation is OK!
 *     }
 *   }
 * });
 * export const { increment } = counterSlice.actions; // Auto-generated!
 *
 *
 * 4️⃣ REDUCER - The Pure Function
 * ────────────────────────────────────────
 * - A PURE function: (prevState, action) => newState
 * - Same input ALWAYS produces same output
 * - NO side effects (no API calls, no random values)
 * - Must return NEW state object (immutability!)
 *
 * @analogy Like a calculator: 2 + 3 ALWAYS = 5
 *
 * @example
 * // Pure reducer function
 * function counterReducer(state = { value: 0 }, action) {
 *   switch (action.type) {
 *     case 'counter/increment':
 *       // Return NEW object, don't mutate!
 *       return { ...state, value: state.value + action.payload };
 *     case 'counter/decrement':
 *       return { ...state, value: state.value - action.payload };
 *     default:
 *       return state;
 *   }
 * }
 *
 *
 * 5️⃣ DISPATCH - Triggering State Changes
 * ────────────────────────────────────────
 * - The ONLY way to update state
 * - Sends action to the store
 * - Store runs reducers and updates state
 *
 * @example
 * // In a React component
 * import { useDispatch } from 'react-redux';
 * import { increment } from './counterSlice';
 *
 * function Counter() {
 *   const dispatch = useDispatch();
 *
 *   return (
 *     <button onClick={() => dispatch(increment(1))}>
 *       Add 1
 *     </button>
 *   );
 * }
 *
 *
 * ============================================================================
 * 🔄 useReducer vs Redux - What's the Difference?
 * ============================================================================
 *
 * @analogy
 * useReducer = Personal diary (only you can read/write)
 * Redux = Public bulletin board (everyone can read, controlled write access)
 *
 * ┌──────────────────────────────────────────────────────────────────────────┐
 * │                    useReducer                 │          Redux           │
 * ├──────────────────────────────────────────────────────────────────────────┤
 * │ Scope: LOCAL (single component/tree)         │ Scope: GLOBAL (entire app)│
 * │ Built into React, no extra package           │ Separate library needed   │
 * │ State lives in component                     │ State lives in store      │
 * │ Good for complex LOCAL state logic           │ Good for shared state     │
 * │ dispatch is component-scoped                 │ dispatch is app-wide      │
 * │ No middleware support                        │ Middleware (thunk, saga)  │
 * │ No DevTools                                  │ Powerful DevTools! 🔧     │
 * └──────────────────────────────────────────────────────────────────────────┘
 *
 * @code_example How useReducer works under the hood:
 *
 * // useReducer is essentially:
 * function useReducer(reducer, initialState) {
 *   const [state, setState] = useState(initialState);
 *
 *   function dispatch(action) {
 *     const newState = reducer(state, action);  // Call reducer with current state + action
 *     setState(newState);                        // Update state with new value
 *   }
 *
 *   return [state, dispatch];
 * }
 *
 * // Usage in component:
 * const [state, dispatch] = useReducer(counterReducer, { count: 0 });
 * dispatch({ type: 'INCREMENT' });  // Triggers reducer, updates local state
 *
 *
 * ============================================================================
 * 🚀 RTK Query - Modern Redux for Remote State
 * ============================================================================
 *
 * @analogy
 * Redux = Managing your own warehouse inventory
 * RTK Query = Amazon handling storage, shipping, and returns for you!
 *
 * RTK Query automatically handles:
 * ✅ Caching - Stores fetched data, avoids duplicate requests
 * ✅ Refetching - Updates data when stale or on focus
 * ✅ Loading states - isLoading, isFetching, isError
 * ✅ Deduplication - Multiple components requesting same data? One request!
 * ✅ Cache invalidation - Refetch when data changes
 *
 * @example
 * // Define an API with RTK Query
 * import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 *
 * const pokemonApi = createApi({
 *   reducerPath: 'pokemonApi',
 *   baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
 *   endpoints: (builder) => ({
 *     getPokemonByName: builder.query({
 *       query: (name) => `pokemon/${name}`,
 *     }),
 *   }),
 * });
 *
 * // Auto-generated hooks!
 * export const { useGetPokemonByNameQuery } = pokemonApi;
 *
 * // Using in component - SO CLEAN! 🎉
 * function Pokemon({ name }) {
 *   const { data, isLoading, error } = useGetPokemonByNameQuery(name);
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error!</div>;
 *   return <div>{data.name}</div>;
 * }
 *
 *
 * ============================================================================
 * 🎓 INTERVIEW CHEAT SHEET
 * ============================================================================
 *
 * Q: What is Redux?
 * A: Redux is a predictable state container that manages global state using
 *    a single store, pure reducer functions, and a unidirectional data flow.
 *
 * Q: What are the three principles of Redux?
 * A: 1. Single source of truth (one store)
 *    2. State is read-only (only change via actions)
 *    3. Changes made by pure functions (reducers)
 *
 * Q: What is an Action Creator?
 * A: A function that creates and returns an action object. It encapsulates
 *    the action creation logic, making code more maintainable and testable.
 *
 * Q: Redux vs Context API?
 * A: Context is for passing data deep down, Redux is for complex state logic.
 *    Redux has middleware, DevTools, and better performance for frequent updates.
 *
 * Q: When to use Redux vs RTK Query?
 * A: Redux for UI state (theme, modals, sidebar), RTK Query for server data
 *    (users, products, posts) that needs caching and sync.
 *
 * Q: What is a pure function?
 * A: A function that: (1) given same inputs, always returns same output,
 *    (2) has no side effects. Reducers MUST be pure!
 *
 * ============================================================================
 * 💡 QUICK DECISION GUIDE
 * ============================================================================
 *
 * "Where should this state live?"
 *
 * START HERE
 *     │
 *     ▼
 * Does only ONE component need this state?
 *     │
 *     ├── YES → useState or useReducer (LOCAL)
 *     │
 *     └── NO → Is it data from a server/API?
 *                   │
 *                   ├── YES → RTK Query or React Query
 *                   │
 *                   └── NO → Is state logic complex?
 *                                 │
 *                                 ├── YES → Redux/Context + useReducer
 *                                 │
 *                                 └── NO → Context API (simple sharing)
 *
 * ============================================================================
 * 🔑 KEY TAKEAWAYS
 * ============================================================================
 *
 * 1. Redux = Centralized state management with predictable updates
 * 2. Actions describe WHAT happened, Reducers decide HOW state changes
 * 3. State is READ-ONLY, only way to change is dispatching actions
 * 4. Use Redux for global UI state, RTK Query for server data
 * 5. Modern React apps favor RTK Query because most state IS server data!
 * 6. useReducer is like "mini-Redux" for local complex state
 *
 * Remember: "If you're confused whether you need Redux, you don't need Redux."
 *           Start simple, add complexity when needed! 🚀
 */