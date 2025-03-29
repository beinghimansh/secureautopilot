
import React, { useState } from 'react';
import { X, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

interface PolicyContentDialogProps {
  showPolicyContent: boolean;
  setShowPolicyContent: (show: boolean) => void;
  selectedPolicy: any;
  handleDownloadPolicy: (policy: any, type: string) => void;
}

const PolicyContentDialog: React.FC<PolicyContentDialogProps> = ({
  showPolicyContent,
  setShowPolicyContent,
  selectedPolicy,
  handleDownloadPolicy
}) => {
  const [activeTab, setActiveTab] = useState('policy');

  if (!selectedPolicy) {
    return null;
  }

  const policyContent = selectedPolicy.content || selectedPolicy.policy_content || '';
  const riskAssessment = selectedPolicy.riskAssessment || '';
  const implementationGuide = selectedPolicy.implementationGuide || '';
  const gapsAnalysis = selectedPolicy.gapsAnalysis || '';
  const aiSuggestions = selectedPolicy.aiSuggestions || '';

  const getPolicyTabClass = (tabName: string) => {
    return `px-4 py-2 ${activeTab === tabName ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'} rounded-md transition-colors`;
  };

  const getWordCount = (text: string) => {
    if (!text) return 0;
    return text.split(/\s+/).filter(word => word.length > 0).length;
  };

  const policyWordCount = getWordCount(policyContent);

  return (
    <Dialog open={showPolicyContent} onOpenChange={setShowPolicyContent}>
      <DialogContent className="max-w-4xl w-full h-[80vh] p-0 bg-white">
        <DialogHeader className="px-6 py-4 border-b">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl">{selectedPolicy.name || 'Policy Document'}</DialogTitle>
              <DialogDescription className="text-sm text-gray-500 mt-1">
                Framework: {selectedPolicy.framework?.toUpperCase() || 'N/A'} | 
                Created: {new Date(selectedPolicy.created_at).toLocaleDateString()} | 
                Words: {policyWordCount}
              </DialogDescription>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowPolicyContent(false)}
              className="h-8 w-8 p-0 rounded-full"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>

        <Tabs defaultValue="policy" className="w-full h-full flex flex-col">
          <div className="px-6 pt-4 border-b">
            <TabsList className="bg-gray-100">
              <TabsTrigger value="policy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                Policy Document
              </TabsTrigger>
              {riskAssessment && (
                <TabsTrigger value="risk" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Risk Assessment
                </TabsTrigger>
              )}
              {implementationGuide && (
                <TabsTrigger value="implementation" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Implementation
                </TabsTrigger>
              )}
              {gapsAnalysis && (
                <TabsTrigger value="gaps" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Gaps Analysis
                </TabsTrigger>
              )}
              {aiSuggestions && (
                <TabsTrigger value="ai" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  AI Suggestions
                </TabsTrigger>
              )}
            </TabsList>
          </div>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="policy" className="h-full m-0 data-[state=active]:flex flex-col">
              <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
                <div className="prose max-w-none">
                  <ReactMarkdown>{policyContent}</ReactMarkdown>
                </div>
              </div>
              <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                <div className="text-sm text-gray-500">
                  {policyWordCount} words
                </div>
                <Button 
                  onClick={() => handleDownloadPolicy(selectedPolicy, 'policy')}
                  className="ml-auto"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="risk" className="h-full m-0 data-[state=active]:flex flex-col">
              <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
                <div className="prose max-w-none">
                  <ReactMarkdown>{riskAssessment}</ReactMarkdown>
                </div>
              </div>
              <div className="p-4 border-t bg-gray-50 flex justify-end">
                <Button 
                  onClick={() => handleDownloadPolicy(selectedPolicy, 'risk')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="implementation" className="h-full m-0 data-[state=active]:flex flex-col">
              <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
                <div className="prose max-w-none">
                  <ReactMarkdown>{implementationGuide}</ReactMarkdown>
                </div>
              </div>
              <div className="p-4 border-t bg-gray-50 flex justify-end">
                <Button 
                  onClick={() => handleDownloadPolicy(selectedPolicy, 'implementation')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="gaps" className="h-full m-0 data-[state=active]:flex flex-col">
              <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
                <div className="prose max-w-none">
                  <ReactMarkdown>{gapsAnalysis}</ReactMarkdown>
                </div>
              </div>
              <div className="p-4 border-t bg-gray-50 flex justify-end">
                <Button 
                  onClick={() => handleDownloadPolicy(selectedPolicy, 'gaps')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="ai" className="h-full m-0 data-[state=active]:flex flex-col">
              <div className="flex-1 overflow-y-auto px-6 py-4 bg-white">
                <div className="prose max-w-none">
                  <ReactMarkdown>{aiSuggestions}</ReactMarkdown>
                </div>
              </div>
              <div className="p-4 border-t bg-gray-50 flex justify-end">
                <Button 
                  onClick={() => handleDownloadPolicy(selectedPolicy, 'ai')}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyContentDialog;
