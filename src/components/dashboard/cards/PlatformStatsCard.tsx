
import React from 'react';
import DashboardCard from '../common/DashboardCard';

interface PlatformStatsCardProps {
  totalOrganizations: number;
  activeUsers: number;
  frameworksUsed: number;
  delay?: number;
}

const StatItem = ({ label, value }: { label: string; value: number }) => (
  <div className="flex justify-between items-center">
    <span className="text-sm font-medium">{label}</span>
    <span className="text-2xl font-bold">{value}</span>
  </div>
);

const PlatformStatsCard = ({ 
  totalOrganizations, 
  activeUsers, 
  frameworksUsed, 
  delay = 100 
}: PlatformStatsCardProps) => {
  return (
    <DashboardCard 
      title="Platform Stats" 
      description="System overview"
      delay={delay}
      contentClassName="pt-6"
    >
      <div className="space-y-4">
        <StatItem label="Total Organizations" value={totalOrganizations} />
        <StatItem label="Active Users" value={activeUsers} />
        <StatItem label="Frameworks Used" value={frameworksUsed} />
      </div>
    </DashboardCard>
  );
};

export default PlatformStatsCard;
