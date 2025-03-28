
import React from 'react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';

interface RiskBankProps {
  frameworkId: string;
  setNewRisk: React.Dispatch<React.SetStateAction<{
    title: string;
    description: string;
    likelihood: string;
    impact: string;
  }>>;
  setShowAddRisk: React.Dispatch<React.SetStateAction<boolean>>;
}

const RiskBank: React.FC<RiskBankProps> = ({ frameworkId, setNewRisk, setShowAddRisk }) => {
  const commonRisks = [
    {
      title: 'Unauthorized Access to Sensitive Data',
      description: 'Risk of confidential information being accessed by unauthorized personnel.',
      framework: frameworkId,
    },
    {
      title: 'Insufficient Security Controls',
      description: 'Inadequate security measures to protect against common threats.',
      framework: frameworkId,
    },
    {
      title: 'Data Breach by Third-Party Vendor',
      description: 'Risk of data being exposed due to security vulnerabilities in vendor systems.',
      framework: frameworkId,
    },
    {
      title: 'Lack of Employee Security Awareness',
      description: 'Employees not trained properly on security protocols and best practices.',
      framework: frameworkId,
    }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Risk Bank</h2>
        <p className="text-gray-600 mb-4">
          Common risks for this framework that you can add to your risk register:
        </p>
        
        <div className="space-y-3">
          {commonRisks.map((risk, index) => (
            <div key={index} className="p-4 bg-gray-50 rounded-md border border-gray-200">
              <div className="flex justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{risk.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setNewRisk({
                      title: risk.title,
                      description: risk.description,
                      likelihood: 'medium',
                      impact: 'medium',
                    });
                    setShowAddRisk(true);
                    toast.info('Risk template loaded');
                  }}
                >
                  Use Template
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskBank;
