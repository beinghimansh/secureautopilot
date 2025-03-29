
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
  async generateSpeech(text: string, voiceId: string, model?: string): Promise<SpeechGenerationResult> {
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
  }
};

export default speechSynthesisService;
