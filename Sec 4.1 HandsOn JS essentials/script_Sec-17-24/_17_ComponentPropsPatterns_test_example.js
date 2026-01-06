/**
 * Test Suite for Challenge 17: Component Props Patterns
 * =======================================================
 * 
 * Run this file with: node _17_ComponentPropsPatterns_test_example.js
 */

const {
    Button,
    Card,
    mergeProps,
    Box,
    validateProps,
    createEventHandlers
} = require('./_17_ComponentPropsPatterns_example.js');

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

function assertTrue(condition, testName) {
    if (condition) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
    } else {
        console.log(`❌ FAIL: ${testName}`);
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
console.log('🧪 Running Component Props Pattern Tests');
console.log('='.repeat(60) + '\n');

// =========================================================================
// Task 1 Tests: Button()
// =========================================================================
console.log('\n📋 TASK 1: Button()');
console.log('-'.repeat(40));

assertIncludes(
    Button({ children: "Click me" }),
    { tag: "button", children: "Click me", disabled: false },
    'Button with minimal props'
);

assertTrue(
    Button({}).className.includes("btn btn-primary btn-md"),
    'Default classes applied'
);

assertTrue(
    Button({ variant: "danger", size: "lg" }).className.includes("btn-danger") &&
    Button({ variant: "danger", size: "lg" }).className.includes("btn-lg"),
    'Custom variant and size'
);

assertTrue(
    Button({ disabled: true }).className.includes("btn-disabled"),
    'Disabled class when disabled'
);

assertIncludes(
    Button({ "data-testid": "submit-btn" }),
    { extraProps: { "data-testid": "submit-btn" } },
    'Rest props collected'
);

// =========================================================================
// Task 2 Tests: Card()
// =========================================================================
console.log('\n📋 TASK 2: Card()');
console.log('-'.repeat(40));

const cardResult = Card({ 
    title: "Hello", 
    subtitle: "World",
    children: "Content",
    onClick: () => {}
});

assertIncludes(cardResult, { tag: "div", isClickable: true }, 'Card with onClick is clickable');
assertIncludes(cardResult.sections, { 
    header: { title: "Hello", subtitle: "World" },
    body: "Content"
}, 'Card sections populated');

assertIncludes(
    Card({ children: "Body only" }).sections,
    { header: null, body: "Body only" },
    'No header when no title'
);

assertTrue(
    Card({ variant: "elevated" }).className.includes("elevated"),
    'Variant added to className'
);

// =========================================================================
// Task 3 Tests: mergeProps()
// =========================================================================
console.log('\n📋 TASK 3: mergeProps()');
console.log('-'.repeat(40));

assertEqual(
    mergeProps({ className: "default" }, { className: "custom" }).className,
    "default custom",
    'ClassNames concatenated'
);

assertEqual(
    mergeProps(
        { style: { color: "red", fontSize: 14 } }, 
        { style: { color: "blue" } }
    ).style,
    { color: "blue", fontSize: 14 },
    'Styles merged'
);

assertEqual(
    mergeProps({ value: 1 }, { value: 2, extra: 3 }),
    { value: 2, extra: 3, className: "", style: {} },
    'Regular props overridden'
);

// Test onClick wrapping
let call1 = false, call2 = false;
const merged = mergeProps(
    { onClick: () => { call1 = true; } },
    { onClick: () => { call2 = true; } }
);
merged.onClick({});
assertTrue(call1 && call2, 'Both onClick handlers called');

// =========================================================================
// Task 4 Tests: Box()
// =========================================================================
console.log('\n📋 TASK 4: Box()');
console.log('-'.repeat(40));

assertIncludes(
    Box({ children: "Hello" }),
    { tag: "div", children: "Hello", isValid: true },
    'Default div box'
);

assertIncludes(
    Box({ as: "a", href: "/home", children: "Link" }),
    { tag: "a", isValid: true },
    'Valid anchor'
);

assertIncludes(
    Box({ as: "a", children: "Link" }),
    { tag: "a", isValid: false },
    'Invalid anchor without href'
);

assertIncludes(
    Box({ as: "button", children: "Btn" }).props,
    { type: "button" },
    'Button gets type=button'
);

assertIncludes(
    Box({ as: "img", src: "/img.png", alt: "Image" }),
    { tag: "img", isValid: true },
    'Valid image'
);

assertIncludes(
    Box({ as: "img" }),
    { isValid: false },
    'Invalid image without src/alt'
);

// =========================================================================
// Task 5 Tests: validateProps()
// =========================================================================
console.log('\n📋 TASK 5: validateProps()');
console.log('-'.repeat(40));

const schema = {
    name: { type: "string", required: true },
    age: { type: "number", required: false, default: 0 },
    isActive: { type: "boolean", required: false, default: true }
};

assertEqual(
    validateProps({ name: "John" }, schema),
    { isValid: true, errors: [], processedProps: { name: "John", age: 0, isActive: true } },
    'Valid props with defaults'
);

assertTrue(
    validateProps({}, schema).isValid === false && 
    validateProps({}, schema).errors.length > 0,
    'Missing required prop detected'
);

assertTrue(
    validateProps({ name: 123 }, schema).isValid === false,
    'Wrong type detected'
);

// =========================================================================
// Task 6 Tests: createEventHandlers()
// =========================================================================
console.log('\n📋 TASK 6: createEventHandlers()');
console.log('-'.repeat(40));

let receivedContext = null;
const handlers = createEventHandlers(
    { onClick: (e, ctx) => { receivedContext = ctx; } },
    { id: 1, name: "test" }
);

handlers.onClick({ type: "click" });
assertIncludes(receivedContext, { id: 1, name: "test" }, 'Context passed to handler');

const handlersWithUndefined = createEventHandlers(
    { onClick: () => {}, onHover: undefined },
    {}
);
assertTrue(
    handlersWithUndefined.onClick !== undefined && 
    handlersWithUndefined.onHover === undefined,
    'Undefined handlers filtered'
);

// =============================================================================
// Summary
// =============================================================================
console.log('\n' + '='.repeat(60));
console.log(`📊 Test Results: ${testsPassed} passed, ${testsFailed} failed`);
console.log('='.repeat(60) + '\n');

if (testsFailed === 0) {
    console.log('🎉 All tests passed! You understand React props patterns!\n');
} else {
    console.log('💪 Keep working! Props handling is core to React!\n');
}
