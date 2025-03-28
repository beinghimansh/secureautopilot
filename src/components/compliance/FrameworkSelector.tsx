
import React from 'react';
import { Card, CardContent } from '../common/Card';
import Button from '../common/Button';
import { ScaleIn } from '../common/Transitions';

interface Framework {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
}

const frameworks: Framework[] = [
  {
    id: 'iso27001',
    name: 'ISO 27001',
    description: 'Information security management system standard',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    ),
  },
  {
    id: 'soc2',
    name: 'SOC 2',
    description: 'Service Organization Control standard for service providers',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="m8 12 3 3 5-5" />
      </svg>
    ),
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    description: 'General Data Protection Regulation for EU data privacy',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M3 9h18" />
        <path d="M9 21V9" />
      </svg>
    ),
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
];

interface FrameworkSelectorProps {
  onSelectFramework: (frameworkId: string) => void;
}

const FrameworkSelector = ({ onSelectFramework }: FrameworkSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {frameworks.map((framework, index) => (
        <ScaleIn key={framework.id} delay={index * 100}>
          <Card className="h-full hover:shadow-premium-md transition-all duration-300">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center text-blue-600">
                {framework.icon}
              </div>
              <h3 className="text-xl font-medium mb-2">{framework.name}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{framework.description}</p>
              <Button 
                onClick={() => onSelectFramework(framework.id)}
                className="w-full mt-auto bg-blue-600 hover:bg-blue-700"
              >
                Select {framework.name}
              </Button>
            </CardContent>
          </Card>
        </ScaleIn>
      ))}
    </div>
  );
};

export default FrameworkSelector;
