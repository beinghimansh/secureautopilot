
import React from 'react';
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface DataInfrastructureStepProps {
  formValues: {
    dataTypes: string;
    infrastructureDetails: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const DataInfrastructureStep: React.FC<DataInfrastructureStepProps> = ({ formValues, handleInputChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Data & Infrastructure Details</h3>
        <p className="text-sm text-gray-500 mb-6">
          Information about the types of data your organization processes and your infrastructure setup.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="dataTypes" className="flex items-center">
            Types of Data Processed <span className="text-red-500 ml-1">*</span>
          </Label>
          <Textarea
            id="dataTypes"
            name="dataTypes"
            placeholder="e.g., Personal customer data, Financial information, Healthcare records"
            value={formValues.dataTypes}
            onChange={handleInputChange}
            className="min-h-[100px]"
            required
          />
          <p className="text-sm text-gray-500">
            Describe the types of data your organization collects, processes, or stores.
          </p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="infrastructureDetails">
            Infrastructure Details
          </Label>
          <Textarea
            id="infrastructureDetails"
            name="infrastructureDetails"
            placeholder="e.g., Cloud services used, on-premises infrastructure, BYOD policies"
            value={formValues.infrastructureDetails}
            onChange={handleInputChange}
            className="min-h-[100px]"
          />
          <p className="text-sm text-gray-500">
            Describe your technology infrastructure, including cloud services, hardware, and software.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DataInfrastructureStep;
