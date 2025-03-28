
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

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
    const { companyName, industry, companySize, dataTypes, frameworkType } = await req.json();

    // Construct the prompt for the policy generation
    const prompt = `Generate a comprehensive ${frameworkType.toUpperCase()} compliance policy for a ${industry} company named ${companyName} with ${companySize} employees. The company processes the following types of data: ${dataTypes}. 
    
    Include appropriate sections such as:
    1. Introduction and Scope
    2. Policy Statement
    3. Roles and Responsibilities
    4. ${frameworkType === 'iso27001' ? 'Information Security Controls' : 'Compliance Controls'}
    5. Risk Assessment Process
    6. Implementation Guidelines
    7. Compliance Monitoring and Reporting
    
    Make it detailed, professional, and aligned with ${frameworkType.toUpperCase()} requirements. Include specific controls and requirements that meet regulatory standards.`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert compliance policy writer with deep knowledge of information security standards and regulations. Focus on providing actionable, detailed policies that comply with the specific framework requirements. Provide comprehensive content that can be immediately adopted and implemented by organizations.' 
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    });

    const data = await response.json();
    const generatedPolicy = data.choices[0].message.content;

    // Generate a risk assessment document
    const riskAssessmentPrompt = `Generate a risk assessment document for a ${industry} company named ${companyName} with ${companySize} employees that processes the following types of data: ${dataTypes}. 
    This should follow ${frameworkType.toUpperCase()} risk assessment methodologies and include:
    1. Executive Summary
    2. Risk Identification (list at least 10 specific risks)
    3. Risk Analysis with likelihood and impact ratings
    4. Risk Evaluation with risk scores
    5. Risk Treatment Plans with specific controls
    6. Monitoring and Review Process with KPIs
    
    Make it practical and implementation-ready.`;

    const riskResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an expert risk assessor specializing in information security and compliance frameworks. Provide detailed, actionable risk assessments.' 
          },
          { role: 'user', content: riskAssessmentPrompt }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    const riskData = await riskResponse.json();
    const riskAssessment = riskData.choices[0].message.content;

    // Generate an implementation guide
    const implementationPrompt = `Create a detailed implementation guide for ${frameworkType.toUpperCase()} for a ${industry} company named ${companyName}. Include:
    1. Step-by-step implementation process with timeline
    2. Key controls and measures to implement
    3. Detailed documentation requirements with templates
    4. Training recommendations and awareness program outline
    5. Ongoing compliance maintenance checklist
    6. Common implementation challenges and solutions`;

    const implResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are an implementation specialist for compliance frameworks. Provide practical, step-by-step guidance.' 
          },
          { role: 'user', content: implementationPrompt }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    const implData = await implResponse.json();
    const implementationGuide = implData.choices[0].message.content;

    // Generate a compliance gaps analysis
    const gapsPrompt = `Perform a compliance gap analysis for a ${industry} company named ${companyName} implementing ${frameworkType.toUpperCase()}. Include:
    1. Common gaps found in ${industry} companies
    2. Recommendations to address each gap
    3. Implementation difficulty rating for each recommendation
    4. Prioritization of gap remediation
    5. AI-powered suggestions for efficient compliance achievement`;

    const gapsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { 
            role: 'system', 
            content: 'You are a compliance gap analysis expert. Provide insightful analysis of common compliance gaps and practical recommendations.' 
          },
          { role: 'user', content: gapsPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const gapsData = await gapsResponse.json();
    const gapsAnalysis = gapsData.choices[0].message.content;

    return new Response(
      JSON.stringify({
        policy: generatedPolicy,
        riskAssessment: riskAssessment,
        implementationGuide: implementationGuide,
        gapsAnalysis: gapsAnalysis
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
