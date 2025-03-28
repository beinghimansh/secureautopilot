
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Cloud, Shield, AlertCircle, CheckCircle, Server, Database, Lock } from 'lucide-react';
import Button from '@/components/common/Button';
import { ScaleIn } from '@/components/common/Transitions';

const CloudSecurity = () => {
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
                  <h1 className="text-3xl font-semibold tracking-tight mb-2">Cloud Security</h1>
                  <p className="text-gray-600">Monitor and manage security across your cloud infrastructure</p>
                </div>
                <div>
                  <Button
                    leftIcon={<Shield size={16} />}
                  >
                    Run Security Scan
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <ScaleIn delay={100}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Security Posture</CardTitle>
                      <CardDescription>Overall cloud security status</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex items-center justify-center py-4">
                        <div className="relative flex items-center justify-center">
                          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                            <circle
                              className="text-gray-200"
                              strokeWidth="8"
                              stroke="currentColor"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                            />
                            <circle
                              className="text-green-500"
                              strokeWidth="8"
                              strokeDasharray={251.2}
                              strokeDashoffset={251.2 * 0.15}
                              strokeLinecap="round"
                              stroke="currentColor"
                              fill="transparent"
                              r="40"
                              cx="50"
                              cy="50"
                            />
                          </svg>
                          <span className="absolute text-2xl font-bold text-green-500">85%</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm mt-2">
                        <div className="flex items-center">
                          <CheckCircle size={16} className="text-green-500 mr-1" />
                          <span>249 passed checks</span>
                        </div>
                        <div className="flex items-center">
                          <AlertCircle size={16} className="text-red-500 mr-1" />
                          <span>32 failed checks</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={150}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Critical Issues</CardTitle>
                      <CardDescription>High priority security concerns</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                              <AlertCircle size={14} className="text-red-600" />
                            </div>
                            <span className="text-sm">Open S3 Buckets</span>
                          </div>
                          <span className="text-sm font-medium">3</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                              <AlertCircle size={14} className="text-red-600" />
                            </div>
                            <span className="text-sm">Unencrypted Databases</span>
                          </div>
                          <span className="text-sm font-medium">2</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-2">
                              <AlertCircle size={14} className="text-red-600" />
                            </div>
                            <span className="text-sm">Exposed API Keys</span>
                          </div>
                          <span className="text-sm font-medium">1</span>
                        </div>
                        <div className="pt-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            View All Issues
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={200}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Compliance Status</CardTitle>
                      <CardDescription>Regulatory compliance overview</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-3">
                        {[
                          { name: 'ISO 27001', score: 92, color: 'bg-green-500' },
                          { name: 'GDPR', score: 88, color: 'bg-green-500' },
                          { name: 'SOC 2', score: 79, color: 'bg-yellow-500' },
                          { name: 'HIPAA', score: 94, color: 'bg-green-500' },
                        ].map((framework, idx) => (
                          <div key={idx}>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-sm">{framework.name}</span>
                              <span className="text-sm font-medium">{framework.score}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div className={`${framework.color} h-2 rounded-full`} style={{ width: `${framework.score}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Cloud Resources</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: 'EC2 Instances', icon: <Server size={20} />, count: 24, status: 'Secured' },
                    { name: 'S3 Buckets', icon: <Database size={20} />, count: 18, status: 'Review Needed' },
                    { name: 'RDS Databases', icon: <Database size={20} />, count: 7, status: 'Secured' },
                    { name: 'Lambda Functions', icon: <Server size={20} />, count: 42, status: 'Secured' },
                  ].map((resource, idx) => (
                    <Card key={idx} className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-2 bg-blue-100 rounded-full">
                            <div className="text-blue-600">
                              {resource.icon}
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            resource.status === 'Secured' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {resource.status}
                          </span>
                        </div>
                        <h3 className="font-medium">{resource.name}</h3>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-gray-500 text-sm">Count</span>
                          <span className="text-xl font-semibold">{resource.count}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Security Recommendations</h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Issue</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {[
                            { issue: 'Public S3 bucket', resource: 'customer-data-backup', severity: 'High' },
                            { issue: 'Unencrypted database', resource: 'user-profiles-db', severity: 'High' },
                            { issue: 'Root account access keys', resource: 'AWS Account', severity: 'Critical' },
                            { issue: 'Security group open to world', resource: 'api-server-sg', severity: 'Medium' },
                            { issue: 'Outdated runtime', resource: 'notification-lambda', severity: 'Low' },
                          ].map((item, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <AlertCircle size={16} className={`mr-2 ${
                                    item.severity === 'Critical' ? 'text-red-600' :
                                    item.severity === 'High' ? 'text-orange-500' :
                                    item.severity === 'Medium' ? 'text-yellow-500' :
                                    'text-blue-500'
                                  }`} />
                                  <div className="text-sm font-medium text-gray-900">{item.issue}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{item.resource}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  item.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                                  item.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                                  item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {item.severity}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  leftIcon={<Lock size={14} />}
                                >
                                  Remediate
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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

export default CloudSecurity;
