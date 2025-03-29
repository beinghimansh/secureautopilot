
# User Workflows

This document outlines the key user workflows within the ComplyFlow platform, describing how users interact with the system to accomplish compliance-related tasks.

## Role-Based Workflows

The platform supports different workflows based on user roles:

1. **Super Admin**: Platform administration and organization management
2. **Company Admin**: Organization-level compliance management
3. **Compliance Officer**: Implementation and monitoring of compliance
4. **Employee**: Task completion and evidence submission
5. **Auditor**: Compliance assessment and review

![User Roles Workflow](../assets/user-roles-workflow.png)

## Organization Onboarding

### Workflow Steps

1. **Super Admin creates organization**
   - Enters organization details
   - Sets subscription tier
   - Creates initial Company Admin user

2. **Company Admin completes setup**
   - Updates organization profile
   - Invites team members
   - Selects applicable compliance frameworks
   - Configures organization-specific settings

3. **Profile Completion**
   - Organization details (size, industry, etc.)
   - Data infrastructure information
   - Security controls inventory
   - Risk appetite assessment

### Implementation Details

```mermaid
sequenceDiagram
    Super Admin->>Database: Create organization record
    Super Admin->>Database: Create company admin user
    Company Admin->>Platform: Complete organization profile
    Company Admin->>Platform: Select frameworks
    Company Admin->>Platform: Invite team members
    Database->>Company Admin: Organization setup complete
```

## Compliance Framework Implementation

### Workflow Steps

1. **Framework Selection**
   - Company Admin or Compliance Officer selects frameworks
   - Platform creates initial framework structure

2. **Policy Generation**
   - Complete policy generation form
   - AI generates comprehensive policies
   - Review and customize generated content
   - Approve and publish policies

3. **Control Implementation**
   - Assign controls to team members
   - Set implementation deadlines
   - Track implementation progress
   - Document evidence of compliance

4. **Continuous Monitoring**
   - Regular progress assessments
   - Gap analysis and remediation
   - Policy updates and version control

### Implementation Details

The policy generation workflow leverages OpenAI for creating comprehensive compliance documentation:

```mermaid
sequenceDiagram
    User->>Frontend: Complete policy form
    Frontend->>Edge Function: Send policy request
    Edge Function->>OpenAI: Request policy generation
    OpenAI->>Edge Function: Return generated content
    Edge Function->>Database: Store policy and related documents
    Database->>Frontend: Confirm successful storage
    Frontend->>User: Display success and policy access
```

## Task Management

### Workflow Steps

1. **Task Creation**
   - Compliance Officer creates tasks
   - Tasks linked to specific controls/requirements
   - Assignment to specific team members
   - Setting due dates and priorities

2. **Task Execution**
   - Employee receives notification
   - Employee completes assigned task
   - Employee uploads evidence
   - Employee marks task as complete

3. **Task Review**
   - Compliance Officer reviews completed tasks
   - Approves or requests additional evidence
   - Links evidence to compliance requirements

### Implementation Details

```mermaid
sequenceDiagram
    Compliance Officer->>Database: Create task
    Database->>Employee: Task notification
    Employee->>Platform: Complete task
    Employee->>Storage: Upload evidence
    Employee->>Database: Mark task complete
    Database->>Compliance Officer: Task completion notification
    Compliance Officer->>Platform: Review evidence
    Compliance Officer->>Database: Approve evidence
```

## Audit Preparation and Execution

### Workflow Steps

1. **Audit Scheduling**
   - Create audit record in the system
   - Set audit dates and objectives
   - Assign auditor access

2. **Evidence Collection**
   - System gathers required evidence
   - Compliance Officer reviews evidence
   - Additional evidence collection as needed

3. **Audit Execution**
   - Auditor reviews evidence
   - Records findings in the system
   - Identifies gaps and recommendations

4. **Remediation**
   - Tasks created for remediation
   - Tracking of remediation progress
   - Verification of completed remediation

### Implementation Details

```mermaid
sequenceDiagram
    Compliance Officer->>Database: Schedule audit
    Database->>System: Gather evidence
    System->>Database: Compile evidence package
    Compliance Officer->>Platform: Review evidence
    Compliance Officer->>Database: Grant auditor access
    Auditor->>Platform: Review evidence
    Auditor->>Database: Record findings
    Database->>Compliance Officer: Finding notifications
    Compliance Officer->>Platform: Create remediation tasks
```

## Voice Summary Creation and Consumption

### Workflow Steps

1. **Summary Creation**
   - Select compliance document
   - Create summary or extract key points
   - Choose voice preferences
   - Generate voice summary

2. **Summary Access**
   - Browse available summaries
   - Play audio with playback controls
   - Download for offline listening

### Implementation Details

The voice summary generation workflow leverages ElevenLabs for text-to-speech conversion:

```mermaid
sequenceDiagram
    User->>Frontend: Select document and voice
    Frontend->>Edge Function: Send voice generation request
    Edge Function->>ElevenLabs: Request speech synthesis
    ElevenLabs->>Edge Function: Return audio content
    Edge Function->>Storage: Store audio file
    Edge Function->>Database: Save summary record
    Database->>Frontend: Return success and audio URL
    Frontend->>User: Play audio summary
```

## AI Assistance Workflow

### Workflow Steps

1. **Question Entry**
   - User types compliance-related question
   - Optional selection of framework context

2. **AI Processing**
   - Request sent to OpenAI with context
   - Response generated with specific guidance

3. **Response Review**
   - User reviews AI guidance
   - Option to copy, save, or ask follow-up questions

### Implementation Details

```mermaid
sequenceDiagram
    User->>Frontend: Enter compliance question
    Frontend->>Edge Function: Send question with context
    Edge Function->>OpenAI: Request framework-specific guidance
    OpenAI->>Edge Function: Return guidance
    Edge Function->>Frontend: Display guidance to user
    User->>Frontend: Review and optionally save guidance
```

## Dashboard and Reporting

### Workflow Steps

1. **Dashboard Review**
   - View compliance scores
   - Track implementation progress
   - Monitor upcoming deadlines
   - Identify risk areas

2. **Report Generation**
   - Select report parameters
   - Generate compliance reports
   - Export in various formats (PDF, Excel)
   - Share with stakeholders

### Implementation Details

The dashboard components pull data from various tables and calculate metrics in real-time:

```mermaid
flowchart TD
    A[User Accesses Dashboard] --> B[Dashboard Components Render]
    B --> C{Role-Based Filtering}
    C -->|Admin| D[Admin Dashboard]
    C -->|User| E[User Dashboard]
    D --> F[Fetch Organization Metrics]
    E --> G[Fetch User Tasks]
    F --> H[Calculate Compliance Scores]
    G --> I[Calculate Task Completion]
    H --> J[Render Dashboard Cards]
    I --> J
```

## Integration Workflows

### Cloud Provider Monitoring

```mermaid
sequenceDiagram
    Integration->>Cloud Provider: Check compliance status
    Cloud Provider->>Integration: Return compliance data
    Integration->>Database: Update compliance status
    Database->>Dashboard: Update compliance scores
```

### Notification Workflows

```mermaid
sequenceDiagram
    System Event->>Notification Service: Trigger notification
    Notification Service->>User: Send notification
    User->>Platform: View notification details
    User->>Platform: Take required action
```

These workflows represent the core user interactions within the ComplyFlow platform, supporting comprehensive compliance management from framework selection through auditing and continuous improvement.
