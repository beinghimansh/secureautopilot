
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

    // Generate speech from text using ElevenLabs API
    const apiUrl = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;
    console.log(`Calling ElevenLabs API at: ${apiUrl}`);
    
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

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API error status:', response.status);
      console.error('ElevenLabs API error response:', errorText);
      
      let errorMessage;
      try {
        // Try to parse as JSON to get a structured error
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.detail?.message || errorJson.detail || errorJson.error || 'Unknown error from ElevenLabs API';
      } catch (e) {
        // If it's not JSON, use the raw text
        errorMessage = `API Error (${response.status}): ${errorText.substring(0, 100)}...`;
      }
      
      throw new Error(`Failed to generate speech: ${errorMessage}`);
    }

    // Get audio data and convert to base64
    const audioBuffer = await response.arrayBuffer();
    const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));

    console.log('Speech generation successful, returning audio data');
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        audioContent: base64Audio,
        format: 'mp3'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  } catch (error) {
    console.error('Error in text-to-speech function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});
