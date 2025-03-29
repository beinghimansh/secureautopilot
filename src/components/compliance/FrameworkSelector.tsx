
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, Settings, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/components/common/Card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

interface FrameworkSelectorProps {
  onSelectFramework: (frameworkId: string) => void;
}

const frameworks = [
  {
    id: 'iso27001',
    name: 'ISO 27001',
    description: 'Information Security Management',
    color: 'blue'
  },
  {
    id: 'soc2',
    name: 'SOC 2',
    description: 'Service Organization Controls',
    color: 'indigo'
  },
  {
    id: 'gdpr',
    name: 'GDPR',
    description: 'General Data Protection Regulation',
    color: 'green'
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
    color: 'red'
  },
  {
    id: 'pci_dss',
    name: 'PCI DSS',
    description: 'Payment Card Industry Data Security Standard',
    color: 'orange'
  },
  {
    id: 'iso42001',
    name: 'ISO 42001',
    description: 'AI Act Compliance',
    color: 'purple'
  }
];

const FrameworkSelector: React.FC<FrameworkSelectorProps> = ({ onSelectFramework }) => {
  const [hasGeneratedPolicies, setHasGeneratedPolicies] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchExistingPolicies = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('generated_policies')
          .select('framework_type, created_at')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        // Create an object that tracks if each framework has any generated policies
        const policyStatus: Record<string, boolean> = {};
        
        if (data) {
          // Group by framework_type and get the most recent for each
          const frameworkPolicies = data.reduce((acc: Record<string, any>, policy) => {
            if (!acc[policy.framework_type] || new Date(policy.created_at) > new Date(acc[policy.framework_type].created_at)) {
              acc[policy.framework_type] = policy;
            }
            return acc;
          }, {});

          // Set true for frameworks that have generated policies
          frameworks.forEach(framework => {
            policyStatus[framework.id] = !!frameworkPolicies[framework.id];
          });
        }

        setHasGeneratedPolicies(policyStatus);
      } catch (error) {
        console.error('Error fetching policy data:', error);
        toast.error('Failed to load policy data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchExistingPolicies();
  }, []);

  const getBackgroundColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500';
      case 'indigo': return 'bg-indigo-500';
      case 'green': return 'bg-green-500';
      case 'red': return 'bg-red-500';
      case 'orange': return 'bg-orange-500';
      case 'purple': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  const navigateToFrameworkRequirements = (frameworkId: string) => {
    navigate(`/compliance/${frameworkId}/requirements`);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Compliance Frameworks</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose a compliance framework to generate policies, manage requirements, and track your implementation progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {frameworks.map((framework) => (
          <motion.div
            key={framework.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <div className="mb-4 flex items-center">
                    <div className={`${getBackgroundColor(framework.color)} p-3 rounded-lg text-white`}>
                      <Shield size={24} />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium">{framework.name}</h3>
                      <p className="text-gray-600 text-sm">{framework.description}</p>
                    </div>
                  </div>

                  <div className="mt-auto">
                    {!isLoading && hasGeneratedPolicies[framework.id] ? (
                      <div className="grid grid-cols-2 gap-3 mt-4">
                        <button
                          onClick={() => navigateToFrameworkRequirements(framework.id)}
                          className="flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors"
                        >
                          <Settings size={16} />
                          <span>Manage</span>
                        </button>
                        <button
                          onClick={() => onSelectFramework(framework.id)}
                          className="flex items-center justify-center gap-2 py-2 px-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-md transition-colors"
                        >
                          <RefreshCw size={16} />
                          <span>Review</span>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => onSelectFramework(framework.id)}
                        className="mt-4 flex items-center justify-center gap-2 py-2 px-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-md transition-colors w-full"
                      >
                        <span>Get Started</span>
                        <ArrowRight size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FrameworkSelector;
