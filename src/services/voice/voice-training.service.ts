
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { VoiceTrainingSession, availableVoices } from "./voice.types";
import speechSynthesisService from "./speech-synthesis.service";

const voiceTrainingService = {
  async getTrainingSessions(category?: string): Promise<VoiceTrainingSession[]> {
    try {
      let query = supabase
        .from('voice_training_sessions')
        .select('*')
        .order('created_at', { ascending: false });

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching training sessions:', error);
        toast.error('Failed to load training sessions');
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Unexpected error fetching training sessions:', error);
      toast.error('An unexpected error occurred');
      return [];
    }
  },

  async createTrainingSession(session: Partial<VoiceTrainingSession>): Promise<VoiceTrainingSession | null> {
    try {
      // Ensure required fields are set
      const sessionData = {
        title: session.title || '',
        content: session.content || '',
        category: session.category || 'general',
        voice_id: session.voice_id || availableVoices[0].voice_id,
        ...session
      };

      const audioResult = await speechSynthesisService.generateSpeech(
        sessionData.content, 
        sessionData.voice_id
      );
      
      if (!audioResult.success) {
        throw new Error('Failed to generate speech');
      }

      const fileName = `${Date.now()}_training.mp3`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from('voice-training')
        .upload(fileName, audioResult.audioBlob!, {
          contentType: 'audio/mpeg',
          cacheControl: '3600'
        });

      if (storageError) {
        console.error('Error storing audio file:', storageError);
        throw new Error('Failed to store audio file');
      }

      const { data: publicUrl } = supabase.storage
        .from('voice-training')
        .getPublicUrl(fileName);

      const { data, error } = await supabase
        .from('voice_training_sessions')
        .insert({
          title: sessionData.title,
          content: sessionData.content,
          category: sessionData.category,
          voice_id: sessionData.voice_id,
          audio_url: publicUrl.publicUrl,
          duration: audioResult.duration || 0,
          organization_id: sessionData.organization_id,
          description: sessionData.description,
          language: sessionData.language || 'en',
          is_featured: sessionData.is_featured || false
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating training session:', error);
        toast.error('Failed to create training session');
        return null;
      }

      toast.success('Training session created successfully');
      return data;
    } catch (error) {
      console.error('Unexpected error creating training session:', error);
      toast.error('Failed to create training session: ' + (error.message || 'Unknown error'));
      return null;
    }
  }
};

export default voiceTrainingService;
