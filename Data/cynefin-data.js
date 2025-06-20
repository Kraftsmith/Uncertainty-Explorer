// Cynefin Framework Data
const cynefinData = {
    "complex": {
        "name": "COMPLEX",
        "subtitle": "Unknown Unknowns",
        "approach": "PROBE → SENSE → RESPOND",
        "constraintCoupling": "Enabling Constrained / Loosely Coupled",
        "practiceType": "EMERGENT PRACTICE",
        "characteristics": [
            "No clear right answers, emergent patterns",
            "Unpredictable, requires experimentation",
            "Solutions emerge over time"
        ],
        "steps": [
            "Probe: Experiment with small, safe-to-fail tests.",
            "Sense: Observe outcomes and detect patterns.",
            "Respond: Amplify what works, adjust as needed."
        ]
    },
    "complicated": {
        "name": "COMPLICATED",
        "subtitle": "Known Unknowns",
        "approach": "SENSE → ANALYSE → RESPOND",
        "constraintCoupling": "Governing Constrained / Tightly Coupled",
        "practiceType": "GOOD PRACTICE",
        "characteristics": [
            "Multiple right answers possible",
            "Requires expertise and analysis",
            "Good practices (not rigid best practices)"
        ],
        "steps": [
            "Sense: Investigate the problem with experts.",
            "Analyse: Evaluate options (e.g., cost-benefit, feasibility).",
            "Respond: Apply expert judgment to choose the best solution."
        ]
    },
    "chaotic": {
        "name": "CHAOTIC",
        "subtitle": "Cause and Effect Unclear",
        "approach": "ACT → SENSE → RESPOND",
        "constraintCoupling": "Tightly Constrained / No Degrees of Freedom",
        "practiceType": "NOVEL PRACTICE",
        "characteristics": [
            "High turbulence, no clear cause-and-effect",
            "Immediate action required to stabilize",
            "Novel practices needed"
        ],
        "steps": [
            "Act: Take decisive action to regain control.",
            "Sense: Look for patterns as the situation stabilizes.",
            "Respond: Transition to a more structured domain (Complex/Complicated)."
        ]
    },
    "clear": {
        "name": "CLEAR",
        "subtitle": "Known Knowns",
        "approach": "SENSE → CATEGORISE → RESPOND",
        "constraintCoupling": "Tightly Constrained / No Degrees of Freedom",
        "practiceType": "BEST PRACTICE",
        "characteristics": [
            "Clear cause-and-effect relationships",
            "Best practices are known and proven",
            "Predictable, repeatable processes"
        ],
        "steps": [
            "Sense: Gather data to confirm the situation fits known patterns.",
            "Categorise: Apply established best practices.",
            "Respond: Execute standard solutions efficiently."
        ]
    },
    "disorder": {
        "name": "DISORDER",
        "subtitle": "Uncertainty about how to proceed",
        "approach": "Break down, gather more data, avoid premature framing.",
        "constraintCoupling": "N/A",
        "practiceType": "N/A",
        "characteristics": [
            "Unclear which domain applies",
            "Uncertainty about how to proceed"
        ],
        "steps": [
            "Break down the problem into smaller parts and assign to appropriate domains.",
            "Gather more data to clarify the context.",
            "Avoid forcing a framework prematurely."
        ]
    }
};