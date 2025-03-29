
import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/database.types';
import { toast } from 'sonner';

type ProtectedRouteProps = {
  children: React.ReactNode;
  requiredRole?: UserRole[];
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole 
}) => {
  const { user, profile, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Only show the toast message if we're not loading and user is not authenticated
    if (!isLoading && !user) {
      toast.error('You must be signed in to access this page');
      navigate('/auth');
    }
    
    // Check role-based access if specified and user is authenticated
    if (!isLoading && user && profile && requiredRole && !requiredRole.includes(profile.role)) {
      toast.error('You do not have permission to access this page');
      navigate('/dashboard');
    }
  }, [user, profile, isLoading, navigate, requiredRole]);

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
  if (requiredRole && profile && !requiredRole.includes(profile.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  // User is authenticated and has the required role, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
