
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Users, UserPlus, Mail, Shield, CheckSquare, FileText, Search } from 'lucide-react';
import Button from '@/components/common/Button';
import { ScaleIn } from '@/components/common/Transitions';

const Team = () => {
  const teamMembers = [
    { 
      id: 1, 
      name: 'John Doe', 
      role: 'Compliance Officer', 
      email: 'john.doe@example.com',
      avatar: 'JD',
      lastActive: '10 minutes ago',
      status: 'active'
    },
    { 
      id: 2, 
      name: 'Sarah Lee', 
      role: 'IT Security', 
      email: 'sarah.lee@example.com',
      avatar: 'SL',
      lastActive: '2 hours ago',
      status: 'active'
    },
    { 
      id: 3, 
      name: 'Mike Johnson', 
      role: 'Auditor', 
      email: 'mike.johnson@example.com',
      avatar: 'MJ',
      lastActive: '1 day ago',
      status: 'active'
    },
    { 
      id: 4, 
      name: 'Emma Davis', 
      role: 'Company Admin', 
      email: 'emma.davis@example.com',
      avatar: 'ED',
      lastActive: '5 days ago',
      status: 'active'
    },
    { 
      id: 5, 
      name: 'James Wilson', 
      role: 'Employee', 
      email: 'james.wilson@example.com',
      avatar: 'JW',
      lastActive: '2 weeks ago',
      status: 'inactive'
    }
  ];
  
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
                  <h1 className="text-3xl font-semibold tracking-tight mb-2">Team Management</h1>
                  <p className="text-gray-600">Manage your compliance team members and their roles</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    leftIcon={<Mail size={16} />}
                  >
                    Invite Team
                  </Button>
                  <Button
                    leftIcon={<UserPlus size={16} />}
                  >
                    Add Member
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <ScaleIn delay={100}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Team Overview</CardTitle>
                      <CardDescription>Current team status</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Users size={18} className="text-primary" />
                            <span className="text-sm font-medium">Total Members</span>
                          </div>
                          <span className="text-2xl font-semibold">5</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield size={18} className="text-green-600" />
                            <span className="text-sm font-medium">Admins</span>
                          </div>
                          <span className="text-2xl font-semibold">2</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckSquare size={18} className="text-blue-600" />
                            <span className="text-sm font-medium">Active</span>
                          </div>
                          <span className="text-2xl font-semibold">4</span>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText size={18} className="text-yellow-600" />
                            <span className="text-sm font-medium">Pending</span>
                          </div>
                          <span className="text-2xl font-semibold">1</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={150}>
                  <Card className="hover:shadow-lg transition-all duration-300 md:col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Role Distribution</CardTitle>
                      <CardDescription>Team members by role</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-4 mt-4">
                        {[
                          { role: 'Compliance Officer', count: 1, color: 'bg-blue-500' },
                          { role: 'IT Security', count: 1, color: 'bg-green-500' },
                          { role: 'Auditor', count: 1, color: 'bg-yellow-500' },
                          { role: 'Company Admin', count: 1, color: 'bg-purple-500' },
                          { role: 'Employee', count: 1, color: 'bg-gray-500' },
                        ].map((item, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{item.role}</span>
                              <span className="text-sm font-medium">{item.count}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.count / 5) * 100}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
              </div>
              
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Team Members</h2>
                  <div className="relative w-64">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search members..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {teamMembers.map((member) => (
                            <tr key={member.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                                    {member.avatar}
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-gray-900">{member.name}</div>
                                    <div className="text-sm text-gray-500">{member.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{member.role}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-500">{member.lastActive}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  member.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                                }`}>
                                  {member.status === 'active' ? 'Active' : 'Inactive'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button variant="ghost" size="sm">View</Button>
                                <Button variant="ghost" size="sm">Edit</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Pending Invitations</h2>
                <Card>
                  <CardContent className="p-6 text-center">
                    <div className="flex flex-col items-center justify-center py-6">
                      <Mail size={48} className="text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No Pending Invitations</h3>
                      <p className="text-gray-500 mb-4">There are no pending team invitations at this time.</p>
                      <Button
                        variant="outline"
                        leftIcon={<Mail size={16} />}
                      >
                        Send Invitation
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default Team;
