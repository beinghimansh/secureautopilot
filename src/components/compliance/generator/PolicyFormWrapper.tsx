
import React from 'react';
import { AlertCircle, FileText } from 'lucide-react';
import Button from '@/components/common/Button';
import { Card, CardContent } from '@/components/common/Card';
import { PolicyGeneratorSteps } from './PolicyGeneratorSteps';
import OrganizationStep from './OrganizationStep';
import DataInfrastructureStep from './DataInfrastructureStep';
import SecurityRiskStep from './SecurityRiskStep';
import ReviewStep from './ReviewStep';
import { motion } from 'framer-motion';

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

interface PolicyFormWrapperProps {
  frameworkName: string;
  currentStep: number;
  formValues: FormValues;
  error: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleCheckboxChange: (controlName: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  prevStep: () => void;
  nextStep: () => void;
  industries: string[];
  companySizes: string[];
  securityControlOptions: string[];
  riskAppetiteOptions: string[];
}

const fadeVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

const PolicyFormWrapper: React.FC<PolicyFormWrapperProps> = ({
  frameworkName,
  currentStep,
  formValues,
  error,
  handleInputChange,
  handleCheckboxChange,
  handleSubmit,
  prevStep,
  nextStep,
  industries,
  companySizes,
  securityControlOptions,
  riskAppetiteOptions
}) => {
  const isNextDisabled = () => {
    switch (currentStep) {
      case 1:
        return !formValues.companyName || !formValues.industry || !formValues.companySize;
      case 2:
        return !formValues.dataTypes;
      case 3:
        return formValues.securityControls.length === 0 || !formValues.riskAppetite;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            key="step1"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
          >
            <OrganizationStep 
              formValues={formValues} 
              handleInputChange={handleInputChange}
              industries={industries}
              companySizes={companySizes}
            />
          </motion.div>
        );
      case 2:
        return (
          <motion.div
            key="step2"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
          >
            <DataInfrastructureStep 
              formValues={formValues} 
              handleInputChange={handleInputChange} 
            />
          </motion.div>
        );
      case 3:
        return (
          <motion.div
            key="step3"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
          >
            <SecurityRiskStep 
              formValues={formValues} 
              handleInputChange={handleInputChange}
              handleCheckboxChange={handleCheckboxChange}
              securityControlOptions={securityControlOptions}
              riskAppetiteOptions={riskAppetiteOptions}
            />
          </motion.div>
        );
      case 4:
        return (
          <motion.div
            key="step4"
            variants={fadeVariants}
            initial="hidden"
            animate="visible"
          >
            <ReviewStep 
              formValues={formValues} 
              frameworkName={frameworkName} 
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6"
        >
          <h1 className="text-2xl font-bold">{frameworkName} Policy Generator</h1>
          <p className="text-gray-600">
            AI will generate customized policies for your organization based on the {frameworkName} framework
          </p>
        </motion.div>
        
        <PolicyGeneratorSteps currentStep={currentStep} />
        
        <form onSubmit={handleSubmit}>
          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 p-3 bg-red-100 border border-red-200 text-red-800 rounded-md flex items-start"
            >
              <AlertCircle size={20} className="mr-2 mt-0.5 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
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
                disabled={isNextDisabled()}
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

export default PolicyFormWrapper;
