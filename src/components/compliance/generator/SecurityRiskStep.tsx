
import React from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SecurityRiskStepProps {
  formValues: {
    securityControls: string[];
    riskAppetite: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleCheckboxChange: (controlName: string) => void;
  securityControlOptions: string[];
  riskAppetiteOptions: string[];
}

const SecurityRiskStep: React.FC<SecurityRiskStepProps> = ({ 
  formValues, 
  handleInputChange, 
  handleCheckboxChange,
  securityControlOptions,
  riskAppetiteOptions
}) => {
  // Custom handler for Select components
  const handleSelectChange = (name: string, value: string) => {
    const event = {
      target: {
        name,
        value
      }
    } as React.ChangeEvent<HTMLSelectElement>;
    
    handleInputChange(event);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Security & Risk Management</h3>
        <p className="text-sm text-gray-500 mb-6">
          Details about your organization's security controls and risk management approach.
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="grid gap-2">
          <Label className="flex items-center">
            Security Controls Currently in Place <span className="text-red-500 ml-1">*</span>
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
            {securityControlOptions.map((control) => (
              <div key={control} className="flex items-center space-x-2">
                <Checkbox
                  id={`control-${control}`}
                  checked={formValues.securityControls.includes(control)}
                  onCheckedChange={() => handleCheckboxChange(control)}
                />
                <Label
                  htmlFor={`control-${control}`}
                  className="text-sm font-normal cursor-pointer"
                >
                  {control}
                </Label>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-1">
            Select all security controls that your organization currently has in place.
          </p>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="riskAppetite" className="flex items-center">
            Risk Appetite <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select 
            value={formValues.riskAppetite} 
            onValueChange={(value) => handleSelectChange('riskAppetite', value)}
          >
            <SelectTrigger id="riskAppetite">
              <SelectValue placeholder="Select risk appetite level" />
            </SelectTrigger>
            <SelectContent>
              {riskAppetiteOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option === 'Low' ? 'Low (Risk Averse)' : 
                   option === 'High' ? 'High (Risk Tolerant)' : option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500">
            Your organization's general approach to risk in security and compliance matters.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityRiskStep;
