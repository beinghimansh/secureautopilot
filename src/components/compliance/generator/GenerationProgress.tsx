
import React from 'react';
import { Waves, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/common/Card';

interface GenerationProgressProps {
  frameworkName: string;
}

const GenerationProgress: React.FC<GenerationProgressProps> = ({ frameworkName }) => {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="mb-4">
            <Waves size={48} className="text-blue-600 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Generating Your {frameworkName} Compliance Package</h2>
          <p className="text-gray-600 text-center mb-6">
            Our AI is crafting customized policy documents based on your organization's profile. This may take a minute...
          </p>
          <div className="w-full max-w-md mb-4 bg-gray-200 rounded-full h-2.5">
            <div className="bg-blue-600 h-2.5 rounded-full animate-progress"></div>
          </div>
          <p className="text-sm text-gray-500">
            <Loader2 size={16} className="inline mr-2 animate-spin" />
            Building comprehensive compliance policies and guides
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerationProgress;
