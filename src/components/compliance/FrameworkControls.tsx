
import React, { useState, lazy, Suspense } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { SearchIcon, Filter, List, Grid } from 'lucide-react';
import Button from '@/components/common/Button';
import OpenAIIntegration from '@/components/compliance/OpenAIIntegration';

// Lazy load the RulesDisplay component to improve initial load time
const RulesDisplay = lazy(() => import('@/components/compliance/rules/RulesDisplay'));

interface FrameworkControlsProps {
  frameworkId: string;
}

const FrameworkControls: React.FC<FrameworkControlsProps> = ({ frameworkId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAIGuidance, setShowAIGuidance] = useState(false);
  
  const frameworkName = 
    frameworkId === 'iso27001' ? 'ISO 27001' : 
    frameworkId === 'soc2' ? 'SOC 2' : 
    frameworkId === 'gdpr' ? 'GDPR' : 
    frameworkId === 'hipaa' ? 'HIPAA' : 
    frameworkId === 'pci_dss' ? 'PCI DSS' : 'Compliance';
  
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold">{frameworkName} Controls & Clauses</h2>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
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
              <Button 
                variant="outline" 
                leftIcon={<Filter size={16} />} 
                size="sm"
              >
                Filter
              </Button>
              <Button
                variant="default"
                onClick={() => setShowAIGuidance(!showAIGuidance)}
                size="sm"
              >
                {showAIGuidance ? 'Hide AI Guidance' : 'Get AI Guidance'}
              </Button>
            </div>
          </div>
          
          {showAIGuidance && (
            <div className="mb-6">
              <OpenAIIntegration 
                frameworkId={frameworkId}
                promptContext={`You are an expert compliance consultant helping with ${frameworkName} implementation. 
                Please provide detailed guidance based on the user's question.`}
                initialPrompt={`What are the key requirements for ${frameworkName} compliance?`}
                headingText={`${frameworkName} AI Guidance`}
              />
            </div>
          )}
          
          <Suspense fallback={
            <div className="flex justify-center my-12">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          }>
            <RulesDisplay frameworkId={frameworkId} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
};

export default FrameworkControls;
