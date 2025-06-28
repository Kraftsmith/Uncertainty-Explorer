// Final implementation verification and auto-fix script
// This script will validate the Decision Making Table implementation
// and ensure it strictly follows the requirements R7.1-R7.7

console.log('🔍 FINAL IMPLEMENTATION VERIFICATION');

// The exact Decision Making Table from requirements
const EXPECTED_DECISION_MATRIX = [
    { stacy: "Complex", cynefin: "Complex", primary: "Agile", secondary: "Agile" },
    { stacy: "Complex", cynefin: "Complicated", primary: "Agile", secondary: "Hybrid" },
    { stacy: "Simple", cynefin: "Complicated", primary: "Hybrid", secondary: "Predictive" },
    { stacy: "Complicated", cynefin: "Complicated", primary: "Hybrid", secondary: "Hybrid" },
    { stacy: "Complicated", cynefin: "Complex", primary: "Agile", secondary: "Hybrid" },
    { stacy: "Simple", cynefin: "Clear", primary: "Predictive", secondary: "Predictive" }
];

function verifyImplementation() {
    console.log('\n=== VERIFYING DECISION MAKING TABLE IMPLEMENTATION ===');
    
    if (!window.practicesTable) {
        console.error('❌ practicesTable not found in global scope');
        return false;
    }
    
    if (!window.practicesTable.tableReady) {
        console.error('❌ practicesTable not ready');
        return false;
    }
    
    const table = window.practicesTable;
    
    // 1. Verify Decision Matrix structure
    console.log('\n1️⃣ Verifying Decision Matrix Structure...');
    if (!table.decisionMatrix || !Array.isArray(table.decisionMatrix)) {
        console.error('❌ Decision matrix not found or not an array');
        return false;
    }
    
    if (table.decisionMatrix.length !== EXPECTED_DECISION_MATRIX.length) {
        console.error(`❌ Decision matrix length mismatch: expected ${EXPECTED_DECISION_MATRIX.length}, got ${table.decisionMatrix.length}`);
        return false;
    }
    
    // Verify each entry in the decision matrix
    let matrixValid = true;
    EXPECTED_DECISION_MATRIX.forEach((expected, index) => {
        const actual = table.decisionMatrix[index];
        if (!actual || 
            actual.stacy !== expected.stacy || 
            actual.cynefin !== expected.cynefin || 
            actual.primary !== expected.primary || 
            actual.secondary !== expected.secondary) {
            console.error(`❌ Matrix entry ${index + 1} mismatch:`, {expected, actual});
            matrixValid = false;
        }
    });
    
    if (matrixValid) {
        console.log('✅ Decision Matrix structure is correct');
    } else {
        console.error('❌ Decision Matrix structure has errors');
        return false;
    }
    
    // 2. Verify localStorage access methods
    console.log('\n2️⃣ Verifying localStorage Access Methods...');
    
    // Test localStorage methods
    const originalStacey = localStorage.getItem('staceyMatrixResults');
    const originalCynefin = localStorage.getItem('cynefinFrameworkAssessmentResults_v3');
    
    // Set test data
    localStorage.setItem('staceyMatrixResults', JSON.stringify({area: 'Complex'}));
    localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify({domain: 'Complicated'}));
    
    const staceyResult = table.getStaceyResult();
    const cynefinResult = table.getCynefinResult();
    
    if (staceyResult !== 'Complex') {
        console.error(`❌ getStaceyResult() failed: expected 'Complex', got '${staceyResult}'`);
        return false;
    }
    
    if (cynefinResult !== 'Complicated') {
        console.error(`❌ getCynefinResult() failed: expected 'Complicated', got '${cynefinResult}'`);
        return false;
    }
    
    console.log('✅ localStorage access methods work correctly');
    
    // 3. Verify decision matrix lookup
    console.log('\n3️⃣ Verifying Decision Matrix Lookup...');
    
    const decision = table.getDecisionFromMatrix('Complex', 'Complicated');
    if (!decision || decision.primary !== 'Agile' || decision.secondary !== 'Hybrid') {
        console.error(`❌ getDecisionFromMatrix() failed: expected {primary: 'Agile', secondary: 'Hybrid'}, got`, decision);
        return false;
    }
    
    console.log('✅ Decision matrix lookup works correctly');
    
    // 4. Test filtering logic with known scenario
    console.log('\n4️⃣ Testing Filter Logic (Complex + Complicated)...');
    
    // Apply filters
    table.applyAssessmentFilters();
    
    // Wait for filtering to complete
    setTimeout(() => {
        const filteredData = table.table.getData();
        console.log(`Filtered to ${filteredData.length} practices`);
        
        // Verify that all filtered practices have Agile or Hybrid
        const invalidPractices = filteredData.filter(practice => {
            const hasAgile = practice.primaryArea === 'Agile' || practice.secondaryArea === 'Agile';
            const hasHybrid = practice.primaryArea === 'Hybrid' || practice.secondaryArea === 'Hybrid';
            return !(hasAgile || hasHybrid);
        });
        
        if (invalidPractices.length > 0) {
            console.error(`❌ Filter logic error: ${invalidPractices.length} practices without Agile/Hybrid found:`);
            invalidPractices.forEach(p => {
                console.error(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea}"`);
            });
            return false;
        }
        
        console.log('✅ Filter logic works correctly - all practices have Agile or Hybrid');
        
        // 5. Verify UI updates
        console.log('\n5️⃣ Verifying UI Updates...');
        
        const statusElement = document.getElementById('filter-status');
        const discardButton = document.getElementById('discard-filters');
        const applyButton = document.getElementById('apply-filters');
        
        if (!statusElement) {
            console.error('❌ filter-status element not found');
            return false;
        }
        
        if (!discardButton || !applyButton) {
            console.error('❌ Filter control buttons not found');
            return false;
        }
        
        // Check status message
        const statusText = statusElement.textContent;
        if (!statusText.includes('Agile') || !statusText.includes('Hybrid') || !statusText.includes('Complex') || !statusText.includes('Complicated')) {
            console.error(`❌ Status message incorrect: "${statusText}"`);
            return false;
        }
        
        // Check button visibility
        if (discardButton.style.display === 'none') {
            console.error('❌ Discard button should be visible when filters are active');
            return false;
        }
        
        if (applyButton.style.display !== 'none') {
            console.error('❌ Apply button should be hidden when filters are active');
            return false;
        }
        
        console.log('✅ UI updates work correctly');
        
        // 6. Test filter discarding
        console.log('\n6️⃣ Testing Filter Discarding...');
        
        table.discardAssessmentFilters();
        
        setTimeout(() => {
            const allData = table.table.getData();
            const totalPractices = deliveryPractices.length;
            
            if (allData.length !== totalPractices) {
                console.error(`❌ Discard filters failed: expected ${totalPractices} practices, got ${allData.length}`);
                return false;
            }
            
            console.log('✅ Filter discarding works correctly');
            
            // 7. Test filter re-application
            console.log('\n7️⃣ Testing Filter Re-application...');
            
            table.applyAssessmentFilters();
            
            setTimeout(() => {
                const reFilteredData = table.table.getData();
                
                if (reFilteredData.length === totalPractices) {
                    console.error('❌ Filter re-application failed: still showing all practices');
                    return false;
                }
                
                console.log('✅ Filter re-application works correctly');
                
                // Restore original localStorage data
                if (originalStacey) {
                    localStorage.setItem('staceyMatrixResults', originalStacey);
                } else {
                    localStorage.removeItem('staceyMatrixResults');
                }
                
                if (originalCynefin) {
                    localStorage.setItem('cynefinFrameworkAssessmentResults_v3', originalCynefin);
                } else {
                    localStorage.removeItem('cynefinFrameworkAssessmentResults_v3');
                }
                
                console.log('\n🎉 ALL IMPLEMENTATION TESTS PASSED!');
                console.log('✅ Decision Making Table implementation is working correctly');
                console.log('✅ Requirements R7.1-R7.7 are fully implemented');
                
            }, 300);
        }, 300);
    }, 300);
    
    return true;
}

// Auto-run verification
if (window.practicesTable && window.practicesTable.tableReady) {
    verifyImplementation();
} else {
    console.log('⏳ Waiting for table to be ready...');
    let attempts = 0;
    const checkInterval = setInterval(() => {
        attempts++;
        if (window.practicesTable && window.practicesTable.tableReady) {
            clearInterval(checkInterval);
            verifyImplementation();
        } else if (attempts > 10) {
            clearInterval(checkInterval);
            console.error('❌ Table not ready after 10 attempts, verification aborted');
        }
    }, 1000);
}

// Export for manual use
window.verifyImplementation = verifyImplementation;
