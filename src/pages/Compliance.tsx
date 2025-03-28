
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import FrameworkSelector from '@/components/compliance/FrameworkSelector';
import PolicyGenerator from '@/components/compliance/PolicyGenerator';
import GeneratedPolicies from '@/components/compliance/GeneratedPolicies';
import PolicyLibrary from '@/components/compliance/PolicyLibrary';
import ComplianceHeader from '@/components/compliance/ComplianceHeader';
import { PageTransition } from '@/components/common/Transitions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Framework name mapping
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
  const [activePolicies, setActivePolicies] = useState<any[]>([]);
  
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

  const handleBackToFrameworks = () => {
    setSelectedFramework(null);
  };
  
  const renderContent = () => {
    if (!selectedFramework) {
      return <FrameworkSelector onSelectFramework={handleSelectFramework} />;
    }
    
    if (!policyGenerated) {
      return (
        <PolicyGenerator 
          frameworkId={selectedFramework} 
          onComplete={handlePolicyGenerated} 
        />
      );
    }
    
    return (
      <GeneratedPolicies 
        frameworkId={selectedFramework}
        onBackToFrameworks={handleBackToFrameworks}
      />
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
              <ComplianceHeader />
              
              <Tabs defaultValue="frameworks" className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                  <TabsTrigger value="policies">Policy Library</TabsTrigger>
                </TabsList>

                <TabsContent value="frameworks">
                  {renderContent()}
                </TabsContent>

                <TabsContent value="policies">
                  <PolicyLibrary 
                    activePolicies={activePolicies} 
                    onChooseFramework={handleBackToFrameworks}
                    frameworkNames={frameworkNames}
                  />
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
