
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Careers = () => {
  const positions = [
    {
      title: "Compliance Specialist",
      department: "Product",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "AI Research Engineer",
      department: "Engineering",
      location: "San Francisco",
      type: "Full-time"
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Security Engineer",
      department: "Engineering",
      location: "New York",
      type: "Full-time"
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
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Join Our Team</h1>
            <p className="text-xl text-gray-400">
              Be part of our mission to simplify compliance management for businesses worldwide.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1d1d1f] rounded-xl p-8 mb-16 border border-gray-800"
            >
              <h2 className="text-2xl font-bold mb-4 text-white">Why Work With Us</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Innovation</h3>
                  <p className="text-gray-400">
                    Work on cutting-edge AI technology that is transforming how businesses handle compliance.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Impact</h3>
                  <p className="text-gray-400">
                    Make a real difference by helping organizations maintain security and build trust.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Growth</h3>
                  <p className="text-gray-400">
                    Join a rapidly growing company with plenty of opportunities for professional development.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-blue-400">Flexibility</h3>
                  <p className="text-gray-400">
                    Enjoy remote-friendly policies and a healthy work-life balance.
                  </p>
                </div>
              </div>
            </motion.div>

            <h2 className="text-2xl font-bold mb-6 text-white">Open Positions</h2>
            <div className="space-y-4">
              {positions.map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  className="bg-[#1d1d1f] rounded-lg p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 text-white">{position.title}</h3>
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-block px-3 py-1 bg-blue-900/20 text-blue-400 rounded-full text-sm font-medium">
                      {position.department}
                    </span>
                    <span className="inline-block px-3 py-1 bg-purple-900/20 text-purple-400 rounded-full text-sm font-medium">
                      {position.location}
                    </span>
                    <span className="inline-block px-3 py-1 bg-green-900/20 text-green-400 rounded-full text-sm font-medium">
                      {position.type}
                    </span>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium">
                    View details
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </PublicPageLayout>
  );
};

export default Careers;
