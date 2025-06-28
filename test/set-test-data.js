// AREA SYNC TEST - Set known data and check results
console.clear();
console.log('=== AREA SYNC TEST ===');

// Step 1: Set known test data
console.log('Step 1: Setting test data...');
const testStaceyData = {
    product: { average: 6.0 },  // This should result in "Complex"
    technical: { average: 6.0 }, // This should result in "Complex" 
    team: { average: 3.0 },      // Low team score, no adjustment
    area: 'Complex'              // Explicitly set to Complex
};

// Complete Cynefin data structure to match what the real assessment saves
const testCynefinData = {
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

localStorage.setItem('staceyMatrixResults', JSON.stringify(testStaceyData));
localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify(testCynefinData));

console.log('✅ Test data set:', testStaceyData);
console.log('✅ Cynefin data set:', testCynefinData);

// Step 2: Reload the page to trigger the components
console.log('Step 2: Reloading page...');
window.location.reload();
