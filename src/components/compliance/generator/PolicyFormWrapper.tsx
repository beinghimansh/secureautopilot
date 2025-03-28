
import React from 'react';
import { AlertCircle, FileText } from 'lucide-react';
import Button from '@/components/common/Button';
import { Card, CardContent } from '@/components/common/Card';
import { PolicyGeneratorSteps } from './PolicyGeneratorSteps';
import OrganizationStep from './OrganizationStep';
import DataInfrastructureStep from './DataInfrastructureStep';
import SecurityRiskStep from './SecurityRiskStep';
import ReviewStep from './ReviewStep';

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
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <OrganizationStep 
            formValues={formValues} 
            handleInputChange={handleInputChange}
            industries={industries}
            companySizes={companySizes}
          />
        );
      case 2:
        return (
          <DataInfrastructureStep 
            formValues={formValues} 
            handleInputChange={handleInputChange} 
          />
        );
      case 3:
        return (
          <SecurityRiskStep 
            formValues={formValues} 
            handleInputChange={handleInputChange}
            handleCheckboxChange={handleCheckboxChange}
            securityControlOptions={securityControlOptions}
            riskAppetiteOptions={riskAppetiteOptions}
          />
        );
      case 4:
        return (
          <ReviewStep 
            formValues={formValues} 
            frameworkName={frameworkName} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">{frameworkName} Policy Generator</h1>
          <p className="text-gray-600">
            AI will generate customized policies for your organization based on the {frameworkName} framework
          </p>
        </div>
        
        <PolicyGeneratorSteps currentStep={currentStep} />
        
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

export default PolicyFormWrapper;
