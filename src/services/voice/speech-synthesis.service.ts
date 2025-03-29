
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
      
      if (!text.trim()) {
        throw new Error('Text content is required');
      }
      
      if (!voiceId) {
        throw new Error('Voice ID is required');
      }
      
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

      // Check if response is ok first
      if (!response.ok) {
        console.error(`API responded with status: ${response.status}`);
        // Try to get more detailed error info
        try {
          const errorData = await response.json();
          throw new Error(errorData.error || `API error (${response.status})`);
        } catch (jsonError) {
          // If we can't parse JSON, try to get text
          try {
            const errorText = await response.text();
            throw new Error(`API error (${response.status}): ${errorText.substring(0, 100)}`);
          } catch (textError) {
            throw new Error(`API error (${response.status}): Could not parse response`);
          }
        }
      }

      // Check content type
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        console.error('Non-JSON response received:', contentType);
        let errorText = 'Unknown format';
        try {
          errorText = await response.text();
        } catch (e) {
          // Ignore if we can't get text
        }
        throw new Error(`Received invalid response format: ${contentType || 'unknown'}, preview: ${errorText.substring(0, 50)}`);
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

      // Process the base64 audio
      try {
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
      } catch (blobError) {
        console.error('Error processing audio data:', blobError);
        throw new Error('Failed to process audio data: ' + blobError.message);
      }
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
