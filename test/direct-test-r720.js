// Direct test of the R7.20 filtering logic
console.log('🔍 DIRECT TEST: R7.20 Filtering Logic');
console.log('=====================================');

// Simulate the exact scenario
const staceyResult = "Complex";
const cynefinResult = "Complex";

console.log(`Scenario: ${staceyResult} + ${cynefinResult}`);

// Decision matrix lookup (from the actual code)
const decisionMatrix = [
    { stacy: "Complex", cynefin: "Complex", primary: "Agile", secondary: "Agile" },
    { stacy: "Complex", cynefin: "Complicated", primary: "Agile", secondary: "Hybrid" },
    { stacy: "Simple", cynefin: "Complicated", primary: "Hybrid", secondary: "Predictive" },
    { stacy: "Complicated", cynefin: "Complicated", primary: "Hybrid", secondary: "Hybrid" },
    { stacy: "Complicated", cynefin: "Complex", primary: "Agile", secondary: "Hybrid" },
    { stacy: "Simple", cynefin: "Clear", primary: "Predictive", secondary: "Predictive" }
];

const decision = decisionMatrix.find(d => d.stacy === staceyResult && d.cynefin === cynefinResult);
console.log(`Decision: ${JSON.stringify(decision)}`);

// Build allowed approaches (from the actual code)
const allowedApproaches = [decision.primary];
if (decision.secondary && decision.primary !== decision.secondary) {
    allowedApproaches.push(decision.secondary);
}
console.log(`Allowed approaches: [${allowedApproaches.join(', ')}]`);

// Test the "Change requests management" practice
const changeRequestsPractice = {
    name: "Change requests management",
    primaryArea: "Predictive",
    secondaryArea: "Hybrid"
};

console.log('\n🧪 Testing "Change requests management":');
console.log(`Practice: ${JSON.stringify(changeRequestsPractice)}`);

// Apply the actual filtering logic from the code
const hasComplexity = (staceyResult === "Complex" || cynefinResult === "Complex");
console.log(`Complexity detected: ${hasComplexity}`);

if (hasComplexity) {
    console.log('Applying R7.20 custom filter function...');
    
    // This is the exact filter function from the code
    function customFilterFunction(data) {
        // Check if practice matches allowed approaches (R7.15-R7.19)
        const primaryMatch = allowedApproaches.includes(data.primaryArea);
        const secondaryMatch = data.secondaryArea && allowedApproaches.includes(data.secondaryArea);
        const approachMatch = primaryMatch || secondaryMatch;
        
        // R7.20: Exclude if primaryArea is "Predictive" when complexity detected
        const isExcludedByComplexity = data.primaryArea === "Predictive";
        
        console.log(`  Primary match (${data.primaryArea} in [${allowedApproaches.join(', ')}]): ${primaryMatch}`);
        console.log(`  Secondary match (${data.secondaryArea} in [${allowedApproaches.join(', ')}]): ${secondaryMatch}`);
        console.log(`  Approach match: ${approachMatch}`);
        console.log(`  Excluded by R7.20: ${isExcludedByComplexity}`);
        console.log(`  Final result: ${approachMatch} && !${isExcludedByComplexity} = ${approachMatch && !isExcludedByComplexity}`);
        
        return approachMatch && !isExcludedByComplexity;
    }
    
    const shouldBeIncluded = customFilterFunction(changeRequestsPractice);
    
    if (shouldBeIncluded) {
        console.log('❌ BUG: Practice should NOT be included!');
    } else {
        console.log('✅ CORRECT: Practice correctly excluded');
    }
} else {
    console.log('R7.20 not applicable (no complexity)');
}

console.log('\n🔧 DIAGNOSIS:');
console.log('If "Change requests management" is still appearing in the table,');
console.log('the issue is likely:');
console.log('1. Assessment results not being read correctly from localStorage');
console.log('2. Filter not being applied due to timing issues');
console.log('3. Table being reinitialized without filters');
console.log('4. Different data structure than expected');
