
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { ArrowRight, Shield } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();
  const [activeFrameworkIndex, setActiveFrameworkIndex] = useState(0);

  // Define animations with subtle effects
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  const complianceFrameworks = [
    { name: "ISO 27001", description: "Information Security Management", color: "from-blue-600 to-cyan-400" },
    { name: "SOC 2", description: "Service Organization Controls", color: "from-purple-600 to-pink-400" },
    { name: "GDPR", description: "Data Protection Regulation", color: "from-green-600 to-teal-400" },
    { name: "HIPAA", description: "Health Information Privacy", color: "from-orange-600 to-amber-400" },
    { name: "PCI DSS", description: "Payment Card Security", color: "from-red-600 to-rose-400" },
    { name: "ISO 42001", description: "Artificial Intelligence Management", color: "from-indigo-600 to-violet-400" },
    { name: "NIST CSF", description: "Cybersecurity Framework", color: "from-yellow-600 to-amber-500" },
    { name: "CCPA", description: "Consumer Privacy Act", color: "from-emerald-600 to-green-400" },
    { name: "ISO 9001", description: "Quality Management System", color: "from-sky-600 to-blue-400" }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFrameworkIndex((prevIndex) => 
        prevIndex === complianceFrameworks.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, [complianceFrameworks.length]);

  // Calculate visible frameworks for the carousel
  const getVisibleFrameworks = () => {
    // Display all 9 frameworks in a 3x3 grid or fewer based on screen size
    return complianceFrameworks;
  };

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      {/* Dark gradient background */}
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
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                ComplyAI
              </span>
              <span className="block mt-2 text-2xl md:text-3xl lg:text-4xl text-gray-300">
                Compliance Simplified
              </span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-lg text-gray-400 mb-8"
            initial={fadeIn.initial}
            animate={fadeIn.animate}
            transition={{ ...fadeIn.transition, delay: 0.2 }}
          >
            Streamline regulatory compliance with AI-powered policy generation, 
            automated controls mapping, and continuous monitoring across 
            ISO 27001, SOC 2, GDPR, HIPAA, and more.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center"
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
        
        {/* Framework cards carousel */}
        <div className="relative max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex justify-between items-center mb-4"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-white text-center w-full">
              Supported Compliance Frameworks
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getVisibleFrameworks().map((framework, index) => (
              <motion.div
                key={`${framework.name}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                className={`bg-gradient-to-br ${framework.color} p-6 rounded-xl border border-gray-700 hover:border-white/50 hover:shadow-lg hover:shadow-white/10 transition-all duration-300 h-full flex flex-col`}
                onClick={() => navigate('/compliance')}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">{framework.name}</h3>
                </div>
                <p className="text-white/90 mb-3 flex-grow">{framework.description}</p>
                <div className="text-white text-sm flex items-center hover:text-white/80 transition-colors mt-auto">
                  Explore requirements
                  <ArrowRight className="ml-1 h-3 w-3" />
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Mobile Carousel Indicators */}
          <div className="flex justify-center mt-4 md:hidden">
            {complianceFrameworks.map((_, idx) => (
              <button
                key={idx}
                className={`h-2 w-2 mx-1 rounded-full ${
                  idx === activeFrameworkIndex ? 'bg-blue-500' : 'bg-gray-600'
                }`}
                onClick={() => setActiveFrameworkIndex(idx)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
