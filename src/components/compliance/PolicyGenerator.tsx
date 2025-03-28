import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import { Card, CardContent } from '@/components/common/Card';
import { toast } from 'sonner';
import { Loader2, AlertCircle, FileText, Check, Waves } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

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
      
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData?.session?.user?.id;
      
      const organizationId = null;
      
      const { data, error } = await supabase.functions.invoke('generate-policy', {
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
          organizationId,
          userId
        }
      });
      
      if (error) {
        throw new Error(error.message);
      }

      console.log("Policy generation response:", data);

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
      
      toast.success(`${frameworkName} Policy has been generated successfully!`);
      setGenerationSuccess(true);
      
      setTimeout(() => {
        onComplete();
      }, 1000);
      
    } catch (err) {
      console.error('Policy generation error:', err);
      setError('Failed to generate policy. Please try again.');
      toast.error('Failed to generate policy');
    } finally {
      setGenerating(false);
    }
  };

  const renderStepOne = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Organization Details</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="companyName">
            Company Name <span className="text-red-500">*</span>
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Enter your company name"
            value={formValues.companyName}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="industry">
            Industry <span className="text-red-500">*</span>
          </label>
          <select
            id="industry"
            name="industry"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formValues.industry}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="companySize">
            Company Size <span className="text-red-500">*</span>
          </label>
          <select
            id="companySize"
            name="companySize"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formValues.companySize}
            onChange={handleInputChange}
            required
          >
            <option value="">Select company size</option>
            {companySize.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="businessLocation">
            Primary Business Location
          </label>
          <input
            id="businessLocation"
            name="businessLocation"
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md"
            placeholder="Country or region"
            value={formValues.businessLocation}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Data & Infrastructure</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="dataTypes">
            Types of Data Processed <span className="text-red-500">*</span>
          </label>
          <textarea
            id="dataTypes"
            name="dataTypes"
            className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
            placeholder="E.g., customer PII, health records, payment information, etc."
            value={formValues.dataTypes}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="infrastructureDetails">
            Infrastructure Details
          </label>
          <textarea
            id="infrastructureDetails"
            name="infrastructureDetails"
            className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
            placeholder="E.g., cloud services used, on-premises infrastructure, BYOD policies, etc."
            value={formValues.infrastructureDetails}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );

  const renderStepThree = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Security & Risk Profile</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Security Controls in Place
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {securityControlOptions.map(control => (
              <div key={control} className="flex items-center">
                <input
                  type="checkbox"
                  id={`control-${control}`}
                  className="mr-2"
                  checked={formValues.securityControls.includes(control)}
                  onChange={() => handleCheckboxChange(control)}
                />
                <label htmlFor={`control-${control}`}>{control}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="riskAppetite">
            Risk Appetite
          </label>
          <select
            id="riskAppetite"
            name="riskAppetite"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formValues.riskAppetite}
            onChange={handleInputChange}
          >
            {riskAppetiteOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Review & Generate</h2>
      
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <h3 className="font-medium mb-2">Organization Details</h3>
        <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <dt className="text-gray-500">Company Name:</dt>
            <dd>{formValues.companyName}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Industry:</dt>
            <dd>{formValues.industry}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Company Size:</dt>
            <dd>{formValues.companySize}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Location:</dt>
            <dd>{formValues.businessLocation || 'Not specified'}</dd>
          </div>
        </dl>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <h3 className="font-medium mb-2">Data & Infrastructure</h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-gray-500">Data Types:</dt>
            <dd>{formValues.dataTypes}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Infrastructure:</dt>
            <dd>{formValues.infrastructureDetails || 'Not specified'}</dd>
          </div>
        </dl>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <h3 className="font-medium mb-2">Security & Risk Profile</h3>
        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-gray-500">Security Controls:</dt>
            <dd>{formValues.securityControls.length > 0 ? formValues.securityControls.join(', ') : 'None selected'}</dd>
          </div>
          <div>
            <dt className="text-gray-500">Risk Appetite:</dt>
            <dd>{formValues.riskAppetite}</dd>
          </div>
        </dl>
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <p className="text-gray-600 mb-4">
          Our AI will generate the following documents based on your inputs:
        </p>
        <ul className="space-y-2">
          <li className="flex items-center">
            <Check size={16} className="text-green-500 mr-2" />
            <span>Comprehensive {frameworkName} Policy</span>
          </li>
          <li className="flex items-center">
            <Check size={16} className="text-green-500 mr-2" />
            <span>Risk Assessment Document</span>
          </li>
          <li className="flex items-center">
            <Check size={16} className="text-green-500 mr-2" />
            <span>Implementation Guide</span>
          </li>
          <li className="flex items-center">
            <Check size={16} className="text-green-500 mr-2" />
            <span>Compliance Gap Analysis</span>
          </li>
          <li className="flex items-center">
            <Check size={16} className="text-green-500 mr-2" />
            <span>AI-powered Improvement Suggestions</span>
          </li>
        </ul>
      </div>
    </div>
  );

  const renderStepIndicator = () => (
    <div className="mb-8">
      <ol className="flex items-center w-full">
        {[1, 2, 3, 4].map((step) => (
          <li key={step} className={`flex items-center ${step === currentStep ? 'text-blue-600' : step < currentStep ? 'text-green-600' : 'text-gray-500'}`}>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              step === currentStep 
                ? 'border-blue-600 text-blue-600' 
                : step < currentStep 
                  ? 'border-green-600 bg-green-600 text-white' 
                  : 'border-gray-500 text-gray-500'
            }`}>
              {step < currentStep ? <Check size={16} /> : step}
            </span>
            <span className="ml-2 text-sm hidden sm:inline">
              {step === 1 ? 'Organization' : 
               step === 2 ? 'Data' : 
               step === 3 ? 'Security' : 'Review'}
            </span>
            {step < 4 && (
              <div className={`flex-1 h-0.5 mx-2 ${step < currentStep ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStepOne();
      case 2:
        return renderStepTwo();
      case 3:
        return renderStepThree();
      case 4:
        return renderReview();
      default:
        return null;
    }
  };

  if (generating) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="mb-4">
              <Waves size={48} className="text-blue-600 animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Generating Your {frameworkName} Compliance Package</h2>
            <p className="text-gray-600 text-center mb-6">
              Our AI is crafting customized policy documents based on your organization's profile. This may take a minute...
            </p>
            <div className="w-full max-w-md mb-4 bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full animate-progress"></div>
            </div>
            <p className="text-sm text-gray-500">
              <Loader2 size={16} className="inline mr-2 animate-spin" />
              Building comprehensive compliance policies and guides
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (generationSuccess) {
    return (
      <Card>
        <CardContent className="p-8">
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check size={32} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Generation Complete!</h2>
            <p className="text-gray-600 text-center mb-6">
              Your {frameworkName} compliance package has been successfully generated.
            </p>
            <Button leftIcon={<FileText size={16} />} onClick={onComplete}>
              View Your Generated Policies
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">{frameworkName} Policy Generator</h1>
          <p className="text-gray-600">
            AI will generate customized policies for your organization based on the {frameworkName} framework
          </p>
        </div>
        
        {renderStepIndicator()}
        
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded-md flex items-start">
              <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          {renderStepContent()}
          
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
            {currentStep > 1 ? (
              <Button 
                type="button" 
                variant="outline" 
                onClick={prevStep}
              >
                Previous
              </Button>
            ) : (
              <div></div>
            )}
            
            {currentStep < 4 ? (
              <Button 
                type="button" 
                onClick={nextStep}
              >
                Next
              </Button>
            ) : (
              <Button 
                type="submit"
                leftIcon={<FileText size={16} />}
              >
                Generate Policies
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PolicyGenerator;
