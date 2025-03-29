
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageTransition } from '@/components/common/Transitions';
import AuthForm from '@/components/auth/AuthForm';
import { useAuth } from '@/contexts/AuthContext';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);
  
  // Check if mode is specified in URL
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  
  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <AuthForm initialMode={initialMode} />
        </div>
      </div>
    </PageTransition>
  );
};

export default AuthPage;
