import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../common/Card';
import Button from '../common/Button';
import { ScaleIn } from '../common/Transitions';
import { Shield, CheckCircle, File, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Framework {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  implemented?: boolean;
}

const frameworks: Framework[] = [
  {
    id: 'iso27001',
    name: 'ISO 27001',
    description: 'Information security management system standard',
    icon: (
      <Shield className="h-8 w-8" />
    ),
  },
  {
    id: 'soc2',
    name: 'SOC 2',
    description: 'Service Organization Control standard for service providers',
    icon: (
      <CheckCircle className="h-8 w-8" />
    ),
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    description: 'General Data Protection Regulation for EU data privacy',
    icon: (
      <File className="h-8 w-8" />
    ),
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
    icon: (
      <Shield className="h-8 w-8" />
    ),
  },
];

interface FrameworkSelectorProps {
  onSelectFramework: (frameworkId: string) => void;
}

const FrameworkSelector = ({ onSelectFramework }: FrameworkSelectorProps) => {
  const navigate = useNavigate();
  const [implementedFrameworks, setImplementedFrameworks] = useState<string[]>([]);

  useEffect(() => {
    const fetchImplementedFrameworks = async () => {
      try {
        setImplementedFrameworks(['iso27001']);
      } catch (error) {
        console.error('Error fetching implemented frameworks:', error);
      }
    };

    fetchImplementedFrameworks();
  }, []);

  const handleFrameworkClick = (frameworkId: string) => {
    if (implementedFrameworks.includes(frameworkId)) {
      navigate(`/compliance/${frameworkId}/requirements`);
    } else {
      onSelectFramework(frameworkId);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {frameworks.map((framework, index) => (
        <ScaleIn key={framework.id} delay={index * 100}>
          <Card className="h-full hover:shadow-premium-md transition-all duration-300">
            <CardContent className="p-6 flex flex-col h-full">
              <div className="mb-4 p-3 bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center text-blue-600">
                {framework.icon}
              </div>
              
              {implementedFrameworks.includes(framework.id) && (
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full absolute top-4 right-4 flex items-center">
                  <CheckCircle size={12} className="mr-1" />
                  Implemented
                </span>
              )}
              
              <h3 className="text-xl font-medium mb-2">{framework.name}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{framework.description}</p>
              
              <Button 
                onClick={() => handleFrameworkClick(framework.id)}
                className="w-full mt-auto"
                variant={implementedFrameworks.includes(framework.id) ? "outline" : "default"}
                rightIcon={<ArrowRight size={16} />}
              >
                {implementedFrameworks.includes(framework.id) 
                  ? `Manage ${framework.name} Controls`
                  : `Select ${framework.name}`}
              </Button>
            </CardContent>
          </Card>
        </ScaleIn>
      ))}
    </div>
  );
};

export default FrameworkSelector;
