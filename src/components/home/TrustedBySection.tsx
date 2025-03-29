
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TrustedBySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Companies with their logos
  const companies = [
    { name: "MixMove", logo: "/lovable-uploads/529f422f-a807-4ca3-ace2-724504a1dd7f.png" },
    { name: "Visor AI", logo: "/lovable-uploads/529f422f-a807-4ca3-ace2-724504a1dd7f.png" },
    { name: "Kranus Health", logo: "/lovable-uploads/529f422f-a807-4ca3-ace2-724504a1dd7f.png" },
    { name: "WorkMotion", logo: "/lovable-uploads/529f422f-a807-4ca3-ace2-724504a1dd7f.png" },
    { name: "Velaris", logo: "/lovable-uploads/529f422f-a807-4ca3-ace2-724504a1dd7f.png" },
    { name: "GolfManager", logo: "/lovable-uploads/529f422f-a807-4ca3-ace2-724504a1dd7f.png" },
    { name: "TechFlow", logo: "/lovable-uploads/529f422f-a807-4ca3-ace2-724504a1dd7f.png" },
    { name: "DataSphere", logo: "/lovable-uploads/529f422f-a807-4ca3-ace2-724504a1dd7f.png" },
  ];
  
  // Automatic scrolling effect
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;
    
    let animationId: number;
    let scrollAmount = 0;
    const speed = 0.5; // Adjust speed as needed
    
    const scroll = () => {
      if (!scrollContainer) return;
      
      scrollAmount += speed;
      
      // Reset scroll position when it reaches the end to create infinite scroll effect
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        scrollAmount = 0;
      }
      
      scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
      animationId = requestAnimationFrame(scroll);
    };
    
    animationId = requestAnimationFrame(scroll);
    
    // Pause animation on hover
    const handleMouseEnter = () => cancelAnimationFrame(animationId);
    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(scroll);
    };
    
    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <section className="bg-gradient-to-r from-gray-900 to-black py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Trusted by hundreds of Startups and SMBs
        </motion.h2>
        
        <div className="relative overflow-hidden w-full">
          {/* First row of logos that will scroll */}
          <div className="flex space-x-12 py-4" ref={scrollRef}>
            {/* Duplicate the array to create seamless loop */}
            {[...companies, ...companies].map((company, index) => (
              <div 
                key={`${company.name}-${index}`} 
                className="flex-shrink-0 flex items-center justify-center h-12 w-36 grayscale hover:grayscale-0 transition-all duration-300"
              >
                {company.logo ? (
                  <img 
                    src={company.logo} 
                    alt={`${company.name} logo`} 
                    className="h-full object-contain"
                  />
                ) : (
                  <div className="text-xl font-bold text-gray-300">{company.name}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
