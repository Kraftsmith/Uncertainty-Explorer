// Test script to validate and fix Decision Making Table implementation
// Run this in the browser console on the summary page

console.log('=== DECISION MAKING TABLE VALIDATION TEST ===');

// 1. Set up test data for Complex + Complicated (should show only Agile/Hybrid)
localStorage.setItem('staceyMatrixResults', JSON.stringify({area: 'Complex'}));
localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify({domain: 'Complicated'}));

console.log('Test data set: Complex + Complicated');
console.log('Expected: Primary=Agile, Secondary=Hybrid');
console.log('Should show: Practices with Agile OR Hybrid in primaryArea OR secondaryArea');
console.log('Should NOT show: Practices with ONLY Predictive approaches');

// Wait for table to be ready, then test
setTimeout(() => {
    if (window.practicesTable && window.practicesTable.tableReady) {
        console.log('\n=== APPLYING FILTERS ===');
        window.practicesTable.applyAssessmentFilters();
        
        setTimeout(() => {
            console.log('\n=== VALIDATION RESULTS ===');
            const filteredData = window.practicesTable.table.getData();
            
            // Check for incorrect practices
            const predictiveOnlyPractices = filteredData.filter(p => {
                const primaryPredictive = p.primaryArea === 'Predictive';
                const secondaryPredictive = p.secondaryArea === 'Predictive';
                const hasAgileHybrid = p.primaryArea === 'Agile' || p.primaryArea === 'Hybrid' || 
                                      p.secondaryArea === 'Agile' || p.secondaryArea === 'Hybrid';
                
                // Return true if it's a practice that should NOT be shown
                return (primaryPredictive || secondaryPredictive) && !hasAgileHybrid;
            });
            
            if (predictiveOnlyPractices.length > 0) {
                console.error(`❌ FILTER ERROR: ${predictiveOnlyPractices.length} incorrect practices found:`);
                predictiveOnlyPractices.forEach(p => {
                    console.error(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea}"`);
                });
            } else {
                console.log('✅ FILTER SUCCESS: No incorrect practices found');
            }
            
            // Show breakdown
            const agile = filteredData.filter(p => p.primaryArea === 'Agile' || p.secondaryArea === 'Agile');
            const hybrid = filteredData.filter(p => p.primaryArea === 'Hybrid' || p.secondaryArea === 'Hybrid');
            const predictive = filteredData.filter(p => p.primaryArea === 'Predictive' || p.secondaryArea === 'Predictive');
            
            console.log(`\nBreakdown: Total=${filteredData.length}, Agile=${agile.length}, Hybrid=${hybrid.length}, Predictive=${predictive.length}`);
            
            // Run the table's own test method
            console.log('\n=== RUNNING TABLE TEST METHOD ===');
            window.practicesTable.testFilter();
            
        }, 500);
    } else {
        console.error('❌ Table not ready or not found');
    }
}, 1000);
