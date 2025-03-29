
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
    
    // Add a small delay to prevent immediate redirects
    const timer = setTimeout(() => {
      // If the user is already logged in, redirect to dashboard
      if (user && !isLoading) {
        document.body.classList.remove('dark-theme'); // Remove dark theme before redirecting to dashboard
        navigate('/dashboard');
      }
      setIsChecking(false);
    }, 1000);
    
    return () => {
      // Only remove dark theme if we're navigating to a protected route
      if (user) {
        document.body.classList.remove('dark-theme');
      }
      clearTimeout(timer);
    };
  }, [user, isLoading, navigate]);

  // Show loading while checking auth state
  if (isLoading || isChecking) {
    return <Loading />;
  }

  return <AuthOptimized initialMode={mode} />;
};

export default Auth;
