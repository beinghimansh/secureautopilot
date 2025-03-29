
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts";

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
    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      console.error("OpenAI API key not found");
      throw new Error('OPENAI_API_KEY is missing in environment variables');
    }

    const openai = new OpenAI({
      apiKey: openaiApiKey
    });

    console.log("Testing OpenAI API connection with key starting with:", openaiApiKey.substring(0, 4) + "...");

    const requestBody = await req.json();
    const { prompt, options = {} } = requestBody;

    if (!prompt) {
      throw new Error("Prompt is required");
    }

    const model = options.model || 'gpt-4o-mini';
    const temperature = options.temperature || 0.7;
    const max_tokens = options.max_tokens || 1000;

    console.log(`Processing request with model: ${model}, temp: ${temperature}`);

    const response = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature,
      max_tokens,
    });

    console.log("OpenAI API Status:", 200);
    console.log("OpenAI API Response received successfully");

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    return new Response(
      JSON.stringify({
        error: error.message || 'An unknown error occurred while processing the request',
        status: 'error'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
