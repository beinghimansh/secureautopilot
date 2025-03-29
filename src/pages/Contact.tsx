
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react';
import Button from '@/components/common/Button';

const Contact = () => {
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
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Get in Touch</h1>
            <p className="text-xl text-gray-400">
              Have questions about ComplyAI? Our team is here to help you with anything you need.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Email Us</h3>
                    <p className="text-gray-400">info@complyai.com</p>
                    <p className="text-gray-400">support@complyai.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Call Us</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                    <p className="text-gray-400">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-green-500/20 p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Office</h3>
                    <p className="text-gray-400">123 Compliance Street</p>
                    <p className="text-gray-400">San Francisco, CA 94107</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-orange-500/20 p-3 rounded-lg mr-4">
                    <MessageSquare className="h-6 w-6 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white mb-1">Live Chat</h3>
                    <p className="text-gray-400">Available 24/7 for urgent inquiries</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl border border-gray-800">
                <h3 className="text-lg font-bold text-white mb-2">Looking for a demo?</h3>
                <p className="text-gray-400 mb-4">Schedule a personalized demo with our product specialists to see how ComplyAI can transform your compliance processes.</p>
                <Button>Schedule Demo</Button>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[#1d1d1f] rounded-xl p-8 border border-gray-800"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="How can we help?"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your message here..."
                  />
                </div>
                
                <Button className="w-full">Send Message</Button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PublicPageLayout>
  );
};

export default Contact;
