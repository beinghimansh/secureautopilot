
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RulesDisplay from './rules/RulesDisplay';
import PolicyGenerator from './PolicyGenerator';
import PoliciesSection from './policies/PoliciesSection';
import AIGuidanceButton from './AIGuidanceButton';

interface FrameworkControlsProps {
  frameworkId: string;
}

const FrameworkControls: React.FC<FrameworkControlsProps> = ({ frameworkId }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('controls');
  const [showPolicyGenerator, setShowPolicyGenerator] = useState(false);
  const [rules, setRules] = useState<any[]>([]);
  const [selectedRuleId, setSelectedRuleId] = useState<string | null>(null);
  
  useEffect(() => {
    // In a real app, would fetch framework details here
    console.log(`Loading framework: ${frameworkId}`);
  }, [frameworkId]);
  
  const handleBackToFrameworks = () => {
    navigate('/compliance');
  };
  
  const handleAIGuidance = () => {
    // In a real app, this would open AI guidance modal or initiate AI assistance
    console.log('Opening AI guidance for framework:', frameworkId);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToFrameworks}
            className="mb-4 flex items-center"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Frameworks
          </Button>
          
          <h1 className="text-2xl font-bold">
            {frameworkId === 'iso27001' ? 'ISO 27001' : 
             frameworkId === 'soc2' ? 'SOC 2' : 
             frameworkId === 'gdpr' ? 'GDPR' : 
             frameworkId === 'hipaa' ? 'HIPAA' : 
             frameworkId === 'pci_dss' ? 'PCI DSS' : 
             frameworkId === 'iso42001' ? 'ISO 42001' :
             frameworkId}
          </h1>
        </div>
        
        <AIGuidanceButton onClick={handleAIGuidance} />
      </div>
      
      <Tabs 
        defaultValue={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="mb-6 bg-gray-100 shadow border border-gray-200">
          <TabsTrigger 
            value="controls" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
          >
            Controls
          </TabsTrigger>
          <TabsTrigger 
            value="policies" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
          >
            Policies
          </TabsTrigger>
          <TabsTrigger 
            value="tasks" 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white font-medium"
          >
            Tasks
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="controls">
          {showPolicyGenerator ? (
            <PolicyGenerator 
              frameworkId={frameworkId} 
              onComplete={() => setShowPolicyGenerator(false)}
              onClose={() => setShowPolicyGenerator(false)}
            />
          ) : (
            <RulesDisplay 
              frameworkId={frameworkId}
              ruleId={selectedRuleId}
              rules={rules}
              setRules={setRules}
            />
          )}
        </TabsContent>
        
        <TabsContent value="policies">
          <PoliciesSection frameworkId={frameworkId} />
        </TabsContent>
        
        <TabsContent value="tasks">
          <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Tasks & Assignments</h2>
            <p className="text-gray-600">Manage and track compliance tasks related to this framework.</p>
            
            <div className="mt-8 p-8 border border-dashed border-gray-300 rounded-lg text-center">
              <p className="text-gray-500">No tasks have been created yet.</p>
              <Button className="mt-4">
                Create First Task
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrameworkControls;
