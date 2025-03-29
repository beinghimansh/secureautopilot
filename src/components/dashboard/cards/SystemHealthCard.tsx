
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScaleIn } from '@/components/common/Transitions';

interface SystemHealth {
  name: string;
  status: 'Healthy' | 'Warning' | 'Critical';
  usagePercentage: number;
}

interface SystemHealthCardProps {
  systems: SystemHealth[];
  delay?: number;
}

const SystemHealthCard = ({ systems, delay = 200 }: SystemHealthCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-100 text-green-800';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-800';
      case 'Critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBarColor = (status: string) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-500';
      case 'Warning':
        return 'bg-yellow-500';
      case 'Critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <ScaleIn delay={delay}>
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">System Health</CardTitle>
          <CardDescription>Platform performance</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {systems.map((system, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{system.name}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(system.status)}`}>
                    {system.status}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`${getBarColor(system.status)} h-2 rounded-full`} 
                    style={{ width: `${system.usagePercentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </ScaleIn>
  );
};

export default SystemHealthCard;
