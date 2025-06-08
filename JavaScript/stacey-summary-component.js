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