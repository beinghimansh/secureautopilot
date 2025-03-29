
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Button from '@/components/common/Button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 px-6">
      <div className="container mx-auto text-center max-w-5xl">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700"
        >
          Compliance Management Made Simple
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto"
        >
          Automate your compliance journey with AI-powered policy generation and smart compliance management for ISO 27001, SOC 2, GDPR, HIPAA, and more.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/auth?mode=register">
            <Button size="lg" className="px-8 py-3 text-lg w-full sm:w-auto">
              Get Started Free
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg w-full sm:w-auto">
              View Demo
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
