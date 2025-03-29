
import { lazy, Suspense, StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Advanced LoadingIndicator with progress estimation
const LoadingIndicator = () => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    // Simulated loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Asymptotic progress increases quickly at first, then slows down
        const increment = Math.max(1, 10 * (1 - prev / 100));
        const newProgress = Math.min(99, prev + increment);
        return newProgress;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-[#111]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">Loading ComplyAI...</p>
      <div className="w-64 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-blue-600 transition-all duration-200 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

// Implement code splitting with dynamic imports and prefetching
const App = lazy(() => {
  // Preload critical paths
  const preloadLinks = [
    { href: '/auth?mode=login', as: 'document' },
    { href: '/auth?mode=register', as: 'document' },
    { href: '/dashboard', as: 'document' }
  ];
  
  preloadLinks.forEach(({ href, as }) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = href;
    link.as = as;
    document.head.appendChild(link);
  });
  
  // Preload critical images
  const preloadImages = ['/lovable-uploads/7b834d06-0777-4c52-ba5b-410d3ee4edaf.png'];
  
  preloadImages.forEach((src) => {
    const img = new Image();
    img.src = src;
  });
  
  // Return the import
  return import('./App').then(module => {
    // Log performance after module is loaded
    const loadTime = performance.now();
    console.log(`App module loaded in ${loadTime.toFixed(2)}ms`);
    return module;
  });
});

// Get the root element
const rootElement = document.getElementById("root");

// Check if the root element exists
if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  // Initialize with a performance marker
  const startTime = performance.now();
  
  console.log("Initializing application");
  
  // Use createRoot and StrictMode for better development experience
  createRoot(rootElement).render(
    <StrictMode>
      <Suspense fallback={<LoadingIndicator />}>
        <App />
      </Suspense>
    </StrictMode>
  );
  
  // Log performance timing
  window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    console.log(`Application loaded in ${loadTime.toFixed(2)}ms`);
    
    // Implement performance monitoring
    if ('performance' in window && 'getEntriesByType' in performance) {
      const navigationEntries = performance.getEntriesByType('navigation');
      if (navigationEntries.length > 0) {
        const navTiming = navigationEntries[0] as PerformanceNavigationTiming;
        console.log(`DOM Content Loaded: ${navTiming.domContentLoadedEventEnd}ms`);
        console.log(`First Contentful Paint: ${performance.getEntriesByName('first-contentful-paint')[0]?.startTime || 'N/A'}ms`);
      }
    }
  });
}
