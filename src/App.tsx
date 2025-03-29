
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Pages
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import Dashboard from '@/pages/Dashboard';
import Tasks from '@/pages/Tasks';
import Reports from '@/pages/Reports';
import Settings from '@/pages/Settings';
import NotFound from '@/pages/NotFound';
import Compliance from '@/pages/Compliance';
import FrameworkRequirements from '@/pages/FrameworkRequirements';
import Policies from '@/pages/Policies';
import Activities from '@/pages/reports/Activities';
import Analytics from '@/pages/reports/Analytics';
import Export from '@/pages/reports/Export';
import Upcoming from '@/pages/tasks/Upcoming';
import Team from '@/pages/Team';
import Risks from '@/pages/compliance/Risks';
import SuperAdminSetup from '@/pages/SuperAdminSetup';
import CloudSecurity from '@/pages/CloudSecurity';
import DataSources from '@/pages/DataSources';
import Notifications from '@/pages/Notifications';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tasks" 
              element={
                <ProtectedRoute>
                  <Tasks />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/tasks/upcoming" 
              element={
                <ProtectedRoute>
                  <Upcoming />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports/activities" 
              element={
                <ProtectedRoute>
                  <Activities />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports/analytics" 
              element={
                <ProtectedRoute>
                  <Analytics />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/reports/export" 
              element={
                <ProtectedRoute>
                  <Export />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/compliance" 
              element={
                <ProtectedRoute>
                  <Compliance />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/compliance/frameworks/:frameworkId" 
              element={
                <ProtectedRoute>
                  <FrameworkRequirements />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/policies" 
              element={
                <ProtectedRoute>
                  <Policies />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/team" 
              element={
                <ProtectedRoute>
                  <Team />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/compliance/risks" 
              element={
                <ProtectedRoute>
                  <Risks />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/setup" 
              element={
                <ProtectedRoute>
                  <SuperAdminSetup />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/cloud-security" 
              element={
                <ProtectedRoute>
                  <CloudSecurity />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/data-sources" 
              element={
                <ProtectedRoute>
                  <DataSources />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute>
                  <Notifications />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
