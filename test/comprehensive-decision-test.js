// Comprehensive test and validation of Decision Making Table implementation
// Run this script in the browser console after loading summary.html

console.log('=== COMPREHENSIVE DECISION MAKING TABLE TEST ===');

// Test scenarios based on the Decision Making Table
const testScenarios = [
    {
        name: "Complex + Complex → Agile only",
        stacey: "Complex",
        cynefin: "Complex", 
        expectedPrimary: "Agile",
        expectedSecondary: "Agile",
        description: "Should show only Agile practices"
    },
    {
        name: "Complex + Complicated → Agile/Hybrid",
        stacey: "Complex",
        cynefin: "Complicated",
        expectedPrimary: "Agile", 
        expectedSecondary: "Hybrid",
        description: "Should show Agile and Hybrid practices, NO Predictive-only"
    },
    {
        name: "Simple + Complicated → Hybrid/Predictive", 
        stacey: "Simple",
        cynefin: "Complicated",
        expectedPrimary: "Hybrid",
        expectedSecondary: "Predictive",
        description: "Should show Hybrid and Predictive practices"
    },
    {
        name: "Complicated + Complicated → Hybrid only",
        stacey: "Complicated", 
        cynefin: "Complicated",
        expectedPrimary: "Hybrid",
        expectedSecondary: "Hybrid",
        description: "Should show only Hybrid practices"
    },
    {
        name: "Complicated + Complex → Agile/Hybrid",
        stacey: "Complicated",
        cynefin: "Complex",
        expectedPrimary: "Agile",
        expectedSecondary: "Hybrid", 
        description: "Should show Agile and Hybrid practices, NO Predictive-only"
    },
    {
        name: "Simple + Clear → Predictive only",
        stacey: "Simple",
        cynefin: "Clear",
        expectedPrimary: "Predictive",
        expectedSecondary: "Predictive",
        description: "Should show only Predictive practices"
    }
];

let testResults = [];

function runTest(scenario, index) {
    return new Promise((resolve) => {
        console.log(`\n--- Test ${index + 1}: ${scenario.name} ---`);
        console.log(`Setting: Stacey="${scenario.stacey}", Cynefin="${scenario.cynefin}"`);
        console.log(`Expected: Primary="${scenario.expectedPrimary}", Secondary="${scenario.expectedSecondary}"`);
        
        // Set test data
        localStorage.setItem('staceyMatrixResults', JSON.stringify({area: scenario.stacey}));
        localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify({domain: scenario.cynefin}));
        
        // Apply filters
        if (window.practicesTable && window.practicesTable.tableReady) {
            window.practicesTable.applyAssessmentFilters();
            
            setTimeout(() => {
                const filteredData = window.practicesTable.table.getData();
                
                // Validate decision matrix
                const decision = window.practicesTable.getDecisionFromMatrix(scenario.stacey, scenario.cynefin);
                const matrixCorrect = decision && 
                    decision.primary === scenario.expectedPrimary && 
                    decision.secondary === scenario.expectedSecondary;
                
                // Analyze filtered practices
                const allowedApproaches = [scenario.expectedPrimary];
                if (scenario.expectedSecondary && scenario.expectedSecondary !== scenario.expectedPrimary) {
                    allowedApproaches.push(scenario.expectedSecondary);
                }
                
                // Check for practices that should NOT be included
                const incorrectPractices = filteredData.filter(practice => {
                    const primaryMatch = allowedApproaches.includes(practice.primaryArea);
                    const secondaryMatch = !practice.secondaryArea || allowedApproaches.includes(practice.secondaryArea);
                    return !(primaryMatch || secondaryMatch);
                });
                
                // Check for missing practices that SHOULD be included
                const allPractices = deliveryPractices;
                const shouldBeIncluded = allPractices.filter(practice => {
                    const primaryMatch = allowedApproaches.includes(practice.primaryArea);
                    const secondaryMatch = practice.secondaryArea && allowedApproaches.includes(practice.secondaryArea);
                    return primaryMatch || secondaryMatch;
                });
                
                const missingPractices = shouldBeIncluded.filter(should => 
                    !filteredData.find(filtered => filtered.name === should.name)
                );
                
                // Categorize results
                const agile = filteredData.filter(p => p.primaryArea === 'Agile' || p.secondaryArea === 'Agile');
                const hybrid = filteredData.filter(p => p.primaryArea === 'Hybrid' || p.secondaryArea === 'Hybrid');
                const predictive = filteredData.filter(p => p.primaryArea === 'Predictive' || p.secondaryArea === 'Predictive');
                
                const result = {
                    scenario: scenario.name,
                    matrixCorrect,
                    filterCorrect: incorrectPractices.length === 0 && missingPractices.length === 0,
                    totalFiltered: filteredData.length,
                    totalExpected: shouldBeIncluded.length,
                    breakdown: { agile: agile.length, hybrid: hybrid.length, predictive: predictive.length },
                    incorrectPractices,
                    missingPractices,
                    allowedApproaches
                };
                
                // Log results
                console.log(`Matrix Decision: ${matrixCorrect ? '✅' : '❌'} (Primary="${decision?.primary}", Secondary="${decision?.secondary}")`);
                console.log(`Filter Result: ${result.filterCorrect ? '✅' : '❌'} (${result.totalFiltered}/${result.totalExpected} practices)`);
                console.log(`Breakdown: Agile=${result.breakdown.agile}, Hybrid=${result.breakdown.hybrid}, Predictive=${result.breakdown.predictive}`);
                
                if (incorrectPractices.length > 0) {
                    console.error(`❌ ${incorrectPractices.length} incorrect practices found:`);
                    incorrectPractices.forEach(p => {
                        console.error(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea}"`);
                    });
                }
                
                if (missingPractices.length > 0) {
                    console.warn(`⚠️ ${missingPractices.length} expected practices missing:`);
                    missingPractices.forEach(p => {
                        console.warn(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea}"`);
                    });
                }
                
                testResults.push(result);
                resolve();
            }, 300);
        } else {
            console.error('❌ Table not ready');
            resolve();
        }
    });
}

async function runAllTests() {
    console.log('Starting comprehensive test suite...');
    
    for (let i = 0; i < testScenarios.length; i++) {
        await runTest(testScenarios[i], i);
    }
    
    // Summary
    console.log('\n=== TEST SUMMARY ===');
    const passedMatrix = testResults.filter(r => r.matrixCorrect).length;
    const passedFilter = testResults.filter(r => r.filterCorrect).length;
    
    console.log(`Matrix Tests: ${passedMatrix}/${testResults.length} passed`);
    console.log(`Filter Tests: ${passedFilter}/${testResults.length} passed`);
    
    const failedTests = testResults.filter(r => !r.matrixCorrect || !r.filterCorrect);
    if (failedTests.length > 0) {
        console.error('\n❌ FAILED TESTS:');
        failedTests.forEach(test => {
            console.error(`- ${test.scenario}: Matrix=${test.matrixCorrect ? '✅' : '❌'}, Filter=${test.filterCorrect ? '✅' : '❌'}`);
        });
    } else {
        console.log('\n✅ ALL TESTS PASSED!');
    }
    
    return testResults;
}

// Auto-run if table is ready
if (window.practicesTable && window.practicesTable.tableReady) {
    runAllTests();
} else {
    console.log('⏳ Waiting for table to be ready...');
    setTimeout(() => {
        if (window.practicesTable && window.practicesTable.tableReady) {
            runAllTests();
        } else {
            console.error('❌ Table still not ready after timeout');
        }
    }, 2000);
}

// Export for manual use
window.testDecisionTable = runAllTests;
