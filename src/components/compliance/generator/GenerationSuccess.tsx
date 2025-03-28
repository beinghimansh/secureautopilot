
import React from 'react';
import { Check, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';

interface GenerationSuccessProps {
  frameworkName: string;
  onComplete: () => void;
}

const GenerationSuccess: React.FC<GenerationSuccessProps> = ({ frameworkName, onComplete }) => {
  return (
    <Card>
      <CardContent className="p-8">
        <div className="flex flex-col items-center justify-center py-10">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Check size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Generation Complete!</h2>
          <p className="text-gray-600 text-center mb-6">
            Your {frameworkName} compliance package has been successfully generated.
          </p>
          <Button leftIcon={<FileText size={16} />} onClick={onComplete}>
            View Your Generated Policies
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GenerationSuccess;
