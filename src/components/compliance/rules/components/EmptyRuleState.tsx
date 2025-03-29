
import React from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { FileText } from 'lucide-react';

const EmptyRuleState: React.FC = () => {
  return (
    <Card className="h-full">
      <CardContent className="flex flex-col h-full items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <FileText size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Rule Selected</h3>
        <p className="text-gray-500 max-w-md">
          Select a rule from the list to view its details and manage its compliance status.
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyRuleState;
