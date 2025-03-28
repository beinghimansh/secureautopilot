
import React, { useState } from 'react';
import { AlertTriangle, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';
import AddRiskForm from './AddRiskForm';
import RiskTable from './RiskTable';
import RiskBank from './RiskBank';

interface Risk {
  id: string;
  title: string;
  description: string;
  likelihood: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  status: 'identified' | 'assessed' | 'mitigated' | 'accepted';
  created_at: string;
}

interface RiskRegisterProps {
  frameworkId: string;
}

const RiskRegister: React.FC<RiskRegisterProps> = ({ frameworkId }) => {
  const [risks, setRisks] = useState<Risk[]>([
    {
      id: '1',
      title: 'Unauthorized Data Access',
      description: 'Risk of sensitive data being accessed by unauthorized personnel',
      likelihood: 'medium',
      impact: 'high',
      status: 'assessed',
      created_at: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'System Downtime',
      description: 'Risk of critical systems experiencing unexpected downtime',
      likelihood: 'low',
      impact: 'high',
      status: 'mitigated',
      created_at: new Date().toISOString(),
    },
  ]);
  const [showAddRisk, setShowAddRisk] = useState(false);
  const [newRisk, setNewRisk] = useState({
    title: '',
    description: '',
    likelihood: 'medium',
    impact: 'medium',
  });

  const handleAddRisk = async () => {
    if (!newRisk.title || !newRisk.description) {
      toast.error('Please provide both title and description for the risk');
      return;
    }

    try {
      const risk: Risk = {
        id: Date.now().toString(),
        title: newRisk.title,
        description: newRisk.description,
        likelihood: newRisk.likelihood as 'low' | 'medium' | 'high',
        impact: newRisk.impact as 'low' | 'medium' | 'high',
        status: 'identified',
        created_at: new Date().toISOString(),
      };

      setRisks([...risks, risk]);
      setNewRisk({
        title: '',
        description: '',
        likelihood: 'medium',
        impact: 'medium',
      });
      setShowAddRisk(false);
      toast.success('Risk added successfully');
    } catch (error) {
      console.error('Error adding risk:', error);
      toast.error('Failed to add risk');
    }
  };

  return (
    <>
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Risk Register</h2>
            <Button 
              onClick={() => setShowAddRisk(true)} 
              leftIcon={<Plus size={16} />}
            >
              Add Risk
            </Button>
          </div>

          {showAddRisk && (
            <AddRiskForm 
              newRisk={newRisk} 
              setNewRisk={setNewRisk}
              onCancel={() => setShowAddRisk(false)}
              onSubmit={handleAddRisk}
            />
          )}

          {risks.length > 0 ? (
            <RiskTable risks={risks} />
          ) : (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <AlertTriangle size={40} className="mx-auto text-yellow-500 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No risks found</h3>
              <p className="text-gray-500 mb-4">Start by adding risks to your register</p>
              <Button onClick={() => setShowAddRisk(true)}>Add Your First Risk</Button>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-6">
        <RiskBank frameworkId={frameworkId} setNewRisk={setNewRisk} setShowAddRisk={setShowAddRisk} />
      </div>
    </>
  );
};

export default RiskRegister;
