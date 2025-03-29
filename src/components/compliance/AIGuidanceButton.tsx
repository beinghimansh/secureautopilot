
import React from 'react';
import Button from '@/components/common/Button';
import { Lightbulb } from 'lucide-react';

interface AIGuidanceButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  className?: string;
}

const AIGuidanceButton: React.FC<AIGuidanceButtonProps> = ({ 
  onClick, 
  isLoading = false,
  className = ''
}) => {
  return (
    <Button
      onClick={onClick}
      className={`bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all flex items-center justify-center ${className}`}
      isLoading={isLoading}
      leftIcon={<Lightbulb size={16} />}
    >
      Get AI Guidance
    </Button>
  );
};

export default AIGuidanceButton;
