
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { useParams } from 'react-router-dom';
import FrameworkControls from '@/components/compliance/FrameworkControls';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RiskRegister from '@/components/compliance/risks/RiskRegister';
import DocumentsSection from '@/components/compliance/documents/DocumentsSection';
import PoliciesSection from '@/components/compliance/policies/PoliciesSection';
import RulesDisplay from '@/components/compliance/rules/RulesDisplay';
import { useFrameworkName } from '@/components/compliance/hooks/useFrameworkName';

const FrameworkRequirements = () => {
  const { frameworkId = 'iso27001' } = useParams<{ frameworkId: string }>();
  const [selectedTab, setSelectedTab] = useState('controls');
  const frameworkName = useFrameworkName(frameworkId);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8 overflow-x-hidden">
          <PageTransition>
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
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
                  <div className="grid grid-cols-1 gap-6">
                    <RulesDisplay frameworkId={frameworkId} />
                  </div>
                </TabsContent>

                <TabsContent value="risks" className="mt-0">
                  <RiskRegister frameworkId={frameworkId} />
                </TabsContent>

                <TabsContent value="documents" className="mt-0">
                  <DocumentsSection frameworkId={frameworkId} />
                </TabsContent>

                <TabsContent value="policies" className="mt-0">
                  <PoliciesSection frameworkId={frameworkId} />
                </TabsContent>
              </Tabs>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default FrameworkRequirements;
