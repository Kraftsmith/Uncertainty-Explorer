// COMPREHENSIVE DEBUG SCRIPT FOR AREA MISMATCH
console.clear();
console.log('=== COMPREHENSIVE AREA MISMATCH DEBUG ===');

// Step 1: Check localStorage data
console.log('\n1. LOCALSTORAGE DATA:');
const staceyData = localStorage.getItem('staceyMatrixResults');
const cynefinData = localStorage.getItem('cynefinFrameworkAssessmentResults_v3');

if (staceyData) {
    const parsed = JSON.parse(staceyData);
    console.log('✅ Stacey data found:', parsed);
    console.log('   - Stored area:', parsed.area);
    console.log('   - Product score:', parsed.product?.average);
    console.log('   - Technical score:', parsed.technical?.average);
    console.log('   - Team score:', parsed.team?.average);
} else {
    console.log('❌ No Stacey data in localStorage');
}

if (cynefinData) {
    const parsed = JSON.parse(cynefinData);
    console.log('✅ Cynefin data found:', parsed);
    console.log('   - Domain:', parsed.domain);
} else {
    console.log('❌ No Cynefin data in localStorage');
}

// Step 2: Find ALL elements that contain area-related text
console.log('\n2. ALL ELEMENTS WITH AREA TEXT:');
const allElements = document.querySelectorAll('*');
const areaWords = ['Complex', 'Complicated', 'Simple', 'Chaotic'];
let foundElements = [];

Array.from(allElements).forEach(el => {
    if (el.textContent) {
        const text = el.textContent.trim();
        for (let word of areaWords) {
            if (text === word || (text.includes(word) && text.length < 50)) {
                foundElements.push({
                    element: el,
                    id: el.id,
                    className: el.className,
                    text: text,
                    tagName: el.tagName
                });
                break;
            }
        }
    }
});

foundElements.forEach((item, index) => {
    console.log(`   ${index + 1}. ${item.tagName}#${item.id || 'no-id'}.${item.className} = "${item.text}"`);
});

// Step 3: Check specific elements
console.log('\n3. SPECIFIC ELEMENT CHECKS:');
const summaryAreaName = document.getElementById('area-name');
const summaryAreaResult = document.getElementById('area-result');

console.log('Summary area-name element:', summaryAreaName?.textContent || 'NOT FOUND');
console.log('Summary area-result element classes:', summaryAreaResult?.className || 'NOT FOUND');

// Step 4: Recalculate area using both methods
console.log('\n4. AREA CALCULATIONS:');
if (staceyData) {
    const data = JSON.parse(staceyData);
    const productScore = data.product?.average || 0;
    const technicalScore = data.technical?.average || 0;
    const teamScore = data.team?.average || 0;
    
    console.log(`Raw scores: Product=${productScore}, Technical=${technicalScore}, Team=${teamScore}`);
    
    // Apply team adjustment (same as summary.html)
    let adjProduct = productScore;
    let adjTechnical = technicalScore;
    if (teamScore > 5) {
        const adjustment = Math.floor(teamScore - 5) * 0.5;
        adjProduct = Math.min(productScore + adjustment, 10);
        adjTechnical = Math.min(technicalScore + adjustment, 10);
        console.log(`Team adjustment applied: +${adjustment}`);
    }
    
    console.log(`Adjusted scores: Product=${adjProduct}, Technical=${adjTechnical}`);
    
    // Calculate area using chart component logic
    let calculatedArea;
    if (adjTechnical >= 8 && adjProduct >= 8) calculatedArea = "Chaotic";
    else if ((adjTechnical >= 5 && adjProduct < 8) || (adjProduct >= 5 && adjTechnical < 8)) calculatedArea = "Complex";
    else if ((adjTechnical >= 2.5 && adjProduct < 5) || (adjProduct >= 2.5 && adjTechnical < 5)) calculatedArea = "Complicated";
    else calculatedArea = "Simple";
    
    console.log(`📊 Stored area: "${data.area}"`);
    console.log(`🧮 Calculated area: "${calculatedArea}"`);
    console.log(`📋 Summary shows: "${summaryAreaName?.textContent}"`);
    
    // Identify the discrepancy
    const allSame = data.area === calculatedArea && calculatedArea === summaryAreaName?.textContent;
    if (allSame) {
        console.log('✅ ALL VALUES MATCH!');
    } else {
        console.log('❌ MISMATCH DETECTED!');
        if (data.area !== calculatedArea) {
            console.log(`   - Stored area "${data.area}" differs from calculated "${calculatedArea}"`);
        }
        if (calculatedArea !== summaryAreaName?.textContent) {
            console.log(`   - Calculated area "${calculatedArea}" differs from displayed "${summaryAreaName?.textContent}"`);
        }
    }
}

// Step 5: Check if chart component is interfering
console.log('\n5. CHART COMPONENT INTERFERENCE CHECK:');
console.log('Looking for chart-created elements...');
const chartCanvas = document.querySelector('#stacey-chart-component-summary-placeholder canvas');
if (chartCanvas) {
    console.log('✅ Chart canvas found');
} else {
    console.log('❌ Chart canvas not found');
}

// Check if there are multiple elements with the same ID
const areaNameElements = document.querySelectorAll('[id="area-name"]');
const areaResultElements = document.querySelectorAll('[id="area-result"]');
console.log(`Elements with id="area-name": ${areaNameElements.length}`);
console.log(`Elements with id="area-result": ${areaResultElements.length}`);

if (areaNameElements.length > 1) {
    console.log('⚠️ MULTIPLE ELEMENTS WITH SAME ID DETECTED!');
    areaNameElements.forEach((el, i) => {
        console.log(`   ${i + 1}. "${el.textContent}" in ${el.parentElement?.className}`);
    });
}

console.log('\n=== DEBUG COMPLETE ===');
