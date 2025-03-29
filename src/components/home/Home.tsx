
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from './Header';
import HeroSection from './HeroSection';
import FeatureHighlights from './FeatureHighlights';
import CTASection from './CTASection';
import Footer from './Footer';
import TrustedBySection from './TrustedBySection';
import ComplianceFrameworks from './ComplianceFrameworks';
import MessageCarousel from './MessageCarousel';

const Home = () => {
  const { user } = useAuth();

  // Reorganized component order as per requirements
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111]">
      <Header />
      <main>
        <HeroSection />
        <ComplianceFrameworks />
        <TrustedBySection />
        <FeatureHighlights />
        <MessageCarousel />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
