
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PolicyGeneratorSteps } from './generator/PolicyGeneratorSteps';
import OrganizationStep from './generator/OrganizationStep';
import DataInfrastructureStep from './generator/DataInfrastructureStep';
import SecurityRiskStep from './generator/SecurityRiskStep';
import ReviewStep from './generator/ReviewStep';
import GenerationProgress from './generator/GenerationProgress';
import GenerationSuccess from './generator/GenerationSuccess';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useFrameworkName } from './hooks/useFrameworkName';

interface PolicyGeneratorProps {
  frameworkId: string;
  onComplete?: () => void;
  onClose?: () => void;
}

const PolicyGenerator: React.FC<PolicyGeneratorProps> = ({ frameworkId, onComplete, onClose }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [formData, setFormData] = useState({
    organization: {
      companyName: '',
      industry: '',
      companySize: '',
      businessLocation: ''
    },
    dataInfrastructure: {
      dataTypes: '',
      infrastructureDetails: ''
    },
    securityRisk: {
      securityControls: [] as string[],
      riskAppetite: 'Moderate'
    }
  });
  
  const frameworkName = useFrameworkName(frameworkId);
  
  const handleStepComplete = (step: number, data: any) => {
    if (step === 1) {
      setFormData({ ...formData, organization: data });
    } else if (step === 2) {
      setFormData({ ...formData, dataInfrastructure: data });
    } else if (step === 3) {
      setFormData({ ...formData, securityRisk: data });
    }
    
    if (step < 4) {
      setCurrentStep(step + 1);
    } else {
      startGeneration();
    }
  };
  
  const startGeneration = () => {
    setIsGenerating(true);
    
    // Simulate AI generation (would connect to OpenAI in production)
    setTimeout(() => {
      setIsGenerating(false);
      setIsCompleted(true);
    }, 5000);
  };
  
  const handleBackToFrameworks = () => {
    if (onClose) {
      onClose();
    } else {
      navigate('/compliance');
    }
  };
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    } else {
      navigate('/compliance');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (currentStep === 1) {
      setFormData({
        ...formData,
        organization: {
          ...formData.organization,
          [name]: value
        }
      });
    } else if (currentStep === 2) {
      setFormData({
        ...formData,
        dataInfrastructure: {
          ...formData.dataInfrastructure,
          [name]: value
        }
      });
    } else if (currentStep === 3) {
      setFormData({
        ...formData,
        securityRisk: {
          ...formData.securityRisk,
          [name]: value
        }
      });
    }
  };

  const handleCheckboxChange = (controlName: string) => {
    const updatedControls = formData.securityRisk.securityControls.includes(controlName)
      ? formData.securityRisk.securityControls.filter(control => control !== controlName)
      : [...formData.securityRisk.securityControls, controlName];
    
    setFormData({
      ...formData,
      securityRisk: {
        ...formData.securityRisk,
        securityControls: updatedControls
      }
    });
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  const renderStep = () => {
    if (isCompleted) {
      return <GenerationSuccess 
        frameworkName={frameworkName} 
        onComplete={handleComplete} 
        wordCount={2500}
      />;
    }
    
    if (isGenerating) {
      return <GenerationProgress frameworkName={frameworkName} />;
    }
    
    const industries = [
      'Technology',
      'Healthcare',
      'Finance',
      'Retail',
      'Manufacturing',
      'Education',
      'Government',
      'Professional Services'
    ];
    
    const companySizes = [
      '1-10 employees',
      '11-50 employees',
      '51-200 employees',
      '201-500 employees',
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
      'SIEM Solution'
    ];
    
    const riskAppetiteOptions = [
      'Low',
      'Moderate',
      'High'
    ];
    
    switch (currentStep) {
      case 1:
        return (
          <OrganizationStep 
            formValues={formData.organization}
            handleInputChange={handleInputChange}
            industries={industries}
            companySizes={companySizes}
          />
        );
      case 2:
        return (
          <DataInfrastructureStep 
            formValues={formData.dataInfrastructure}
            handleInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <SecurityRiskStep 
            formValues={formData.securityRisk}
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            securityControlOptions={securityControlOptions}
            riskAppetiteOptions={riskAppetiteOptions}
          />
        );
      case 4:
        return (
          <ReviewStep 
            formValues={{
              ...formData.organization,
              ...formData.dataInfrastructure,
              ...formData.securityRisk
            }}
            frameworkName={frameworkName}
          />
        );
      default:
        return null;
    }
  };

  // Check if a step is valid for Next button
  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.organization.companyName && 
               formData.organization.industry && 
               formData.organization.companySize;
      case 2:
        return !!formData.dataInfrastructure.dataTypes;
      case 3:
        return formData.securityRisk.securityControls.length > 0 && 
               !!formData.securityRisk.riskAppetite;
      default:
        return true;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={handleBackToFrameworks}
          className="mb-4 flex items-center"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Compliance
        </Button>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-2">{frameworkName} Policy Generator</h2>
          <p className="text-gray-600">
            AI will generate customized policies for your organization based on the {frameworkName} framework
          </p>
        </motion.div>
      </div>
      
      <PolicyGeneratorSteps currentStep={currentStep} />
      
      <Card>
        <CardContent className="p-6 md:p-8">
          {renderStep()}
          
          {!isCompleted && !isGenerating && (
            <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
              {currentStep > 1 ? (
                <Button 
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
                  onClick={nextStep}
                  disabled={!isStepValid()}
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={startGeneration}
                >
                  Generate Policies
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyGenerator;
