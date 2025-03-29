
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import OpenAI from "https://deno.land/x/openai@v4.24.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const openai = new OpenAI({
  apiKey: Deno.env.get('OPENAI_API_KEY')
})

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const {
      frameworkType,
      organizationName,
      companySize,
      industry,
      businessLocation,
      dataTypes,
      riskAppetite,
      infrastructureDetails,
      securityControls
    } = await req.json()

    // Comprehensive prompt leveraging all context
    const policyPrompt = `
    You are an expert compliance auditor creating a comprehensive security policy for a ${companySize} ${industry} company.

    Company Details:
    - Name: ${organizationName}
    - Location: ${businessLocation}
    - Data Types Handled: ${dataTypes}
    - Infrastructure: ${infrastructureDetails}
    - Existing Security Controls: ${securityControls}
    - Risk Appetite: ${riskAppetite}

    Framework: ${frameworkType}

    Please generate a thorough, professionally worded policy document that:
    1. Addresses all relevant compliance requirements
    2. Reflects the specific context of this organization
    3. Provides actionable and specific guidance
    4. Follows best practices for ${frameworkType} compliance
    5. Includes sections on risk management, data protection, access control, and incident response
    `

    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [{ role: "system", content: policyPrompt }],
      max_tokens: 4000
    })

    const generatedPolicy = response.choices[0].message.content

    return new Response(
      JSON.stringify({ 
        policy_content: generatedPolicy,
        framework_type: frameworkType 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    console.error('Policy Generation Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
