// Debug script to test table initialization directly
console.log('🐛 DEBUG: Table initialization diagnostics');

console.log('1. Checking if deliveryPractices data is loaded:');
console.log('   typeof deliveryPractices:', typeof deliveryPractices);
if (typeof deliveryPractices !== 'undefined') {
    console.log('   deliveryPractices.length:', deliveryPractices.length);
    console.log('   Sample practice:', deliveryPractices[0]);
} else {
    console.error('   ❌ deliveryPractices not loaded!');
}

console.log('2. Checking if DeliveryPracticesTable class is loaded:');
console.log('   typeof DeliveryPracticesTable:', typeof DeliveryPracticesTable);

console.log('3. Checking if Tabulator is loaded:');
console.log('   typeof Tabulator:', typeof Tabulator);

console.log('4. Checking for container:');
const container = document.getElementById('test-delivery-practices-container');
console.log('   Container found:', !!container);
if (container) {
    console.log('   Container innerHTML length:', container.innerHTML.length);
}

console.log('5. Attempting direct table creation:');
if (typeof DeliveryPracticesTable !== 'undefined' && container) {
    try {
        console.log('   Creating table instance...');
        const testTable = new DeliveryPracticesTable('test-delivery-practices-container');
        console.log('   ✅ Table instance created successfully');
        
        console.log('   Calling init()...');
        testTable.init();
        console.log('   ✅ Init called successfully');
        
        // Check readiness over time
        let checkCount = 0;
        const checkReady = () => {
            checkCount++;
            console.log(`   Check ${checkCount}: tableReady = ${testTable.tableReady}`);
            
            if (testTable.tableReady) {
                console.log('   🎉 Table is ready!');
                console.log('   Testing filter functionality...');
                
                // Set test data
                localStorage.setItem('staceyAssessmentResult', 'Complex');
                localStorage.setItem('cynefinAssessmentResult', 'Complex');
                
                // Test filter
                testTable.applyAssessmentFilters();
                
                console.log('   ✅ Filter test completed');
                
                // Make it globally accessible
                window.debugTable = testTable;
                console.log('   ✅ Table available as window.debugTable');
                
            } else if (checkCount < 10) {
                setTimeout(checkReady, 1000);
            } else {
                console.error('   ❌ Table failed to become ready within 10 seconds');
            }
        };
        
        setTimeout(checkReady, 1000);
        
    } catch (error) {
        console.error('   ❌ Error during table creation:', error);
        console.error('   Stack trace:', error.stack);
    }
} else {
    console.error('   ❌ Cannot create table - missing dependencies or container');
}
