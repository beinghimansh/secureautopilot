
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { motion } from 'framer-motion';

const Privacy = () => {
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
            <h1 className="text-4xl font-bold mb-8 text-white">Privacy Policy</h1>
            
            <div className="prose prose-lg prose-invert">
              <p className="text-gray-300">
                At ComplyAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our compliance management platform.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Information We Collect</h2>
              <p className="text-gray-300">
                We collect information that you provide directly to us when you register for an account, create or modify your profile, set preferences, or make purchases through the platform. This includes your name, email address, phone number, company information, billing information, and any other information you choose to provide.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">How We Use Your Information</h2>
              <p className="text-gray-300">
                We use the information we collect to provide, maintain, and improve our services, including to:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Create and manage your account</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Provide customer service</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Data Security</h2>
              <p className="text-gray-300">
                We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Contact Us</h2>
              <p className="text-gray-300">
                If you have any questions about this Privacy Policy, please contact us at privacy@complyai.com.
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

export default Privacy;
