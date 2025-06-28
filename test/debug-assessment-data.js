// Debug script to check current assessment data in localStorage
console.log('=== CHECKING ASSESSMENT DATA IN LOCALSTORAGE ===');

// Check Stacey data
const staceyData = localStorage.getItem('staceyMatrixResults');
if (staceyData) {
    const parsed = JSON.parse(staceyData);
    console.log('Stacey Assessment Data:', parsed);
    console.log('Stacey Area:', parsed.area);
} else {
    console.log('❌ No Stacey assessment data found');
}

// Check Cynefin data
const cynefinData = localStorage.getItem('cynefinFrameworkAssessmentResults_v3');
if (cynefinData) {
    const parsed = JSON.parse(cynefinData);
    console.log('Cynefin Assessment Data:', parsed);
    console.log('Cynefin Domain:', parsed.domain);
} else {
    console.log('❌ No Cynefin assessment data found');
}

// Set test data if none exists
if (!staceyData || !cynefinData) {
    console.log('\n=== SETTING TEST DATA ===');
    
    // Set Complicated Stacey result
    const testStaceyData = {
        product: { average: 7.5 },
        technical: { average: 6.2 },
        team: { average: 4.8 },
        area: 'Complicated'
    };
    localStorage.setItem('staceyMatrixResults', JSON.stringify(testStaceyData));
    
    // Set Complicated Cynefin result
    const testCynefinData = {
        domain: 'Complicated',
        averageDecisionScore: 6.5,
        averageCauseEffectScore: 7.2
    };
    localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify(testCynefinData));
    
    console.log('✅ Test data set: Stacey=Complicated, Cynefin=Complicated');
    console.log('Refresh the page to see the updated results');
}
