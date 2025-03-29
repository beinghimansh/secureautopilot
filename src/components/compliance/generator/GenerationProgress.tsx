
import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface GenerationProgressProps {
  frameworkName: string;
  progress?: number;
}

const GenerationProgress: React.FC<GenerationProgressProps> = ({ frameworkName, progress = 0 }) => {
  const progressSteps = [
    { value: 10, label: 'Initializing' },
    { value: 30, label: 'Preparing data' },
    { value: 50, label: 'Generating content' },
    { value: 80, label: 'Processing policy' },
    { value: 100, label: 'Finishing up' }
  ];
  
  const currentStep = progressSteps.reduce((prev, curr) => {
    return (Math.abs(curr.value - progress) < Math.abs(prev.value - progress)) ? curr : prev;
  }, progressSteps[0]);

  return (
    <div className="min-h-[400px] w-full flex flex-col items-center justify-center p-8">
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="mb-8"
      >
        <Loader2 className="w-16 h-16 text-blue-500" />
      </motion.div>

      <h2 className="text-2xl font-bold text-center mb-3">
        Generating {frameworkName} Policy
      </h2>

      <p className="text-gray-600 text-center mb-8 max-w-md">
        This may take a minute. We're creating a comprehensive policy document tailored to your organization's requirements.
      </p>

      <div className="w-full max-w-md mb-4">
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-blue-500" 
            initial={{ width: '5%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
      
      <p className="text-sm text-gray-500">
        {currentStep.label} ({Math.round(progress)}%)
      </p>
    </div>
  );
};

export default GenerationProgress;
