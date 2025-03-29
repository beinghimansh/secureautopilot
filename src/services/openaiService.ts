
import { supabase } from '@/integrations/supabase/client';

interface OpenAIRequestOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

/**
 * Generates a comprehensive compliance policy based on the provided prompt.
 * Uses Supabase Edge Function for secure API key handling.
 */
export const generateCompliancePolicy = async (
  prompt: string,
  formData: any,
  options: OpenAIRequestOptions = {}
) => {
  try {
    console.log('Generating policy with data:', JSON.stringify(formData, null, 2));
    
    // Ensure we're sending detailed instructions for content length
    const enhancedPrompt = `${prompt}\n\nIMPORTANT: Generate a HIGHLY DETAILED and COMPREHENSIVE policy with AT LEAST 3000 words. Include multiple sections with detailed content for each. The policy should be authoritative, professional, and thorough, covering all aspects of ${formData.frameworkType.toUpperCase()} compliance for a ${formData.industry} organization of size ${formData.companySize}.`;
    
    const { data, error } = await supabase.functions.invoke('generate-comprehensive-policy', {
      body: {
        prompt: enhancedPrompt,
        formData,
        options: {
          model: options.model || 'gpt-4o',
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 16000, // Significantly increased token limit for comprehensive policies
          stream: options.stream || false
        }
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(`Failed to generate policy: ${error.message}`);
    }
    
    // Log the response size to help diagnose issues
    const policyLength = data?.policy_content?.length || 0;
    const wordCount = data?.policy_content ? data.policy_content.split(/\s+/).length : 0;
    
    console.log('Policy generated successfully:');
    console.log(`- Character length: ${policyLength}`);
    console.log(`- Approximate word count: ${wordCount}`);
    
    if (wordCount < 200) {
      console.warn('WARNING: Generated policy is shorter than the 200 word minimum!');
    } else if (wordCount < 1000) {
      console.warn('Policy is shorter than the recommended 1000 words for comprehensive coverage.');
    } else {
      console.log('Policy meets the word count requirements for comprehensive coverage.');
    }
    
    return data;
  } catch (error) {
    console.error('Error generating policy:', error);
    throw error;
  }
};

/**
 * General-purpose OpenAI completion function.
 * More efficient for shorter, non-policy related content.
 */
export const completeWithAI = async (
  prompt: string,
  options: OpenAIRequestOptions = {}
) => {
  try {
    console.log('AI completion request with prompt:', prompt.substring(0, 50) + '...');
    
    const { data, error } = await supabase.functions.invoke('test-openai', {
      body: {
        prompt,
        options: {
          model: options.model || 'gpt-4o-mini',
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 1000,
          stream: options.stream || false
        }
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(`AI completion failed: ${error.message}`);
    }
    
    console.log('AI completion successful');
    return data;
  } catch (error) {
    console.error('Error completing with AI:', error);
    throw error;
  }
};
