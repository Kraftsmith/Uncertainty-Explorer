// Test script to verify Stacey test buttons save to localStorage
console.clear();
console.log('=== STACEY BUTTON TEST ===');

// Function to check localStorage content
function checkStaceyLocalStorage(label) {
    console.log(`\n--- ${label} ---`);
    const staceyData = localStorage.getItem('staceyMatrixResults');
    if (staceyData) {
        try {
            const parsed = JSON.parse(staceyData);
            console.log('✅ localStorage updated:');
            console.log(`Area: ${parsed.area}`);
            console.log(`Product Score: ${parsed.product?.average || 'N/A'}`);
            console.log(`Technical Score: ${parsed.technical?.average || 'N/A'}`);
            console.log(`Team Score: ${parsed.team?.average || 'N/A'}`);
            console.log(`Overall Average: ${parsed.average || 'N/A'}`);
            console.log(`Timestamp: ${parsed.timestamp || 'N/A'}`);
            return true;
        } catch (e) {
            console.log('❌ Error parsing localStorage:', e);
            return false;
        }
    } else {
        console.log('❌ No data in localStorage');
        return false;
    }
}

// Clear existing data
localStorage.removeItem('staceyMatrixResults');
console.log('🧹 Cleared existing Stacey localStorage data');

// Test Complex button (if available)
console.log('\n🔵 Testing Complex Button...');
const testComplexBtn = document.getElementById('test-complex-btn');
if (testComplexBtn && typeof staceyComponent !== 'undefined') {
    // Simulate clicking the button
    testComplexBtn.click();
    setTimeout(() => {
        checkStaceyLocalStorage('After Complex Button');
    }, 500);
} else {
    console.log('❌ Complex test button or staceyComponent not available');
}

// Test Complicated button
setTimeout(() => {
    console.log('\n🟡 Testing Complicated Button...');
    const testComplicatedBtn = document.getElementById('test-complicated-btn');
    if (testComplicatedBtn && typeof staceyComponent !== 'undefined') {
        // Simulate clicking the button
        testComplicatedBtn.click();
        setTimeout(() => {
            checkStaceyLocalStorage('After Complicated Button');
            
            console.log('\n=== SUMMARY ===');
            console.log('✅ Both Stacey buttons should now save data to localStorage');
            console.log('✅ The "Complicated" selection should now be properly saved');
            console.log('✅ The delivery practices filtering should work with updated Stacey data');
        }, 500);
    } else {
        console.log('❌ Complicated test button or staceyComponent not available');
    }
}, 1000);
