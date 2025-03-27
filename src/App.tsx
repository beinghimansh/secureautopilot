
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Compliance from "./pages/Compliance";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import SuperAdminSetup from "./pages/SuperAdminSetup";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { UserRole } from "./types/database.types";

// Define role-specific routes
const superAdminRoutes: UserRole[] = ['super_admin'];
const adminRoutes: UserRole[] = ['super_admin', 'company_admin'];
const standardRoutes: UserRole[] = ['super_admin', 'company_admin', 'compliance_officer', 'employee', 'auditor'];

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1
    }
  }
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Super Admin Only */}
            <Route 
              path="/super-admin-setup" 
              element={
                <ProtectedRoute requiredRole={superAdminRoutes}>
                  <SuperAdminSetup />
                </ProtectedRoute>
              } 
            />
            
            {/* Standard routes for authenticated users */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Dashboard />
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
              path="/tasks" 
              element={
                <ProtectedRoute>
                  <Tasks />
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

            {/* Admin Features */}
            <Route 
              path="/team" 
              element={
                <ProtectedRoute requiredRole={adminRoutes}>
                  <div className="min-h-screen bg-gray-50">
                    <h1 className="text-2xl p-10 text-center">Team Management Page (Coming Soon)</h1>
                    <p className="text-center"><a href="/dashboard" className="text-primary hover:underline">Return to Dashboard</a></p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Policy Management */}
            <Route 
              path="/policies" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-50">
                    <h1 className="text-2xl p-10 text-center">Policies Page (Coming Soon)</h1>
                    <p className="text-center"><a href="/dashboard" className="text-primary hover:underline">Return to Dashboard</a></p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Audit Management */}
            <Route 
              path="/audits" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-50">
                    <h1 className="text-2xl p-10 text-center">Audit Management (Coming Soon)</h1>
                    <p className="text-center"><a href="/dashboard" className="text-primary hover:underline">Return to Dashboard</a></p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Risk Assessment */}
            <Route 
              path="/risk-assessment" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-50">
                    <h1 className="text-2xl p-10 text-center">Risk Assessment (Coming Soon)</h1>
                    <p className="text-center"><a href="/dashboard" className="text-primary hover:underline">Return to Dashboard</a></p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Reports */}
            <Route 
              path="/reports" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-50">
                    <h1 className="text-2xl p-10 text-center">Reports Page (Coming Soon)</h1>
                    <p className="text-center"><a href="/dashboard" className="text-primary hover:underline">Return to Dashboard</a></p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Data Sources */}
            <Route 
              path="/data-sources" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-50">
                    <h1 className="text-2xl p-10 text-center">Data Sources Page (Coming Soon)</h1>
                    <p className="text-center"><a href="/dashboard" className="text-primary hover:underline">Return to Dashboard</a></p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Cloud Security */}
            <Route 
              path="/cloud-security" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-50">
                    <h1 className="text-2xl p-10 text-center">Cloud Security Page (Coming Soon)</h1>
                    <p className="text-center"><a href="/dashboard" className="text-primary hover:underline">Return to Dashboard</a></p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Notifications */}
            <Route 
              path="/notifications" 
              element={
                <ProtectedRoute>
                  <div className="min-h-screen bg-gray-50">
                    <h1 className="text-2xl p-10 text-center">Notifications Page (Coming Soon)</h1>
                    <p className="text-center"><a href="/dashboard" className="text-primary hover:underline">Return to Dashboard</a></p>
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
