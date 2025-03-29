
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { PageTransition } from '@/components/common/Transitions';
import { MessageSquare, Mail, PhoneCall, Clock, BookOpen } from 'lucide-react';
import Footer from '@/components/home/Footer';
import Button from '@/components/common/Button';

const Support = () => {
  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />
      <PageTransition>
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Support</h1>
              <p className="text-xl text-gray-400">
                We're here to help you succeed with your compliance journey
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-white">Get in Touch</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1 text-white">Live Chat</h3>
                      <p className="text-gray-400 mb-2">Chat with our support team in real-time</p>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Start a Chat
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1 text-white">Email Support</h3>
                      <p className="text-gray-400 mb-2">Get a response within 24 hours</p>
                      <a href="mailto:support@complyai.com" className="text-blue-400 hover:underline">
                        support@complyai.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                      <PhoneCall className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-1 text-white">Phone Support</h3>
                      <p className="text-gray-400 mb-2">Available for Enterprise customers</p>
                      <span className="text-white">+1 (800) 123-4567</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl border border-gray-700">
                <h2 className="text-2xl font-bold mb-6 text-white">Support Hours</h2>
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-white">Our team is available:</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>Monday - Friday: 9:00 AM - 8:00 PM ET</li>
                      <li>Saturday: 10:00 AM - 6:00 PM ET</li>
                      <li>Sunday: Closed (Email support only)</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2 text-white">Self-Service Resources</h3>
                    <p className="text-gray-400 mb-3">
                      Check out our knowledge base for quick answers to common questions.
                    </p>
                    <Button 
                      variant="outline"
                      className="text-white border-gray-600 hover:bg-gray-800"
                      onClick={() => window.location.href = '/documentation'}
                    >
                      Browse Knowledge Base
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 mb-16">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-4 text-white">Need Specialized Help?</h2>
                <p className="text-lg text-gray-400 mb-8">
                  Our compliance experts can provide personalized guidance for your specific requirements.
                </p>
                <Button 
                  size="lg"
                  className="px-8 py-3 text-lg shadow-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none"
                >
                  Schedule a Consultation
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

export default Support;
