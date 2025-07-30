# Role Specifications for Delivery Setups

This document outlines the recommended roles for different delivery setups, as determined by the intersection of the Stacey Matrix and Cynefin Framework assessments.

## R1. Role Definitions by Primary Approach


### R1.1. Agile Delivery Roles
When the primary delivery approach is **Agile**, the following roles must be considered to support iterative development, emergent practices, and rapid feedback cycles:

- **Product Owner:** Responsible for maximizing the value of the product resulting from the work of the Development Team. Manages the product backlog, prioritizes features, and ensures the team is working on the most valuable items.
- **Scrum Master / Agile Coach:** A servant-leader for the team, responsible for promoting and supporting Scrum (or other Agile frameworks). Helps everyone understand the theory, practices, rules, and values. Removes impediments to the team's progress.
- **Development Team:** A cross-functional, self-organizing group of professionals who do the work of delivering a potentially releasable Increment of "Done" product at the end of each Sprint. Includes developers, testers, designers, etc.
- **Stakeholders:** Individuals with an interest in the product, who provide feedback and collaborate with the team to shape the product's direction.

**Agile roles to be considered in all Agile delivery contexts:**

- Product Owner
- Scrum Master / Agile Coach
- Development Team (cross-functional)
- Stakeholders

### R1.2. Hybrid Delivery Roles
When the primary delivery approach is **Hybrid**, the roles blend traditional project management with agile practices to balance planning and adaptability.

- **Project Manager:** Responsible for the overall project plan, budget, and schedule. Manages risks, resources, and communication across the project.
- **Product Owner / Product Manager/  Business or System Analyst:** Gathers and defines requirements, manages the product backlog, and acts as the liaison between stakeholders and the development team. The title may vary depending on the specific methodology blend.
- **Technical Lead:** Provides technical guidance and leadership to the development team, ensuring architectural integrity and quality standards.
- **Development Team:** A team of developers responsible for implementing the technical solution. May be more specialized than a purely Agile team.
- **QA/Test Engineers:** Responsible for quality assurance and testing activities, often working in parallel with development.
- **Stakeholders:** Key individuals or groups who have a vested interest in the project's outcome.

### R1.3. Predictive Delivery Roles
When the primary delivery approach is **Predictive**, the roles are typically well-defined and aligned with a sequential, plan-driven process (e.g., Waterfall).

- **Project Manager:** Owns the entire project lifecycle from initiation to closure. Creates and manages the project plan, controls scope, and ensures deliverables are met on time and within budget.
- **Business Analyst:** Responsible for gathering, documenting, and managing detailed requirements from stakeholders.
- **Architect:** Designs the high-level structure of the system, ensuring it meets all technical and business requirements.
- **Development Team:** A group of developers with specialized skills who execute tasks according to the project plan.
- **QA/Test Engineers:** A dedicated team responsible for verifying and validating the product against the requirements, typically after the development phase is complete.
- **Stakeholders:** Provide input at key milestones and formally accept the final product.

## R2. Role Mapping by Delivery Context

This section maps the roles defined above to the specific delivery contexts derived from the Decision Making Table (see `delivery management.md`, R7.1).

| Stacey      | Cynefin     | Primary Approach | Recommended Roles                                                                                                                                                           |
|-------------|-------------|------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Complex     | Complex     | Agile            | **Agile Roles:** Product Owner, Scrum Master/Agile Coach, Development Team, Stakeholders.                                                                                 |
| Complex     | Complicated | Agile            | **Agile Roles:** Product Owner, Scrum Master/Agile Coach, Development Team, Stakeholders.                                                                                 |
| Simple      | Complicated | Hybrid           | **Hybrid Roles:** Project Manager, Product Owner/Business Analyst, Technical Lead, Development Team, QA/Test Engineers, Stakeholders.                                       |
| Complicated | Complicated | Hybrid           | **Hybrid Roles:** Project Manager, Product Owner/Business Analyst, Technical Lead, Development Team, QA/Test Engineers, Stakeholders.                                       |
| Complicated | Complex     | Agile            | **Agile Roles:** Product Owner, Scrum Master/Agile Coach, Development Team, Stakeholders.                                                                                 |
| Simple      | Clear       | Predictive       | **Predictive Roles:** Project Manager, Business Analyst, Architect, Development Team, QA/Test Engineers, Stakeholders.                                                      |
