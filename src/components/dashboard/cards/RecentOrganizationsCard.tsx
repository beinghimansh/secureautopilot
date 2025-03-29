
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScaleIn } from '@/components/common/Transitions';

interface Organization {
  name: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

interface RecentOrganizationsCardProps {
  organizations: Organization[];
  delay?: number;
}

const RecentOrganizationsCard = ({ organizations, delay = 150 }: RecentOrganizationsCardProps) => {
  return (
    <ScaleIn delay={delay}>
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Recent Organizations</CardTitle>
          <CardDescription>Latest platforms onboarded</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {organizations.map((org, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm font-medium">{org.name}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  org.status === 'Active' ? 'bg-green-100 text-green-800' : 
                  org.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-red-100 text-red-800'
                }`}>
                  {org.status}
                </span>
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
        </CardContent>
      </Card>
    </ScaleIn>
  );
};

export default RecentOrganizationsCard;
