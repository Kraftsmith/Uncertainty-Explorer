## **Diagnose**

### **Stacey Matrix and Cynefin Framework**

| Cynefin Framework                           | Stacey Matrix                                                                                                                   |
| :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| General problem domains, decision-making    | Business vs. technical uncertainty Focuses on **requirements (business uncertainty)** vs. **solutions (technical uncertainty)** |
| Leadership, strategy, crisis response       | Best for **project/product management** Helps decide **how much uncertainty and complexity/process is needed**                  |
| Defines **how to act** in different domains | Shows **when uncertainty requires adaptive**                                                                                    |

While the Stacey Matrix is great for project management and agile development, the Cynefin framework is a broader tool for leadership, strategy, and navigating uncertainty in various systems. Stacy MatrixText: Quantifies uncertainty in three critical areas of project execution to determine the optimal management approach, using the Stacey Matrix framework.Questions

Product uncertainty and complexity

(Measures how quickly your product adapts to market, customer, and external changes.)

1. How frequently do market trends/customer preferences shift, requiring product adjustments?

2. How often do product delivery plans need short-term changes (e.g., within 2 months)?

3. How frequently do you test product hypotheses for new features/improvements?

4. How quickly do customer demands evolve, requiring rapid adaptation?

5. How often do external factors (regulatory, geopolitical) significantly impact your business?

6. How frequently do you revise pricing strategies to remain competitive?

7. How often do new competitors or disruptive innovations emerge?

8. How much do technological advancements force your industry to adapt?

9. How often do government policies affect your operations/market?

10. How quickly do your products/services become obsolete without updates?

    **Questions interactions**

* Each question needs to go with   
  1. a slider from 1 to 10\. User can drag the slider to set the value  
  2. Slider value, what user selected.   
  3. Initial slider value 0\.

* Product uncertainty and complexity: calculated  value at the end of the section.

* Forumular: average of all answers in the section.

  **Technical uncertainty and complexity**

  Measures your ability to adapt to technical challenges, dependencies, and innovations.

1. Tech Approach Changes: How frequently do you change technical architecture mid-project?

2. Tech Experimentation: How often do you experiment with new implementation technologies?

3. Technical Challenges: How often do unexpected technical hurdles require process adjustments?

4. Third-Party Dependencies: How frequently do you integrate uncertain third-party APIs/frameworks?

5. Scalability Issues: How often do scaling challenges create performance uncertainties?

6. Emerging Tech Exploration: How frequently do you explore cutting-edge technologies?

7. Compatibility Issues: How often do platform/device compatibility issues arise?

8. Expertise: How much do you rely on external experts for technical solutions?

9. How often do unforeseen technical risks delay deliverables?

10. How frequently must you refactor for performance/maintainability?

**Questions interactions**

* Each question needs to go with   
  1. a slider from 1 to 10\. User can drag the slider to set the value.  
  2. Initial slider value 0\.  
  3. Slider value, what user selected. 

 * Technical uncertainty and complexity: calculated value - at the end of the section.

  1. Forumular: average of all answers in the section.

  **Team uncertainty and complexity**

  Measures your team’s resilience to turnover, skill gaps, and collaboration challenges.

1. Team Turnover: How frequently do key team members leave during development?

2. Internal Shifts: How often do people change teams/focus mid-project?

3. Skill Gaps: How often do knowledge gaps impact progress/quality?

4. Contractor Reliance: How much do you depend on external contractors for critical roles?

5. Hiring Challenges: How difficult is it to recruit qualified technical talent?

6. Professional Development: How actively do team members upskill for the project?

7. Communication Issues: How often do collaboration challenges hurt productivity?

8. Remote Complexity: How much do distributed teams add coordination uncertainties?

9. Leadership Changes: How frequently does management turnover shift priorities?

10. Knowledge Redundancy: How well does your team share responsibilities to mitigate turnover?

    **Questions interactions**

* Each question needs to go with   
  1. a slider from 1 to 10\. User can drag the slider to set the value  
  2. Slider value is  what user selected.   
  3. Initial slider value 0\.

* Team uncertainty and complexity: calculated value at the end of the section. 

  1. Forumular: average of all answers in the section.Assessment Results

  Assessment Results section should contain the following elements: 

* Complexity and uncertainty chart.  See [Stacy Matrix Chart](#heading=h.k75txgx5jq8b).   
* Summary box. See [Uncertainty and complexity summary](#uncertainty-and-complexity-summary).

  Background color: \#f7f9f8Stacy Matrix Chart

* Draw a graph with Product as Y and Technical as X,   
  * Y and X axes need to be from 0 to 10\.  
  * Y axes title \- Product   
  * X  axes title \- Technology  
* Put a red dot on the graph on the intersection of product and technical uncertainty and complexity score.  
* Make a dotted line on the chart to the uncertainty and complexity dot.  Dotted guidelines to axes for precise reading. Dashed gray lines with 5px spacing.  
* When the page loads the chart needs to show. All values need to be set to 0\.  
* The chart needs to update as the Product, Technical and Team questions are answered and  sliders value change.  No additional saving functionality is required. Re-rendering of the chart needs to happen on the fly as the user is changing sliders values.   
* The chart is divided into four zones representing different levels of uncertainty/complexity:

* Simple (green)

* Complicated (yellow)

* Complex (blue)

* Chaotic (red)

  Zone border is the same color as the zone background. 

  **Zone Coordinates on the chart**  
  // Simple (Green)

    xMin: 0,

    xMax: 2.5,

    yMin: 0,

    yMax: 2.5

  // Complicated 

  \- Lower Right (Yellow)

    xMin: 2.5,

    xMax: 5,

    yMin: 0,

    yMax: 2.5

  // Complicated \- Upper Left (Yellow)

    xMin: 0,

    xMax: 2.5,

    yMin: 2.5,

    yMax: 5

  // Complicated \- Center (Yellow)

    xMin: 2.5,

    xMax: 5,

    yMin: 2.5,

    yMax: 5

  // Complex \- Bottom Center (Blue)

    xMin: 5,

    xMax: 8,

    yMin: 0,

    yMax: 5

  // Complex \- Left Center (Blue)

    xMin: 0,

    xMax: 5,

    yMin: 5,

    yMax: 8

  // Complex \- Central (Blue)

    xMin: 5,

    xMax: 8,

    yMin: 5,

    yMax: 8

  // Chaotic (Red)

    xMin: 8,

    xMax: 10,

    yMin: 8,

    yMax: 10

  ###### ***Legend***

  Chart needs to contain the following legend

* Box \[color: AFF2AF \] \- Simple  
* Box \[color: FFB854\] \- Complicated  
* Box \[color: 88B2CB\]  \- Complex  
* Box \[color: A409B2\] \- Chaotic   
* Red circle \[color: CB3636\] \-  Complexity and uncertainty score 

  Legend should be at the bottom of the chart. 

  ##### **Uncertainty and complexity summary** {#uncertainty-and-complexity-summary}

Section location \- under the chart. 

The summary box should  show 

* Product uncertainty and complexity: \[score\]. average of all product questions.  
* Technical uncertainty and complexity: \[score\] . average of all technical questions.  
* Team uncertainty and complexity: \[score\] 

* Team: average of all team questions

  * If Teams uncertainty and complexity is greater than 5, add 0.5 to Product and Technical with each whole number of \[current value\] \- 5\. 

  * Gradual Adjustment: add 0.5 per whole number above 5 (instead of 50% of original value)

    * Example: 

      * Team score \=  6, which is current value, 

      * Let's assume Product \= 3

      * Let's assume Technical= 4\. 

      * New Product \= 3.5

      * New Technical \= 4.5

* Uncertainty and complexity scores are updated in the summary box as the value changes. 

* Uncertainty and complexity  area:   \[calculated value\].  Shown as text next to the label.

  **Zone Classification Logic:**

1. Chaotic (Red)

   * Condition: Technical (X) ≥ 8 AND Product (Y) ≥ 8

   * Zone Coordinates:

   * Copy

   * Download

   * xMin: 8, xMax: 10,  

   * yMin: 8, yMax: 10 

2. Complex (Blue)

   * Subzones:

     * Bottom Center:

     * Copy

     * Download

   * xMin: 5, xMax: 8,  

     * yMin: 0, yMax: 5 

     * Left Center:

     * Copy

     * Download

   * xMin: 0, xMax: 5,  

     * yMin: 5, yMax: 8 

     * Central:

     * Copy

     * Download

   * xMin: 5, xMax: 8,  

     * yMin: 5, yMax: 8 

   * Condition:

     * Technical (X) ≥ 5 OR Product (Y) ≥ 5

     * But must not meet Chaotic criteria (i.e., avoid overlap).

3. Complicated (Yellow)

   * Subzones:

     * Lower Right:

     * Copy

     * Download

   * xMin: 2.5, xMax: 5,  

     * yMin: 0, yMax: 2.5 

     * Upper Left:

     * Copy

     * Download

   * xMin: 0, xMax: 2.5,  

     * yMin: 2.5, yMax: 5 

     * Center:

     * Copy

     * Download

   * xMin: 2.5, xMax: 5,  

     * yMin: 2.5, yMax: 5 

   * Condition:

     * Technical (X) ≥ 2.5 OR Product (Y) ≥ 2.5

     * But must not meet Complex/Chaotic criteria.

4. Simple (Green)

   * Zone Coordinates:

   * Copy

   * Download

   * xMin: 0, xMax: 2.5,  

   * yMin: 0, yMax: 2.5 

   * Condition:

     * Technical (X) \< 2.5 AND Product (Y) \< 2.5Save and Next

   Under the assessment result there should be a **Next** button that saves the results to local storage and navigates the user to the next cynefin framework assement  page. Save full question-level data \+ timestamps.

### **Cynefin Framework Domain Assessment Questions**

#### ***Decision Making***

* How much experimentation is needed?  
* How much expert consensus exists?  
* How urgent is the need to act?  
* How often do novel aspects emerge?  
* How aligned are stakeholders?  
* What is the tolerance for failure?

#### ***Cause-and-Effect Relationships***

* How clear are the cause-and-effect relationships?  
* To what extent do best practices exist?  
* How predictable are the outcomes?  
* How much historical data is available?  
* How frequently do unexpected outcomes occur?  
* How well understood are the system boundaries?

* How consistent are results when repeating actions?


  Each question needs to go with 

  2. a slider from 0 to 10\. Users can drag the slider to set the value.    
  3. Slider value, what user selected.   
  4. Initial slider value 0\. Chart 

  The Cynefin Framework visualization shall be presented as a 2x2 grid with an additional area for Disorder in the middle. **Center:**

* Diamond shape: "Disorder"

  ---

  **Top-left Quadrant (COMPLEX):**

* Title: "COMPLEX"

* Subtitle: "Unknown Unknowns"

* First rectangle: "PROBE"

* Arrow pointing to second rectangle

* Second rectangle: "SENSE"

* Arrow pointing to third rectangle

* Third rectangle: "RESPOND"

* Approach: PROBE → SENSE → RESPOND  
* Constraint/Coupling: "Enabling Constrained / Loosely Coupled"  
* Practice Type: "EMERGENT PRACTICE"

* Background Color: Light Blue

* Extended Description:

  * Characteristics:

    * No clear right answers, emergent patterns

    * Unpredictable, requires experimentation

    * Solutions emerge over time

  * Detailed Approach:

    * Probe: Experiment with small, safe-to-fail tests.

    * Sense: Observe outcomes and detect patterns.

    * Respond: Amplify what works, adjust as needed.

  ---

  **Top-right Quadrant (COMPLICATED):**

* Title: "COMPLICATED"

* Subtitle: "Known Unknowns"

* First rectangle: "SENSE"

* Arrow pointing to second rectangle

* Second rectangle: "ANALYSE"

* Arrow pointing to third rectangle

* Third rectangle: "RESPOND"

* Approach: SENSE → ANALYSE → RESPOND

* Constraint/Coupling: "Governing Constrained / Tightly Coupled"

* Practice Type: "GOOD PRACTICE"

* Background Color: Darker Blue

* Extended Description:

  * Characteristics:

    * Multiple right answers possible

    * Requires expertise and analysis

    * Good practices (not rigid best practices)

  * Detailed Approach:

    * Sense: Investigate the problem with experts.

    * Analyse: Evaluate options (e.g., cost-benefit, feasibility).

    * Respond: Apply expert judgment to choose the best solution.

  ---

  **Bottom-left Quadrant (CHAOTIC):**

* Title: "CHAOTIC"

* Subtitle: "Cause and Effect Unclear"

* First rectangle: "ACT"

* Arrow pointing to second rectangle

* Second rectangle: "SENSE"

* Arrow pointing to third rectangle

* Third rectangle: "RESPOND"

* Approach: ACT → SENSE → RESPOND

* Constraint/Coupling: "Tightly Constrained / No Degrees of Freedom"

* Practice Type: "NOVEL PRACTICE"

* Background Color: Teal Green

* Extended Description:

  * Characteristics:

    * High turbulence, no clear cause-and-effect

    * Immediate action required to stabilize

    * Novel practices needed

  * Detailed Approach:

    * Act: Take decisive action to regain control.

    * Sense: Look for patterns as the situation stabilizes.

    * Respond: Transition to a more structured domain (Complex/Complicated).

  ---

  **Bottom-right Quadrant (CLEAR):**

* Title: "CLEAR"

* Subtitle: "Known Knowns"

* First rectangle: "SENSE"

* Arrow pointing to second rectangle

* Second rectangle: "CATEGORISE"

* Arrow pointing to third rectangle

* Third rectangle: "RESPOND"

* Approach: SENSE → CATEGORISE → RESPOND

* Constraint/Coupling: "Tightly Constrained / No Degrees of Freedom"

* Practice Type: "BEST PRACTICE"  
  Background Color: Light Green

* Extended Description:

  * Characteristics:

    * Clear cause-and-effect relationships

    * Best practices are known and proven

    * Predictable, repeatable processes

  * Detailed Approach:

    * Sense: Gather data to confirm the situation fits known patterns.

    * Categorise: Apply established best practices.

    * Respond: Execute standard solutions efficiently.

  ---

* Disorder (Center Area):  
* Title: "DISORDER" (implied by center labeled "CONFUSION")

* Extended Description:

  * Characteristics:

    * Unclear which domain applies

    * Uncertainty about how to proceed

  * Detailed Approach:

    * Break down the problem into smaller parts and assign to appropriate domains.

    * Gather more data to clarify the context.

    * Avoid forcing a framework prematurely.

  ### **Cynefin Quadrant Decision Logic**

|                                                    | Complex range | Complicated range | Chaotic range | Clear range |
| :------------------------------------------------- | :------------ | :---------------- | :------------ | :---------- |
| How much experimentation is needed?                | 6.5-9         | 4-6.5             | 9-10          | 1-4         |
| How much expert consensus exists?                  | 1.5-3         | 3-6.5             | 0-1.5         | 6.5-10      |
| How urgent is the need to act?                     | 5-8           | 3-5               | 8-9           | 0-3         |
| How often do novel aspects emerge?                 | 7-9           | 4-7               | 9-10          | 0-4         |
| How aligned are stakeholders?                      | 1.5-3         | 3-7               | 0-1.5         | 7-10        |
| What is the tolerance for failure?                 | 1.5-3         | 3-7               | 0-1.5         | 7-10        |
|                                                    |               |                   |               |             |
| How clear are the cause-and-effect relationships?  | 1.5-3.5       | 3.5-7             | 0-1.5         | 7-10        |
| To what extent do best practices exist?            | 1.5-3.5       | 3.5-7             | 0-1.5         | 7-10        |
| How predictable are the outcomes?                  | 1.5-3.5       | 3.5-7             | 0-1.5         | 7-10        |
| How much historical data is available?             | 1.5-3.5       | 3.5-7             | 0-1.5         | 7-10        |
| How frequently do unexpected outcomes occur?       | 6.5-9         | 3-6.5             | 0-3           | 6.5-10      |
| How well understood are the system boundaries?     | 1.5-3.5       | 3-7               | 0-1.5         | 7-10        |
| How consistent are results when repeating actions? | 1.5 \- 5      | 5-9               | 0-1.5         | 9-10        |


  **To calculate what domain to show in the chart, consider the table above**

---

      The quadrant needs to be in the center of the chart. In the center of the domain, just the title \-  **Disorder.  But if the assessment shows Disorder, the box with description needs to appear (by default it’s hidden) under the chart.**

  ---

##### **Chart requirements**

* Label each quadrant with domain names and recommended approaches.  
* Put approach and characteristics description on each domain.  
* Highlight the current domain with a semi-transparent overlay.  
  1. Current is based on the answer to the questions from the domain assessment section.   
* Calculate and display the current domain based on slider values  
  1. Show recommended approach for the determined domain  
  2. Update the chart position immediately when sliders are moved  
* The current domain shall be highlighted with a red 2px border when determined by the assessment  
* All domains shall be visually distinct with their designated colors

* X axis is Decision making

* Y cause-and-effect relationships score

  * BUT X and Y axes must not be shown, only the domains should be shown, score dot does not need to be shown as well. 

* No legend is needed. Assessment Logicdecision making score \- average of the answers in the group.

- cause-and-effect relationships score   \- average of the answers in the group.

  Chart requirements 

  COMPLEX

*  domain coordinates : x: \-2 y: 2 to  x: \-8 y: 8   
* Background color: 53ABBF  
* It must show on the chat as the page loads and highlighted if selected. 

  COMPLICATED 

* domain coordinates : x: 2 y: 2 to  x: 8 y: 8   
* Background color: 31608E  
* It must show on the chat as the page loads and highlighted if selected. CHAOTIC   
* domain coordinates : x: \-2 y: \-2 to  x: \-8 y: \-8   
* Background color: 0F7A66  
* It must show on the chat as the page loads and highlighted if selected. 

  SIMPLE  

* domain coordinates : x: 2 y: \-2 to  x: 8 y: \-8   
* Background color: 0E5A30  
* It must show on the chat as the page loads and highlighted if selected. 

  DISORDER  

* Domain is when   
  * Decision Making \> 8  
  * Cause-and-Effect Relationships \> 8  
* It must NOT show on the chat as the page loads.   
* Description below the cha

  ##### **Save and Next**

  Under the chart there should be a **Save and Next** button that saves the results to local storage and navigates the user to the next \[TBD\] page. Save full question-level data \+ timestamps.

  #### ***Diagnose summary***

  ### **Diagnose Summary Page Requirements**

  **Purpose**: Display assessment results from Stacey Matrix and Cynefin Framework.

#### **1\. Charts to Display**

* **Stacey Matrix Chart**  
  * Render as defined in *Page 4–9*.  
  * Data for the chart is taken from local storage.  Object: staceyMatrixResults  
* **Cynefin Framework Chart**

  * Render as defined in Page 10–19:

  * Data for the chart is taken from local storage. Object: cynefinAssessmentResults

#### **2\. Data Source**

* Load all data from local storage (*referenced in "Save and Next" on Pages 7, 19*):  
  * Stacey: Product/Technical/Team scores, timestamps.  
  * Cynefin: Decision-making/Cause-effect scores, domain result.

#### **3\. Summary Elements**

* **Stacey Summary Box** (*Page 7*):  
  * Scores: Product, Technical, Team (adjusted if Team \> 5).  
  * Zone classification (Simple/Complicated/Complex/Chaotic).  
* **Cynefin Summary Box** (*Page 15–17*):  
  * Determined domain (e.g., "Complex").  
  * Scores: Decision-making, Cause-effect averages.  
  * Brief approach (e.g., "Probe → Sense → Respond").

#### **4\. Styling & Layout**

* Background: \#f7f9f8 (*Page 4*).  
* Charts: Sized for clarity (reference visual specs on *Pages 4–6, 10–14*).

#### **5\. Navigation**

* Include **Build Framework**  
* No save needed (data already in local storage per *Pages 7, 19*).

# **Deliver Management Framework**

| Cynefin         | Stacy           |
| :-------------- | :-------------- |
| **Complicated** | **Complicated** |
| **Complex**     | **Complicated** |
| Complex         | Complex         |
| **Complicated** | **Complex**     |
| Clear           | Simple          |
| Complicated     | Simple          |

##   

## 

## 

## 

Each intersection of Cynefin domain and Stacy quadran, should following the following structure:

**General overview**

\[Text\]

**Sense-Making Cycle**

\[image\]

\[Description\]

### **Practices**

\[Text as list of practices\]

## 

## **Cynefin \- Complicated, Stacy \- Complicated**

### **General overview**

This domain is characterized by "Known Unknowns." The correct solutions are discoverable but require specialized knowledge and analysis. Engage experts to investigate and understand the problem.

### **Sense-Making Cycle**

**Sense \- Analyse \- Respond**

* **Sense:** Gather data and investigate the problem with the help of experts.  
  * **Analyse:** Evaluate various options and potential solutions. This might involve assessing cost-benefit, feasibility, and different approaches.  
  * **Respond:** Apply expert judgment to choose and implement the most suitable solution.

### **Practices**

**Apply Good Practices.** Rely on proven methods and solutions that have been successful in similar complicated scenarios, but allow for adaptation based on expert advice rather than rigidly applying "best practices."

**Governing Constraints:** The situation operates under "governing constraints" and is often "tightly coupled," meaning there are rules and established ways of working that guide the analysis and response.

**Detailed Planning and Analysis:** Because the uncertainties are "known unknowns" or moderate, it's possible and beneficial to invest in more detailed planning and analysis compared to "Complex" or "Chaotic" situations.

**Risk Management:** Identify the specific areas of uncertainty (in product features or technical implementation) and develop strategies to manage these risks.

**Structured Project Management:** Traditional or more structured project management approaches can often be effective, as experts can define tasks and solutions.

**Clear Definitions:** Work towards clarifying requirements and technical solutions through expert consultation and analysis.

**Maintain Clear Processes and Communication:** Ensure that there are well-defined processes for decision-making and clear communication channels, especially when coordinating multiple experts or analyzing various potential solutions.

## **Cynefin \- Complex, Stacy \- Complex**

**Embrace Experimentation and Emergence**

This domain is characterized by "Unknown Unknowns" in the Cynefin Framework and high levels of both business and technical uncertainty in the Stacey Matrix. Clear-cut solutions are not readily available, and patterns emerge through experimentation.

### **Sense-Making Cycle**

**Probe \- Sense \- Respond**

* **Probe:** Conduct small, safe-to-fail experiments to explore the landscape and test hypotheses. This involves trying different approaches and observing the results.  
* **Sense:** Observe the outcomes of the experiments to detect patterns and insights. Focus on what emerges from the interactions and feedback.  
* **Respond:** Amplify what works, dampen what doesn't, and adapt the strategy based on the emergent patterns. Be prepared to adjust the course as new information comes to light.

### **Practices**

**Foster Emergent Practices.** Rigidly applying "best practices" is ineffective in this domain. Instead, focus on creating an environment that encourages innovation, learning, and adaptation.

**Enabling Constraints:** Operate under "enabling constraints" and "loosely coupled" systems. This means providing broad guidelines but allowing for flexibility and autonomy in execution. It allows room for experimentation and discovery.

**Iterative Exploration:** Favor iterative development, short feedback loops, and frequent adjustments. The increment delivery may be more frequent than in complicated but is still driven by the knowledge gained from iteration execution and outcomes.

**Continuous Learning:** Prioritize continuous learning and knowledge sharing within the team. Encourage experimentation, retrospective analysis, and the adoption of successful emergent practices.

**Adaptive Planning:** Avoid detailed upfront planning. Instead, use rolling wave planning or similar approaches that allow for adjustments as the project progresses and new information is gathered. Plan to discover the best solutions, rather than plan to execute a known solution.

**Collaboration and Feedback:** Foster strong collaboration and communication within the team and with stakeholders. Value feedback and use it to refine the approach.

**Visualization and Transparency:** Make the process and progress highly visible. Use visualization techniques, such as Kanban boards or information radiators, to enhance transparency and facilitate collaboration.

**Experimentation Mindset:** Cultivate a mindset of experimentation and learning from failure. Encourage team members to propose and test new ideas, even if they might not work.

**Embrace Uncertainty:** Acknowledge and embrace the inherent uncertainty of complex situations. Avoid trying to force premature clarity and instead focus on navigating the ambiguity.

## **Cynefin \- Complicated , Stacy \- Complex**

**Blend Expertise with Experimentation**

This scenario combines the "Known Unknowns" of the Complicated domain with the high uncertainty of the Complex domain. While specialized knowledge is valuable, emergent patterns and experimentation are also essential. This hybrid context requires a balanced approach that leverages expertise but allows for iterative exploration.

### **Sense-Making Cycle**

![][image1]

A Hybrid Approach: Adaptable

* **Initial Sense & Analysis:** Start by gathering data and consulting with experts (Complicated).  
* **Iterative Probing:** Conduct small, safe-to-fail experiments to explore uncertainties and discover emergent patterns (Complex).  
* **Continuous Sense:** Observe the outcomes of these experiments and gather feedback to inform further decisions.  
* **Refined Analysis:** Analyze new data and adjust strategies based on both expert insights and experimental findings.  
* **Adaptive Response:** Respond with solutions informed by analysis and refined by experimentation. Be prepared to adapt the approach continuously.

**Practices**

**Hybrid Practices:** A blend of good practices and emergent practices. Leverage expert knowledge where available, but also foster innovation and learning through experimentation.

* **Strategic Guidance:** Leverage experts to set strategic direction and define high-level goals.  
* **Iterative Development:** Implement iterative development cycles with short feedback loops.  
* **Safe-to-Fail Experiments:** Encourage and enable safe-to-fail experiments to explore uncertainties.  
* **Knowledge Sharing:** Foster knowledge sharing between experts and experimentation teams.  
* **Adaptive Planning:** Use rolling wave planning or similar approaches that allow for flexibility.  
* **Collaboration and Feedback:** Promote strong collaboration and open communication within the team and with stakeholders.  
* **Visualization and Transparency:** Maintain transparency using visualization techniques to monitor progress.  
* **Risk Assessment & Mitigation:** Identify risks and uncertainties, and develop mitigation strategies based on both analysis and experimentation.  
* **Continuous Improvement:** Regularly evaluate both expert-driven solutions and experimental outcomes to refine the approach.

## **Cynefin \- Complex, Stacy \- Complex**

**Embrace Experimentation and Emergence**

This setup is characterized by "Unknown Unknowns" in the Cynefin Framework and high levels of both business and technical uncertainty in the Stacey Matrix. Clear-cut solutions are not readily available, and patterns emerge through experimentation.

**Decision-Making Cycle**

![][image2]

**Probe \- Sense \- Respond**

* **Probe:** Conduct small, safe-to-fail experiments to explore the landscape and test hypotheses. This involves trying different approaches and observing the results.  
* **Sense:** Observe the outcomes of the experiments to detect patterns and insights. Focus on what emerges from the interactions and feedback.  
* **Respond:** Amplify what works, dampen what doesn't, and adapt the strategy based on the emergent patterns. Be prepared to adjust the course as new information comes to light.

**Practices**

* **Foster Emergent Practices.** Rigidly applying "best practices" is ineffective in this domain. Instead, focus on creating an environment that encourages innovation, learning, and adaptation.  
* **Enabling Constraints:** Operate under "enabling constraints" and "loosely coupled" systems. This means providing broad guidelines but allowing for flexibility and autonomy in execution. It allows room for experimentation and discovery.  
* **Iterative Exploration:** Favor iterative development, short feedback loops, and frequent adjustments. The increment delivery may be more frequent than in complicated but is still driven by the knowledge gained from iteration execution and outcomes.  
* **Continuous Learning:** Prioritize continuous learning and knowledge sharing within the team. Encourage experimentation, retrospective analysis, and the adoption of successful emergent practices.  
* **Adaptive Planning:** Avoid detailed upfront planning. Instead, use rolling wave planning or similar approaches that allow for adjustments as the project progresses and new information is gathered. Plan to discover the best solutions, rather than plan to execute a known solution.  
* **Collaboration and Feedback:** Foster strong collaboration and communication within the team and with stakeholders. Value feedback and use it to refine the approach.  
* **Visualization and Transparency:** Make the process and progress highly visible. Use visualization techniques, such as Kanban boards or information radiators, to enhance transparency and facilitate collaboration.  
* **Experimentation Mindset:** Cultivate a mindset of experimentation and learning from failure. Encourage team members to propose and test new ideas, even if they might not work.  
* **Embrace Uncertainty:** Acknowledge and embrace the inherent uncertainty of complex situations. Avoid trying to force premature clarity and instead focus on navigating the ambiguity.

#### **Delivery Framework is prefiltered with Primary Area: Agile, Secondary Area \- Hybrid**

## **Cynefin \- Complicated, Stacy \- Complex**

**Blend Expertise with Experimentation**

This scenario combines the "Known Unknowns" of the Complicated domain with the high uncertainty of the Complex domain. While specialized knowledge is valuable, emergent patterns and experimentation are also essential. This hybrid context requires a balanced approach that leverages expertise but allows for iterative exploration.

**Decision-Making Cycle**

* A Hybrid Approach: Adaptable  
* Initial Sense & Analysis: Start by gathering data and consulting with experts (Complicated).  
* Iterative Probing: Conduct small, safe-to-fail experiments to explore uncertainties and discover emergent patterns (Complex).  
* Continuous Sense: Observe the outcomes of these experiments and gather feedback to inform further decisions.  
* Refined Analysis: Analyze new data and adjust strategies based on both expert insights and experimental findings.  
* Adaptive Response: Respond with solutions informed by analysis and refined by experimentation. Be prepared to adapt the approach continuously.

**Practices**

* **Hybrid Practices:** A blend of good practices and emergent practices. Leverage expert knowledge where available, but also foster innovation and learning through experimentation.  
* **Strategic Guidance:** Leverage experts to set strategic direction and define high-level goals.  
* **Iterative Development:** Implement iterative development cycles with short feedback loops.  
* **Safe-to-Fail Experiments:** Encourage and enable safe-to-fail experiments to explore uncertainties.  
* **Knowledge Sharing:** Foster knowledge sharing between experts and experimentation teams.  
* **Adaptive Planning:** Use rolling wave planning or similar approaches that allow for flexibility.  
* **Collaboration and Feedback:** Promote strong collaboration and open communication within the team and with stakeholders.  
* **Visualization and Transparency:** Maintain transparency using visualization techniques to monitor progress.  
* **Risk Assessment & Mitigation:** Identify risks and uncertainties, and develop mitigation strategies based on both analysis and experimentation.  
* **Continuous Improvement:** Regularly evaluate both expert-driven solutions and experimental outcomes to refine the approach.

  

[image1]: <data:image/png;base64,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>

[image2]: <data:image/png;base64,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>

Which data needs to be in a table format? I see several possibilities:
The Stacey Matrix assessment questions with sliders (Product/Technical/Team uncertainty)
> No, that table needs to contain delivery management practices based on the answered questions. 
The Cynefin Framework assessment questions with sliders
> No, that table needs to contain delivery management practices based on the answered questions. 
The comparison table between Cynefin and Stacey Matrix
> No, that table needs to contain delivery management practices based on the answered questions. 
The Cynefin Quadrant Decision Logic table
> No, that table needs to contain delivery management practices based on the answered questions. 
The delivery framework intersection matrix
> No, that table needs to contain delivery management practices based on the answered questions. 
Are you looking for:
An interactive table component for the assessment questions?
> No, that table needs to contain delivery management practices based on the answered questions. 
A results display table?
> Yes, the table shows the results of the assessments. 
A configuration table for the framework logic?
> No, that table needs to contain delivery management practices based on the answered questions. 
What functionality should the table have?
Sorting capabilities?
> No need for sorting. 
Filtering?
> Yes, filtering is a must. When the page load filters need to be already applied, see Decision making table 
Inline editing?
> No
Export functionality?
> No
What's the relationship between the table and the existing sliders/charts?
Should table changes update the charts in real-time?
> No direct relations to the sliders, but the table needs to contain delivery management practices based on the answered questions. 
Is this an alternative view of the assessment data?
> No
Could you please specify:
Which section of the document needs the data-table implementation?
> delivery-practices-section
What data should be displayed in rows and columns?
> the data that is displaying now, it’s good. 
What interactions are required?
> Filtering, search in the table


Decision making table 
Decision making table what practices need to be selected


Stacy
Cynefin
Primary Approach
Secondary Approach
Complex
Commplex
Agile
Agile
Complex
Complicated
Agile
Hybrid
Simple
Complicated
Hybrid
Predictive
Complicated
Complicated
Hybrid
Hybrid
Complicated
Commplex
Agile
Hybrid
Simple
Clear
Predictive
Predictive















