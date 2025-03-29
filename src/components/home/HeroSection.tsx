
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  // Define animations with subtle effects for modern Apple-like feel
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      {/* Dark gradient background with subtle Apple-like colors */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#1d1d1f]"></div>
      
      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }}
      ></div>
      
      {/* Glow effect */}
      <div className="absolute top-1/3 left-1/4 w-3/4 h-1/2 bg-blue-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/3 right-1/4 w-2/3 h-1/2 bg-purple-500/20 blur-[120px] rounded-full"></div>
      
      <div className="relative container mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                ComplyAI
              </span>
              <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl text-gray-300">
                Compliance Simplified
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-400 mb-8 max-w-3xl"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
          >
            Streamline regulatory compliance with AI-powered policy generation, 
            automated controls mapping, and continuous monitoring across 
            ISO 27001, SOC 2, GDPR, HIPAA, and more.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition, delay: 0.3 }}
          >
            <Button 
              size="lg"
              onClick={() => navigate('/auth?mode=register')}
              className="px-8 py-3 text-lg shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/compliance')}
              className="px-8 py-3 text-lg border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 bg-transparent"
            >
              View Frameworks
            </Button>
          </motion.div>
        </div>
        
        <motion.div
          className="mt-16 w-full max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10"></div>
            
            {/* App window mockup with macOS-style header */}
            <div className="bg-[#1e1e1e] border-b border-gray-800 flex items-center p-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-400">ComplyAI Dashboard</span>
              </div>
            </div>
            
            {/* Use static dashboard image instead of dynamic component that causes errors */}
            <img 
              src="/lovable-uploads/7b834d06-0777-4c52-ba5b-410d3ee4edaf.png" 
              alt="ComplyAI Dashboard" 
              className="w-full object-cover"
              loading="eager"
            />
            
            {/* Reflection effect */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#111] to-transparent"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
