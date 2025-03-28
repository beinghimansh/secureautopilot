
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import FrameworkSelector from '@/components/compliance/FrameworkSelector';
import PolicyGenerator from '@/components/compliance/PolicyGenerator';
import { PageTransition } from '@/components/common/Transitions';
import Button from '@/components/common/Button';
import { Download, Eye, ArrowLeft, Grid, FileText, List } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/common/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const frameworkNames: Record<string, string> = {
  'iso27001': 'ISO 27001',
  'soc2': 'SOC 2',
  'gdpr': 'GDPR',
  'hipaa': 'HIPAA',
  'pci_dss': 'PCI DSS',
};

const CompliancePage = () => {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [policyGenerated, setPolicyGenerated] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activePolicies, setActivePolicies] = useState<any[]>([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    // In a real app, you would fetch the active policies from your database
    // This is just for demo purposes
    setActivePolicies([
      {
        id: '1',
        title: 'SOC 2 Information Security Policy',
        framework: 'soc2',
        status: 'active',
        created_at: '2023-08-15T10:30:00Z',
        pages: 12
      },
      {
        id: '2',
        title: 'GDPR Data Protection Policy',
        framework: 'gdpr',
        status: 'draft',
        created_at: '2023-09-02T14:45:00Z',
        pages: 8
      }
    ]);
  }, []);
  
  const handleSelectFramework = (frameworkId: string) => {
    setSelectedFramework(frameworkId);
    setPolicyGenerated(false);
  };
  
  const handlePolicyGenerated = () => {
    setPolicyGenerated(true);
  };

  const handleViewRequirements = () => {
    if (selectedFramework) {
      navigate(`/compliance/${selectedFramework}/requirements`);
    }
  };
  
  const handleViewPolicies = () => {
    toast.info('Viewing policies');
  };
  
  const handleDownloadPolicies = () => {
    toast.success('Policies downloaded successfully');
  };

  const getPolicyStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <span className="inline-flex items-center text-xs bg-green-100 text-green-800 rounded-full px-2 py-1">Active</span>;
      case 'draft':
        return <span className="inline-flex items-center text-xs bg-yellow-100 text-yellow-800 rounded-full px-2 py-1">Draft</span>;
      case 'archived':
        return <span className="inline-flex items-center text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1">Archived</span>;
      default:
        return null;
    }
  };
  
  const renderFrameworkSelector = () => {
    return <FrameworkSelector onSelectFramework={handleSelectFramework} />;
  };

  const renderPolicyGenerator = () => {
    if (!selectedFramework) return null;
    return (
      <PolicyGenerator 
        frameworkId={selectedFramework} 
        onComplete={handlePolicyGenerated} 
      />
    );
  };

  const renderGeneratedPolicies = () => {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Policies Generated Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Your compliance policies have been generated and are ready for review
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[
            {
              title: 'Information Security Policy',
              description: 'Defines how your organization manages, protects and distributes information',
              status: 'Ready for review',
              pages: 12
            },
            {
              title: 'Risk Assessment',
              description: 'Analysis of potential risks and vulnerabilities to your organization',
              status: 'Ready for review',
              pages: 8
            },
            {
              title: 'Access Control Policy',
              description: 'Procedures for controlling access to information and systems',
              status: 'Ready for review',
              pages: 6
            },
            {
              title: 'Incident Response Plan',
              description: 'Procedures to detect, respond to and recover from security incidents',
              status: 'Ready for review',
              pages: 10
            }
          ].map((policy, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-lg">{policy.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">{policy.description}</p>
                  <div className="flex items-center mt-3">
                    <span className="inline-flex items-center text-xs bg-green-100 text-green-800 rounded-full px-2 py-1">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                      {policy.status}
                    </span>
                    <span className="text-xs text-gray-500 ml-2">{policy.pages} pages</span>
                  </div>
                </div>
                <div className="flex">
                  <button className="text-gray-500 hover:text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            leftIcon={<Eye size={18} />}
            onClick={handleViewPolicies}
          >
            View Policies
          </Button>
          <Button
            variant="outline"
            leftIcon={<Download size={18} />}
            onClick={handleDownloadPolicies}
          >
            Download All (PDF)
          </Button>
          <Button 
            variant="outline"
            leftIcon={<ArrowLeft size={18} />}
            onClick={() => setSelectedFramework(null)}
          >
            Back to Frameworks
          </Button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-xl font-medium mb-4">Next Steps</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-blue-800 mb-3">Ready to implement these policies? View and manage your compliance requirements:</p>
            <Button onClick={handleViewRequirements}>
              View Compliance Requirements
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderAllPolicies = () => {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Policy Library</h2>
            <div className="flex space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                leftIcon={<Grid size={16} />}
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                leftIcon={<List size={16} />}
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
            </div>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Policies</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {activePolicies.map((policy) => (
                    <div key={policy.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center mb-3">
                          <FileText size={20} className="text-blue-600 mr-2" />
                          <h3 className="font-medium text-gray-900">{policy.title}</h3>
                        </div>
                        {getPolicyStatusBadge(policy.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Framework: {frameworkNames[policy.framework] || policy.framework}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(policy.created_at).toLocaleDateString()}
                        </span>
                        <div className="space-x-2">
                          <Button size="sm" variant="ghost">Edit</Button>
                          <Button size="sm" variant="ghost">View</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Policy</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Framework</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {activePolicies.map((policy) => (
                        <tr key={policy.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText size={20} className="text-blue-600 mr-2" />
                              <div className="text-sm font-medium text-gray-900">{policy.title}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{frameworkNames[policy.framework] || policy.framework}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getPolicyStatusBadge(policy.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(policy.created_at).toLocaleDateString()}
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
              )}
            </TabsContent>

            <TabsContent value="active">
              <div className="text-center py-8">
                <p>Active policies content would be shown here</p>
              </div>
            </TabsContent>

            <TabsContent value="draft">
              <div className="text-center py-8">
                <p>Draft policies content would be shown here</p>
              </div>
            </TabsContent>
          </Tabs>

          {activePolicies.length === 0 && (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <FileText size={40} className="mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No policies yet</h3>
              <p className="text-gray-500 mb-4">Get started by generating your first policy</p>
              <Button onClick={() => setSelectedFramework(null)}>Choose a Framework</Button>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <PageTransition>
            <div className="max-w-6xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight mb-2">Compliance Frameworks</h1>
                <p className="text-gray-600">Choose a framework to start automating your compliance</p>
              </div>
              
              <Tabs defaultValue="frameworks" className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                  <TabsTrigger value="policies">Policy Library</TabsTrigger>
                </TabsList>

                <TabsContent value="frameworks">
                  {!selectedFramework ? (
                    renderFrameworkSelector()
                  ) : !policyGenerated ? (
                    renderPolicyGenerator()
                  ) : (
                    renderGeneratedPolicies()
                  )}
                </TabsContent>

                <TabsContent value="policies">
                  {renderAllPolicies()}
                </TabsContent>
              </Tabs>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default CompliancePage;
