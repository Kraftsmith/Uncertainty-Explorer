// Data structure for delivery practices - Updated from CSV file
const deliveryPractices = [
    {
        name: "Project plan",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Comprehensive project plan serves as the foundational blueprint that guides the entire project from start to finish. In a predictive setting, this plan is meticulously detailed and structured at the outset, with clearly defined phases, timelines, and deliverables. In a hybrid setting, the project plan still serves as the central roadmap, but it incorporates elements of flexibility to adapt to changing conditions.",
        benefits: "Minimizes uncertainty, allows strict adherence to schedule and budget, provides central roadmap"
    },
    {
        name: "Product roadmap",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "Strategic tool that outlines the high-level vision and direction of the product. Serves as a living document that guides development while allowing for adaptability. In agile settings, deliberately flexible focusing on milestones rather than detailed task breakdowns.",
        benefits: "Enables flexibility while maintaining strategic direction, supports customer-driven development, allows quick pivoting"
    },
    {
        name: "Project phases",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Structured approach dividing project work into distinct phases with clear deliverables and checkpoints.",
        benefits: "Provides clear structure, enables better control and monitoring, facilitates staged approval processes"
    },
    {
        name: "Project or phase verification (testing)",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Systematic testing and verification activities conducted at project or phase completion to ensure deliverables meet requirements.",
        benefits: "Ensures quality standards, validates requirements compliance, reduces post-delivery defects"
    },
    {
        name: "Strategic management through goals",
        primaryArea: "Hybrid",
        secondaryArea: "Agile",
        description: "Management approach focusing on achieving strategic objectives through clearly defined and measurable goals.",        benefits: "Aligns team efforts with business objectives, provides clear direction, enables performance measurement"
    },
    {
        name: "One or multiple increments each iteration",
        primaryArea: "Agile",
        secondaryArea: "Agile",
        description: "Practice of delivering working software increments within each iteration or sprint cycle.",
        benefits: "Enables frequent value delivery, provides early feedback opportunities, reduces integration risks"
    },
    {
        name: "Increment not strictly aligned to iterations, yet releases are regular",
        primaryArea: "Hybrid",
        secondaryArea: "Hybrid",
        description: "Flexible approach where product increments may span multiple iterations but releases occur on a regular schedule.",
        benefits: "Balances development flexibility with predictable release cadence, accommodates varying complexity"
    },
    {
        name: "Iterations (Sprints) with increment included",
        primaryArea: "Agile",
        secondaryArea: "Agile",
        description: "Standard agile practice where each sprint produces a potentially shippable product increment.",        benefits: "Ensures continuous value delivery, maintains focus on working software, enables rapid feedback"
    },
    {
        name: "Iterations, where increment is not required every iteration",
        primaryArea: "Hybrid",
        secondaryArea: "Hybrid",
        description: "Flexible iteration approach where not every iteration must produce a shippable increment, allowing for research or technical work.",
        benefits: "Accommodates technical debt work, allows for exploration and research, provides development flexibility"
    },
    {
        name: "Iteration (Sprint) planning",
        primaryArea: "Hybrid",
        secondaryArea: "Agile",
        description: "Planning activity where the team determines what work will be accomplished in the upcoming iteration.",
        benefits: "Creates team commitment, clarifies expectations, enables workload balancing"
    },
    {
        name: "Product Backlog Refinement with focus on new ideas and hypothesis",
        primaryArea: "Agile",
        secondaryArea: "Agile",
        description: "Backlog refinement emphasizing discovery of new ideas, hypotheses, and innovative solutions based on recent feedback.",
        benefits: "Promotes innovation, incorporates fresh insights, maintains product relevance"
    },
    {
        name: "Product Backlog Refinement with focus on adding details",
        primaryArea: "Hybrid",
        secondaryArea: "Hybrid",
        description: "Backlog refinement process focused on adding detailed descriptions, estimates, and specifications to existing ideas.",
        benefits: "Improves estimation accuracy, clarifies requirements, reduces development ambiguity"
    },
    {
        name: "Daily Standup",
        primaryArea: "Hybrid",
        secondaryArea: "Hybrid",
        description: "Brief daily meeting where team members align on progress, share status and address obstacles, discussing what was done yesterday, plans for today, and any issues.",
        benefits: "Improves team coordination, identifies blockers early, maintains project visibility"
    },
    {
        name: "Daily Scrum",
        primaryArea: "Agile",
        secondaryArea: "Agile",
        description: "Goal-oriented meeting focused on progress towards sprint goal. Team members discuss what they've done to advance the goal, plans for today, and any impediments.",
        benefits: "Maintains sprint focus, promotes team collaboration, ensures goal alignment"
    },
    {
        name: "Regular status meeting",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Scheduled meetings to review project status, progress against plan, and address issues.",
        benefits: "Provides stakeholder updates, ensures plan adherence, facilitates issue resolution"
    },
    {
        name: "Iteration (Sprint) retrospective every sprint",
        primaryArea: "Agile",
        secondaryArea: "Agile",
        description: "Regular retrospective meeting held at the end of each sprint to reflect on process and identify improvements.",
        benefits: "Drives continuous improvement, enhances team effectiveness, promotes learning culture"
    },
    {
        name: "Iteration retrospective on regular basis, focus on lessons learned",
        primaryArea: "Hybrid",
        secondaryArea: "Hybrid",
        description: "Regular retrospective meetings that may not occur every iteration, focusing on analysis and lessons learned.",
        benefits: "Captures valuable insights, promotes organizational learning, improves future performance"
    },
    {
        name: "Iteration (Sprint) review",
        primaryArea: "Agile",
        secondaryArea: "Agile",
        description: "Meeting held at the end of each sprint to demonstrate completed work and gather feedback.",
        benefits: "Provides stakeholder feedback, validates development direction, celebrates achievements"
    },
    {
        name: "Iteration demo",
        primaryArea: "Hybrid",
        description: "Demonstration of the complete increment/deliverable to Product Owner and stakeholders, used to discuss further plans and official acceptance.",
        benefits: "Ensures stakeholder alignment, facilitates acceptance decisions, guides future planning"
    },
    {
        name: "Single sprint goal",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "Unified objective that describes the increment to be produced within the sprint, providing focus and coherence.",
        benefits: "Maintains team focus, enables prioritization decisions, measures sprint success"
    },
    {
        name: "Multiple iteration goals",
        primaryArea: "Hybrid",
        secondaryArea: "Hybrid",
        description: "Approach using multiple goals to coordinate parallel progress across different workstreams while maintaining overall project alignment.",
        benefits: "Enables parallel workstreams, manages complex dependencies, coordinates diverse teams"
    },
    {
        name: "Iteration goal",
        primaryArea: "Agile",
        description: "Clear milestone defining the expected state of the product increment by the end of an iteration, providing direction and focus.",
        benefits: "Provides clear direction, prioritizes work, measures iteration success"
    },
    {
        name: "Stabilization iteration",
        primaryArea: "Hybrid",
        description: "Dedicated iteration focused on stabilizing the product, fixing bugs, and preparing for release rather than adding new features.",
        benefits: "Improves product quality, reduces technical debt, prepares for stable releases"
    },
    {
        name: "Risk management",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Systematic approach to identifying, assessing, and mitigating project risks throughout the project lifecycle.",
        benefits: "Reduces project uncertainties, prevents issues, improves success probability"
    },
    {
        name: "Release planning",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Planning process that defines what features will be included in upcoming releases and when they will be delivered.",
        benefits: "Coordinates release activities, manages stakeholder expectations, optimizes value delivery"
    },
    {
        name: "Quality control (testing) of all WI within the iteration",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "Testing practice ensuring all work items completed within an iteration meet quality standards before iteration completion.",
        benefits: "Maintains quality standards, enables rapid feedback, prevents defect accumulation"
    },
    {
        name: "Quality control (testing) of all WIs of previous iterations",
        primaryArea: "Hybrid",
        description: "Testing approach that includes verification of work items from previous iterations to ensure continued quality.",
        benefits: "Ensures regression prevention, maintains system integrity, provides comprehensive quality assurance"
    },
    {
        name: "Backlog - source of all work",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "Single prioritized list containing all work items, serving as the primary source for development activities.",
        benefits: "Provides single source of truth, enables priority management, facilitates transparency"
    },
    {
        name: "Project plan - the source of all work",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Comprehensive project plan serving as the authoritative source for all project work and activities.",
        benefits: "Ensures complete scope coverage, provides detailed guidance, enables progress tracking"
    },
    {
        name: "Change requests management",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Formal process for requesting, evaluating, and implementing changes to project scope or requirements.",
        benefits: "Controls scope creep, ensures impact assessment, maintains project integrity"
    },
    {
        name: "Burn-down chart",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "Visual representation showing the amount of work remaining over time, helping track progress toward iteration or release goals.",
        benefits: "Provides visual progress tracking, identifies potential delays, supports planning decisions"
    },
    {
        name: "Estimation in relative units",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "Estimation approach using relative sizing (story points, t-shirt sizes) rather than absolute time units.",
        benefits: "Reduces estimation complexity, accounts for team velocity, improves estimation accuracy over time"
    },
    {
        name: "Estimation in time-based units",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Traditional estimation approach using absolute time units (hours, days) for work item sizing.",
        benefits: "Provides concrete time estimates, facilitates traditional planning, enables resource allocation"
    },
    {
        name: "Definition of done",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "Shared understanding of what constitutes completed work, ensuring consistent quality standards across the team.",
        benefits: "Ensures quality consistency, reduces rework, clarifies completion criteria"
    },
    {
        name: "Definition of ready",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "Criteria that work items must meet before they can be selected for development, ensuring adequate preparation.",
        benefits: "Improves development efficiency, reduces mid-iteration clarifications, ensures work item quality"
    },
    {
        name: "Lessons learned register",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Formal documentation capturing lessons learned throughout the project for future reference and organizational learning.",
        benefits: "Captures organizational knowledge, improves future projects, promotes continuous learning"
    },
    {
        name: "Lessons learned workshop",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Structured workshop sessions designed to capture, discuss, and document lessons learned from project experiences.",
        benefits: "Facilitates knowledge sharing, promotes team reflection, improves organizational capabilities"
    },
    {
        name: "Team empowerment and collective decision making",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "Practice of empowering team members to make decisions collectively, promoting ownership and engagement.",
        benefits: "Increases team ownership, improves decision quality, enhances team motivation"
    },
    {
        name: "DevOps practice, regular releases",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "DevOps practices enabling regular, predictable releases through automation and continuous integration/deployment.",
        benefits: "Reduces release risks, enables faster feedback, improves deployment reliability"
    },
    {
        name: "DevOps practice, frequent releases",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "DevOps practices supporting very frequent releases, potentially multiple times per day, through advanced automation.",
        benefits: "Enables rapid value delivery, reduces batch size risks, supports rapid iteration"
    },
    {
        name: "Group of Individual contributors",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Work organization where individuals contribute independently to project goals with clear individual responsibilities.",
        benefits: "Leverages individual expertise, provides clear accountability, supports specialized skills"
    },
    {
        name: "Team with common goals and mission",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "Collaborative team structure where members work together toward shared objectives with collective accountability.",
        benefits: "Promotes collaboration, enhances collective ownership, improves team effectiveness"
    },
    {
        name: "Estimation of the whole story",
        primaryArea: "Agile",
        secondaryArea: "Hybrid",
        description: "Estimation approach where entire user stories or features are estimated as complete units rather than breaking them down.",
        benefits: "Simplifies estimation process, maintains story integrity, reduces estimation overhead"
    },
    {
        name: "Estimation of each piece and then sum together",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Bottom-up estimation approach where work is broken into small pieces, estimated individually, then aggregated.",
        benefits: "Provides detailed estimates, improves accuracy through decomposition, enables detailed planning"
    },
    {
        name: "Resource Management",
        primaryArea: "Predictive",
        secondaryArea: "Hybrid",
        description: "Practices for efficient utilization and allocation of resources including people, budget, and equipment.",
        benefits: "Optimizes resource utilization, controls costs, ensures adequate capacity"
    }
];
