
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Button from '@/components/common/Button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

interface Policy {
  title: string;
  content: string;
  description?: string;
  status?: string;
  pages?: number;
  company?: string;
}

interface PolicyViewerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  policies: Policy[];
}

const PolicyViewerDialog: React.FC<PolicyViewerDialogProps> = ({
  isOpen,
  onClose,
  policies
}) => {
  const [activePolicy, setActivePolicy] = useState(0);

  const handleDownload = async (policy: Policy) => {
    try {
      const pdfGenerator = await import('@/utils/pdfGenerator');
      pdfGenerator.downloadPolicyAsPDF(
        policy.content, 
        `${policy.title.replace(/\s+/g, '-').toLowerCase()}.pdf`, 
        policy.title
      );
      toast.success(`${policy.title} downloaded`);
    } catch (error) {
      console.error('Error downloading policy:', error);
      toast.error('Failed to download policy');
    }
  };

  const handleDownloadAll = async () => {
    try {
      const pdfGenerator = await import('@/utils/pdfGenerator');
      
      // Create a combined PDF title
      const combinedTitle = policies[0]?.company 
        ? `All Policies for ${policies[0].company}` 
        : 'All Compliance Policies';
      
      // Add a header for each section in the combined content
      let combinedContent = '# Combined Compliance Policies\n\n';
      
      // Add each policy with a section header
      policies.forEach(policy => {
        combinedContent += `## ${policy.title}\n\n${policy.content}\n\n---\n\n`;
      });
      
      // Download the combined PDF
      pdfGenerator.downloadPolicyAsPDF(
        combinedContent,
        'all-compliance-policies.pdf',
        combinedTitle
      );
      
      toast.success('All policies downloaded successfully');
    } catch (error) {
      console.error('Error downloading all policies:', error);
      toast.error('Failed to download all policies');
    }
  };

  if (!policies.length) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Compliance Policies</DialogTitle>
        </DialogHeader>
        
        <div className="py-3">
          <Tabs 
            defaultValue={`policy-${activePolicy}`} 
            onValueChange={(value) => setActivePolicy(parseInt(value.split('-')[1]))}
          >
            <TabsList className="mb-4">
              {policies.map((policy, index) => (
                <TabsTrigger key={index} value={`policy-${index}`}>
                  {policy.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {policies.map((policy, index) => (
              <TabsContent 
                key={index} 
                value={`policy-${index}`} 
                className="p-4 bg-gray-50 rounded border whitespace-pre-wrap"
              >
                <div className="prose max-w-none">
                  {policy.content.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={i} className="text-2xl font-bold mt-4 mb-2">{line.substring(2)}</h1>;
                    } else if (line.startsWith('## ')) {
                      return <h2 key={i} className="text-xl font-semibold mt-4 mb-2">{line.substring(3)}</h2>;
                    } else if (line.startsWith('### ')) {
                      return <h3 key={i} className="text-lg font-medium mt-3 mb-2">{line.substring(4)}</h3>;
                    } else if (line.startsWith('- ')) {
                      return <li key={i} className="ml-4">{line.substring(2)}</li>;
                    } else if (line.trim() === '') {
                      return <br key={i} />;
                    } else {
                      return <p key={i} className="my-2">{line}</p>;
                    }
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <DialogFooter className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between">
          <Button
            variant="secondary"
            leftIcon={<Download size={16} />}
            onClick={handleDownloadAll}
          >
            Download All Policies
          </Button>
          <Button
            variant="default"
            leftIcon={<Download size={16} />}
            onClick={() => handleDownload(policies[activePolicy])}
          >
            Download Current Policy
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyViewerDialog;
