
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScaleIn } from '@/components/common/Transitions';

interface PlatformStatsCardProps {
  totalOrganizations: number;
  activeUsers: number;
  frameworksUsed: number;
  delay?: number;
}

const PlatformStatsCard = ({ 
  totalOrganizations, 
  activeUsers, 
  frameworksUsed, 
  delay = 100 
}: PlatformStatsCardProps) => {
  return (
    <ScaleIn delay={delay}>
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Platform Stats</CardTitle>
          <CardDescription>System overview</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Organizations</span>
              <span className="text-2xl font-bold">{totalOrganizations}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Active Users</span>
              <span className="text-2xl font-bold">{activeUsers}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Frameworks Used</span>
              <span className="text-2xl font-bold">{frameworksUsed}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </ScaleIn>
  );
};

export default PlatformStatsCard;
