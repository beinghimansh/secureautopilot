
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
        voice_id: availableVoices[0].voice_id,  // Updated field name from preferred_voice_id
        playback_speed: 1.0,
        auto_play: false,
        language: 'en',                         // Added default language
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

  getVoiceById(voiceId: string) {
    return availableVoices.find(voice => voice.voice_id === voiceId);
  },

  getVoiceNameById(voiceId: string): string {
    const voice = this.getVoiceById(voiceId);
    return voice ? voice.name : 'Unknown Voice';
  }
};

export default voicePreferencesService;
