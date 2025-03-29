
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { getRulesByFramework } from '@/components/compliance/rules/RulesData';
import RulesDisplay from '@/components/compliance/rules/RulesDisplay';
import { SearchIcon, Filter } from 'lucide-react';
import Button from '@/components/common/Button';

interface FrameworkControlsProps {
  frameworkId: string;
}

const FrameworkControls: React.FC<FrameworkControlsProps> = ({ frameworkId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold">Controls & Clauses</h2>
            <div className="flex gap-2 w-full sm:w-auto">
              <div className="relative flex-grow sm:flex-grow-0">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon size={16} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search controls..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full sm:w-[200px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" leftIcon={<Filter size={16} />} size="sm">
                Filter
              </Button>
            </div>
          </div>
          
          <RulesDisplay frameworkId={frameworkId} />
        </CardContent>
      </Card>
    </div>
  );
};

export default FrameworkControls;
