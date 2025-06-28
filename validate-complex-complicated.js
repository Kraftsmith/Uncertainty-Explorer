// Quick test for the problematic Complex + Complicated scenario
// This tests the specific case mentioned in the conversation

console.log('=== TESTING COMPLEX + COMPLICATED SCENARIO ===');

// Set the test data
localStorage.setItem('staceyMatrixResults', JSON.stringify({area: 'Complex'}));
localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify({domain: 'Complicated'}));

console.log('✅ Test data set: Complex + Complicated');
console.log('📋 Expected behavior:');
console.log('  - Decision Matrix: Primary=Agile, Secondary=Hybrid');
console.log('  - Should show: Practices with Agile OR Hybrid in primaryArea OR secondaryArea');
console.log('  - Should NOT show: Practices with ONLY Predictive approaches');

function validateComplexComplicated() {
    if (!window.practicesTable || !window.practicesTable.tableReady) {
        console.error('❌ Table not ready');
        return;
    }
    
    console.log('\n=== APPLYING FILTERS ===');
    window.practicesTable.applyAssessmentFilters();
    
    setTimeout(() => {
        console.log('\n=== VALIDATION RESULTS ===');
        
        // Get the decision from matrix
        const decision = window.practicesTable.getDecisionFromMatrix('Complex', 'Complicated');
        console.log(`Decision Matrix: Primary="${decision?.primary}", Secondary="${decision?.secondary}"`);
        
        if (!decision || decision.primary !== 'Agile' || decision.secondary !== 'Hybrid') {
            console.error('❌ Decision Matrix ERROR: Expected Primary=Agile, Secondary=Hybrid');
            return;
        }
        
        const filteredData = window.practicesTable.table.getData();
        console.log(`Total filtered practices: ${filteredData.length}`);
        
        // Categorize practices
        const agileOnly = filteredData.filter(p => 
            (p.primaryArea === 'Agile' || p.secondaryArea === 'Agile') &&
            p.primaryArea !== 'Predictive' && p.secondaryArea !== 'Predictive'
        );
        
        const hybridOnly = filteredData.filter(p => 
            (p.primaryArea === 'Hybrid' || p.secondaryArea === 'Hybrid') &&
            p.primaryArea !== 'Predictive' && p.secondaryArea !== 'Predictive'
        );
        
        const mixedAgileHybrid = filteredData.filter(p => 
            (p.primaryArea === 'Agile' && p.secondaryArea === 'Hybrid') ||
            (p.primaryArea === 'Hybrid' && p.secondaryArea === 'Agile')
        );
        
        const hasPredictive = filteredData.filter(p => 
            p.primaryArea === 'Predictive' || p.secondaryArea === 'Predictive'
        );
        
        const predictiveOnly = filteredData.filter(p => 
            p.primaryArea === 'Predictive' && 
            (!p.secondaryArea || p.secondaryArea === 'Predictive')
        );
        
        // Results
        console.log('\n📊 BREAKDOWN:');
        console.log(`  - Agile practices: ${agileOnly.length}`);
        console.log(`  - Hybrid practices: ${hybridOnly.length}`);
        console.log(`  - Mixed Agile/Hybrid: ${mixedAgileHybrid.length}`);
        console.log(`  - Has Predictive: ${hasPredictive.length}`);
        console.log(`  - Predictive-only: ${predictiveOnly.length}`);
        
        // Critical validation
        if (predictiveOnly.length > 0) {
            console.error('\n❌ CRITICAL ERROR: Predictive-only practices should NOT be shown for Complex + Complicated!');
            console.error('Problematic practices:');
            predictiveOnly.forEach(p => {
                console.error(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea}"`);
            });
        } else {
            console.log('\n✅ SUCCESS: No Predictive-only practices found');
        }
        
        // Validate that all practices have Agile or Hybrid
        const invalidPractices = filteredData.filter(p => {
            const hasAgile = p.primaryArea === 'Agile' || p.secondaryArea === 'Agile';
            const hasHybrid = p.primaryArea === 'Hybrid' || p.secondaryArea === 'Hybrid';
            return !(hasAgile || hasHybrid);
        });
        
        if (invalidPractices.length > 0) {
            console.error('\n❌ FILTER ERROR: Practices without Agile/Hybrid found:');
            invalidPractices.forEach(p => {
                console.error(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea}"`);
            });
        } else {
            console.log('✅ All practices have Agile or Hybrid approaches');
        }
        
        // Show some example practices
        console.log('\n📝 SAMPLE FILTERED PRACTICES:');
        filteredData.slice(0, 5).forEach(p => {
            console.log(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea || 'None'}"`);
        });
        
        const overallSuccess = predictiveOnly.length === 0 && invalidPractices.length === 0;
        console.log(`\n🎯 OVERALL RESULT: ${overallSuccess ? '✅ PASS' : '❌ FAIL'}`);
        
    }, 500);
}

// Auto-run if table is ready
if (window.practicesTable && window.practicesTable.tableReady) {
    validateComplexComplicated();
} else {
    console.log('⏳ Waiting for table to be ready...');
    let attempts = 0;
    const checkInterval = setInterval(() => {
        attempts++;
        if (window.practicesTable && window.practicesTable.tableReady) {
            clearInterval(checkInterval);
            validateComplexComplicated();
        } else if (attempts > 10) {
            clearInterval(checkInterval);
            console.error('❌ Table not ready after 10 attempts');
        }
    }, 1000);
}

// Export for manual use
window.testComplexComplicated = validateComplexComplicated;
