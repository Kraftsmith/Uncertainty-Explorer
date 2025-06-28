// Test just the essential functionality without browser
console.log('🧪 Testing table initialization logic...');

// Mock DOM environment
global.document = {
    getElementById: (id) => {
        console.log(`📍 Looking for element: ${id}`);
        return {
            innerHTML: '',
            addEventListener: () => console.log(`🔗 Event listener added to ${id}`),
            textContent: '',
            value: ''
        };
    },
    createElement: () => ({ 
        className: '', 
        textContent: '', 
        appendChild: () => {} 
    }),
    addEventListener: () => {}
};

global.console.log = (...args) => {
    // Filter out excessive DOM logs, keep important ones
    const msg = args.join(' ');
    if (msg.includes('✅') || msg.includes('❌') || msg.includes('🧪') || msg.includes('Table')) {
        console.info(...args);
    }
};

// Mock localStorage
global.localStorage = {
    getItem: (key) => {
        if (key === 'staceyMatrixResults') return JSON.stringify({area: 'Complex'});
        if (key === 'cynefinFrameworkAssessmentResults_v3') return JSON.stringify({domain: 'Complex'});
        return null;
    },
    setItem: () => {}
};

// Mock Tabulator
global.Tabulator = class MockTabulator {
    constructor(selector, config) {
        console.log('🏗️ Mock Tabulator created');
        this.config = config;
        
        // Simulate async table building
        setTimeout(() => {
            console.log('🔄 Simulating table build...');
            if (config.tableBuilt) {
                config.tableBuilt();
            }
            if (config.dataLoaded) {
                config.dataLoaded([{name: 'test', primaryArea: 'Agile'}]);
            }
        }, 100);
    }
    
    getData() { return [{name: 'test', primaryArea: 'Agile'}]; }
    setFilter() { console.log('🔍 Filter set'); }
    clearFilter() { console.log('🧹 Filter cleared'); }
    addFilter() { console.log('➕ Filter added'); }
};

// Load delivery practices data
try {
    eval(require('fs').readFileSync('Data/delivery-practices.js', 'utf8'));
    console.log(`✅ Loaded ${deliveryPractices.length} practices`);
} catch (error) {
    console.error('❌ Failed to load delivery practices:', error.message);
    process.exit(1);
}

// Load and test the table class
try {
    const tableCode = require('fs').readFileSync('JavaScript/delivery-practices-table.js', 'utf8');
    eval(tableCode);
    
    console.log('✅ DeliveryPracticesTable class loaded');
    
    // Test table creation
    console.log('\n🧪 Testing table creation...');
    const table = new DeliveryPracticesTable('test-container');
    console.log('✅ Table instance created');
    
    // Test initialization
    console.log('\n🧪 Testing table initialization...');
    table.init();
    console.log('✅ Init method called');
    
    // Wait for async operations
    setTimeout(() => {
        console.log(`\n🎯 Final state: tableReady = ${table.tableReady}`);
        
        if (table.tableReady) {
            console.log('🎉 SUCCESS: Table initialization works correctly');
            
            // Test filtering
            console.log('\n🧪 Testing filter application...');
            table.applyAssessmentFilters();
            console.log('✅ Filter application completed');
            
        } else {
            console.log('❌ FAILURE: Table not ready after initialization');
        }
        
        console.log('\n' + '='.repeat(50));
        console.log('🏁 Test completed');
        
    }, 1000);
    
} catch (error) {
    console.error('❌ Error during testing:', error.message);
    console.error('Stack:', error.stack);
}
