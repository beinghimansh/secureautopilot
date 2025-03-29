
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Loading from './components/common/Loading';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Compliance from './pages/Compliance';
import Tasks from './pages/Tasks';
import Policies from './pages/Policies';
import Reports from './pages/Reports';
import NotFound from './pages/NotFound';
import Team from './pages/Team';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import DataSources from './pages/DataSources';
import CloudSecurity from './pages/CloudSecurity';
import Risks from './pages/compliance/Risks';
import SuperAdminSetup from './pages/SuperAdminSetup';
import ComplyVoiceAI from './pages/ComplyVoiceAI';

// Providers
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'sonner';

// Lazy loaded components
const FrameworkRequirements = lazy(() => import('./pages/FrameworkRequirements'));

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/compliance" element={<ProtectedRoute><Compliance /></ProtectedRoute>} />
            <Route path="/compliance/risks" element={<ProtectedRoute><Risks /></ProtectedRoute>} />
            <Route path="/compliance/:frameworkId" element={
              <ProtectedRoute>
                <FrameworkRequirements />
              </ProtectedRoute>
            } />
            <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
            <Route path="/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
            <Route path="/voice-ai" element={<ProtectedRoute><ComplyVoiceAI /></ProtectedRoute>} />
            <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
            <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
            <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/data-sources" element={<ProtectedRoute><DataSources /></ProtectedRoute>} />
            <Route path="/cloud-security" element={<ProtectedRoute><CloudSecurity /></ProtectedRoute>} />
            <Route path="/admin/setup" element={<ProtectedRoute requireAdmin={true}><SuperAdminSetup /></ProtectedRoute>} />
            
            {/* Fallback routes */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Toaster position="top-right" richColors />
      </AuthProvider>
    </Router>
  );
}

export default App;
