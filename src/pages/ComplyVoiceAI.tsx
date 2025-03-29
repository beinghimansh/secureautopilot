
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import { PageTransition } from '@/components/common/Transitions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Speech, Headphones, Settings, PlusCircle, GraduationCap } from 'lucide-react';
import GenerateVoiceSummary from '@/components/voice/GenerateVoiceSummary';
import VoiceSummaryList from '@/components/voice/VoiceSummaryList';
import VoiceSettings from '@/components/voice/VoiceSettings';
import VoiceTrainingList from '@/components/voice/VoiceTrainingList';
import CreateTrainingSession from '@/components/voice/CreateTrainingSession';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { UserVoicePreference, VoiceSummary, VoiceTrainingSession } from '@/services/voiceService';

const ComplyVoiceAI = () => {
  const [activeTab, setActiveTab] = useState('summaries');
  const [summariesRefreshKey, setSummariesRefreshKey] = useState(0);
  const [trainingRefreshKey, setTrainingRefreshKey] = useState(0);
  
  const handleSummaryCreated = (summary: VoiceSummary) => {
    // Force refresh the summaries list
    setSummariesRefreshKey(prev => prev + 1);
  };
  
  const handleTrainingCreated = (session: VoiceTrainingSession) => {
    // Force refresh the training list
    setTrainingRefreshKey(prev => prev + 1);
  };
  
  const handleSettingsChanged = (preferences: UserVoicePreference) => {
    // You could update some global state here if needed
    console.log('Voice preferences updated:', preferences);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-10">
          <PageTransition>
            <div className="max-w-6xl mx-auto">
              <header className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center mb-1">
                      <Speech className="h-6 w-6 mr-2 text-primary" />
                      <h1 className="text-3xl font-semibold">ComplyVoiceAI</h1>
                    </div>
                    <p className="text-muted-foreground">
                      Convert compliance documents to voice for better accessibility
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    {activeTab === 'summaries' && (
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            New Voice Summary
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-md overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle>Create Voice Summary</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <GenerateVoiceSummary onGenerated={handleSummaryCreated} />
                          </div>
                        </SheetContent>
                      </Sheet>
                    )}
                    
                    {activeTab === 'training' && (
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            New Training Session
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="sm:max-w-md overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle>Create Training Session</SheetTitle>
                          </SheetHeader>
                          <div className="mt-6">
                            <CreateTrainingSession onCreated={handleTrainingCreated} />
                          </div>
                        </SheetContent>
                      </Sheet>
                    )}
                  </div>
                </div>
              </header>
              
              <Tabs 
                defaultValue="summaries" 
                value={activeTab}
                onValueChange={setActiveTab}
                className="space-y-4"
              >
                <TabsList className="grid grid-cols-3 w-full">
                  <TabsTrigger value="summaries" className="flex items-center">
                    <Headphones className="h-4 w-4 mr-2" />
                    <span>Voice Summaries</span>
                  </TabsTrigger>
                  <TabsTrigger value="training" className="flex items-center">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    <span>Training</span>
                  </TabsTrigger>
                  <TabsTrigger value="settings" className="flex items-center">
                    <Settings className="h-4 w-4 mr-2" />
                    <span>Settings</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="summaries" className="space-y-4">
                  <VoiceSummaryList key={summariesRefreshKey} />
                </TabsContent>
                
                <TabsContent value="training" className="space-y-4">
                  <VoiceTrainingList key={trainingRefreshKey} />
                </TabsContent>
                
                <TabsContent value="settings" className="space-y-4">
                  <VoiceSettings onSettingsChange={handleSettingsChanged} />
                </TabsContent>
              </Tabs>
            </div>
          </PageTransition>
        </main>
      </div>
    </div>
  );
};

export default ComplyVoiceAI;
