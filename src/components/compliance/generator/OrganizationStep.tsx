
import React from 'react';

interface FormValues {
  companyName: string;
  industry: string;
  companySize: string;
  businessLocation: string;
}

interface OrganizationStepProps {
  formValues: FormValues;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  industries: string[];
  companySizes: string[];
}

const OrganizationStep: React.FC<OrganizationStepProps> = ({ 
  formValues, 
  handleInputChange, 
  industries, 
  companySizes 
}) => {
  return (
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
            {companySizes.map(size => (
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
};

export default OrganizationStep;
