// Debug script to examine the exact structure of saved Stacey data
console.clear();
console.log('=== STACEY DATA STRUCTURE DEBUG ===');

const staceyData = localStorage.getItem('staceyMatrixResults');
if (staceyData) {
    const parsed = JSON.parse(staceyData);
    console.log('Full Stacey data structure:');
    console.log(JSON.stringify(parsed, null, 2));
    
    console.log('\n=== KEY VALUES ===');
    console.log('Product average:', parsed.product?.average);
    console.log('Technical average:', parsed.technical?.average);
    console.log('Team average:', parsed.team?.average);
    console.log('Saved area:', parsed.area);
    
    // Check if the averages are raw or adjusted
    const teamScore = parsed.team?.average || 0;
    if (teamScore > 5) {
        const adjustment = Math.floor(teamScore - 5) * 0.5;
        const adjProduct = Math.min((parsed.product?.average || 0) + adjustment, 10);
        const adjTechnical = Math.min((parsed.technical?.average || 0) + adjustment, 10);
        
        console.log('\n=== TEAM ADJUSTMENT CHECK ===');
        console.log('Team score:', teamScore);
        console.log('Adjustment value:', adjustment);
        console.log('Adjusted product:', adjProduct);
        console.log('Adjusted technical:', adjTechnical);
        
        // Calculate what the area should be
        let calculatedArea;
        if (adjTechnical >= 8 && adjProduct >= 8) calculatedArea = "Chaotic";
        else if ((adjTechnical >= 5 && adjProduct < 8) || (adjProduct >= 5 && adjTechnical < 8)) calculatedArea = "Complex";
        else if ((adjTechnical >= 2.5 && adjProduct < 5) || (adjProduct >= 2.5 && adjTechnical < 5)) calculatedArea = "Complicated";
        else calculatedArea = "Simple";
        
        console.log('Calculated area from adjusted scores:', calculatedArea);
        console.log('Does calculated match saved?', calculatedArea === parsed.area);
        
        if (calculatedArea !== parsed.area) {
            console.log('⚠️ MISMATCH DETECTED!');
            console.log('This suggests the saved averages might already be adjusted');
        }
    } else {
        console.log('\n=== NO TEAM ADJUSTMENT NEEDED ===');
    }
} else {
    console.log('❌ No Stacey data found in localStorage');
}

// Also check what's currently displayed on the page
setTimeout(() => {
    console.log('\n=== CURRENT PAGE DISPLAY ===');
    const summaryArea = document.getElementById('area-name');
    const productScore = document.getElementById('product-score');
    const technicalScore = document.getElementById('technical-score');
    const teamScore = document.getElementById('team-score');
    
    console.log('Summary area displayed:', summaryArea?.textContent);
    console.log('Product score displayed:', productScore?.textContent);
    console.log('Technical score displayed:', technicalScore?.textContent);
    console.log('Team score displayed:', teamScore?.textContent);
}, 1000);
