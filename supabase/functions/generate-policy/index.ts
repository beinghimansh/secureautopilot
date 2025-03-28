
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
    
    Make it detailed, professional, and aligned with ${frameworkType.toUpperCase()} requirements.`;

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
          { role: 'system', content: 'You are an expert compliance policy writer with deep knowledge of information security standards and regulations.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const data = await response.json();
    const generatedPolicy = data.choices[0].message.content;

    // Generate a risk assessment document
    const riskAssessmentPrompt = `Generate a risk assessment document for a ${industry} company named ${companyName} with ${companySize} employees that processes the following types of data: ${dataTypes}. 
    This should follow ${frameworkType.toUpperCase()} risk assessment methodologies and include:
    1. Executive Summary
    2. Risk Identification
    3. Risk Analysis
    4. Risk Evaluation
    5. Risk Treatment Plans
    6. Monitoring and Review Process`;

    const riskResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert risk assessor specializing in information security and compliance frameworks.' },
          { role: 'user', content: riskAssessmentPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const riskData = await riskResponse.json();
    const riskAssessment = riskData.choices[0].message.content;

    // Generate an implementation guide
    const implementationPrompt = `Create an implementation guide for ${frameworkType.toUpperCase()} for a ${industry} company named ${companyName}. Include:
    1. Step-by-step implementation process
    2. Key controls and measures to implement
    3. Documentation requirements
    4. Training recommendations
    5. Ongoing compliance maintenance`;

    const implResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an implementation specialist for compliance frameworks.' },
          { role: 'user', content: implementationPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const implData = await implResponse.json();
    const implementationGuide = implData.choices[0].message.content;

    // Generate a compliance checklist
    const checklistPrompt = `Create a comprehensive ${frameworkType.toUpperCase()} compliance checklist for a ${industry} company. Structure it by control domains and make it actionable.`;

    const checklistResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are a compliance auditor specializing in creating thorough compliance checklists.' },
          { role: 'user', content: checklistPrompt }
        ],
        temperature: 0.7,
        max_tokens: 1500,
      }),
    });

    const checklistData = await checklistResponse.json();
    const complianceChecklist = checklistData.choices[0].message.content;

    return new Response(
      JSON.stringify({
        policy: generatedPolicy,
        riskAssessment: riskAssessment,
        implementationGuide: implementationGuide,
        complianceChecklist: complianceChecklist
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
