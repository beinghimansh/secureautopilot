
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OrganizationStepProps {
  formValues: {
    companyName: string;
    industry: string;
    companySize: string;
    businessLocation: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  industries: string[];
  companySizes: string[];
}

const OrganizationStep: React.FC<OrganizationStepProps> = ({ 
  formValues, 
  handleInputChange,
  industries,
  companySizes
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
        <h3 className="text-lg font-medium mb-4">Organization Details</h3>
        <p className="text-sm text-gray-500 mb-6">
          This information helps generate policies that are tailored to your organization's specific profile.
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="grid gap-2">
          <Label htmlFor="companyName" className="flex items-center">
            Company Name <span className="text-red-500 ml-1">*</span>
          </Label>
          <Input
            id="companyName"
            name="companyName"
            placeholder="Enter your company name"
            value={formValues.companyName}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="industry" className="flex items-center">
            Industry <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select 
            value={formValues.industry} 
            onValueChange={(value) => handleSelectChange('industry', value)}
          >
            <SelectTrigger id="industry" className="w-full bg-white">
              <SelectValue placeholder="Select an industry" />
            </SelectTrigger>
            <SelectContent position="popper" className="w-full bg-white z-50">
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="companySize" className="flex items-center">
            Company Size <span className="text-red-500 ml-1">*</span>
          </Label>
          <Select 
            value={formValues.companySize} 
            onValueChange={(value) => handleSelectChange('companySize', value)}
          >
            <SelectTrigger id="companySize" className="w-full bg-white">
              <SelectValue placeholder="Select company size" />
            </SelectTrigger>
            <SelectContent position="popper" className="w-full bg-white z-50">
              {companySizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid gap-2">
          <Label htmlFor="businessLocation">
            Primary Business Location
          </Label>
          <Input
            id="businessLocation"
            name="businessLocation"
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
