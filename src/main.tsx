
import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Simple loading component with improved aesthetics
const LoadingIndicator = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
    <p className="text-gray-700 font-medium">Loading application...</p>
  </div>
);

// Use lazy loading to improve initial load performance
const App = lazy(() => import('./App'));

// Get the root element
const rootElement = document.getElementById("root");

// Check if the root element exists
if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  // Initialize with a performance marker
  const startTime = performance.now();
  
  console.log("Initializing application");
  
  // Use createRoot for concurrent mode
  createRoot(rootElement).render(
    <Suspense fallback={<LoadingIndicator />}>
      <App />
    </Suspense>
  );
  
  // Log performance timing
  window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    console.log(`Application loaded in ${loadTime.toFixed(2)}ms`);
  });
}
