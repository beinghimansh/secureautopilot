
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GenerationSuccessProps {
  frameworkName: string;
  onComplete: () => void;
  wordCount?: number | null;
}

const GenerationSuccess: React.FC<GenerationSuccessProps> = ({ 
  frameworkName, 
  onComplete,
  wordCount = null
}) => {
  const isShortPolicy = wordCount !== null && wordCount < 200;

  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, type: 'spring' }}
        className="mb-6"
      >
        {isShortPolicy ? (
          <div className="flex items-center">
            <CheckCircle className="w-20 h-20 text-amber-500" />
            <AlertCircle className="w-12 h-12 text-amber-400 -ml-4 -mt-10" />
          </div>
        ) : (
          <CheckCircle className="w-20 h-20 text-green-500" />
        )}
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="text-2xl font-bold text-center mb-3"
      >
        {isShortPolicy ? 'Policy Generated With Warning' : 'Policy Generated Successfully!'}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.4 }}
        className="text-gray-600 text-center mb-4 max-w-md"
      >
        {isShortPolicy ? (
          <>
            Your {frameworkName} policy has been generated, but it contains only approximately {wordCount} words, 
            which is less than the recommended minimum of 200 words. You may want to enhance it manually.
          </>
        ) : (
          <>
            Your {frameworkName} policy has been successfully generated and saved.
            {wordCount && ` It contains approximately ${wordCount} words.`}
          </>
        )}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Button onClick={onComplete}>
          {isShortPolicy ? 'View Policy (Needs Enhancement)' : 'View Policy'}
        </Button>
      </motion.div>
    </div>
  );
};

export default GenerationSuccess;
