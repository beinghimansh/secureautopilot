
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Settings, User, Menu, X } from 'lucide-react';
import Button from '../common/Button';
import { FadeIn } from '../common/Transitions';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isLoggedIn = location.pathname !== '/'; // Simple check for demo
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-lg">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center">
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center mr-6">
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
          
          {isLoggedIn && (
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
            </nav>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell size={20} className="text-gray-600" />
              </button>
              <Link to="/settings" className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Settings size={20} className="text-gray-600" />
              </Link>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User size={16} className="text-gray-600" />
              </div>
              <button 
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={toggleMenu}
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </>
          ) : (
            <>
              <Link to="/">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
              <Link to="/">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && isLoggedIn && (
        <FadeIn className="md:hidden">
          <nav className="flex flex-col space-y-4 px-4 py-4 bg-white border-t border-gray-100">
            <Link 
              to="/dashboard" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/dashboard' ? 'text-primary' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              to="/compliance" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/compliance' ? 'text-primary' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Compliance
            </Link>
            <Link 
              to="/tasks" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/tasks' ? 'text-primary' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tasks
            </Link>
            <Link 
              to="/settings" 
              className={`text-sm font-medium transition-colors hover:text-primary ${location.pathname === '/settings' ? 'text-primary' : 'text-gray-600'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Settings
            </Link>
          </nav>
        </FadeIn>
      )}
    </header>
  );
};

export default Navbar;
