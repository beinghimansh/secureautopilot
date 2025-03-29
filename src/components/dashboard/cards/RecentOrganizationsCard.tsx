
import React from 'react';
import { Button } from '@/components/ui/button';
import DashboardCard from '../common/DashboardCard';
import StatusIndicator, { StatusType } from '../common/StatusIndicator';

interface Organization {
  name: string;
  status: StatusType;
}

interface RecentOrganizationsCardProps {
  organizations: Organization[];
  delay?: number;
}

const RecentOrganizationsCard = ({ organizations, delay = 150 }: RecentOrganizationsCardProps) => {
  return (
    <DashboardCard 
      title="Recent Organizations" 
      description="Latest platforms onboarded"
      delay={delay}
      contentClassName="pt-6"
    >
      <div className="space-y-4">
        {organizations.map((org, i) => (
          <div key={i} className="flex justify-between items-center">
            <span className="text-sm font-medium">{org.name}</span>
            <StatusIndicator status={org.status} />
          </div>
        ))}
        <Button
          variant="link" 
          className="p-0 h-auto"
          size="sm"
        >
          View all organizations
        </Button>
      </div>
    </DashboardCard>
  );
};

export default RecentOrganizationsCard;
