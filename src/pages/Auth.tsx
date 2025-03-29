
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { PageTransition } from '@/components/common/Transitions';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';
import { ScaleIn } from '@/components/common/Transitions';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const { user, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Get the return URL from location state or default to dashboard
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Memoized redirect callback to prevent excessive renders
  const handleRedirect = useCallback(() => {
    if (user && !authLoading) {
      console.log('User already authenticated, redirecting to:', from);
      navigate(from, { replace: true });
    }
    setIsLoading(false);
  }, [user, authLoading, from, navigate]);
  
  // Add console log to debug rendering
  useEffect(() => {
    console.log('Auth page rendered', { user, from, authLoading });
    
    // Add a slight delay before determining redirect to prevent flash of login screen
    if (!authLoading) {
      const timer = setTimeout(() => {
        handleRedirect();
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [user, authLoading, handleRedirect]);
  
  // Check if mode is specified in URL
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
          <ScaleIn delay={150}>
            <Link 
              to="/" 
              className="inline-flex items-center text-blue-600 hover:text-blue-800 hover:underline mb-6"
            >
              <ArrowLeft size={16} className="mr-2" />
              Back to Home
            </Link>
            
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                {initialMode === 'register' ? 'Create Account' : 'Sign In'} 
              </h1>
              <p className="mt-2 text-gray-600">
                {initialMode === 'register' 
                  ? 'Join our platform to manage compliance' 
                  : 'Welcome back to the compliance platform'}
              </p>
            </div>
            
            <AuthForm initialMode={initialMode} />
            
            <div className="mt-4 text-center text-sm text-gray-500 pt-4 border-t border-gray-200">
              <p>
                By signing up, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </ScaleIn>
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthPage;
