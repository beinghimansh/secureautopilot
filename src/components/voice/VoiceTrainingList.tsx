
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Search, Volume2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
// Update the import to use the new module
import voiceService, { VoiceTrainingSession } from '@/services/voice';
import AudioPlayer from './AudioPlayer';

interface VoiceTrainingListProps {
  title?: string;
}

const VoiceTrainingList: React.FC<VoiceTrainingListProps> = ({ 
  title = "Compliance Training" 
}) => {
  const [sessions, setSessions] = useState<VoiceTrainingSession[]>([]);
  const [filteredSessions, setFilteredSessions] = useState<VoiceTrainingSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'security', name: 'Security' },
    { id: 'privacy', name: 'Privacy' },
    { id: 'risk', name: 'Risk Management' },
    { id: 'general', name: 'General Compliance' }
  ];
  
  // Load training sessions on component mount
  useEffect(() => {
    const loadSessions = async () => {
      setLoading(true);
      const data = await voiceService.getTrainingSessions();
      setSessions(data);
      setFilteredSessions(data);
      setLoading(false);
    };
    
    loadSessions();
  }, []);
  
  // Filter sessions when search or category changes
  useEffect(() => {
    let filtered = sessions;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(session => 
        session.title.toLowerCase().includes(term) || 
        (session.description && session.description.toLowerCase().includes(term)) ||
        session.content.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (activeCategory !== 'all') {
      filtered = filtered.filter(session => session.category === activeCategory);
    }
    
    setFilteredSessions(filtered);
  }, [searchTerm, activeCategory, sessions]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'Unknown';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search training sessions..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="mb-4 grid grid-cols-2 md:grid-cols-5 w-full">
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {categories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              {filteredSessions.length === 0 ? (
                <div className="text-center py-8">
                  <GraduationCap className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-medium text-lg">No training sessions found</h3>
                  <p className="text-muted-foreground mt-1">
                    {searchTerm || activeCategory !== 'all' 
                      ? 'Try adjusting your filters' 
                      : 'Training sessions will appear here once created'}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredSessions.map(session => (
                    <div key={session.id} className="border rounded-lg p-4">
                      <div className="mb-4">
                        <h3 className="font-medium text-lg">{session.title}</h3>
                        
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs bg-purple-100 text-purple-800 rounded-full px-2 py-0.5 capitalize">
                            {session.category}
                          </span>
                          
                          <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                            {voiceService.getVoiceNameById(session.voice_id)}
                          </span>
                          
                          {session.duration && (
                            <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
                              {formatDuration(session.duration)}
                            </span>
                          )}
                          
                          <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
                            {formatDate(session.created_at)}
                          </span>
                          
                          {session.is_featured && (
                            <span className="text-xs bg-amber-100 text-amber-800 rounded-full px-2 py-0.5">
                              Featured
                            </span>
                          )}
                        </div>
                        
                        {session.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {session.description}
                          </p>
                        )}
                      </div>
                      
                      {session.audio_url && (
                        <AudioPlayer 
                          audioUrl={session.audio_url} 
                          title={session.title} 
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default VoiceTrainingList;
