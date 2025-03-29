
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
    const requestData = await req.json()
    const { prompt, formData, options } = requestData

    // Extract all relevant form data fields
    const {
      companyName,
      industry,
      companySize,
      dataTypes,
      businessLocation,
      infrastructureDetails,
      securityControls,
      riskAppetite,
      frameworkType
    } = formData || {}

    // Create a detailed and comprehensive prompt using all available form fields
    const comprehensivePrompt = `
    You are an expert compliance auditor and policy writer. Create a HIGHLY DETAILED and COMPREHENSIVE ${frameworkType || 'compliance'} policy document for "${companyName || 'the organization'}", a ${industry || ''} company with ${companySize || ''} employees.

    Company Context:
    - Company Name: ${companyName || 'The organization'}
    - Industry: ${industry || 'Technology'}
    - Company Size: ${companySize || 'Medium-sized'}
    - Data Types Handled: ${dataTypes || 'Customer and business data'}
    - Business Location: ${businessLocation || 'Multiple locations'}
    - Infrastructure Details: ${infrastructureDetails || 'Cloud and on-premises infrastructure'}
    - Security Controls: ${Array.isArray(securityControls) ? securityControls.join(', ') : securityControls || 'Standard security controls'}
    - Risk Appetite: ${riskAppetite || 'Moderate'}

    REQUIREMENTS:
    1. The policy document MUST be extremely comprehensive, with AT LEAST 1500 words.
    2. Include a proper policy structure with sections including:
       - Introduction and Purpose
       - Scope and Applicability
       - Detailed Policy Statements
       - Roles and Responsibilities
       - Implementation Guidelines
       - Compliance Monitoring
       - Review and Update Procedures
       - Appendices as needed
    3. For EACH policy section, provide AT LEAST 3 substantive paragraphs with specific and actionable policy statements.
    4. Make frequent reference to the company name (${companyName || 'the organization'}) throughout the document.
    5. Provide highly specific implementation measures tailored to a ${industry || ''} company.
    6. Reference relevant industry-specific compliance requirements and best practices.
    7. IMPORTANT: Each main section should have multiple subsections with detailed content.
    8. Format the content using markdown for readability.
    9. Ensure the policy is professionally written and suitable for a formal compliance document.
    10. The document MUST be comprehensive enough to serve as a primary compliance policy document.

    ${prompt || ''}
    `

    console.log("Sending comprehensive prompt to OpenAI. Length:", comprehensivePrompt.length)

    const response = await openai.chat.completions.create({
      model: options?.model || "gpt-4o",
      messages: [{ role: "system", content: comprehensivePrompt }],
      max_tokens: options?.max_tokens || 4000,
      temperature: options?.temperature || 0.7
    })

    const generatedPolicy = response.choices[0].message.content

    console.log("Generated policy. Length:", generatedPolicy.length)

    // Create a more detailed version of a risk assessment based on the company context
    const riskAssessmentPrompt = `
    Create a comprehensive risk assessment document for ${companyName || 'the organization'}, a ${industry || ''} company.
    
    Include the following sections:
    1. Executive Summary
    2. Critical Assets (with detailed descriptions of at least 5 critical assets)
    3. Threats and Vulnerabilities (identify at least 7 specific threats)
    4. Risk Mitigation Strategies (provide at least 7 detailed strategies)
    5. Implementation Timeline and Responsibilities
    6. Monitoring and Review Process
    
    Make sure the assessment is highly specific to the company profile:
    - Industry: ${industry || 'Technology'}
    - Size: ${companySize || 'Medium-sized'}
    - Data Types: ${dataTypes || 'Customer and business data'}
    - Current Security Controls: ${Array.isArray(securityControls) ? securityControls.join(', ') : securityControls || 'Standard security controls'}
    
    The document should be at least 1000 words in length and formatted in markdown.
    `

    const riskResponse = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: riskAssessmentPrompt }],
      max_tokens: 2500,
      temperature: 0.7
    })

    const riskAssessment = riskResponse.choices[0].message.content

    return new Response(
      JSON.stringify({
        policy_content: generatedPolicy,
        risk_assessment: riskAssessment,
        framework_type: frameworkType || 'general'
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
