
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

    // First check the response status
    if (!response.ok) {
      let errorText;
      const contentType = response.headers.get('content-type');
      
      try {
        if (contentType && contentType.includes('application/json')) {
          // Try to parse as JSON if possible
          const errorData = await response.json();
          errorText = errorData.detail?.message || errorData.detail || errorData.error || `API Error (${response.status})`;
        } else {
          // If it's not JSON, get the text for debugging
          errorText = await response.text();
          errorText = `ElevenLabs API Error: Status ${response.status}, Response: ${errorText.substring(0, 100)}...`;
        }
      } catch (parseError) {
        // Fallback if parsing fails
        errorText = `ElevenLabs API Error: Status ${response.status}, unable to parse response`;
      }
      
      console.error('ElevenLabs API error:', errorText);
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: errorText 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Verify we got audio content
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('audio/')) {
      const textResponse = await response.text();
      console.error('Unexpected content type from ElevenLabs:', contentType);
      console.error('Response preview:', textResponse.substring(0, 200));
      
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: `Unexpected response format: ${contentType || 'unknown'}`
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
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
