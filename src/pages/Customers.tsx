
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const Customers = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "CTO at TechFlow",
      company: "TechFlow",
      quote: "ComplyAI transformed our compliance program. What used to take months now takes days, and our team can focus on innovation instead of paperwork.",
      logoUrl: "/lovable-uploads/cbef0aa7-95c6-496d-abea-c166b9b5d671.png"
    },
    {
      name: "Michael Chen",
      role: "Security Lead at DataSecure",
      company: "DataSecure",
      quote: "The AI-powered policy generation is a game-changer. We received our ISO 27001 certification in record time thanks to ComplyAI's comprehensive approach.",
      logoUrl: "/lovable-uploads/b82d4ddd-fd36-4351-8525-73a13622172e.png"
    },
    {
      name: "Priya Patel",
      role: "Compliance Manager at HealthGuard",
      company: "HealthGuard",
      quote: "As a healthcare startup, HIPAA compliance was overwhelming until we found ComplyAI. Their specialized healthcare templates and guidance simplified everything.",
      logoUrl: "/lovable-uploads/a7d3c7b1-1a44-4be2-a9cd-6293dd730b01.png"
    }
  ];

  const caseStudies = [
    {
      title: "How Supabase Achieved SOC 2 Compliance in 45 Days",
      company: "Supabase",
      category: "Cloud Infrastructure",
      logoUrl: "/lovable-uploads/a7d3c7b1-1a44-4be2-a9cd-6293dd730b01.png"
    },
    {
      title: "ElevenLabs' Journey to GDPR Compliance",
      company: "ElevenLabs",
      category: "AI Technology",
      logoUrl: "/lovable-uploads/64f07aad-11b3-444c-9c93-17c0285a1585.png"
    },
    {
      title: "Sentry's Multi-Framework Compliance Strategy",
      company: "Sentry",
      category: "Software Monitoring",
      logoUrl: "/lovable-uploads/7b834d06-0777-4c52-ba5b-410d3ee4edaf.png"
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
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Our Customers</h1>
            <p className="text-xl text-gray-400">
              See how companies across industries are simplifying compliance with ComplyAI.
            </p>
          </div>

          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-white">Success Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                  className="bg-gradient-to-br from-gray-900 to-[#1d1d1f] rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                      <img 
                        src={testimonial.logoUrl}
                        alt={`${testimonial.company} logo`}
                        className="h-10 w-10 object-contain rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-10 text-white">Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                  className="bg-[#1d1d1f] rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="h-48 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center p-4">
                    <img 
                      src={caseStudy.logoUrl}
                      alt={`${caseStudy.company} logo`}
                      className="h-20 object-contain"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-sm font-medium text-blue-400 mb-2">{caseStudy.category}</div>
                    <h3 className="text-xl font-bold mb-4 text-white">{caseStudy.title}</h3>
                    <button className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium">
                      Read case study
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </button>
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

export default Customers;
