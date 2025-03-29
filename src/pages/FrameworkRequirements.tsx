
import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Button from '@/components/common/Button';
import { useFrameworkName } from '@/components/compliance/hooks/useFrameworkName';
import { Card, CardContent } from '@/components/common/Card';
import { ScaleIn } from '@/components/common/Transitions';
import { InfoIcon, ArrowLeft, ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import OpenAIIntegration from '@/components/compliance/OpenAIIntegration';
import Loading from '@/components/common/Loading';
import { completeWithAI } from '@/services/openaiService';

const RiskRegister = lazy(() => import('@/components/compliance/risks/RiskRegister'));
const DocumentsSection = lazy(() => import('@/components/compliance/documents/DocumentsSection'));
const PoliciesSection = lazy(() => import('@/components/compliance/policies/PoliciesSection'));
const RulesDisplay = lazy(() => import('@/components/compliance/rules/RulesDisplay'));

const ComponentLoader = () => (
  <div className="flex justify-center items-center h-[400px]">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
);

const FrameworkRequirements = () => {
  const { frameworkId = 'iso27001' } = useParams<{ frameworkId: string }>();
  const [selectedTab, setSelectedTab] = useState('controls');
  const navigate = useNavigate();
  const location = useLocation();
  const frameworkName = useFrameworkName(frameworkId);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

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

  const handleBackClick = () => {
    navigate('/compliance');
  };

  const handleGenerateWithAI = async (prompt: string) => {
    setIsGenerating(true);
    
    try {
      console.log('Generating AI response for prompt:', prompt);
      
      // In a real implementation, we would call the AI service
      const response = await completeWithAI(prompt, {
        model: 'gpt-4o-mini',
        temperature: 0.7,
      });
      
      console.log('Generated AI response:', response);
      setAiResponse(response?.content || 'No response received from AI service');
      toast.success('AI guidance generated');
    } catch (error) {
      console.error('Error generating AI guidance:', error);
      toast.error('Failed to generate AI guidance');
      setAiResponse(null);
    } finally {
      setIsGenerating(false);
    }
  };

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
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-6 flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center mb-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleBackClick}
                      className="mr-3 flex items-center"
                    >
                      <ChevronLeft size={16} className="mr-1" />
                      Back to Frameworks
                    </Button>
                  </div>
                  <h1 className="text-3xl font-semibold tracking-tight mb-2">
                    {frameworkName} Requirements
                  </h1>
                  <p className="text-gray-600">Manage your compliance controls and implementation status</p>
                </div>
              </motion.div>
              
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
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <div className="lg:col-span-2">
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
                </div>
                
                <div className="lg:col-span-1">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="sticky top-6"
                  >
                    <OpenAIIntegration 
                      onGenerateContent={handleGenerateWithAI}
                      isLoading={isGenerating}
                      placeholder="Ask AI about this framework or control..."
                      headingText="AI Assistance"
                      frameworkId={frameworkId}
                    />
                    
                    <div className="mt-4 space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start text-left"
                        onClick={() => navigate('/compliance')}
                      >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to all frameworks
                      </Button>
                      
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                        <h3 className="font-medium text-gray-800 mb-2">Quick Links</h3>
                        <ul className="space-y-1 text-sm">
                          <li>
                            <a href="#" className="text-blue-600 hover:underline">Download framework requirements</a>
                          </li>
                          <li>
                            <a href="#" className="text-blue-600 hover:underline">View implementation guide</a>
                          </li>
                          <li>
                            <a href="#" className="text-blue-600 hover:underline">Schedule compliance review</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </motion.div>
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
