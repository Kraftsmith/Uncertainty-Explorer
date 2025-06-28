# Delivery Practices Data Table - Requirements & Specification

## Requirements Analysis

### 1. Data Table Purpose
- **R1.1**: Display delivery management practices based on assessment results
- **R1.2**: Use delivery management practices filtered by Stacey + Cynefin assessment outcomes as data source
- **R1.3**: Implement as results display table (not interactive assessment table)
- **R1.4**: Allow users to discard assessment filters and view all practices

### 2. Functionality Requirements
- **R2.1**: No sorting capabilities required
- **R2.2**: Auto-filtering required - applied on page load based on Decision Making Table
- **R2.3**: Filter discarding required - allow users to show all practices regardless of assessment
- **R2.4**: Filter re-application required - allow users to re-apply assessment filters after discarding
- **R2.5**: No inline editing required
- **R2.6**: No export functionality required
- **R2.7**: Search required - search within current view (filtered or unfiltered)
- **R2.8**: No real-time updates relation to sliders/charts

### 3. Implementation Location
- **R3.1**: Implement in `delivery-practices-section`
- **R3.2**: Current data structure is appropriate for display
- **R3.3**: Support interactions for filtering, search, and filter control only

---

# Complete Data Table Specification

## Overview
**R4.1**: A results display table that shows filtered delivery management practices based on Stacey Matrix and Cynefin Framework assessment results. The table automatically applies filters based on assessment outcomes and provides search functionality. Users can discard assessment filters to view all practices and re-apply them as needed.

## Purpose
- **R5.1**: Display delivery management practices relevant to the user's specific assessment results
- **R5.2**: Provide search and filtering capabilities for practice discovery
- **R5.3**: Allow users to toggle between filtered (assessment-based) and unfiltered (all practices) views
- **R5.4**: Show practice details including name, description, and approach alignment

## Data Source & Structure

### Primary Data Source
- **R6.1**: Use file `Data/delivery-practices.js`
- **R6.2**: Use array `deliveryPractices[]`

### Practice Object Structure
Each practice contains:
- **R6.3**: `name`: Practice name/title
- **R6.4**: `primaryArea`: "Agile", "Hybrid", or "Predictive" 
- **R6.5**: `secondaryArea`: Secondary approach (optional)
- **R6.6**: `description`: Detailed practice description
- **R6.7**: `benefits`: Benefits of implementing the practice
### R6.8: Complete Data Structure Requirements
- **R6.8.1**: Stacey localStorage must contain: `{area, product: {average}, technical: {average}, team: {average}, timestamp}`
- **R6.8.2**: Cynefin localStorage must contain: `{domain, allQuestionScores, averageDecisionScore, averageCauseEffectScore, timestamp}`
- **R6.8.3**: Assessment components must save complete data structures, not partial data
- **R6.8.4**: Test buttons on assessment pages must auto-save results to localStorage

## Decision Logic & Auto-Filtering

### Decision Making Table
**R7.1**: This table determines which practices to display based on assessment results.

| Stacey      | Cynefin     | Primary Approach | Secondary Approach |
| ----------- | ----------- | ---------------- | ------------------ |
| Complex     | Complex     | Agile            | Agile              |
| Complex     | Complicated | Agile            | Hybrid             |
| Simple      | Complicated | Hybrid           | Predictive         |
| Complicated | Complicated | Hybrid           | Hybrid             |
| Complicated | Complex     | Agile            | Hybrid             |
| Simple      | Clear       | Predictive       | Predictive         |

### Auto-Filter Implementation
- **R7.2**: Auto-filter triggered when page loads
- **R7.3**: Get Stacey results from `localStorage['staceyMatrixResults'].area`
- **R7.4**: Get Cynefin results from `localStorage['cynefinFrameworkAssessmentResults_v3'].domain`
- **R7.5**: Use Decision Making Table to determine Primary and Secondary approaches for the assessment combination
- **R7.6**: Show practices where `primaryArea` OR `secondaryArea` matches the determined Primary OR Secondary approaches
- **R7.6.1**: However, if  either Cynefin OR Stacey assessment result is "Complex", exclude(filter out) practices where `primaryArea`  or `secondaryArea` is   "Predictive" from the table. Exclusion must go first.
- **R7.7**: If no assessment results found, show all practices with appropriate status message



### Filter Control States
- **R7.8**: Assessment Filters Active state shows only practices matching assessment results with "Show All Practices" button visible
- **R7.9**: Assessment Filters Discarded state shows all practices with "Apply Assessment Filter" button visible (if assessment results available)
- **R7.10**: No Assessment Results state shows all practices by default with no filter control buttons

### Filter Logic Examples
- **R7.11**: **Example 1**: Stacey="Complicated" + Cynefin="Complex" → Show practices where `primaryArea` OR `secondaryArea` = "Agile" OR "Hybrid"
- **R7.12**: **Example 2**: Stacey="Simple" + Cynefin="Clear" → Show practices where `primaryArea` OR `secondaryArea` = "Predictive"
- **R7.13**: **Example 3**: Stacey="Complex" + Cynefin="Complicated" → Show practices where `primaryArea` OR `secondaryArea` = "Agile" OR "Hybrid"
- **R7.14**: **Example 4**: Stacey="Complicated" + Cynefin="Complicated" → Show practices where `primaryArea` OR `secondaryArea` = "Hybrid"

### Filter Priority
- **R7.15**: Show practices where `primaryArea` matches decision matrix Primary approach
- **R7.16**: Show practices where `primaryArea` matches decision matrix Secondary approach (if different from Primary)
- **R7.17**: Show practices where `secondaryArea` matches decision matrix Primary approach
- **R7.18**: Show practices where `secondaryArea` matches decision matrix Secondary approach (if different from Primary)
- **R7.19**: Use OR logic to show practices matching any of the above conditions

## Table Structure & Layout

### Location & Container
- **R8.1**: Use section ID `delivery-practices-section`
- **R8.2**: Use table ID `practices-table`
- **R8.3**: Use container `delivery-practices-container`

### Column Configuration
- **R8.4**: Practice column displays `name` field, always visible
- **R8.5**: Description column displays `description` field as primary content area
- **R8.6**: Primary Area column displays `primaryArea` field as color-coded badge
- **R8.7**: Secondary Area column displays `secondaryArea` field as color-coded badge

### Visual Design
- **R8.8**: Use clean, professional data table with alternating row colors
- **R8.9**: Agile approach uses green badge (`badge-agile`)
- **R8.10**: Hybrid approach uses yellow/amber badge (`badge-hybrid`)
- **R8.11**: Predictive approach uses blue badge (`badge-predictive`)
- **R8.12**: Implement horizontal scroll on mobile devices
- **R8.13**: Add row highlighting on hover

## Search & Filtering Functionality

### Global Search
- **R9.1**: Use input ID `global-search`
- **R9.2**: Use placeholder "Search all columns..."
- **R9.3**: Implement real-time search across all visible columns
- **R9.4**: Search name, description, primaryArea, and secondaryArea fields
- **R9.5**: Use OR logic across all search fields
- **R9.6**: Work within current filter state (filtered or unfiltered)

### Control Buttons

#### Clear Search Button
- **R9.7**: Use button ID `clear-search`
- **R9.8**: Use label "Clear Search"
- **R9.9**: Clear search input and maintain current filter state
- **R9.10**: If assessment filters active, re-apply them; if discarded, show all practices

#### Show All Practices Button
- **R9.11**: Use button ID `discard-filters`
- **R9.12**: Use label "Show All Practices"
- **R9.13**: Use class `btn-warning` (yellow/amber styling)
- **R9.14**: Show when assessment filters are active
- **R9.15**: Discard assessment filters and show all practices
- **R9.16**: Clear all filters including search, show all practices, update status, switch button visibility

#### Apply Assessment Filter Button
- **R9.17**: Use button ID `apply-filters`
- **R9.18**: Use label "Apply Assessment Filter"
- **R9.19**: Use class `btn-primary` (blue styling)
- **R9.20**: Show when assessment filters are discarded AND assessment results are available
- **R9.21**: Re-apply assessment-based filtering using Decision Making Table logic

### Filter Status Display
- **R9.22**: Use element ID `filter-status`
- **R9.23**: Show current table state with specific examples:
  - "Showing practices for Agile/Hybrid approaches (Complicated + Complex)"
  - "Showing practices for Predictive approaches (Simple + Clear)"
  - "Showing practices for Hybrid approaches (Complicated + Complicated)"
  - "Showing practices for Agile approaches (Complex + Complex)"
  - "Showing all practices. Assessment filters discarded."
  - "No assessment results found. Showing all practices."

## Integration Points

### Assessment Result Integration
- **R10.1**: Retrieve Stacey Results from `localStorage['staceyMatrixResults'].area`
- **R10.2**: Retrieve Cynefin Results from `localStorage['cynefinFrameworkAssessmentResults_v3'].domain`
- **R10.3**: Initialize components in correct sequence to prevent conflicts:
  1. Load summary component structure
  2. Initialize chart components in display mode
  3. Load and validate localStorage data
  4. Apply final display updates with saved data
  5. Ensure no component overwrites another's display elements
- **R10.4**: Assessment results available in localStorage (optional)
- **R10.5**: Integrate with Tabulator library for table functionality
- **R10.6**: Use existing CSS classes from `common-styles.css`
- **R10.7**: Depend on `deliveryPractices` array from `Data/delivery-practices.js`

## User Experience Flow

### Initial Load States
- **R11.1**: With Assessment Results: Load with assessment-based filters applied, show only relevant practices based on Decision Making Table, make "Show All Practices" button available, show assessment criteria in filter status
- **R11.2**: Without Assessment Results: Load showing all practices, hide filter control buttons, indicate no assessment results in filter status

### User Interactions
- **R11.3**: Discarding Filters: Click "Show All Practices" → clear all filters → display all practices → change to "Apply Assessment Filter" → update status
- **R11.4**: Re-applying Filters: Click "Apply Assessment Filter" → apply assessment-based filters → show only relevant practices → change to "Show All Practices" → show assessment criteria
- **R11.5**: Search Within Current State: Type in search box → real-time filtering within current view → work whether filters are active or discarded → "Clear Search" maintains current filter state

## Technical Implementation Notes

### Key Functions
- **R12.1**: `applyAssessmentFilters()` - Apply assessment-based filtering using Decision Making Table
- **R12.2**: `discardAssessmentFilters()` - Remove all filters, show all practices
- **R12.3**: `updateButtonVisibility()` - Show/hide appropriate control buttons
- **R12.4**: `getStaceyResult()` - Extract Stacey area from localStorage
- **R12.5**: `getCynefinResult()` - Extract Cynefin domain from localStorage  
- **R12.6**: `getDecisionFromMatrix(stacey, cynefin)` - Find matching decision from matrix
- **R12.7**: `updateFilterStatus(message)` - Update filter status display

### State Management
- **R12.8**: Use `assessmentFiltersActive` boolean to track filter state
- **R12.9**: Control button visibility based on filter state and assessment result availability
- **R12.10**: Reflect current table state in filter status messages

### Data Flow
- **R12.11**: Assessment Results → Decision Matrix Lookup → Determine Primary/Secondary Approaches → Create Filter Conditions → Apply Filters → Filtered View
- **R12.12**: Discard Action → Clear Filters → All Practices View
- **R12.13**: Re-apply Action → Assessment Filters → Filtered View
- **R12.14**: Search → Additional Filtering → Updated Current View

### Filter Implementation Logic
- **R12.15**: For each assessment combination, use Decision Making Table to get Primary and Secondary approaches
- **R12.16**: Create filter conditions array with four possible matches:
  - `primaryArea` = Primary approach
  - `primaryArea` = Secondary approach (if different from Primary)
  - `secondaryArea` = Primary approach  
  - `secondaryArea` = Secondary approach (if different from Primary)
- **R12.17**: Apply filter conditions with OR logic to show all matching practices
- **R12.18**: Display count of filtered practices and assessment criteria used

### Enhanced Error Handling
- **R12.19**: Graceful fallback when assessment results are missing or malformed
- **R12.20**: Validation of localStorage data structure completeness
- **R12.21**: Auto-repair mechanisms for display mismatches
- **R12.22**: Console logging for debugging filter application and data validation
- **R12.23**: Prevention of hardcoded test data overwriting user assessments

### Performance Considerations
- **R12.24**: Client-side filtering for responsive user experience
- **R12.25**: Efficient localStorage access patterns
- **R12.26**: Minimal DOM manipulation during filter operations
- **R12.27**: State tracking prevents unnecessary re-filtering

**R13.1**: This specification ensures users have full control over the table filtering while maintaining the smart defaults based on their assessment results. The filtering logic correctly maps assessment combinations to relevant delivery practices, allowing users to explore targeted recommendations while maintaining the flexibility to view all practices when needed.

## Detailed Filter Mapping Examples

### Complete Filter Logic Matrix
- **Stacey="Complex" + Cynefin="Complex"**: Show practices with `primaryArea` OR `secondaryArea` = "Agile"
- **Stacey="Complex" + Cynefin="Complicated"**: Show practices with `primaryArea` OR `secondaryArea` = "Agile" OR "Hybrid"
- **Stacey="Simple" + Cynefin="Complicated"**: Show practices with `primaryArea` OR `secondaryArea` = "Hybrid" OR "Predictive"
- **Stacey="Complicated" + Cynefin="Complicated"**: Show practices with `primaryArea` OR `secondaryArea` = "Hybrid"
- **Stacey="Complicated" + Cynefin="Complex"**: Show practices with `primaryArea` OR `secondaryArea` = "Agile" OR "Hybrid"
- **Stacey="Simple" + Cynefin="Clear"**: Show practices with `primaryArea` OR `secondaryArea` = "Predictive"

### R13: Component Interaction Requirements
- **R13.1**: Summary page components must not override each other's display elements
- **R13.2**: StaceyChartComponent in display mode must not update area display elements
- **R13.3**: Area display responsibility: Summary component handles `area-name` and `area-result` elements
- **R13.4**: Chart component responsibility: Only handles chart visualization and score displays
- **R13.5**: Component initialization timing must prevent display conflicts

### R14: Assessment Test Button Requirements
- **R14.1**: Test buttons on Stacey page must save complete results to localStorage
- **R14.2**: Test buttons on Cynefin page must save complete results to localStorage  
- **R14.3**: Test button data must match real assessment data structure
- **R14.4**: Test buttons must not navigate away from current page
- **R14.5**: Test data must be immediately available for delivery practices filtering

### R15: Data Persistence Requirements
- **R15.1**: Assessment data must persist across all page navigation
- **R15.2**: No page should modify localStorage data belonging to other assessments
- **R15.3**: Utility files must not contain hardcoded localStorage initialization
- **R15.4**: Area display must remain consistent regardless of page visited

### R16: Debugging & Maintenance Requirements
- **R16.1**: Provide diagnostic tools to validate localStorage data integrity
- **R16.2**: Include auto-repair functions for display mismatches
- **R16.3**: Implement validation scripts for assessment data completeness
- **R16.4**: Create test scripts for Decision Making Table logic verification


