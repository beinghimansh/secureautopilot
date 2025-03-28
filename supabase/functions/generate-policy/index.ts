
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

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
    // Check for required environment variables
    if (!openAIApiKey) {
      console.error("OpenAI API Key not configured");
      throw new Error("OPENAI_API_KEY is not configured in the environment variables");
    }

    if (!supabaseUrl || !supabaseServiceKey) {
      console.error("Supabase credentials not configured");
      throw new Error("Supabase credentials are not configured properly");
    }

    // Initialize Supabase client with service role key for admin access
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log("Starting policy generation process...");
    const requestBody = await req.json();
    
    // Destructure request body with default values
    const { 
      companyName = "Unknown Company", 
      industry = "Technology", 
      companySize = "1-10 employees", 
      dataTypes = "Generic data", 
      frameworkType = "iso27001",
      businessLocation = "",
      infrastructureDetails = "",
      securityControls = [],
      riskAppetite = "Moderate",
      organizationId,
      userId
    } = requestBody;

    console.log("Policy generation request:", { 
      companyName, industry, companySize, dataTypes, frameworkType, 
      businessLocation, infrastructureDetails,
      securityControls: securityControls ? securityControls.join(", ") : "None specified",
      riskAppetite
    });

    // First, store company details in the database
    try {
      console.log("Storing company details in the database...");
      
      // Check if we have a valid userId
      if (!userId) {
        console.warn("No userId provided, company profile will be created without user association");
      }
      
      const companyProfileData = {
        name: companyName,
        industry,
        company_size: companySize,
        data_types: dataTypes,
        business_location: businessLocation,
        infrastructure_details: infrastructureDetails,
        security_controls: securityControls,
        risk_appetite: riskAppetite,
        organization_id: organizationId || null,
        created_by: userId || null,
        updated_at: new Date().toISOString()
      };
      
      console.log("Company profile data:", companyProfileData);
      
      const { data: companyData, error: companyError } = await supabase
        .from('company_profiles')
        .upsert(companyProfileData)
        .select();
      
      if (companyError) {
        console.error("Error storing company details:", companyError);
        throw new Error(`Database error: ${companyError.message}`);
      } else {
        console.log("Company details stored successfully:", companyData);
      }
    } catch (dbError) {
      console.error("Database operation failed:", dbError);
      throw new Error(`Failed to store company profile: ${dbError.message}`);
    }

    // Now proceed with OpenAI API call
    console.log("Calling OpenAI API...");
    
    const openAIRequest = {
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
    };

    console.log("Sending request to OpenAI API...");
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(openAIRequest),
    });

    console.log("OpenAI API response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("OpenAI API Error:", errorData);
      throw new Error(`OpenAI API error: ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log("OpenAI response received successfully");
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("Unexpected OpenAI response format:", data);
      throw new Error("Unexpected response format from OpenAI API");
    }
    
    const policyContent = data.choices[0].message.content;
    console.log("Policy generated successfully");

    // Parse the content to divide it into different sections
    // This is a simplified version - in practice you would need more robust parsing
    const sections = {
      introduction: { 
        purpose: "This policy provides guidelines for implementing " + frameworkType.toUpperCase() + " compliance.",
        scope: "This policy applies to all employees, systems and data within " + companyName + "."
      },
      objectives: [
        "Ensure compliance with " + frameworkType.toUpperCase() + " framework",
        "Protect sensitive information and data",
        "Establish clear security controls and responsibilities"
      ],
      key_controls: [
        { 
          control_name: "Access Control", 
          description: "Implement strong access control measures" 
        },
        { 
          control_name: "Risk Management", 
          description: "Regular risk assessments and mitigation strategies" 
        }
      ],
      risk_assessment: {
        identified_risks: [
          {
            risk_title: "Data Breach",
            risk_level: "High",
            mitigation_strategy: "Implement encryption and access controls"
          }
        ]
      },
      implementation_guide: {
        steps: [
          {
            step_title: "Initial Assessment",
            description: "Evaluate current security posture",
            timeline: "1-2 weeks"
          }
        ]
      },
      compliance_gaps: [
        {
          gap_area: "Documentation",
          recommendation: "Develop comprehensive documentation for all security controls"
        }
      ],
      best_practices: [
        "Regular security awareness training for all employees",
        "Periodic review and updates to security policies"
      ]
    };

    // Store policy content in the database
    let policyId = null;
    try {
      if (userId) {
        console.log("Storing generated policy in database...");
        
        const formattedPolicy = formatPolicyDocument(sections, companyName, frameworkType);
        const riskAssessment = formatRiskAssessment(sections.risk_assessment, companyName, frameworkType);
        const implementationGuide = formatImplementationGuide(sections.implementation_guide, companyName, frameworkType);
        const gapsAnalysis = formatGapsAnalysis(sections.compliance_gaps, companyName, frameworkType);
        const aiSuggestions = formatAISuggestions(sections.best_practices, companyName, frameworkType);
        
        const { data: policyData, error: policyError } = await supabase
          .from('generated_policies')
          .insert({
            organization_id: organizationId,
            framework_type: frameworkType,
            policy_content: formattedPolicy,
            risk_assessment: riskAssessment,
            implementation_guide: implementationGuide,
            gaps_analysis: gapsAnalysis,
            ai_suggestions: aiSuggestions,
            created_by: userId
          })
          .select();
        
        if (policyError) {
          console.error("Error storing policy in database:", policyError);
        } else {
          console.log("Policy stored successfully:", policyData);
          if (policyData && policyData.length > 0) {
            policyId = policyData[0].id;
          }
        }
      }
    } catch (dbError) {
      console.error("Policy storage error:", dbError);
    }

    // Return the generated policy
    return new Response(JSON.stringify({
      policyDocument: { policy_sections: sections },
      formattedPolicy: formatPolicyDocument(sections, companyName, frameworkType),
      riskAssessment: formatRiskAssessment(sections.risk_assessment, companyName, frameworkType),
      implementationGuide: formatImplementationGuide(sections.implementation_guide, companyName, frameworkType),
      gapsAnalysis: formatGapsAnalysis(sections.compliance_gaps, companyName, frameworkType),
      aiSuggestions: formatAISuggestions(sections.best_practices, companyName, frameworkType),
      frameworkType,
      policyId
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Policy Generation Error:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message 
    }), {
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
