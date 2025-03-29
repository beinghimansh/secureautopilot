
import React, { useState } from 'react';
import { Download, X, FileText, AlertCircle, BarChart, FileText2, Award } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

interface PolicyContentDialogProps {
  showPolicyContent: boolean;
  setShowPolicyContent: React.Dispatch<React.SetStateAction<boolean>>;
  selectedPolicy: any;
  handleDownloadPolicy: (policy: any, section: string) => void;
}

const PolicyContentDialog: React.FC<PolicyContentDialogProps> = ({
  showPolicyContent,
  setShowPolicyContent,
  selectedPolicy,
  handleDownloadPolicy
}) => {
  const [activeTab, setActiveTab] = useState('policy');

  const handleClose = () => {
    setShowPolicyContent(false);
  };

  if (!selectedPolicy) {
    return null;
  }

  const PolicyContent = ({ content }: { content: string }) => {
    if (!content) {
      return (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5" />
            <p className="text-yellow-700">This content section is not available for this policy.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="prose prose-sm max-w-none markdown-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    );
  };

  return (
    <Dialog open={showPolicyContent} onOpenChange={setShowPolicyContent}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <DialogTitle className="text-xl">{selectedPolicy.name}</DialogTitle>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <Tabs defaultValue="policy" className="flex-grow overflow-hidden flex flex-col" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="policy">
              <FileText className="w-4 h-4 mr-2" />
              Policy Document
            </TabsTrigger>
            <TabsTrigger value="risk">
              <AlertCircle className="w-4 h-4 mr-2" />
              Risk Assessment
            </TabsTrigger>
            <TabsTrigger value="implementation">
              <Award className="w-4 h-4 mr-2" />
              Implementation
            </TabsTrigger>
            <TabsTrigger value="gaps">
              <BarChart className="w-4 h-4 mr-2" />
              Gaps Analysis
            </TabsTrigger>
            <TabsTrigger value="ai">
              <FileText2 className="w-4 h-4 mr-2" />
              AI Suggestions
            </TabsTrigger>
          </TabsList>

          <div className="flex-grow overflow-auto pb-4">
            <TabsContent value="policy" className="mt-0 h-full">
              <div className="p-4 bg-white rounded-md border border-gray-200 overflow-auto max-h-[60vh]">
                <PolicyContent content={selectedPolicy.policy_content || selectedPolicy.content} />
              </div>
            </TabsContent>

            <TabsContent value="risk" className="mt-0 h-full">
              <div className="p-4 bg-white rounded-md border border-gray-200 overflow-auto max-h-[60vh]">
                <PolicyContent content={selectedPolicy.riskAssessment || selectedPolicy.risk_assessment} />
              </div>
            </TabsContent>

            <TabsContent value="implementation" className="mt-0 h-full">
              <div className="p-4 bg-white rounded-md border border-gray-200 overflow-auto max-h-[60vh]">
                <PolicyContent content={selectedPolicy.implementationGuide || selectedPolicy.implementation_guide} />
              </div>
            </TabsContent>

            <TabsContent value="gaps" className="mt-0 h-full">
              <div className="p-4 bg-white rounded-md border border-gray-200 overflow-auto max-h-[60vh]">
                <PolicyContent content={selectedPolicy.gapsAnalysis || selectedPolicy.gaps_analysis} />
              </div>
            </TabsContent>

            <TabsContent value="ai" className="mt-0 h-full">
              <div className="p-4 bg-white rounded-md border border-gray-200 overflow-auto max-h-[60vh]">
                <PolicyContent content={selectedPolicy.aiSuggestions || selectedPolicy.ai_suggestions} />
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
          <Button 
            variant="outline" 
            onClick={() => handleDownloadPolicy(selectedPolicy, activeTab)}
            leftIcon={<Download size={16} />}
          >
            Download Section
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyContentDialog;
