
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Import static public pages directly to avoid suspense loading
import Home from '@/pages/Home';
import Features from '@/pages/Features';
import Pricing from '@/pages/Pricing';
import About from '@/pages/About';
import Blog from '@/pages/Blog';
import Documentation from '@/pages/Documentation';
import Support from '@/pages/Support';
import Security from '@/pages/Security';
import Auth from '@/pages/Auth';
import NotFound from '@/pages/NotFound';

// Loading component with reduced animation for better performance
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Lazy loaded pages with performance optimizations
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Tasks = lazy(() => import('@/pages/Tasks'));
const Reports = lazy(() => import('@/pages/Reports'));
const Settings = lazy(() => import('@/pages/Settings'));
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

// Redirect component for legacy URLs
const RedirectToFramework = () => {
  const { frameworkId } = useParams();
  return <Navigate to={`/compliance/frameworks/${frameworkId}`} replace />;
};

// Create a client with improved caching and optimized performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1 minute
      gcTime: 5 * 60 * 1000, // 5 minutes
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
          <Routes>
            {/* Public routes - directly rendered without Suspense for maximum speed */}
            <Route path="/" element={<Home />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/support" element={<Support />} />
            <Route path="/security" element={<Security />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes - loaded with Suspense */}
            <Route 
              path="/dashboard" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/tasks" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Tasks />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/tasks/upcoming" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Upcoming />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/reports" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/reports/activities" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Activities />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/reports/analytics" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Analytics />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/reports/export" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Export />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/compliance" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Compliance />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/compliance/frameworks/:frameworkId" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <FrameworkRequirements />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/compliance/:frameworkId/requirements" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <RedirectToFramework />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/policies" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Policies />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/team" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Team />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/compliance/risks" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Risks />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/admin/setup" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <SuperAdminSetup />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/cloud-security" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <CloudSecurity />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/data-sources" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <DataSources />
                  </ProtectedRoute>
                </Suspense>
              } 
            />
            <Route 
              path="/notifications" 
              element={
                <Suspense fallback={<Loading />}>
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                </Suspense>
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
