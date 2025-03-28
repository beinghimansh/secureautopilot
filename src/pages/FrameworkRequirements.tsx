
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { useParams, useNavigate } from 'react-router-dom';
import FrameworkControls from '@/components/compliance/FrameworkControls';
import RulesDisplay from '@/components/compliance/RulesDisplay';
import { Card, CardContent } from '@/components/common/Card';
import { FileText, AlertTriangle, Plus, Download, ArrowRight, Loader2 } from 'lucide-react';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { supabase } from '@/integrations/supabase/client';

interface Risk {
  id: string;
  title: string;
  description: string;
  likelihood: 'low' | 'medium' | 'high';
  impact: 'low' | 'medium' | 'high';
  status: 'identified' | 'assessed' | 'mitigated' | 'accepted';
  created_at: string;
}

interface PolicyFormData {
  companyName: string;
  industry: string;
  companySize: string;
  dataTypes: string;
}

const FrameworkRequirements = () => {
  const { frameworkId = 'iso27001' } = useParams<{ frameworkId: string }>();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('controls');
  const [risks, setRisks] = useState<Risk[]>([]);
  const [showAddRisk, setShowAddRisk] = useState(false);
  const [newRisk, setNewRisk] = useState({
    title: '',
    description: '',
    likelihood: 'medium',
    impact: 'medium',
  });
  const [showPolicyGenerator, setShowPolicyGenerator] = useState(false);
  const [policyFormData, setPolicyFormData] = useState<PolicyFormData>({
    companyName: '',
    industry: '',
    companySize: '',
    dataTypes: '',
  });
  const [generatingPolicy, setGeneratingPolicy] = useState(false);
  const [policies, setPolicies] = useState<any[]>([]);
  const [showPolicyContent, setShowPolicyContent] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<any>(null);
  
  // Fetch framework data (in a real app)
  useEffect(() => {
    // Simulated risks data
    setRisks([
      {
        id: '1',
        title: 'Unauthorized Data Access',
        description: 'Risk of sensitive data being accessed by unauthorized personnel',
        likelihood: 'medium',
        impact: 'high',
        status: 'assessed',
        created_at: new Date().toISOString(),
      },
      {
        id: '2',
        title: 'System Downtime',
        description: 'Risk of critical systems experiencing unexpected downtime',
        likelihood: 'low',
        impact: 'high',
        status: 'mitigated',
        created_at: new Date().toISOString(),
      },
    ]);
  }, [frameworkId]);

  // Sample rules data
  const rules = [
    {
      id: 1,
      number: 'A.5.1',
      content: "Policies for information security",
    },
    {
      id: 2,
      number: 'A.5.2',
      content: "Information security roles and responsibilities",
    },
    {
      id: 3,
      number: 'A.5.3',
      content: "Segregation of duties",
    },
    {
      id: 4,
      number: 'A.5.4',
      content: "Management responsibilities",
    },
    {
      id: 5,
      number: 'A.5.5',
      content: "Contact with authorities",
    },
    {
      id: 6,
      number: 'A.5.6',
      content: "Contact with special interest groups",
    },
    {
      id: 7,
      number: 'A.5.7',
      content: "Threat intelligence",
    }
  ];

  const handleAddRisk = () => {
    if (!newRisk.title || !newRisk.description) {
      toast.error('Please provide both title and description for the risk');
      return;
    }

    const risk: Risk = {
      id: Date.now().toString(),
      title: newRisk.title,
      description: newRisk.description,
      likelihood: newRisk.likelihood as 'low' | 'medium' | 'high',
      impact: newRisk.impact as 'low' | 'medium' | 'high',
      status: 'identified',
      created_at: new Date().toISOString(),
    };

    setRisks([...risks, risk]);
    setNewRisk({
      title: '',
      description: '',
      likelihood: 'medium',
      impact: 'medium',
    });
    setShowAddRisk(false);
    toast.success('Risk added successfully');
  };

  const handlePolicyFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPolicyFormData({ ...policyFormData, [name]: value });
  };

  const handleGeneratePolicy = async () => {
    // Validate form data
    if (!policyFormData.companyName || !policyFormData.industry || !policyFormData.companySize || !policyFormData.dataTypes) {
      toast.error('Please fill in all required fields');
      return;
    }

    setGeneratingPolicy(true);

    try {
      const { data, error } = await supabase.functions.invoke('generate-policy', {
        body: {
          companyName: policyFormData.companyName,
          industry: policyFormData.industry,
          companySize: policyFormData.companySize,
          dataTypes: policyFormData.dataTypes,
          frameworkType: frameworkId
        }
      });

      if (error) {
        throw error;
      }

      // Add the newly generated policy to the policies array
      const newPolicy = {
        id: Date.now().toString(),
        name: `${frameworkId.toUpperCase()} Policy - ${policyFormData.companyName}`,
        created_at: new Date().toISOString(),
        framework: frameworkId,
        company: policyFormData.companyName,
        content: data.policy,
        riskAssessment: data.riskAssessment,
        implementationGuide: data.implementationGuide,
        gapsAnalysis: data.gapsAnalysis
      };

      setPolicies([newPolicy, ...policies]);
      setShowPolicyGenerator(false);
      toast.success('Policy generated successfully');
    } catch (error) {
      console.error('Error generating policy:', error);
      toast.error('Failed to generate policy. Please try again.');
    } finally {
      setGeneratingPolicy(false);
    }
  };

  const viewPolicy = (policy: any) => {
    setSelectedPolicy(policy);
    setShowPolicyContent(true);
  };

  const getRiskSeverity = (likelihood: string, impact: string): string => {
    if (likelihood === 'high' && impact === 'high') return 'Critical';
    if (likelihood === 'high' || impact === 'high') return 'High';
    if (likelihood === 'medium' || impact === 'medium') return 'Medium';
    return 'Low';
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case 'Critical': return 'bg-red-100 text-red-800';
      case 'High': return 'bg-orange-100 text-orange-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'identified': return 'bg-blue-100 text-blue-800';
      case 'assessed': return 'bg-yellow-100 text-yellow-800';
      case 'mitigated': return 'bg-green-100 text-green-800';
      case 'accepted': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const frameworkName = 
    frameworkId === 'iso27001' ? 'ISO 27001' : 
    frameworkId === 'soc2' ? 'SOC 2' : 
    frameworkId === 'gdpr' ? 'GDPR' : 
    frameworkId === 'hipaa' ? 'HIPAA' : 
    frameworkId === 'pci_dss' ? 'PCI DSS' : 'Compliance';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <PageTransition>
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-semibold tracking-tight mb-2">
                  {frameworkName} Requirements
                </h1>
                <p className="text-gray-600">Manage your compliance controls and implementation status</p>
              </div>
              
              <Tabs defaultValue="controls" className="mb-6" onValueChange={setSelectedTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="controls">Controls & Clauses</TabsTrigger>
                  <TabsTrigger value="risks">Risk Management</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="policies">
                    Policies
                    <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                      New
                    </span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="controls" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-12">
                      <FrameworkControls frameworkId={frameworkId} />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="risks" className="mt-0">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold">Risk Register</h2>
                        <Button 
                          onClick={() => setShowAddRisk(true)} 
                          leftIcon={<Plus size={16} />}
                        >
                          Add Risk
                        </Button>
                      </div>

                      {showAddRisk && (
                        <div className="bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
                          <h3 className="text-lg font-medium mb-4">Add New Risk</h3>
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium mb-1">Risk Title</label>
                              <input
                                type="text"
                                className="w-full p-2 border border-gray-300 rounded-md"
                                value={newRisk.title}
                                onChange={(e) => setNewRisk({ ...newRisk, title: e.target.value })}
                                placeholder="E.g., Unauthorized Data Access"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">Description</label>
                              <textarea
                                className="w-full p-2 border border-gray-300 rounded-md min-h-[80px]"
                                value={newRisk.description}
                                onChange={(e) => setNewRisk({ ...newRisk, description: e.target.value })}
                                placeholder="Describe the risk in detail..."
                              />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium mb-1">Likelihood</label>
                                <select
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={newRisk.likelihood}
                                  onChange={(e) => setNewRisk({ ...newRisk, likelihood: e.target.value })}
                                >
                                  <option value="low">Low</option>
                                  <option value="medium">Medium</option>
                                  <option value="high">High</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium mb-1">Impact</label>
                                <select
                                  className="w-full p-2 border border-gray-300 rounded-md"
                                  value={newRisk.impact}
                                  onChange={(e) => setNewRisk({ ...newRisk, impact: e.target.value })}
                                >
                                  <option value="low">Low</option>
                                  <option value="medium">Medium</option>
                                  <option value="high">High</option>
                                </select>
                              </div>
                            </div>
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="outline"
                                onClick={() => setShowAddRisk(false)}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleAddRisk}>
                                Add Risk
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {risks.map((risk) => {
                              const severity = getRiskSeverity(risk.likelihood, risk.impact);
                              const severityClass = getSeverityColor(severity);
                              const statusClass = getStatusColor(risk.status);
                              
                              return (
                                <tr key={risk.id}>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{risk.title}</div>
                                    <div className="text-sm text-gray-500">{risk.description}</div>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${severityClass}`}>
                                      {severity}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}`}>
                                      {risk.status.charAt(0).toUpperCase() + risk.status.slice(1)}
                                    </span>
                                  </td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    <Button variant="ghost" size="sm">View</Button>
                                    <Button variant="ghost" size="sm">Edit</Button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>

                      {risks.length === 0 && (
                        <div className="text-center py-8 bg-gray-50 rounded-lg">
                          <AlertTriangle size={40} className="mx-auto text-yellow-500 mb-3" />
                          <h3 className="text-lg font-medium text-gray-900 mb-1">No risks found</h3>
                          <p className="text-gray-500 mb-4">Start by adding risks to your register</p>
                          <Button onClick={() => setShowAddRisk(true)}>Add Your First Risk</Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <div className="mt-6">
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-xl font-semibold mb-4">Risk Bank</h2>
                        <p className="text-gray-600 mb-4">
                          Common risks for {frameworkName} that you can add to your risk register:
                        </p>
                        
                        <div className="space-y-3">
                          {[
                            {
                              title: 'Unauthorized Access to Sensitive Data',
                              description: 'Risk of confidential information being accessed by unauthorized personnel.',
                              framework: frameworkId,
                            },
                            {
                              title: 'Insufficient Security Controls',
                              description: 'Inadequate security measures to protect against common threats.',
                              framework: frameworkId,
                            },
                            {
                              title: 'Data Breach by Third-Party Vendor',
                              description: 'Risk of data being exposed due to security vulnerabilities in vendor systems.',
                              framework: frameworkId,
                            },
                            {
                              title: 'Lack of Employee Security Awareness',
                              description: 'Employees not trained properly on security protocols and best practices.',
                              framework: frameworkId,
                            }
                          ].map((risk, index) => (
                            <div key={index} className="p-4 bg-gray-50 rounded-md border border-gray-200">
                              <div className="flex justify-between">
                                <div>
                                  <h4 className="font-medium text-gray-900">{risk.title}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{risk.description}</p>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => {
                                    setNewRisk({
                                      title: risk.title,
                                      description: risk.description,
                                      likelihood: 'medium',
                                      impact: 'medium',
                                    });
                                    setShowAddRisk(true);
                                    toast.info('Risk template loaded');
                                  }}
                                >
                                  Use Template
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="documents" className="mt-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-6">Documents</h2>
                        <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md border border-dashed border-gray-300 text-gray-500">
                          <div className="text-center">
                            <FileText size={40} className="mx-auto text-gray-400 mb-2" />
                            <p>No documents to display</p>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mt-2"
                              leftIcon={<Plus size={16} />}
                            >
                              Upload Document
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h2 className="text-2xl font-semibold mb-6">Required Evidence</h2>
                        <div className="space-y-3">
                          {[
                            'Information Security Policy',
                            'Risk Assessment Methodology',
                            'Access Control Procedure',
                            'Asset Management Register',
                            'Incident Response Plan'
                          ].map((doc, index) => (
                            <div key={index} className="p-3 bg-gray-50 rounded-md border border-gray-200 flex justify-between items-center">
                              <div className="flex items-center">
                                <FileText size={20} className="text-blue-600 mr-3" />
                                <span>{doc}</span>
                              </div>
                              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                Required
                              </span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="policies" className="mt-0">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="text-center mb-8">
                      <h2 className="text-2xl font-bold mb-2">{frameworkName} Policy Generator</h2>
                      <p className="text-gray-600">
                        Generate customized compliance policies based on your organization's profile
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => setShowPolicyGenerator(true)}
                      >
                        Launch Policy Generator
                      </Button>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-medium mb-4">Recent Policies</h3>
                      
                      {policies.length > 0 ? (
                        <div className="space-y-3">
                          {policies.map((policy) => (
                            <div key={policy.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <div>
                                <h4 className="font-medium">{policy.name}</h4>
                                <p className="text-sm text-gray-500">Created: {new Date(policy.created_at).toLocaleDateString()}</p>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  leftIcon={<FileText size={16} />}
                                  onClick={() => viewPolicy(policy)}
                                >
                                  View
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  leftIcon={<Download size={16} />}
                                >
                                  Download
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="overflow-hidden bg-gray-50 rounded-lg border border-gray-200">
                          <div className="px-4 py-5 sm:p-6">
                            <div className="text-center">
                              <p className="mt-1 text-sm text-gray-500">
                                No policies have been generated yet. Use the policy generator to create your first policy.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </PageTransition>
        </main>
      </div>

      {/* Policy Generator Dialog */}
      <Dialog open={showPolicyGenerator} onOpenChange={setShowPolicyGenerator}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{frameworkName} Policy Generator</DialogTitle>
            <DialogDescription>
              Fill in the details below to generate a customized {frameworkName} policy
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-3">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="companyName">
                Company Name
              </label>
              <input
                id="companyName"
                name="companyName"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={policyFormData.companyName}
                onChange={handlePolicyFormChange}
                placeholder="e.g., Acme Corporation"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="industry">
                Industry
              </label>
              <select
                id="industry"
                name="industry"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={policyFormData.industry}
                onChange={handlePolicyFormChange}
              >
                <option value="">Select industry</option>
                <option value="Technology">Technology</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Finance">Finance</option>
                <option value="Retail">Retail</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Education">Education</option>
                <option value="Government">Government</option>
                <option value="Professional Services">Professional Services</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="companySize">
                Company Size
              </label>
              <select
                id="companySize"
                name="companySize"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={policyFormData.companySize}
                onChange={handlePolicyFormChange}
              >
                <option value="">Select company size</option>
                <option value="1-10 employees">1-10 employees</option>
                <option value="11-50 employees">11-50 employees</option>
                <option value="51-200 employees">51-200 employees</option>
                <option value="201-500 employees">201-500 employees</option>
                <option value="501-1000 employees">501-1000 employees</option>
                <option value="1000+ employees">1000+ employees</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="dataTypes">
                Data Types Processed
              </label>
              <textarea
                id="dataTypes"
                name="dataTypes"
                className="w-full p-2 border border-gray-300 rounded-md min-h-[80px]"
                value={policyFormData.dataTypes}
                onChange={handlePolicyFormChange}
                placeholder="e.g., Personal customer data, Financial information, Healthcare records"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPolicyGenerator(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleGeneratePolicy}
              isLoading={generatingPolicy}
              disabled={generatingPolicy}
              leftIcon={generatingPolicy ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
            >
              {generatingPolicy ? 'Generating Policy...' : 'Generate Policy'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Policy Content Dialog */}
      <Dialog open={showPolicyContent} onOpenChange={setShowPolicyContent}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>{selectedPolicy?.name}</DialogTitle>
          </DialogHeader>
          
          {selectedPolicy && (
            <div className="py-3">
              <Tabs defaultValue="policy">
                <TabsList className="mb-4">
                  <TabsTrigger value="policy">Policy</TabsTrigger>
                  <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
                  <TabsTrigger value="implementation">Implementation Guide</TabsTrigger>
                  <TabsTrigger value="gaps">Gap Analysis</TabsTrigger>
                </TabsList>
                
                <TabsContent value="policy" className="p-4 bg-gray-50 rounded border whitespace-pre-wrap">
                  {selectedPolicy.content}
                </TabsContent>
                
                <TabsContent value="risk" className="p-4 bg-gray-50 rounded border whitespace-pre-wrap">
                  {selectedPolicy.riskAssessment}
                </TabsContent>
                
                <TabsContent value="implementation" className="p-4 bg-gray-50 rounded border whitespace-pre-wrap">
                  {selectedPolicy.implementationGuide}
                </TabsContent>
                
                <TabsContent value="gaps" className="p-4 bg-gray-50 rounded border whitespace-pre-wrap">
                  {selectedPolicy.gapsAnalysis}
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" size="sm" leftIcon={<Download size={16} />}>
              Download PDF
            </Button>
            <Button onClick={() => setShowPolicyContent(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FrameworkRequirements;
