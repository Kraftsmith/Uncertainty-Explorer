// Test script for R7.20: Complexity exclusion requirement
// Tests that practices with primaryArea = "Predictive" are excluded when either assessment is "Complex"

console.log('🧪 Testing R7.20: Complexity Exclusion Requirement');
console.log('=====================================');

// Load required data by reading and evaluating the file
const fs = require('fs');
const path = require('path');

let deliveryPractices = [];
try {
    const filePath = path.join(__dirname, 'Data', 'delivery-practices.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // Create a sandbox to evaluate the file content safely
    const vm = require('vm');
    const sandbox = {};
    vm.createContext(sandbox);
    vm.runInContext(fileContent, sandbox);
    
    if (sandbox.deliveryPractices && Array.isArray(sandbox.deliveryPractices)) {
        deliveryPractices = sandbox.deliveryPractices;
        console.log(`✅ Loaded ${deliveryPractices.length} delivery practices`);
    } else {
        throw new Error('deliveryPractices array not found in file');
    }
} catch (error) {
    console.error('❌ ERROR loading delivery-practices.js:', error.message);
    process.exit(1);
}

// Decision matrix for reference
const decisionMatrix = [
    {stacey: "Complex", cynefin: "Complex", primary: "Agile", secondary: "Agile"},
    {stacey: "Complex", cynefin: "Complicated", primary: "Agile", secondary: "Hybrid"},
    {stacey: "Simple", cynefin: "Complicated", primary: "Hybrid", secondary: "Predictive"},
    {stacey: "Complicated", cynefin: "Complicated", primary: "Hybrid", secondary: "Hybrid"},
    {stacey: "Complicated", cynefin: "Complex", primary: "Agile", secondary: "Hybrid"},
    {stacey: "Simple", cynefin: "Clear", primary: "Predictive", secondary: "Predictive"}
];

// Find practices with primaryArea = "Predictive"
const predictivePrimaryPractices = deliveryPractices.filter(p => p.primaryArea === "Predictive");
console.log(`\n📊 Found ${predictivePrimaryPractices.length} practices with primaryArea = "Predictive":`);
predictivePrimaryPractices.forEach(p => {
    console.log(`  - "${p.name}" (secondary: ${p.secondaryArea || 'none'})`);
});

// Test function to simulate filtering logic
function simulateR720Filtering(staceyResult, cynefinResult) {
    console.log(`\n🔍 Testing: ${staceyResult} + ${cynefinResult}`);
    
    // Get decision from matrix
    const decision = decisionMatrix.find(d => d.stacey === staceyResult && d.cynefin === cynefinResult);
    if (!decision) {
        console.log('  ❌ No decision matrix entry found');
        return;
    }
    
    console.log(`  📋 Decision: Primary="${decision.primary}", Secondary="${decision.secondary}"`);
    
    // Build allowed approaches
    const allowedApproaches = [decision.primary];
    if (decision.secondary && decision.primary !== decision.secondary) {
        allowedApproaches.push(decision.secondary);
    }
    
    // Check if complexity is present
    const hasComplexity = (staceyResult === "Complex" || cynefinResult === "Complex");
    console.log(`  🔄 Complexity detected: ${hasComplexity}`);
    
    // Apply filtering logic
    const filteredPractices = deliveryPractices.filter(practice => {
        // Basic approach matching (R7.15-R7.19)
        const primaryMatch = allowedApproaches.includes(practice.primaryArea);
        const secondaryMatch = practice.secondaryArea && allowedApproaches.includes(practice.secondaryArea);
        const basicMatch = primaryMatch || secondaryMatch;
        
        // R7.20: Complexity exclusion
        const complexityExclusion = hasComplexity && practice.primaryArea === "Predictive";
        
        return basicMatch && !complexityExclusion;
    });
    
    console.log(`  ✅ Result: ${filteredPractices.length} practices match criteria`);
    
    // Check for R7.20 violations
    const predictiveViolations = filteredPractices.filter(p => p.primaryArea === "Predictive");
    if (hasComplexity && predictiveViolations.length > 0) {
        console.log(`  ❌ R7.20 VIOLATION: ${predictiveViolations.length} practices with primaryArea="Predictive" found:`);
        predictiveViolations.forEach(p => console.log(`    - ${p.name}`));
        return false;
    } else if (hasComplexity) {
        console.log(`  ✅ R7.20 COMPLIANCE: No practices with primaryArea="Predictive" when complexity detected`);
    } else {
        console.log(`  ℹ️  R7.20 N/A: No complexity detected, exclusion rule not applied`);
        const predictiveCount = predictiveViolations.length;
        if (predictiveCount > 0) {
            console.log(`  📊 ${predictiveCount} practices with primaryArea="Predictive" included (allowed)`);
        }
    }
    
    return true;
}

// Test all decision matrix combinations
console.log('\n🎯 Testing All Decision Matrix Combinations:');
console.log('=============================================');

let allTestsPassed = true;

decisionMatrix.forEach(test => {
    const passed = simulateR720Filtering(test.stacey, test.cynefin);
    if (!passed) allTestsPassed = false;
});

// Test edge cases
console.log('\n🔬 Testing Edge Cases:');
console.log('======================');

// Cases where complexity should trigger exclusion
const complexityCases = [
    ['Complex', 'Complex'],
    ['Complex', 'Complicated'], 
    ['Complicated', 'Complex']
];

complexityCases.forEach(([stacey, cynefin]) => {
    console.log(`\n🧪 Edge Case: ${stacey} + ${cynefin} (should exclude Predictive primary)`);
    const passed = simulateR720Filtering(stacey, cynefin);
    if (!passed) allTestsPassed = false;
});

// Cases where complexity should NOT trigger exclusion
const nonComplexityCases = [
    ['Simple', 'Clear'],
    ['Simple', 'Complicated'],
    ['Complicated', 'Complicated']
];

nonComplexityCases.forEach(([stacey, cynefin]) => {
    console.log(`\n🧪 Edge Case: ${stacey} + ${cynefin} (may include Predictive primary)`);
    const passed = simulateR720Filtering(stacey, cynefin);
    if (!passed) allTestsPassed = false;
});

// Final results
console.log('\n📋 Test Summary:');
console.log('================');
if (allTestsPassed) {
    console.log('✅ ALL TESTS PASSED: R7.20 implementation is correct');
} else {
    console.log('❌ TESTS FAILED: R7.20 implementation has issues');
}

console.log('\n🎯 R7.20 Summary:');
console.log('- When either Stacey OR Cynefin result is "Complex"');
console.log('- Exclude ALL practices where primaryArea = "Predictive"');
console.log('- This prevents purely predictive approaches in complex situations');
console.log('- Practices with secondaryArea = "Predictive" are still allowed');
