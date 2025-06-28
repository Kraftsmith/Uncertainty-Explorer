// c:/Users/mikhail.sarokin/OneDrive - Kaseya/Documents/Personal/Agilism/AFB/JavaScript/stacey-summary-component.js

function loadStaceySummaryComponent(placeholderId) {
    const summaryHtml = `
        <div class="summary-section">
            <!-- Moved Uncertainty Area here as a summary card -->
            <div class="summary-card">
                <h4>Uncertainty Area</h4>
                <!-- The area-display class will provide the colored background -->
                <div class="area-display simple-area" id="area-result">
                    <span id="area-name">Simple</span>
                </div>
            </div>
            <div class="summary-card">
                <h4>Product Uncertainty</h4>
                <div class="score-display">
                    <strong>Score:</strong> <span id="product-score">0.0</span>/10
                </div>
            </div>
            
            <div class="summary-card">
                <h4>Technical Uncertainty</h4>
                <div class="score-display">
                    <strong>Score:</strong> <span id="technical-score">0.0</span>/10
                </div>
            </div>
            
            <div class="summary-card">
                <h4>Team Uncertainty</h4>
                <div class="score-display">
                    <strong>Score:</strong> <span id="team-score">0.0</span>/10
                </div>
            </div>
        </div>
    `;

    const placeholder = document.getElementById(placeholderId);
    if (placeholder) {
        placeholder.innerHTML = summaryHtml;
    } else {
        console.error(`Stacey Summary placeholder with ID '${placeholderId}' not found.`);
    }
}

// Function to update the Stacey summary component with actual assessment data
function updateStaceySummaryComponent(data) {
    console.log('🔄 updateStaceySummaryComponent called with:', data);
    
    if (!data) {
        console.warn('No data provided to updateStaceySummaryComponent');
        return;
    }

    // Update scores
    if (data.productScore !== undefined) {
        const productElement = document.getElementById('product-score');
        if (productElement) {
            productElement.textContent = data.productScore.toFixed(1);
            console.log(`Updated product score: ${data.productScore.toFixed(1)}`);
        } else {
            console.warn('product-score element not found');
        }
    }

    if (data.technicalScore !== undefined) {
        const technicalElement = document.getElementById('technical-score');
        if (technicalElement) {
            technicalElement.textContent = data.technicalScore.toFixed(1);
            console.log(`Updated technical score: ${data.technicalScore.toFixed(1)}`);
        } else {
            console.warn('technical-score element not found');
        }
    }

    if (data.teamScore !== undefined) {
        const teamElement = document.getElementById('team-score');
        if (teamElement) {
            teamElement.textContent = data.teamScore.toFixed(1);
            console.log(`Updated team score: ${data.teamScore.toFixed(1)}`);
        } else {
            console.warn('team-score element not found');
        }
    }

    // Update area display
    if (data.area) {
        const areaNameElement = document.getElementById('area-name');
        const areaResultElement = document.getElementById('area-result');
        
        if (areaNameElement && areaResultElement) {
            console.log(`🎯 UPDATING AREA: "${areaNameElement.textContent}" → "${data.area}"`);
            areaNameElement.textContent = data.area;
            
            // Remove existing area classes and add the correct one
            areaResultElement.className = 'area-display';
            const areaClass = `${data.area.toLowerCase()}-area`;
            areaResultElement.classList.add(areaClass);
            
            console.log(`✅ Summary component updated: Area="${data.area}", Classes="${areaResultElement.className}"`);
        } else {
            console.error('❌ Area elements not found:', {
                areaNameElement: !!areaNameElement,
                areaResultElement: !!areaResultElement
            });
        }
    }
}