
import React from 'react';
import { FadeIn } from '@/components/common/Transitions';
import PlatformStatsCard from './cards/PlatformStatsCard';
import RecentOrganizationsCard from './cards/RecentOrganizationsCard';
import SystemHealthCard from './cards/SystemHealthCard';

const AdminDashboard = () => {
  // Mock data for admin dashboard
  const organizations = [
    { name: 'Acme Inc.', status: 'Active' as const },
    { name: 'TechCorp', status: 'Active' as const },
    { name: 'GlobalFinance', status: 'Active' as const }
  ];

  const systemHealthData = [
    { name: 'Database', status: 'Healthy' as const, usagePercentage: 7 },
    { name: 'Storage', status: 'Healthy' as const, usagePercentage: 14 },
    { name: 'API Usage', status: 'Healthy' as const, usagePercentage: 32 }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PlatformStatsCard 
        totalOrganizations={12} 
        activeUsers={87} 
        frameworksUsed={5} 
        delay={100} 
      />
      
      <RecentOrganizationsCard 
        organizations={organizations} 
        delay={150} 
      />
      
      <SystemHealthCard 
        systems={systemHealthData} 
        delay={200} 
      />
    </div>
  );
};

export default AdminDashboard;
