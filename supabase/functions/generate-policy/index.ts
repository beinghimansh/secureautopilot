
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
            },
            implementation_guide: {
              type: "object",
              properties: {
                steps: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      step_title: { type: "string" },
                      description: { type: "string" },
                      timeline: { type: "string" }
                    }
                  }
                }
              }
            },
            compliance_gaps: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  gap_area: { type: "string" },
                  recommendation: { type: "string" }
                }
              }
            },
            best_practices: {
              type: "array",
              items: { type: "string" }
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
      frameworkType,
      businessLocation,
      infrastructureDetails,
      securityControls,
      riskAppetite,
      organizationId,
      userId
    } = await req.json();

    console.log("Generating policy with parameters:", { 
      companyName, industry, companySize, dataTypes, frameworkType, businessLocation,
      securityControls: securityControls ? securityControls.join(", ") : "None specified",
      riskAppetite: riskAppetite || "Moderate"
    });

    if (!openAIApiKey) {
      throw new Error("OPENAI_API_KEY is not configured in the environment variables");
    }

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
            content: `You are an expert policy generator specialized in ${frameworkType} compliance. 
            Generate a comprehensive, actionable policy document tailored to a ${industry} company 
            with ${companySize} employees processing ${dataTypes}.
            
            If security controls were provided, incorporate them: ${securityControls ? securityControls.join(", ") : "No specific controls provided"}.
            If infrastructure details were provided, consider them: ${infrastructureDetails || "No specific infrastructure details provided"}.
            If business location was provided, ensure regional compliance: ${businessLocation || "No specific location provided"}.
            If risk appetite was specified, align with: ${riskAppetite || "Moderate risk appetite"}.` 
          },
          { 
            role: 'user', 
            content: `Please generate a detailed policy document for ${companyName} 
            focusing on ${frameworkType} compliance requirements. The policy should include introduction, 
            objectives, key controls, risk assessment, implementation guide, compliance gaps analysis, 
            and best practices sections.` 
          }
        ],
        functions: policyGenerationFunctions,
        function_call: { 
          name: "generate_comprehensive_policy" 
        }
      }),
    });

    console.log("OpenAI response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log("OpenAI response received");
    
    // Parse the function call response
    if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.function_call) {
      console.error("Unexpected OpenAI response format:", data);
      throw new Error("Unexpected response format from OpenAI API");
    }
    
    const functionCall = data.choices[0].message.function_call;
    if (!functionCall) {
      throw new Error("No function call in response");
    }
    
    const policyContent = JSON.parse(functionCall.arguments);
    console.log("Policy generated successfully");

    // Format policy sections into a coherent document
    const formattedPolicy = formatPolicyDocument(policyContent.policy_sections, companyName, frameworkType);
    
    // Format risk assessment into a separate document
    const riskAssessment = formatRiskAssessment(policyContent.policy_sections.risk_assessment, companyName, frameworkType);
    
    // Format implementation guide into a separate document
    const implementationGuide = formatImplementationGuide(policyContent.policy_sections.implementation_guide, companyName, frameworkType);
    
    // Format gaps analysis into a separate document
    const gapsAnalysis = formatGapsAnalysis(policyContent.policy_sections.compliance_gaps, companyName, frameworkType);
    
    // Format AI suggestions based on best practices
    const aiSuggestions = formatAISuggestions(policyContent.policy_sections.best_practices, companyName, frameworkType);

    // Store in Supabase if organizationId and userId are provided
    let policyId = null;
    if (organizationId && userId) {
      // This would be implemented with a real database insert
      console.log("Would store policy in database for org:", organizationId, "user:", userId);
      // In a real implementation, we would get back the ID of the newly created policy
      policyId = "simulated-policy-id";
    }

    return new Response(JSON.stringify({
      policyDocument: policyContent,
      formattedPolicy,
      riskAssessment,
      implementationGuide,
      gapsAnalysis,
      aiSuggestions,
      frameworkType,
      policyId
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

// Helper function to format the policy document
function formatPolicyDocument(sections, companyName, frameworkType) {
  const { introduction, objectives, key_controls } = sections;
  
  let policyText = `# ${frameworkType.toUpperCase()} POLICY DOCUMENT\n\n`;
  policyText += `## For: ${companyName}\n\n`;
  policyText += `### Date: ${new Date().toLocaleDateString()}\n\n`;
  
  // Introduction section
  policyText += `## 1. INTRODUCTION\n\n`;
  policyText += `### 1.1 Purpose\n${introduction.purpose}\n\n`;
  policyText += `### 1.2 Scope\n${introduction.scope}\n\n`;
  
  // Objectives section
  policyText += `## 2. OBJECTIVES\n\n`;
  objectives.forEach((objective, i) => {
    policyText += `### 2.${i+1} ${objective}\n\n`;
  });
  
  // Key Controls section
  policyText += `## 3. KEY CONTROLS\n\n`;
  key_controls.forEach((control, i) => {
    policyText += `### 3.${i+1} ${control.control_name}\n${control.description}\n\n`;
  });
  
  return policyText;
}

// Helper function to format the risk assessment
function formatRiskAssessment(riskSection, companyName, frameworkType) {
  let riskText = `# ${frameworkType.toUpperCase()} RISK ASSESSMENT\n\n`;
  riskText += `## For: ${companyName}\n\n`;
  riskText += `### Date: ${new Date().toLocaleDateString()}\n\n`;
  
  riskText += `## IDENTIFIED RISKS\n\n`;
  
  if (riskSection && riskSection.identified_risks) {
    riskSection.identified_risks.forEach((risk, i) => {
      riskText += `### Risk ${i+1}: ${risk.risk_title}\n`;
      riskText += `**Risk Level:** ${risk.risk_level}\n\n`;
      riskText += `**Mitigation Strategy:** ${risk.mitigation_strategy}\n\n`;
    });
  } else {
    riskText += "No specific risks have been identified.\n\n";
  }
  
  return riskText;
}

// Helper function to format the implementation guide
function formatImplementationGuide(implementationSection, companyName, frameworkType) {
  let guideText = `# ${frameworkType.toUpperCase()} IMPLEMENTATION GUIDE\n\n`;
  guideText += `## For: ${companyName}\n\n`;
  guideText += `### Date: ${new Date().toLocaleDateString()}\n\n`;
  
  guideText += `## IMPLEMENTATION STEPS\n\n`;
  
  if (implementationSection && implementationSection.steps) {
    implementationSection.steps.forEach((step, i) => {
      guideText += `### Step ${i+1}: ${step.step_title}\n`;
      guideText += `${step.description}\n\n`;
      guideText += `**Timeline:** ${step.timeline}\n\n`;
    });
  } else {
    guideText += "No specific implementation steps have been provided.\n\n";
  }
  
  return guideText;
}

// Helper function to format the gaps analysis
function formatGapsAnalysis(gapsSection, companyName, frameworkType) {
  let gapsText = `# ${frameworkType.toUpperCase()} COMPLIANCE GAP ANALYSIS\n\n`;
  gapsText += `## For: ${companyName}\n\n`;
  gapsText += `### Date: ${new Date().toLocaleDateString()}\n\n`;
  
  gapsText += `## IDENTIFIED GAPS\n\n`;
  
  if (gapsSection && gapsSection.length > 0) {
    gapsSection.forEach((gap, i) => {
      gapsText += `### Gap ${i+1}: ${gap.gap_area}\n`;
      gapsText += `**Recommendation:** ${gap.recommendation}\n\n`;
    });
  } else {
    gapsText += "No specific compliance gaps have been identified.\n\n";
  }
  
  return gapsText;
}

// Helper function to format AI suggestions
function formatAISuggestions(bestPractices, companyName, frameworkType) {
  let suggestionsText = `# AI-POWERED IMPROVEMENT SUGGESTIONS FOR ${frameworkType.toUpperCase()}\n\n`;
  suggestionsText += `## For: ${companyName}\n\n`;
  suggestionsText += `### Date: ${new Date().toLocaleDateString()}\n\n`;
  
  suggestionsText += `## RECOMMENDED BEST PRACTICES\n\n`;
  
  if (bestPractices && bestPractices.length > 0) {
    bestPractices.forEach((practice, i) => {
      suggestionsText += `### Best Practice ${i+1}:\n${practice}\n\n`;
    });
  } else {
    suggestionsText += "No specific best practices have been provided.\n\n";
  }
  
  return suggestionsText;
}
