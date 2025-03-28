
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Clock } from 'lucide-react';
import { ScaleIn } from '@/components/common/Transitions';

const UpcomingDeadlinesPage = () => {
  // Sample deadline data
  const deadlines = [
    { id: 1, task: 'Complete security training', assignee: 'All Staff', daysLeft: 2 },
    { id: 2, task: 'Update access controls', assignee: 'IT Security', daysLeft: 4 },
    { id: 3, task: 'Review vendor compliance', assignee: 'Compliance Team', daysLeft: 6 },
    { id: 4, task: 'Conduct risk assessment', assignee: 'Security Officer', daysLeft: 7 },
    { id: 5, task: 'Update business continuity plan', assignee: 'Management Team', daysLeft: 10 },
    { id: 6, task: 'Review incident response procedures', assignee: 'IT Security', daysLeft: 12 },
    { id: 7, task: 'Update asset inventory', assignee: 'IT Department', daysLeft: 14 },
    { id: 8, task: 'Quarterly compliance review', assignee: 'Compliance Officer', daysLeft: 18 }
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
                <h1 className="text-3xl font-semibold tracking-tight">Upcoming Deadlines</h1>
                <p className="text-gray-500">Tasks that are due soon</p>
              </div>
              
              <ScaleIn>
                <Card>
                  <CardHeader>
                    <CardTitle>All Deadlines</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deadlines.map((deadline) => (
                        <div key={deadline.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
                          <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0">
                            <Clock size={16} className="text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <p className="text-sm font-medium">{deadline.task}</p>
                              <span className={`text-xs py-0.5 px-2 rounded ${
                                deadline.daysLeft <= 3 
                                  ? 'bg-red-100 text-red-800' 
                                  : deadline.daysLeft <= 7 
                                    ? 'bg-yellow-100 text-yellow-800' 
                                    : 'bg-blue-100 text-blue-800'
                              }`}>
                                {deadline.daysLeft} days left
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              Assigned to {deadline.assignee}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">Mark Complete</Button>
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

export default UpcomingDeadlinesPage;
