// Debug script to check if chart and summary show the same area
console.log('=== CHECKING AREA SYNCHRONIZATION ===');

setTimeout(() => {
    // Check localStorage data
    const staceyData = localStorage.getItem('staceyMatrixResults');
    if (staceyData) {
        const parsed = JSON.parse(staceyData);
        console.log('📊 localStorage Stacey area:', parsed.area);
        console.log('📊 localStorage scores:', {
            product: parsed.product?.average,
            technical: parsed.technical?.average,
            team: parsed.team?.average
        });
    }
    
    // Check what the summary component displays
    const summaryArea = document.getElementById('area-name');
    if (summaryArea) {
        console.log('📋 Summary component area:', summaryArea.textContent);
    } else {
        console.log('❌ Summary area element not found');
    }
    
    // Check if there are any other area elements that might be from the chart
    const allAreaElements = document.querySelectorAll('[id*="area"]');
    console.log('🔍 All area-related elements found:');
    allAreaElements.forEach((el, index) => {
        console.log(`  ${index + 1}. ID: "${el.id}", Text: "${el.textContent}", Classes: "${el.className}"`);
    });
    
    // Calculate what the area should be based on current scores
    if (staceyData) {
        const parsed = JSON.parse(staceyData);
        const productScore = parsed.product?.average || 0;
        const technicalScore = parsed.technical?.average || 0;
        const teamScore = parsed.team?.average || 0;
        
        // Apply team adjustment if needed
        let adjProduct = productScore;
        let adjTechnical = technicalScore;
        if (teamScore > 5) {
            const adjustment = Math.floor(teamScore - 5) * 0.5;
            adjProduct = Math.min(productScore + adjustment, 10);
            adjTechnical = Math.min(technicalScore + adjustment, 10);
        }
        
        // Calculate area using same logic
        let calculatedArea;
        if (adjTechnical >= 8 && adjProduct >= 8) calculatedArea = "Chaotic";
        else if ((adjTechnical >= 5 && adjProduct < 8) || (adjProduct >= 5 && adjTechnical < 8)) calculatedArea = "Complex";
        else if ((adjTechnical >= 2.5 && adjProduct < 5) || (adjProduct >= 2.5 && adjTechnical < 5)) calculatedArea = "Complicated";
        else calculatedArea = "Simple";
        
        console.log('🧮 Calculated area based on scores:', calculatedArea);
        console.log('📊 Adjusted scores used:', { product: adjProduct, technical: adjTechnical, team: teamScore });
        
        // Compare
        if (summaryArea && summaryArea.textContent === calculatedArea) {
            console.log('✅ SUCCESS: Summary matches calculated area');
        } else {
            console.log('❌ MISMATCH: Summary does not match calculated area');
        }
    }
    
}, 1000); // Wait for components to initialize
