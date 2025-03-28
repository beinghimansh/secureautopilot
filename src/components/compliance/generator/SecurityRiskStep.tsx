
import React from 'react';

interface FormValues {
  securityControls: string[];
  riskAppetite: string;
}

interface SecurityRiskStepProps {
  formValues: FormValues;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
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
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-medium">Security & Risk Profile</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Security Controls in Place
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {securityControlOptions.map(control => (
              <div key={control} className="flex items-center">
                <input
                  type="checkbox"
                  id={`control-${control}`}
                  className="mr-2"
                  checked={formValues.securityControls.includes(control)}
                  onChange={() => handleCheckboxChange(control)}
                />
                <label htmlFor={`control-${control}`}>{control}</label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="riskAppetite">
            Risk Appetite
          </label>
          <select
            id="riskAppetite"
            name="riskAppetite"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={formValues.riskAppetite}
            onChange={handleInputChange}
          >
            {riskAppetiteOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SecurityRiskStep;
