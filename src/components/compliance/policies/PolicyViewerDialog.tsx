
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Download, FileText, AlertCircle, BarChart, Award } from 'lucide-react';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';

interface Policy {
  title: string;
  content: string;
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
  const [selectedPolicyIndex, setSelectedPolicyIndex] = useState(0);

  const handleDownload = () => {
    if (policies.length === 0 || !policies[selectedPolicyIndex]) {
      toast.error('No policy selected to download');
      return;
    }

    const policy = policies[selectedPolicyIndex];
    
    import('@/utils/pdfGenerator').then(module => {
      try {
        module.downloadPolicyAsPDF(
          policy.content,
          `${policy.title.replace(/\s+/g, '-').toLowerCase()}.pdf`,
          policy.title
        );
        toast.success(`Downloaded ${policy.title} successfully`);
      } catch (error) {
        console.error('Error downloading policy:', error);
        toast.error('Failed to download policy');
      }
    }).catch(error => {
      console.error('Error importing PDF generator:', error);
      toast.error('Failed to load PDF generator module');
    });
  };

  if (policies.length === 0) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <DialogTitle className="text-xl">
            Policy Viewer
            {policies[selectedPolicyIndex]?.company && (
              <span className="text-gray-500 text-base ml-2">
                - {policies[selectedPolicyIndex].company}
              </span>
            )}
          </DialogTitle>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid grid-cols-3 gap-4 flex-grow overflow-hidden">
          <div className="col-span-1 border-r pr-4 overflow-auto">
            <div className="font-medium mb-2">Available Policies</div>
            <div className="space-y-2">
              {policies.map((policy, index) => (
                <button
                  key={index}
                  className={`w-full text-left p-2 rounded-md transition-colors ${
                    selectedPolicyIndex === index
                      ? 'bg-blue-100 text-blue-800'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedPolicyIndex(index)}
                >
                  {policy.title}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-2 overflow-auto">
            <div className="bg-white rounded-md border border-gray-200 overflow-auto h-full p-4">
              <div className="prose prose-sm max-w-none markdown-content">
                <ReactMarkdown>
                  {policies[selectedPolicyIndex]?.content || ''}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handleDownload}
            leftIcon={<Download size={16} />}
          >
            Download Policy
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PolicyViewerDialog;
