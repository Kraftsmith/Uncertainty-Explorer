// Automated validation script for Decision Making Table implementation
// Run this after the table is loaded to validate all functionality

console.log('🚀 STARTING AUTOMATED DECISION MAKING TABLE VALIDATION');

const DECISION_MATRIX = [
    { stacy: "Complex", cynefin: "Complex", primary: "Agile", secondary: "Agile" },
    { stacy: "Complex", cynefin: "Complicated", primary: "Agile", secondary: "Hybrid" },
    { stacy: "Simple", cynefin: "Complicated", primary: "Hybrid", secondary: "Predictive" },
    { stacy: "Complicated", cynefin: "Complicated", primary: "Hybrid", secondary: "Hybrid" },
    { stacy: "Complicated", cynefin: "Complex", primary: "Agile", secondary: "Hybrid" },
    { stacy: "Simple", cynefin: "Clear", primary: "Predictive", secondary: "Predictive" }
];

let validationResults = [];

async function validateDecisionTable() {
    if (!window.practicesTable || !window.practicesTable.tableReady) {
        console.error('❌ Table not ready for validation');
        return { success: false, error: 'Table not ready' };
    }

    console.log('✅ Table ready, starting validation...');
    
    for (let i = 0; i < DECISION_MATRIX.length; i++) {
        const scenario = DECISION_MATRIX[i];
        console.log(`\n--- Validating Scenario ${i + 1}: ${scenario.stacy} + ${scenario.cynefin} ---`);
        
        await validateScenario(scenario);
        
        // Small delay between tests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Generate final report
    generateValidationReport();
    
    return { success: true, results: validationResults };
}

async function validateScenario(scenario) {
    return new Promise((resolve) => {
        // Set test data in localStorage
        localStorage.setItem('staceyMatrixResults', JSON.stringify({area: scenario.stacy}));
        localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify({domain: scenario.cynefin}));
        
        // Apply filters
        window.practicesTable.applyAssessmentFilters();
        
        setTimeout(() => {
            const result = {
                scenario: `${scenario.stacy} + ${scenario.cynefin}`,
                stacy: scenario.stacy,
                cynefin: scenario.cynefin,
                expectedPrimary: scenario.primary,
                expectedSecondary: scenario.secondary,
                timestamp: new Date().toISOString()
            };
            
            try {
                // 1. Validate decision matrix lookup
                const decision = window.practicesTable.getDecisionFromMatrix(scenario.stacy, scenario.cynefin);
                result.decisionFound = !!decision;
                result.actualPrimary = decision?.primary;
                result.actualSecondary = decision?.secondary;
                result.matrixCorrect = decision && 
                    decision.primary === scenario.primary && 
                    decision.secondary === scenario.secondary;
                
                // 2. Validate filter results
                const filteredData = window.practicesTable.table.getData();
                result.filteredCount = filteredData.length;
                
                // 3. Validate practice categorization
                const allowedApproaches = [scenario.primary];
                if (scenario.secondary && scenario.secondary !== scenario.primary) {
                    allowedApproaches.push(scenario.secondary);
                }
                result.allowedApproaches = allowedApproaches;
                
                // Check for invalid practices (practices that shouldn't be included)
                const invalidPractices = filteredData.filter(practice => {
                    const primaryMatch = allowedApproaches.includes(practice.primaryArea);
                    const secondaryMatch = !practice.secondaryArea || allowedApproaches.includes(practice.secondaryArea);
                    return !(primaryMatch || secondaryMatch);
                });
                
                result.invalidPractices = invalidPractices.map(p => ({
                    name: p.name,
                    primaryArea: p.primaryArea,
                    secondaryArea: p.secondaryArea
                }));
                
                // Check for missing practices (practices that should be included but aren't)
                const allPractices = deliveryPractices;
                const shouldBeIncluded = allPractices.filter(practice => {
                    const primaryMatch = allowedApproaches.includes(practice.primaryArea);
                    const secondaryMatch = practice.secondaryArea && allowedApproaches.includes(practice.secondaryArea);
                    return primaryMatch || secondaryMatch;
                });
                
                const missingPractices = shouldBeIncluded.filter(should => 
                    !filteredData.find(filtered => filtered.name === should.name)
                );
                
                result.missingPractices = missingPractices.map(p => ({
                    name: p.name,
                    primaryArea: p.primaryArea,
                    secondaryArea: p.secondaryArea
                }));
                
                // 4. Calculate breakdown by approach
                result.breakdown = {};
                ['Agile', 'Hybrid', 'Predictive'].forEach(approach => {
                    const count = filteredData.filter(p => 
                        p.primaryArea === approach || p.secondaryArea === approach
                    ).length;
                    result.breakdown[approach] = count;
                });
                
                // 5. Overall validation result
                result.filterCorrect = invalidPractices.length === 0 && missingPractices.length === 0;
                result.overallSuccess = result.matrixCorrect && result.filterCorrect;
                
                // 6. Specific validation for critical scenarios
                if (scenario.stacy === 'Complex' && scenario.cynefin === 'Complicated') {
                    // Should NOT show any Predictive-only practices
                    const predictiveOnly = filteredData.filter(p => 
                        p.primaryArea === 'Predictive' && 
                        (!p.secondaryArea || p.secondaryArea === 'Predictive')
                    );
                    result.criticalValidation = {
                        type: 'no-predictive-only',
                        passed: predictiveOnly.length === 0,
                        foundCount: predictiveOnly.length,
                        examples: predictiveOnly.slice(0, 3).map(p => p.name)
                    };
                }
                
                // Log results
                console.log(`Matrix: ${result.matrixCorrect ? '✅' : '❌'} (${result.actualPrimary}/${result.actualSecondary})`);
                console.log(`Filter: ${result.filterCorrect ? '✅' : '❌'} (${result.filteredCount} practices)`);
                console.log(`Breakdown: A=${result.breakdown.Agile}, H=${result.breakdown.Hybrid}, P=${result.breakdown.Predictive}`);
                
                if (result.invalidPractices.length > 0) {
                    console.error(`❌ ${result.invalidPractices.length} invalid practices found`);
                }
                
                if (result.missingPractices.length > 0) {
                    console.warn(`⚠️ ${result.missingPractices.length} expected practices missing`);
                }
                
                if (result.criticalValidation && !result.criticalValidation.passed) {
                    console.error(`❌ Critical validation failed: ${result.criticalValidation.type}`);
                }
                
                console.log(`Overall: ${result.overallSuccess ? '✅ PASS' : '❌ FAIL'}`);
                
            } catch (error) {
                result.error = error.message;
                result.overallSuccess = false;
                console.error(`❌ Validation error: ${error.message}`);
            }
            
            validationResults.push(result);
            resolve(result);
            
        }, 400);
    });
}

function generateValidationReport() {
    console.log('\n' + '='.repeat(60));
    console.log('🎯 FINAL VALIDATION REPORT');
    console.log('='.repeat(60));
    
    const totalTests = validationResults.length;
    const passedMatrix = validationResults.filter(r => r.matrixCorrect).length;
    const passedFilter = validationResults.filter(r => r.filterCorrect).length;
    const passedOverall = validationResults.filter(r => r.overallSuccess).length;
    
    console.log(`\n📊 SUMMARY:`);
    console.log(`  Total Scenarios Tested: ${totalTests}`);
    console.log(`  Decision Matrix Tests: ${passedMatrix}/${totalTests} (${((passedMatrix/totalTests)*100).toFixed(1)}%)`);
    console.log(`  Filter Logic Tests: ${passedFilter}/${totalTests} (${((passedFilter/totalTests)*100).toFixed(1)}%)`);
    console.log(`  Overall Success Rate: ${passedOverall}/${totalTests} (${((passedOverall/totalTests)*100).toFixed(1)}%)`);
    
    // Detailed results
    console.log(`\n📋 DETAILED RESULTS:`);
    validationResults.forEach((result, index) => {
        const status = result.overallSuccess ? '✅' : '❌';
        console.log(`${index + 1}. ${status} ${result.scenario}: ${result.filteredCount} practices`);
        
        if (!result.overallSuccess) {
            if (!result.matrixCorrect) {
                console.log(`   ❌ Matrix: Expected ${result.expectedPrimary}/${result.expectedSecondary}, got ${result.actualPrimary}/${result.actualSecondary}`);
            }
            if (result.invalidPractices.length > 0) {
                console.log(`   ❌ Filter: ${result.invalidPractices.length} invalid practices`);
            }
            if (result.missingPractices.length > 0) {
                console.log(`   ⚠️ Filter: ${result.missingPractices.length} missing practices`);
            }
            if (result.criticalValidation && !result.criticalValidation.passed) {
                console.log(`   ❌ Critical: ${result.criticalValidation.type} failed`);
            }
        }
    });
    
    // Critical issues
    const criticalIssues = validationResults.filter(r => 
        r.criticalValidation && !r.criticalValidation.passed
    );
    
    if (criticalIssues.length > 0) {
        console.log(`\n🚨 CRITICAL ISSUES FOUND:`);
        criticalIssues.forEach(issue => {
            console.log(`  - ${issue.scenario}: ${issue.criticalValidation.type}`);
            if (issue.criticalValidation.examples.length > 0) {
                console.log(`    Examples: ${issue.criticalValidation.examples.join(', ')}`);
            }
        });
    }
    
    // Recommendations
    console.log(`\n💡 RECOMMENDATIONS:`);
    if (passedOverall === totalTests) {
        console.log(`  ✅ All tests passed! The Decision Making Table implementation is working correctly.`);
    } else {
        console.log(`  🔧 ${totalTests - passedOverall} scenarios need attention:`);
        
        const failedResults = validationResults.filter(r => !r.overallSuccess);
        failedResults.forEach(result => {
            console.log(`     - ${result.scenario}: Check filter logic for ${result.allowedApproaches.join('/')} approaches`);
        });
    }
    
    // Export results for external analysis
    window.validationResults = validationResults;
    console.log(`\n📁 Results exported to window.validationResults for further analysis`);
    
    return {
        totalTests,
        passedMatrix,
        passedFilter,
        passedOverall,
        successRate: (passedOverall/totalTests)*100,
        criticalIssues: criticalIssues.length,
        results: validationResults
    };
}

// Auto-run validation if table is ready
if (window.practicesTable && window.practicesTable.tableReady) {
    console.log('🎯 Auto-starting validation...');
    validateDecisionTable();
} else {
    console.log('⏳ Waiting for table to be ready...');
    let attempts = 0;
    const checkInterval = setInterval(() => {
        attempts++;
        if (window.practicesTable && window.practicesTable.tableReady) {
            clearInterval(checkInterval);
            console.log('🎯 Table ready, starting validation...');
            validateDecisionTable();
        } else if (attempts > 15) {
            clearInterval(checkInterval);
            console.error('❌ Table not ready after 15 attempts, validation aborted');
        }
    }, 1000);
}

// Export for manual use
window.validateDecisionTable = validateDecisionTable;
window.validationResults = validationResults;
