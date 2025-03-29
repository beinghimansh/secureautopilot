
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Button from '@/components/common/Button';
import { ArrowRight, Shield, Lock, CheckCircle, FileText } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  // Define animations with subtle effects
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  };

  const complianceFrameworks = [
    { name: "ISO 27001", description: "Information Security Management" },
    { name: "SOC 2", description: "Service Organization Controls" },
    { name: "GDPR", description: "Data Protection Regulation" },
    { name: "HIPAA", description: "Health Information Privacy" },
    { name: "PCI DSS", description: "Payment Card Security" }
  ];

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
        
        {/* Framework cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {complianceFrameworks.map((framework, index) => (
            <motion.div
              key={framework.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              onClick={() => navigate('/compliance')}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">{framework.name}</h3>
              </div>
              <p className="text-gray-400 mb-3">{framework.description}</p>
              <a className="text-blue-400 text-sm flex items-center hover:text-blue-300 transition-colors">
                Explore requirements
                <ArrowRight className="ml-1 h-3 w-3" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
