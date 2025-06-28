// Test to verify that Stacey data is no longer overwritten when visiting Cynefin page
console.clear();
console.log('=== STACEY DATA PRESERVATION TEST ===');

// Step 1: Set a specific Stacey area
console.log('Step 1: Setting Stacey area to "Complicated"');
const testStaceyData = {
    product: { average: 3.5 },
    technical: { average: 3.5 },
    team: { average: 4.0 },
    area: 'Complicated',
    average: 3.7,
    timestamp: new Date().toISOString()
};

localStorage.setItem('staceyMatrixResults', JSON.stringify(testStaceyData));
console.log('✅ Stacey data set to:', testStaceyData);

// Step 2: Check the data before navigation
function checkStaceyData(label) {
    const data = localStorage.getItem('staceyMatrixResults');
    if (data) {
        const parsed = JSON.parse(data);
        console.log(`${label} - Stacey area: "${parsed.area}"`);
        return parsed.area;
    } else {
        console.log(`${label} - No Stacey data found`);
        return null;
    }
}

const beforeArea = checkStaceyData('✅ Before navigation');

// Step 3: Instructions for manual testing
console.log('\n📋 MANUAL TEST INSTRUCTIONS:');
console.log('1. Note that Stacey area is currently: "' + beforeArea + '"');
console.log('2. Navigate to http://localhost:3000/cynefin');
console.log('3. Come back to this page and run this script again:');
console.log('   checkStaceyData("✅ After visiting Cynefin")');
console.log('4. The area should STILL be "Complicated" - not "Complex"');

// Make the check function available globally
window.checkStaceyData = checkStaceyData;

console.log('\n🎯 EXPECTED RESULT: Area should remain "Complicated" after visiting Cynefin page');
console.log('🚨 BUG: If area changes to "Complex", there is still code modifying Stacey data');
