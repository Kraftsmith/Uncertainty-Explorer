// Simple R7.20 test with inline data
console.log('🧪 Testing R7.20: Complexity Exclusion Requirement');
console.log('=====================================');

// Sample practices with primaryArea = "Predictive" for testing
const samplePredictivePractices = [
    { name: "Project plan", primaryArea: "Predictive", secondaryArea: "Hybrid" },
    { name: "Project phases", primaryArea: "Predictive", secondaryArea: "Hybrid" },
    { name: "Gantt chart", primaryArea: "Predictive", secondaryArea: "Hybrid" },
    { name: "Work breakdown structure", primaryArea: "Predictive", secondaryArea: "Hybrid" },
    { name: "Change requests management", primaryArea: "Predictive", secondaryArea: "Hybrid" }
];

// Sample non-predictive practices
const sampleOtherPractices = [
    { name: "Product roadmap", primaryArea: "Agile", secondaryArea: "Hybrid" },
    { name: "Sprint planning", primaryArea: "Agile", secondaryArea: "Agile" },
    { name: "Risk management", primaryArea: "Hybrid", secondaryArea: "Predictive" },
    { name: "Resource allocation", primaryArea: "Hybrid", secondaryArea: "Hybrid" }
];

const allPractices = [...samplePredictivePractices, ...sampleOtherPractices];

console.log(`📊 Test dataset: ${allPractices.length} practices`);
console.log(`  - ${samplePredictivePractices.length} with primaryArea = "Predictive"`);
console.log(`  - ${sampleOtherPractices.length} with other primaryArea values`);

// Decision matrix
const decisionMatrix = [
    {stacey: "Complex", cynefin: "Complex", primary: "Agile", secondary: "Agile"},
    {stacey: "Complex", cynefin: "Complicated", primary: "Agile", secondary: "Hybrid"},
    {stacey: "Simple", cynefin: "Complicated", primary: "Hybrid", secondary: "Predictive"},
    {stacey: "Complicated", cynefin: "Complicated", primary: "Hybrid", secondary: "Hybrid"},
    {stacey: "Complicated", cynefin: "Complex", primary: "Agile", secondary: "Hybrid"},
    {stacey: "Simple", cynefin: "Clear", primary: "Predictive", secondary: "Predictive"}
];

// Test function
function testR720Scenario(staceyResult, cynefinResult) {
    console.log(`\n🔍 Testing: ${staceyResult} + ${cynefinResult}`);
    
    const decision = decisionMatrix.find(d => d.stacey === staceyResult && d.cynefin === cynefinResult);
    if (!decision) {
        console.log('  ❌ No decision matrix entry found');
        return false;
    }
    
    console.log(`  📋 Decision: Primary="${decision.primary}", Secondary="${decision.secondary}"`);
    
    // Build allowed approaches
    const allowedApproaches = [decision.primary];
    if (decision.secondary && decision.primary !== decision.secondary) {
        allowedApproaches.push(decision.secondary);
    }
    
    console.log(`  📝 Allowed approaches: [${allowedApproaches.join(', ')}]`);
    
    // R7.20: Check if complexity detected
    const hasComplexity = (staceyResult === "Complex" || cynefinResult === "Complex");
    console.log(`  🔍 Complexity detected: ${hasComplexity}`);
    
    // Filter practices (R7.15-R7.19 + R7.20)
    const filteredPractices = allPractices.filter(practice => {
        const primaryMatch = allowedApproaches.includes(practice.primaryArea);
        const secondaryMatch = practice.secondaryArea && allowedApproaches.includes(practice.secondaryArea);
        const approachMatch = primaryMatch || secondaryMatch;
        
        // R7.20: Exclude if primaryArea is "Predictive" when complexity detected
        const isExcludedByComplexity = hasComplexity && practice.primaryArea === "Predictive";
        
        return approachMatch && !isExcludedByComplexity;
    });
    
    console.log(`  📊 Filtered practices: ${filteredPractices.length}/${allPractices.length}`);
    
    // R7.20 Validation
    if (hasComplexity) {
        const predictiveViolations = filteredPractices.filter(p => p.primaryArea === "Predictive");
        if (predictiveViolations.length > 0) {
            console.log(`  ❌ R7.20 VIOLATION: Found ${predictiveViolations.length} practices with primaryArea="Predictive"`);
            predictiveViolations.forEach(p => console.log(`    - "${p.name}"`));
            return false;
        } else {
            console.log(`  ✅ R7.20 COMPLIANCE: No practices with primaryArea="Predictive" when complexity detected`);
        }
    } else {
        console.log(`  ℹ️ R7.20 not applicable (no complexity detected)`);
        // Still check what predictive practices are included when no complexity
        const includedPredictive = filteredPractices.filter(p => p.primaryArea === "Predictive");
        if (includedPredictive.length > 0) {
            console.log(`  📋 Predictive practices included (allowed without complexity): ${includedPredictive.length}`);
        }
    }
    
    // Show included practices
    console.log(`  📋 Practices included:`);
    filteredPractices.forEach(p => {
        console.log(`    - "${p.name}" (${p.primaryArea}/${p.secondaryArea || 'none'})`);
    });
    
    return true;
}

// Test all scenarios
console.log('\n🧪 TESTING ALL DECISION MATRIX SCENARIOS:');
console.log('==========================================');

let allPassed = true;
decisionMatrix.forEach(scenario => {
    const passed = testR720Scenario(scenario.stacey, scenario.cynefin);
    if (!passed) allPassed = false;
});

// Final result
console.log('\n🏁 FINAL RESULT:');
console.log('================');
if (allPassed) {
    console.log('✅ All scenarios passed R7.20 compliance test!');
} else {
    console.log('❌ Some scenarios failed R7.20 compliance test!');
}

// Summary of R7.20 behavior
console.log('\n📋 R7.20 SUMMARY:');
console.log('=================');
console.log('R7.20 states: If either Cynefin OR Stacey assessment result is "Complex",');
console.log('exclude practices where primaryArea = "Predictive"');
console.log('');
console.log('Scenarios with complexity (R7.20 applies):');
console.log('- Complex + Complex: Should exclude all Predictive primary practices');
console.log('- Complex + Complicated: Should exclude all Predictive primary practices');
console.log('- Complicated + Complex: Should exclude all Predictive primary practices');
console.log('');
console.log('Scenarios without complexity (R7.20 does not apply):');
console.log('- Simple + Complicated: May include Predictive practices based on decision');
console.log('- Complicated + Complicated: May include Predictive practices based on decision');
console.log('- Simple + Clear: May include Predictive practices based on decision');
