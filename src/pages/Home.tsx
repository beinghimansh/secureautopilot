
import React, { useEffect, lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import Loading from '@/components/common/Loading';

// Lazy load components for better performance
const Header = lazy(() => import('@/components/home/Header'));
const HeroSection = lazy(() => import('@/components/home/HeroSection'));
const FeatureHighlights = lazy(() => import('@/components/home/FeatureHighlights'));
const SocialProof = lazy(() => import('@/components/home/SocialProof'));
const FeaturesSection = lazy(() => import('@/components/home/FeaturesSection'));
const CTASection = lazy(() => import('@/components/home/CTASection'));
const Footer = lazy(() => import('@/components/home/Footer'));

// Create a fallback component
const ComponentFallback = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const Home = () => {
  // Scroll to top on component mount for better UX
  useEffect(() => {
    window.scrollTo(0, 0);
    // Add console log to debug rendering
    console.log('Home page rendered');

    // Prefetch other components
    const prefetchData = async () => {
      try {
        // We can use Promise.all to fetch multiple components in parallel
        await Promise.all([
          import('@/components/home/FeatureHighlights'),
          import('@/components/home/SocialProof'),
          import('@/components/home/FeaturesSection')
        ]);
      } catch (error) {
        console.error('Failed to prefetch components:', error);
      }
    };

    // Start prefetching after the initial render
    setTimeout(prefetchData, 100);
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-blue-50 to-white overflow-x-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Suspense fallback={<ComponentFallback />}>
        <Header />
      </Suspense>
      
      <main>
        <Suspense fallback={<ComponentFallback />}>
          <HeroSection />
        </Suspense>
        
        <div className="container mx-auto px-4 md:px-6">
          <Suspense fallback={<ComponentFallback />}>
            <FeatureHighlights />
          </Suspense>
        </div>
        
        <Suspense fallback={<ComponentFallback />}>
          <SocialProof />
        </Suspense>
        
        <Suspense fallback={<ComponentFallback />}>
          <FeaturesSection />
        </Suspense>
        
        <Suspense fallback={<ComponentFallback />}>
          <CTASection />
        </Suspense>
      </main>
      
      <Suspense fallback={<ComponentFallback />}>
        <Footer />
      </Suspense>
    </motion.div>
  );
};

export default Home;
