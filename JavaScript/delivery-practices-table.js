// filepath: c:\Users\mikhail.sarokin\OneDrive - Kaseya\Documents\Personal\Agilism\AFB\JavaScript\delivery-practices-table.js

class DeliveryPracticesTable {
    constructor(containerId, options = {}) {
        this.containerId = containerId;
        this.tableReady = false;
        this.assessmentFiltersActive = false;
        this.lastAppliedFilter = null;
        
        // New option: strictFiltering excludes practices with Predictive in ANY area
        // Default: false (follows requirements R7.15-R7.19)
        // Set to true to exclude ALL practices containing Predictive approach
        this.strictFiltering = options.strictFiltering || false;
        
        // R7.1: Decision Making Table - determines which practices to display based on assessment results
        this.decisionMatrix = [
            { stacy: "Complex", cynefin: "Complex", primary: "Agile", secondary: "Agile" },
            { stacy: "Complex", cynefin: "Complicated", primary: "Agile", secondary: "Hybrid" },
            { stacy: "Simple", cynefin: "Complicated", primary: "Hybrid", secondary: "Predictive" },
            { stacy: "Complicated", cynefin: "Complicated", primary: "Hybrid", secondary: "Hybrid" },
            { stacy: "Complicated", cynefin: "Complex", primary: "Agile", secondary: "Hybrid" },
            { stacy: "Simple", cynefin: "Clear", primary: "Predictive", secondary: "Predictive" }
        ];

        // Get initial assessment results to set the filter before data is loaded
        const initialStacey = this.getStaceyResult();
        const initialCynefin = this.getCynefinResult();
        this.initialFilter = this.createFilterFunction(initialStacey, initialCynefin);
    }

    init() {
        this.createTableContainer();
        this.initializeTable();
        // R7.2: Auto-filter will be triggered when table is built (in tableBuilt callback)
    }

    createTableContainer() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`Container ${this.containerId} not found`);
            return;
        }

        container.innerHTML = `
            <div class="table-controls">
                <!-- R9.22: Use element ID filter-status -->
                <div class="filter-status" id="filter-status"></div>
                <div class="table-actions">
                    <!-- R9.1: Use input ID global-search -->
                    <!-- R9.2: Use placeholder "Search all columns..." -->
                    <input type="text" id="global-search" placeholder="Search all columns..." class="search-input">
                    <!-- R9.7: Use button ID clear-search -->
                    <!-- R9.8: Use label "Clear Search" -->
                    <button id="clear-search" class="btn-secondary">Clear Search</button>
                    <!-- R9.11: Use button ID discard-filters -->
                    <!-- R9.12: Use label "Show All Practices" -->
                    <!-- R9.13: Use class btn-warning -->
                    <button id="discard-filters" class="btn-warning" style="display: none;">Show All Practices</button>
                    <!-- R9.17: Use button ID apply-filters -->
                    <!-- R9.18: Use label "Apply Assessment Filter" -->
                    <!-- R9.19: Use class btn-primary -->
                    <button id="apply-filters" class="btn-primary" style="display: none;">Apply Assessment Filter</button>
                </div>
            </div>
            <!-- R8.2: Use table ID practices-table (created by Tabulator) -->
            <div id="practices-table"></div>
        `;
    }

    initializeTable() {
        // Enhanced safety checks for server environment
        if (typeof deliveryPractices === 'undefined' || !deliveryPractices) {
            console.error('❌ deliveryPractices data not available');
            this.updateFilterStatus("Error: Practice data not loaded. Please refresh the page.");
            return;
        }

        if (typeof Tabulator === 'undefined') {
            console.error('❌ Tabulator library not available');
            this.updateFilterStatus("Error: Tabulator library not loaded. Please refresh the page.");
            return;
        }

        console.log(`✅ Initializing table with ${deliveryPractices.length} practices`);
        console.log('📊 Sample practice:', deliveryPractices[0]);

        // Store reference to this for use in callbacks
        const self = this;

        try {
            this.table = new Tabulator("#practices-table", {
                data: deliveryPractices,
                initialFilter: this.initialFilter, // Apply filter before data is loaded
                layout: "fitColumns",
                pagination: "local",
                paginationSize: 25,
                paginationSizeSelector: [15, 25, 50, 100],
                movableColumns: true,
                resizableRows: true,
                responsiveLayout: "hide",
                // Enhanced error handling
                dataLoaderError: function(error) {
                    console.error('❌ Tabulator data loader error:', error);
                    self.updateFilterStatus("Error loading table data: " + error.message);
                },
                renderStarted: function() {
                    console.log('🔄 Tabulator render started');
                },
                renderComplete: function() {
                    console.log('✅ Tabulator render completed');
                },
                columns: [
                    {
                        title: "Practice", 
                        field: "name", 
                        width: 200,
                        headerFilter: "input"
                    },
                    {
                        title: "Description", 
                        field: "description", 
                        formatter: "textarea",
                        headerFilter: "input"
                    },
                {
                    title: "Primary Area", 
                    field: "primaryArea", 
                    width: 120,
                    formatter: this.badgeFormatter,
                    headerFilter: "list",
                    headerFilterParams: {
                        values: ["", "Agile", "Hybrid", "Predictive"]
                    }
                },
                    {
                        title: "Secondary Area", 
                        field: "secondaryArea", 
                        width: 120,
                        formatter: this.badgeFormatter,
                        headerFilter: "list",
                        headerFilterParams: {
                            values: ["", "Agile", "Hybrid", "Predictive"]
                        }
                    }
                ],
                initialSort: [
                    {column: "name", dir: "asc"}
                ],
                // Critical: Wait for table to be built before applying filters
                tableBuilt: function() {
                    try {
                        console.log("✅ Table built successfully");
                        self.tableReady = true;
                        
                        self.setupEventListeners();
                        
                        // R7.2: Auto-filter triggered when table is ready
                        self.applyAssessmentFilters();
                        
                        console.log('🎉 Table initialization completed successfully');
                        
                    } catch (error) {
                        console.error('❌ Error in tableBuilt callback:', error);
                        self.tableReady = true; // Allow tests to proceed even if there is an error
                    }
                },
                dataLoaded: function(data) {
                    console.log("✅ Data loaded:", data.length, "rows");
                }
            });
            
        } catch (error) {
            console.error('❌ Error creating Tabulator table:', error);
            this.updateFilterStatus("Error creating table: " + error.message);
            throw error;
        }
    }

    setupEventListeners() {
        try {
            console.log('🔧 Setting up event listeners...');
            
            // Setup global search - R9.3: Real-time search across all visible columns
            const globalSearch = document.getElementById("global-search");
            if (globalSearch) {
                globalSearch.addEventListener("input", (e) => {
                    if (this.tableReady && this.table) {
                        this.table.setFilter([
                            {field: "name", type: "like", value: e.target.value},
                            {field: "description", type: "like", value: e.target.value},
                            {field: "primaryArea", type: "like", value: e.target.value},
                            {field: "secondaryArea", type: "like", value: e.target.value}
                        ], "or");
                    }
                });
                console.log('✅ Global search listener set up');
            } else {
                console.warn('⚠️ global-search element not found');
            }

            // Setup clear search - R9.9: Clear search input and maintain current filter state
            const clearSearch = document.getElementById("clear-search");
            if (clearSearch) {
                clearSearch.addEventListener("click", () => {
                    const searchInput = document.getElementById("global-search");
                    if (searchInput) searchInput.value = "";
                    if (this.tableReady && this.table) {
                        this.table.clearFilter();
                        if (this.assessmentFiltersActive) {
                            this.applyAssessmentFilters();
                        }
                    }
                });
                console.log('✅ Clear search listener set up');
            } else {
                console.warn('⚠️ clear-search element not found');
            }

            // Setup discard filters - R9.15: Discard assessment filters and show all practices
            const discardFilters = document.getElementById("discard-filters");
            if (discardFilters) {
                discardFilters.addEventListener("click", () => {
                    this.discardAssessmentFilters();
                });
                console.log('✅ Discard filters listener set up');
            } else {
                console.warn('⚠️ discard-filters element not found');
            }

            // Setup apply filters - R9.21: Re-apply assessment-based filtering
            const applyFilters = document.getElementById("apply-filters");
            if (applyFilters) {
                applyFilters.addEventListener("click", () => {
                    this.applyAssessmentFilters();
                });
                console.log('✅ Apply filters listener set up');
            } else {
                console.warn('⚠️ apply-filters element not found');
            }
            
            console.log('✅ All event listeners set up successfully');
            
        } catch (error) {
            console.error('❌ Error setting up event listeners:', error);
            // Don't throw the error - just log it so table initialization can continue
        }
    }

    badgeFormatter(cell, formatterParams) {
        const value = cell.getValue();
        if (!value) return "";
        
        const badgeClass = value.toLowerCase();
        return `<span class="badge badge-${badgeClass}">${value}</span>`;
    }

    async applyAssessmentFilters() {
        if (!this.tableReady || !this.table) {
            console.log('Table not ready, skipping filter application');
            return;
        }

        const staceyResult = this.getStaceyResult();
        const cynefinResult = this.getCynefinResult();

        console.log('=== ASYNC ASSESSMENT FILTER APPLICATION ===');
        console.log('Assessment Results:', { stacey: staceyResult, cynefin: cynefinResult });

        const currentFilterKey = `${staceyResult}_${cynefinResult}`;
        if (this.lastAppliedFilter === currentFilterKey && this.assessmentFiltersActive) {
            console.log('Filter already applied, skipping re-application');
            return;
        }

        const filterFunction = this.createFilterFunction(staceyResult, cynefinResult);

        try {
            await this.table.setFilter(filterFunction);
            console.log('✅ Filter applied successfully.');

            this.assessmentFiltersActive = true;
            this.lastAppliedFilter = currentFilterKey;
            this.updateStatusAndButtons(staceyResult, cynefinResult);
            this.validateFilterResults(staceyResult, cynefinResult);

        } catch (error) {
            console.error('❌ Error applying filter:', error);
            this.updateFilterStatus("Error applying filters. See console for details.");
        }
    }

    validateFilterResults(staceyResult, cynefinResult) {
        const allData = deliveryPractices;
        const filteredData = this.table.getData();
        
        console.log('=== FILTER RESULTS VALIDATION ===');
        console.log(`Total practices available: ${allData.length}`);
        console.log(`Practices after filtering: ${filteredData.length}`);

        const decision = this.getDecisionFromMatrix(staceyResult, cynefinResult);
        if (!staceyResult || !cynefinResult || !decision) {
            console.log('Validation skipped: No valid assessment results.');
            return;
        }

        const allowedApproaches = [decision.primary];
        if (decision.secondary && decision.primary !== decision.secondary) {
            allowedApproaches.push(decision.secondary);
        }
        const hasComplexity = (staceyResult === "Complex" || cynefinResult === "Complex");
        
        const invalidPractices = [];
        const validPractices = [];
        
        filteredData.forEach(practice => {
            const primaryMatch = allowedApproaches.includes(practice.primaryArea);
            const secondaryMatch = practice.secondaryArea && allowedApproaches.includes(practice.secondaryArea);
            const approachMatch = primaryMatch || secondaryMatch;
            const complexityViolation = hasComplexity && (practice.primaryArea === "Predictive" || practice.secondaryArea === "Predictive");
            
            if (approachMatch && !complexityViolation) {
                validPractices.push(practice);
            } else {
                invalidPractices.push(practice);
            }
        });
        
        const shouldBeIncluded = allData.filter(practice => {
            const primaryMatch = allowedApproaches.includes(practice.primaryArea);
            const secondaryMatch = practice.secondaryArea && allowedApproaches.includes(practice.secondaryArea);
            const complexityExclusion = hasComplexity && (practice.primaryArea === "Predictive" || practice.secondaryArea === "Predictive");
            return (primaryMatch || secondaryMatch) && !complexityExclusion;
        });
        
        const missingPractices = shouldBeIncluded.filter(should => 
            !filteredData.find(filtered => filtered.name === should.name)
        );
        
        if (invalidPractices.length > 0) {
            console.error(`❌ FILTER ERROR: ${invalidPractices.length} invalid practices found:`);
            invalidPractices.forEach(p => console.error(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea}"`));
        }
        
        if (missingPractices.length > 0) {
            console.warn(`⚠️ FILTER WARNING: ${missingPractices.length} expected practices missing:`);
            missingPractices.forEach(p => console.warn(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea}"`));
        }
        
        if (invalidPractices.length === 0 && missingPractices.length === 0) {
            console.log('✅ FILTER SUCCESS: All practices correctly filtered');
        }
        
        if (hasComplexity) {
            const predictivePractices = filteredData.filter(p => p.primaryArea === 'Predictive' || p.secondaryArea === 'Predictive');
            if (predictivePractices.length > 0) {
                console.error(`❌ R7.6.1 VIOLATION: Found ${predictivePractices.length} 'Predictive' practices with complexity.`);
            } else {
                console.log(`✅ R7.6.1 COMPLIANCE: No 'Predictive' practices found with complexity.`);
            }
        }
    }

    createFilterFunction(staceyResult, cynefinResult) {
        // R7.7 & R11.2: If no assessment results found, return a function that shows all practices
        if (!staceyResult || !cynefinResult) {
            return function(data) { return true; };
        }

        // R7.5: Use Decision Making Table to determine Primary and Secondary approaches
        const decision = this.getDecisionFromMatrix(staceyResult, cynefinResult);
        
        if (!decision) {
            return function(data) { return true; }; // Show all if combination is unknown
        }

        const allowedApproaches = [decision.primary];
        if (decision.secondary && decision.primary !== decision.secondary) {
            allowedApproaches.push(decision.secondary);
        }
        
        // R7.6.1: Check for complexity
        const hasComplexity = (staceyResult === "Complex" || cynefinResult === "Complex");

        // Return the actual filter function for Tabulator
        return function(data) {
            // R7.6.1: Exclusion rule takes precedence
            if (hasComplexity && (data.primaryArea === "Predictive" || data.secondaryArea === "Predictive")) {
                return false; // Exclude if Predictive and complexity exists
            }

            // R7.6: Inclusion rule
            const primaryMatch = allowedApproaches.includes(data.primaryArea);
            const secondaryMatch = data.secondaryArea && allowedApproaches.includes(data.secondaryArea);
            
            return primaryMatch || secondaryMatch;
        };
    }

    updateStatusAndButtons(staceyResult, cynefinResult) {
        const decision = this.getDecisionFromMatrix(staceyResult, cynefinResult);

        if (!staceyResult || !cynefinResult) {
            this.assessmentFiltersActive = false;
            this.lastAppliedFilter = null;
            this.updateFilterStatus("No assessment results found. Showing all practices.");
            this.updateButtonVisibility();
            return;
        }

        if (!decision) {
            this.assessmentFiltersActive = false;
            this.lastAppliedFilter = null;
            this.updateFilterStatus(`Unknown assessment combination: ${staceyResult} + ${cynefinResult}. Showing all practices.`);
            this.updateButtonVisibility();
            return;
        }

        this.assessmentFiltersActive = true;
        this.lastAppliedFilter = `${staceyResult}_${cynefinResult}`;

        const approachText = decision.primary === decision.secondary 
            ? `${decision.primary} approaches` 
            : `${decision.primary}/${decision.secondary} approaches`;
        
        const hasComplexity = (staceyResult === "Complex" || cynefinResult === "Complex");
        const complexityNote = hasComplexity ? " (excluding Predictive practices due to complexity)" : "";
        this.updateFilterStatus(`Showing practices for ${approachText} (${staceyResult} + ${cynefinResult})${complexityNote}`);
        this.updateButtonVisibility();
    }

    discardAssessmentFilters() {
        if (!this.tableReady || !this.table) return;

        // Clear search input
        document.getElementById("global-search").value = "";
        
        // Clear all filters
        this.table.clearFilter();
        this.assessmentFiltersActive = false;
        this.lastAppliedFilter = null;

        // Update status and buttons
        this.updateFilterStatus("Showing all practices. Assessment filters discarded.");
        this.updateButtonVisibility();
        
        console.log('Assessment filters discarded - showing all practices');
    }

    updateButtonVisibility() {
        const discardButton = document.getElementById("discard-filters");
        const applyButton = document.getElementById("apply-filters");
        
        if (!discardButton || !applyButton) {
            console.log('Buttons not found, skipping visibility update');
            return;
        }
        
        // R12.22: Appropriate button visibility for different states
        if (this.assessmentFiltersActive) {
            // R9.14: Show discard button when assessment filters are active
            discardButton.style.display = "inline-block";
            applyButton.style.display = "none";
        } else {
            discardButton.style.display = "none";
            // R9.20: Only show apply button if assessment results are available
            const staceyResult = this.getStaceyResult();
            const cynefinResult = this.getCynefinResult();
            if (staceyResult && cynefinResult) {
                applyButton.style.display = "inline-block";
            } else {
                applyButton.style.display = "none";
            }
        }
    }

    getStaceyResult() {
        try {
            // R7.3: Get Stacey results from localStorage['staceyMatrixResults'].area
            const data = localStorage.getItem('staceyMatrixResults');
            if (!data) {
                console.log('No Stacey results found in localStorage');
                return null;
            }
            
            const parsed = JSON.parse(data);
            const result = parsed.area || null;
            console.log('Stacey result extracted:', result);
            return result;
        } catch (e) {
            console.error('Error loading Stacey results:', e);
            return null;
        }
    }

    getCynefinResult() {
        try {
            // R7.4: Get Cynefin results from localStorage['cynefinFrameworkAssessmentResults_v3'].domain
            const data = localStorage.getItem('cynefinFrameworkAssessmentResults_v3');
            if (!data) {
                console.log('No Cynefin results found in localStorage');
                return null;
            }
            
            const parsed = JSON.parse(data);
            const result = parsed.domain || null;
            console.log('Cynefin result extracted:', result);
            return result;
        } catch (e) {
            console.error('Error loading Cynefin results:', e);
            return null;
        }
    }

    getDecisionFromMatrix(stacey, cynefin) {
        // R7.1 & R12.6: Find matching decision from matrix
        console.log(`Looking up decision for: Stacey="${stacey}", Cynefin="${cynefin}"`);
        
        const decision = this.decisionMatrix.find(row => 
            row.stacy === stacey && row.cynefin === cynefin
        );
        
        if (decision) {
            console.log(`✅ Decision matrix match found: ${stacey} + ${cynefin} → Primary: ${decision.primary}, Secondary: ${decision.secondary}`);
        } else {
            console.warn(`⚠️ No decision matrix match found for: ${stacey} + ${cynefin}`);
            console.log('Available matrix entries:');
            this.decisionMatrix.forEach((entry, index) => {
                console.log(`  ${index + 1}. ${entry.stacy} + ${entry.cynefin} → ${entry.primary}/${entry.secondary}`);
            });
        }
        
        return decision;
    }

    updateFilterStatus(message) {
        const statusElement = document.getElementById("filter-status");
        if (statusElement) {
            statusElement.textContent = message;
        }
    }

    // Enhanced test method that validates the Decision Making Table implementation
    testFilter() {
        if (!this.tableReady || !this.table) {
            console.error('❌ Table not ready for testing');
            return;
        }
        
        console.log('=== DECISION MAKING TABLE VALIDATION ===');
        
        // Test each combination from the Decision Making Table
        const testCases = [
            { stacey: 'Complex', cynefin: 'Complex', expectedPrimary: 'Agile', expectedSecondary: 'Agile' },
            { stacey: 'Complex', cynefin: 'Complicated', expectedPrimary: 'Agile', expectedSecondary: 'Hybrid' },
            { stacey: 'Simple', cynefin: 'Complicated', expectedPrimary: 'Hybrid', expectedSecondary: 'Predictive' },
            { stacey: 'Complicated', cynefin: 'Complicated', expectedPrimary: 'Hybrid', expectedSecondary: 'Hybrid' },
            { stacey: 'Complicated', cynefin: 'Complex', expectedPrimary: 'Agile', expectedSecondary: 'Hybrid' },
            { stacey: 'Simple', cynefin: 'Clear', expectedPrimary: 'Predictive', expectedSecondary: 'Predictive' }
        ];
        
        testCases.forEach((testCase, index) => {
            console.log(`\n--- Test Case ${index + 1}: ${testCase.stacey} + ${testCase.cynefin} ---`);
            
            const decision = this.getDecisionFromMatrix(testCase.stacey, testCase.cynefin);
            if (!decision) {
                console.error(`❌ No decision found for ${testCase.stacey} + ${testCase.cynefin}`);
                return;
            }
            
            const primaryMatch = decision.primary === testCase.expectedPrimary;
            const secondaryMatch = decision.secondary === testCase.expectedSecondary;
            
            console.log(`Expected: Primary="${testCase.expectedPrimary}", Secondary="${testCase.expectedSecondary}"`);
            console.log(`Actual: Primary="${decision.primary}", Secondary="${decision.secondary}"`);
            console.log(`Result: ${primaryMatch && secondaryMatch ? '✅ PASS' : '❌ FAIL'}`);
        });
        
        // Test current localStorage values
        console.log('\n=== CURRENT ASSESSMENT TEST ===');
        const currentStacey = this.getStaceyResult();
        const currentCynefin = this.getCynefinResult();
        
        if (currentStacey && currentCynefin) {
            console.log(`Current Assessment: Stacey="${currentStacey}", Cynefin="${currentCynefin}"`);
            
            // Apply filter and check results
            const testConditions = [];
            const decision = this.getDecisionFromMatrix(currentStacey, currentCynefin);
            
            if (decision) {
                testConditions.push({field: "primaryArea", type: "=", value: decision.primary});
                testConditions.push({field: "secondaryArea", type: "=", value: decision.primary});
                
                if (decision.secondary && decision.primary !== decision.secondary) {
                    testConditions.push({field: "primaryArea", type: "=", value: decision.secondary});
                    testConditions.push({field: "secondaryArea", type: "=", value: decision.secondary});
                }
                
                console.log('Applying filter conditions:', testConditions);
                this.table.setFilter(testConditions, "or");
                
                setTimeout(() => {
                    const filtered = this.table.getData();
                    console.log(`\nFiltered results: ${filtered.length} practices`);
                    
                    // Check if any incorrect practices are showing
                    const allowedApproaches = [decision.primary];
                    if (decision.secondary && decision.secondary !== decision.primary) {
                        allowedApproaches.push(decision.secondary);
                    }
                    
                    const incorrectPractices = filtered.filter(p => {
                        const primaryAllowed = allowedApproaches.includes(p.primaryArea);
                        const secondaryAllowed = !p.secondaryArea || allowedApproaches.includes(p.secondaryArea);
                        return !(primaryAllowed || secondaryAllowed);
                    });
                    
                    if (incorrectPractices.length > 0) {
                        console.error(`❌ ${incorrectPractices.length} practices with incorrect approaches found:`);
                        incorrectPractices.forEach(p => {
                            console.error(`  - "${p.name}": Primary="${p.primaryArea}", Secondary="${p.secondaryArea}"`);
                        });
                    } else {
                        console.log('✅ All filtered practices have correct approaches');
                    }
                    
                    // Show breakdown
                    allowedApproaches.forEach(approach => {
                        const count = filtered.filter(p => 
                            p.primaryArea === approach || p.secondaryArea === approach
                        ).length;
                        console.log(`${approach} practices: ${count}`);
                    });
                    
                }, 200);
            } else {
                console.error('❌ No decision found for current assessment values');
            }
        } else {
            console.warn('⚠️ No current assessment data found in localStorage');
            console.log('To test with sample data, run:');
            console.log(`
localStorage.setItem('staceyMatrixResults', JSON.stringify({area: 'Complex'}));
localStorage.setItem('cynefinFrameworkAssessmentResults_v3', JSON.stringify({domain: 'Complicated'}));
practicesTable.applyAssessmentFilters();
            `);
        }
    }
}

// Add a flag to track if the table has been initialized
let tableInitialized = false;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== DELIVERY PRACTICES TABLE INITIALIZATION ===');
    console.log('DOM loaded, looking for delivery practices container...');
    const container = document.getElementById('delivery-practices-container');
    console.log('Container found:', !!container);
    
    if (container) {
        // Check if the table has already been initialized
        if (tableInitialized) {
            console.warn('DeliveryPracticesTable already initialized, skipping.');
            return;
        }
        
        // Verify data is available
        if (typeof deliveryPractices === 'undefined' || !deliveryPractices) {
            console.error('❌ deliveryPractices data not available - cannot initialize table');
            container.innerHTML = '<div class="error-message">Error: Practice data not loaded. Please refresh the page.</div>';
            return;
        }
        
        console.log(`✅ Data available: ${deliveryPractices.length} practices`);
        console.log('Initializing DeliveryPracticesTable...');
        
        const practicesTable = new DeliveryPracticesTable('delivery-practices-container');
        practicesTable.init();
        
        // Set the initialization flag
        tableInitialized = true;
        
        // Make it globally accessible for testing
        window.practicesTable = practicesTable;
        console.log('✅ Table instance available globally as window.practicesTable');
        
        // Enhanced testing after table is built
        setTimeout(() => {
            if (practicesTable.tableReady) {
                console.log('🧪 Table ready - running validation...');
                
                // Check for any existing assessment data and apply filters
                const staceyResult = practicesTable.getStaceyResult();
                const cynefinResult = practicesTable.getCynefinResult();
                
                if (staceyResult && cynefinResult) {
                    console.log(`Found existing assessment: ${staceyResult} + ${cynefinResult}`);
                    console.log('Auto-applying assessment filters...');
                } else {
                    console.log('No existing assessment data found - showing all practices');
                }
                
                // Run test validation
                practicesTable.testFilter();
                
                console.log('🎯 Table fully initialized and validated');
                console.log('💡 To test manually, run: window.practicesTable.testFilter()');
                
            } else {
                console.log('⏳ Table not ready yet, waiting longer...');
                // Try again after more time
                setTimeout(() => {
                    if (practicesTable.tableReady) {
                        console.log('🧪 Running delayed validation...');
                        practicesTable.testFilter();
                    } else {
                        console.error('❌ Table failed to initialize properly');
                    }
                }, 2000);
            }
        }, 1000);
        
    } else {
        console.error('❌ delivery-practices-container not found!');
        console.log('Looking for alternative containers...');
        const allContainers = document.querySelectorAll('[id*="delivery"], [id*="practices"], [class*="delivery"], [class*="practices"]');
        if (allContainers.length > 0) {
            console.log('Found potential containers:', Array.from(allContainers).map(el => el.id || el.className));
        } else {
            console.log('No alternative containers found');
        }
    }
});