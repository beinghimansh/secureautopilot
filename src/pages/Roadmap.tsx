
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { motion } from 'framer-motion';
import { CalendarClock, CircleCheck, CircleDot, CircleEllipsis } from 'lucide-react';

const Roadmap = () => {
  const roadmapItems = [
    {
      title: "Q2 2024: Enhanced AI Policy Generation",
      description: "Improved policy generation with more industry-specific templates and customization options.",
      status: "Completed",
      icon: <CircleCheck className="w-6 h-6 text-green-500" />
    },
    {
      title: "Q3 2024: Real-time Compliance Monitoring",
      description: "Continuous monitoring of compliance controls with instant alerts for potential issues.",
      status: "In Progress",
      icon: <CircleDot className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Q4 2024: Advanced Risk Assessment Tools",
      description: "AI-powered risk assessment with automated mitigation recommendations.",
      status: "Planned",
      icon: <CircleEllipsis className="w-6 h-6 text-gray-400" />
    },
    {
      title: "Q1 2025: Industry-specific Compliance Packages",
      description: "Pre-configured compliance packages for healthcare, finance, and technology sectors.",
      status: "Planned",
      icon: <CircleEllipsis className="w-6 h-6 text-gray-400" />
    }
  ];

  return (
    <PublicPageLayout>
      <div className="pt-20 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 md:px-6"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Product Roadmap</h1>
            <p className="text-xl text-gray-400">
              See what's coming next in our continuous journey to improve compliance management.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-gray-700"></div>
            
            <div className="space-y-16">
              {roadmapItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-12"
                >
                  <div className="absolute left-0 p-1 bg-[#0d0d0d] rounded-full">
                    {item.icon}
                  </div>
                  
                  <div className="flex items-start mb-2">
                    <CalendarClock className="w-5 h-5 text-blue-400 mr-2 flex-shrink-0 mt-1" />
                    <span className="text-blue-400 font-medium">{item.title.split(':')[0]}:</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-white">{item.title.split(':')[1]}</h3>
                  <p className="text-gray-400 mb-3">{item.description}</p>
                  
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    item.status === 'Completed' ? 'bg-green-900/30 text-green-400' :
                    item.status === 'In Progress' ? 'bg-blue-900/30 text-blue-400' :
                    'bg-gray-800 text-gray-400'
                  }`}>
                    {item.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PublicPageLayout>
  );
};

export default Roadmap;
