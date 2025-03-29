
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Loading component with reduced animation for better performance
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Lazy loaded pages with performance optimizations
const Home = lazy(() => import('@/pages/Home'));
const Auth = lazy(() => import('@/pages/Auth'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Tasks = lazy(() => import('@/pages/Tasks'));
const Reports = lazy(() => import('@/pages/Reports'));
const Settings = lazy(() => import('@/pages/Settings'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Compliance = lazy(() => import('@/pages/Compliance'));
const FrameworkRequirements = lazy(() => import('@/pages/FrameworkRequirements'));
const Policies = lazy(() => import('@/pages/Policies'));
const Activities = lazy(() => import('@/pages/reports/Activities'));
const Analytics = lazy(() => import('@/pages/reports/Analytics'));
const Export = lazy(() => import('@/pages/reports/Export'));
const Upcoming = lazy(() => import('@/pages/tasks/Upcoming'));
const Team = lazy(() => import('@/pages/Team'));
const Risks = lazy(() => import('@/pages/compliance/Risks'));
const SuperAdminSetup = lazy(() => import('@/pages/SuperAdminSetup'));
const CloudSecurity = lazy(() => import('@/pages/CloudSecurity'));
const DataSources = lazy(() => import('@/pages/DataSources'));
const Notifications = lazy(() => import('@/pages/Notifications'));

// Create a client with improved caching
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes (renamed from cacheTime in newer versions)
      retry: 1,
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
          <Suspense fallback={<Loading />}>
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
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
