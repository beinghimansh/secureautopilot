
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import Button from '@/components/common/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/common/Card';
import { ScaleIn } from '@/components/common/Transitions';
import { AlertTriangle, AlertCircle, ArrowRight, Plus } from 'lucide-react';

const ComplianceRisksPage = () => {
  // Sample risk data
  const risks = [
    { 
      id: 1, 
      title: 'Unauthorized Access to Sensitive Data',
      category: 'Data Security',
      severity: 'High',
      likelihood: 'Medium',
      impact: 'High',
      status: 'Open',
      mitigation: 'Implement multi-factor authentication and review access controls'
    },
    { 
      id: 2, 
      title: 'Inadequate Backup Procedures',
      category: 'Business Continuity',
      severity: 'Medium',
      likelihood: 'Medium',
      impact: 'High',
      status: 'In Progress',
      mitigation: 'Develop and implement automated backup solutions with offsite storage'
    },
    { 
      id: 3, 
      title: 'Lack of Security Awareness Training',
      category: 'Human Factors',
      severity: 'Medium',
      likelihood: 'High',
      impact: 'Medium',
      status: 'Open',
      mitigation: 'Implement mandatory security awareness training program'
    },
    { 
      id: 4, 
      title: 'Outdated Software and Systems',
      category: 'Vulnerability Management',
      severity: 'High',
      likelihood: 'Medium',
      impact: 'High',
      status: 'In Progress',
      mitigation: 'Establish patch management process and regular vulnerability scanning'
    },
    { 
      id: 5, 
      title: 'Weak Password Policies',
      category: 'Access Control',
      severity: 'Medium',
      likelihood: 'High',
      impact: 'Medium',
      status: 'Mitigated',
      mitigation: 'Enforce strong password requirements and regular password changes'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <PageTransition>
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight">Risk Assessment</h1>
                  <p className="text-gray-500">Manage and mitigate security risks</p>
                </div>
                <Button leftIcon={<Plus size={16} />}>
                  Add Risk
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <ScaleIn delay={100}>
                  <Card className="bg-red-50 border-red-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                            <AlertTriangle size={20} className="text-red-600" />
                          </div>
                          <div>
                            <p className="text-sm text-red-800 font-medium">High Risk</p>
                            <p className="text-2xl font-bold text-red-900">4</p>
                          </div>
                        </div>
                        <ArrowRight size={18} className="text-red-500" />
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={150}>
                  <Card className="bg-yellow-50 border-yellow-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                            <AlertCircle size={20} className="text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-sm text-yellow-800 font-medium">Medium Risk</p>
                            <p className="text-2xl font-bold text-yellow-900">9</p>
                          </div>
                        </div>
                        <ArrowRight size={18} className="text-yellow-500" />
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={200}>
                  <Card className="bg-green-50 border-green-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <AlertCircle size={20} className="text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm text-green-800 font-medium">Low Risk</p>
                            <p className="text-2xl font-bold text-green-900">7</p>
                          </div>
                        </div>
                        <ArrowRight size={18} className="text-green-500" />
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle>Risk Register</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mitigation</th>
                          <th scope="col" className="relative px-6 py-3">
                            <span className="sr-only">Actions</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {risks.map((risk) => (
                          <tr key={risk.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{risk.title}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{risk.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${risk.severity === 'High' ? 'bg-red-100 text-red-800' : 
                                  risk.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                                  'bg-green-100 text-green-800'}`}>
                                {risk.severity}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${risk.status === 'Open' ? 'bg-red-100 text-red-800' : 
                                  risk.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 
                                  'bg-green-100 text-green-800'}`}>
                                {risk.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <div className="max-w-xs truncate">{risk.mitigation}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Button variant="link" size="sm">View</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default ComplianceRisksPage;
