// Test script to verify Cynefin button functionality and localStorage updates
console.clear();
console.log('=== CYNEFIN BUTTON TEST ===');

// First, check initial state
console.log('Initial localStorage state:');
const initialCynefin = localStorage.getItem('cynefinFrameworkAssessmentResults_v3');
console.log('cynefinFrameworkAssessmentResults_v3:', initialCynefin ? JSON.parse(initialCynefin) : 'Not found');

// Clear any existing data
localStorage.removeItem('cynefinFrameworkAssessmentResults_v3');
console.log('\n✅ Cleared existing Cynefin data');

// Test Complex button
console.log('\n--- Testing Complex Button ---');
if (typeof setAnswersForComplexTest === 'function') {
    setAnswersForComplexTest();
    
    // Check localStorage after Complex test
    const complexResult = localStorage.getItem('cynefinFrameworkAssessmentResults_v3');
    if (complexResult) {
        const parsed = JSON.parse(complexResult);
        console.log('✅ Complex test result saved to localStorage:');
        console.log('Domain:', parsed.domain);
        console.log('Decision Score:', parsed.averageDecisionScore);
        console.log('Cause-Effect Score:', parsed.averageCauseEffectScore);
        console.log('Has all question scores:', parsed.allQuestionScores ? 'Yes' : 'No');
        console.log('Timestamp:', parsed.timestamp);
    } else {
        console.log('❌ No data saved to localStorage after Complex test');
    }
} else {
    console.log('❌ setAnswersForComplexTest function not found');
}

console.log('\n--- Testing Complicated Button ---');
if (typeof setAnswersForComplicatedTest === 'function') {
    setAnswersForComplicatedTest();
    
    // Check localStorage after Complicated test
    const complicatedResult = localStorage.getItem('cynefinFrameworkAssessmentResults_v3');
    if (complicatedResult) {
        const parsed = JSON.parse(complicatedResult);
        console.log('✅ Complicated test result saved to localStorage:');
        console.log('Domain:', parsed.domain);
        console.log('Decision Score:', parsed.averageDecisionScore);
        console.log('Cause-Effect Score:', parsed.averageCauseEffectScore);
        console.log('Has all question scores:', parsed.allQuestionScores ? 'Yes' : 'No');
        console.log('Timestamp:', parsed.timestamp);
    } else {
        console.log('❌ No data saved to localStorage after Complicated test');
    }
} else {
    console.log('❌ setAnswersForComplicatedTest function not found');
}

console.log('\n=== TEST COMPLETE ===');
console.log('You can now navigate to the summary page or test-decision-matrix.html to verify filtering works correctly.');
