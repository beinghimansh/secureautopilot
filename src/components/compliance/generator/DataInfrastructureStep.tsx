
import React from 'react';

interface FormValues {
  dataTypes: string;
  infrastructureDetails: string;
}

interface DataInfrastructureStepProps {
  formValues: FormValues;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const DataInfrastructureStep: React.FC<DataInfrastructureStepProps> = ({ 
  formValues, 
  handleInputChange 
}) => {
  return (
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
};

export default DataInfrastructureStep;
