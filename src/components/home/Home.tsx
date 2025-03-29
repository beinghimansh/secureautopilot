
import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import FeatureHighlights from './FeatureHighlights';
import FeaturesSection from './FeaturesSection';
import CTASection from './CTASection';
import SocialProof from './SocialProof';
import Footer from './Footer';

const Home = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <HeroSection />
        <FeatureHighlights />
        <FeaturesSection />
        <SocialProof />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
