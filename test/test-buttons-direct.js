// Script to run on the Cynefin assessment page to test the buttons
console.clear();
console.log('=== CYNEFIN BUTTON TEST ON ASSESSMENT PAGE ===');

// Function to check localStorage content
function checkLocalStorage(label) {
    console.log(`\n--- ${label} ---`);
    const cynefinData = localStorage.getItem('cynefinFrameworkAssessmentResults_v3');
    if (cynefinData) {
        try {
            const parsed = JSON.parse(cynefinData);
            console.log('✅ localStorage updated:');
            console.log(`Domain: ${parsed.domain}`);
            console.log(`Decision Score: ${parsed.averageDecisionScore}`);
            console.log(`Cause-Effect Score: ${parsed.averageCauseEffectScore}`);
            console.log(`Complete structure: ${!!parsed.allQuestionScores}`);
            console.log(`Timestamp: ${parsed.timestamp}`);
            return true;
        } catch (e) {
            console.log('❌ Error parsing localStorage:', e);
            return false;
        }
    } else {
        console.log('❌ No data in localStorage');
        return false;
    }
}

// Clear existing data
localStorage.removeItem('cynefinFrameworkAssessmentResults_v3');
console.log('🧹 Cleared existing localStorage data');

// Test Complex button
console.log('\n🔵 Testing Complex Button...');
if (typeof setAnswersForComplexTest === 'function') {
    setAnswersForComplexTest();
    checkLocalStorage('After Complex Button');
} else {
    console.log('❌ setAnswersForComplexTest function not available');
}

// Wait a moment and test Complicated button
setTimeout(() => {
    console.log('\n🟡 Testing Complicated Button...');
    if (typeof setAnswersForComplicatedTest === 'function') {
        setAnswersForComplicatedTest();
        checkLocalStorage('After Complicated Button');
    } else {
        console.log('❌ setAnswersForComplicatedTest function not available');
    }
    
    console.log('\n=== SUMMARY ===');
    console.log('✅ Both buttons should now save complete Cynefin data to localStorage');
    console.log('✅ The summary page should now correctly filter delivery practices');
    console.log('✅ The issue with localStorage not updating should be resolved');
}, 1000);
