
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { PageTransition } from '@/components/common/Transitions';
import { File, Download, BookOpen, Link } from 'lucide-react';
import Footer from '@/components/home/Footer';

const Documentation = () => {
  return (
    <div className="min-h-screen bg-[#111]">
      <Navbar />
      <PageTransition>
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Documentation</h1>
              <p className="text-xl text-gray-400">
                Everything you need to know about implementing and maintaining compliance with ComplyAI
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <DocumentCard 
                title="Getting Started Guide"
                description="Learn the basics of compliance management and how to set up your first framework with ComplyAI."
                icon={<BookOpen className="h-6 w-6 text-blue-400" />}
                link="#"
              />
              <DocumentCard 
                title="ISO 27001 Implementation"
                description="Step-by-step guidance for implementing ISO 27001 information security management system."
                icon={<File className="h-6 w-6 text-blue-400" />}
                link="#"
              />
              <DocumentCard 
                title="SOC 2 Compliance"
                description="Detailed requirements and implementation strategies for SOC 2 compliance."
                icon={<File className="h-6 w-6 text-blue-400" />}
                link="#"
              />
              <DocumentCard 
                title="GDPR Documentation"
                description="Comprehensive guide to implementing GDPR compliant policies and procedures."
                icon={<File className="h-6 w-6 text-blue-400" />}
                link="#"
              />
              <DocumentCard 
                title="API Documentation"
                description="Technical documentation for integrating with the ComplyAI API."
                icon={<Link className="h-6 w-6 text-blue-400" />}
                link="#"
              />
              <DocumentCard 
                title="Compliance Templates"
                description="Downloadable templates for policies, procedures, and audit documentation."
                icon={<Download className="h-6 w-6 text-blue-400" />}
                link="#"
              />
            </div>

            <div className="bg-gray-900 rounded-2xl p-8 mb-16">
              <div className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
                <p className="text-lg text-gray-400">
                  Common questions about compliance management
                </p>
              </div>

              <div className="space-y-6 max-w-4xl mx-auto">
                <FaqItem 
                  question="How do I know which compliance framework is right for my organization?"
                  answer="The right framework depends on your industry, the types of data you handle, and your business goals. ComplyAI can help you assess your needs and recommend the appropriate frameworks."
                />
                <FaqItem 
                  question="How long does it typically take to implement ISO 27001?"
                  answer="Implementation time varies based on your organization's size and complexity, but typically ranges from 6-12 months. ComplyAI can significantly reduce this timeframe."
                />
                <FaqItem 
                  question="Can ComplyAI help with audit preparation?"
                  answer="Yes, ComplyAI provides comprehensive audit preparation tools, including evidence collection, gap analysis, and documentation reviews."
                />
                <FaqItem 
                  question="How often should policies be reviewed and updated?"
                  answer="Most compliance frameworks recommend annual reviews of policies and procedures, but updates should also occur when there are significant changes to your business or technology."
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </PageTransition>
    </div>
  );
};

const DocumentCard = ({ title, description, icon, link }) => {
  return (
    <a 
      href={link} 
      className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
    >
      <div className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </a>
  );
};

const FaqItem = ({ question, answer }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
      <h4 className="text-lg font-semibold mb-2 text-white">{question}</h4>
      <p className="text-gray-400">{answer}</p>
    </div>
  );
};

export default Documentation;
