
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';
import Loading from './components/common/Loading';

// Lazy loaded pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const AuthPage = React.lazy(() => import('./pages/Auth'));
const CompliancePage = React.lazy(() => import('./pages/Compliance'));
const FrameworkRequirements = React.lazy(() => import('./pages/FrameworkRequirements'));
const TasksPage = React.lazy(() => import('./pages/Tasks'));
const PoliciesPage = React.lazy(() => import('./pages/Policies'));
const ReportsPage = React.lazy(() => import('./pages/Reports'));
const ActivitiesPage = React.lazy(() => import('./pages/reports/Activities'));
const AnalyticsPage = React.lazy(() => import('./pages/reports/Analytics'));
const ExportReportPage = React.lazy(() => import('./pages/reports/Export'));
const UpcomingDeadlinesPage = React.lazy(() => import('./pages/tasks/Upcoming'));
const ComplianceRisksPage = React.lazy(() => import('./pages/compliance/Risks'));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compliance" element={<CompliancePage />} />
            <Route path="/compliance/:frameworkId" element={<FrameworkRequirements />} />
            <Route path="/compliance/risks" element={<ComplianceRisksPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/tasks/upcoming" element={<UpcomingDeadlinesPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/reports/activities" element={<ActivitiesPage />} />
            <Route path="/reports/analytics" element={<AnalyticsPage />} />
            <Route path="/reports/export" element={<ExportReportPage />} />
          </Routes>
        </Suspense>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </Router>
  );
}

export default App;
