import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types/database.types';

interface RoleBasedContentProps {
  allowedRoles: UserRole[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const RoleBasedContent: React.FC<RoleBasedContentProps> = ({
  allowedRoles,
  children,
  fallback = null
}) => {
  const { profile, isLoading } = useAuth();
  
  // Handle loading state with a simple spinner
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If no profile exists yet, don't render anything
  if (!profile) {
    return null;
  }
  
  // Check if the user's role is in the list of allowed roles
  if (allowedRoles.includes(profile.role)) {
    return <>{children}</>;
  }
  
  // Otherwise, render the fallback content
  return <>{fallback}</>;
};

export default RoleBasedContent;
