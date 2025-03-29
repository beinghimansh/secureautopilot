
import React, { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import HeroSection from './HeroSection';
import FeatureHighlights from './FeatureHighlights';
import CTASection from './CTASection';
import Footer from './Footer';

const Home = () => {
  const { user } = useAuth();

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

  // Performance optimization - show the same layout for all users
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111]">
      <Header />
      <main>
        <HeroSection />
        <FeatureHighlights />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
