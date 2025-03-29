
import React, { useState, useEffect } from 'react';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  description: string;
  due_date: string;
  assignee: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'completed' | 'overdue';
}

const TasksView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for demo purposes
  useEffect(() => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'Review information security policy',
        description: 'Review and approve the updated information security policy document',
        due_date: '2023-07-15',
        assignee: 'John Doe',
        priority: 'high',
        status: 'pending'
      },
      {
        id: '2',
        title: 'Complete security awareness training',
        description: 'All employees must complete the annual security awareness training module',
        due_date: '2023-07-22',
        assignee: 'All Employees',
        priority: 'medium',
        status: 'pending'
      },
      {
        id: '3',
        title: 'Implement access control review',
        description: 'Review and update access control permissions for all systems',
        due_date: '2023-07-10',
        assignee: 'Sarah Johnson',
        priority: 'high',
        status: 'overdue'
      },
      {
        id: '4',
        title: 'Update incident response plan',
        description: 'Review and update the incident response procedure document',
        due_date: '2023-07-30',
        assignee: 'Mike Smith',
        priority: 'medium',
        status: 'pending'
      },
      {
        id: '5',
        title: 'Conduct vulnerability scan',
        description: 'Perform quarterly vulnerability scan and document findings',
        due_date: '2023-06-30',
        assignee: 'IT Security Team',
        priority: 'high',
        status: 'completed'
      }
    ];

    setTimeout(() => {
      setTasks(mockTasks);
      setFilteredTasks(mockTasks);
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(task => task.status === filter));
    }
  }, [filter, tasks]);

  const handleCompleteTask = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: 'completed' as const };
      }
      return task;
    });
    setTasks(updatedTasks);
    toast.success('Task marked as complete');
  };

  const getTaskIcon = (status: string, priority: string) => {
    if (status === 'completed') {
      return <CheckCircle className="text-green-500" />;
    }
    if (status === 'overdue') {
      return <AlertTriangle className="text-red-500" />;
    }
    return <Clock className={`${priority === 'high' ? 'text-orange-500' : 'text-blue-500'}`} />;
  };

  const getPriorityBadge = (priority: string) => {
    if (priority === 'high') {
      return <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">high</span>;
    }
    if (priority === 'medium') {
      return <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">medium</span>;
    }
    return <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">low</span>;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Compliance Tasks</h2>
        
        <div className="flex mb-6 overflow-x-auto">
          <div className="inline-flex p-1 bg-white border border-gray-200 rounded-lg shadow-sm">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('pending')} 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'pending' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Pending
            </button>
            <button 
              onClick={() => setFilter('completed')} 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'completed' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Completed
            </button>
            <button 
              onClick={() => setFilter('overdue')} 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                filter === 'overdue' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Overdue
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {filteredTasks.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-600">No tasks found matching the selected filter.</p>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    {getTaskIcon(task.status, task.priority)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{task.title}</h3>
                      {getPriorityBadge(task.priority)}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{task.description}</p>
                    <div className="text-xs text-gray-500">
                      <span>Due: {task.due_date}</span>
                      <span className="mx-2">•</span>
                      <span>Assignee: {task.assignee}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  {task.status !== 'completed' && (
                    <Button 
                      onClick={() => handleCompleteTask(task.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Complete
                    </Button>
                  )}
                  <Button variant="outline">
                    Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TasksView;
