
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
            <h1 className="text-4xl font-bold mb-8 text-white">Terms of Service</h1>
            
            <div className="prose prose-lg prose-invert">
              <p className="text-gray-300">
                By accessing or using the ComplyAI platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Use License</h2>
              <p className="text-gray-300">
                Permission is granted to temporarily access the materials on ComplyAI's platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-300 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software contained on ComplyAI's platform</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Disclaimer</h2>
              <p className="text-gray-300">
                The materials on ComplyAI's platform are provided on an 'as is' basis. ComplyAI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Limitations</h2>
              <p className="text-gray-300">
                In no event shall ComplyAI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on ComplyAI's platform, even if ComplyAI or a ComplyAI authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 text-white">Contact Information</h2>
              <p className="text-gray-300">
                If you have any questions about these Terms, please contact us at legal@complyai.com.
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

export default Terms;
