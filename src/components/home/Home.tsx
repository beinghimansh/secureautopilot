
import React, { useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import Header from './Header';
import { useAuth } from '@/contexts/AuthContext';

// Create a lightweight loading component for Suspense
const ComponentSkeleton = () => (
  <div className="w-full h-48 animate-pulse bg-gray-800 rounded-lg"></div>
);

// Lazily load less critical components
const FeatureHighlights = React.lazy(() => import('./FeatureHighlights'));
const SocialProof = React.lazy(() => import('./SocialProof'));
const FeaturesSection = React.lazy(() => import('./FeaturesSection'));
const CTASection = React.lazy(() => import('./CTASection'));
const Footer = React.lazy(() => import('./Footer'));

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
    
    // Prefetch critical resources
    const prefetchLinks = [
      { href: '/auth?mode=register', as: 'document' },
      { href: '/compliance', as: 'document' }
    ];
    
    prefetchLinks.forEach(({ href, as }) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = href;
      link.as = as;
      document.head.appendChild(link);
    });
    
    // Preload images
    const preloadImage = (src: string) => {
      const img = new Image();
      img.src = src;
    };
    
    preloadImage('/lovable-uploads/400fcdce-b265-46c4-a1fc-c2ad19c2c12a.png');
    
    // Cleanup function to remove dark theme class when component unmounts
    return () => {
      document.body.classList.remove('dark-theme');
    };
  }, [user]);

  return (
    <motion.div 
      className="min-h-screen overflow-x-hidden bg-[#111]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Header />
      
      <main className="pt-20">
        {/* Always render the Hero section for fast initial load */}
        <HeroSection />
        
        {/* Lazily load the rest of the components */}
        <div className="container mx-auto px-4 md:px-6">
          <Suspense fallback={<ComponentSkeleton />}>
            <FeatureHighlights />
          </Suspense>
        </div>
        
        <Suspense fallback={<ComponentSkeleton />}>
          <SocialProof />
        </Suspense>
        
        <Suspense fallback={<ComponentSkeleton />}>
          <FeaturesSection />
        </Suspense>
        
        <Suspense fallback={<ComponentSkeleton />}>
          <CTASection />
        </Suspense>
      </main>
      
      <Suspense fallback={<ComponentSkeleton />}>
        <Footer />
      </Suspense>
    </motion.div>
  );
};

export default Home;
