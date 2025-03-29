
import React from 'react';
import Button from '@/components/common/Button';
import { Upload } from 'lucide-react';
import { toast } from 'sonner';

const EvidenceUploader: React.FC = () => {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded p-4 text-center">
      <p className="text-sm text-gray-500 mb-3">Upload documents as evidence for this requirement</p>
      <Button 
        variant="outline" 
        size="sm"
        leftIcon={<Upload size={16} />}
        onClick={() => toast.info('Document upload feature coming soon')}
      >
        Upload Document
      </Button>
    </div>
  );
};

export default EvidenceUploader;
