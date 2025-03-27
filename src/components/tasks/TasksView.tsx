
import React, { useState } from 'react';
import { CheckCircle, Clock, Circle, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';
import Button from '../common/Button';
import { FadeIn } from '../common/Transitions';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'completed' | 'pending' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  assignee: string;
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review information security policy',
    description: 'Review and approve the updated information security policy document',
    dueDate: '2023-07-15',
    status: 'completed',
    priority: 'high',
    assignee: 'John Doe',
  },
  {
    id: '2',
    title: 'Complete security awareness training',
    description: 'All employees must complete the annual security awareness training module',
    dueDate: '2023-07-22',
    status: 'pending',
    priority: 'medium',
    assignee: 'All Employees',
  },
  {
    id: '3',
    title: 'Implement access control review',
    description: 'Review and update access control permissions for all systems',
    dueDate: '2023-07-10',
    status: 'overdue',
    priority: 'high',
    assignee: 'Sarah Johnson',
  },
  {
    id: '4',
    title: 'Update incident response plan',
    description: 'Review and update the incident response procedure document',
    dueDate: '2023-07-30',
    status: 'pending',
    priority: 'medium',
    assignee: 'Mike Smith',
  },
  {
    id: '5',
    title: 'Conduct vulnerability scan',
    description: 'Run a comprehensive vulnerability scan on all production systems',
    dueDate: '2023-07-25',
    status: 'pending',
    priority: 'high',
    assignee: 'IT Security Team',
  },
];

const TasksView = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });
  
  const completeTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: 'completed' } : task
    ));
  };
  
  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={18} className="text-green-500" />;
      case 'pending':
        return <Clock size={18} className="text-blue-500" />;
      case 'overdue':
        return <AlertCircle size={18} className="text-red-500" />;
      default:
        return <Circle size={18} className="text-gray-500" />;
    }
  };
  
  const getPriorityBadge = (priority: Task['priority']) => {
    const classes = {
      high: 'bg-red-100 text-red-800',
      medium: 'bg-yellow-100 text-yellow-800',
      low: 'bg-green-100 text-green-800',
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes[priority]}`}>
        {priority}
      </span>
    );
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">Compliance Tasks</h2>
        <div className="inline-flex border rounded-md overflow-hidden">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 text-sm font-medium ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-3 py-1 text-sm font-medium ${filter === 'pending' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 text-sm font-medium ${filter === 'completed' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Completed
          </button>
          <button
            onClick={() => setFilter('overdue')}
            className={`px-3 py-1 text-sm font-medium ${filter === 'overdue' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
          >
            Overdue
          </button>
        </div>
      </div>
      
      {filteredTasks.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <CheckCircle size={32} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
            <p className="text-gray-500">
              {filter === 'all' 
                ? 'No compliance tasks have been assigned yet.'
                : `No ${filter} tasks at the moment.`}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks.map((task, index) => (
            <FadeIn key={task.id} delay={index * 50}>
              <Card className={`hover:shadow-premium-md transition-all duration-300 ${task.status === 'completed' ? 'bg-gray-50 border-gray-100' : ''}`}>
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        {getStatusIcon(task.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900">{task.title}</h3>
                          {getPriorityBadge(task.priority)}
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{task.description}</p>
                        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                          <span>Assignee: {task.assignee}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-2 sm:mt-0">
                      {task.status !== 'completed' && (
                        <Button
                          size="sm"
                          onClick={() => completeTask(task.id)}
                          leftIcon={<CheckCircle size={14} />}
                        >
                          Complete
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
};

export default TasksView;
