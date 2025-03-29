
import React from 'react';
import PublicPageLayout from '@/components/layout/PublicPageLayout';
import { motion } from 'framer-motion';
import { ArrowRight, Link as LinkIcon, Database, Shield } from 'lucide-react';

const Integrations = () => {
  const integrations = [
    {
      name: "OpenAI",
      description: "Leverage OpenAI's advanced language models for policy generation and compliance recommendations.",
      icon: <Shield className="w-10 h-10 text-blue-500" />,
      category: "AI & Automation"
    },
    {
      name: "Claude by Anthropic",
      description: "Utilize Claude for nuanced compliance analysis and document processing with context awareness.",
      icon: <Shield className="w-10 h-10 text-purple-500" />,
      category: "AI & Automation"
    },
    {
      name: "Supabase",
      description: "Secure data storage and authentication for all your compliance documentation and evidence.",
      icon: <Database className="w-10 h-10 text-green-500" />,
      category: "Data & Storage"
    },
    {
      name: "ElevenLabs",
      description: "Voice synthesis for compliance training and notifications to enhance user experience.",
      icon: <LinkIcon className="w-10 h-10 text-orange-500" />,
      category: "Voice & Audio"
    }
  ];

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
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-white">Powerful Integrations</h1>
            <p className="text-xl text-gray-400">
              Connect your compliance system with the tools you already use to streamline your workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#1d1d1f] rounded-xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="mb-4">{integration.icon}</div>
                <div className="text-sm font-medium text-blue-400 mb-2">{integration.category}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{integration.name}</h3>
                <p className="text-gray-400 mb-4">{integration.description}</p>
                <button className="text-blue-400 hover:text-blue-300 flex items-center text-sm font-medium">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PublicPageLayout>
  );
};

export default Integrations;
