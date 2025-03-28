
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
    const { 
      companyName, 
      industry, 
      companySize, 
      dataTypes, 
      frameworkType,
      businessLocation = 'global',
      infrastructureDetails = '',
      securityControls = [],
      riskAppetite = 'moderate'
    } = await req.json();

    console.log('Generating policy for:', companyName, 'with framework:', frameworkType);

    // Construct a more detailed prompt for the policy generation
    const prompt = `Generate a comprehensive ${frameworkType.toUpperCase()} compliance policy for ${companyName}, a ${industry} company with ${companySize} employees. 
    
    Company Details:
    - Primary business location: ${businessLocation}
    - Types of data processed: ${dataTypes}
    - Infrastructure: ${infrastructureDetails || 'Not specified'}
    - Existing security controls: ${securityControls.length > 0 ? securityControls.join(', ') : 'Not specified'}
    - Risk appetite: ${riskAppetite}
    
    Include appropriate sections such as:
    1. Introduction and Scope
    2. Policy Statement
    3. Roles and Responsibilities
    4. ${frameworkType === 'iso27001' ? 'Information Security Controls' : 'Compliance Controls'}
    5. Risk Assessment Process
    6. Implementation Guidelines
    7. Compliance Monitoring and Reporting
    
    Make it detailed, professional, and aligned with ${frameworkType.toUpperCase()} requirements. Include specific controls and requirements that meet regulatory standards.
    Format the policy with proper headings, subheadings, and bullet points where appropriate.`;

    // Call OpenAI API for the policy generation
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

    // Generate a risk assessment document with more framework-specific risks
    const riskAssessmentPrompt = `Generate a risk assessment document for ${companyName}, a ${industry} company with ${companySize} employees that processes the following types of data: ${dataTypes}. 
    
    This should follow ${frameworkType.toUpperCase()} risk assessment methodologies and include:
    1. Executive Summary
    2. Risk Identification (list at least 15 specific risks relevant to ${industry} and ${frameworkType.toUpperCase()})
    3. Risk Analysis with likelihood and impact ratings (Low, Medium, High)
    4. Risk Evaluation with risk scores
    5. Risk Treatment Plans with specific controls
    6. Monitoring and Review Process with KPIs
    
    Make it practical and implementation-ready, with emphasis on risks commonly encountered in ${industry} related to ${frameworkType.toUpperCase()} compliance.`;

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
            content: 'You are an expert risk assessor specializing in information security and compliance frameworks. Provide detailed, actionable risk assessments with industry-specific insights.' 
          },
          { role: 'user', content: riskAssessmentPrompt }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    const riskData = await riskResponse.json();
    const riskAssessment = riskData.choices[0].message.content;

    // Generate an implementation guide with specific recommendations
    const implementationPrompt = `Create a detailed implementation guide for ${frameworkType.toUpperCase()} for ${companyName}, a ${industry} company. Include:
    
    1. Step-by-step implementation process with timeline (3, 6, and 12-month milestones)
    2. Key controls and measures to implement, prioritized by importance
    3. Detailed documentation requirements with templates
    4. Training recommendations and awareness program outline
    5. Ongoing compliance maintenance checklist
    6. Common implementation challenges and solutions specific to ${industry}
    7. Technology recommendations that support compliance with ${frameworkType.toUpperCase()}`;

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
            content: 'You are an implementation specialist for compliance frameworks with extensive experience in helping organizations achieve certification. Provide practical, step-by-step guidance.' 
          },
          { role: 'user', content: implementationPrompt }
        ],
        temperature: 0.7,
        max_tokens: 3000,
      }),
    });

    const implData = await implResponse.json();
    const implementationGuide = implData.choices[0].message.content;

    // Generate a compliance gaps analysis with AI-powered recommendations
    const gapsPrompt = `Perform a compliance gap analysis for ${companyName}, a ${industry} company implementing ${frameworkType.toUpperCase()}. Include:
    
    1. Common compliance gaps found in ${industry} companies (at least 12 specific gaps)
    2. Recommendations to address each gap with priority ratings
    3. Implementation difficulty rating for each recommendation (Easy, Medium, Hard)
    4. Prioritization of gap remediation based on risk level
    5. AI-powered suggestions for efficient compliance achievement
    6. Technology recommendations that can help close compliance gaps
    7. Cost considerations for implementing solutions`;

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
            content: 'You are a compliance gap analysis expert with deep industry knowledge. Provide insightful analysis of common compliance gaps and practical recommendations with implementation priorities.' 
          },
          { role: 'user', content: gapsPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const gapsData = await gapsResponse.json();
    const gapsAnalysis = gapsData.choices[0].message.content;

    // Generate AI-powered suggestions report
    const suggestionsPrompt = `Based on ${companyName}'s profile as a ${industry} company with ${companySize} employees that processes ${dataTypes}, provide AI-powered suggestions for optimizing their ${frameworkType.toUpperCase()} compliance program. 
    
    Include:
    1. 5 innovative approaches to compliance that leverage AI and automation
    2. Emerging risks in the ${industry} sector that may not be covered by standard ${frameworkType.toUpperCase()} controls
    3. Recommendations for continuous compliance monitoring
    4. Technology stack suggestions that would enhance compliance posture
    5. Metrics and KPIs to track compliance program effectiveness`;

    const suggestionsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
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
            content: 'You are an AI compliance strategist who specializes in innovative approaches to compliance management. Provide forward-thinking suggestions that leverage modern technologies.' 
          },
          { role: 'user', content: suggestionsPrompt }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    const suggestionsData = await suggestionsResponse.json();
    const aiSuggestions = suggestionsData.choices[0].message.content;

    console.log('Policy generation completed successfully for', companyName);

    return new Response(
      JSON.stringify({
        policy: generatedPolicy,
        riskAssessment: riskAssessment,
        implementationGuide: implementationGuide,
        gapsAnalysis: gapsAnalysis,
        aiSuggestions: aiSuggestions
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in policy generation:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
