
import React, { useEffect, lazy, Suspense } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Loading from '@/components/common/Loading';

// Lazy loaded components to improve performance
const Header = lazy(() => import('./Header'));
const HeroSection = lazy(() => import('./HeroSection'));
const FeatureHighlights = lazy(() => import('./FeatureHighlights'));
const CTASection = lazy(() => import('./CTASection'));
const Footer = lazy(() => import('./Footer'));

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

  // Performance optimization - if user is logged in, show minimal home page
  if (user) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-[#111]">
        <Suspense fallback={<Loading />}>
          <Header />
          <main className="pt-20">
            <HeroSection />
          </main>
          <Footer />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#111]">
      <Suspense fallback={<Loading />}>
        <Header />
        <main className="pt-20">
          <HeroSection />
          <FeatureHighlights />
          <CTASection />
        </main>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Home;
