
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Mic, Volume2 } from 'lucide-react';
// Update the import to use the new module
import voiceService, { availableVoices, VoiceSummary } from '@/services/voice';
import AudioPlayer from './AudioPlayer';
import { supabase } from '@/integrations/supabase/client';
import { FrameworkType } from '@/types/database.types';

interface GenerateVoiceSummaryProps {
  policyId?: string;
  frameworkId?: string;
  initialContent?: string;
  onGenerated?: (summary: VoiceSummary) => void;
}

interface VoiceSummaryForm {
  title: string;
  summary_text: string;
  voice_id: string;
  language: string;
  policy_id?: string;
  framework_id?: string;
}

const GenerateVoiceSummary: React.FC<GenerateVoiceSummaryProps> = ({
  policyId,
  frameworkId,
  initialContent,
  onGenerated
}) => {
  const [generating, setGenerating] = useState(false);
  const [previewAudio, setPreviewAudio] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [frameworks, setFrameworks] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any[]>([]);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<VoiceSummaryForm>({
    defaultValues: {
      title: '',
      summary_text: initialContent || '',
      voice_id: availableVoices[0].voice_id,
      language: 'en',
      policy_id: policyId,
      framework_id: frameworkId
    }
  });
  
  const watchVoiceId = watch('voice_id');
  const watchSummaryText = watch('summary_text');
  
  // Fetch user profile and initialize form data
  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profileData) {
          setUserProfile(profileData);
          
          // Load user voice preference
          const prefs = await voiceService.getUserVoicePreference();
          if (prefs && (prefs.voice_id || prefs.preferred_voice_id)) {
            setValue('voice_id', prefs.voice_id || prefs.preferred_voice_id || '');
          }
        }
      }
    };
    
    fetchUserData();
  }, [setValue]);
  
  // Fetch frameworks and policies
  useEffect(() => {
    const fetchData = async () => {
      if (!userProfile?.organization_id) return;
      
      // Fetch frameworks
      const { data: frameworksData } = await supabase
        .from('compliance_frameworks')
        .select('*')
        .eq('organization_id', userProfile.organization_id);
        
      if (frameworksData) {
        setFrameworks(frameworksData);
      }
      
      // Fetch policies
      const { data: policiesData } = await supabase
        .from('policies')
        .select('*')
        .eq('organization_id', userProfile.organization_id);
        
      if (policiesData) {
        setPolicies(policiesData);
      }
    };
    
    if (userProfile) {
      fetchData();
    }
  }, [userProfile]);
  
  const onPreviewVoice = async () => {
    if (!watchSummaryText) {
      toast.error('Please enter some text to preview');
      return;
    }
    
    try {
      const previewText = watchSummaryText.length > 300 
        ? watchSummaryText.substring(0, 300) + '...' 
        : watchSummaryText;
        
      const result = await voiceService.generateSpeech(previewText, watchVoiceId);
      
      if (result.success && result.audioUrl) {
        setPreviewAudio(result.audioUrl);
      } else {
        toast.error('Failed to generate preview');
      }
    } catch (error) {
      console.error('Error generating preview:', error);
      toast.error('An error occurred while generating preview');
    }
  };
  
  const onSubmit = async (data: VoiceSummaryForm) => {
    if (!userProfile?.organization_id) {
      toast.error('User organization not found');
      return;
    }
    
    setGenerating(true);
    
    try {
      const result = await voiceService.createVoiceSummary({
        ...data,
        organization_id: userProfile.organization_id
      });
      
      if (result) {
        toast.success('Voice summary generated successfully');
        if (onGenerated) {
          onGenerated(result);
        }
        
        // Reset form
        setValue('title', '');
        setValue('summary_text', '');
        setPreviewAudio(null);
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      toast.error('Failed to generate voice summary');
    } finally {
      setGenerating(false);
    }
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Mic className="mr-2 h-5 w-5" />
          Generate Voice Summary
        </CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a title for this summary"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="summary_text">Summary Text</Label>
            <Textarea
              id="summary_text"
              placeholder="Enter the text to be converted to speech"
              rows={6}
              {...register('summary_text', { required: 'Summary text is required' })}
            />
            {errors.summary_text && (
              <p className="text-sm text-destructive">{errors.summary_text.message}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voice_id">Voice</Label>
              <Select
                value={watchVoiceId}
                onValueChange={(value) => setValue('voice_id', value)}
              >
                <SelectTrigger id="voice_id">
                  <SelectValue placeholder="Select a voice" />
                </SelectTrigger>
                <SelectContent>
                  {availableVoices.map(voice => (
                    <SelectItem key={voice.voice_id} value={voice.voice_id}>
                      {voice.name} {voice.category ? `(${voice.category})` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select
                value={watch('language')}
                onValueChange={(value) => setValue('language', value)}
              >
                <SelectTrigger id="language">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="it">Italian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {!policyId && (
            <div className="space-y-2">
              <Label htmlFor="policy_id">Associated Policy (Optional)</Label>
              <Select
                value={watch('policy_id') || ''}
                onValueChange={(value) => setValue('policy_id', value)}
              >
                <SelectTrigger id="policy_id">
                  <SelectValue placeholder="Select a policy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {policies.map(policy => (
                    <SelectItem key={policy.id} value={policy.id}>
                      {policy.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {!frameworkId && (
            <div className="space-y-2">
              <Label htmlFor="framework_id">Associated Framework (Optional)</Label>
              <Select
                value={watch('framework_id') || ''}
                onValueChange={(value) => setValue('framework_id', value)}
              >
                <SelectTrigger id="framework_id">
                  <SelectValue placeholder="Select a framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">None</SelectItem>
                  {frameworks.map(framework => (
                    <SelectItem key={framework.id} value={framework.id}>
                      {getFrameworkName(framework.framework_type)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          
          {watchSummaryText && (
            <Button
              type="button"
              variant="outline"
              onClick={onPreviewVoice}
              className="w-full"
            >
              <Volume2 className="mr-2 h-4 w-4" />
              Preview Voice
            </Button>
          )}
          
          {previewAudio && (
            <div className="mt-4">
              <p className="text-sm text-muted-foreground mb-2">Preview (first 300 characters)</p>
              <AudioPlayer 
                audioUrl={previewAudio} 
                title="Voice Preview" 
              />
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <Button 
            type="submit" 
            disabled={generating}
            className="w-full"
          >
            {generating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              'Generate Voice Summary'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default GenerateVoiceSummary;
