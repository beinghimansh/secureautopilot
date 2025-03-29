
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useFrameworkName } from '@/components/compliance/hooks/useFrameworkName';
import Loading from '@/components/common/Loading';
import { useFrameworkAI } from '@/hooks/useFrameworkAI';
import FrameworkHeader from '@/components/compliance/framework/FrameworkHeader';
import FrameworkTabs from '@/components/compliance/framework/FrameworkTabs';
import FrameworkSidebar from '@/components/compliance/framework/FrameworkSidebar';

const FrameworkRequirements = () => {
  const { frameworkId = 'iso27001' } = useParams<{ frameworkId: string }>();
  const [selectedTab, setSelectedTab] = useState('controls');
  const navigate = useNavigate();
  const location = useLocation();
  const frameworkName = useFrameworkName(frameworkId);
  const [isLoading, setIsLoading] = useState(true);
  const { isGenerating, aiResponse, generateWithAI } = useFrameworkAI(frameworkId);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [frameworkId]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab && ['controls', 'risks', 'documents', 'policies'].includes(tab)) {
      setSelectedTab(tab);
    }
  }, [location]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('tab', selectedTab);
    navigate(`${location.pathname}?${searchParams.toString()}`, { replace: true });
  }, [selectedTab, navigate, location.pathname]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden overflow-y-auto">
          <PageTransition>
            <div className="max-w-7xl mx-auto">
              <FrameworkHeader 
                frameworkId={frameworkId} 
                frameworkName={frameworkName} 
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
                  <FrameworkTabs 
                    selectedTab={selectedTab} 
                    setSelectedTab={setSelectedTab} 
                    frameworkId={frameworkId} 
                  />
                </div>
                
                <div className="lg:col-span-1">
                  <FrameworkSidebar 
                    frameworkId={frameworkId}
                    isGenerating={isGenerating}
                    aiResponse={aiResponse}
                    handleGenerateWithAI={generateWithAI}
                  />
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
