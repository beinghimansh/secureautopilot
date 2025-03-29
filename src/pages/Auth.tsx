
import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import AuthOptimized from '@/components/auth/AuthOptimized';
import Loading from '@/components/common/Loading';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isLoading } = useAuth(); // Use isLoading instead of loading
  
  // Get the mode from the URL parameters (login or register)
  const mode = searchParams.get('mode') === 'register' ? 'register' : 'login';

  useEffect(() => {
    // If the user is already logged in, redirect to dashboard
    if (user && !isLoading) {
      navigate('/dashboard');
    }
  }, [user, isLoading, navigate]);

  // Show loading while checking auth state
  if (isLoading) {
    return <Loading />;
  }

  return <AuthOptimized initialMode={mode} />;
};

export default Auth;
