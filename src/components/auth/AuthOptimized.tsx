
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ScaleIn } from '@/components/common/Transitions';
import AuthForm from './AuthForm';

interface AuthOptimizedProps {
  initialMode: 'login' | 'register';
}

const AuthOptimized: React.FC<AuthOptimizedProps> = ({ initialMode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-xl">
        <ScaleIn delay={100}>
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
  );
};

export default AuthOptimized;
