
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
    console.log('Generating policy with data:', JSON.stringify(formData).substring(0, 100) + '...');
    
    const { data, error } = await supabase.functions.invoke('generate-comprehensive-policy', {
      body: {
        prompt,
        formData,
        options: {
          model: options.model || 'gpt-4o',
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 4000, // Increased token limit for comprehensive policies
          stream: options.stream || false
        }
      }
    });

    if (error) {
      console.error('Edge function error:', error);
      throw new Error(`Failed to generate policy: ${error.message}`);
    }
    
    console.log('Policy generated successfully, length:', data?.policy_content?.length || 0);
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
