
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import HeroSection from './HeroSection';
import FeatureHighlights from './FeatureHighlights';
import CTASection from './CTASection';
import Footer from './Footer';

const Home = () => {
  const { user } = useAuth();

  // Simplified component without unnecessary effects and transitions for faster rendering
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
