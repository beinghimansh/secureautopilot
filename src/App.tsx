import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';

// Loading component with reduced animation for better performance
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

// Create a separate routes component for public pages to avoid lazy loading
const PublicPages = () => (
  <>
    <Route path="/" element={<Home />} />
    <Route path="/features" element={<Features />} />
    <Route path="/pricing" element={<Pricing />} />
    <Route path="/about" element={<About />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/documentation" element={<Documentation />} />
    <Route path="/support" element={<Support />} />
    <Route path="/security" element={<Security />} />
    <Route path="/auth" element={<Auth />} />
  </>
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
const Features = lazy(() => import('@/pages/Features'));
const Pricing = lazy(() => import('@/pages/Pricing'));
const About = lazy(() => import('@/pages/About'));

// New pages
const Blog = lazy(() => import('@/pages/Blog'));
const Documentation = lazy(() => import('@/pages/Documentation'));
const Support = lazy(() => import('@/pages/Support'));
const Security = lazy(() => import('@/pages/Security'));

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
            {/* Public routes - directly loaded without Suspense */}
            <PublicPages />
            
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
              path="/compliance/:frameworkId/requirements" 
              element={
                <ProtectedRoute>
                  <RedirectToFramework />
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
