
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface VoiceSummary {
  id: string;
  organization_id: string;
  policy_id?: string;
  framework_id?: string;
  title: string;
  summary_text: string;
  audio_url?: string;
  voice_id: string;
  duration?: number;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  language: string;
}

export interface VoiceTrainingSession {
  id: string;
  organization_id: string;
  title: string;
  description?: string;
  content: string;
  audio_url?: string;
  voice_id: string;
  duration?: number;
  created_at: string;
  updated_at: string;
  category: string;
  is_featured: boolean;
  language: string;
}

export interface UserVoicePreference {
  id: string;
  user_id: string;
  preferred_voice_id: string;
  playback_speed: number;
  auto_play: boolean;
  created_at: string;
  updated_at: string;
}

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category?: string;
}

export const availableVoices: ElevenLabsVoice[] = [
  { voice_id: "9BWtsMINqrJLrRacOk9x", name: "Aria", category: "Professional" },
  { voice_id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", category: "Professional" },
  { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", category: "Professional" },
  { voice_id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura", category: "Professional" },
  { voice_id: "IKne3meq5aSn9XLyUdCD", name: "Charlie", category: "Professional" },
  { voice_id: "JBFqnCBsd6RMkjVDRZzb", name: "George", category: "Professional" },
  { voice_id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum", category: "Professional" },
  { voice_id: "SAz9YHcvj6GT2YYXdXww", name: "River", category: "Professional" },
  { voice_id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam", category: "Professional" },
  { voice_id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte", category: "Professional" }
];

const voiceService = {
  async getUserVoicePreference(): Promise<UserVoicePreference | null> {
    try {
      const { data, error } = await supabase
        .from('user_voice_preferences')
        .select('*')
        .limit(1)
        .maybeSingle();

      if (error) {
        console.error('Error fetching voice preferences:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Unexpected error fetching voice preferences:', error);
      return null;
    }
  },

  async saveUserVoicePreference(preferences: Partial<UserVoicePreference>): Promise<UserVoicePreference | null> {
    try {
      // Make sure required fields are set with default values
      const preferenceData = {
        preferred_voice_id: availableVoices[0].voice_id,
        playback_speed: 1.0,
        auto_play: false,
        ...preferences
      };

      const { data: existingPrefs } = await supabase
        .from('user_voice_preferences')
        .select('id')
        .limit(1)
        .maybeSingle();

      let result;
      
      if (existingPrefs) {
        result = await supabase
          .from('user_voice_preferences')
          .update(preferenceData)
          .eq('id', existingPrefs.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('user_voice_preferences')
          .insert(preferenceData)
          .select()
          .single();
      }

      if (result.error) {
        console.error('Error saving voice preferences:', result.error);
        toast.error('Failed to save voice preferences');
        return null;
      }

      toast.success('Voice preferences saved successfully');
      return result.data;
    } catch (error) {
      console.error('Unexpected error saving voice preferences:', error);
      toast.error('An unexpected error occurred');
      return null;
    }
  },

  async getVoiceSummaries(policyId?: string, frameworkId?: string): Promise<VoiceSummary[]> {
    try {
      let query = supabase
        .from('voice_summaries')
        .select('*')
        .order('created_at', { ascending: false });

      if (policyId) {
        query = query.eq('policy_id', policyId);
      }

      if (frameworkId) {
        query = query.eq('framework_id', frameworkId);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching voice summaries:', error);
        toast.error('Failed to load voice summaries');
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Unexpected error fetching voice summaries:', error);
      toast.error('An unexpected error occurred');
      return [];
    }
  },

  async createVoiceSummary(summary: Partial<VoiceSummary>): Promise<VoiceSummary | null> {
    try {
      // Ensure required fields are set
      const summaryData = {
        title: summary.title || '',
        summary_text: summary.summary_text || '',
        voice_id: summary.voice_id || availableVoices[0].voice_id,
        ...summary
      };

      const audioResult = await this.generateSpeech(
        summaryData.summary_text, 
        summaryData.voice_id
      );
      
      if (!audioResult.success) {
        throw new Error('Failed to generate speech');
      }

      const fileName = `${Date.now()}_summary.mp3`;
      const { data: storageData, error: storageError } = await supabase.storage
        .from('voice-summaries')
        .upload(fileName, audioResult.audioBlob!, {
          contentType: 'audio/mpeg',
          cacheControl: '3600'
        });

      if (storageError) {
        console.error('Error storing audio file:', storageError);
        throw new Error('Failed to store audio file');
      }

      const { data: publicUrl } = supabase.storage
        .from('voice-summaries')
        .getPublicUrl(fileName);

      const { data, error } = await supabase
        .from('voice_summaries')
        .insert({
          title: summaryData.title,
          summary_text: summaryData.summary_text,
          voice_id: summaryData.voice_id,
          audio_url: publicUrl.publicUrl,
          duration: audioResult.duration || 0,
          organization_id: summaryData.organization_id,
          policy_id: summaryData.policy_id,
          framework_id: summaryData.framework_id,
          language: summaryData.language || 'en',
          is_featured: summaryData.is_featured || false
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating voice summary:', error);
        toast.error('Failed to create voice summary');
        return null;
      }

      toast.success('Voice summary created successfully');
      return data;
    } catch (error) {
      console.error('Unexpected error creating voice summary:', error);
      toast.error('Failed to create voice summary: ' + (error.message || 'Unknown error'));
      return null;
    }
  },

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

      const audioResult = await this.generateSpeech(
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
  },

  async generateSpeech(text: string, voiceId: string, model?: string): Promise<{
    success: boolean;
    audioUrl?: string;
    audioBlob?: Blob;
    audioBase64?: string;
    duration?: number;
    error?: string;
  }> {
    try {
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voiceId,
          model
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate speech');
      }

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate speech');
      }

      const binaryString = atob(data.audioContent);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });

      const audioUrl = URL.createObjectURL(audioBlob);

      const wordCount = text.split(/\s+/).length;
      const estimatedDuration = Math.round(wordCount * 60 / 150);

      return {
        success: true,
        audioUrl,
        audioBlob,
        audioBase64: data.audioContent,
        duration: estimatedDuration,
      };
    } catch (error) {
      console.error('Error generating speech:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate speech',
      };
    }
  },

  getVoiceById(voiceId: string): ElevenLabsVoice | undefined {
    return availableVoices.find(voice => voice.voice_id === voiceId);
  },

  getVoiceNameById(voiceId: string): string {
    const voice = this.getVoiceById(voiceId);
    return voice ? voice.name : 'Unknown Voice';
  }
};

export default voiceService;
