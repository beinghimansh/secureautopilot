
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
            <h1 className="text-4xl font-bold tracking-tight mb-8 text-white">Privacy Policy</h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-400">Last updated: June 1, 2024</p>
              
              <div className="my-8 space-y-6 text-gray-300">
                <p>
                  ComplyAI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by ComplyAI.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Information We Collect</h2>
                
                <p>
                  We collect information you provide directly to us when you:
                </p>
                
                <ul className="list-disc pl-6 text-gray-300">
                  <li>Create an account and use our platform</li>
                  <li>Fill out forms or respond to surveys</li>
                  <li>Communicate with us via third-party social media sites</li>
                  <li>Request customer support</li>
                  <li>Otherwise communicate with us</li>
                </ul>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">How We Use Your Information</h2>
                
                <p>
                  We may use the information we collect for various purposes, including to:
                </p>
                
                <ul className="list-disc pl-6 text-gray-300">
                  <li>Provide, maintain, and improve our Services</li>
                  <li>Process and complete transactions, and send related information</li>
                  <li>Send technical notices, updates, security alerts, and support and administrative messages</li>
                  <li>Respond to your comments, questions, and requests</li>
                  <li>Communicate with you about products, services, offers, promotions, and events</li>
                  <li>Monitor and analyze trends, usage, and activities in connection with our Services</li>
                  <li>Detect, investigate, and prevent fraudulent transactions and other illegal activities</li>
                  <li>Personalize and improve the Services</li>
                </ul>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Information Sharing and Disclosure</h2>
                
                <p>
                  We may share personal information as follows:
                </p>
                
                <ul className="list-disc pl-6 text-gray-300">
                  <li>With vendors, consultants, and other service providers who need access to such information to carry out work on our behalf</li>
                  <li>In response to a request for information if we believe disclosure is in accordance with any applicable law, regulation, or legal process</li>
                  <li>If we believe your actions are inconsistent with our user agreements or policies, or to protect the rights, property, and safety of ComplyAI or others</li>
                  <li>In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business by another company</li>
                  <li>Between and among ComplyAI and our current and future parents, affiliates, subsidiaries, and other companies under common control and ownership</li>
                  <li>With your consent or at your direction</li>
                </ul>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Contact Us</h2>
                
                <p>
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                
                <p className="text-gray-300">
                  ComplyAI<br />
                  123 Compliance Street<br />
                  San Francisco, CA 94107<br />
                  Email: privacy@complyai.com
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PublicPageLayout>
  );
};

export default Privacy;
