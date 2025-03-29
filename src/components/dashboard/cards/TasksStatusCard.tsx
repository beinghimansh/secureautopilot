
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScaleIn } from '@/components/common/Transitions';
import { CheckSquare, Clock, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TasksStatusCardProps {
  completedTasks: number;
  pendingTasks: number;
  overdueTasks: number;
  delay?: number;
}

const TasksStatusCard = ({ 
  completedTasks, 
  pendingTasks, 
  overdueTasks, 
  delay = 150 
}: TasksStatusCardProps) => {
  return (
    <ScaleIn delay={delay}>
      <Card className="hover:shadow-md transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Tasks Status</CardTitle>
          <CardDescription>Compliance activities</CardDescription>
        </CardHeader>
        <CardContent className="py-4">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center p-2">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                <CheckSquare size={18} className="text-green-600" />
              </div>
              <span className="text-2xl font-semibold">{completedTasks}</span>
              <span className="text-xs text-gray-500">Completed</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                <Clock size={18} className="text-yellow-600" />
              </div>
              <span className="text-2xl font-semibold">{pendingTasks}</span>
              <span className="text-xs text-gray-500">Pending</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                <AlertCircle size={18} className="text-red-600" />
              </div>
              <span className="text-2xl font-semibold">{overdueTasks}</span>
              <span className="text-xs text-gray-500">Overdue</span>
            </div>
          </div>
          <div className="mt-4">
            <Link to="/tasks">
              <Button
                variant="outline" 
                className="w-full"
                size="sm"
              >
                View All Tasks
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </ScaleIn>
  );
};

export default TasksStatusCard;
