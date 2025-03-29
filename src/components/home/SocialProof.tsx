
import React from 'react';
import { motion } from 'framer-motion';

const SocialProof = () => {
  // Using more professional company names
  const companies = [
    { name: "Microsoft", logo: "/lovable-uploads/400fcdce-b265-46c4-a1fc-c2ad19c2c12a.png" },
    { name: "Amazon", logo: null },
    { name: "IBM", logo: null },
    { name: "Salesforce", logo: null },
    { name: "Oracle", logo: null }
  ];
  
  // Animation variants for smoother loading
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Trusted by Leading Companies Worldwide</h2>
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
        >
          {companies.map((company, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="flex items-center justify-center"
            >
              {company.logo ? (
                <img 
                  src={company.logo} 
                  alt={`${company.name} logo`} 
                  className="h-12 md:h-16 object-contain grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all"
                  loading="lazy"
                />
              ) : (
                <div className="text-xl md:text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                  {company.name}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SocialProof;
