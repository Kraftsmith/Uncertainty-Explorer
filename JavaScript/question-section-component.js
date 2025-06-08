// c:/Users/mikhail.sarokin/OneDrive - Kaseya/Documents/Personal/Agilism/AFB/question-section-component.js
class QuestionSectionComponent {
    constructor(options) {
        this.options = {
            panelId: null, // For tabbed interfaces like Stacey
            isActivePanel: false, // For tabbed interfaces
            titleTag: 'h3', // Default title tag
            titleIsGroupTitle: false, // If true, uses 'group-title' class instead of 'section-title'
            nextButtonConfig: null,
            scoreBoxHtml: null, // HTML string for a score box to append after questions
            ...options
        };

        if (!document.getElementById(this.options.parentElementId)) {
            console.error(`QuestionSectionComponent: Parent element with ID '${this.options.parentElementId}' not found.`);
            return;
        }
        this.render();
        this.populateSliders();
    }

    render() {
        const parentElement = document.getElementById(this.options.parentElementId);
        let containerElement = parentElement; // Element to append the .section div to

        // If panelId is provided, create a panel div (for Stacey's tabbed interface)
        if (this.options.panelId) {
            const panelDiv = document.createElement('div');
            panelDiv.id = this.options.panelId;
            panelDiv.className = 'question-panel' + (this.options.isActivePanel ? ' active' : '');
            parentElement.appendChild(panelDiv);
            containerElement = panelDiv; // The .section will go inside this panel
        }

        const sectionDiv = document.createElement('div');
        sectionDiv.className = 'section'; // Use common .section styling

        const titleElement = document.createElement(this.options.titleTag);
        if (this.options.titleIsGroupTitle) {
            titleElement.className = 'group-title'; // Specific for Cynefin's .group-title
        } else {
            titleElement.className = 'section-title'; // Default
        }
        titleElement.textContent = this.options.sectionTitle;
        sectionDiv.appendChild(titleElement);

        const questionsContainerDiv = document.createElement('div');
        questionsContainerDiv.className = 'question-group'; // Standard class for question grouping
        questionsContainerDiv.id = this.options.questionsContainerId;
        sectionDiv.appendChild(questionsContainerDiv);

        // Append score box if provided (for Cynefin)
        if (this.options.scoreBoxHtml) {
            const scoreBoxWrapper = document.createElement('div');
            scoreBoxWrapper.className = 'summary-section'; // Use existing class for layout
            scoreBoxWrapper.style.justifyContent = 'center';
            scoreBoxWrapper.style.marginTop = '16px'; // 8px based
            scoreBoxWrapper.innerHTML = this.options.scoreBoxHtml;
            sectionDiv.appendChild(scoreBoxWrapper);
        }

        // Add "Next" button if configured (for Stacey)
        if (this.options.nextButtonConfig) {
            const nextButton = document.createElement('button');
            nextButton.textContent = this.options.nextButtonConfig.text;
            nextButton.classList.add('panel-next-btn'); // General class for these buttons
            nextButton.style.marginTop = '16px'; // Add some space above the button

            if (this.options.nextButtonConfig.isFinal) {
                nextButton.classList.add('final-panel-next-btn');
            } else {
                nextButton.setAttribute('data-next-panel-id', this.options.nextButtonConfig.nextPanelId);
                nextButton.setAttribute('data-current-step-selector', this.options.nextButtonConfig.currentStepSelector);
                nextButton.setAttribute('data-next-step-selector', this.options.nextButtonConfig.nextStepSelector);
            }
            sectionDiv.appendChild(nextButton);
        }
        
        containerElement.appendChild(sectionDiv);
    }

    populateSliders() {
        if (typeof window.assessmentUtils === 'undefined' || typeof window.assessmentUtils.createQuestionSliders !== 'function') {
            console.error("QuestionSectionComponent: assessmentUtils.createQuestionSliders is not available.");
            return;
        }
        // Ensure assessmentUtils is available globally or passed in
        window.assessmentUtils.createQuestionSliders(
            this.options.questionsContainerId,
            this.options.questionsData,
            this.options.questionGroupName,
            this.options.sliderStep
        );
    }
}