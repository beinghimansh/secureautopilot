
import React, { lazy, Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const RiskRegister = lazy(() => import('@/components/compliance/risks/RiskRegister'));
const DocumentsSection = lazy(() => import('@/components/compliance/documents/DocumentsSection'));
const PoliciesSection = lazy(() => import('@/components/compliance/policies/PoliciesSection'));
const RulesDisplay = lazy(() => import('@/components/compliance/rules/RulesDisplay'));

const ComponentLoader = () => (
  <div className="flex justify-center items-center h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

interface FrameworkTabsProps {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
  frameworkId: string;
}

const FrameworkTabs: React.FC<FrameworkTabsProps> = ({ 
  selectedTab, 
  setSelectedTab, 
  frameworkId 
}) => {
  return (
    <Tabs defaultValue={selectedTab} className="mb-6" onValueChange={setSelectedTab}>
      <TabsList className="mb-4 bg-white border shadow-sm">
        <TabsTrigger value="controls" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Controls & Clauses</TabsTrigger>
        <TabsTrigger value="risks" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Risk Management</TabsTrigger>
        <TabsTrigger value="documents" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Documents</TabsTrigger>
        <TabsTrigger value="policies" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
          Policies
          <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
            New
          </span>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="controls" className="mt-0">
        <div className="grid grid-cols-1 gap-6">
          <Suspense fallback={<ComponentLoader />}>
            <RulesDisplay frameworkId={frameworkId} />
          </Suspense>
        </div>
      </TabsContent>

      <TabsContent value="risks" className="mt-0">
        <Suspense fallback={<ComponentLoader />}>
          <RiskRegister frameworkId={frameworkId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="documents" className="mt-0">
        <Suspense fallback={<ComponentLoader />}>
          <DocumentsSection frameworkId={frameworkId} />
        </Suspense>
      </TabsContent>

      <TabsContent value="policies" className="mt-0">
        <Suspense fallback={<ComponentLoader />}>
          <PoliciesSection frameworkId={frameworkId} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
};

export default FrameworkTabs;
