// Debug and fix Cynefin localStorage issue
console.clear();
console.log('=== CYNEFIN LOCALSTORAGE DEBUG & FIX ===');

// Step 1: Check current state
console.log('1. CURRENT LOCALSTORAGE STATE:');
const currentCynefin = localStorage.getItem('cynefinFrameworkAssessmentResults_v3');
const currentStacey = localStorage.getItem('staceyMatrixResults');

if (currentCynefin) {
    const parsed = JSON.parse(currentCynefin);
    console.log('✅ Cynefin data exists:', parsed);
    console.log('   Domain:', parsed.domain);
    console.log('   Decision Score:', parsed.averageDecisionScore);
    console.log('   Cause-Effect Score:', parsed.averageCauseEffectScore);
} else {
    console.log('❌ No Cynefin data found');
}

if (currentStacey) {
    const parsed = JSON.parse(currentStacey);
    console.log('✅ Stacey data exists:', parsed);
    console.log('   Area:', parsed.area);
} else {
    console.log('❌ No Stacey data found');
}

// Step 2: Clear and set proper test data
console.log('\n2. SETTING PROPER TEST DATA:');

// Function to set Complex + Complicated test scenario
function setComplexComplicated() {
    console.log('Setting Complex (Stacey) + Complicated (Cynefin)...');
    
    // Stacey: Complex (high product and technical scores)
    const staceyData = {
        product: { average: 6.5 },  // High = Complex
        technical: { average: 6.5 }, // High = Complex  
        team: { average: 3.0 },      // Low team score, no adjustment
        area: 'Complex',
        timestamp: new Date().toISOString()
    };
    
    // Cynefin: Complicated
    const cynefinData = {
        domain: 'Complicated',
        averageDecisionScore: 5.5,
        averageCauseEffectScore: 6.0,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('staceyMatrixResults', JSON.stringify(staceyData));
    localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify(cynefinData));
    
    console.log('✅ Set: Stacey=Complex, Cynefin=Complicated');
    return { staceyData, cynefinData };
}

// Function to set Simple + Clear test scenario  
function setSimpleClear() {
    console.log('Setting Simple (Stacey) + Clear (Cynefin)...');
    
    const staceyData = {
        product: { average: 2.0 },   // Low = Simple
        technical: { average: 2.0 }, // Low = Simple
        team: { average: 3.0 },      // Low team score, no adjustment
        area: 'Simple',
        timestamp: new Date().toISOString()
    };
    
    const cynefinData = {
        domain: 'Clear',
        averageDecisionScore: 8.5,
        averageCauseEffectScore: 9.0,
        timestamp: new Date().toISOString()
    };
    
    localStorage.setItem('staceyMatrixResults', JSON.stringify(staceyData));
    localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify(cynefinData));
    
    console.log('✅ Set: Stacey=Simple, Cynefin=Clear');
    return { staceyData, cynefinData };
}

// Step 3: Provide interactive controls
console.log('\n3. INTERACTIVE CONTROLS:');
console.log('Run these commands to test different scenarios:');
console.log('');
console.log('setComplexComplicated()  // Sets Complex + Complicated');
console.log('setSimpleClear()         // Sets Simple + Clear');
console.log('');
console.log('After setting data, refresh the summary page to see the delivery practices filter update.');

// Step 4: Check filter status
setTimeout(() => {
    console.log('\n4. CHECKING DELIVERY PRACTICES FILTER:');
    if (window.practicesTable) {
        console.log('✅ Practices table found');
        
        // Trigger the filter to see current behavior
        try {
            window.practicesTable.applyAssessmentFilters();
            console.log('✅ Applied assessment filters');
        } catch (error) {
            console.log('❌ Error applying filters:', error.message);
        }
    } else {
        console.log('❌ Practices table not found (may not be on summary page)');
    }
}, 1000);

// Make functions available globally
window.setComplexComplicated = setComplexComplicated;
window.setSimpleClear = setSimpleClear;

// Set default test data if none exists
if (!currentCynefin || !currentStacey) {
    console.log('\n⚠️ Missing assessment data, setting Complex + Complicated as default...');
    setComplexComplicated();
    console.log('💡 Refresh the page to see the updated results');
}
