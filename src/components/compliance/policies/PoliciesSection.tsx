
import React, { useState, useEffect } from 'react';
import { FileText, Download, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog } from "@/components/ui/dialog";
import { Card, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';
import PolicyGeneratorForm from './PolicyGeneratorForm';
import PolicyContentDialog from './PolicyContentDialog';
import PolicyViewerDialog from './PolicyViewerDialog';
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
  const [showPolicyViewer, setShowPolicyViewer] = useState(false);
  const [allPolicies, setAllPolicies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const frameworkName = 
    frameworkId === 'iso27001' ? 'ISO 27001' : 
    frameworkId === 'soc2' ? 'SOC 2' : 
    frameworkId === 'gdpr' ? 'GDPR' : 
    frameworkId === 'hipaa' ? 'HIPAA' : 
    frameworkId === 'pci_dss' ? 'PCI DSS' : 'Compliance';

  useEffect(() => {
    fetchPolicies();
  }, [frameworkId]);

  const fetchPolicies = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('generated_policies')
        .select('*')
        .eq('framework_type', frameworkId)
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        const formattedPolicies = data.map((policy: GeneratedPolicy) => ({
          id: policy.id,
          name: `${policy.framework_type.toUpperCase()} Policy`,
          created_at: policy.created_at,
          framework: policy.framework_type,
          company: extractCompanyNameFromPolicy(policy.policy_content),
          policy_content: policy.policy_content,
          riskAssessment: policy.risk_assessment,
          implementationGuide: policy.implementation_guide,
          gapsAnalysis: policy.gaps_analysis,
          aiSuggestions: policy.ai_suggestions
        }));

        setPolicies(formattedPolicies);
      }
    } catch (error) {
      console.error('Error fetching policies:', error);
      toast.error('Failed to fetch policies');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to extract company name from policy content
  const extractCompanyNameFromPolicy = (content: string): string => {
    if (!content) return 'Unknown Company';
    
    // Look for company name in typical policy title formats
    const titleMatches = content.match(/Policy (Document )?for[\s:]+(.*?)(\n|$)/i);
    if (titleMatches && titleMatches[2]) {
      return titleMatches[2].trim();
    }
    
    // Try looking for "Company:" format
    const companyMatches = content.match(/Company:[\s]+(.*?)(\n|$)/i);
    if (companyMatches && companyMatches[1]) {
      return companyMatches[1].trim();
    }
    
    return 'Unknown Company';
  };

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

      toast.info('Generating comprehensive compliance policy... This may take a moment', {
        duration: 5000
      });

      // Call the comprehensive policy generation edge function
      const { data, error } = await supabase.functions.invoke('generate-comprehensive-policy', {
        body: {
          frameworkType: frameworkId,
          organizationName: policyFormData.companyName,
          companySize: policyFormData.companySize,
          industry: policyFormData.industry,
          businessLocation: policyFormData.businessLocation || 'Not specified',
          dataTypes: policyFormData.dataTypes,
          riskAppetite: policyFormData.riskAppetite,
          infrastructureDetails: policyFormData.infrastructureDetails || 'Not specified',
          securityControls: policyFormData.securityControls.join(', ')
        }
      });

      if (error) {
        throw error;
      }

      console.log('Policy generated successfully', data);

      // Store the generated policy in the database
      try {
        const { data: insertData, error: insertError } = await supabase
          .from('generated_policies')
          .insert({
            organization_id: organizationId,
            framework_type: frameworkId,
            policy_content: data.policy_content,
            risk_assessment: `# Risk Assessment for ${policyFormData.companyName}\n\nBased on ${frameworkId.toUpperCase()} requirements and analysis of the provided information.`,
            implementation_guide: `# Implementation Guide for ${policyFormData.companyName}\n\nSteps to implement ${frameworkId.toUpperCase()} controls within your organization.`,
            gaps_analysis: `# Gaps Analysis for ${policyFormData.companyName}\n\nCustomized gaps analysis based on ${frameworkId.toUpperCase()} requirements.`,
            ai_suggestions: `# AI Suggestions for ${policyFormData.companyName}\n\nAI-powered improvement suggestions for optimizing ${frameworkId.toUpperCase()} compliance.`,
            created_by: userId
          })
          .select();

        if (insertError) {
          console.error("Error saving policy to database:", insertError);
          throw insertError;
        }

        const newPolicy = {
          id: insertData[0].id,
          name: `${frameworkId.toUpperCase()} Policy - ${policyFormData.companyName}`,
          created_at: insertData[0].created_at,
          framework: frameworkId,
          company: policyFormData.companyName,
          policy_content: data.policy_content,
          riskAssessment: `# Risk Assessment for ${policyFormData.companyName}\n\nBased on ${frameworkId.toUpperCase()} requirements and analysis of the provided information.`,
          implementationGuide: `# Implementation Guide for ${policyFormData.companyName}\n\nSteps to implement ${frameworkId.toUpperCase()} controls within your organization.`,
          gapsAnalysis: `# Gaps Analysis for ${policyFormData.companyName}\n\nCustomized gaps analysis based on ${frameworkId.toUpperCase()} requirements.`,
          aiSuggestions: `# AI Suggestions for ${policyFormData.companyName}\n\nAI-powered improvement suggestions for optimizing ${frameworkId.toUpperCase()} compliance.`
        };

        setPolicies([newPolicy, ...policies]);
        setShowPolicyGenerator(false);
        toast.success('Comprehensive policy generated successfully');
        
        // Automatically show the newly generated policy
        setSelectedPolicy(newPolicy);
        setShowPolicyContent(true);
        
        // Refresh policies from database
        fetchPolicies();
      } catch (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }
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

  const handleViewAllPolicies = () => {
    if (policies.length === 0) {
      toast.error('No policies available to view');
      return;
    }
    
    const policiesForViewer = policies.map(policy => ({
      title: policy.name,
      content: policy.policy_content,
      company: policy.company
    }));
    
    setAllPolicies(policiesForViewer);
    setShowPolicyViewer(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">{frameworkName} Policy Generator</h2>
          <p className="text-gray-600 mb-6">
            Generate customized compliance policies based on your organization's profile
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              onClick={() => setShowPolicyGenerator(true)}
              leftIcon={<FileText size={16} />}
            >
              Generate New Policy
            </Button>
            <Button
              variant="outline"
              onClick={handleViewAllPolicies}
              leftIcon={<FileText size={16} />}
              disabled={policies.length === 0}
            >
              View All Policies
            </Button>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium mb-4">Recent Policies</h3>
          
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : policies.length > 0 ? (
            <div className="space-y-3">
              {policies.map((policy) => (
                <div key={policy.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-medium">{policy.name} {policy.company && `- ${policy.company}`}</h4>
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
      
      <PolicyViewerDialog
        isOpen={showPolicyViewer}
        onClose={() => setShowPolicyViewer(false)}
        policies={allPolicies}
      />
    </>
  );
};

export default PoliciesSection;
