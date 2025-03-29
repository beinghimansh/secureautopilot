
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { motion } from 'framer-motion';

const Terms = () => {
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
            <h1 className="text-4xl font-bold tracking-tight mb-8 text-white">Terms of Service</h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-400">Last updated: June 1, 2024</p>
              
              <div className="my-8 space-y-6 text-gray-300">
                <p>
                  Welcome to ComplyAI. Please read these Terms of Service carefully before using our platform.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Acceptance of Terms</h2>
                
                <p>
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the Service.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Subscriptions</h2>
                
                <p>
                  Some parts of the Service are billed on a subscription basis. You will be billed in advance on a recurring basis, depending on the type of subscription plan you select.
                </p>
                
                <p>
                  You may cancel your subscription renewal either through your online account management page or by contacting our customer support team. You will not receive a refund for the fees you already paid for your current subscription period, and you will continue to have access to the Service through the end of your current subscription period.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Content</h2>
                
                <p>
                  Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material. You are responsible for the content that you post to the Service, including its legality, reliability, and appropriateness.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Accounts</h2>
                
                <p>
                  When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on the Service.
                </p>
                
                <p>
                  You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Intellectual Property</h2>
                
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive property of ComplyAI and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of ComplyAI.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Termination</h2>
                
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Contact Us</h2>
                
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                
                <p className="text-gray-300">
                  ComplyAI<br />
                  123 Compliance Street<br />
                  San Francisco, CA 94107<br />
                  Email: legal@complyai.com
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PublicPageLayout>
  );
};

export default Terms;
