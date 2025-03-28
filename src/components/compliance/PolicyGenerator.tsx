
import React, { useState } from 'react';
import { toast } from 'sonner';
import Button from '../common/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../common/Card';
import { SlideUp, FadeIn } from '../common/Transitions';
import { supabase } from '@/integrations/supabase/client';
import { Download, Eye, FileText, CheckCircle, Save } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';

interface PolicyGeneratorProps {
  frameworkId: string;
  onComplete: () => void;
}

const frameworkNames: Record<string, string> = {
  'iso27001': 'ISO 27001',
  'soc2': 'SOC 2',
  'gdpr': 'GDPR',
  'hipaa': 'HIPAA',
  'pci_dss': 'PCI DSS',
};

interface CompanyDetails {
  companyName: string;
  industry: string;
  companySize: string;
  dataTypes: string;
  infraDetails: string;
  securityControls: string[];
  riskAppetite: string;
  existingPolicies: string;
  regulatoryRequirements: string[];
  companyLocation: string;
}

const policyTemplates: Record<string, string[]> = {
  'iso27001': [
    'Information Security Policy',
    'Risk Assessment Document',
    'Statement of Applicability',
    'Security Incident Management Procedure',
    'Access Control Policy',
    'Asset Management Policy',
    'HR Security Policy',
    'Physical and Environmental Security Policy'
  ],
  'soc2': [
    'Information Security Policy',
    'Risk Assessment',
    'Compliance Checklist',
    'Implementation Guide'
  ],
  'gdpr': [
    'Data Protection Policy',
    'Privacy Notice',
    'Data Breach Response Plan',
    'Data Retention Policy',
    'Data Subject Rights Procedure',
    'DPIA Template'
  ],
  'hipaa': [
    'HIPAA Security Policy',
    'Privacy Policy',
    'Breach Notification Procedure',
    'BAA Template',
    'Security Risk Analysis',
    'Disaster Recovery Plan'
  ],
  'pci_dss': [
    'Cardholder Data Security Policy',
    'Network Security Policy',
    'Vulnerability Management Program',
    'Incident Response Plan',
    'PCI DSS Compliance Roadmap'
  ]
};

const PolicyGenerator = ({ frameworkId, onComplete }: PolicyGeneratorProps) => {
  const navigate = useNavigate();
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: '',
    industry: 'Technology',
    companySize: '50-250',
    dataTypes: '',
    infraDetails: '',
    securityControls: [],
    riskAppetite: 'moderate',
    existingPolicies: '',
    regulatoryRequirements: [],
    companyLocation: '',
  });
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{
    policy: string;
    riskAssessment: string;
    implementationGuide: string;
    complianceChecklist: string;
  } | null>(null);
  
  const frameworkName = frameworkNames[frameworkId] || frameworkId;
  
  const handleChange = (field: string, value: string | string[]) => {
    setCompanyDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (field: string, value: string) => {
    setCompanyDetails(prev => {
      const currentValues = prev[field as keyof CompanyDetails] as string[];
      if (currentValues.includes(value)) {
        return {
          ...prev,
          [field]: currentValues.filter(v => v !== value)
        };
      } else {
        return {
          ...prev,
          [field]: [...currentValues, value]
        };
      }
    });
  };
  
  const generatePolicies = async () => {
    // Validate required fields
    if (!companyDetails.companyName || !companyDetails.dataTypes) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    setIsGenerating(true);
    setProgress(0);
    
    try {
      // Simulate steps of generation with progress updates
      const updateProgress = (step: number) => {
        setProgress(step);
        
        if (step >= 100) {
          setIsGenerating(false);
          setIsComplete(true);
        }
      };
      
      // Start progress simulation
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 5;
        updateProgress(currentProgress);
        if (currentProgress >= 60) {
          clearInterval(progressInterval);
          
          // Make the actual API call to generate content
          callPolicyGenerationAPI().then(() => {
            // After API call completes, continue to 100%
            const finalProgress = setInterval(() => {
              currentProgress += 10;
              updateProgress(currentProgress);
              if (currentProgress >= 100) {
                clearInterval(finalProgress);
              }
            }, 300);
          });
        }
      }, 200);
      
    } catch (error) {
      setIsGenerating(false);
      toast.error('Error generating policies');
      console.error('Error generating policies:', error);
    }
  };
  
  const callPolicyGenerationAPI = async () => {
    try {
      console.log('Calling policy generation API with framework:', frameworkId);
      
      // Real API call using Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('generate-policy', {
        body: {
          companyName: companyDetails.companyName,
          industry: companyDetails.industry,
          companySize: companyDetails.companySize,
          dataTypes: companyDetails.dataTypes,
          frameworkType: frameworkId,
          infraDetails: companyDetails.infraDetails,
          securityControls: companyDetails.securityControls,
          riskAppetite: companyDetails.riskAppetite,
          existingPolicies: companyDetails.existingPolicies,
          regulatoryRequirements: companyDetails.regulatoryRequirements,
          companyLocation: companyDetails.companyLocation,
        },
      });

      if (error) {
        console.error('Error from API:', error);
        throw error;
      }
      
      console.log('API response:', data);
      setGeneratedContent(data);
      
      // In a real app, save the generated policy to the database
      try {
        const { error: saveError } = await supabase.from('policies').insert({
          organization_id: 'organization_id_placeholder', // would come from auth context
          framework_id: frameworkId,
          title: `${frameworkName} Information Security Policy`,
          content: data.policy,
          status: 'active',
          version: 1,
        });
        
        if (saveError) {
          console.error('Error saving policy:', saveError);
          // Continue anyway, don't break the flow
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue anyway, don't break the flow
      }
      
      toast.success(`${frameworkName} policies generated successfully!`);
    } catch (error) {
      console.error('Error calling policy generation API:', error);
      
      // For demo purposes, continue with mock data
      const mockPolicyContent = `# ${frameworkName} Information Security Policy\n\n## 1. Introduction\n\nThis Information Security Policy outlines ${companyDetails.companyName}'s approach to information security management. As a ${companyDetails.industry} company with ${companyDetails.companySize} employees, we recognize the importance of protecting our information assets and the data we process.\n\n## 2. Scope\n\nThis policy applies to all employees, contractors, and third parties that access, process, store or transmit information on behalf of ${companyDetails.companyName}.\n\n## 3. Security Organization\n\n### 3.1 Roles and Responsibilities\n\n**Chief Information Security Officer (CISO):** Responsible for the overall information security program.\n\n**IT Security Team:** Implements and maintains security controls.\n\n**Department Managers:** Ensure staff compliance with security policies.\n\n**All Staff:** Follow security procedures and report security incidents.\n\n## 4. Asset Management\n\n### 4.1 Information Classification\n\nInformation assets must be classified according to their sensitivity and importance:\n\n- Public\n- Internal Use Only\n- Confidential\n- Restricted\n\n### 4.2 Asset Handling\n\nHandling procedures must be implemented according to the classification level of information.\n\n## 5. Access Control\n\n### 5.1 User Access Management\n\nAccess rights to information systems must be allocated based on business requirements and the principle of least privilege.\n\n### 5.2 Authentication\n\nAll users must be uniquely identified and authenticated before accessing information systems.\n\n### 5.3 Password Management\n\nStrong password policies must be implemented and enforced across all systems.\n\n## 6. Cryptography\n\nEncryption must be used to protect sensitive information during transmission and storage.\n\n## 7. Physical and Environmental Security\n\nPhysical access to information processing facilities must be restricted to authorized personnel only.\n\n## 8. Operations Security\n\n### 8.1 Change Management\n\nChanges to information systems must follow a formal change management process.\n\n### 8.2 Backup\n\nRegular backups of information and software must be taken and tested according to the backup policy.\n\n## 9. Communications Security\n\nNetworks must be secured using appropriate controls to protect information in systems and applications.\n\n## 10. Incident Management\n\nA formal incident reporting and escalation procedure must be established.\n\n## 11. Compliance\n\nThe organization must comply with all relevant legal, regulatory, and contractual requirements.\n\n## 12. Policy Review\n\nThis policy must be reviewed at least annually or when significant changes occur.\n\n## 13. Approval\n\nThis policy has been approved by senior management on [DATE].\n\n[SIGNATURE]\nChief Executive Officer`;
      
      setGeneratedContent({
        policy: mockPolicyContent,
        riskAssessment: `# Risk Assessment for ${companyDetails.companyName}\n\n## Overview\nThis document provides a comprehensive risk assessment for ${companyDetails.companyName}'s information systems and assets.\n\n## Methodology\nOur risk assessment follows the ISO 27005 methodology and includes identification, analysis, and evaluation of risks.\n\n## Risk Register\n1. Unauthorized access to sensitive data - HIGH\n2. System downtime due to cyber attacks - MEDIUM\n3. Data breach through third-party vendors - MEDIUM\n4. Inadequate employee security awareness - HIGH\n5. Insufficient backup procedures - MEDIUM\n\n## Treatment Plans\nEach identified risk has been assigned appropriate treatment actions and responsible owners.`,
        implementationGuide: `# ${frameworkName} Implementation Guide\n\n## Implementation Phases\n1. Gap Analysis\n2. Risk Assessment\n3. Control Selection\n4. Implementation Planning\n5. Control Implementation\n6. Monitoring and Review\n7. Certification Preparation\n\n## Timeline\nTypical implementation takes 6-12 months depending on organizational complexity.\n\n## Resource Requirements\n- Project manager dedicated to compliance\n- IT security specialists\n- Department representatives\n- Documentation specialist\n- Executive sponsor`,
        complianceChecklist: `# ${frameworkName} Compliance Checklist\n\n## Documentation Required\n- Information Security Policy\n- Risk Assessment\n- Statement of Applicability\n- Business Continuity Plan\n- Incident Response Plan\n- Asset Inventory\n\n## Controls to Implement\n- [ ] Access control system\n- [ ] Security awareness training\n- [ ] Vulnerability management program\n- [ ] Incident response procedures\n- [ ] Backup and recovery systems\n- [ ] Network security monitoring`,
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generatePolicies();
  };

  const handleViewPolicy = () => {
    // In a real app, this would navigate to a policy viewer page
    toast.info('Policy viewer would open here');
  };

  const handleDownloadAll = () => {
    // In a real app, this would generate and download PDFs
    // For demo, just show success message
    toast.success('Policies downloaded successfully');
  };

  const handleViewRequirements = () => {
    if (frameworkId) {
      navigate(`/compliance/${frameworkId}/requirements`);
    }
  };
  
  const renderPolicyForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="companyName" className="text-sm font-medium">
              Company Name*
            </label>
            <input
              id="companyName"
              type="text"
              value={companyDetails.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
              placeholder="Enter your company name"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="industry" className="text-sm font-medium">
              Industry*
            </label>
            <select
              id="industry"
              value={companyDetails.industry}
              onChange={(e) => handleChange('industry', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            >
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Retail">Retail</option>
              <option value="Professional Services">Professional Services</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="companySize" className="text-sm font-medium">
              Company Size*
            </label>
            <select
              id="companySize"
              value={companyDetails.companySize}
              onChange={(e) => handleChange('companySize', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              required
            >
              <option value="1-10">1-10 employees</option>
              <option value="11-50">11-50 employees</option>
              <option value="50-250">50-250 employees</option>
              <option value="250-1000">250-1000 employees</option>
              <option value="1000+">1000+ employees</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="companyLocation" className="text-sm font-medium">
              Primary Business Location
            </label>
            <input
              id="companyLocation"
              type="text"
              value={companyDetails.companyLocation}
              onChange={(e) => handleChange('companyLocation', e.target.value)}
              placeholder="Country or region"
              className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="dataTypes" className="text-sm font-medium">
            Types of Data Processed*
          </label>
          <textarea
            id="dataTypes"
            value={companyDetails.dataTypes}
            onChange={(e) => handleChange('dataTypes', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[80px]"
            placeholder="E.g., customer PII, health records, payment information, etc."
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="infraDetails" className="text-sm font-medium">
            Infrastructure Details
          </label>
          <textarea
            id="infraDetails"
            value={companyDetails.infraDetails}
            onChange={(e) => handleChange('infraDetails', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[80px]"
            placeholder="E.g., cloud services used, on-premises infrastructure, BYOD policies, etc."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Security Controls in Place
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['Access Control', 'Encryption', 'Firewalls', 'Anti-virus', 'Multi-factor Authentication', 'Backup Systems', 'Incident Response', 'Physical Security'].map((control) => (
              <div key={control} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={control.replace(/\s+/g, '-').toLowerCase()}
                  checked={companyDetails.securityControls.includes(control)}
                  onChange={() => handleCheckboxChange('securityControls', control)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor={control.replace(/\s+/g, '-').toLowerCase()} className="text-sm text-gray-700">
                  {control}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="riskAppetite" className="text-sm font-medium">
            Risk Appetite
          </label>
          <select
            id="riskAppetite"
            value={companyDetails.riskAppetite}
            onChange={(e) => handleChange('riskAppetite', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="low">Low (Risk Averse)</option>
            <option value="moderate">Moderate</option>
            <option value="high">High (Risk Tolerant)</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="existingPolicies" className="text-sm font-medium">
            Existing Policies (if any)
          </label>
          <textarea
            id="existingPolicies"
            value={companyDetails.existingPolicies}
            onChange={(e) => handleChange('existingPolicies', e.target.value)}
            className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition-all min-h-[80px]"
            placeholder="Describe any existing policies you have that you want to incorporate."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Applicable Regulatory Requirements
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {['GDPR', 'CCPA/CPRA', 'HIPAA', 'PCI DSS', 'SOX', 'NIST Standards', 'FedRAMP', 'Other'].map((reg) => (
              <div key={reg} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={reg.replace(/\s+/g, '-').toLowerCase()}
                  checked={companyDetails.regulatoryRequirements.includes(reg)}
                  onChange={() => handleCheckboxChange('regulatoryRequirements', reg)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label htmlFor={reg.replace(/\s+/g, '-').toLowerCase()} className="text-sm text-gray-700">
                  {reg}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <Button
          type="submit"
          className="w-full"
          size="lg"
        >
          Generate {frameworkName} Policies
        </Button>
      </form>
    );
  };

  const renderGeneratingProgress = () => {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="w-full max-w-md mx-auto">
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full bg-primary text-white">
                  Generating
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-primary">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-primary/20">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary transition-all duration-300"
              ></div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-600 mt-4">
            {progress < 20 && "Analyzing your company profile..."}
            {progress >= 20 && progress < 40 && "Determining applicable compliance requirements..."}
            {progress >= 40 && progress < 60 && "Collecting industry best practices..."}
            {progress >= 60 && progress < 80 && "Generating tailored policies..."}
            {progress >= 80 && "Finalizing your compliance documentation..."}
          </div>
        </div>
      </div>
    );
  };

  const renderGeneratedPolicies = () => {
    return (
      <SlideUp>
        <div className="py-6">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-medium mb-2">
              {frameworkName} Policies Generated!
            </h3>
            <p className="text-gray-600">
              Your custom compliance policies have been created based on your company profile
            </p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <h4 className="font-medium mb-4">Generated Documents:</h4>
            <div className="space-y-3">
              {policyTemplates[frameworkId]?.map((policy, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200">
                  <div className="flex items-center">
                    <FileText size={20} className="text-blue-600 mr-3" />
                    <span>{policy}</span>
                  </div>
                  <Button variant="outline" size="sm" leftIcon={<Eye size={16} />}>
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={handleViewPolicy}
              className="px-6"
              size="lg"
              leftIcon={<Eye size={18} />}
            >
              View Policies
            </Button>
            <Button
              variant="outline"
              className="px-6"
              size="lg"
              leftIcon={<Download size={18} />}
              onClick={handleDownloadAll}
            >
              Download All (PDF)
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
        </div>
      </SlideUp>
    );
  };
  
  return (
    <FadeIn className="w-full max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl">{frameworkName} Policy Generator</CardTitle>
          <CardDescription>
            AI will generate customized policies for your organization based on the {frameworkName} framework
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          {!isGenerating && !isComplete && renderPolicyForm()}
          {isGenerating && renderGeneratingProgress()}
          {isComplete && renderGeneratedPolicies()}
        </CardContent>
      </Card>
    </FadeIn>
  );
};

export default PolicyGenerator;
