// c:/Users/mikhail.sarokin/OneDrive - Kaseya/Documents/Personal/Agilism/AFB/assessment-utils.js
const assessmentUtils = {
    createQuestionSliders: function(containerId, questions, groupName, sliderStep = "1") {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error(`Container with ID '${containerId}' not found.`);
            return;
        }
        if (!questions || !Array.isArray(questions)) {
            console.error(`Questions for group '${groupName}' is not a valid array.`);
            return;
        }

        questions.forEach((q, index) => {
            // For Cynefin, q.id exists. For Stacey, it doesn't, so we use groupName_index.
            const questionId = q.id || `${groupName}_${index}`;
            const sliderName = q.id || `${groupName}_q${index + 1}`; // Stacey uses _qN for names in test functions

            if (typeof q.text !== 'string') {
                console.warn("Skipping invalid question object (missing text) in createQuestionSliders:", q);
                return;
            }

            const questionDiv = document.createElement('div');
            questionDiv.className = 'question-container';
            questionDiv.id = `question-${questionId}`;

            const label = document.createElement('label');
            label.htmlFor = `slider-${questionId}`;
            label.textContent = q.text;
            questionDiv.appendChild(label);

            const slider = document.createElement('input');
            slider.type = 'range';
            slider.id = `slider-${questionId}`;
            slider.name = sliderName;
            slider.min = "0";
            slider.max = "10";
            slider.value = "0";
            slider.step = sliderStep;
            slider.className = 'slider';
            slider.dataset.questionText = q.text; // Important for mapping saved data
            questionDiv.appendChild(slider);

            const valueSpan = document.createElement('span');
            valueSpan.className = 'slider-value';
            valueSpan.textContent = slider.value;
            questionDiv.appendChild(valueSpan);

            container.appendChild(questionDiv);
        });
    },
    updateSliderValueDisplay: function(slider) {
        const valueSpan = slider.parentElement.querySelector('.slider-value');
        if (valueSpan) {
            valueSpan.textContent = slider.value;
        }
    },
    saveToLocalStorage: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (e) {
            console.error("Error saving to local storage:", e);
        }
    },
    loadFromLocalStorage: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error("Error loading from local storage:", e);
            return null;
        }
    },
    resetAssessmentForm: function(key, generalCallback) {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error("Error removing from local storage:", e);
        }
        if (generalCallback) {
            generalCallback();
        }
    }
};

// Make it globally available if not using modules
window.assessmentUtils = assessmentUtils;