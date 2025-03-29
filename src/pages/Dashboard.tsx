
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { useAuth } from '@/contexts/AuthContext';
import DashboardContent from '@/components/dashboard/Dashboard';

const Dashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <PageTransition>
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
                  <p className="text-gray-500">
                    {profile ? (
                      <>
                        Welcome, {profile.first_name || 'User'} ({profile.role}) 
                      </>
                    ) : (
                      'Your compliance overview and current status'
                    )}
                  </p>
                </div>
              </div>
              
              <DashboardContent />
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
