
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';

// Get the root element
const rootElement = document.getElementById("root");

// Check if the root element exists
if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  // Initialize with a performance marker
  const startTime = performance.now();
  
  console.log("Initializing application");
  
  // Use createRoot for better performance
  createRoot(rootElement).render(<App />);
  
  // Log performance timing
  window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    console.log(`Application loaded in ${loadTime.toFixed(2)}ms`);
  });
}
