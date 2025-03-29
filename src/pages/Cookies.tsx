
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
            <h1 className="text-4xl font-bold tracking-tight mb-8 text-white">Cookie Policy</h1>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-400">Last updated: June 1, 2024</p>
              
              <div className="my-8 space-y-6 text-gray-300">
                <p>
                  This Cookie Policy explains how ComplyAI ("we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">What are cookies?</h2>
                
                <p>
                  Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                </p>
                
                <p>
                  Cookies set by the website owner (in this case, ComplyAI) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Why do we use cookies?</h2>
                
                <p>
                  We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics and other purposes.
                </p>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Types of cookies we use</h2>
                
                <div>
                  <h3 className="text-xl font-bold text-white mt-6 mb-2">Essential cookies</h3>
                  <p>
                    These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white mt-6 mb-2">Performance and functionality cookies</h3>
                  <p>
                    These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white mt-6 mb-2">Analytics and customization cookies</h3>
                  <p>
                    These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
                  </p>
                  
                  <h3 className="text-xl font-bold text-white mt-6 mb-2">Advertising cookies</h3>
                  <p>
                    These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
                  </p>
                </div>
                
                <h2 className="text-2xl font-bold text-white mt-10 mb-4">Contact Us</h2>
                
                <p>
                  If you have any questions about our use of cookies or other technologies, please contact us at:
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

export default Cookies;
