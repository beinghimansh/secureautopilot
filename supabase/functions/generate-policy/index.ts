
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Define the function calling schema for policy generation
const policyGenerationFunctions = [
  {
    name: "generate_comprehensive_policy",
    description: "Generate a comprehensive policy document with structured sections",
    parameters: {
      type: "object",
      properties: {
        policy_sections: {
          type: "object",
          properties: {
            introduction: {
              type: "object",
              properties: {
                purpose: { type: "string" },
                scope: { type: "string" }
              }
            },
            objectives: {
              type: "array",
              items: { type: "string" }
            },
            key_controls: {
              type: "array",
              items: { 
                type: "object",
                properties: {
                  control_name: { type: "string" },
                  description: { type: "string" }
                }
              }
            },
            risk_assessment: {
              type: "object",
              properties: {
                identified_risks: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      risk_title: { type: "string" },
                      risk_level: { type: "string" },
                      mitigation_strategy: { type: "string" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      required: ["policy_sections"]
    }
  }
];

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      companyName, 
      industry, 
      companySize, 
      dataTypes, 
      frameworkType 
    } = await req.json();

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { 
            role: 'system', 
            content: `You are an expert policy generator specialized in ${frameworkType} compliance. 
            Generate a comprehensive, actionable policy document tailored to a ${industry} company 
            with ${companySize} employees processing ${dataTypes}.` 
          },
          { 
            role: 'user', 
            content: `Please generate a detailed policy document for ${companyName} 
            focusing on ${frameworkType} compliance requirements.` 
          }
        ],
        functions: policyGenerationFunctions,
        function_call: { 
          name: "generate_comprehensive_policy" 
        }
      }),
    });

    const data = await response.json();
    const policyDetails = JSON.parse(data.choices[0].message.function_call.arguments);

    return new Response(JSON.stringify({
      policyDocument: policyDetails,
      frameworkType
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Policy Generation Error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
