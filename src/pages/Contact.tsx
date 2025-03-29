
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Contact Us</h1>
            <p className="text-xl text-gray-400">
              Have questions about our product or services? We're here to help.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:col-span-2 bg-[#1d1d1f] rounded-xl p-8 border border-gray-800"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Send Us a Message</h2>
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full bg-[#0d0d0d] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full bg-[#0d0d0d] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-gray-400 mb-2">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full bg-[#0d0d0d] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="How can we help?"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full bg-[#0d0d0d] border border-gray-700 rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <Button className="w-full sm:w-auto px-8 bg-blue-600 hover:bg-blue-700">Send Message</Button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-[#1d1d1f] rounded-xl p-8 border border-gray-800 h-fit"
            >
              <h2 className="text-2xl font-bold mb-6 text-white">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Email</h3>
                    <p className="text-gray-400">hello@complyai.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Phone</h3>
                    <p className="text-gray-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 text-blue-400 mr-3 mt-1" />
                  <div>
                    <h3 className="text-white font-medium">Office</h3>
                    <p className="text-gray-400">1234 Market Street<br />San Francisco, CA 94103</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </PublicPageLayout>
  );
};

export default Contact;
