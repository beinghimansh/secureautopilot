
import { toast } from "sonner";

export interface SpeechGenerationResult {
  success: boolean;
  audioUrl?: string;
  audioBlob?: Blob;
  audioBase64?: string;
  duration?: number;
  error?: string;
}

const speechSynthesisService = {
  async generateSpeech(
    text: string, 
    voiceId: string, 
    model?: string, 
    language?: string
  ): Promise<SpeechGenerationResult> {
    try {
      console.log(`Generating speech with voiceId: ${voiceId}, language: ${language || 'en'}, text length: ${text.length}`);
      
      const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voiceId,
          model,
          language
        }),
      });

      // Check for non-JSON responses first
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const textResponse = await response.text();
        console.error('Non-JSON response received:', textResponse.substring(0, 200));
        throw new Error(`Received invalid response format: ${contentType || 'unknown'}`);
      }

      const data = await response.json();

      if (!data.success) {
        console.error('Text-to-speech API returned error:', data.error);
        throw new Error(data.error || 'Failed to generate speech');
      }

      // Check if audioContent exists
      if (!data.audioContent) {
        console.error('No audio content in response:', data);
        throw new Error('No audio content received from the service');
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
      
      console.log('Speech generated successfully');

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
  }
};

export default speechSynthesisService;
