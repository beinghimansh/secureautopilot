
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { VoiceSummary, availableVoices } from "./voice.types";
import speechSynthesisService from "./speech-synthesis.service";

const voiceSummariesService = {
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

      const audioResult = await speechSynthesisService.generateSpeech(
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
  }
};

export default voiceSummariesService;
