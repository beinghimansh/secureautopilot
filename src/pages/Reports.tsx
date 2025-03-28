
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { BarChart, FileText, Download, Filter } from 'lucide-react';
import Button from '@/components/common/Button';
import { ScaleIn } from '@/components/common/Transitions';

const Reports = () => {
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
                  <h1 className="text-3xl font-semibold tracking-tight mb-2">Compliance Reports</h1>
                  <p className="text-gray-600">Generate and download compliance reports for your organization</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    leftIcon={<Filter size={16} />}
                  >
                    Filter
                  </Button>
                  <Button
                    leftIcon={<FileText size={16} />}
                  >
                    New Report
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <ScaleIn delay={100}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">ISO 27001</CardTitle>
                      <CardDescription>Last generated: 2 days ago</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <FileText size={20} className="text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Compliance Status Report</p>
                            <p className="text-xs text-gray-500">78% compliant</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Download size={14} />}
                        >
                          PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={150}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">GDPR</CardTitle>
                      <CardDescription>Last generated: 5 days ago</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <FileText size={20} className="text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Privacy Impact Assessment</p>
                            <p className="text-xs text-gray-500">92% compliant</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Download size={14} />}
                        >
                          PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={200}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">SOC 2</CardTitle>
                      <CardDescription>Last generated: 1 week ago</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <FileText size={20} className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Controls Summary</p>
                            <p className="text-xs text-gray-500">85% compliant</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Download size={14} />}
                        >
                          PDF
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Recent Reports</h2>
                <Card>
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Framework</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Generated</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {[
                            { name: 'Q1 Compliance Report', framework: 'ISO 27001', date: '2023-03-15', status: 'Complete' },
                            { name: 'GDPR Readiness Assessment', framework: 'GDPR', date: '2023-02-28', status: 'Complete' },
                            { name: 'Security Controls Assessment', framework: 'SOC 2', date: '2023-02-10', status: 'Complete' },
                            { name: 'Risk Assessment Report', framework: 'ISO 27001', date: '2023-01-25', status: 'Complete' },
                            { name: 'Vendor Security Audit', framework: 'HIPAA', date: '2023-01-15', status: 'Complete' },
                          ].map((report, idx) => (
                            <tr key={idx} className="hover:bg-gray-50">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <FileText size={16} className="text-gray-400 mr-2" />
                                  <div className="text-sm font-medium text-gray-900">{report.name}</div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{report.framework}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-gray-900">{report.date}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  {report.status}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  leftIcon={<Download size={14} />}
                                >
                                  Download
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
              
              <div>
                <h2 className="text-xl font-semibold mb-4">Analytics</h2>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center justify-center py-12">
                      <BarChart size={48} className="text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard Coming Soon</h3>
                      <p className="text-gray-500 max-w-md text-center">
                        We're working on a comprehensive analytics dashboard to help you visualize your compliance data.
                      </p>
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

export default Reports;
