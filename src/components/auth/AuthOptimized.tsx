
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';
import { ScaleIn } from '@/components/common/Transitions';
import AuthForm from './AuthForm';

interface AuthOptimizedProps {
  initialMode: 'login' | 'register';
}

const AuthOptimized: React.FC<AuthOptimizedProps> = ({ initialMode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#111] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <ScaleIn delay={100}>
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center mx-auto mb-6">
              <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <Shield size={26} className="text-white" />
              </div>
            </Link>
            
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              ComplyAI
            </h1>
            <p className="mt-2 text-gray-400">
              {initialMode === 'register' 
                ? 'Create your account to get started' 
                : 'Welcome back! Sign in to your account'}
            </p>
          </div>
          
          <Link 
            to="/" 
            className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="glass-dark rounded-xl p-8 shadow-xl">
            <AuthForm initialMode={initialMode} />
            
            <div className="mt-6 text-center text-sm text-gray-500 pt-4 border-t border-gray-800">
              <p>
                By using ComplyAI, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </div>
        </ScaleIn>
      </div>
    </div>
  );
};

export default AuthOptimized;
