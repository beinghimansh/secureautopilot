
import React, { useEffect } from 'react';
import Header from '@/components/home/Header';
import HeroSection from '@/components/home/HeroSection';
import FeatureHighlights from '@/components/home/FeatureHighlights';
import SocialProof from '@/components/home/SocialProof';
import FeaturesSection from '@/components/home/FeaturesSection';
import CTASection from '@/components/home/CTASection';
import Footer from '@/components/home/Footer';

const Home = () => {
  // Scroll to top on component mount for better UX
  useEffect(() => {
    window.scrollTo(0, 0);
    // Add console log to debug rendering
    console.log('Home page rendered');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-x-hidden">
      <Header />
      
      <main>
        <HeroSection />
        <div className="container mx-auto px-4 md:px-6">
          <FeatureHighlights />
        </div>
        <SocialProof />
        <FeaturesSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
