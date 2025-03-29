
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';
import { useAuth } from '@/contexts/AuthContext';

// Simplified hero section with static content
const SimplifiedHero = () => (
  <section className="py-16 md:py-24 px-6">
    <div className="container mx-auto text-center max-w-5xl">
      <motion.h1 
        className="text-4xl md:text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Compliance Management Made Simple
      </motion.h1>
      <motion.p 
        className="text-xl text-gray-400 mb-10 max-w-3xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Automate your compliance journey with AI-powered policy generation and smart compliance management for ISO 27001, SOC 2, GDPR, HIPAA, and more.
      </motion.p>
      <motion.div
        className="mx-auto max-w-screen-lg mt-10"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-1 rounded-2xl">
          <img 
            src="/lovable-uploads/d90e2742-96a5-46ac-8750-82f4027140c0.png" 
            alt="ComplyAI Dashboard" 
            className="w-full h-auto rounded-2xl shadow-2xl"
          />
        </div>
      </motion.div>
    </div>
  </section>
);

// Footer component
const SimpleFooter = () => (
  <footer className="bg-[#0a0a0a] text-gray-400 py-10">
    <div className="container mx-auto px-6 text-center">
      <p>© {new Date().getFullYear()} ComplyAI. All rights reserved.</p>
    </div>
  </footer>
);

const Home = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    // Apply dark theme to body when on public landing page
    if (!user) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Cleanup function to remove dark theme class when component unmounts
    return () => {
      document.body.classList.remove('dark-theme');
    };
  }, [user]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111]">
      <Header />
      
      <main className="pt-20">
        <SimplifiedHero />
      </main>
      
      <SimpleFooter />
    </div>
  );
};

export default Home;
