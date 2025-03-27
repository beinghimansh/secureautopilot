
import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckSquare, BarChart, FileText, Users, Zap } from 'lucide-react';
import Button from '@/components/common/Button';
import Navbar from '@/components/layout/Navbar';
import { FadeIn, SlideUp } from '@/components/common/Transitions';
import AuthForm from '@/components/auth/AuthForm';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 z-0"></div>
          <div className="container px-4 sm:px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <FadeIn className="text-center lg:text-left">
                <SlideUp>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    AI-Powered Compliance Management
                  </span>
                </SlideUp>
                <SlideUp delay={100}>
                  <h1 className="mt-4 text-4xl md:text-5xl font-bold leading-tight text-gray-900">
                    Simplify Compliance Management with AI
                  </h1>
                </SlideUp>
                <SlideUp delay={200}>
                  <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                    Automate ISO 27001, SOC 2, GDPR, and HIPAA compliance with our no-code platform. Generate policies, manage tasks, and stay audit-ready.
                  </p>
                </SlideUp>
                <SlideUp delay={300}>
                  <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link to="/">
                      <Button size="lg">
                        Get Started Free
                      </Button>
                    </Link>
                    <Link to="/">
                      <Button variant="outline" size="lg">
                        Schedule Demo
                      </Button>
                    </Link>
                  </div>
                </SlideUp>
                <SlideUp delay={400}>
                  <p className="mt-6 text-sm text-gray-500">
                    No credit card required. Free plan includes basic compliance tools.
                  </p>
                </SlideUp>
              </FadeIn>
              
              <div className="lg:pl-10">
                <FadeIn delay={300}>
                  <div className="bg-white rounded-xl shadow-premium-xl border border-gray-100 overflow-hidden">
                    <div className="p-6">
                      <AuthForm />
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 sm:px-6">
            <div className="text-center mb-16">
              <FadeIn>
                <h2 className="text-3xl font-bold text-gray-900">Why Choose ComplyFlow</h2>
                <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                  Our platform simplifies compliance management with powerful AI-driven tools and automation
                </p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-primary" />,
                  title: 'AI-Generated Policies',
                  description: 'Automatically generate custom security policies tailored to your business and compliance needs.'
                },
                {
                  icon: <CheckSquare className="h-8 w-8 text-primary" />,
                  title: 'Task Automation',
                  description: 'Assign, track, and automate compliance tasks across your organization with ease.'
                },
                {
                  icon: <BarChart className="h-8 w-8 text-primary" />,
                  title: 'Compliance Dashboard',
                  description: 'Real-time visibility into your compliance posture with intuitive analytics and reporting.'
                },
                {
                  icon: <FileText className="h-8 w-8 text-primary" />,
                  title: 'Audit-Ready Reports',
                  description: 'Generate comprehensive compliance reports ready for auditors with one click.'
                },
                {
                  icon: <Users className="h-8 w-8 text-primary" />,
                  title: 'Role-Based Access',
                  description: 'Granular permissions for admins, compliance officers, employees, and auditors.'
                },
                {
                  icon: <Zap className="h-8 w-8 text-primary" />,
                  title: 'Seamless Integrations',
                  description: 'Connect with your existing tools including Slack, Jira, AWS, and GCP.'
                }
              ].map((feature, index) => (
                <FadeIn key={index} delay={100 * index}>
                  <div className="bg-white border border-gray-100 rounded-lg p-6 hover:shadow-premium-md transition-all duration-300 h-full">
                    <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-primary/5">
          <div className="container px-4 sm:px-6">
            <div className="bg-white rounded-2xl shadow-premium-lg border border-gray-100 p-8 md:p-12 text-center">
              <FadeIn>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Ready to Simplify Your Compliance Journey?
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                  Join thousands of companies using ComplyFlow to automate compliance and stay secure.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link to="/">
                    <Button size="lg">
                      Start Free Trial
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button variant="outline" size="lg">
                      See Pricing
                    </Button>
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="container px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center mr-2">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
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
              <p className="text-gray-500 mb-4">
                AI-powered compliance management for startups and growing businesses.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-primary">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Product</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-primary">Features</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Pricing</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Security</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Integrations</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Compliance Frameworks</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-primary">Documentation</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Guides</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Blog</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Support</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Company</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-500 hover:text-primary">About</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Careers</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Legal</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Privacy</a></li>
                <li><a href="#" className="text-gray-500 hover:text-primary">Contact</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} ComplyFlow. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-sm text-gray-500 hover:text-primary">Privacy Policy</a>
              <a href="#" className="text-sm text-gray-500 hover:text-primary">Terms of Service</a>
              <a href="#" className="text-sm text-gray-500 hover:text-primary">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
