
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Card, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { FileText, Plus, Filter, Download, Eye } from 'lucide-react';
import PolicyContentDialog from '@/components/compliance/policies/PolicyContentDialog';
import PolicyDownloader from '@/components/compliance/policies/PolicyDownloader';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Policy {
  id: string;
  name: string;
  content?: string;
  policy_content?: string;
  riskAssessment?: string;
  implementationGuide?: string;
  gapsAnalysis?: string;
  aiSuggestions?: string;
  created_at: string;
  framework: string;
  company?: string;
  status?: string;
}

const Policies = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [showPolicyContent, setShowPolicyContent] = useState(false);
  
  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        // First try to fetch from Supabase if available
        const { data: supabasePolicies, error } = await supabase
          .from('generated_policies')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Map Supabase data to the policy format
        if (supabasePolicies && supabasePolicies.length > 0) {
          const formattedPolicies = supabasePolicies.map(policy => ({
            id: policy.id,
            name: `${policy.framework_type.toUpperCase()} Policy`,
            content: policy.policy_content,
            policy_content: policy.policy_content,
            riskAssessment: policy.risk_assessment,
            implementationGuide: policy.implementation_guide,
            gapsAnalysis: policy.gaps_analysis,
            aiSuggestions: policy.ai_suggestions,
            created_at: policy.created_at,
            framework: policy.framework_type,
            status: 'active'
          }));
          
          setPolicies(formattedPolicies);
        } else {
          // Fallback to dummy data if no policies in database
          setPolicies([
            {
              id: '1',
              name: 'ISO 27001 Information Security Policy',
              policy_content: '# ISO 27001 Information Security Policy\n\n## 1. Introduction\nThis Information Security Policy outlines the security controls and procedures established to protect our organization\'s information assets.\n\n## 2. Scope\nThis policy applies to all employees, contractors, and third parties who have access to company information.\n\n## 3. Security Controls\n- Access Control\n- Risk Assessment\n- Asset Management\n- Incident Response\n\n## 4. Compliance\nRegular audits will be conducted to ensure compliance with this policy.',
              riskAssessment: '# Risk Assessment for ISO 27001\n\n## Critical Assets\n- Customer data\n- Financial information\n- Intellectual property\n\n## Threats and Vulnerabilities\n- Unauthorized access\n- Data breach\n- System failures\n\n## Risk Mitigation\n- Regular security training\n- System updates and patches\n- Network monitoring',
              implementationGuide: '# Implementation Guide\n\n## Timeline\n1. Initial Assessment: 2 weeks\n2. Policy Development: 4 weeks\n3. Implementation: 8 weeks\n4. Training: 2 weeks\n5. Auditing: Ongoing\n\n## Key Steps\n- Establish security team\n- Conduct risk assessment\n- Develop policies and procedures\n- Implement controls\n- Train staff\n- Monitor and review',
              gapsAnalysis: '# Gaps Analysis\n\n## Current Controls\n- Basic access controls\n- Limited monitoring\n\n## Required Controls\n- Comprehensive access management\n- Regular security testing\n- Incident response plan\n- Employee training program\n\n## Action Items\n1. Develop formal security policies\n2. Implement multi-factor authentication\n3. Establish regular security assessments\n4. Create incident response procedures',
              created_at: '2023-08-15T10:30:00Z',
              framework: 'iso27001',
              status: 'active'
            },
            {
              id: '2',
              name: 'GDPR Data Protection Policy',
              policy_content: '# GDPR Data Protection Policy\n\n## 1. Purpose\nThis policy ensures our organization complies with the General Data Protection Regulation (GDPR).\n\n## 2. Data Processing Principles\n- Lawfulness, fairness, and transparency\n- Purpose limitation\n- Data minimization\n- Accuracy\n- Storage limitation\n- Integrity and confidentiality\n\n## 3. Data Subject Rights\n- Right to access\n- Right to rectification\n- Right to erasure\n- Right to restrict processing\n- Right to data portability\n- Right to object',
              riskAssessment: '# Risk Assessment for GDPR Compliance\n\n## Data Processing Activities\n- Customer data collection\n- Marketing communications\n- Employee records\n\n## Risk Areas\n- Consent management\n- Data retention\n- Third-party data sharing\n\n## Mitigation Strategies\n- Clear privacy notices\n- Data minimization practices\n- Regular data protection impact assessments',
              implementationGuide: '# GDPR Implementation Guide\n\n## Implementation Steps\n1. Data mapping: 3 weeks\n2. Privacy notice updates: 2 weeks\n3. Consent mechanism development: 4 weeks\n4. Process documentation: 3 weeks\n\n## Key Actions\n- Appoint Data Protection Officer\n- Update privacy policies\n- Implement consent management\n- Establish data breach procedures\n- Train staff on GDPR requirements',
              gapsAnalysis: '# GDPR Compliance Gaps\n\n## Current State\n- Basic privacy policy\n- Limited consent records\n- Informal data retention\n\n## GDPR Requirements\n- Comprehensive privacy notices\n- Demonstrable consent\n- Formal retention schedules\n- Data subject rights procedures\n\n## Action Items\n1. Develop detailed privacy notices\n2. Implement consent management system\n3. Create data retention schedule\n4. Establish data subject request process',
              created_at: '2023-09-02T14:45:00Z',
              framework: 'gdpr',
              status: 'draft'
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
        toast.error("Failed to load policies");
        
        // Fallback to dummy data on error
        setPolicies([
          {
            id: '1',
            name: 'ISO 27001 Information Security Policy',
            policy_content: '# ISO 27001 Information Security Policy\n\n## 1. Introduction\nThis Information Security Policy outlines the security controls and procedures established to protect our organization\'s information assets.\n\n## 2. Scope\nThis policy applies to all employees, contractors, and third parties who have access to company information.\n\n## 3. Security Controls\n- Access Control\n- Risk Assessment\n- Asset Management\n- Incident Response\n\n## 4. Compliance\nRegular audits will be conducted to ensure compliance with this policy.',
            riskAssessment: '# Risk Assessment for ISO 27001\n\n## Critical Assets\n- Customer data\n- Financial information\n- Intellectual property\n\n## Threats and Vulnerabilities\n- Unauthorized access\n- Data breach\n- System failures\n\n## Risk Mitigation\n- Regular security training\n- System updates and patches\n- Network monitoring',
            implementationGuide: '# Implementation Guide\n\n## Timeline\n1. Initial Assessment: 2 weeks\n2. Policy Development: 4 weeks\n3. Implementation: 8 weeks\n4. Training: 2 weeks\n5. Auditing: Ongoing\n\n## Key Steps\n- Establish security team\n- Conduct risk assessment\n- Develop policies and procedures\n- Implement controls\n- Train staff\n- Monitor and review',
            gapsAnalysis: '# Gaps Analysis\n\n## Current Controls\n- Basic access controls\n- Limited monitoring\n\n## Required Controls\n- Comprehensive access management\n- Regular security testing\n- Incident response plan\n- Employee training program\n\n## Action Items\n1. Develop formal security policies\n2. Implement multi-factor authentication\n3. Establish regular security assessments\n4. Create incident response procedures',
            created_at: '2023-08-15T10:30:00Z',
            framework: 'iso27001',
            status: 'active'
          },
          {
            id: '2',
            name: 'GDPR Data Protection Policy',
            policy_content: '# GDPR Data Protection Policy\n\n## 1. Purpose\nThis policy ensures our organization complies with the General Data Protection Regulation (GDPR).\n\n## 2. Data Processing Principles\n- Lawfulness, fairness, and transparency\n- Purpose limitation\n- Data minimization\n- Accuracy\n- Storage limitation\n- Integrity and confidentiality\n\n## 3. Data Subject Rights\n- Right to access\n- Right to rectification\n- Right to erasure\n- Right to restrict processing\n- Right to data portability\n- Right to object',
            riskAssessment: '# Risk Assessment for GDPR Compliance\n\n## Data Processing Activities\n- Customer data collection\n- Marketing communications\n- Employee records\n\n## Risk Areas\n- Consent management\n- Data retention\n- Third-party data sharing\n\n## Mitigation Strategies\n- Clear privacy notices\n- Data minimization practices\n- Regular data protection impact assessments',
            implementationGuide: '# GDPR Implementation Guide\n\n## Implementation Steps\n1. Data mapping: 3 weeks\n2. Privacy notice updates: 2 weeks\n3. Consent mechanism development: 4 weeks\n4. Process documentation: 3 weeks\n\n## Key Actions\n- Appoint Data Protection Officer\n- Update privacy policies\n- Implement consent management\n- Establish data breach procedures\n- Train staff on GDPR requirements',
            gapsAnalysis: '# GDPR Compliance Gaps\n\n## Current State\n- Basic privacy policy\n- Limited consent records\n- Informal data retention\n\n## GDPR Requirements\n- Comprehensive privacy notices\n- Demonstrable consent\n- Formal retention schedules\n- Data subject rights procedures\n\n## Action Items\n1. Develop detailed privacy notices\n2. Implement consent management system\n3. Create data retention schedule\n4. Establish data subject request process',
            created_at: '2023-09-02T14:45:00Z',
            framework: 'gdpr',
            status: 'draft'
          }
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicies();
  }, []);

  const handleViewPolicy = (policy: Policy) => {
    setSelectedPolicy(policy);
    setShowPolicyContent(true);
  };

  const handleDownloadPolicy = (policy: any, section: string) => {
    import('@/utils/pdfGenerator').then(module => {
      let content = '';
      let filename = '';
      let title = '';
      
      switch (section) {
        case 'policy':
          content = policy.content || policy.policy_content;
          filename = `${policy.name || 'policy'}-document.pdf`;
          title = policy.name || 'Policy Document';
          break;
        case 'risk':
          content = policy.riskAssessment;
          filename = `${policy.name || 'policy'}-risk-assessment.pdf`;
          title = `Risk Assessment - ${policy.name || 'Policy Document'}`;
          break;
        case 'implementation':
          content = policy.implementationGuide;
          filename = `${policy.name || 'policy'}-implementation-guide.pdf`;
          title = `Implementation Guide - ${policy.name || 'Policy Document'}`;
          break;
        case 'gaps':
          content = policy.gapsAnalysis;
          filename = `${policy.name || 'policy'}-gaps-analysis.pdf`;
          title = `Gaps Analysis - ${policy.name || 'Policy Document'}`;
          break;
        case 'ai':
          content = policy.aiSuggestions;
          filename = `${policy.name || 'policy'}-ai-suggestions.pdf`;
          title = `AI Suggestions - ${policy.name || 'Policy Document'}`;
          break;
      }

      try {
        if (content) {
          module.downloadPolicyAsPDF(content, filename, title);
          toast.success(`Downloaded ${title} successfully`);
        } else {
          toast.error(`No content available for ${section} section`);
        }
      } catch (error) {
        console.error("Error downloading policy:", error);
        toast.error("Failed to download policy");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <PageTransition>
            <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight mb-2">Policies</h1>
                  <p className="text-gray-600">Manage your compliance policies and documentation</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button leftIcon={<Filter size={16} />} variant="outline">
                    Filter
                  </Button>
                  <Button leftIcon={<Plus size={16} />} onClick={() => toast.info('Navigate to Compliance page to generate new policies')}>
                    New Policy
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6">
                <PolicyDownloader 
                  policies={policies}
                  onViewPolicy={handleViewPolicy}
                />
              </div>
            </div>
          </PageTransition>
        </main>
      </div>

      {/* Policy Viewer Dialog */}
      <PolicyContentDialog 
        showPolicyContent={showPolicyContent}
        setShowPolicyContent={setShowPolicyContent}
        selectedPolicy={selectedPolicy}
        handleDownloadPolicy={handleDownloadPolicy}
      />
    </div>
  );
};

export default Policies;
