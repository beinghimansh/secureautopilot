
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Pages
import Dashboard from './pages/Dashboard';
import Auth from './pages/Auth';
import Tasks from './pages/Tasks';
import Compliance from './pages/Compliance';
import Policies from './pages/Policies';
import Settings from './pages/Settings';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import FrameworkRequirements from './pages/FrameworkRequirements';
import Reports from './pages/Reports';
import DataSources from './pages/DataSources';
import CloudSecurity from './pages/CloudSecurity';
import Notifications from './pages/Notifications';
import Team from './pages/Team';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/" element={<Index />} />
          
          {/* Protected routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><Tasks /></ProtectedRoute>} />
          <Route path="/policies" element={<ProtectedRoute><Policies /></ProtectedRoute>} />
          <Route path="/compliance" element={<ProtectedRoute><Compliance /></ProtectedRoute>} />
          <Route path="/compliance/:frameworkId/requirements" element={<ProtectedRoute><FrameworkRequirements /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
          <Route path="/data-sources" element={<ProtectedRoute><DataSources /></ProtectedRoute>} />
          <Route path="/cloud-security" element={<ProtectedRoute><CloudSecurity /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
          
          {/* Fallback routes */}
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
