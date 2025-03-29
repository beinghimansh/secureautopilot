
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { motion } from 'framer-motion';

const Cookies = () => {
  return (
    <PublicPageLayout>
      <div className="pt-20 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto px-4 md:px-6"
        >
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-white">Cookie Policy</h1>
            
            <div className="prose prose-lg prose-invert">
              <p className="text-gray-300">
                This Cookie Policy explains how ComplyAI uses cookies and similar technologies to recognize you when you visit our platform. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">What Are Cookies?</h2>
              <p className="text-gray-300">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">How We Use Cookies</h2>
              <p className="text-gray-300">
                We use cookies for the following purposes:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>To enable certain functions of the platform</li>
                <li>To provide analytics and understand how you use our platform</li>
                <li>To store your preferences</li>
                <li>To enable advertisements delivery, including behavioral advertising</li>
                <li>To authenticate users and prevent fraudulent use of user accounts</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Types of Cookies We Use</h2>
              <p className="text-gray-300">
                The platform uses the following types of cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li><strong>Essential Cookies:</strong> These cookies are necessary for the platform to function and cannot be switched off in our systems.</li>
                <li><strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our platform.</li>
                <li><strong>Functional Cookies:</strong> These cookies enable the platform to provide enhanced functionality and personalization.</li>
                <li><strong>Targeting Cookies:</strong> These cookies may be set through our platform by our advertising partners.</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">How to Control Cookies</h2>
              <p className="text-gray-300">
                You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our platform, but your access to some functionality and areas may be restricted.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions about our use of cookies, please email us at privacy@complyai.com.
              </p>
              
              <p className="text-gray-400 mt-8">
                Last updated: July 15, 2024
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </PublicPageLayout>
  );
};

export default Cookies;
