
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
    You are an expert compliance auditor and policy writer with extensive experience. Create a HIGHLY DETAILED and COMPREHENSIVE ${frameworkType || 'compliance'} policy document for "${companyName || 'the organization'}", a ${industry || ''} company with ${companySize || ''} employees.

    Company Context:
    - Company Name: ${companyName || 'The organization'}
    - Industry: ${industry || 'Technology'}
    - Company Size: ${companySize || 'Medium-sized'}
    - Data Types Handled: ${dataTypes || 'Customer and business data'}
    - Business Location: ${businessLocation || 'Multiple locations'}
    - Infrastructure Details: ${infrastructureDetails || 'Cloud and on-premises infrastructure'}
    - Security Controls: ${Array.isArray(securityControls) ? securityControls.join(', ') : securityControls || 'Standard security controls'}
    - Risk Appetite: ${riskAppetite || 'Moderate'}

    STRICT REQUIREMENTS:
    1. The policy document MUST be EXTREMELY COMPREHENSIVE, with AT LEAST 3000 WORDS.
    2. Include a proper policy structure with the following sections (each must be detailed with substantial content):
       - Executive Summary (minimum 300 words)
       - Introduction and Purpose (minimum 300 words)
       - Scope and Applicability (minimum 300 words)
       - Detailed Policy Statements (minimum 800 words)
       - Implementation Guidelines (minimum 400 words)
       - Roles and Responsibilities (minimum 400 words)
       - Compliance Monitoring and Auditing (minimum 300 words)
       - Incident Response Procedures (minimum 300 words)
       - Review and Update Process (minimum 200 words)
       - Appendices as needed
    3. For EACH policy section, provide AT LEAST 4-5 substantive paragraphs with specific and actionable policy statements.
    4. Make frequent reference to the company name (${companyName || 'the organization'}) throughout the document.
    5. Provide highly specific implementation measures tailored to a ${industry || ''} company.
    6. Reference relevant industry-specific compliance requirements and best practices.
    7. IMPORTANT: Each main section must have multiple subsections with detailed content.
    8. Format the content using markdown for readability.
    9. Ensure the policy is professionally written and suitable for a formal compliance document.
    10. The document MUST be comprehensive enough to serve as a primary compliance policy document.
    11. ENSURE the policy contains specific, actionable controls and measures - NOT generic statements.

    ${prompt || ''}
    `

    console.log("Sending comprehensive prompt to OpenAI. Length:", comprehensivePrompt.length)

    const response = await openai.chat.completions.create({
      model: options?.model || "gpt-4o",
      messages: [
        { role: "system", content: "You are a compliance expert specialized in creating detailed policy documents. Your primary goal is to be thorough and comprehensive." },
        { role: "user", content: comprehensivePrompt }
      ],
      max_tokens: options?.max_tokens || 8000,
      temperature: options?.temperature || 0.7
    })

    const generatedPolicy = response.choices[0].message.content
    const wordCount = generatedPolicy.split(/\s+/).length

    console.log("Generated policy. Length:", generatedPolicy.length)
    console.log("Approximate word count:", wordCount)
    
    if (wordCount < 2000) {
      console.warn("WARNING: Generated policy is shorter than expected. Minimum word count was 3000 words but only got", wordCount)
    }

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
    
    The document should be at least 1500 words in length and formatted in markdown.
    `

    const riskResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "system", content: riskAssessmentPrompt }],
      max_tokens: 4000,
      temperature: 0.7
    })

    const riskAssessment = riskResponse.choices[0].message.content
    const riskWordCount = riskAssessment.split(/\s+/).length
    console.log("Risk assessment word count:", riskWordCount)

    return new Response(
      JSON.stringify({
        policy_content: generatedPolicy,
        risk_assessment: riskAssessment,
        framework_type: frameworkType || 'general',
        word_count: wordCount,
        risk_word_count: riskWordCount
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
