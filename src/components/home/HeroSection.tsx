
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20 xl:py-24">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-80"></div>
      
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Automate Your Compliance
              </span>{' '}
              With AI-Powered Solutions
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-3xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Streamline regulatory compliance with smart policy generation, 
            automated controls mapping, and continuous monitoring across 
            ISO 27001, SOC 2, GDPR, HIPAA, and more.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button 
              size="lg"
              onClick={() => navigate('/auth?mode=register')}
              className="px-8 py-3 text-lg shadow-lg hover:shadow-xl"
            >
              Get Started
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/compliance')}
              className="px-8 py-3 text-lg"
            >
              View Frameworks
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          className="mt-12 md:mt-16 w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="relative bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5"></div>
            <img 
              src="/lovable-uploads/400fcdce-b265-46c4-a1fc-c2ad19c2c12a.png" 
              alt="ComplyFlow Dashboard" 
              className="w-full h-full object-cover relative z-10"
              loading="eager"
              // Remove fetchPriority as it's causing a warning
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
