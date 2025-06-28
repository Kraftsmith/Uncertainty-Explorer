// Debug script for testing Decision Making Table
// Run this in the browser console on the summary page

function debugDecisionTable() {
    console.log('=== DECISION MAKING TABLE DEBUG ===');
    
    // Check if practicesTable exists
    if (typeof practicesTable === 'undefined') {
        console.error('❌ practicesTable not found. Make sure you are on the summary page.');
        return;
    }
    
    if (!practicesTable.tableReady) {
        console.error('❌ Table not ready. Wait for table to load.');
        return;
    }
    
    // Test Complex + Complicated combination
    console.log('\n1. Setting test data: Complex + Complicated');
    localStorage.setItem('staceyMatrixResults', JSON.stringify({
        area: 'Complex',
        average: 4.2,
        product: { average: 4.5 },
        technical: { average: 3.9 },
        team: { average: 4.0 }
    }));
    
    localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify({
        domain: 'Complicated',
        average: 3.8,
        averageDecisionScore: 7.5,
        averageCauseEffectScore: 6.8
    }));
    
    console.log('✅ Test data set');
    
    // Apply the filter
    console.log('\n2. Applying assessment filters...');
    practicesTable.applyAssessmentFilters();
    
    // Check results after a delay
    setTimeout(() => {
        console.log('\n3. Checking results...');
        const filteredData = practicesTable.table.getData();
        
        console.log(`Total practices after filtering: ${filteredData.length}`);
        
        // Count by approach
        const agile = filteredData.filter(p => p.primaryArea === 'Agile' || p.secondaryArea === 'Agile');
        const hybrid = filteredData.filter(p => p.primaryArea === 'Hybrid' || p.secondaryArea === 'Hybrid');
        const predictive = filteredData.filter(p => p.primaryArea === 'Predictive' || p.secondaryArea === 'Predictive');
        
        console.log(`- Agile practices: ${agile.length}`);
        console.log(`- Hybrid practices: ${hybrid.length}`);
        console.log(`- Predictive practices: ${predictive.length}`);
        
        if (predictive.length > 0) {
            console.error('\n❌ PROBLEM: Predictive practices found!');
            console.error('According to Decision Making Table:');
            console.error('Complex + Complicated should show ONLY Agile and Hybrid practices');
            console.error('\nPredictive practices that should NOT be shown:');
            predictive.forEach(p => {
                console.error(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea}"`);
            });
            
            // Check if these practices have Agile or Hybrid in secondaryArea
            console.error('\nAnalyzing why these practices are showing:');
            predictive.forEach(p => {
                const hasAgile = p.primaryArea === 'Agile' || p.secondaryArea === 'Agile';
                const hasHybrid = p.primaryArea === 'Hybrid' || p.secondaryArea === 'Hybrid';
                console.error(`  - "${p.name}": HasAgile=${hasAgile}, HasHybrid=${hasHybrid}`);
            });
        } else {
            console.log('\n✅ SUCCESS: No Predictive practices shown');
            console.log('Filter is working correctly for Complex + Complicated');
        }
        
        // Show all practices for verification
        console.log('\n4. All filtered practices:');
        filteredData.forEach(p => {
            console.log(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea || 'None'}"`);
        });
        
    }, 500);
}

// Auto-run the debug function
console.log('=== STARTING DEBUG ===');
console.log('Copy and paste this in the browser console on the summary page:');
console.log('debugDecisionTable()');
