// Test Complex + Complicated Decision Matrix Logic
console.log('=== TESTING COMPLEX + COMPLICATED COMBINATION ===');

// Set test data in localStorage
localStorage.setItem('stacey-assessment-result', 'Complex');
localStorage.setItem('cynefin-assessment-result', 'Complicated');

console.log('Set assessment data:');
console.log('- Stacey: Complex');
console.log('- Cynefin: Complicated');
console.log('- Expected: Only Agile (primary) and Hybrid (secondary) practices should be shown');
console.log('- NO Predictive practices should appear!');

// Wait for table to be ready
function testWhenReady() {
    if (window.practicesTable && window.practicesTable.tableReady) {
        console.log('\n=== TABLE READY - STARTING TEST ===');
        
        // Trigger the filter
        window.practicesTable.applyAssessmentFilters();
        
        // Wait a moment for filter to apply
        setTimeout(() => {
            console.log('\n=== ANALYZING RESULTS ===');
            
            // Get the filtered data
            const filteredData = window.practicesTable.table.getData();
            
            // Categorize practices
            const practicesByType = {
                agile: filteredData.filter(p => p.primaryArea === 'Agile' || p.secondaryArea === 'Agile'),
                hybrid: filteredData.filter(p => p.primaryArea === 'Hybrid' || p.secondaryArea === 'Hybrid'),
                predictive: filteredData.filter(p => p.primaryArea === 'Predictive' || p.secondaryArea === 'Predictive')
            };
            
            console.log(`Total practices shown: ${filteredData.length}`);
            console.log(`- Agile practices: ${practicesByType.agile.length}`);
            console.log(`- Hybrid practices: ${practicesByType.hybrid.length}`);
            console.log(`- Predictive practices: ${practicesByType.predictive.length}`);
            
            // Check for the critical issue
            if (practicesByType.predictive.length > 0) {
                console.error('\n❌ CRITICAL ISSUE: Predictive practices found!');
                console.error('These practices should NOT be shown for Complex + Complicated:');
                practicesByType.predictive.forEach((practice, index) => {
                    console.error(`${index + 1}. "${practice.name}"`);
                    console.error(`   Primary: ${practice.primaryArea}, Secondary: ${practice.secondaryArea}`);
                });
                
                console.log('\n=== DEBUGGING: Why are these showing? ===');
                // Check decision matrix result
                const decision = window.practicesTable.getDecisionFromMatrix('Complex', 'Complicated');
                console.log('Decision matrix result:', decision);
                
                // Check if any predictive practices match the filter criteria
                practicesByType.predictive.forEach(practice => {
                    const matchesPrimary = practice.primaryArea === decision.primary || practice.secondaryArea === decision.primary;
                    const matchesSecondary = practice.primaryArea === decision.secondary || practice.secondaryArea === decision.secondary;
                    console.log(`"${practice.name}": Matches primary (${decision.primary})? ${matchesPrimary}, Matches secondary (${decision.secondary})? ${matchesSecondary}`);
                });
                
            } else {
                console.log('\n✅ SUCCESS: No Predictive practices shown for Complex + Complicated');
            }
            
            console.log('\n=== ALL FILTERED PRACTICES ===');
            filteredData.forEach((practice, index) => {
                console.log(`${index + 1}. "${practice.name}" - Primary: ${practice.primaryArea}, Secondary: ${practice.secondaryArea}`);
            });
            
        }, 500);
        
    } else {
        console.log('Table not ready yet, waiting...');
        setTimeout(testWhenReady, 500);
    }
}

// Start the test
testWhenReady();
