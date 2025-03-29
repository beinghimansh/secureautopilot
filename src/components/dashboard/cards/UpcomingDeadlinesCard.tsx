
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScaleIn } from '@/components/common/Transitions';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Deadline {
  id: number;
  task: string;
  daysLeft: number;
  assignedTo: string;
}

interface UpcomingDeadlinesCardProps {
  deadlines: Deadline[];
  delay?: number;
}

const UpcomingDeadlinesCard = ({ deadlines, delay = 300 }: UpcomingDeadlinesCardProps) => {
  return (
    <ScaleIn delay={delay}>
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Deadlines</CardTitle>
          <CardDescription>Tasks due soon</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deadlines.map((deadline) => (
              <div key={deadline.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-yellow-600" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium">{deadline.task}</p>
                    <span className="text-xs bg-yellow-100 text-yellow-800 py-0.5 px-2 rounded">
                      {`${deadline.daysLeft} days left`}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Assigned to {deadline.assignedTo}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Link to="/tasks/upcoming">
              <Button
                variant="outline" 
                className="w-full"
                size="sm"
              >
                View All Deadlines
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </ScaleIn>
  );
};

export default UpcomingDeadlinesCard;
