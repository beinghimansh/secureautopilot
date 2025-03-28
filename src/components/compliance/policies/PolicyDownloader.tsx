
import React from 'react';
import { Download, Eye, File, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import { downloadPolicyAsPDF } from '@/utils/pdfGenerator';

interface PolicyDownloaderProps {
  policies: any[];
  onViewPolicy: (policy: any) => void;
}

const PolicyDownloader: React.FC<PolicyDownloaderProps> = ({ policies, onViewPolicy }) => {
  const handleDownload = (policy: any, contentType: string = 'policy_content', fileName: string = 'policy.pdf') => {
    try {
      // Determine which content to download
      let content;
      let title;
      
      switch (contentType) {
        case 'policy_content':
          content = policy.content || policy.policy_content;
          title = `${policy.name} - Policy Document`;
          fileName = `${policy.name.replace(/\s+/g, '-').toLowerCase()}-document.pdf`;
          break;
        case 'risk_assessment':
          content = policy.riskAssessment;
          title = `${policy.name} - Risk Assessment`;
          fileName = `${policy.name.replace(/\s+/g, '-').toLowerCase()}-risk-assessment.pdf`;
          break;
        case 'implementation_guide':
          content = policy.implementationGuide;
          title = `${policy.name} - Implementation Guide`;
          fileName = `${policy.name.replace(/\s+/g, '-').toLowerCase()}-implementation-guide.pdf`;
          break;
        case 'gaps_analysis':
          content = policy.gapsAnalysis;
          title = `${policy.name} - Gap Analysis`;
          fileName = `${policy.name.replace(/\s+/g, '-').toLowerCase()}-gap-analysis.pdf`;
          break;
        default:
          content = policy.content || policy.policy_content;
          title = `${policy.name} - Document`;
          fileName = `${policy.name.replace(/\s+/g, '-').toLowerCase()}-document.pdf`;
      }
      
      if (!content) {
        throw new Error(`No content available for ${contentType}`);
      }
      
      // Generate and download the PDF
      const success = downloadPolicyAsPDF(content, fileName, title);
      
      if (success) {
        toast.success(`Successfully downloaded ${title}`);
      } else {
        throw new Error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error downloading policy:', error);
      toast.error('Failed to download policy. Please try again.');
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Generated Policies</h2>
        
        {policies.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <FileText size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No policies found</h3>
            <p className="text-gray-500 mb-4">You haven't generated any policies yet.</p>
            <Button variant="outline" onClick={() => toast.info('Navigate to the Policy Generator to create your first policy.')}>
              Create Your First Policy
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {policies.map((policy) => (
              <div key={policy.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center">
                    <File size={20} className="text-blue-600 mr-2 flex-shrink-0" />
                    <h3 className="font-medium text-lg">{policy.name}</h3>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  Created: {new Date(policy.created_at).toLocaleDateString()}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-3">
                  <Button 
                    size="sm" 
                    leftIcon={<Eye size={16} />}
                    onClick={() => onViewPolicy(policy)}
                  >
                    View Policy
                  </Button>
                  
                  <div className="dropdown relative inline-block">
                    <Button 
                      size="sm" 
                      variant="outline"
                      leftIcon={<Download size={16} />}
                      onClick={() => handleDownload(policy)}
                    >
                      Download PDF
                    </Button>
                    
                    {/* Dropdown for multiple download options */}
                    <div className="dropdown-menu hidden absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-10 py-1">
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                        onClick={() => handleDownload(policy, 'policy_content', `${policy.name}-document.pdf`)}
                      >
                        Policy Document
                      </button>
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                        onClick={() => handleDownload(policy, 'risk_assessment', `${policy.name}-risk-assessment.pdf`)}
                      >
                        Risk Assessment
                      </button>
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                        onClick={() => handleDownload(policy, 'implementation_guide', `${policy.name}-implementation-guide.pdf`)}
                      >
                        Implementation Guide
                      </button>
                      <button 
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" 
                        onClick={() => handleDownload(policy, 'gaps_analysis', `${policy.name}-gap-analysis.pdf`)}
                      >
                        Gap Analysis
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PolicyDownloader;
