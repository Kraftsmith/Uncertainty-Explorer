// Complete test for Decision Making Table on summary page
// This script sets up sample data and tests the filtering

console.log('🚀 SUMMARY PAGE DECISION MAKING TABLE TEST');

// First, set up sample assessment data
function setupTestData() {
    console.log('📝 Setting up test data...');
    
    // Set Stacey results
    const staceyData = {
        area: 'Complex',
        product: { average: 3.2 },
        technical: { average: 3.8 },
        team: { average: 3.5 },
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('staceyMatrixResults', JSON.stringify(staceyData));
    
    // Set Cynefin results  
    const cynefinData = {
        domain: 'Complicated',
        allQuestionScores: [3, 4, 3, 4, 3, 4, 3, 4],
        averageDecisionScore: 3.5,
        averageCauseEffectScore: 3.5,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify(cynefinData));
    
    console.log('✅ Test data set: Complex + Complicated');
    console.log('📋 Expected result: Primary=Agile, Secondary=Hybrid');
}

// Make the delivery practices section visible
function showDeliveryPracticesSection() {
    console.log('👁️ Making delivery practices section visible...');
    const section = document.getElementById('delivery-practices-section');
    if (section) {
        section.style.display = 'block';
        console.log('✅ Delivery practices section is now visible');
    } else {
        console.error('❌ Delivery practices section not found');
    }
}

// Initialize the table if not already done
function initializeTableIfNeeded() {
    console.log('🔧 Checking table initialization...');
    
    if (window.practicesTable && window.practicesTable.tableReady) {
        console.log('✅ Table already initialized and ready');
        return true;
    }
    
    const container = document.getElementById('delivery-practices-container');
    if (!container) {
        console.error('❌ Container not found');
        return false;
    }
    
    if (!window.practicesTable) {
        console.log('🔧 Initializing new table...');
        window.practicesTable = new DeliveryPracticesTable('delivery-practices-container');
        window.practicesTable.init();
    }
    
    return false; // Not ready yet
}

// Main test function
function runCompleteTest() {
    console.log('\n=== COMPLETE SUMMARY PAGE TEST ===');
    
    // Step 1: Setup
    setupTestData();
    showDeliveryPracticesSection();
    
    // Step 2: Initialize table if needed
    const tableReady = initializeTableIfNeeded();
    
    if (tableReady) {
        runFilterTest();
    } else {
        console.log('⏳ Waiting for table to initialize...');
        let attempts = 0;
        const checkInterval = setInterval(() => {
            attempts++;
            if (window.practicesTable && window.practicesTable.tableReady) {
                clearInterval(checkInterval);
                console.log('✅ Table ready, running test...');
                runFilterTest();
            } else if (attempts > 15) {
                clearInterval(checkInterval);
                console.error('❌ Table failed to initialize after 15 attempts');
            }
        }, 1000);
    }
}

// Test the filtering logic
function runFilterTest() {
    console.log('\n=== TESTING FILTER LOGIC ===');
    
    const table = window.practicesTable;
    
    // Test 1: Apply filters
    console.log('1️⃣ Applying assessment filters...');
    table.applyAssessmentFilters();
    
    setTimeout(() => {
        // Test 2: Validate results
        console.log('2️⃣ Validating filter results...');
        
        const filteredData = table.table.getData();
        console.log(`Filtered to ${filteredData.length} practices`);
        
        // Check decision matrix lookup
        const decision = table.getDecisionFromMatrix('Complex', 'Complicated');
        if (!decision || decision.primary !== 'Agile' || decision.secondary !== 'Hybrid') {
            console.error('❌ Decision matrix lookup failed');
            return;
        }
        console.log('✅ Decision matrix: Primary=Agile, Secondary=Hybrid');
        
        // Validate practices
        const invalidPractices = filteredData.filter(practice => {
            const hasAgile = practice.primaryArea === 'Agile' || practice.secondaryArea === 'Agile';
            const hasHybrid = practice.primaryArea === 'Hybrid' || practice.secondaryArea === 'Hybrid';
            return !(hasAgile || hasHybrid);
        });
        
        if (invalidPractices.length > 0) {
            console.error(`❌ ${invalidPractices.length} invalid practices found:`);
            invalidPractices.forEach(p => {
                console.error(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea}"`);
            });
        } else {
            console.log('✅ All filtered practices have Agile or Hybrid approaches');
        }
        
        // Test 3: Check UI elements
        console.log('3️⃣ Checking UI elements...');
        
        const statusEl = document.getElementById('filter-status');
        const discardBtn = document.getElementById('discard-filters');
        const applyBtn = document.getElementById('apply-filters');
        
        if (statusEl && statusEl.textContent.includes('Agile') && statusEl.textContent.includes('Hybrid')) {
            console.log('✅ Status message is correct');
        } else {
            console.error(`❌ Status message incorrect: "${statusEl?.textContent}"`);
        }
        
        if (discardBtn && discardBtn.style.display !== 'none') {
            console.log('✅ Discard button is visible');
        } else {
            console.error('❌ Discard button should be visible');
        }
        
        if (applyBtn && applyBtn.style.display === 'none') {
            console.log('✅ Apply button is hidden');
        } else {
            console.error('❌ Apply button should be hidden');
        }
        
        // Test 4: Test discard functionality
        console.log('4️⃣ Testing discard functionality...');
        
        table.discardAssessmentFilters();
        
        setTimeout(() => {
            const allData = table.table.getData();
            const totalPractices = deliveryPractices.length;
            
            if (allData.length === totalPractices) {
                console.log('✅ Discard filters works correctly');
            } else {
                console.error(`❌ Discard failed: expected ${totalPractices}, got ${allData.length}`);
            }
            
            // Test 5: Test re-apply functionality
            console.log('5️⃣ Testing re-apply functionality...');
            
            table.applyAssessmentFilters();
            
            setTimeout(() => {
                const reFilteredData = table.table.getData();
                
                if (reFilteredData.length < totalPractices && reFilteredData.length > 0) {
                    console.log('✅ Re-apply filters works correctly');
                } else {
                    console.error(`❌ Re-apply failed: got ${reFilteredData.length} practices`);
                }
                
                // Final report
                console.log('\n🎉 SUMMARY PAGE TEST COMPLETE');
                console.log('📊 Key Metrics:');
                console.log(`  - Total practices: ${totalPractices}`);
                console.log(`  - Filtered practices: ${reFilteredData.length}`);
                console.log(`  - Filter efficiency: ${((totalPractices - reFilteredData.length) / totalPractices * 100).toFixed(1)}% reduction`);
                console.log(`  - Assessment: Complex + Complicated → Agile/Hybrid`);
                
                const breakdown = {};
                ['Agile', 'Hybrid', 'Predictive'].forEach(approach => {
                    const count = reFilteredData.filter(p => 
                        p.primaryArea === approach || p.secondaryArea === approach
                    ).length;
                    breakdown[approach] = count;
                });
                
                console.log('📋 Practice Breakdown:');
                console.log(`  - Agile: ${breakdown.Agile}`);
                console.log(`  - Hybrid: ${breakdown.Hybrid}`);
                console.log(`  - Predictive: ${breakdown.Predictive}`);
                
                if (breakdown.Predictive === 0) {
                    console.log('🚨 WARNING: No Predictive practices shown (this might be correct for Complex+Complicated)');
                }
                
            }, 300);
        }, 300);
    }, 300);
}

// Make functions available globally
window.setupTestData = setupTestData;
window.showDeliveryPracticesSection = showDeliveryPracticesSection;
window.runCompleteTest = runCompleteTest;

// Auto-run the test
console.log('🎯 Auto-starting complete test in 2 seconds...');
setTimeout(() => {
    runCompleteTest();
}, 2000);
