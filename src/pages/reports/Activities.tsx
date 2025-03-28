
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { Shield } from 'lucide-react';
import { ScaleIn } from '@/components/common/Transitions';

const ActivitiesPage = () => {
  // Sample activity data
  const activities = [
    { id: 1, action: 'Information Security Policy updated', user: 'John Doe', timestamp: '1 day ago' },
    { id: 2, action: 'Risk assessment completed', user: 'Sarah Lee', timestamp: '2 days ago' },
    { id: 3, action: 'Access control review', user: 'Mike Johnson', timestamp: '3 days ago' },
    { id: 4, action: 'Data backup verification', user: 'Emma Davis', timestamp: '4 days ago' },
    { id: 5, action: 'New user access granted', user: 'Alex Wilson', timestamp: '5 days ago' },
    { id: 6, action: 'Security incident logged', user: 'Jennifer Brown', timestamp: '6 days ago' },
    { id: 7, action: 'Password policy updated', user: 'David Clark', timestamp: '1 week ago' },
    { id: 8, action: 'Compliance report generated', user: 'Lisa Martinez', timestamp: '1 week ago' },
    { id: 9, action: 'Vendor assessment completed', user: 'Robert Taylor', timestamp: '2 weeks ago' },
    { id: 10, action: 'Training materials updated', user: 'Karen White', timestamp: '2 weeks ago' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <PageTransition>
            <div className="max-w-6xl mx-auto">
              <div className="mb-6">
                <h1 className="text-3xl font-semibold tracking-tight">Activities</h1>
                <p className="text-gray-500">Recent compliance-related activities</p>
              </div>
              
              <ScaleIn>
                <Card>
                  <CardHeader>
                    <CardTitle>All Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Shield size={16} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{activity.action}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {activity.timestamp} • {activity.user}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScaleIn>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default ActivitiesPage;
