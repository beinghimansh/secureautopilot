
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error("OpenAI API Key not configured");
      throw new Error("OPENAI_API_KEY is not configured in the environment variables");
    }

    console.log("Testing OpenAI API connection with key starting with:", openAIApiKey.substring(0, 5) + "...");
    
    // Use a simpler request to test connectivity - no need for full content generation
    const response = await fetch('https://api.openai.com/v1/models', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
    });

    console.log("OpenAI API Status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log("OpenAI API Response received successfully");
    
    return new Response(JSON.stringify({
      success: true,
      message: "OpenAI API is working correctly",
      models: data.data.slice(0, 3).map(model => model.id) // Just return first 3 models for verification
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('OpenAI Test Error:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
