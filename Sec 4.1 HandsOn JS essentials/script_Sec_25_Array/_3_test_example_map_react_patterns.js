/**
 * Test Suite for Challenge 3: Array.map() - React Patterns
 * ==========================================================
 * 
 * Run this file with: node _3_test_example_map_react_patterns.js
 */

const {
    prepareListItems,
    normalizeApiResponse,
    createSelectOptions,
    prepareChartData
} = require('./_3_example_map_react_patterns.js');

// =============================================================================
// Test Utilities
// =============================================================================

let testsPassed = 0;
let testsFailed = 0;
let totalTests = 0;

function assertEqual(actual, expected, testName) {
    totalTests++;
    const actualStr = JSON.stringify(actual);
    const expectedStr = JSON.stringify(expected);
    if (actualStr === expectedStr) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected: ${expectedStr}`);
        console.log(`   Actual:   ${actualStr}`);
        testsFailed++;
        return false;
    }
}

function assertType(value, expectedType, testName) {
    totalTests++;
    if (typeof value === expectedType) {
        console.log(`✅ PASS: ${testName}`);
        testsPassed++;
        return true;
    } else {
        console.log(`❌ FAIL: ${testName}`);
        console.log(`   Expected type: ${expectedType}`);
        console.log(`   Actual type:   ${typeof value}`);
        testsFailed++;
        return false;
    }
}

// =============================================================================
// Test Cases
// =============================================================================

function runTests() {
    console.log('\n' + '='.repeat(60));
    console.log('🧪 Running Challenge 3: Array.map() React Patterns Tests');
    console.log('='.repeat(60) + '\n');

    // =========================================================================
    // prepareListItems() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: prepareListItems()');
    console.log('-'.repeat(40));

    assertType(prepareListItems, 'function', 'prepareListItems is a function');

    assertEqual(
        prepareListItems([
            {id: 1, text: 'Learn React', completed: true},
            {id: 2, text: 'Build project', completed: false}
        ]),
        [
            {key: 1, displayText: '✅ Learn React', className: 'completed'},
            {key: 2, displayText: '⬜ Build project', className: 'pending'}
        ],
        'Transforms todos to list items with correct display'
    );

    assertEqual(
        prepareListItems([]),
        [],
        'Returns empty array for empty input'
    );

    assertEqual(
        prepareListItems([{id: 99, text: 'Single', completed: true}]),
        [{key: 99, displayText: '✅ Single', className: 'completed'}],
        'Handles single completed item'
    );

    assertEqual(
        prepareListItems([{id: 1, text: 'Pending', completed: false}]),
        [{key: 1, displayText: '⬜ Pending', className: 'pending'}],
        'Handles single pending item'
    );

    // All completed
    assertEqual(
        prepareListItems([
            {id: 1, text: 'A', completed: true},
            {id: 2, text: 'B', completed: true}
        ]),
        [
            {key: 1, displayText: '✅ A', className: 'completed'},
            {key: 2, displayText: '✅ B', className: 'completed'}
        ],
        'Handles all completed items'
    );

    // All pending
    assertEqual(
        prepareListItems([
            {id: 1, text: 'X', completed: false},
            {id: 2, text: 'Y', completed: false}
        ]),
        [
            {key: 1, displayText: '⬜ X', className: 'pending'},
            {key: 2, displayText: '⬜ Y', className: 'pending'}
        ],
        'Handles all pending items'
    );

    // =========================================================================
    // normalizeApiResponse() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: normalizeApiResponse()');
    console.log('-'.repeat(40));

    assertType(normalizeApiResponse, 'function', 'normalizeApiResponse is a function');

    assertEqual(
        normalizeApiResponse([{
            user_id: 1,
            first_name: 'John',
            last_name: 'Doe',
            email_address: 'john@test.com',
            is_active: true
        }]),
        [{
            userId: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@test.com',
            isActive: true
        }],
        'Converts snake_case to camelCase'
    );

    assertEqual(
        normalizeApiResponse([]),
        [],
        'Returns empty array for empty input'
    );

    // Multiple users
    assertEqual(
        normalizeApiResponse([
            {user_id: 1, first_name: 'A', last_name: 'B', email_address: 'a@b.com', is_active: true},
            {user_id: 2, first_name: 'C', last_name: 'D', email_address: 'c@d.com', is_active: false}
        ]),
        [
            {userId: 1, firstName: 'A', lastName: 'B', email: 'a@b.com', isActive: true},
            {userId: 2, firstName: 'C', lastName: 'D', email: 'c@d.com', isActive: false}
        ],
        'Handles multiple users correctly'
    );

    // Inactive user
    assertEqual(
        normalizeApiResponse([{
            user_id: 5,
            first_name: 'Inactive',
            last_name: 'User',
            email_address: 'inactive@test.com',
            is_active: false
        }]),
        [{
            userId: 5,
            firstName: 'Inactive',
            lastName: 'User',
            email: 'inactive@test.com',
            isActive: false
        }],
        'Handles inactive user (is_active: false)'
    );

    // =========================================================================
    // createSelectOptions() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: createSelectOptions()');
    console.log('-'.repeat(40));

    assertType(createSelectOptions, 'function', 'createSelectOptions is a function');

    assertEqual(
        createSelectOptions([
            {id: 1, name: 'Electronics'},
            {id: 2, name: 'Books'}
        ]),
        [
            {value: '', label: 'Select a category...'},
            {value: '1', label: 'Electronics'},
            {value: '2', label: 'Books'}
        ],
        'Creates options with default placeholder'
    );

    assertEqual(
        createSelectOptions([]),
        [{value: '', label: 'Select a category...'}],
        'Returns only default option for empty input'
    );

    assertEqual(
        createSelectOptions([{id: 99, name: 'Only Option'}]),
        [
            {value: '', label: 'Select a category...'},
            {value: '99', label: 'Only Option'}
        ],
        'Handles single category'
    );

    // Value should be string
    const options = createSelectOptions([{id: 42, name: 'Test'}]);
    assertEqual(typeof options[1].value, 'string', 'Value is converted to string');

    // =========================================================================
    // prepareChartData() Tests
    // =========================================================================
    console.log('\n📋 FUNCTION: prepareChartData()');
    console.log('-'.repeat(40));

    assertType(prepareChartData, 'function', 'prepareChartData is a function');

    assertEqual(
        prepareChartData([
            {month: 'Jan', revenue: 5000, expenses: 3000},
            {month: 'Feb', revenue: 4000, expenses: 4500},
            {month: 'Mar', revenue: 6000, expenses: 6000}
        ]),
        [
            {label: 'Jan', profit: 2000, color: 'green'},
            {label: 'Feb', profit: -500, color: 'red'},
            {label: 'Mar', profit: 0, color: 'gray'}
        ],
        'Calculates profit and assigns correct colors'
    );

    assertEqual(
        prepareChartData([]),
        [],
        'Returns empty array for empty input'
    );

    // All profitable
    assertEqual(
        prepareChartData([
            {month: 'Q1', revenue: 1000, expenses: 500},
            {month: 'Q2', revenue: 2000, expenses: 1000}
        ]),
        [
            {label: 'Q1', profit: 500, color: 'green'},
            {label: 'Q2', profit: 1000, color: 'green'}
        ],
        'Handles all profitable months'
    );

    // All losses
    assertEqual(
        prepareChartData([
            {month: 'Bad1', revenue: 100, expenses: 500},
            {month: 'Bad2', revenue: 200, expenses: 800}
        ]),
        [
            {label: 'Bad1', profit: -400, color: 'red'},
            {label: 'Bad2', profit: -600, color: 'red'}
        ],
        'Handles all loss months'
    );

    // Zero profit
    assertEqual(
        prepareChartData([{month: 'Break-even', revenue: 1000, expenses: 1000}]),
        [{label: 'Break-even', profit: 0, color: 'gray'}],
        'Handles break-even (zero profit)'
    );

    // =========================================================================
    // Final Results
    // =========================================================================
    console.log('\n' + '='.repeat(60));
    console.log('📊 TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${testsPassed}`);
    console.log(`❌ Failed: ${testsFailed}`);
    console.log('='.repeat(60));

    if (testsFailed === 0) {
        console.log('\n🎉 CONGRATULATIONS! All tests passed! 🎉');
        console.log('🚀 You\'ve mastered React-pattern map() transformations!\n');
    } else {
        console.log(`\n⚠️  ${testsFailed} test(s) failed. Keep working on it!\n`);
    }

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTests();
