
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import Button from '@/components/common/Button';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center mr-3">
            <Shield size={24} className="text-white" />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
            ComplyFlow
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/auth?mode=login" className="text-gray-600 hover:text-primary transition-colors">
            Sign In
          </Link>
          <Link to="/auth?mode=register">
            <Button>Sign Up Free</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
