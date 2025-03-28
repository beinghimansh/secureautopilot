
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import PolicyFormWrapper from './generator/PolicyFormWrapper';
import GenerationProgress from './generator/GenerationProgress';
import GenerationSuccess from './generator/GenerationSuccess';

interface PolicyGeneratorProps {
  frameworkId: string;
  onComplete: () => void;
}

interface FormValues {
  companyName: string;
  industry: string;
  companySize: string;
  dataTypes: string;
  businessLocation: string;
  infrastructureDetails: string;
  securityControls: string[];
  riskAppetite: string;
}

// Data options
const industries = [
  'Technology',
  'Healthcare',
  'Finance',
  'Retail',
  'Manufacturing',
  'Education',
  'Government',
  'Professional Services',
  'Media & Entertainment',
  'Telecommunications',
  'Transportation',
  'Energy',
  'Hospitality'
];

const companySize = [
  '1-10 employees',
  '11-50 employees',
  '51-250 employees',
  '251-500 employees',
  '501-1000 employees',
  '1000+ employees'
];

const securityControlOptions = [
  'Access Control',
  'Encryption',
  'Firewalls',
  'Anti-virus',
  'Multi-factor Authentication',
  'Backup Systems',
  'Incident Response',
  'Physical Security',
  'Vulnerability Management',
  'Security Awareness Training'
];

const riskAppetiteOptions = [
  'Low (Risk Averse)',
  'Moderate',
  'High (Risk Tolerant)'
];

const PolicyGenerator: React.FC<PolicyGeneratorProps> = ({ frameworkId, onComplete }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationSuccess, setGenerationSuccess] = useState(false);
  const [formValues, setFormValues] = useState<FormValues>({
    companyName: '',
    industry: '',
    companySize: '',
    dataTypes: '',
    businessLocation: '',
    infrastructureDetails: '',
    securityControls: [],
    riskAppetite: 'Moderate'
  });
  
  const frameworkName = 
    frameworkId === 'iso27001' ? 'ISO 27001' : 
    frameworkId === 'soc2' ? 'SOC 2' : 
    frameworkId === 'gdpr' ? 'GDPR' : 
    frameworkId === 'hipaa' ? 'HIPAA' : 
    frameworkId === 'pci_dss' ? 'PCI DSS' : 'Compliance';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleCheckboxChange = (controlName: string) => {
    const updatedControls = formValues.securityControls.includes(controlName)
      ? formValues.securityControls.filter(control => control !== controlName)
      : [...formValues.securityControls, controlName];
    
    setFormValues({
      ...formValues,
      securityControls: updatedControls
    });
  };

  const validateStep = (step: number) => {
    setError(null);
    
    if (step === 1) {
      if (!formValues.companyName || !formValues.industry || !formValues.companySize) {
        setError('Please fill in all required fields');
        return false;
      }
    }
    
    if (step === 2) {
      if (!formValues.dataTypes) {
        setError('Please specify what types of data your organization processes');
        return false;
      }
    }
    
    return true;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) {
      return;
    }
    
    try {
      setGenerating(true);
      setError(null);
      
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      
      // Store the company profile data
      try {
        console.log("Storing company profile data...");
        const { error: companyError } = await supabase
          .from('company_profiles')
          .upsert({
            name: formValues.companyName,
            industry: formValues.industry,
            company_size: formValues.companySize,
            data_types: formValues.dataTypes,
            business_location: formValues.businessLocation,
            infrastructure_details: formValues.infrastructureDetails,
            security_controls: formValues.securityControls,
            risk_appetite: formValues.riskAppetite,
            created_by: userId,
            updated_at: new Date().toISOString()
          });
          
        if (companyError) {
          console.error("Error saving company profile data:", companyError);
        } else {
          console.log("Company profile data saved successfully");
        }
      } catch (profileError) {
        console.error("Failed to store company profile:", profileError);
      }
      
      // Simulate OpenAI API call
      console.log("Simulating policy generation...");
      
      // Create the policy content with company name and other form values
      const policyContent = `# ${frameworkName} Policy for ${formValues.companyName}

## 1. Introduction
This ${frameworkName} policy is designed specifically for ${formValues.companyName}, a ${formValues.industry} company with ${formValues.companySize}.

## 2. Scope
This policy applies to all systems, people, and processes that constitute the organization's information systems, including management, employees, suppliers, and other third parties who have access to ${formValues.companyName}'s systems.

## 3. Data Types
This policy covers the following types of data processed by the organization:
${formValues.dataTypes}

## 4. Risk Approach
${formValues.companyName} has a ${formValues.riskAppetite} risk appetite and implements controls accordingly.

## 5. Security Controls
The following security controls are implemented:
${formValues.securityControls.map(control => `- ${control}`).join('\n')}

## 6. Infrastructure Details
${formValues.infrastructureDetails || 'Standard infrastructure setup with appropriate security measures.'}

## 7. Compliance Requirements
As a ${formValues.industry} organization operating in ${formValues.businessLocation || 'various locations'}, ${formValues.companyName} is committed to maintaining ${frameworkName} compliance.
`;

      // Risk assessment with company name
      const riskAssessment = `# Risk Assessment for ${formValues.companyName}

## 1. Critical Assets
- Customer data
- Financial information
- Intellectual property specific to ${formValues.industry}

## 2. Threats and Vulnerabilities
- Unauthorized access
- Data breach
- System failures
- ${formValues.industry}-specific threats

## 3. Risk Mitigation
- Regular security training
- System updates and patches
- Network monitoring
- Controls appropriate for ${formValues.riskAppetite} risk appetite
`;

      // Implementation guide with company name
      const implementationGuide = `# Implementation Guide for ${formValues.companyName}

## Timeline
1. Initial Assessment: 2 weeks
2. Policy Development: 4 weeks
3. Implementation: 8 weeks
4. Training: 2 weeks
5. Auditing: Ongoing

## Key Steps
- Establish security team within ${formValues.companyName}
- Conduct risk assessment specific to ${formValues.industry} sector
- Develop policies and procedures
- Implement controls
- Train staff on ${frameworkName} requirements
- Monitor and review compliance status
`;

      // Store the generated policy in the database
      if (userId) {
        try {
          console.log("Storing generated policy locally...");
          const { error: insertError } = await supabase
            .from('generated_policies')
            .insert({
              organization_id: null,
              framework_type: frameworkId,
              policy_content: policyContent,
              risk_assessment: riskAssessment,
              implementation_guide: implementationGuide,
              gaps_analysis: `# Gaps Analysis for ${formValues.companyName}\n\nCustomized gaps analysis based on ${frameworkName} requirements for ${formValues.industry} sector.`,
              ai_suggestions: `# AI Suggestions for ${formValues.companyName}\n\nAI-powered improvement suggestions for optimizing ${frameworkName} compliance in a ${formValues.industry} organization.`,
              created_by: userId
            });
            
          if (insertError) {
            console.error("Error saving policy to database:", insertError);
          } else {
            console.log("Policy saved to database successfully");
          }
        } catch (dbError) {
          console.error("Database error:", dbError);
        }
      }
      
      // Simulate policy generation delay
      setTimeout(() => {
        toast.success(`${frameworkName} Policy has been generated successfully for ${formValues.companyName}!`);
        setGenerationSuccess(true);
        
        setTimeout(() => {
          onComplete();
        }, 1500);
      }, 3000);
      
    } catch (err: any) {
      console.error('Policy generation error:', err);
      
      let errorMessage = 'Failed to generate policy. Please try again.';
      
      if (err.message && typeof err.message === 'string') {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setGenerating(false);
    }
  };

  if (generating) {
    return <GenerationProgress frameworkName={frameworkName} />;
  }

  if (generationSuccess) {
    return <GenerationSuccess frameworkName={frameworkName} onComplete={onComplete} />;
  }

  return (
    <PolicyFormWrapper
      frameworkName={frameworkName}
      currentStep={currentStep}
      formValues={formValues}
      error={error}
      handleInputChange={handleInputChange}
      handleCheckboxChange={handleCheckboxChange}
      handleSubmit={handleSubmit}
      prevStep={prevStep}
      nextStep={nextStep}
      industries={industries}
      companySizes={companySize}
      securityControlOptions={securityControlOptions}
      riskAppetiteOptions={riskAppetiteOptions}
    />
  );
};

export default PolicyGenerator;
