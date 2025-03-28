
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RiskRegister from '@/components/compliance/risks/RiskRegister';
import DocumentsSection from '@/components/compliance/documents/DocumentsSection';
import PoliciesSection from '@/components/compliance/policies/PoliciesSection';
import RulesDisplay from '@/components/compliance/rules/RulesDisplay';
import { useFrameworkName } from '@/components/compliance/hooks/useFrameworkName';
import { Card, CardContent } from '@/components/common/Card';
import { ScaleIn } from '@/components/common/Transitions';
import { InfoIcon } from 'lucide-react';

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
              
              <ScaleIn delay={100}>
                <Card className="mb-6 border-blue-200 bg-blue-50/50">
                  <CardContent className="p-4 flex items-start gap-3">
                    <InfoIcon className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-blue-800 mb-1">About {frameworkName}</h3>
                      <p className="text-sm text-blue-700">
                        {frameworkId === 'iso27001' && 'ISO 27001 is an international standard for information security management. It provides a framework for organizations to protect their information through policies and procedures.'}
                        {frameworkId === 'gdpr' && 'GDPR (General Data Protection Regulation) is a regulation in EU law on data protection and privacy for all individuals within the European Union and the European Economic Area.'}
                        {frameworkId === 'soc2' && 'SOC 2 is a voluntary compliance standard for service organizations that specifies how organizations should manage customer data.'}
                        {frameworkId === 'hipaa' && 'HIPAA (Health Insurance Portability and Accountability Act) is a US legislation that provides data privacy and security provisions for safeguarding medical information.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScaleIn>
              
              <Tabs defaultValue="controls" className="mb-6" onValueChange={setSelectedTab}>
                <TabsList className="mb-4 bg-white border shadow-sm">
                  <TabsTrigger value="controls" className="data-[state=active]:bg-primary data-[state=active]:text-white">Controls & Clauses</TabsTrigger>
                  <TabsTrigger value="risks" className="data-[state=active]:bg-primary data-[state=active]:text-white">Risk Management</TabsTrigger>
                  <TabsTrigger value="documents" className="data-[state=active]:bg-primary data-[state=active]:text-white">Documents</TabsTrigger>
                  <TabsTrigger value="policies" className="data-[state=active]:bg-primary data-[state=active]:text-white">
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
