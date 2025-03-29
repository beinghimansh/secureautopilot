
import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { PageTransition } from '@/components/common/Transitions';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/common/Loading';

// Lazy load the optimized auth component
const AuthOptimized = lazy(() => import('@/components/auth/AuthOptimized'));

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  // Get the return URL from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Check if mode is specified in URL
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  // Handle redirection logic
  const handleRedirect = useCallback(() => {
    if (user && !authLoading) {
      console.log('User already authenticated, redirecting to:', from);
      setIsRedirecting(true);
      
      // Add a short delay before redirecting to prevent immediate redirects
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 100);
    } else {
      setIsLoading(false);
    }
  }, [user, authLoading, from, navigate]);
  
  // Handle initial check to see if user is already logged in
  useEffect(() => {
    if (!authLoading) {
      console.log('Auth page: checking authentication', { user, authLoading });
      
      // Add a slight delay before checking auth status to ensure accurate data
      const timer = setTimeout(() => {
        handleRedirect();
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [user, authLoading, handleRedirect]);
  
  if (isLoading || authLoading || isRedirecting) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <PageTransition>
      <Suspense fallback={<Loading />}>
        <AuthOptimized initialMode={initialMode} />
      </Suspense>
    </PageTransition>
  );
};

export default AuthPage;
