// Quick validation: Set Complicated area and verify it stays Complicated
console.clear();
console.log('=== QUICK AREA VALIDATION ===');

// Set Complicated area
localStorage.setItem('staceyMatrixResults', JSON.stringify({
    product: { average: 3.5 },
    technical: { average: 3.5 },
    team: { average: 4.0 },
    area: 'Complicated',
    average: 3.7,
    timestamp: new Date().toISOString()
}));

console.log('✅ Set Stacey area to "Complicated"');

// Check localStorage
setTimeout(() => {
    const data = JSON.parse(localStorage.getItem('staceyMatrixResults'));
    console.log(`📊 localStorage area: "${data.area}"`);
    
    // Check display if available
    const areaElement = document.getElementById('area-name');
    if (areaElement) {
        console.log(`📺 Displayed area: "${areaElement.textContent}"`);
        
        if (data.area === areaElement.textContent) {
            console.log('✅ SUCCESS: Areas match!');
        } else {
            console.log('❌ MISMATCH: Areas do not match');
        }
    } else {
        console.log('📺 No area display element found');
    }
    
    // Reload the page to test the fix
    console.log('\n🔄 Reloading page to test component initialization...');
    window.location.reload();
}, 500);
