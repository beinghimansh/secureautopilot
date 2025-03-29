
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import Header from './Header';
import FeatureHighlights from './FeatureHighlights';
import CTASection from './CTASection';
import Footer from './Footer';

const Home = () => {
  useEffect(() => {
    // Apply dark theme to body when on public landing page
    document.body.classList.add('dark-theme');
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Cleanup function to remove dark theme class when component unmounts
    return () => {
      document.body.classList.remove('dark-theme');
    };
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111]">
      <Header />
      
      <main className="pt-20">
        <HeroSection />
        
        <div className="container mx-auto px-4 md:px-6">
          <FeatureHighlights />
        </div>
        
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
