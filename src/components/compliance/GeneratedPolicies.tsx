
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import { Eye, Download, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import PolicyViewerDialog from '@/components/compliance/policies/PolicyViewerDialog';
import { supabase } from '@/integrations/supabase/client';

interface GeneratedPoliciesProps {
  frameworkId: string | null;
  onBackToFrameworks: () => void;
}

const GeneratedPolicies: React.FC<GeneratedPoliciesProps> = ({ 
  frameworkId, 
  onBackToFrameworks 
}) => {
  const navigate = useNavigate();
  const [showPolicyViewer, setShowPolicyViewer] = useState(false);
  const [policies, setPolicies] = useState([
    {
      title: 'Information Security Policy',
      description: 'Defines how your organization manages, protects and distributes information',
      status: 'Ready for review',
      pages: 12,
      content: `# Information Security Policy\n\n## 1. Introduction\nThis Information Security Policy outlines the security controls and procedures established to protect our organization's information assets.\n\n## 2. Scope\nThis policy applies to all employees, contractors, and third parties who have access to company information.\n\n## 3. Security Controls\n- Access Control\n- Risk Assessment\n- Asset Management\n- Incident Response\n\n## 4. Compliance\nRegular audits will be conducted to ensure compliance with this policy.`
    },
    {
      title: 'Risk Assessment',
      description: 'Analysis of potential risks and vulnerabilities to your organization',
      status: 'Ready for review',
      pages: 8,
      content: `# Risk Assessment\n\n## 1. Critical Assets\n- Customer data\n- Financial information\n- Intellectual property\n\n## 2. Threats and Vulnerabilities\n- Unauthorized access\n- Data breach\n- System failures\n\n## 3. Risk Mitigation\n- Regular security training\n- System updates and patches\n- Network monitoring`
    },
    {
      title: 'Access Control Policy',
      description: 'Procedures for controlling access to information and systems',
      status: 'Ready for review',
      pages: 6,
      content: `# Access Control Policy\n\n## 1. Purpose\nThis policy establishes the rules for access control to protect information systems.\n\n## 2. Access Control Principles\n- Least privilege\n- Separation of duties\n- Need to know\n\n## 3. User Access Management\n- User registration\n- Privilege management\n- Password management\n\n## 4. System Access Control\n- Network access control\n- Operating system access control\n- Application access control`
    },
    {
      title: 'Incident Response Plan',
      description: 'Procedures to detect, respond to and recover from security incidents',
      status: 'Ready for review',
      pages: 10,
      content: `# Incident Response Plan\n\n## 1. Introduction\nThis plan outlines the procedures for responding to security incidents.\n\n## 2. Incident Response Team\n- Roles and responsibilities\n- Contact information\n\n## 3. Incident Response Phases\n- Preparation\n- Detection and Analysis\n- Containment\n- Eradication\n- Recovery\n- Post-incident activity\n\n## 4. Communication Plan\n- Internal communication\n- External communication\n- Legal and regulatory reporting`
    }
  ]);
  
  const handleViewPolicies = () => {
    setShowPolicyViewer(true);
  };
  
  const handleDownloadPolicies = async () => {
    try {
      // Import the PDF generator utility dynamically
      const pdfGenerator = await import('@/utils/pdfGenerator');
      
      // Create a combined PDF of all policies
      const allPoliciesContent = policies.map(policy => policy.content).join('\n\n---\n\n');
      pdfGenerator.downloadPolicyAsPDF(
        allPoliciesContent, 
        `${frameworkId}-all-policies.pdf`, 
        `${frameworkId?.toUpperCase()} Policies`
      );
      
      toast.success('All policies downloaded successfully');
    } catch (error) {
      console.error('Error downloading policies:', error);
      toast.error('Failed to download policies. Please try again.');
    }
  };

  const handleViewRequirements = () => {
    if (frameworkId) {
      navigate(`/compliance/${frameworkId}/requirements`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold mb-2">Policies Generated Successfully!</h2>
        <p className="text-gray-600 mb-4">
          Your compliance policies have been generated and are ready for review
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {policies.map((policy, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-lg">{policy.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{policy.description}</p>
                <div className="flex items-center mt-3">
                  <span className="inline-flex items-center text-xs bg-green-100 text-green-800 rounded-full px-2 py-1">
                    <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                    {policy.status}
                  </span>
                  <span className="text-xs text-gray-500 ml-2">{policy.pages} pages</span>
                </div>
              </div>
              <div className="flex">
                <button 
                  className="text-gray-500 hover:text-primary"
                  onClick={() => {
                    import('@/utils/pdfGenerator').then(module => {
                      module.downloadPolicyAsPDF(
                        policy.content, 
                        `${policy.title.replace(/\s+/g, '-').toLowerCase()}.pdf`, 
                        policy.title
                      );
                      toast.success(`${policy.title} downloaded`);
                    });
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button
          leftIcon={<Eye size={18} />}
          onClick={handleViewPolicies}
        >
          View Policies
        </Button>
        <Button
          variant="outline"
          leftIcon={<Download size={18} />}
          onClick={handleDownloadPolicies}
        >
          Download All (PDF)
        </Button>
        <Button 
          variant="outline"
          leftIcon={<ArrowLeft size={18} />}
          onClick={onBackToFrameworks}
        >
          Back to Frameworks
        </Button>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <h3 className="text-xl font-medium mb-4">Next Steps</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-blue-800 mb-3">Ready to implement these policies? View and manage your compliance requirements:</p>
          <Button onClick={handleViewRequirements}>
            View Compliance Requirements
          </Button>
        </div>
      </div>

      {/* Policy Viewer Dialog */}
      <PolicyViewerDialog
        isOpen={showPolicyViewer}
        onClose={() => setShowPolicyViewer(false)}
        policies={policies}
      />
    </div>
  );
};

export default GeneratedPolicies;
