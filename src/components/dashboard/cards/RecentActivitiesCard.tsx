
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScaleIn } from '@/components/common/Transitions';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Activity {
  id: number;
  description: string;
  daysAgo: number;
  user: string;
}

interface RecentActivitiesCardProps {
  activities: Activity[];
  delay?: number;
}

const RecentActivitiesCard = ({ activities, delay = 250 }: RecentActivitiesCardProps) => {
  return (
    <ScaleIn delay={delay}>
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activities</CardTitle>
          <CardDescription>Latest compliance updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {`${activity.daysAgo} day${activity.daysAgo > 1 ? 's' : ''} ago`} • {activity.user}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/reports/activities">
              <Button
                variant="link" 
                className="p-0 h-auto"
                size="sm"
              >
                View all activities
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </ScaleIn>
  );
};

export default RecentActivitiesCard;
