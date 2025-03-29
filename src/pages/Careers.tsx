
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { motion } from 'framer-motion';
import { BriefcaseBusiness, GraduationCap, Globe, Coffee, Users, ArrowRight } from 'lucide-react';

const Careers = () => {
  const benefits = [
    {
      title: "Remote-First Culture",
      description: "Work from anywhere in the world with flexible hours that fit your lifestyle.",
      icon: <Globe className="h-6 w-6 text-blue-400" />
    },
    {
      title: "Continuous Learning",
      description: "Education stipend and dedicated time for learning new skills and technologies.",
      icon: <GraduationCap className="h-6 w-6 text-purple-400" />
    },
    {
      title: "Work-Life Balance",
      description: "Unlimited PTO, mental health days, and no meetings on Fridays.",
      icon: <Coffee className="h-6 w-6 text-orange-400" />
    },
    {
      title: "Team Retreats",
      description: "Bi-annual company retreats to connect, collaborate, and celebrate together.",
      icon: <Users className="h-6 w-6 text-green-400" />
    }
  ];

  const openPositions = [
    {
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "AI Research Scientist",
      department: "AI & Machine Learning",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Compliance Subject Matter Expert",
      department: "Product",
      location: "Remote",
      type: "Full-time"
    },
    {
      title: "Growth Marketing Manager",
      department: "Marketing",
      location: "Remote",
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
              Help us revolutionize the way businesses handle compliance and unlock their potential.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Why Work With Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1d1d1f] rounded-xl p-6 border border-gray-800"
                >
                  <div className="mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{benefit.title}</h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-white">Open Positions</h2>
              <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                View all positions
              </a>
            </div>
            
            <div className="space-y-4">
              {openPositions.map((position, index) => (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1d1d1f] rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300 flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center mb-2">
                      <BriefcaseBusiness className="h-5 w-5 text-blue-400 mr-2" />
                      <h3 className="text-lg font-bold text-white">{position.title}</h3>
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <span className="mr-4">{position.department}</span>
                      <span className="mr-4">•</span>
                      <span className="mr-4">{position.location}</span>
                      <span className="mr-4">•</span>
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    <ArrowRight className="h-5 w-5" />
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
