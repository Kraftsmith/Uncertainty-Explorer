// Comprehensive fix for area-result display mismatches
console.clear();
console.log('=== COMPREHENSIVE AREA DISPLAY FIX ===');

function fixAreaDisplay() {
    // Load Stacey data from localStorage
    const staceyData = localStorage.getItem('staceyMatrixResults');
    
    if (!staceyData) {
        console.log('❌ No Stacey data found. Setting default to "Simple"');
        const areaNameElement = document.getElementById('area-name');
        const areaResultElement = document.getElementById('area-result');
        
        if (areaNameElement) areaNameElement.textContent = 'Simple';
        if (areaResultElement) areaResultElement.className = 'area-display simple-area';
        
        console.log('✅ Set default area display to "Simple"');
        return;
    }
    
    try {
        const parsed = JSON.parse(staceyData);
        const correctArea = parsed.area;
        
        console.log('📊 Correct area from localStorage:', correctArea);
        console.log('📊 Stacey scores:', {
            product: parsed.product?.average,
            technical: parsed.technical?.average,
            team: parsed.team?.average
        });
        
        // Fix area-name element
        const areaNameElement = document.getElementById('area-name');
        if (areaNameElement) {
            if (areaNameElement.textContent !== correctArea) {
                console.log(`🔧 Fixing area-name: "${areaNameElement.textContent}" → "${correctArea}"`);
                areaNameElement.textContent = correctArea;
            } else {
                console.log('✅ area-name is correct:', correctArea);
            }
        } else {
            console.log('⚠️ area-name element not found');
        }
        
        // Fix area-result element classes
        const areaResultElement = document.getElementById('area-result');
        if (areaResultElement) {
            const expectedClass = `area-display ${correctArea.toLowerCase()}-area`;
            if (areaResultElement.className !== expectedClass) {
                console.log(`🔧 Fixing area-result classes: "${areaResultElement.className}" → "${expectedClass}"`);
                areaResultElement.className = expectedClass;
            } else {
                console.log('✅ area-result classes are correct:', expectedClass);
            }
        } else {
            console.log('⚠️ area-result element not found');
        }
        
        // Update summary component if available
        if (typeof updateStaceySummaryComponent === 'function') {
            console.log('🔄 Updating Stacey summary component...');
            updateStaceySummaryComponent({
                area: correctArea,
                productScore: parsed.product?.average || 0,
                technicalScore: parsed.technical?.average || 0,
                teamScore: parsed.team?.average || 0
            });
            console.log('✅ Summary component updated');
        }
        
        console.log('\n✅ AREA DISPLAY FIX COMPLETE');
        console.log(`Final area: "${correctArea}"`);
        
    } catch (e) {
        console.log('❌ Error parsing Stacey data:', e);
    }
}

// Run the fix
fixAreaDisplay();

// Make it available globally for repeated use
window.fixAreaDisplay = fixAreaDisplay;

console.log('\n💡 TIP: You can run "fixAreaDisplay()" anytime to correct the display');
console.log('💡 This function is now available globally for quick fixes');
