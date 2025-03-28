
import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';
import PolicyGeneratorForm from './PolicyGeneratorForm';
import PolicyContentDialog from './PolicyContentDialog';
import { supabase } from '@/integrations/supabase/client';

interface PolicyFormData {
  companyName: string;
  industry: string;
  companySize: string;
  dataTypes: string;
  businessLocation: string;
  infrastructureDetails: string;
  securityControls: string[];
  riskAppetite: string;
}

interface Policy {
  id: string;
  name: string;
  created_at: string;
  framework: string;
  company: string;
  policy_content: string;
  riskAssessment: string;
  implementationGuide: string;
  gapsAnalysis: string;
  aiSuggestions: string;
}

interface PoliciesSectionProps {
  frameworkId: string;
}

const PoliciesSection: React.FC<PoliciesSectionProps> = ({ frameworkId }) => {
  const [showPolicyGenerator, setShowPolicyGenerator] = useState(false);
  const [policyFormData, setPolicyFormData] = useState<PolicyFormData>({
    companyName: '',
    industry: '',
    companySize: '',
    dataTypes: '',
    businessLocation: '',
    infrastructureDetails: '',
    securityControls: [],
    riskAppetite: 'Moderate'
  });
  const [generatingPolicy, setGeneratingPolicy] = useState(false);
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [showPolicyContent, setShowPolicyContent] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);

  const frameworkName = 
    frameworkId === 'iso27001' ? 'ISO 27001' : 
    frameworkId === 'soc2' ? 'SOC 2' : 
    frameworkId === 'gdpr' ? 'GDPR' : 
    frameworkId === 'hipaa' ? 'HIPAA' : 
    frameworkId === 'pci_dss' ? 'PCI DSS' : 'Compliance';

  const handlePolicyFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPolicyFormData({ ...policyFormData, [name]: value });
  };

  const handleSecurityControlChange = (controlName: string) => {
    const updatedControls = policyFormData.securityControls.includes(controlName)
      ? policyFormData.securityControls.filter(control => control !== controlName)
      : [...policyFormData.securityControls, controlName];
    
    setPolicyFormData({
      ...policyFormData,
      securityControls: updatedControls
    });
  };

  const handleGeneratePolicy = async () => {
    if (!policyFormData.companyName || !policyFormData.industry || !policyFormData.companySize || !policyFormData.dataTypes) {
      toast.error('Please fill in all required fields');
      return;
    }

    setGeneratingPolicy(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      
      const organizationId = null;

      // Create a timeout promise that rejects after 30 seconds
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 30000);
      });
      
      // Create the fetch promise
      const fetchPromise = supabase.functions.invoke('generate-policy', {
        body: {
          companyName: policyFormData.companyName,
          industry: policyFormData.industry,
          companySize: policyFormData.companySize,
          dataTypes: policyFormData.dataTypes,
          frameworkType: frameworkId,
          businessLocation: policyFormData.businessLocation,
          infrastructureDetails: policyFormData.infrastructureDetails,
          securityControls: policyFormData.securityControls,
          riskAppetite: policyFormData.riskAppetite,
          organizationId,
          userId
        }
      });
      
      // Race the two promises
      const { data, error } = await Promise.race([
        fetchPromise,
        timeoutPromise.then(() => {
          throw new Error('Request timed out. The policy generation may take longer than expected. Please try again.');
        })
      ]) as any;

      if (error) {
        throw error;
      }

      console.log('Policy generated successfully', data);

      if (userId) {
        const { error: insertError } = await supabase
          .from('generated_policies')
          .insert({
            organization_id: organizationId,
            framework_type: frameworkId,
            policy_content: data.formattedPolicy,
            risk_assessment: data.riskAssessment,
            implementation_guide: data.implementationGuide,
            gaps_analysis: data.gapsAnalysis,
            ai_suggestions: data.aiSuggestions,
            created_by: userId
          });
          
        if (insertError) {
          console.error("Error saving policy to database:", insertError);
        }
      }

      const newPolicy = {
        id: Date.now().toString(),
        name: `${frameworkId.toUpperCase()} Policy - ${policyFormData.companyName}`,
        created_at: new Date().toISOString(),
        framework: frameworkId,
        company: policyFormData.companyName,
        policy_content: data.formattedPolicy,
        riskAssessment: data.riskAssessment,
        implementationGuide: data.implementationGuide,
        gapsAnalysis: data.gapsAnalysis,
        aiSuggestions: data.aiSuggestions
      };

      setPolicies([newPolicy, ...policies]);
      setShowPolicyGenerator(false);
      toast.success('Policy generated successfully');
    } catch (error) {
      console.error('Error generating policy:', error);
      toast.error('Failed to generate policy. Please try again.');
    } finally {
      setGeneratingPolicy(false);
    }
  };

  const viewPolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setShowPolicyContent(true);
  };

  const handleDownloadPolicy = (policy: any, section: string) => {
    let content = '';
    let filename = '';
    let title = '';
    
    if (section === 'policy') {
      content = policy.content || policy.policy_content;
      filename = `${policy.name || 'policy'}-document.pdf`;
      title = policy.name || 'Policy Document';
    } else if (section === 'risk') {
      content = policy.riskAssessment;
      filename = `${policy.name || 'policy'}-risk-assessment.pdf`;
      title = `Risk Assessment - ${policy.name || 'Policy Document'}`;
    } else if (section === 'implementation') {
      content = policy.implementationGuide;
      filename = `${policy.name || 'policy'}-implementation-guide.pdf`;
      title = `Implementation Guide - ${policy.name || 'Policy Document'}`;
    } else if (section === 'gaps') {
      content = policy.gapsAnalysis;
      filename = `${policy.name || 'policy'}-gaps-analysis.pdf`;
      title = `Gaps Analysis - ${policy.name || 'Policy Document'}`;
    } else if (section === 'ai') {
      content = policy.aiSuggestions;
      filename = `${policy.name || 'policy'}-ai-suggestions.pdf`;
      title = `AI Suggestions - ${policy.name || 'Policy Document'}`;
    }
    
    import('@/utils/pdfGenerator').then(module => {
      module.downloadPolicyAsPDF(content, filename, title);
    });
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{frameworkName} Policy Generator</h2>
          <p className="text-gray-600">
            Generate customized compliance policies based on your organization's profile
          </p>
          <Button
            className="mt-4"
            onClick={() => setShowPolicyGenerator(true)}
          >
            Launch Policy Generator
          </Button>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium mb-4">Recent Policies</h3>
          
          {policies.length > 0 ? (
            <div className="space-y-3">
              {policies.map((policy) => (
                <div key={policy.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium">{policy.name}</h4>
                    <p className="text-sm text-gray-500">Created: {new Date(policy.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      leftIcon={<FileText size={16} />}
                      onClick={() => viewPolicy(policy)}
                    >
                      View
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      leftIcon={<Download size={16} />}
                      onClick={() => handleDownloadPolicy(policy, 'policy')}
                    >
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-hidden bg-gray-50 rounded-lg border border-gray-200">
              <div className="px-4 py-5 sm:p-6">
                <div className="text-center">
                  <p className="mt-1 text-sm text-gray-500">
                    No policies have been generated yet. Use the policy generator to create your first policy.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Dialog open={showPolicyGenerator} onOpenChange={setShowPolicyGenerator}>
        <PolicyGeneratorForm 
          frameworkId={frameworkId}
          policyFormData={policyFormData}
          setPolicyFormData={setPolicyFormData}
          handlePolicyFormChange={handlePolicyFormChange}
          handleSecurityControlChange={handleSecurityControlChange}
          handleGeneratePolicy={handleGeneratePolicy}
          generatingPolicy={generatingPolicy}
          onClose={() => setShowPolicyGenerator(false)}
        />
      </Dialog>

      <PolicyContentDialog 
        showPolicyContent={showPolicyContent}
        setShowPolicyContent={setShowPolicyContent}
        selectedPolicy={selectedPolicy}
        handleDownloadPolicy={handleDownloadPolicy}
      />
    </>
  );
};

export default PoliciesSection;
