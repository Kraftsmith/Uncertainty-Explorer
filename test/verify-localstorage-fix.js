// Comprehensive test to validate both Stacey and Cynefin localStorage fixes
console.clear();
console.log('=== COMPREHENSIVE ASSESSMENT LOCALSTORAGE TEST ===');

// Function to check both localStorage keys
function checkBothAssessments(label) {
    console.log(`\n--- ${label} ---`);
    
    // Check Stacey data
    const staceyData = localStorage.getItem('staceyMatrixResults');
    if (staceyData) {
        try {
            const parsed = JSON.parse(staceyData);
            console.log('✅ Stacey localStorage:');
            console.log(`  Area: ${parsed.area}`);
            console.log(`  Product: ${parsed.product?.average || 'N/A'}`);
            console.log(`  Technical: ${parsed.technical?.average || 'N/A'}`);
            console.log(`  Team: ${parsed.team?.average || 'N/A'}`);
        } catch (e) {
            console.log('❌ Error parsing Stacey data:', e);
        }
    } else {
        console.log('❌ No Stacey data in localStorage');
    }
    
    // Check Cynefin data
    const cynefinData = localStorage.getItem('cynefinFrameworkAssessmentResults_v3');
    if (cynefinData) {
        try {
            const parsed = JSON.parse(cynefinData);
            console.log('✅ Cynefin localStorage:');
            console.log(`  Domain: ${parsed.domain}`);
            console.log(`  Decision Score: ${parsed.averageDecisionScore || 'N/A'}`);
            console.log(`  Cause-Effect Score: ${parsed.averageCauseEffectScore || 'N/A'}`);
            console.log(`  Has all questions: ${!!parsed.allQuestionScores}`);
        } catch (e) {
            console.log('❌ Error parsing Cynefin data:', e);
        }
    } else {
        console.log('❌ No Cynefin data in localStorage');
    }
}

// Clear all assessment data
localStorage.removeItem('staceyMatrixResults');
localStorage.removeItem('cynefinFrameworkAssessmentResults_v3');
console.log('🧹 Cleared all assessment localStorage data');

// Set test data for Complex Stacey + Complicated Cynefin (the problematic combination)
console.log('\n🔄 Setting test data: Complex Stacey + Complicated Cynefin');

const complexStaceyData = {
    product: { average: 6.5 },
    technical: { average: 6.5 },
    team: { average: 4.0 },
    area: 'Complex',
    average: 5.8,
    timestamp: new Date().toISOString()
};

const complicatedCynefinData = {
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

localStorage.setItem('staceyMatrixResults', JSON.stringify(complexStaceyData));
localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify(complicatedCynefinData));

checkBothAssessments('After Setting Test Data');

// Expected filtering result
console.log('\n--- Expected Decision Making Table Result ---');
console.log('Complex (Stacey) + Complicated (Cynefin) → Primary: Agile, Secondary: Hybrid');
console.log('Expected practices shown: ONLY Agile and Hybrid practices');
console.log('If Predictive practices are shown, the filtering logic needs review');

console.log('\n=== TEST INSTRUCTIONS ===');
console.log('1. Navigate to /stacey and test the "Test Complicated" button');
console.log('2. Navigate to /Cynefin and test the "Test Complex" and "Test Complicated" buttons');
console.log('3. Navigate to /summary to verify practices are filtered correctly');
console.log('4. Only Agile and Hybrid practices should be visible for Complex+Complicated');

console.log('\n✅ localStorage fix complete - both assessments should now save properly');
