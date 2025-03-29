import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UserVoicePreference, availableVoices } from "./voice.types";
import speechSynthesisService from "./speech-synthesis.service";

const voicePreferencesService = {
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

      if (!data) return null;
      
      return {
        id: data.id,
        user_id: data.user_id,
        voice_id: data.preferred_voice_id,
        playback_speed: data.playback_speed,
        auto_play: data.auto_play,
        language: data.language || 'en',
        created_at: data.created_at,
        updated_at: data.updated_at
      };
    } catch (error) {
      console.error('Unexpected error fetching voice preferences:', error);
      return null;
    }
  },

  async saveUserVoicePreference(preferences: Partial<UserVoicePreference>): Promise<UserVoicePreference | null> {
    try {
      const dbPreferenceData = {
        preferred_voice_id: preferences.voice_id || availableVoices[0].voice_id,
        playback_speed: preferences.playback_speed || 1.0,
        auto_play: preferences.auto_play ?? false,
        language: preferences.language || 'en',
        ...Object.entries(preferences)
          .filter(([key]) => !['voice_id'].includes(key))
          .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
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
          .update(dbPreferenceData)
          .eq('id', existingPrefs.id)
          .select()
          .single();
      } else {
        result = await supabase
          .from('user_voice_preferences')
          .insert(dbPreferenceData)
          .select()
          .single();
      }

      if (result.error) {
        console.error('Error saving voice preferences:', result.error);
        toast.error('Failed to save voice preferences');
        return null;
      }

      const savedData = result.data;
      const userPreference: UserVoicePreference = {
        id: savedData.id,
        user_id: savedData.user_id,
        voice_id: savedData.preferred_voice_id,
        playback_speed: savedData.playback_speed,
        auto_play: savedData.auto_play,
        language: savedData.language || 'en',
        created_at: savedData.created_at,
        updated_at: savedData.updated_at
      };

      toast.success('Voice preferences saved successfully');
      return userPreference;
    } catch (error) {
      console.error('Unexpected error saving voice preferences:', error);
      toast.error('An unexpected error occurred');
      return null;
    }
  },

  getVoiceById(voiceId: string) {
    return availableVoices.find(voice => voice.voice_id === voiceId);
  },

  getVoiceNameById(voiceId: string): string {
    const voice = this.getVoiceById(voiceId);
    return voice ? voice.name : 'Unknown Voice';
  }
};

export default voicePreferencesService;
