// Comprehensive test for Cynefin localStorage and filtering fix
console.clear();
console.log('=== COMPREHENSIVE CYNEFIN FILTERING TEST ===');

// Test 1: Set Complex + Complicated via the test function
console.log('\n--- Test 1: Setting Complex Stacey + Complicated Cynefin ---');

// Clear existing data
localStorage.removeItem('staceyMatrixResults');
localStorage.removeItem('cynefinFrameworkAssessmentResults_v3');

// Set test data using the improved structure
const staceyData = {
    product: { average: 6.5 },
    technical: { average: 6.5 },
    team: { average: 4.0 },
    area: 'Complex'
};

const cynefinData = {
    allQuestionScores: {
        "How much experimentation is needed?": 5.0,
        "How much expert consensus exists?": 5.0,
        "How urgent is the need to act?": 4.0,
        "How often do novel aspects emerge?": 5.5,
        "How aligned are stakeholders?": 5.0,
        "What is the tolerance for failure?": 5.0,
        "How clear are the cause-and-effect relationships?": 5.0,
        "To what extent do best practices exist?": 5.0,
        "How predictable are the outcomes?": 5.0,
        "How much historical data is available?": 5.0,
        "How frequently do unexpected outcomes occur?": 5.0,
        "How well understood are the system boundaries?": 5.0,
        "How consistent are results when repeating actions?": 7.0
    },
    domain: 'Complicated',
    averageDecisionScore: 4.8,
    averageCauseEffectScore: 5.4,
    timestamp: new Date().toISOString()
};

localStorage.setItem('staceyMatrixResults', JSON.stringify(staceyData));
localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify(cynefinData));

console.log('✅ Set Stacey data:', staceyData);
console.log('✅ Set Cynefin data:', cynefinData);

// Test 2: Verify localStorage structure
console.log('\n--- Test 2: Verifying localStorage Structure ---');
const savedStacey = localStorage.getItem('staceyMatrixResults');
const savedCynefin = localStorage.getItem('cynefinFrameworkAssessmentResults_v3');

if (savedStacey && savedCynefin) {
    try {
        const parsedStacey = JSON.parse(savedStacey);
        const parsedCynefin = JSON.parse(savedCynefin);
        
        console.log('✅ Stacey area:', parsedStacey.area);
        console.log('✅ Cynefin domain:', parsedCynefin.domain);
        console.log('✅ Cynefin has complete structure:', {
            hasAllQuestionScores: !!parsedCynefin.allQuestionScores,
            hasDecisionScore: !!parsedCynefin.averageDecisionScore,
            hasCauseEffectScore: !!parsedCynefin.averageCauseEffectScore,
            hasTimestamp: !!parsedCynefin.timestamp
        });
    } catch (e) {
        console.log('❌ Error parsing localStorage data:', e);
    }
} else {
    console.log('❌ Missing localStorage data');
}

// Test 3: Check filtering result
console.log('\n--- Test 3: Expected Filtering Result ---');
console.log('According to Decision Making Table R7.1:');
console.log('Complex (Stacey) + Complicated (Cynefin) → Primary: Agile, Secondary: Hybrid');
console.log('This should show: Agile and Hybrid practices only');

console.log('\n--- Test 4: Trigger Filtering ---');
// Try to trigger filtering if the table is available
if (window.practicesTable && window.practicesTable.tableReady) {
    console.log('🔄 Applying assessment filters...');
    window.practicesTable.applyAssessmentFilters();
    console.log('✅ Filters applied. Check the table for Agile and Hybrid practices.');
} else {
    console.log('ℹ️ Practices table not available on this page.');
    console.log('Navigate to /summary to see the filtered results.');
}

console.log('\n=== TEST COMPLETE ===');
console.log('Expected outcome: Only Agile and Hybrid practices should be visible.');
console.log('If you see Predictive practices, the issue is not yet resolved.');
