/**
 * Test Suite for Challenge 16: API Data Handling Patterns
 * =========================================================
 * 
 * Run this file with: node _16_APIDataHandling_test_example.js
 */

const {
    transformApiUser,
    handlePaginatedResponse,
    buildRequestOptions,
    normalizeError,
    createDataPipeline,
    buildQueryString
} = require('./_16_APIDataHandling_example.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;

function assertEqual(actual, expected, testName) {
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
    }
}

function assertIncludes(actual, expected, testName) {
    let passed = true;
    for (const [key, value] of Object.entries(expected)) {
        if (JSON.stringify(actual[key]) !== JSON.stringify(value)) {
            passed = false;
            break;
        }
    }
    if (passed) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected to include: ${JSON.stringify(expected)}`);
        console.log(`   Actual: ${JSON.stringify(actual)}`);
        testsFailed++;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

console.log('\n' + '='.repeat(60));
console.log('🧪 Running API Data Handling Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: transformApiUser()
// =========================================================================
console.log('\n📋 TASK 1: transformApiUser()');
console.log('-'.repeat(40));

const fullApiUser = {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    email: "john@test.com",
    avatar_url: "/john.png",
    profile: { bio: "Developer", location: "NYC", website: "john.dev" },
    created_at: "2024-01-15T10:00:00Z",
    is_active: true
};

const transformed = transformApiUser(fullApiUser);
assertIncludes(transformed, {
    id: 1,
    fullName: "John Doe",
    email: "john@test.com",
    avatar: "/john.png",
    bio: "Developer",
    location: "NYC",
    status: "active"
}, 'Transforms complete user');

const minimalUser = {
    id: 2,
    first_name: "Jane",
    last_name: "Smith",
    email: "jane@test.com",
    created_at: "2024-06-01T00:00:00Z",
    is_active: false
};

const minTransformed = transformApiUser(minimalUser);
assertIncludes(minTransformed, {
    avatar: "/default-avatar.png",
    bio: "No bio provided",
    location: "Unknown",
    website: null,
    status: "inactive"
}, 'Uses defaults for missing fields');

// =========================================================================
// Task 2 Tests: handlePaginatedResponse()
// =========================================================================
console.log('\n📋 TASK 2: handlePaginatedResponse()');
console.log('-'.repeat(40));

assertEqual(
    handlePaginatedResponse({
        data: [1, 2, 3],
        meta: { total: 30, page: 2, per_page: 10 }
    }),
    {
        items: [1, 2, 3],
        pagination: { total: 30, page: 2, perPage: 10, totalPages: 3, hasNextPage: true, hasPrevPage: true }
    },
    'Handles meta format'
);

assertEqual(
    handlePaginatedResponse({
        results: ["a", "b"],
        pagination: { totalCount: 20, currentPage: 1, pageSize: 5 }
    }),
    {
        items: ["a", "b"],
        pagination: { total: 20, page: 1, perPage: 5, totalPages: 4, hasNextPage: true, hasPrevPage: false }
    },
    'Handles pagination format'
);

assertEqual(
    handlePaginatedResponse({
        items: [1],
        total_count: 1,
        offset: 0,
        limit: 10
    }),
    {
        items: [1],
        pagination: { total: 1, page: 1, perPage: 10, totalPages: 1, hasNextPage: false, hasPrevPage: false }
    },
    'Handles offset/limit format'
);

// =========================================================================
// Task 3 Tests: buildRequestOptions()
// =========================================================================
console.log('\n📋 TASK 3: buildRequestOptions()');
console.log('-'.repeat(40));

assertEqual(
    buildRequestOptions(
        { headers: { "X-App": "test" }, timeout: 5000 },
        { headers: { "Accept": "application/json" }, url: "/users" },
        { headers: { "Authorization": "Bearer token" }, timeout: 10000 }
    ),
    {
        headers: { "X-App": "test", "Accept": "application/json", "Authorization": "Bearer token" },
        timeout: 10000,
        url: "/users"
    },
    'Merges headers and overrides other props'
);

assertEqual(
    buildRequestOptions(
        { params: { sort: "asc" } },
        { params: { filter: "active" } },
        {}
    ),
    { params: { sort: "asc", filter: "active" } },
    'Merges params objects'
);

// =========================================================================
// Task 4 Tests: normalizeError()
// =========================================================================
console.log('\n📋 TASK 4: normalizeError()');
console.log('-'.repeat(40));

assertIncludes(
    normalizeError({ response: { data: { message: "Not found" }, status: 404 } }),
    { message: "Not found", code: 404, isNetworkError: false },
    'Handles Axios-style error'
);

assertIncludes(
    normalizeError({ message: "Bad request", statusCode: 400 }),
    { message: "Bad request", code: 400, isNetworkError: false },
    'Handles Fetch-style error'
);

assertIncludes(
    normalizeError("Something went wrong"),
    { message: "Something went wrong", code: null, isNetworkError: false },
    'Handles string error'
);

assertIncludes(
    normalizeError(new Error("Oops")),
    { message: "Oops", code: null, isNetworkError: false },
    'Handles Error object'
);

assertIncludes(
    normalizeError({ errors: [{ message: "Field invalid" }], code: 422 }),
    { message: "Field invalid", code: 422, isNetworkError: false },
    'Handles API errors array'
);

// =========================================================================
// Task 5 Tests: createDataPipeline()
// =========================================================================
console.log('\n📋 TASK 5: createDataPipeline()');
console.log('-'.repeat(40));

const pipeline = createDataPipeline(
    items => items.filter(x => x.active),
    items => items.map(x => ({ ...x, display: x.name.toUpperCase() }))
);

assertEqual(
    pipeline([
        { name: "a", active: true },
        { name: "b", active: false },
        { name: "c", active: true }
    ]),
    [
        { name: "a", active: true, display: "A" },
        { name: "c", active: true, display: "C" }
    ],
    'Pipeline filters and transforms'
);

const emptyPipeline = createDataPipeline();
assertEqual(
    emptyPipeline([1, 2, 3]),
    [1, 2, 3],
    'Empty pipeline returns input'
);

// =========================================================================
// Task 6 Tests: buildQueryString()
// =========================================================================
console.log('\n📋 TASK 6: buildQueryString()');
console.log('-'.repeat(40));

assertEqual(
    buildQueryString({ search: "test", page: 1 }),
    "search=test&page=1",
    'Basic params'
);

assertEqual(
    buildQueryString({ search: "hello world" }),
    "search=hello%20world",
    'Encodes special characters'
);

assertEqual(
    buildQueryString({ a: null, b: undefined, c: "", d: "value" }),
    "d=value",
    'Filters out empty values'
);

assertEqual(
    buildQueryString({ tags: ["a", "b"] }, { arrayFormat: "comma" }),
    "tags=a,b",
    'Array with comma format'
);

assertEqual(
    buildQueryString({ tags: ["a", "b"] }, { arrayFormat: "repeat" }),
    "tags=a&tags=b",
    'Array with repeat format'
);

assertEqual(
    buildQueryString({}),
    "",
    'Empty params returns empty string'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You\'re ready to handle any API!\n');
} else {
    console.log('💪 Keep working! API handling is crucial for React apps!\n');
}
