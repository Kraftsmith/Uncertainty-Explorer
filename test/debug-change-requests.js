// Test specific case: "Change requests management" for Complex + Complex
console.log('🧪 Testing: Why "Change requests management" appears for Complex + Complex');
console.log('================================================================');

// Load data properly
const fs = require('fs');
const path = require('path');

let deliveryPractices = [];
try {
    const filePath = path.join(__dirname, 'Data', 'delivery-practices.js');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract the array using regex since it's not a proper module
    const match = fileContent.match(/const deliveryPractices = (\[[\s\S]*?\]);/);
    if (match) {
        deliveryPractices = eval(match[1]);
        console.log(`✅ Loaded ${deliveryPractices.length} delivery practices`);
    } else {
        throw new Error('Could not parse deliveryPractices array');
    }
} catch (error) {
    console.error('❌ ERROR loading delivery-practices.js:', error.message);
    process.exit(1);
}

// Find "Change requests management"
const changeRequestsPractice = deliveryPractices.find(p => p.name === "Change requests management");
if (!changeRequestsPractice) {
    console.error('❌ "Change requests management" practice not found');
    process.exit(1);
}

console.log('\n📋 "Change requests management" details:');
console.log(`  Primary Area: ${changeRequestsPractice.primaryArea}`);
console.log(`  Secondary Area: ${changeRequestsPractice.secondaryArea}`);

// Test Complex + Complex scenario
const staceyResult = "Complex";
const cynefinResult = "Complex";

console.log(`\n🔍 Testing scenario: ${staceyResult} + ${cynefinResult}`);

// Decision matrix lookup
const decisionMatrix = [
    {stacey: "Complex", cynefin: "Complex", primary: "Agile", secondary: "Agile"},
    {stacey: "Complex", cynefin: "Complicated", primary: "Agile", secondary: "Hybrid"},
    {stacey: "Simple", cynefin: "Complicated", primary: "Hybrid", secondary: "Predictive"},
    {stacey: "Complicated", cynefin: "Complicated", primary: "Hybrid", secondary: "Hybrid"},
    {stacey: "Complicated", cynefin: "Complex", primary: "Agile", secondary: "Hybrid"},
    {stacey: "Simple", cynefin: "Clear", primary: "Predictive", secondary: "Predictive"}
];

const decision = decisionMatrix.find(d => d.stacey === staceyResult && d.cynefin === cynefinResult);
console.log(`📋 Decision matrix result: Primary="${decision.primary}", Secondary="${decision.secondary}"`);

// Build allowed approaches
const allowedApproaches = [decision.primary];
if (decision.secondary && decision.primary !== decision.secondary) {
    allowedApproaches.push(decision.secondary);
}
console.log(`📝 Allowed approaches: [${allowedApproaches.join(', ')}]`);

// Check R7.15-R7.19 logic (before R7.20)
const primaryMatch = allowedApproaches.includes(changeRequestsPractice.primaryArea);
const secondaryMatch = changeRequestsPractice.secondaryArea && allowedApproaches.includes(changeRequestsPractice.secondaryArea);
const approachMatch = primaryMatch || secondaryMatch;

console.log('\n🔍 R7.15-R7.19 Analysis:');
console.log(`  Primary match (${changeRequestsPractice.primaryArea} in [${allowedApproaches.join(', ')}]): ${primaryMatch}`);
console.log(`  Secondary match (${changeRequestsPractice.secondaryArea} in [${allowedApproaches.join(', ')}]): ${secondaryMatch}`);
console.log(`  Overall approach match: ${approachMatch}`);

// Check R7.20 logic
const hasComplexity = (staceyResult === "Complex" || cynefinResult === "Complex");
const isExcludedByComplexity = hasComplexity && changeRequestsPractice.primaryArea === "Predictive";

console.log('\n🔍 R7.20 Analysis:');
console.log(`  Complexity detected: ${hasComplexity}`);
console.log(`  Primary area is "Predictive": ${changeRequestsPractice.primaryArea === "Predictive"}`);
console.log(`  Should be excluded by R7.20: ${isExcludedByComplexity}`);

// Final inclusion decision
const shouldBeIncluded = approachMatch && !isExcludedByComplexity;
console.log(`\n🎯 Final Decision:`);
console.log(`  Approach match: ${approachMatch}`);
console.log(`  Excluded by R7.20: ${isExcludedByComplexity}`);
console.log(`  Should be included: ${shouldBeIncluded}`);

if (shouldBeIncluded) {
    console.log('❌ BUG: "Change requests management" should NOT be included for Complex + Complex');
    console.log('This violates R7.20 requirement');
} else {
    console.log('✅ CORRECT: "Change requests management" should be excluded for Complex + Complex');
}

// Show all practices that should be excluded by R7.20 for this scenario
console.log('\n📊 All practices that should be excluded by R7.20 for Complex + Complex:');
const predictivePractices = deliveryPractices.filter(p => p.primaryArea === "Predictive");
console.log(`Found ${predictivePractices.length} practices with primaryArea = "Predictive":`);
predictivePractices.forEach(p => {
    console.log(`  - "${p.name}" (${p.primaryArea}/${p.secondaryArea || 'none'})`);
});
