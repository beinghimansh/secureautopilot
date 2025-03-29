
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { motion } from 'framer-motion';
import { MessageSquareQuote, Star } from 'lucide-react';

const Customers = () => {
  const testimonials = [
    {
      name: "Alex Johnson",
      position: "CTO, Lovable",
      quote: "ComplyAI transformed our approach to compliance. What used to take months now takes days, and our team can focus on innovation instead of paperwork.",
      rating: 5,
      logoUrl: "/lovable-uploads/cbef0aa7-95c6-496d-abea-c166b9b5d671.png"
    },
    {
      name: "Sarah Chen",
      position: "CISO, Anthropic",
      quote: "The AI-powered policy generation is remarkable. It created tailored policies that perfectly matched our business needs while ensuring regulatory compliance.",
      rating: 5,
      logoUrl: "/lovable-uploads/b82d4ddd-fd36-4351-8525-73a13622172e.png"
    },
    {
      name: "Michael Davis",
      position: "Security Lead, Supabase",
      quote: "We needed to comply with multiple frameworks simultaneously. ComplyAI made this complex task manageable with its intelligent mapping features.",
      rating: 5,
      logoUrl: "/lovable-uploads/a7d3c7b1-1a44-4be2-a9cd-6293dd730b01.png"
    }
  ];

  const caseStudies = [
    {
      title: "How Lovable Achieved ISO 27001 in 30 Days",
      description: "Learn how Lovable streamlined their security certification process using ComplyAI's automated tools.",
      logo: "/lovable-uploads/cbef0aa7-95c6-496d-abea-c166b9b5d671.png",
      companyName: "Lovable"
    },
    {
      title: "ElevenLabs: Managing Multiple Compliance Frameworks Efficiently",
      description: "Discover how ElevenLabs maintains compliance with four different frameworks using a single platform.",
      logo: "/lovable-uploads/529f422f-a807-4ca3-ace2-724504a1dd7f.png",
      companyName: "ElevenLabs"
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
              Join hundreds of innovative companies streamlining their compliance journey with ComplyAI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700"
              >
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.logoUrl} 
                    alt={`${testimonial.name}'s company logo`} 
                    className="h-12 w-12 object-contain mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <MessageSquareQuote className="h-6 w-6 text-blue-400 mb-2" />
                  <p className="text-gray-300 italic">"{testimonial.quote}"</p>
                </div>
                
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-[#1d1d1f] rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
                >
                  <div className="flex items-center p-6 border-b border-gray-800 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
                    <img 
                      src={study.logo} 
                      alt={`${study.companyName} logo`} 
                      className="h-12 w-12 object-contain mr-4"
                    />
                    <h3 className="text-xl font-bold text-white">{study.title}</h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-400 mb-4">{study.description}</p>
                    <button className="text-blue-400 font-medium hover:text-blue-300 transition-colors">
                      Read full case study →
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
