
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Shield, FileText, Lock } from 'lucide-react';
import Button from '@/components/common/Button';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 animate-fade-in">
            Compliance Management Made Simple
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: "200ms"}}>
            Automate your compliance journey with AI-powered policy generation and smart compliance management for ISO 27001, SOC 2, GDPR, HIPAA, and more.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{animationDelay: "400ms"}}>
            <Link to="/auth?mode=register">
              <Button size="lg" className="px-8 py-3 text-lg">
                Get Started Free
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                View Demo
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-50 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style={{animationDelay: "600ms"}}>
              <div className="mb-4 bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center">
                <Shield size={24} className="text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Multiple Frameworks</h3>
              <p className="text-gray-600">Support for ISO 27001, SOC 2, HIPAA, GDPR, and PCI DSS compliance frameworks.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-50 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style={{animationDelay: "700ms"}}>
              <div className="mb-4 bg-green-50 w-12 h-12 rounded-full flex items-center justify-center">
                <FileText size={24} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Policy Generator</h3>
              <p className="text-gray-600">Generate compliant policies in minutes with our advanced AI assistant.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-50 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style={{animationDelay: "800ms"}}>
              <div className="mb-4 bg-purple-50 w-12 h-12 rounded-full flex items-center justify-center">
                <CheckCircle size={24} className="text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Evidence Collection</h3>
              <p className="text-gray-600">Streamline your evidence collection and documentation in one secure place.</p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-50 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in" style={{animationDelay: "900ms"}}>
              <div className="mb-4 bg-orange-50 w-12 h-12 rounded-full flex items-center justify-center">
                <Lock size={24} className="text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Risk Management</h3>
              <p className="text-gray-600">Identify, assess, and mitigate risks with our comprehensive risk register.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Trusted by Companies Worldwide</h2>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-70">
            {/* Replace with actual logos */}
            {["ACME Inc", "TechCorp", "FinanceEX", "HealthPlus", "RetailGo"].map((company, index) => (
              <div key={index} className="text-xl font-bold text-gray-400">{company}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need for Compliance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools you need to achieve and maintain compliance with multiple frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-blue-50">
              <h3 className="text-2xl font-semibold mb-4">AI-Powered Policy Creation</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Auto-generate policies tailored to your organization</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Framework-specific requirements automatically incorporated</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Save hours of manual policy writing</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-purple-50">
              <h3 className="text-2xl font-semibold mb-4">Comprehensive Dashboard</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Real-time compliance status overview</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Track progress across all compliance frameworks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Actionable insights to improve compliance posture</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-green-50">
              <h3 className="text-2xl font-semibold mb-4">Task Management</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Assign and track compliance tasks</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Automated reminders for upcoming deadlines</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Streamlined workflow for evidence collection</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl border border-gray-100 bg-gradient-to-br from-white to-orange-50">
              <h3 className="text-2xl font-semibold mb-4">Audit Readiness</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Centralized evidence repository</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Generate audit-ready reports with one click</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={20} className="text-green-600 mr-2 flex-shrink-0 mt-1" />
                  <span>Demonstrate compliance with confidence</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Simplify Your Compliance Journey?</h2>
          <p className="text-xl mb-10 opacity-90">
            Join thousands of organizations that trust ComplyFlow for their compliance needs.
          </p>
          <Link to="/auth?mode=register">
            <Button variant="secondary" size="lg" className="px-8 py-3 text-lg">
              Start Your Free Trial
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center mr-3">
                  <Shield size={24} className="text-white" />
                </div>
                <span className="text-2xl font-bold text-white">ComplyFlow</span>
              </div>
              <p className="text-gray-400 mb-4">
                Simplifying compliance for businesses worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Testimonials</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p>© {new Date().getFullYear()} ComplyFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
