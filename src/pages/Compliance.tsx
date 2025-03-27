
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import FrameworkSelector from '@/components/compliance/FrameworkSelector';
import PolicyGenerator from '@/components/compliance/PolicyGenerator';
import { PageTransition } from '@/components/common/Transitions';

const CompliancePage = () => {
  const [selectedFramework, setSelectedFramework] = useState<string | null>(null);
  const [policyGenerated, setPolicyGenerated] = useState(false);
  
  const handleSelectFramework = (frameworkId: string) => {
    setSelectedFramework(frameworkId);
    setPolicyGenerated(false);
  };
  
  const handlePolicyGenerated = () => {
    setPolicyGenerated(true);
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
              
              {!selectedFramework ? (
                <FrameworkSelector onSelectFramework={handleSelectFramework} />
              ) : !policyGenerated ? (
                <PolicyGenerator 
                  frameworkId={selectedFramework} 
                  onComplete={handlePolicyGenerated} 
                />
              ) : (
                <div className="bg-white rounded-xl shadow-premium-md p-8">
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
                    <button className="px-4 py-2 bg-primary text-white rounded-md shadow hover:bg-primary/90 transition-colors">
                      Export All Policies (PDF)
                    </button>
                    <button className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-50 transition-colors">
                      Start Implementation
                    </button>
                    <button 
                      className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-md shadow hover:bg-gray-50 transition-colors"
                      onClick={() => setSelectedFramework(null)}
                    >
                      Back to Frameworks
                    </button>
                  </div>
                </div>
              )}
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default CompliancePage;
