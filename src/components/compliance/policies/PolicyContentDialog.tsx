
import React from 'react';
import { Download } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Button from '@/components/common/Button';

interface PolicyContentProps {
  showPolicyContent: boolean;
  setShowPolicyContent: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPolicy: any;
  handleDownloadPolicy: (policy: any, section: string) => void;
}

const PolicyContentDialog: React.FC<PolicyContentProps> = ({
  showPolicyContent,
  setShowPolicyContent,
  selectedPolicy,
  handleDownloadPolicy,
}) => {
  if (!selectedPolicy) return null;

  return (
    <Dialog open={showPolicyContent} onOpenChange={setShowPolicyContent}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{selectedPolicy?.name}</DialogTitle>
        </DialogHeader>
        
        <div className="py-3">
          <Tabs defaultValue="policy">
            <TabsList className="mb-4">
              <TabsTrigger value="policy">Policy</TabsTrigger>
              <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
              <TabsTrigger value="implementation">Implementation Guide</TabsTrigger>
              <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
              <TabsTrigger value="ai">AI Suggestions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="policy" className="p-4 bg-gray-50 rounded border whitespace-pre-wrap">
              {selectedPolicy.content || selectedPolicy.policy_content}
            </TabsContent>
            
            <TabsContent value="risk" className="p-4 bg-gray-50 rounded border whitespace-pre-wrap">
              {selectedPolicy.riskAssessment}
            </TabsContent>
            
            <TabsContent value="implementation" className="p-4 bg-gray-50 rounded border whitespace-pre-wrap">
              {selectedPolicy.implementationGuide}
            </TabsContent>
            
            <TabsContent value="gaps" className="p-4 bg-gray-50 rounded border whitespace-pre-wrap">
              {selectedPolicy.gapsAnalysis}
            </TabsContent>
            
            <TabsContent value="ai" className="p-4 bg-gray-50 rounded border whitespace-pre-wrap">
              {selectedPolicy.aiSuggestions || "AI suggestions not available for this policy."}
            </TabsContent>
          </Tabs>
        </div>
        
        <DialogFooter>
          <Tabs defaultValue="policy">
            <TabsList>
              <TabsTrigger value="policy" onClick={() => handleDownloadPolicy(selectedPolicy, 'policy')}>
                <Download size={16} className="mr-2" />
                Policy
              </TabsTrigger>
              <TabsTrigger value="risk" onClick={() => handleDownloadPolicy(selectedPolicy, 'risk')}>
                <Download size={16} className="mr-2" />
                Risk
              </TabsTrigger>
              <TabsTrigger value="implementation" onClick={() => handleDownloadPolicy(selectedPolicy, 'implementation')}>
                <Download size={16} className="mr-2" />
                Implementation
              </TabsTrigger>
              <TabsTrigger value="gaps" onClick={() => handleDownloadPolicy(selectedPolicy, 'gaps')}>
                <Download size={16} className="mr-2" />
                Gaps
              </TabsTrigger>
              <TabsTrigger value="ai" onClick={() => handleDownloadPolicy(selectedPolicy, 'ai')}>
                <Download size={16} className="mr-2" />
                AI Suggestions
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Button onClick={() => setShowPolicyContent(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyContentDialog;
