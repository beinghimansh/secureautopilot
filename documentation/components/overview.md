
# Core Components

ComplyFlow is built using a modular component architecture that ensures maintainability, reusability, and scalability. This document provides an overview of the core components that make up the platform.

## Component Architecture

The platform follows a hierarchical component structure:

1. **Pages**: Top-level components representing complete views
2. **Layouts**: Structural components that define the arrangement of sections
3. **Sections**: Functional groupings of related components
4. **Cards/Widgets**: Self-contained UI elements displaying specific data or functionality
5. **Common Components**: Reusable UI elements used throughout the application
6. **Service Integrations**: Components that interact with external services

![Component Architecture](../assets/component-architecture.png)

## Key Component Modules

### Authentication Components

- **AuthForm**: Handles user authentication and registration
- **ProtectedRoute**: Route wrapper that enforces authentication
- **RoleBasedContent**: Conditionally renders content based on user role

### Dashboard Components

- **AdminDashboard**: Top-level dashboard for administrative users
- **UserDashboard**: Top-level dashboard for standard users
- **DashboardCards**: Collection of specialized cards showing metrics and statuses
  - **ComplianceScoreCard**: Displays compliance scores for frameworks
  - **TasksStatusCard**: Shows task completion metrics
  - **RiskOverviewCard**: Visualizes risk assessments
  - **UpcomingDeadlinesCard**: Displays upcoming compliance deadlines
  - **RecentActivitiesCard**: Shows recent platform activities

### Compliance Framework Components

- **FrameworkSelector**: Allows users to choose compliance frameworks
- **FrameworkControls**: Displays and manages framework-specific controls
- **FrameworkTabs**: Navigation interface for framework sections
- **RulesList**: Displays hierarchical framework requirements
- **RuleDetails**: Shows and edits details of specific requirements
- **PolicyGenerator**: Wizard for generating compliance policies
- **PolicyLibrary**: Manages and displays generated policies

### AI Integration Components

- **OpenAIAssistant**: Provides AI guidance for compliance questions
- **AIGuidanceButton**: Quick-access buttons for common AI queries
- **PolicyGeneratorForm**: Form for AI-based policy generation
- **GenerationProgress**: Shows policy generation progress

### Voice Processing Components

- **VoiceSettings**: Configuration interface for voice preferences
- **VoiceSummaryList**: Displays available voice summaries
- **AudioPlayer**: Plays generated voice content
- **GenerateVoiceSummary**: Interface for creating new voice summaries
- **VoiceTrainingList**: Manages voice training sessions

### Common UI Components

- **CircularProgress**: Displays percentage-based progress in a circular format
- **ProgressBar**: Shows linear progress for various metrics
- **StatusIndicator**: Visual indicator for status states (healthy, warning, critical)
- **DashboardCard**: Base card component with consistent styling
- **Transitions**: Page transition animations for smooth navigation
- **IconStat**: Displays metrics with associated icons

### Layout Components

- **Navbar**: Top navigation bar with user and app controls
- **Sidebar**: Side navigation for main app sections
- **PublicPageLayout**: Layout for unauthenticated pages
- **PageTransition**: Wrapper for animated page transitions

## Component Reusability

Components are designed with reusability in mind, following these principles:

1. **Prop-Based Configuration**: Components accept props for customization
2. **Composition**: Complex UIs are built by composing smaller components
3. **Context Providers**: Shared state is managed through React Context
4. **Custom Hooks**: Business logic is extracted into reusable hooks
5. **Render Props**: Some components use render props for flexible content rendering

## Component Communication

Components communicate through several methods:

1. **Props**: Direct parent-to-child communication
2. **Context API**: Global or section-specific state management
3. **Custom Events**: For cross-component communication
4. **Custom Hooks**: Shared business logic and state
5. **Tanstack Query**: For data fetching and server state management

## UI Component Library

The platform uses shadcn/ui components as a foundation, with custom extensions including:

- **Button**: Extended with compliance-specific variants
- **Card**: Enhanced with dashboard-specific styling
- **Dialog**: Custom modals for compliance workflows
- **Tabs**: Navigation for framework sections
- **Form Controls**: Specialized inputs for compliance data

## Component Documentation

Each significant component has associated documentation including:

1. **Purpose**: What the component is designed to do
2. **Props API**: Available configuration options
3. **Usage Examples**: Code snippets showing implementation
4. **Dependencies**: Required context or services
5. **Accessibility**: ARIA roles and keyboard navigation

The modular architecture ensures that the platform remains maintainable as it grows, with clear separation of concerns and reusable building blocks for new features.
