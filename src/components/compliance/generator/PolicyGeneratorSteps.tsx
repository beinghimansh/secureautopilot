
import React from 'react';
import { Check } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

export const PolicyGeneratorSteps: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <div className="mb-8">
      <ol className="flex items-center w-full">
        {[1, 2, 3, 4].map((step) => (
          <li key={step} className={`flex items-center ${step === currentStep ? 'text-blue-600' : step < currentStep ? 'text-green-600' : 'text-gray-500'}`}>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
              step === currentStep 
                ? 'border-blue-600 text-blue-600' 
                : step < currentStep 
                  ? 'border-green-600 bg-green-600 text-white' 
                  : 'border-gray-500 text-gray-500'
            }`}>
              {step < currentStep ? <Check size={16} /> : step}
            </span>
            <span className="ml-2 text-sm hidden sm:inline">
              {step === 1 ? 'Organization' : 
               step === 2 ? 'Data' : 
               step === 3 ? 'Security' : 'Review'}
            </span>
            {step < 4 && (
              <div className={`flex-1 h-0.5 mx-2 ${step < currentStep ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};
