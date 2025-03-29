
import React from 'react';
import { FadeIn } from '@/components/common/Transitions';
import { Button } from '@/components/ui/button';
import { FileText, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import RecentActivitiesCard from './cards/RecentActivitiesCard';
import UpcomingDeadlinesCard from './cards/UpcomingDeadlinesCard';

const DashboardCommon = () => {
  // Mock data for common dashboard sections
  const activities = [
    { id: 1, description: 'Information Security Policy updated', daysAgo: 1, user: 'John Doe' },
    { id: 2, description: 'Risk assessment completed', daysAgo: 2, user: 'Sarah Lee' },
    { id: 3, description: 'Access control review', daysAgo: 3, user: 'Mike Johnson' },
    { id: 4, description: 'Data backup verification', daysAgo: 4, user: 'Emma Davis' }
  ];

  const deadlines = [
    { id: 1, task: 'Complete security training', daysLeft: 2, assignedTo: 'All Staff' },
    { id: 2, task: 'Update access controls', daysLeft: 4, assignedTo: 'IT Security' },
    { id: 3, task: 'Review vendor compliance', daysLeft: 6, assignedTo: 'Compliance Team' }
  ];

  return (
    <>
      <FadeIn>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="flex-1">
            {/* This space is for the welcome message in the parent component */}
          </div>
          <div className="flex items-center gap-2">
            <Link to="/reports/export">
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <FileText size={16} />
                Export Report
              </Button>
            </Link>
            <Link to="/reports/analytics">
              <Button
                className="flex items-center gap-2"
              >
                <BarChart size={16} />
                View Analytics
              </Button>
            </Link>
          </div>
        </div>
      </FadeIn>
      
      {/* Common lower section - appears for all users */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <RecentActivitiesCard activities={activities} delay={250} />
        <UpcomingDeadlinesCard deadlines={deadlines} delay={300} />
      </div>
    </>
  );
};

export default DashboardCommon;
