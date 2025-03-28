
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

    // Get the rules for this framework type to include in the policy generation
    let frameworkRules = [];
    let frameworkSpecificPrompt = "";
    
    try {
      console.log(`Fetching requirements for ${frameworkType}...`);
      
      // Creating a detailed prompt based on which framework we're generating for
      if (frameworkType === "iso27001") {
        frameworkSpecificPrompt = `
          ISO 27001 uses a structure of Annex A controls divided into the following categories:
          A.5 Information Security Policies
          A.6 Organization of Information Security
          A.7 Human Resource Security
          A.8 Asset Management
          A.9 Access Control
          A.10 Cryptography
          A.11 Physical and Environmental Security
          A.12 Operations Security
          A.13 Communications Security
          A.14 System Acquisition, Development and Maintenance
          A.15 Supplier Relationships
          A.16 Information Security Incident Management
          A.17 Information Security Aspects of Business Continuity Management
          A.18 Compliance
          
          For each control area, provide DETAILED implementation guidance specifically for ${companyName} as a ${industry} company.
          Include:
          1. Specific policy statements - at least 5-10 detailed points for each control area
          2. Implementation procedures with step-by-step actions
          3. Roles and responsibilities for implementing each control
          4. Specific technologies and methods that should be employed
          5. Monitoring and measurement criteria for each control
          6. Documentation requirements
          
          The policy must be EXTREMELY DETAILED, with at least 15-20 pages worth of content, not just high-level statements.
        `;
      } else if (frameworkType === "gdpr") {
        frameworkSpecificPrompt = `
          GDPR requires organizations to address the following key principles:
          1. Lawfulness, fairness and transparency
          2. Purpose limitation
          3. Data minimization
          4. Accuracy
          5. Storage limitation
          6. Integrity and confidentiality
          7. Accountability
          
          Additionally, the policy should cover data subject rights:
          - Right to be informed
          - Right of access
          - Right to rectification
          - Right to erasure
          - Right to restrict processing
          - Right to data portability
          - Right to object
          - Rights related to automated decision making and profiling
          
          For each principle and right, provide DETAILED implementation guidance specifically for ${companyName} as a ${industry} company.
          Include:
          1. Specific policy statements - at least 5-10 detailed points for each principle and right
          2. Implementation procedures with step-by-step actions
          3. Technical and organizational measures to achieve compliance
          4. Documentation and record-keeping requirements
          5. Specific examples of how these apply to ${companyName}'s data processing activities
          6. Training and awareness requirements
          7. Breach notification procedures in great detail
          
          The policy must be EXTREMELY DETAILED, with at least 15-20 pages worth of content, not just high-level statements.
        `;
      } else if (frameworkType === "soc2") {
        frameworkSpecificPrompt = `
          SOC 2 is based on the following Trust Services Criteria:
          1. Security - The system is protected against unauthorized access
          2. Availability - The system is available for operation and use
          3. Processing Integrity - System processing is complete, accurate, timely, and authorized
          4. Confidentiality - Information designated as confidential is protected
          5. Privacy - Personal information is collected, used, retained, and disclosed in conformity with commitments
          
          For each criteria, provide DETAILED implementation guidance specifically for ${companyName} as a ${industry} company.
          Include:
          1. Specific policy statements - at least 5-10 detailed points for each criteria
          2. Implementation procedures with step-by-step actions
          3. Control objectives and specific control activities for each criteria
          4. Detailed monitoring and testing procedures
          5. Roles and responsibilities for each control area
          6. Evidence collection and retention requirements
          7. Specific examples of how these controls should be implemented at ${companyName}
          
          The policy must be EXTREMELY DETAILED, with at least 15-20 pages worth of content, not just high-level statements.
        `;
      } else if (frameworkType === "hipaa") {
        frameworkSpecificPrompt = `
          HIPAA compliance requires addressing:
          
          1. Privacy Rule - Regulations for the use and disclosure of Protected Health Information (PHI)
          2. Security Rule - Administrative, physical, and technical safeguards including:
             - Administrative Safeguards (security management, assigned security responsibility, workforce training)
             - Physical Safeguards (facility access, workstation security, device controls)
             - Technical Safeguards (access controls, audit controls, integrity controls, transmission security)
          3. Breach Notification Rule - Procedures for reporting breaches
          
          For each rule and safeguard, provide DETAILED implementation guidance specifically for ${companyName} as a ${industry} company.
          Include:
          1. Specific policy statements - at least 5-10 detailed points for each rule and safeguard
          2. Implementation procedures with step-by-step actions
          3. Technical controls and solutions that should be employed
          4. Training requirements and procedures
          5. Audit and monitoring requirements
          6. Documentation and record-keeping requirements
          7. Detailed breach identification, investigation, and notification procedures
          
          The policy must be EXTREMELY DETAILED, with at least 15-20 pages worth of content, not just high-level statements.
        `;
      } else if (frameworkType === "pci_dss") {
        frameworkSpecificPrompt = `
          PCI DSS is organized into six control objectives:
          1. Build and maintain a secure network and systems
          2. Protect cardholder data
          3. Maintain a vulnerability management program
          4. Implement strong access control measures
          5. Regularly monitor and test networks
          6. Maintain an information security policy
          
          For each control objective, provide DETAILED implementation guidance specifically for ${companyName} as a ${industry} company.
          Include:
          1. Specific policy statements - at least 5-10 detailed points for each control objective
          2. Implementation procedures with step-by-step actions
          3. Technical controls and solutions that should be employed
          4. Testing and validation procedures
          5. Monitoring and logging requirements
          6. Incident response procedures
          7. Vendor management requirements for PCI compliance
          
          The policy must be EXTREMELY DETAILED, with at least 15-20 pages worth of content, not just high-level statements.
        `;
      }
      
      // Now we have framework-specific requirements to include in our prompt
      console.log("Framework-specific requirements loaded");
      
    } catch (reqError) {
      console.error("Error fetching framework requirements:", reqError);
      // Continue anyway, we'll generate a more generic policy
    }

    // Now proceed with OpenAI API call
    console.log("Calling OpenAI API...");
    
    const openAIRequest = {
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: `You are an expert compliance policy generator specialized in ${frameworkType.toUpperCase()} compliance. 
          Your task is to create a COMPREHENSIVE, DETAILED, and ACTIONABLE compliance policy document tailored specifically for ${companyName}, 
          a ${industry} company with ${companySize} employees that processes ${dataTypes}.
          
          The policy should be deeply customized to the company's specific details:
          - Company Name: ${companyName}
          - Industry: ${industry}
          - Size: ${companySize}
          - Data Types: ${dataTypes}
          - Business Location: ${businessLocation || "Not specified"}
          - IT Infrastructure: ${infrastructureDetails || "Standard IT infrastructure"}
          - Security Controls: ${securityControls.length > 0 ? securityControls.join(", ") : "Standard security controls"}
          - Risk Appetite: ${riskAppetite}
          
          ${frameworkSpecificPrompt}
          
          The policy document MUST include:
          1. Detailed introduction specific to ${companyName} (with company name mentioned throughout)
          2. Clear scope defining systems, processes, and data covered
          3. DETAILED policy statements with specific requirements for EACH control area (minimum 5-10 detailed points per area)
          4. Specific implementation procedures tailored to ${companyName}'s operations
          5. Specific roles and responsibilities within ${companyName}'s organizational structure
          6. Training requirements and procedures
          7. Detailed compliance measurement and auditing procedures
          8. Record keeping and documentation requirements
          9. Incident response procedures
          10. References to relevant regulations and standards
          
          Make the policy EXTREMELY DETAILED and SPECIFIC to ${companyName}. It should read as if it was custom-written for this company by a subject matter expert, not a generic template. 
          Format the policy with clear headings and sections using markdown formatting.
          
          THE POLICY MUST BE COMPREHENSIVE AND LENGTHY (minimum 15-20 pages worth of content) WITH SPECIFIC ACTIONABLE GUIDANCE.` 
        },
        { 
          role: 'user', 
          content: `Please generate a detailed ${frameworkType.toUpperCase()} compliance policy document for ${companyName}, 
          a ${industry} company with ${companySize} employees processing ${dataTypes}.
          
          This policy should be comprehensive and practical, with specific measures that address our company's unique context. 
          Please don't create a generic template - we need a policy document that reads as if it was written specifically for our company, 
          mentioning our company name throughout the document.
          
          Additional details about our company:
          - Location: ${businessLocation || "Multiple locations"}
          - IT Infrastructure: ${infrastructureDetails || "Cloud and on-premises hybrid infrastructure"}
          - Current Security Controls: ${securityControls.length > 0 ? securityControls.join(", ") : "Basic security controls"}
          - Risk Appetite: ${riskAppetite}
          
          Please include the following sections:
          1. Policy Introduction & Purpose
          2. Scope & Applicability
          3. Key Definitions relevant to our industry
          4. Detailed Policy Statements for all control areas
          5. Implementation Requirements specific to our business
          6. Compliance Measurement & Auditing
          7. Roles & Responsibilities within our organization
          8. References & Related Documents
          
          Remember, we need a VERY DETAILED policy that covers all aspects of ${frameworkType.toUpperCase()} compliance thoroughly, not just a high-level overview.` 
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
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
    
    // Generate additional documents using the same approach
    // Generate Risk Assessment
    console.log("Generating risk assessment...");
    const riskRequest = {
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: `You are a risk assessment specialist for ${frameworkType.toUpperCase()} compliance. Create a detailed risk assessment document for ${companyName}, a ${industry} company. Include:
          1. Executive Summary
          2. Risk Assessment Methodology
          3. Identified Risks (categorized by severity and likelihood)
          4. Detailed Analysis of Key Risks specific to ${companyName}'s operations
          5. Risk Mitigation Strategies tailored to ${companyName}
          6. Risk Owner Assignments within ${companyName}'s structure
          7. Monitoring and Review Procedures
          
          Make it highly specific to a ${industry} company of size ${companySize}, not generic. The document should be comprehensive and detailed with specific actionable recommendations.` 
        },
        { 
          role: 'user', 
          content: `Create a detailed risk assessment for ${companyName} related to our ${frameworkType.toUpperCase()} compliance program. We are a ${industry} company with ${companySize} employees processing ${dataTypes}.
          
          Make the risk assessment very detailed with specific risks relevant to our industry and company size. Include at least 10-15 specific risks with detailed analysis and mitigation strategies for each.` 
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    };
    
    const riskResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(riskRequest),
    });
    
    let riskAssessment = "";
    if (riskResponse.ok) {
      const riskData = await riskResponse.json();
      riskAssessment = riskData.choices[0].message.content;
      console.log("Risk assessment generated successfully");
    } else {
      console.error("Failed to generate risk assessment");
      riskAssessment = `# Risk Assessment for ${companyName}\n\nRisk assessment document could not be generated.`;
    }
    
    // Generate Implementation Guide
    console.log("Generating implementation guide...");
    const implRequest = {
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: `You are a ${frameworkType.toUpperCase()} implementation specialist. Create a detailed implementation guide for ${companyName}, a ${industry} company. Include:
          1. Implementation Roadmap with Timeline
          2. Phase 1: Initial Assessment & Planning
          3. Phase 2: Policy Development & Documentation
          4. Phase 3: Implementation of Controls
          5. Phase 4: Training & Awareness
          6. Phase 5: Monitoring & Continuous Improvement
          7. Resource Requirements
          8. Implementation Challenges and Solutions
          
          Make it highly specific to a ${industry} company of size ${companySize}, not generic. The document should be comprehensive and detailed with specific actionable recommendations.` 
        },
        { 
          role: 'user', 
          content: `Create a detailed implementation guide for our ${frameworkType.toUpperCase()} compliance program at ${companyName}. We are a ${industry} company with ${companySize} employees processing ${dataTypes}.
          
          Make the implementation guide very detailed with specific steps, timelines, and resource requirements. Include specific implementation advice for each control area and address unique challenges in our industry.` 
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    };
    
    const implResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(implRequest),
    });
    
    let implementationGuide = "";
    if (implResponse.ok) {
      const implData = await implResponse.json();
      implementationGuide = implData.choices[0].message.content;
      console.log("Implementation guide generated successfully");
    } else {
      console.error("Failed to generate implementation guide");
      implementationGuide = `# Implementation Guide for ${companyName}\n\nImplementation guide could not be generated.`;
    }
    
    // Generate Gaps Analysis
    console.log("Generating gaps analysis...");
    const gapsRequest = {
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: `You are a ${frameworkType.toUpperCase()} compliance auditor. Create a gaps analysis document for ${companyName}, a ${industry} company. Include:
          1. Executive Summary
          2. Assessment Methodology
          3. Current State Analysis
          4. Gap Identification by Control Area
          5. Prioritized Remediation Plan
          6. Resources and Timeline Estimates
          7. Key Performance Indicators
          
          Assume they're starting their compliance journey and identify likely gaps based on their industry and size.
          Make it highly specific to a ${industry} company of size ${companySize}, not generic. The document should be comprehensive and detailed with specific actionable recommendations.` 
        },
        { 
          role: 'user', 
          content: `Create a gaps analysis for our ${frameworkType.toUpperCase()} compliance program at ${companyName}. We are a ${industry} company with ${companySize} employees processing ${dataTypes}.
          
          Make the gaps analysis very detailed with specific gaps identified for each control area. Include detailed remediation strategies and prioritization based on risk level.` 
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    };
    
    const gapsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gapsRequest),
    });
    
    let gapsAnalysis = "";
    if (gapsResponse.ok) {
      const gapsData = await gapsResponse.json();
      gapsAnalysis = gapsData.choices[0].message.content;
      console.log("Gaps analysis generated successfully");
    } else {
      console.error("Failed to generate gaps analysis");
      gapsAnalysis = `# Gaps Analysis for ${companyName}\n\nGaps analysis could not be generated.`;
    }
    
    // Generate AI Suggestions
    console.log("Generating AI suggestions...");
    const suggestionsRequest = {
      model: 'gpt-4o',
      messages: [
        { 
          role: 'system', 
          content: `You are an AI advisor specializing in ${frameworkType.toUpperCase()} compliance. Create a document with advanced suggestions for ${companyName}, a ${industry} company. Include:
          1. Executive Summary
          2. Advanced Security Measures for ${industry}
          3. Industry-Specific Best Practices
          4. Emerging Threats and Mitigations
          5. Technology Recommendations
          6. Strategic Compliance Roadmap
          7. Competitive Advantage Through Compliance
          
          Make it highly specific to a ${industry} company of size ${companySize}, not generic. The document should be comprehensive and detailed with specific actionable recommendations.` 
        },
        { 
          role: 'user', 
          content: `Provide advanced suggestions for enhancing our ${frameworkType.toUpperCase()} compliance program at ${companyName}. We are a ${industry} company with ${companySize} employees processing ${dataTypes}.
          
          Make the suggestions very detailed and specific to our industry and size. Include innovative approaches and emerging best practices that can give us a competitive edge.` 
        }
      ],
      temperature: 0.7,
      max_tokens: 3000,
    };
    
    const suggestionsResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(suggestionsRequest),
    });
    
    let aiSuggestions = "";
    if (suggestionsResponse.ok) {
      const suggestionsData = await suggestionsResponse.json();
      aiSuggestions = suggestionsData.choices[0].message.content;
      console.log("AI suggestions generated successfully");
    } else {
      console.error("Failed to generate AI suggestions");
      aiSuggestions = `# AI Suggestions for ${companyName}\n\nAI suggestions could not be generated.`;
    }

    // Store policy content in the database
    let policyId = null;
    try {
      if (userId) {
        console.log("Storing generated policy in database...");
        
        const { data: policyData, error: policyError } = await supabase
          .from('generated_policies')
          .insert({
            organization_id: organizationId,
            framework_type: frameworkType,
            policy_content: policyContent,
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
      policyContent: policyContent,
      formattedPolicy: policyContent,
      riskAssessment,
      implementationGuide,
      gapsAnalysis,
      aiSuggestions,
      frameworkType,
      policyId,
      companyName
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
