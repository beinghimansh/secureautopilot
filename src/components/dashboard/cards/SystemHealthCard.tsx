
import React from 'react';
import DashboardCard from '../common/DashboardCard';
import StatusIndicator, { StatusType } from '../common/StatusIndicator';
import ProgressBar from '../common/ProgressBar';

interface SystemHealth {
  name: string;
  status: StatusType;
  usagePercentage: number;
}

interface SystemHealthCardProps {
  systems: SystemHealth[];
  delay?: number;
}

const SystemHealthCard = ({ systems, delay = 200 }: SystemHealthCardProps) => {
  return (
    <DashboardCard 
      title="System Health" 
      description="Platform performance"
      delay={delay}
      contentClassName="pt-6"
    >
      <div className="space-y-4">
        {systems.map((system, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">{system.name}</span>
              <StatusIndicator status={system.status} />
            </div>
            <ProgressBar 
              value={system.usagePercentage} 
              status={system.status} 
            />
          </div>
        ))}
      </div>
    </DashboardCard>
  );
};

export default SystemHealthCard;
