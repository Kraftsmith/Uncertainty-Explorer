class RolesComponent {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
        this.rolesData = {
            "Agile": {
                title: "Agile Delivery Roles",
                roles: [
                    { title: "Product Owner", description: "Responsible for maximizing the value of the product resulting from the work of the Development Team. Manages the product backlog, prioritizes features, and ensures the team is working on the most valuable items." },
                    { title: "Scrum Master / Agile Coach", description: "A servant-leader for the team, responsible for promoting and supporting Scrum (or other Agile frameworks). Helps everyone understand the theory, practices, rules, and values. Removes impediments to the team's progress." },
                    { title: "Development Team", description: "A cross-functional, self-organizing group of professionals who do the work of delivering a potentially releasable Increment of \"Done\" product at the end of each Sprint. Includes developers, testers, designers, etc." },
                    { title: "Stakeholders", description: "Individuals with an interest in the product, who provide feedback and collaborate with the team to shape the product's direction." }
                ]
            },
            "Hybrid": {
                title: "Hybrid Delivery Roles",
                roles: [
                    { title: "Project Manager", description: "Responsible for the overall project plan, budget, and schedule. Manages risks, resources, and communication across the project." },
                    { title: "Product Owner / Product Manager/ Business or System Analyst", description: "Gathers and defines requirements, manages the product backlog, and acts as the liaison between stakeholders and the development team. The title may vary depending on the specific methodology blend." },
                    { title: "Technical Lead", description: "Provides technical guidance and leadership to the development team, ensuring architectural integrity and quality standards." },
                    { title: "Development Team", description: "A team of developers responsible for implementing the technical solution. May be more specialized than a purely Agile team." },
                    { title: "QA/Test Engineers", description: "Responsible for quality assurance and testing activities, often working in parallel with development." },
                    { title: "Stakeholders", description: "Key individuals or groups who have a vested interest in the project's outcome." }
                ]
            },
            "Predictive": {
                title: "Predictive Delivery Roles",
                roles: [
                    { title: "Project Manager", description: "Owns the entire project lifecycle from initiation to closure. Creates and manages the project plan, controls scope, and ensures deliverables are met on time and within budget." },
                    { title: "Business Analyst", description: "Responsible for gathering, documenting, and managing detailed requirements from stakeholders." },
                    { title: "Architect", description: "Designs the high-level structure of the system, ensuring it meets all technical and business requirements." },
                    { title: "Development Team", description: "A group of developers with specialized skills who execute tasks according to the project plan." },
                    { title: "QA/Test Engineers", description: "A dedicated team responsible for verifying and validating the product against the requirements, typically after the development phase is complete." },
                    { title: "Stakeholders", description: "Provide input at key milestones and formally accept the final product." }
                ]
            }
        };

        this.decisionMatrix = {
            "Complex": {
                "Complex": { "primary": "Agile", "secondary": "Agile" },
                "Complicated": { "primary": "Agile", "secondary": "Hybrid" }
            },
            "Complicated": {
                "Complex": { "primary": "Agile", "secondary": "Hybrid" },
                "Complicated": { "primary": "Hybrid", "secondary": "Hybrid" }
            },
            "Simple": {
                "Clear": { "primary": "Predictive", "secondary": "Predictive" },
                "Complicated": { "primary": "Hybrid", "secondary": "Predictive" }
            }
        };
    }

    getPrimaryApproach() {
        const staceyResults = JSON.parse(localStorage.getItem('staceyMatrixResults'));
        const cynefinResults = JSON.parse(localStorage.getItem('cynefinFrameworkAssessmentResults_v3'));

        if (!staceyResults || !cynefinResults) {
            return null;
        }

        const staceyArea = staceyResults.area;
        const cynefinDomain = cynefinResults.domain;

        const decision = this.decisionMatrix[staceyArea]?.[cynefinDomain];
        return decision ? decision.primary : null;
    }

    render() {
        const primaryApproach = this.getPrimaryApproach();
        if (!primaryApproach || !this.rolesData[primaryApproach]) {
            this.element.innerHTML = '<p>No assessment results found. Cannot determine recommended roles.</p>';
            return;
        }

        const approachData = this.rolesData[primaryApproach];
        let html = `<h3>${approachData.title}</h3>`;
        html += '<ul>';
        approachData.roles.forEach(role => {
            html += `<li><strong>${role.title}:</strong> ${role.description}</li>`;
        });
        html += '</ul>';

        this.element.innerHTML = html;
    }
}
