
import React from 'react';
import { FadeIn } from '@/components/common/Transitions';
import RoleBasedContent from '@/components/auth/RoleBasedContent';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import DashboardCommon from './DashboardCommon';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <DashboardCommon />
      
      {/* Super Admin Dashboard */}
      <RoleBasedContent allowedRoles={['super_admin']}>
        <AdminDashboard />
      </RoleBasedContent>
      
      {/* Company Admin and Standard User Dashboard */}
      <RoleBasedContent allowedRoles={['company_admin', 'compliance_officer', 'employee', 'auditor']}>
        <UserDashboard />
      </RoleBasedContent>
    </div>
  );
};

export default Dashboard;
