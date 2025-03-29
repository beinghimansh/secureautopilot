
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TrustedBySection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Updated companies with their actual logos
  const companies = [
    { name: "Lovable", logo: "/lovable-uploads/cbef0aa7-95c6-496d-abea-c166b9b5d671.png" },
    { name: "Anthropic", logo: "/lovable-uploads/b82d4ddd-fd36-4351-8525-73a13622172e.png" },
    { name: "Supabase", logo: "/lovable-uploads/a7d3c7b1-1a44-4be2-a9cd-6293dd730b01.png" },
    { name: "Sentry", logo: "/lovable-uploads/7b834d06-0777-4c52-ba5b-410d3ee4edaf.png" },
    { name: "ElevenLabs", logo: "/lovable-uploads/64f07aad-11b3-444c-9c93-17c0285a1585.png" },
    { name: "EQT Ventures", logo: "/lovable-uploads/90284a2c-e980-47c3-bbd2-6ccc022d722f.png" },
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
                className="flex-shrink-0 flex flex-col items-center justify-center h-20 w-44 grayscale hover:grayscale-0 transition-all duration-300"
              >
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`} 
                  className="h-12 object-contain mb-2"
                />
                <p className="text-gray-400 text-sm font-medium">{company.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBySection;
