
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ELEVENLABS_API_KEY = Deno.env.get('ELEVENLABS_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { text, voiceId, model, language } = await req.json();

    if (!text) {
      throw new Error('Text is required');
    }

    if (!voiceId) {
      throw new Error('Voice ID is required');
    }

    console.log(`Generating speech for text: ${text.substring(0, 50)}... with voice: ${voiceId}, language: ${language || 'en'}`);
    
    // Default to the Eleven Multilingual v2 model if not specified
    const ttsModel = model || "eleven_multilingual_v2";

    if (!ELEVENLABS_API_KEY) {
      throw new Error('ELEVENLABS_API_KEY is not configured. Please set it in your Supabase secrets.');
    }

    // Call the ElevenLabs API directly with proper headers and format
    const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    console.log(`Calling ElevenLabs API at: ${apiUrl}`);

    // Log the request details for debugging
    console.log(`Request payload: ${JSON.stringify({
      text: text.substring(0, 50) + '...',
      model_id: ttsModel,
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.75,
      }
    })}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: ttsModel,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        }
      }),
    });

    // Enhanced error handling
    if (!response.ok) {
      console.error(`ElevenLabs API error: Status ${response.status}`);
      
      // Try to extract meaningful error information
      const contentType = response.headers.get('content-type');
      let errorDetail = '';
      
      try {
        if (contentType && contentType.includes('application/json')) {
          const errorJson = await response.json();
          errorDetail = JSON.stringify(errorJson);
          console.error('Error details:', errorDetail);
        } else {
          const errorText = await response.text();
          errorDetail = errorText.substring(0, 200);
          console.error('Error response:', errorDetail);
        }
      } catch (parseError) {
        errorDetail = `Failed to parse error response: ${parseError.message}`;
        console.error(errorDetail);
      }
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `ElevenLabs API error (${response.status}): ${errorDetail}` 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verify content type is audio
    const contentType = response.headers.get('content-type');
    console.log(`Response content type: ${contentType}`);
    
    if (!contentType || !contentType.includes('audio/')) {
      let responsePreview = '';
      try {
        const textResponse = await response.text();
        responsePreview = textResponse.substring(0, 200);
      } catch (e) {
        responsePreview = 'Unable to read response body';
      }
      
      console.error('Unexpected content type:', contentType);
      console.error('Response preview:', responsePreview);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Received non-audio response: ${contentType || 'unknown content type'}` 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Convert audio to base64
    const audioBuffer = await response.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
    
    console.log('Speech generation successful, audio size:', audioBuffer.byteLength);

    return new Response(
      JSON.stringify({
        success: true,
        audioContent: base64Audio,
        format: 'mp3'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in text-to-speech function:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: `Speech generation failed: ${error.message}` 
      }),
      { 
        status: 400, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
