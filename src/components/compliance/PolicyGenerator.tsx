
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
      
      // First, store the company profile data directly in the component
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
      
      // Create a timeout promise that rejects after 30 seconds
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timed out')), 30000);
      });
      
      // Create the fetch promise
      const fetchPromise = supabase.functions.invoke('generate-policy', {
        body: {
          companyName: formValues.companyName,
          industry: formValues.industry,
          companySize: formValues.companySize,
          dataTypes: formValues.dataTypes,
          frameworkType: frameworkId,
          businessLocation: formValues.businessLocation,
          infrastructureDetails: formValues.infrastructureDetails,
          securityControls: formValues.securityControls,
          riskAppetite: formValues.riskAppetite,
          organizationId: null,
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
        console.error("Edge function error:", error);
        throw new Error(error.message);
      }

      if (!data) {
        throw new Error("No data returned from policy generation");
      }

      console.log("Policy generation response:", data);

      if (data.error) {
        throw new Error(data.error);
      }

      // Store the generated policy in the database if it wasn't already stored by the edge function
      if (userId && !data.policyId) {
        try {
          console.log("Storing generated policy locally...");
          const { error: insertError } = await supabase
            .from('generated_policies')
            .insert({
              organization_id: null,
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
          } else {
            console.log("Policy saved to database successfully");
          }
        } catch (dbError) {
          console.error("Database error:", dbError);
        }
      }
      
      toast.success(`${frameworkName} Policy has been generated successfully!`);
      setGenerationSuccess(true);
      
      setTimeout(() => {
        onComplete();
      }, 1500);
      
    } catch (err: any) {
      console.error('Policy generation error:', err);
      
      let errorMessage = 'Failed to generate policy. Please try again.';
      
      if (err.message.includes('timed out')) {
        errorMessage = 'Request timed out. The policy generation may take longer than expected. Please try again.';
      } else if (err instanceof Error) {
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
