
import React from 'react';
import { Check } from 'lucide-react';

interface FormValues {
  companyName: string;
  industry: string;
  companySize: string;
  businessLocation: string;
  dataTypes: string;
  infrastructureDetails: string;
  securityControls: string[];
  riskAppetite: string;
}

interface ReviewStepProps {
  formValues: FormValues;
  frameworkName: string;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formValues, frameworkName }) => {
  return (
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
};

export default ReviewStep;
