
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
  const { profile } = useAuth();
  
  if (!profile) {
    return null;
  }
  
  if (allowedRoles.includes(profile.role)) {
    return <>{children}</>;
  }
  
  return <>{fallback}</>;
};

export default RoleBasedContent;
