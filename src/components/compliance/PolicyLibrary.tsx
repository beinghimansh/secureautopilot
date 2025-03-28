
import React, { useState } from 'react';
import { Grid, List, FileText } from 'lucide-react';
import Button from '@/components/common/Button';
import { Card, CardContent } from '@/components/common/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Policy {
  id: string;
  title: string;
  framework: string;
  status: string;
  created_at: string;
  pages?: number;
}

interface PolicyLibraryProps {
  activePolicies: Policy[];
  onChooseFramework: () => void;
  frameworkNames: Record<string, string>;
}

const PolicyLibrary: React.FC<PolicyLibraryProps> = ({ 
  activePolicies, 
  onChooseFramework,
  frameworkNames
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

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
            <Button onClick={onChooseFramework}>Choose a Framework</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PolicyLibrary;
