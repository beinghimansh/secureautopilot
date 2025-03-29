
import React from 'react';
import { Download, Eye, FileText, AlertCircle, BarChart, Award, FileText2 } from 'lucide-react';
import { Card, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Policy {
  id: string;
  name: string;
  created_at: string;
  framework: string;
  content?: string;
  policy_content?: string;
  status?: string;
}

interface PolicyDownloaderProps {
  policies: Policy[];
  onViewPolicy: (policy: Policy) => void;
}

const PolicyDownloader: React.FC<PolicyDownloaderProps> = ({ policies, onViewPolicy }) => {
  const navigate = useNavigate();

  if (policies.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Policies Found</h3>
            <p className="text-gray-500 mb-4">You haven't generated any policies yet.</p>
            <Button onClick={() => navigate('/compliance')}>
              Generate Your First Policy
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleDownload = (policy: Policy, section: string) => {
    import('@/utils/pdfGenerator').then(module => {
      let content = '';
      let filename = '';
      let title = '';
      
      switch (section) {
        case 'policy':
          content = policy.content || policy.policy_content || '';
          filename = `${policy.name.replace(/\s+/g, '-').toLowerCase()}-document.pdf`;
          title = `${policy.name} - Policy Document`;
          break;
        case 'risk':
          content = policy.riskAssessment || policy.risk_assessment || '';
          filename = `${policy.name.replace(/\s+/g, '-').toLowerCase()}-risk-assessment.pdf`;
          title = `${policy.name} - Risk Assessment`;
          break;
        case 'implementation':
          content = policy.implementationGuide || policy.implementation_guide || '';
          filename = `${policy.name.replace(/\s+/g, '-').toLowerCase()}-implementation-guide.pdf`;
          title = `${policy.name} - Implementation Guide`;
          break;
        case 'gaps':
          content = policy.gapsAnalysis || policy.gaps_analysis || '';
          filename = `${policy.name.replace(/\s+/g, '-').toLowerCase()}-gaps-analysis.pdf`;
          title = `${policy.name} - Gaps Analysis`;
          break;
        case 'ai':
          content = policy.aiSuggestions || policy.ai_suggestions || '';
          filename = `${policy.name.replace(/\s+/g, '-').toLowerCase()}-ai-suggestions.pdf`;
          title = `${policy.name} - AI Suggestions`;
          break;
      }

      if (!content) {
        toast.error(`No content available for ${section} section`);
        return;
      }

      try {
        module.downloadPolicyAsPDF(content, filename, title);
        toast.success(`Downloaded ${title} successfully`);
      } catch (error) {
        console.error('Error downloading policy:', error);
        toast.error('Failed to download policy');
      }
    }).catch(error => {
      console.error('Error importing PDF generator:', error);
      toast.error('Failed to load PDF generator module');
    });
  };

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Your Policies</h2>
        
        <div className="space-y-4">
          {policies.map((policy) => (
            <div 
              key={policy.id} 
              className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium text-lg">{policy.name}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-600">
                    <span>Framework: {policy.framework.toUpperCase()}</span>
                    <span>•</span>
                    <span>Created: {new Date(policy.created_at).toLocaleDateString()}</span>
                    {policy.status && (
                      <>
                        <span>•</span>
                        <span className="capitalize">Status: {policy.status}</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => onViewPolicy(policy)}
                    leftIcon={<Eye size={16} />}
                  >
                    View
                  </Button>
                  
                  <div className="relative group">
                    <Button 
                      size="sm"
                      variant="outline"
                      leftIcon={<Download size={16} />}
                      onClick={() => handleDownload(policy, 'policy')}
                    >
                      Download
                    </Button>
                    
                    <div className="absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-md shadow-lg z-10 hidden group-hover:block">
                      <div className="p-2">
                        <button
                          onClick={() => handleDownload(policy, 'policy')}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          <span>Policy Document</span>
                        </button>
                        <button
                          onClick={() => handleDownload(policy, 'risk')}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center"
                        >
                          <AlertCircle className="w-4 h-4 mr-2" />
                          <span>Risk Assessment</span>
                        </button>
                        <button
                          onClick={() => handleDownload(policy, 'implementation')}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center"
                        >
                          <Award className="w-4 h-4 mr-2" />
                          <span>Implementation Guide</span>
                        </button>
                        <button
                          onClick={() => handleDownload(policy, 'gaps')}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center"
                        >
                          <BarChart className="w-4 h-4 mr-2" />
                          <span>Gaps Analysis</span>
                        </button>
                        <button
                          onClick={() => handleDownload(policy, 'ai')}
                          className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 flex items-center"
                        >
                          <FileText2 className="w-4 h-4 mr-2" />
                          <span>AI Suggestions</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicyDownloader;
