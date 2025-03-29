
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import { Eye, Download, ArrowLeft, FileText } from 'lucide-react';
import { toast } from 'sonner';
import PolicyViewerDialog from '@/components/compliance/policies/PolicyViewerDialog';
import { supabase } from '@/integrations/supabase/client';

interface GeneratedPoliciesProps {
  frameworkId: string | null;
  onBackToFrameworks: () => void;
}

interface Policy {
  title: string;
  description: string;
  status: string;
  pages: number;
  content: string;
}

interface GeneratedPolicy {
  id: string;
  created_at: string;
  framework_type: string;
  policy_content: string;
  risk_assessment: string;
  implementation_guide: string;
  gaps_analysis: string;
  ai_suggestions: string;
}

const GeneratedPolicies: React.FC<GeneratedPoliciesProps> = ({ 
  frameworkId, 
  onBackToFrameworks 
}) => {
  const navigate = useNavigate();
  const [showPolicyViewer, setShowPolicyViewer] = useState(false);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const frameworkName = 
    frameworkId === 'iso27001' ? 'ISO 27001' : 
    frameworkId === 'soc2' ? 'SOC 2' : 
    frameworkId === 'gdpr' ? 'GDPR' : 
    frameworkId === 'hipaa' ? 'HIPAA' : 
    frameworkId === 'pci_dss' ? 'PCI DSS' : 'Compliance';
  
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setIsLoading(true);
        
        if (!frameworkId) {
          throw new Error('No framework ID provided');
        }
        
        // Fetch the most recently generated policy for this framework
        const { data, error } = await supabase
          .from('generated_policies')
          .select('*')
          .eq('framework_type', frameworkId)
          .order('created_at', { ascending: false })
          .limit(1);
          
        if (error) {
          throw error;
        }
        
        if (data && data.length > 0) {
          const policy = data[0];
          
          // Create policies from different sections
          const generatedPolicies: Policy[] = [
            {
              title: 'Information Security Policy',
              description: 'Defines how your organization manages, protects and distributes information',
              status: 'Ready for review',
              pages: Math.floor(policy.policy_content.length / 500), // Rough estimate
              content: policy.policy_content
            }
          ];
          
          // Add Risk Assessment if available
          if (policy.risk_assessment) {
            generatedPolicies.push({
              title: 'Risk Assessment',
              description: 'Analysis of potential risks and vulnerabilities to your organization',
              status: 'Ready for review',
              pages: Math.floor(policy.risk_assessment.length / 500),
              content: policy.risk_assessment
            });
          }
          
          // Add Implementation Guide if available
          if (policy.implementation_guide) {
            generatedPolicies.push({
              title: 'Implementation Guide',
              description: 'Procedures for implementing security controls and compliance requirements',
              status: 'Ready for review',
              pages: Math.floor(policy.implementation_guide.length / 500),
              content: policy.implementation_guide
            });
          }
          
          // Add Gaps Analysis if available
          if (policy.gaps_analysis) {
            generatedPolicies.push({
              title: 'Gaps Analysis',
              description: 'Identification of compliance gaps and recommended actions',
              status: 'Ready for review',
              pages: Math.floor(policy.gaps_analysis.length / 500),
              content: policy.gaps_analysis
            });
          }
          
          setPolicies(generatedPolicies);
        } else {
          // If no policies found, use default ones
          setPolicies([
            {
              title: 'Information Security Policy',
              description: 'Defines how your organization manages, protects and distributes information',
              status: 'Ready for review',
              pages: 12,
              content: `# ${frameworkName} Policy\n\n## 1. Introduction\nThis Policy outlines the security controls and procedures established to protect our organization's information assets.\n\n## 2. Scope\nThis policy applies to all employees, contractors, and third parties who have access to company information.\n\n## 3. Security Controls\n- Access Control\n- Risk Assessment\n- Asset Management\n- Incident Response\n\n## 4. Compliance\nRegular audits will be conducted to ensure compliance with this policy.`
            },
            {
              title: 'Risk Assessment',
              description: 'Analysis of potential risks and vulnerabilities to your organization',
              status: 'Ready for review',
              pages: 8,
              content: `# Risk Assessment\n\n## 1. Critical Assets\n- Customer data\n- Financial information\n- Intellectual property\n\n## 2. Threats and Vulnerabilities\n- Unauthorized access\n- Data breach\n- System failures\n\n## 3. Risk Mitigation\n- Regular security training\n- System updates and patches\n- Network monitoring`
            }
          ]);
        }
      } catch (error) {
        console.error('Error fetching policy data:', error);
        toast.error('Failed to load policy data');
        
        // Use default policies if there's an error
        setPolicies([
          {
            title: 'Information Security Policy',
            description: 'Defines how your organization manages, protects and distributes information',
            status: 'Ready for review',
            pages: 12,
            content: `# ${frameworkName} Policy\n\n## 1. Introduction\nThis Policy outlines the security controls and procedures established to protect our organization's information assets.\n\n## 2. Scope\nThis policy applies to all employees, contractors, and third parties who have access to company information.\n\n## 3. Security Controls\n- Access Control\n- Risk Assessment\n- Asset Management\n- Incident Response\n\n## 4. Compliance\nRegular audits will be conducted to ensure compliance with this policy.`
          },
          {
            title: 'Risk Assessment',
            description: 'Analysis of potential risks and vulnerabilities to your organization',
            status: 'Ready for review',
            pages: 8,
            content: `# Risk Assessment\n\n## 1. Critical Assets\n- Customer data\n- Financial information\n- Intellectual property\n\n## 2. Threats and Vulnerabilities\n- Unauthorized access\n- Data breach\n- System failures\n\n## 3. Risk Mitigation\n- Regular security training\n- System updates and patches\n- Network monitoring`
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPolicies();
  }, [frameworkId, frameworkName]);
  
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
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
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
                      <FileText size={20} className="text-blue-600" />
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
        </>
      )}

      {/* Policy Viewer Dialog */}
      <PolicyViewerDialog
        isOpen={showPolicyViewer}
        onClose={() => setShowPolicyViewer(false)}
        policies={policies.map(p => ({ title: p.title, content: p.content }))}
      />
    </div>
  );
};

export default GeneratedPolicies;
