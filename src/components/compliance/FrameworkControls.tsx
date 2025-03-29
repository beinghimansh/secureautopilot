
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { BookText, FileText, CheckSquare, Network } from 'lucide-react';
import OpenAIIntegration from './OpenAIIntegration';
import RulesDisplay from './rules/RulesDisplay';
import PolicyGenerator from './PolicyGenerator';

interface FrameworkControlsProps {
  frameworkId: string;
  frameworkName: string;
}

const FrameworkControls: React.FC<FrameworkControlsProps> = ({ frameworkId, frameworkName }) => {
  const [showPolicyGenerator, setShowPolicyGenerator] = useState(false);
  const [activeTab, setActiveTab] = useState("controls");

  const handleGeneratePolicy = () => {
    setShowPolicyGenerator(true);
  };

  const handleCloseGenerator = () => {
    setShowPolicyGenerator(false);
  };

  const renderPolicyGeneratorButton = () => (
    <Button 
      onClick={handleGeneratePolicy}
      className="ml-auto"
      size="sm"
    >
      <FileText className="mr-2 h-4 w-4" />
      Generate Policy
    </Button>
  );

  if (showPolicyGenerator) {
    return (
      <PolicyGenerator 
        frameworkId={frameworkId} 
        onClose={handleCloseGenerator} 
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{frameworkName} Implementation</h2>
        {renderPolicyGeneratorButton()}
      </div>
      
      <OpenAIIntegration 
        headingText="AI Compliance Assistant"
        promptContext={`Framework: ${frameworkName}`}
        initialPrompt={`How do I comply with ${frameworkName}?`}
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="controls">
            <CheckSquare className="mr-2 h-4 w-4" />
            Controls
          </TabsTrigger>
          <TabsTrigger value="documentation">
            <BookText className="mr-2 h-4 w-4" />
            Documentation
          </TabsTrigger>
          <TabsTrigger value="policies">
            <FileText className="mr-2 h-4 w-4" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="dependencies">
            <Network className="mr-2 h-4 w-4" />
            Dependencies
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="controls" className="pt-4">
          <RulesDisplay frameworkId={frameworkId} />
        </TabsContent>
        
        <TabsContent value="documentation" className="pt-4">
          <p>Compliance documentation for {frameworkName} will be displayed here.</p>
        </TabsContent>
        
        <TabsContent value="policies" className="pt-4">
          <p>Policies related to {frameworkName} will be displayed here.</p>
          {renderPolicyGeneratorButton()}
        </TabsContent>
        
        <TabsContent value="dependencies" className="pt-4">
          <p>This tab shows other frameworks and standards that have overlapping controls with {frameworkName}.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FrameworkControls;
