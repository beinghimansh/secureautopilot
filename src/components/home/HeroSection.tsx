
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
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  };

  const features = [
    { icon: <Shield className="text-blue-500" size={24} />, text: "Automated Compliance Frameworks" },
    { icon: <Lock className="text-blue-500" size={24} />, text: "Secure Documentation Management" },
    { icon: <CheckCircle className="text-blue-500" size={24} />, text: "AI-Powered Policy Generation" },
    { icon: <FileText className="text-blue-500" size={24} />, text: "Seamless Control Implementation" }
  ];

  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
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
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
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
              className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto md:mx-0"
              initial={fadeIn.initial}
              animate={fadeIn.animate}
              transition={{ ...fadeIn.transition, delay: 0.2 }}
            >
              Streamline regulatory compliance with AI-powered policy generation, 
              automated controls mapping, and continuous monitoring across 
              ISO 27001, SOC 2, GDPR, HIPAA, and more.
            </motion.p>
            
            <motion.div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start"
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
                onClick={() => navigate('/auth?mode=register')}
                className="px-8 py-3 text-lg border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 bg-transparent"
              >
                View Frameworks
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-xl"></div>
              
              <div className="relative bg-black/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 shadow-2xl">
                <img 
                  src="/lovable-uploads/64f07aad-11b3-444c-9c93-17c0285a1585.png" 
                  alt="ComplyAI Dashboard Preview" 
                  className="w-full rounded-lg shadow-lg border border-gray-700"
                />
                
                <div className="mt-8 grid grid-cols-2 gap-4">
                  {features.map((feature, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-start p-3 bg-gray-900/50 backdrop-blur-sm rounded-lg border border-gray-800"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                    >
                      <div className="mr-3 p-2 bg-gray-800 rounded-md">
                        {feature.icon}
                      </div>
                      <p className="text-sm text-gray-300">{feature.text}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
