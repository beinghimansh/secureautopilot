
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckSquare, Clock, AlertCircle } from 'lucide-react';
import DashboardCard from '../common/DashboardCard';
import IconStat from '../common/IconStat';

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
  const viewAllButton = (
    <Link to="/tasks">
      <Button
        variant="outline" 
        className="w-full"
        size="sm"
      >
        View All Tasks
      </Button>
    </Link>
  );

  return (
    <DashboardCard 
      title="Tasks Status" 
      description="Compliance activities"
      footer={viewAllButton}
      delay={delay}
      contentClassName="py-4"
    >
      <div className="grid grid-cols-3 gap-2 text-center">
        <IconStat 
          icon={CheckSquare} 
          value={completedTasks} 
          label="Completed" 
          iconColor="text-green-600" 
          iconBgColor="bg-green-100" 
        />
        <IconStat 
          icon={Clock} 
          value={pendingTasks} 
          label="Pending" 
          iconColor="text-yellow-600" 
          iconBgColor="bg-yellow-100" 
        />
        <IconStat 
          icon={AlertCircle} 
          value={overdueTasks} 
          label="Overdue" 
          iconColor="text-red-600" 
          iconBgColor="bg-red-100" 
        />
      </div>
    </DashboardCard>
  );
};

export default TasksStatusCard;
