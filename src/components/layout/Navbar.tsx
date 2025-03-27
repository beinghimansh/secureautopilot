
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Bell, Settings, User, Menu, X } from 'lucide-react';
import Button from '../common/Button';
import { FadeIn } from '../common/Transitions';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const { user, profile, signOut } = useAuth();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Successfully signed out');
      navigate('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
      toast.error('Failed to sign out. Please try again.');
    }
  };

  useEffect(() => {
    // Close mobile menu when navigating to a new page
    setIsMenuOpen(false);
  }, [location.pathname]);
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link to={user ? "/dashboard" : "/"} className="flex items-center mr-6">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="text-white"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                </svg>
              </div>
              <span className="text-xl font-medium tracking-tight text-gray-900">ComplyFlow</span>
            </div>
          </Link>
          
          {user && (
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/dashboard" 
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/dashboard' ? 'text-primary' : 'text-gray-600'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/compliance" 
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/compliance' ? 'text-primary' : 'text-gray-600'}`}
              >
                Compliance
              </Link>
              <Link 
                to="/tasks" 
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/tasks' ? 'text-primary' : 'text-gray-600'}`}
              >
                Tasks
              </Link>
              <Link 
                to="/policies" 
                className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/policies' ? 'text-primary' : 'text-gray-600'}`}
              >
                Policies
              </Link>
            </nav>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {user ? (
            <>
              <Link to="/notifications" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-600" />
              </Link>
              <Link to="/settings" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </Link>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              <button 
                onClick={handleSignOut}
                className="hidden md:inline-flex px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors"
              >
                Sign Out
              </button>
              <button 
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </>
          ) : (
            <>
              <Link to="/auth">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && user && (
        <FadeIn className="md:hidden">
          <nav className="flex flex-col space-y-4 px-4 py-4 bg-white border-t border-gray-100">
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/dashboard' ? 'text-primary' : 'text-gray-600'}`}
            >
              Dashboard
            </Link>
            <Link 
              to="/compliance" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/compliance' ? 'text-primary' : 'text-gray-600'}`}
            >
              Compliance
            </Link>
            <Link 
              to="/tasks" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/tasks' ? 'text-primary' : 'text-gray-600'}`}
            >
              Tasks
            </Link>
            <Link 
              to="/policies" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/policies' ? 'text-primary' : 'text-gray-600'}`}
            >
              Policies
            </Link>
            <Link 
              to="/settings" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/settings' ? 'text-primary' : 'text-gray-600'}`}
            >
              Settings
            </Link>
            <button 
              onClick={handleSignOut}
              className="text-sm font-medium text-red-600 hover:text-red-800 text-left"
            >
              Sign Out
            </button>
          </nav>
        </FadeIn>
      )}
    </header>
  );
};

export default Navbar;
