
import { lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Simple loading component
const LoadingIndicator = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
  console.log("Initializing application");
  createRoot(rootElement).render(
    <Suspense fallback={<LoadingIndicator />}>
      <App />
    </Suspense>
  );
}
