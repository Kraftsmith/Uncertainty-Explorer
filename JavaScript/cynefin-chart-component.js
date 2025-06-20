// Cynefin Chart Component - Shared chart building functionality
// This component provides reusable functions to build Cynefin framework charts

const CynefinChartComponent = {
    /**
     * Initializes a Cynefin chart in the specified container
     * @param {string} containerId - ID of the container element
     * @param {Object} options - Configuration options
     * @param {boolean} options.includeDisorder - Whether to include the disorder quadrant (default: true)
     * @param {string} options.containerClass - Additional CSS class for the container (default: 'chart-container')
     */
    initialize: function(containerId, options = {}) {
        const defaults = {
            includeDisorder: true,
            containerClass: 'chart-container'
        };
        
        const config = { ...defaults, ...options };
        
        if (typeof cynefinData === 'undefined') {
            console.error("cynefinData is not available. Cannot initialize Cynefin chart.");
            return false;
        }

        const chartContainer = document.getElementById(containerId);
        if (!chartContainer) {
            console.error(`Chart container with ID '${containerId}' not found.`);
            return false;
        }

        // Add container class if not already present
        if (!chartContainer.classList.contains(config.containerClass)) {
            chartContainer.classList.add(config.containerClass);
        }

        // Clear existing content
        chartContainer.innerHTML = '';

        // Create quadrants for each domain in cynefinData
        Object.keys(cynefinData).forEach(domainKey => {
            // Skip disorder if not included
            if (!config.includeDisorder && domainKey === 'disorder') {
                return;
            }
            
            const domain = cynefinData[domainKey];
            const quadrantDiv = this.createQuadrant(domainKey, domain);
            chartContainer.appendChild(quadrantDiv);
        });

        return true;
    },

    /**
     * Creates a single quadrant element for a domain
     * @param {string} domainKey - The domain key (e.g., 'complex', 'complicated')
     * @param {Object} domain - The domain data object
     * @returns {HTMLElement} The quadrant div element
     */
    createQuadrant: function(domainKey, domain) {
        const quadrantDiv = document.createElement('div');
        quadrantDiv.id = domainKey;
        quadrantDiv.className = 'quadrant';

        // Create quadrant name
        const nameSpan = document.createElement('span');
        nameSpan.className = 'quadrant-name';
        nameSpan.textContent = domain.name;
        quadrantDiv.appendChild(nameSpan);

        // Create domain label (subtitle) - skip for disorder or if no subtitle
        if (domain.subtitle && domainKey !== 'disorder') {
            const labelDiv = document.createElement('div');
            labelDiv.className = 'domain-label';
            labelDiv.style.top = '45%';
            labelDiv.textContent = domain.subtitle;
            quadrantDiv.appendChild(labelDiv);
        }

        // Create domain approach
        if (domain.approach) {
            const approachDiv = document.createElement('div');
            approachDiv.className = 'domain-approach';
            approachDiv.style.top = '60%';
            
            if (domain.practiceType && domainKey !== 'disorder') {
                approachDiv.innerHTML = `${domain.approach}<br>${domain.practiceType}`;
            } else {
                approachDiv.textContent = domain.approach;
            }
            
            quadrantDiv.appendChild(approachDiv);
        }

        return quadrantDiv;
    },

    /**
     * Updates the highlight of a specific domain
     * @param {string} domainKey - The domain to highlight
     * @param {string} containerId - ID of the chart container (optional, defaults to searching all charts)
     */
    highlightDomain: function(domainKey, containerId = null) {
        const containers = containerId ? 
            [document.getElementById(containerId)] : 
            document.querySelectorAll('.chart-container, .cynefin-chart-container');

        containers.forEach(container => {
            if (!container) return;
            
            // Remove highlight from all quadrants
            const allQuadrants = container.querySelectorAll('.quadrant');
            allQuadrants.forEach(quadrant => {
                quadrant.classList.remove('highlighted', 'current-domain');
            });

            // Add highlight to the specified domain
            if (domainKey) {
                const targetQuadrant = container.querySelector(`#${domainKey}`);
                if (targetQuadrant) {
                    targetQuadrant.classList.add('highlighted', 'current-domain');
                }
            }
        });
    },

    /**
     * Gets domain data by key
     * @param {string} domainKey - The domain key
     * @returns {Object|null} The domain data object or null if not found
     */
    getDomainData: function(domainKey) {
        if (typeof cynefinData === 'undefined') {
            console.error("cynefinData is not available.");
            return null;
        }
        
        return cynefinData[domainKey] || null;
    },

    /**
     * Gets all available domain keys
     * @returns {Array} Array of domain keys
     */
    getDomainKeys: function() {
        if (typeof cynefinData === 'undefined') {
            console.error("cynefinData is not available.");
            return [];
        }
        
        return Object.keys(cynefinData);
    }
};

// Make the component available globally
window.CynefinChartComponent = CynefinChartComponent;
