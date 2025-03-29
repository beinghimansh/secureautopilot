
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { GraduationCap, Volume2 } from 'lucide-react';
// Update the import to use the new module
import voiceService, { availableVoices, VoiceTrainingSession } from '@/services/voice';
import AudioPlayer from './AudioPlayer';
import { supabase } from '@/integrations/supabase/client';

interface CreateTrainingSessionProps {
  onCreated?: (session: VoiceTrainingSession) => void;
}

interface TrainingSessionForm {
  title: string;
  description: string;
  content: string;
  voice_id: string;
  category: string;
  language: string;
  is_featured: boolean;
}

const CreateTrainingSession: React.FC<CreateTrainingSessionProps> = ({ onCreated }) => {
  const [creating, setCreating] = useState(false);
  const [previewAudio, setPreviewAudio] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<TrainingSessionForm>({
    defaultValues: {
      title: '',
      description: '',
      content: '',
      voice_id: availableVoices[0].voice_id,
      category: 'general',
      language: 'en',
      is_featured: false
    }
  });
  
  const watchVoiceId = watch('voice_id');
  const watchContent = watch('content');
  
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
          if (prefs && prefs.preferred_voice_id) {
            setValue('voice_id', prefs.preferred_voice_id);
          }
        }
      }
    };
    
    fetchUserData();
  }, [setValue]);
  
  const onPreviewVoice = async () => {
    if (!watchContent) {
      toast.error('Please enter some content to preview');
      return;
    }
    
    try {
      const previewText = watchContent.length > 300 
        ? watchContent.substring(0, 300) + '...' 
        : watchContent;
        
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
  
  const onSubmit = async (data: TrainingSessionForm) => {
    if (!userProfile?.organization_id) {
      toast.error('User organization not found');
      return;
    }
    
    setCreating(true);
    
    try {
      const result = await voiceService.createTrainingSession({
        ...data,
        organization_id: userProfile.organization_id
      });
      
      if (result) {
        toast.success('Training session created successfully');
        if (onCreated) {
          onCreated(result);
        }
        
        // Reset form
        setValue('title', '');
        setValue('description', '');
        setValue('content', '');
        setValue('is_featured', false);
        setPreviewAudio(null);
      }
    } catch (error) {
      console.error('Error creating training session:', error);
      toast.error('Failed to create training session');
    } finally {
      setCreating(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GraduationCap className="mr-2 h-5 w-5" />
          Create Training Session
        </CardTitle>
      </CardHeader>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter a title for this training session"
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Provide a brief description of this training session"
              rows={2}
              {...register('description')}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Training Content</Label>
            <Textarea
              id="content"
              placeholder="Enter the training content to be converted to speech"
              rows={6}
              {...register('content', { required: 'Content is required' })}
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content.message}</p>
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
              <Label htmlFor="category">Category</Label>
              <Select
                value={watch('category')}
                onValueChange={(value) => setValue('category', value)}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="privacy">Privacy</SelectItem>
                  <SelectItem value="risk">Risk Management</SelectItem>
                  <SelectItem value="general">General Compliance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            
            <div className="flex items-center space-x-2 pt-8">
              <Switch
                id="is_featured"
                checked={watch('is_featured')}
                onCheckedChange={(checked) => setValue('is_featured', checked)}
              />
              <Label htmlFor="is_featured">Featured Training</Label>
            </div>
          </div>
          
          {watchContent && (
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
            disabled={creating}
            className="w-full"
          >
            {creating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Creating...
              </>
            ) : (
              'Create Training Session'
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CreateTrainingSession;
