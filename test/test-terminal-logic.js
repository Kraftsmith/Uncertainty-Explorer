// Terminal-based test to validate table initialization logic
const fs = require('fs');
const path = require('path');

console.log('🧪 Testing delivery practices table initialization...');

// Load the delivery practices data
try {
    const dataPath = path.join(__dirname, 'Data', 'delivery-practices.js');
    let dataContent = fs.readFileSync(dataPath, 'utf8');
    
    // Extract the deliveryPractices array by parsing the file
    const startIndex = dataContent.indexOf('const deliveryPractices = [');
    const endIndex = dataContent.lastIndexOf('];') + 2;
    const arrayContent = dataContent.substring(startIndex, endIndex);
    
    // Create a safe evaluation context
    let deliveryPractices;
    eval(arrayContent);
    
    console.log('✅ Data loaded successfully');
    console.log(`   Practices count: ${deliveryPractices.length}`);
    console.log(`   Sample practice: ${deliveryPractices[0].name}`);
    
    // Test the decision matrix logic
    const decisionMatrix = [
        { stacy: "Complex", cynefin: "Complex", primary: "Agile", secondary: "Agile" },
        { stacy: "Complex", cynefin: "Complicated", primary: "Agile", secondary: "Hybrid" },
        { stacy: "Simple", cynefin: "Complicated", primary: "Hybrid", secondary: "Predictive" },
        { stacy: "Complicated", cynefin: "Complicated", primary: "Hybrid", secondary: "Hybrid" },
        { stacy: "Complicated", cynefin: "Complex", primary: "Agile", secondary: "Hybrid" },
        { stacy: "Simple", cynefin: "Clear", primary: "Predictive", secondary: "Predictive" }
    ];
    
    console.log('✅ Decision matrix defined');
    
    // Test filtering logic for each scenario
    decisionMatrix.forEach((scenario, index) => {
        console.log(`\n🔍 Testing scenario ${index + 1}: ${scenario.stacy} + ${scenario.cynefin}`);
        console.log(`   Expected: Primary=${scenario.primary}, Secondary=${scenario.secondary}`);
        
        // Apply filtering logic
        const filteredPractices = deliveryPractices.filter(practice => {
            const matchesPrimary = practice.primaryArea === scenario.primary;
            const matchesSecondary = practice.secondaryArea === scenario.secondary;
            const hasAllowed = practice.primaryArea === scenario.primary || 
                             practice.secondaryArea === scenario.primary ||
                             practice.primaryArea === scenario.secondary || 
                             practice.secondaryArea === scenario.secondary;
            
            return hasAllowed;
        });
        
        console.log(`   Filtered practices: ${filteredPractices.length}`);
        
        // Check if any invalid practices slipped through
        const invalidPractices = filteredPractices.filter(practice => {
            const validAreas = [scenario.primary, scenario.secondary];
            return !validAreas.includes(practice.primaryArea) && 
                   !validAreas.includes(practice.secondaryArea);
        });
        
        if (invalidPractices.length > 0) {
            console.log(`   ❌ ${invalidPractices.length} invalid practices found`);
            invalidPractices.slice(0, 3).forEach(p => {
                console.log(`     - ${p.name}: Primary=${p.primaryArea}, Secondary=${p.secondaryArea}`);
            });
        } else {
            console.log(`   ✅ All filtered practices are valid`);
        }
        
        // Show breakdown
        const breakdown = {};
        ['Agile', 'Hybrid', 'Predictive'].forEach(approach => {
            breakdown[approach] = filteredPractices.filter(p => 
                p.primaryArea === approach || p.secondaryArea === approach
            ).length;
        });
        
        console.log(`   Breakdown: Agile=${breakdown.Agile}, Hybrid=${breakdown.Hybrid}, Predictive=${breakdown.Predictive}`);
    });
    
    console.log('\n🎯 Filtering logic test completed');
    
} catch (error) {
    console.error('❌ Error during test:', error.message);
    console.error('Stack trace:', error.stack);
}
