
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthOptimized from '@/components/auth/AuthOptimized';
import Loading from '@/components/common/Loading';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  
  // Get the mode from the URL parameters (login or register)
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  useEffect(() => {
    // Apply dark theme to auth pages to match landing page
    document.body.classList.add('dark-theme');
    
    // Only redirect if user is logged in and we're not loading
    if (!isLoading) {
      if (user) {
        console.log('User detected, redirecting to dashboard');
        navigate('/dashboard');
      }
      setIsChecking(false);
    }
    
    return () => {
      document.body.classList.remove('dark-theme');
    };
  }, [user, isLoading, navigate]);

  // Show loading while checking auth state
  if (isLoading || isChecking) {
    return <Loading />;
  }

  // Only render auth form if user is not logged in
  return <AuthOptimized initialMode={mode} />;
};

export default Auth;
