
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
                {policy.content}
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <DialogFooter>
          <Button
            variant="outline"
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
