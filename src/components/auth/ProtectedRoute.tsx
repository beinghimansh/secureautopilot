
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/database.types';
import { toast } from 'sonner';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: UserRole[];
  requireAdmin?: boolean; // Add support for the requireAdmin prop
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole,
  requireAdmin
}) => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();
  
  // Convert requireAdmin to requiredRole if specified
  const effectiveRequiredRole = requireAdmin 
    ? ['admin'] as UserRole[] 
    : requiredRole;

  useEffect(() => {
    // Only show the toast message if we're not loading and user is not authenticated
    if (!isLoading && !user) {
      toast.error('You must be signed in to access this page');
      navigate('/auth');
    }
    
    // Check role-based access if specified and user is authenticated
    if (!isLoading && user && profile && effectiveRequiredRole && !effectiveRequiredRole.includes(profile.role)) {
      toast.error('You do not have permission to access this page');
      navigate('/dashboard');
    }
  }, [user, profile, isLoading, navigate, effectiveRequiredRole]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Role-based access check
  if (effectiveRequiredRole && profile && !effectiveRequiredRole.includes(profile.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has the required role, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
