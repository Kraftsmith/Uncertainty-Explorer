// c:/Users/mikhail.sarokin/OneDrive - Kaseya/Documents/Personal/Agilism/AFB/stacey-chart-component.js
class StaceyChartComponent {
    constructor(options) {
        this.options = {
            isInteractive: true,
            redirectUrlOnSave: null,
            initialData: null,
            sliderStep: "1",
            parentElementId: null, // New: ID of the container for the component
            ...options
        };
        this.staceyChart = null;
        this.questions = this.options.questionsData;
        this.localStorageKey = this.options.localStorageKey;

        if (!this.options.parentElementId || !document.getElementById(this.options.parentElementId)) {
            console.error(`StaceyChartComponent: Parent element with ID '${this.options.parentElementId}' not found or not provided.`);
            return;
        }
        this.parentElement = document.getElementById(this.options.parentElementId);
        this.renderBaseStructure(); // Create canvas and score display elements

        // Ensure IDs for score displays are consistent if still needed by external HTML (e.g. summary cards)
        // Or, if summary cards are also part of this component, they'd be rendered here.
        // For now, we assume summary cards are separate but might use these IDs.
        // If not, these IDs can be internal to the component.
        this.productScoreDisplayElement = document.getElementById(this.options.productScoreDisplayId || 'stacey-product-score');
        this.technicalScoreDisplayElement = document.getElementById(this.options.technicalScoreDisplayId || 'stacey-technical-score');
        this.teamScoreDisplayElement = document.getElementById(this.options.teamScoreDisplayId || 'stacey-team-score');
        this.areaNameDisplayElement = document.getElementById(this.options.areaNameDisplayId || 'stacey-area-name');
        this.areaResultDisplayElement = document.getElementById(this.options.areaDisplayId || 'stacey-area-result');

        // Check if elements were found/created, especially if IDs were passed vs generated
        if (!this.productScoreDisplayElement || !this.technicalScoreDisplayElement || !this.teamScoreDisplayElement || !this.areaNameDisplayElement || !this.areaResultDisplayElement) {
            // This check is more relevant if we expect these IDs to be pre-existing.
            // If we generate them, this check might be for the generation process.
            // console.warn("StaceyChartComponent: One or more display elements not found/created correctly.");
        }
        if (this.options.isInteractive) {
            if (!this.questions || !this.questions.product || !this.questions.technical || !this.questions.team) {
                 console.error("StaceyChartComponent: questionsData is missing or incomplete for interactive mode.");
                 return;
            }
            this.initInteractive();
        } else {
            this.initDisplay();
        }
    }

    renderBaseStructure() {
        // Clear parent element
        this.parentElement.innerHTML = '';

        // Create canvas
        this.canvas = document.createElement('canvas');
        // Use a consistent ID or allow override via options if needed for external CSS targeting
        this.canvas.id = this.options.canvasId || 'stacey-chart-canvas-generated';
        const chartContainer = document.createElement('div');
        chartContainer.className = 'chart-container stacey-chart-container'; // Use existing styles
        chartContainer.appendChild(this.canvas);
        this.parentElement.appendChild(chartContainer);

        // Create score display elements if they are meant to be part of this component's view
        // This example assumes they are part of the component.
        // If they are in separate summary cards in the HTML, then this part might not be needed,
        // and the component would continue to use the passed-in IDs for existing elements.
        // For a more encapsulated component, we create them here.

        // Note: The original HTML has these scores in "summary-card" divs.
        // If we want to keep that structure, the component would need to create those cards too,
        // or the HTML would provide placeholders for these cards.
        // For simplicity, this example doesn't recreate the full "summary-card" structure here,
        // assuming the component is primarily for the chart and its direct data readouts.
        // The IDs like 'product-score', 'technical-score' are still used by the component
        // to update these values, so the HTML that uses these IDs (e.g. summary.html cards)
        // will still be updated. The component itself doesn't need to render them if they exist elsewhere.

        // If the score displays (product-score, technical-score, team-score, area-name)
        // are *not* meant to be rendered by this component directly within its parentElement,
        // then this renderBaseStructure method would only create the canvas.
        // The current implementation of the component updates existing elements by ID,
        // so we'll stick to that for now and assume the HTML provides these score display elements.
        // This renderBaseStructure will primarily ensure the canvas is created.
    }

    initInteractive() {
        // Sliders are now created by QuestionSectionComponent for Stacey.html
        // assessmentUtils.createQuestionSliders(this.options.productQuestionsId, this.questions.product, 'product', this.options.sliderStep);
        // assessmentUtils.createQuestionSliders(this.options.technicalQuestionsId, this.questions.technical, 'technical', this.options.sliderStep);
        // assessmentUtils.createQuestionSliders(this.options.teamQuestionsId, this.questions.team, 'team', this.options.sliderStep);

        this.initChart();
        this.setupEventListeners();
        this.loadSavedData();
    }

    initDisplay() {
        this.initChart();
        if (this.options.initialData) {
            this.updateChartWithExternalData(this.options.initialData);
        } else {
             this.updateChartWithExternalData({ technicalScore: 0, productScore: 0, teamScore: 0, area: "Simple" });
        }
    }

    initChart() {
        const ctx = this.canvas.getContext('2d'); // Use the canvas created by the component
        this.staceyChart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Your Score', data: [{ x: 0, y: 0 }],
                    backgroundColor: '#0066cc', pointRadius: 8, pointHoverRadius: 10
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    x: { min: 0, max: 10, title: { display: true, text: 'Technical Uncertainty and Complexity', font: { size: 14, weight: 'bold' } }, ticks: { stepSize: 1 } },
                    y: { min: 0, max: 10, title: { display: true, text: 'Product Uncertainty and Complexity', font: { size: 14, weight: 'bold' } }, ticks: { stepSize: 1 } }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: { callbacks: { label: (context) => `Technical: ${context.parsed.x.toFixed(1)}, Product: ${context.parsed.y.toFixed(1)}` } },
                    annotation: { annotations: this.createZones() }
                }
            }
        });
    }

    createZones() {
        return {
            simple: { type: 'box', xMin: 0, xMax: 2.5, yMin: 0, yMax: 2.5, backgroundColor: 'rgba(175, 242, 175, 0.3)', borderColor: 'var(--simple-stacey-color)', borderWidth: 0 },
            complicated1: { type: 'box', xMin: 2.5, xMax: 5, yMin: 0, yMax: 2.5, backgroundColor: 'rgba(255, 184, 84, 0.3)', borderColor: 'var(--complicated-stacey-color)', borderWidth: 0 },
            complicated2: { type: 'box', xMin: 0, xMax: 2.5, yMin: 2.5, yMax: 5, backgroundColor: 'rgba(255, 184, 84, 0.3)', borderColor: 'var(--complicated-stacey-color)', borderWidth: 0 },
            complicated3: { type: 'box', xMin: 2.5, xMax: 5, yMin: 2.5, yMax: 5, backgroundColor: 'rgba(255, 184, 84, 0.3)', borderColor: 'var(--complicated-stacey-color)', borderWidth: 0 },
            complex1: { type: 'box', xMin: 5, xMax: 8, yMin: 0, yMax: 5, backgroundColor: 'rgba(136, 178, 203, 0.3)', borderColor: 'var(--complex-stacey-color)', borderWidth: 0 },
            complex2: { type: 'box', xMin: 0, xMax: 5, yMin: 5, yMax: 8, backgroundColor: 'rgba(136, 178, 203, 0.3)', borderColor: 'var(--complex-stacey-color)', borderWidth: 0 },
            complex3: { type: 'box', xMin: 5, xMax: 8, yMin: 5, yMax: 8, backgroundColor: 'rgba(136, 178, 203, 0.3)', borderColor: 'var(--complex-stacey-color)', borderWidth: 0 },
            chaotic: { type: 'box', xMin: 8, xMax: 10, yMin: 8, yMax: 10, backgroundColor: 'rgba(164, 9, 178, 0.3)', borderColor: 'var(--chaotic-stacey-color)', borderWidth: 0 },
            guidelineX: { type: 'line', mode: 'horizontal', scaleID: 'y', value: 0, borderColor: '#666', borderWidth: 1, borderDash: [5, 5] },
            guidelineY: { type: 'line', mode: 'vertical', scaleID: 'x', value: 0, borderColor: '#666', borderWidth: 1, borderDash: [5, 5] }
        };
    }

    setupEventListeners() {
        if (!this.options.isInteractive) return;
        document.querySelectorAll(`#${this.options.productQuestionsId} .slider, #${this.options.technicalQuestionsId} .slider, #${this.options.teamQuestionsId} .slider`).forEach(slider => {
            slider.addEventListener('input', () => {
                assessmentUtils.updateSliderValueDisplay(slider);
                this.updateScores();
            });
        });

        const btnNext = document.getElementById(this.options.nextButtonId);
        const btnReset = document.getElementById(this.options.resetButtonId);
        const btnTestComplex = document.getElementById(this.options.testComplexButtonId);
        const btnTestComplicated = document.getElementById(this.options.testComplicatedButtonId);

        if (btnNext) btnNext.addEventListener('click', () => this.saveResults());
        if (btnReset) btnReset.addEventListener('click', () => this.resetForm());
        if (btnTestComplex) btnTestComplex.addEventListener('click', () => this.setTestAnswers('complex'));
        if (btnTestComplicated) btnTestComplicated.addEventListener('click', () => this.setTestAnswers('complicated'));
    }

    calculateAverageScore(containerId) {
        const sliders = document.querySelectorAll(`#${containerId} .slider`);
        if (sliders.length === 0) return 0;
        let total = 0;
        sliders.forEach(slider => total += parseFloat(slider.value));
        return total / sliders.length;
    }

    getSliderAnswers(containerId, questionsArray) {
        const answers = {};
        questionsArray.forEach((q, index) => {
            const groupName = containerId.split('-')[0];
            const slider = document.querySelector(`#${containerId} input[name="${groupName}_q${index + 1}"]`);
            if (slider) answers[q.text] = parseFloat(slider.value);
        });
        return answers;
    }

    setSliderAnswers(containerId, savedScores, questionsArray) {
        if (!questionsArray || !Array.isArray(questionsArray)) return;
        questionsArray.forEach((q, index) => {
            const groupName = containerId.split('-')[0];
            const slider = document.querySelector(`#${containerId} input[name="${groupName}_q${index + 1}"]`);
            if (slider && savedScores && savedScores[q.text] !== undefined) {
                slider.value = savedScores[q.text];
                assessmentUtils.updateSliderValueDisplay(slider);
            }
        });
    }

    updateScores() {
        const productScoreRaw = this.calculateAverageScore(this.options.productQuestionsId);
        const technicalScoreRaw = this.calculateAverageScore(this.options.technicalQuestionsId);
        const teamScoreRaw = this.calculateAverageScore(this.options.teamQuestionsId);

        let adjProductScore = parseFloat(productScoreRaw.toFixed(1));
        let adjTechnicalScore = parseFloat(technicalScoreRaw.toFixed(1));
        
        if (teamScoreRaw > 5) {
            const adj = 0.5 * Math.floor(teamScoreRaw - 5);
            adjProductScore = Math.min(parseFloat((productScoreRaw + adj).toFixed(1)), 10);
            adjTechnicalScore = Math.min(parseFloat((technicalScoreRaw + adj).toFixed(1)), 10);
        }

        if (this.productScoreDisplayElement) this.productScoreDisplayElement.textContent = adjProductScore;
        if (this.technicalScoreDisplayElement) this.technicalScoreDisplayElement.textContent = adjTechnicalScore;
        if (this.teamScoreDisplayElement) this.teamScoreDisplayElement.textContent = teamScoreRaw.toFixed(1);

        this.staceyChart.data.datasets[0].data = [{x: adjTechnicalScore, y: adjProductScore}];
        this.staceyChart.options.plugins.annotation.annotations.guidelineX.value = adjProductScore;
        this.staceyChart.options.plugins.annotation.annotations.guidelineY.value = adjTechnicalScore;
        this.staceyChart.update();
        
        const area = this.determineComplexityArea(adjTechnicalScore, adjProductScore);
        if (this.areaNameDisplayElement) this.areaNameDisplayElement.textContent = area;
        if (this.areaResultDisplayElement) this.areaResultDisplayElement.className = 'area-display ' + area.toLowerCase() + '-area';
    }
    
    updateChartWithExternalData({ technicalScore, productScore, teamScore, area }) {
        if (this.productScoreDisplayElement) this.productScoreDisplayElement.textContent = productScore.toFixed(1);
        if (this.technicalScoreDisplayElement) this.technicalScoreDisplayElement.textContent = technicalScore.toFixed(1);
        if (this.teamScoreDisplayElement) this.teamScoreDisplayElement.textContent = teamScore.toFixed(1);

        this.staceyChart.data.datasets[0].data = [{ x: technicalScore, y: productScore }];
        this.staceyChart.options.plugins.annotation.annotations.guidelineX.value = productScore;
        this.staceyChart.options.plugins.annotation.annotations.guidelineY.value = technicalScore;
        this.staceyChart.update();

        if (this.areaNameDisplayElement) this.areaNameDisplayElement.textContent = area;
        if (this.areaResultDisplayElement) this.areaResultDisplayElement.className = 'area-display ' + area.toLowerCase() + '-area';
    }

    determineComplexityArea(technicalScore, productScore) {
        if (technicalScore >= 8 && productScore >= 8) return "Chaotic";
        if ((technicalScore >= 5 && productScore < 8) || (productScore >= 5 && technicalScore < 8)) return "Complex";
        if ((technicalScore >= 2.5 && productScore < 5) || (productScore >= 2.5 && technicalScore < 5)) return "Complicated";
        return "Simple";
    }

    saveResults(shouldRedirect = true) { // Added shouldRedirect parameter, defaults to true
        // Ensure scores are current before saving
        if (this.options.isInteractive) { // Only call updateScores if it's an interactive chart
            this.updateScores();
        }
        const results = {
            product: {
                questions: this.questions.product,
                scores: this.getSliderAnswers(this.options.productQuestionsId, this.questions.product),
                average: this.productScoreDisplayElement ? parseFloat(this.productScoreDisplayElement.textContent) : 0
            },
            technical: {
                questions: this.questions.technical,
                scores: this.getSliderAnswers(this.options.technicalQuestionsId, this.questions.technical),
                average: this.technicalScoreDisplayElement ? parseFloat(this.technicalScoreDisplayElement.textContent) : 0
            },
            team: {
                questions: this.questions.team,
                scores: this.getSliderAnswers(this.options.teamQuestionsId, this.questions.team),
                average: this.teamScoreDisplayElement ? parseFloat(this.teamScoreDisplayElement.textContent) : 0
            },
            area: this.areaNameDisplayElement ? this.areaNameDisplayElement.textContent : "Unknown",
            timestamp: new Date().toISOString()
        };
        assessmentUtils.saveToLocalStorage(this.localStorageKey, results);
        if (shouldRedirect && this.options.redirectUrlOnSave) {
            window.location.href = this.options.redirectUrlOnSave;
        }
    }

    loadSavedData() {
        const savedData = assessmentUtils.loadFromLocalStorage(this.localStorageKey);
        if (savedData) {
            this.setSliderAnswers(this.options.productQuestionsId, savedData.product.scores, this.questions.product);
            this.setSliderAnswers(this.options.technicalQuestionsId, savedData.technical.scores, this.questions.technical);
            this.setSliderAnswers(this.options.teamQuestionsId, savedData.team.scores, this.questions.team);
        }
        this.updateScores(); 
    }

    resetForm() {
        assessmentUtils.resetAssessmentForm(this.localStorageKey, () => {
            const qGroups = [this.options.productQuestionsId, this.options.technicalQuestionsId, this.options.teamQuestionsId];
            qGroups.forEach(id => {
                document.querySelectorAll(`#${id} .slider`).forEach(slider => {
                    slider.value = slider.min || 0;
                    assessmentUtils.updateSliderValueDisplay(slider);
                });
            });
            this.updateScores();
        });
    }

    setTestAnswers(type) {
        const scores = type === 'complex' ? { p: 6.5, t: 6.5, m: 4.0 } : { p: 3.5, t: 3.5, m: 4.0 };
        this.questions.product.forEach((q, i) => {
            const s = document.querySelector(`#${this.options.productQuestionsId} input[name="product_q${i + 1}"]`);
            if (s) { s.value = scores.p; assessmentUtils.updateSliderValueDisplay(s); }
        });
        this.questions.technical.forEach((q, i) => {
            const s = document.querySelector(`#${this.options.technicalQuestionsId} input[name="technical_q${i + 1}"]`);
            if (s) { s.value = scores.t; assessmentUtils.updateSliderValueDisplay(s); }
        });
        this.questions.team.forEach((q, i) => {
            const s = document.querySelector(`#${this.options.teamQuestionsId} input[name="team_q${i + 1}"]`);
            if (s) { s.value = scores.m; assessmentUtils.updateSliderValueDisplay(s); }
        });
        this.updateScores();
    }
}