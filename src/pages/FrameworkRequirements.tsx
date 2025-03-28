
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { useParams, useNavigate } from 'react-router-dom';
import FrameworkControls from '@/components/compliance/FrameworkControls';
import RulesDisplay from '@/components/compliance/RulesDisplay';
import { Card, CardContent } from '@/components/common/Card';

const FrameworkRequirements = () => {
  const { frameworkId = 'iso27001' } = useParams<{ frameworkId: string }>();
  const navigate = useNavigate();
  
  // Sample rules data
  const rules = [
    {
      id: 1,
      content: "The organisational Information Security Policy is the top-level policy below which all other information security policies are subordinate.",
    },
    {
      id: 2,
      content: "All subordinate policies must adhere to and support the organisational Information Security Policy.",
    },
    {
      id: 3,
      content: "Each policy will have an owner who is responsible for:",
      subrules: [
        {
          id: "3a",
          content: "Ensuring the policy is understandable; pragmatic & enforceable; adequate & proportionate; and made available to relevant personnel (who may be external to the organisation).",
        },
        {
          id: "3b",
          content: "Ensuring the policy is reviewed at least annually; and",
        },
        {
          id: "3c",
          content: "The logging and authorisation of policy waivers and exceptions.",
        }
      ]
    },
    {
      id: 4,
      content: "Policies, and changes to policies, must be approved by authorised management.",
    },
    {
      id: 5,
      content: "Policies will be made available to all relevant personnel.",
    },
    {
      id: 6,
      content: "Any policy made available must be read, understood and complied with.",
    },
    {
      id: 7,
      content: "The logging of exceptions or non-compliance to policies must be maintained and periodically reviewed.",
    }
  ];

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
                  {frameworkId === 'iso27001' ? 'ISO 27001' : 
                   frameworkId === 'soc2' ? 'SOC 2' : 
                   frameworkId === 'gdpr' ? 'GDPR' : 
                   frameworkId === 'hipaa' ? 'HIPAA' : 'Compliance'} Requirements
                </h1>
                <p className="text-gray-600">Manage your compliance controls and implementation status</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left side - Framework controls */}
                <div className="lg:col-span-12">
                  <FrameworkControls frameworkId={frameworkId} />
                </div>
                
                {/* Documents section at the bottom */}
                <div className="lg:col-span-6">
                  <RulesDisplay rules={rules} />
                </div>
                
                <div className="lg:col-span-6">
                  <Card>
                    <CardContent className="p-6">
                      <h2 className="text-2xl font-semibold mb-6">Documents</h2>
                      <div className="flex items-center justify-center h-40 bg-gray-100 rounded-md border border-dashed border-gray-300 text-gray-500">
                        No documents to display
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default FrameworkRequirements;
