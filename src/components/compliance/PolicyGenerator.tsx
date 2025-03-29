
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
    organization: {},
    dataInfrastructure: {},
    securityRisk: {}
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
    }
  };
  
  const renderStep = () => {
    if (isCompleted) {
      return <GenerationSuccess frameworkName={frameworkName} onComplete={handleComplete} />;
    }
    
    if (isGenerating) {
      return <GenerationProgress frameworkName={frameworkName} />;
    }
    
    switch (currentStep) {
      case 1:
        return <OrganizationStep formValues={{
          companyName: '',
          industry: '',
          companySize: '',
          businessLocation: ''
        }} 
        handleInputChange={() => {}} 
        industries={[]} 
        companySizes={[]} />;
      case 2:
        return <DataInfrastructureStep formValues={{
          dataTypes: '',
          infrastructureDetails: ''
        }} 
        handleInputChange={() => {}} />;
      case 3:
        return <SecurityRiskStep 
          formValues={{
            securityControls: [],
            riskAppetite: ''
          }}
          handleInputChange={() => {}}
          handleCheckboxChange={() => {}}
          securityControlOptions={[]}
          riskAppetiteOptions={[]} />;
      case 4:
        return <ReviewStep 
          formValues={{
            companyName: '',
            industry: '',
            companySize: '',
            businessLocation: '',
            dataTypes: '',
            infrastructureDetails: '',
            securityControls: [],
            riskAppetite: ''
          }} 
          frameworkName={frameworkName} />;
      default:
        return null;
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
        </CardContent>
      </Card>
    </div>
  );
};

export default PolicyGenerator;
