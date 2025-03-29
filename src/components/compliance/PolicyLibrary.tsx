
import React, { useState, useEffect } from 'react';
import { Grid, List, FileText, Search, FilterIcon, CheckCircle, XCircle } from 'lucide-react';
import Button from '@/components/common/Button';
import { Card, CardContent } from '@/components/common/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Policy {
  id: string;
  title: string;
  framework: string;
  status: string;
  created_at: string;
  pages?: number;
  company?: string;
}

interface PolicyLibraryProps {
  activePolicies: Policy[];
  onChooseFramework: () => void;
  frameworkNames: Record<string, string>;
}

const PolicyLibrary: React.FC<PolicyLibraryProps> = ({ 
  activePolicies: initialPolicies, 
  onChooseFramework,
  frameworkNames
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [policies, setPolicies] = useState<Policy[]>(initialPolicies);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('generated_policies')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        if (data && data.length > 0) {
          // Group by framework_type and get the most recent for each
          const uniqueFrameworkPolicies = Object.values(
            data.reduce((acc: Record<string, any>, policy) => {
              const frameworkType = policy.framework_type;
              if (!acc[frameworkType] || new Date(policy.created_at) > new Date(acc[frameworkType].created_at)) {
                acc[frameworkType] = policy;
              }
              return acc;
            }, {})
          );

          const formattedPolicies = uniqueFrameworkPolicies.map((policy: any) => ({
            id: policy.id,
            title: `${frameworkNames[policy.framework_type] || policy.framework_type.toUpperCase()} Policy`,
            framework: policy.framework_type,
            status: 'active',
            created_at: policy.created_at,
            pages: Math.floor(policy.policy_content.length / 500), // Rough estimate of pages
            company: extractCompanyNameFromPolicy(policy.policy_content)
          }));

          setPolicies(formattedPolicies);
        } else {
          setPolicies(initialPolicies);
        }
      } catch (error) {
        console.error('Error fetching policies:', error);
        toast.error('Failed to fetch policies');
        setPolicies(initialPolicies);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPolicies();
  }, [frameworkNames, initialPolicies]);

  // Helper function to extract company name from policy content
  const extractCompanyNameFromPolicy = (content: string): string => {
    if (!content) return 'Organization';
    
    // Look for company name in typical policy formats
    const titleMatches = content.match(/Policy (Document )?for[\s:]+(.*?)(\n|$)/i);
    if (titleMatches && titleMatches[2]) {
      return titleMatches[2].trim();
    }
    
    // Try looking for "Company:" format
    const companyMatches = content.match(/Company:[\s]+(.*?)(\n|$)/i);
    if (companyMatches && companyMatches[1]) {
      return companyMatches[1].trim();
    }
    
    // Try looking for organization name in the first few paragraphs
    const paragraphs = content.split('\n').slice(0, 10);
    for (const paragraph of paragraphs) {
      if (paragraph.match(/for\s+([A-Z][a-z]+(\s+[A-Z][a-z]+)+)/)) {
        const match = paragraph.match(/for\s+([A-Z][a-z]+(\s+[A-Z][a-z]+)+)/);
        if (match && match[1]) return match[1].trim();
      }
    }
    
    return 'Organization';
  };

  const getPolicyStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center text-xs bg-green-100 text-green-800 rounded-full px-2 py-1">
            <CheckCircle className="w-3 h-3 mr-1" />
            Active
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center text-xs bg-yellow-100 text-yellow-800 rounded-full px-2 py-1">
            <FilterIcon className="w-3 h-3 mr-1" />
            Draft
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-1">
            <XCircle className="w-3 h-3 mr-1" />
            Archived
          </span>
        );
      default:
        return null;
    }
  };

  const filteredPolicies = activeFilter === 'all' 
    ? policies 
    : policies.filter(policy => policy.status === activeFilter);

  const navigateToFrameworkRequirements = (frameworkId: string) => {
    window.location.href = `/compliance/${frameworkId}/requirements`;
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

        <Tabs defaultValue="all" onValueChange={setActiveFilter}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Policies</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>

          <TabsContent value={activeFilter}>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredPolicies.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredPolicies.map((policy) => (
                    <div key={policy.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow bg-white">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center mb-3">
                          <FileText size={20} className="text-blue-600 mr-2" />
                          <h3 className="font-medium text-gray-900">{policy.title}</h3>
                        </div>
                        {getPolicyStatusBadge(policy.status)}
                      </div>
                      {policy.company && (
                        <p className="text-sm text-gray-600 mb-2">
                          Company: {policy.company}
                        </p>
                      )}
                      <p className="text-sm text-gray-600 mb-3">
                        Framework: {frameworkNames[policy.framework] || policy.framework}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">
                          {new Date(policy.created_at).toLocaleDateString()}
                          {policy.pages && ` • ${policy.pages} pages`}
                        </span>
                        <div className="space-x-2">
                          <Button 
                            size="sm" 
                            variant="ghost"
                            onClick={() => navigateToFrameworkRequirements(policy.framework)}
                          >
                            Manage
                          </Button>
                          <Button size="sm" variant="ghost">View</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto bg-white rounded-lg border border-gray-200">
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
                      {filteredPolicies.map((policy) => (
                        <tr key={policy.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <FileText size={20} className="text-blue-600 mr-2" />
                              <div>
                                <div className="text-sm font-medium text-gray-900">{policy.title}</div>
                                {policy.company && (
                                  <div className="text-xs text-gray-500">{policy.company}</div>
                                )}
                              </div>
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
                            {policy.pages && ` • ${policy.pages} pages`}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => navigateToFrameworkRequirements(policy.framework)}
                            >
                              Manage
                            </Button>
                            <Button variant="ghost" size="sm">View</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-lg">
                <FileText size={40} className="mx-auto text-gray-400 mb-3" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No policies yet</h3>
                <p className="text-gray-500 mb-4">Get started by generating your first policy</p>
                <Button onClick={onChooseFramework}>Choose a Framework</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PolicyLibrary;
