
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ChevronRight, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#0d0d0d] text-gray-400 pt-16 pb-8 border-t border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-6">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mr-3">
                <Shield size={22} className="text-white" />
              </div>
              <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                ComplyAI
              </span>
            </div>
            <p className="text-gray-500 mb-6 max-w-md">
              Simplifying compliance for businesses worldwide with AI-powered tools and automated workflows.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-400 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-blue-500 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-white transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/features" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  About
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  Customers
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  Support
                </Link>
              </li>
              <li>
                <Link to="/security" className="hover:text-white transition-colors inline-flex items-center">
                  <ChevronRight size={14} className="mr-1 text-blue-500" />
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p>© {currentYear} ComplyAI. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link to="/about" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/about" className="hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
