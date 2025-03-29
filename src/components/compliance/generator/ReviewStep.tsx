
import React from 'react';
import { Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ReviewStepProps {
  formValues: {
    companyName: string;
    industry: string;
    companySize: string;
    businessLocation: string;
    dataTypes: string;
    infrastructureDetails: string;
    securityControls: string[];
    riskAppetite: string;
  };
  frameworkName: string;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formValues, frameworkName }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Review Your Information</h3>
        <p className="text-sm text-gray-500 mb-6">
          Please review the information below before generating your {frameworkName} policies.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="space-y-3">
          <h4 className="font-medium">Organization Details</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Company Name</p>
              <p>{formValues.companyName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Industry</p>
              <p>{formValues.industry}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Company Size</p>
              <p>{formValues.companySize}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Business Location</p>
              <p>{formValues.businessLocation || 'Not specified'}</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium">Data & Infrastructure</h4>
          <div>
            <p className="text-sm font-medium text-gray-500">Types of Data Processed</p>
            <p className="whitespace-pre-line">{formValues.dataTypes}</p>
          </div>
          {formValues.infrastructureDetails && (
            <div>
              <p className="text-sm font-medium text-gray-500">Infrastructure Details</p>
              <p className="whitespace-pre-line">{formValues.infrastructureDetails}</p>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          <h4 className="font-medium">Security & Risk Management</h4>
          <div>
            <p className="text-sm font-medium text-gray-500">Security Controls</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-1">
              {formValues.securityControls.map(control => (
                <div key={control} className="flex items-center">
                  <Check size={16} className="mr-2 text-green-500" />
                  <span>{control}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Risk Appetite</p>
            <p>{formValues.riskAppetite}</p>
          </div>
        </div>
      </div>
      
      <Alert className="mt-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Ready to Generate</AlertTitle>
        <AlertDescription>
          AI will use this information to generate customized {frameworkName} policies specifically for your organization.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ReviewStep;
