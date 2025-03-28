
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Bell, Settings, CheckCircle, Clock, AlertTriangle, Shield, FileText, Database } from 'lucide-react';
import Button from '@/components/common/Button';
import { ScaleIn } from '@/components/common/Transitions';

const Notifications = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <PageTransition>
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight mb-2">Notifications</h1>
                  <p className="text-gray-600">Stay updated on compliance alerts and tasks</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    leftIcon={<Settings size={16} />}
                  >
                    Notification Settings
                  </Button>
                  <Button
                    leftIcon={<Bell size={16} />}
                  >
                    Mark All as Read
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <ScaleIn delay={100}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Notification Summary</CardTitle>
                      <CardDescription>Last 30 days</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="grid grid-cols-3 gap-2 mt-4">
                        <div className="flex flex-col items-center p-2">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-2">
                            <CheckCircle size={18} className="text-green-600" />
                          </div>
                          <span className="text-2xl font-semibold">28</span>
                          <span className="text-xs text-gray-500">Updates</span>
                        </div>
                        <div className="flex flex-col items-center p-2">
                          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mb-2">
                            <Clock size={18} className="text-yellow-600" />
                          </div>
                          <span className="text-2xl font-semibold">12</span>
                          <span className="text-xs text-gray-500">Reminders</span>
                        </div>
                        <div className="flex flex-col items-center p-2">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-2">
                            <AlertTriangle size={18} className="text-red-600" />
                          </div>
                          <span className="text-2xl font-semibold">3</span>
                          <span className="text-xs text-gray-500">Alerts</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={150}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Filter Notifications</CardTitle>
                      <CardDescription>View by category</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex flex-wrap gap-2 mt-3">
                        <Button size="sm" variant="outline" className="rounded-full">All</Button>
                        <Button size="sm" variant="outline" className="rounded-full flex gap-1 items-center">
                          <Shield size={14} />
                          <span>Security</span>
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full flex gap-1 items-center">
                          <FileText size={14} />
                          <span>Compliance</span>
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full flex gap-1 items-center">
                          <Clock size={14} />
                          <span>Tasks</span>
                        </Button>
                        <Button size="sm" variant="outline" className="rounded-full flex gap-1 items-center">
                          <Database size={14} />
                          <span>System</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={200}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Quick Actions</CardTitle>
                      <CardDescription>Common notification tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-2 mt-3">
                        <Button size="sm" variant="outline" className="w-full justify-start">
                          <CheckCircle size={14} className="mr-2" />
                          Mark all as read
                        </Button>
                        <Button size="sm" variant="outline" className="w-full justify-start">
                          <Bell size={14} className="mr-2" />
                          Mute for 1 hour
                        </Button>
                        <Button size="sm" variant="outline" className="w-full justify-start">
                          <Settings size={14} className="mr-2" />
                          Notification preferences
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-200">
                      {[
                        { 
                          id: 1, 
                          type: 'alert', 
                          title: 'Critical Security Alert', 
                          message: 'Unauthorized access attempt detected for your AWS account.', 
                          time: '10 minutes ago',
                          icon: <AlertTriangle size={16} className="text-red-600" />,
                          read: false
                        },
                        { 
                          id: 2, 
                          type: 'task', 
                          title: 'Task Due Today', 
                          message: 'Complete security training needs to be finished today.', 
                          time: '1 hour ago',
                          icon: <Clock size={16} className="text-yellow-600" />,
                          read: false
                        },
                        { 
                          id: 3, 
                          type: 'update', 
                          title: 'Policy Updated', 
                          message: 'Information Security Policy has been updated with new requirements.', 
                          time: '3 hours ago',
                          icon: <FileText size={16} className="text-blue-600" />,
                          read: true
                        },
                        { 
                          id: 4, 
                          type: 'reminder', 
                          title: 'Compliance Review', 
                          message: 'Your quarterly compliance review is scheduled for next week.', 
                          time: '5 hours ago',
                          icon: <Shield size={16} className="text-green-600" />,
                          read: true
                        },
                        { 
                          id: 5, 
                          type: 'system', 
                          title: 'System Maintenance', 
                          message: 'Scheduled maintenance will occur this weekend. No downtime expected.', 
                          time: '1 day ago',
                          icon: <Settings size={16} className="text-gray-600" />,
                          read: true
                        },
                      ].map((notification) => (
                        <div 
                          key={notification.id} 
                          className={`p-4 hover:bg-gray-50 flex items-start gap-3 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-full ${
                            notification.type === 'alert' ? 'bg-red-100' :
                            notification.type === 'task' ? 'bg-yellow-100' :
                            notification.type === 'update' ? 'bg-blue-100' :
                            notification.type === 'reminder' ? 'bg-green-100' :
                            'bg-gray-100'
                          } flex items-center justify-center flex-shrink-0`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
                              <span className="text-xs text-gray-500">{notification.time}</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            <div className="flex gap-2 mt-2">
                              <Button variant="ghost" size="sm">Mark as Read</Button>
                              <Button variant="ghost" size="sm">View Details</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" size="sm">Load More Notifications</Button>
              </div>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default Notifications;
