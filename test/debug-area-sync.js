// Test script to verify the Stacey area doesn't get overwritten when navigating between pages
console.clear();
console.log('=== STACEY AREA PRESERVATION TEST ===');

// Function to check current Stacey area in localStorage
function checkStaceyArea(label) {
    console.log(`\n--- ${label} ---`);
    const staceyData = localStorage.getItem('staceyMatrixResults');
    if (staceyData) {
        try {
            const parsed = JSON.parse(staceyData);
            console.log(`✅ Stacey area in localStorage: "${parsed.area}"`);
            console.log(`   Product: ${parsed.product?.average}, Technical: ${parsed.technical?.average}, Team: ${parsed.team?.average}`);
            return parsed.area;
        } catch (e) {
            console.log('❌ Error parsing Stacey data:', e);
            return null;
        }
    } else {
        console.log('❌ No Stacey data in localStorage');
        return null;
    }
}

// Function to check what's displayed on the page
function checkDisplayedArea(label) {
    console.log(`\n--- ${label} ---`);
    const areaNameElement = document.getElementById('area-name');
    if (areaNameElement) {
        console.log(`📺 Displayed area: "${areaNameElement.textContent}"`);
        return areaNameElement.textContent;
    } else {
        console.log('📺 No area-name element found on this page');
        return null;
    }
}

// Step 1: Set a specific area in localStorage
console.log('\n🔧 Step 1: Setting test data with "Complicated" area');
const testData = {
    product: { average: 3.5 },
    technical: { average: 3.5 },
    team: { average: 4.0 },
    area: 'Complicated',
    average: 3.7,
    timestamp: new Date().toISOString()
};

localStorage.setItem('staceyMatrixResults', JSON.stringify(testData));
const initialArea = checkStaceyArea('After Setting Test Data');

// Step 2: Check what area is displayed
setTimeout(() => {
    const displayedArea = checkDisplayedArea('Current Page Display');
    
    // Step 3: Validate consistency
    console.log('\n🔍 Validation Results:');
    if (initialArea === displayedArea) {
        console.log('✅ SUCCESS: localStorage and display are consistent');
    } else {
        console.log('❌ ISSUE: localStorage and display are inconsistent');
        console.log(`   localStorage: "${initialArea}"`);
        console.log(`   Display: "${displayedArea}"`);
    }
    
    console.log('\n📋 Instructions:');
    console.log('1. Note the current area value');
    console.log('2. Navigate to /Cynefin page');
    console.log('3. Navigate back to /summary page');
    console.log('4. Run this script again to see if the area changed');
    console.log('5. The area should remain "Complicated" throughout navigation');
    
}, 500);
