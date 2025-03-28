
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/common/Card';
import { Database, Plus, Link as LinkIcon, RefreshCw } from 'lucide-react';
import Button from '@/components/common/Button';
import { ScaleIn } from '@/components/common/Transitions';

const DataSources = () => {
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
                  <h1 className="text-3xl font-semibold tracking-tight mb-2">Data Sources</h1>
                  <p className="text-gray-600">Manage your compliance data sources and integrations</p>
                </div>
                <div>
                  <Button
                    leftIcon={<Plus size={16} />}
                  >
                    Add Data Source
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <ScaleIn delay={100}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">AWS</CardTitle>
                          <CardDescription>Cloud Infrastructure</CardDescription>
                        </div>
                        <div className="p-2 bg-green-100 rounded-full">
                          <Database size={20} className="text-green-600" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Last synced</span>
                          <span className="text-sm text-gray-500">2 hours ago</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Status</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Connected</span>
                        </div>
                        <div className="pt-3 flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<RefreshCw size={14} />}
                          >
                            Sync
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            Configure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={150}>
                  <Card className="hover:shadow-lg transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">Google Cloud</CardTitle>
                          <CardDescription>Cloud Infrastructure</CardDescription>
                        </div>
                        <div className="p-2 bg-green-100 rounded-full">
                          <Database size={20} className="text-green-600" />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-2">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Last synced</span>
                          <span className="text-sm text-gray-500">1 day ago</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Status</span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Connected</span>
                        </div>
                        <div className="pt-3 flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            leftIcon={<RefreshCw size={14} />}
                          >
                            Sync
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            Configure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScaleIn>
                
                <ScaleIn delay={200}>
                  <Card className="hover:shadow-lg border-dashed border-2 transition-all duration-300 flex flex-col items-center justify-center py-8">
                    <div className="p-3 bg-gray-100 rounded-full mb-4">
                      <Plus size={24} className="text-gray-500" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Add New Connection</h3>
                    <p className="text-sm text-gray-500 mb-4 text-center px-6">
                      Connect additional data sources to enhance your compliance monitoring
                    </p>
                    <Button
                      variant="outline"
                      leftIcon={<LinkIcon size={16} />}
                    >
                      Connect Source
                    </Button>
                  </Card>
                </ScaleIn>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Available Integrations</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    'Azure', 'Okta', 'GitHub', 'Slack',
                    'Jira', 'ServiceNow', 'Salesforce', 'Workday'
                  ].map((integration, idx) => (
                    <Card key={idx} className="hover:bg-gray-50 transition-all duration-300">
                      <CardContent className="p-4 flex items-center justify-between">
                        <span className="font-medium">{integration}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                        >
                          Connect
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default DataSources;
