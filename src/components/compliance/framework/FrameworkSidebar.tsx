
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '@/components/common/Button';
import OpenAIAssistant from '../OpenAIAssistant';

interface FrameworkSidebarProps {
  frameworkId: string;
  isGenerating: boolean;
  aiResponse: string | null;
  handleGenerateWithAI: (prompt: string) => Promise<void>;
}

const FrameworkSidebar: React.FC<FrameworkSidebarProps> = ({
  frameworkId,
  isGenerating,
  aiResponse,
  handleGenerateWithAI
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="sticky top-6"
    >
      <OpenAIAssistant 
        onGenerateContent={handleGenerateWithAI}
        isLoading={isGenerating}
        placeholder={`Ask AI about ${frameworkId.toUpperCase()} requirements...`}
        headingText={`${frameworkId.toUpperCase()} AI Assistance`}
        frameworkId={frameworkId}
        aiResponse={aiResponse}
      />
      
      <div className="mt-4 space-y-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start text-left"
          as={Link}
          to="/compliance"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to all frameworks
        </Button>
        
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="font-medium text-gray-800 mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>
              <a href="#" className="text-blue-600 hover:underline">Download framework requirements</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">View implementation guide</a>
            </li>
            <li>
              <a href="#" className="text-blue-600 hover:underline">Schedule compliance review</a>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default FrameworkSidebar;
