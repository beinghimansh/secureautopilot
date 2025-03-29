
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
  const [redirectAttempted, setRedirectAttempted] = useState(false);
  
  // Get the mode from the URL parameters (login or register)
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  useEffect(() => {
    // Apply dark theme to auth pages to match landing page
    document.body.classList.add('dark-theme');
    
    // Only redirect if not already attempted (prevents infinite redirects)
    const timer = setTimeout(() => {
      if (user && !isLoading && !redirectAttempted) {
        setRedirectAttempted(true);
        document.body.classList.remove('dark-theme');
        navigate('/dashboard');
      }
      setIsChecking(false);
    }, 1000);
    
    return () => {
      clearTimeout(timer);
      if (user) {
        document.body.classList.remove('dark-theme');
      }
    };
  }, [user, isLoading, navigate, redirectAttempted]);

  // Show loading while checking auth state
  if (isLoading || isChecking) {
    return <Loading />;
  }

  // Only render auth form if user is not logged in
  if (user) {
    return <Loading />;
  }

  return <AuthOptimized initialMode={mode} />;
};

export default Auth;
