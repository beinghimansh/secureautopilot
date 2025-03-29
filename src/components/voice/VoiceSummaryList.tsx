
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { List, Volume2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { FrameworkType } from '@/types/database.types';
// Update the import to use the new module
import voiceService, { VoiceSummary } from '@/services/voice';
import AudioPlayer from './AudioPlayer';

interface VoiceSummaryListProps {
  policyId?: string;
  frameworkId?: string;
  title?: string;
}

const VoiceSummaryList: React.FC<VoiceSummaryListProps> = ({ 
  policyId, 
  frameworkId,
  title = "Voice Summaries" 
}) => {
  const [summaries, setSummaries] = useState<VoiceSummary[]>([]);
  const [filteredSummaries, setFilteredSummaries] = useState<VoiceSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('all');
  
  // Load summaries on component mount
  useEffect(() => {
    const loadSummaries = async () => {
      setLoading(true);
      const data = await voiceService.getVoiceSummaries(policyId, frameworkId);
      setSummaries(data);
      setFilteredSummaries(data);
      setLoading(false);
    };
    
    loadSummaries();
  }, [policyId, frameworkId]);
  
  // Filter summaries when search or language filter changes
  useEffect(() => {
    let filtered = summaries;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(summary => 
        summary.title.toLowerCase().includes(term) || 
        summary.summary_text.toLowerCase().includes(term)
      );
    }
    
    // Apply language filter
    if (languageFilter !== 'all') {
      filtered = filtered.filter(summary => summary.language === languageFilter);
    }
    
    setFilteredSummaries(filtered);
  }, [searchTerm, languageFilter, summaries]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const handleLanguageFilterChange = (value: string) => {
    setLanguageFilter(value);
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  const getFrameworkName = (type: FrameworkType): string => {
    const frameworkNames: Record<FrameworkType, string> = {
      'iso27001': 'ISO 27001',
      'soc2': 'SOC 2',
      'gdpr': 'GDPR',
      'hipaa': 'HIPAA',
      'pci_dss': 'PCI DSS'
    };
    return frameworkNames[type] || type;
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
          <List className="mr-2 h-5 w-5" />
          {title}
        </CardTitle>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search summaries..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-8"
            />
          </div>
          
          <div className="w-full sm:w-40">
            <Select
              value={languageFilter}
              onValueChange={handleLanguageFilterChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Languages</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fr">French</SelectItem>
                <SelectItem value="de">German</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
                <SelectItem value="it">Italian</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {filteredSummaries.length === 0 ? (
          <div className="text-center py-8">
            <Volume2 className="h-10 w-10 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-lg">No voice summaries found</h3>
            <p className="text-muted-foreground mt-1">
              {searchTerm || languageFilter !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Create your first voice summary to get started'}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredSummaries.map(summary => (
              <div key={summary.id} className="border rounded-lg p-4">
                <div className="mb-4">
                  <h3 className="font-medium text-lg">{summary.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-0.5">
                      {voiceService.getVoiceNameById(summary.voice_id)}
                    </span>
                    
                    <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
                      {summary.language === 'en' ? 'English' : 
                       summary.language === 'fr' ? 'French' : 
                       summary.language === 'de' ? 'German' : 
                       summary.language === 'es' ? 'Spanish' : 
                       summary.language === 'it' ? 'Italian' : summary.language}
                    </span>
                    
                    {summary.duration && (
                      <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
                        {Math.floor(summary.duration / 60)}:{(summary.duration % 60).toString().padStart(2, '0')}
                      </span>
                    )}
                    
                    <span className="text-xs bg-gray-100 text-gray-800 rounded-full px-2 py-0.5">
                      {formatDate(summary.created_at)}
                    </span>
                  </div>
                </div>
                
                {summary.audio_url && (
                  <AudioPlayer 
                    audioUrl={summary.audio_url} 
                    title={summary.title} 
                  />
                )}
                
                <div className="mt-4">
                  <Label>Summary Text</Label>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                    {summary.summary_text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VoiceSummaryList;
