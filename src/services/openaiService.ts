
import { supabase } from '@/integrations/supabase/client';

interface OpenAIRequestOptions {
  model?: string;
  temperature?: number;
  max_tokens?: number;
  stream?: boolean;
}

export const generateCompliancePolicy = async (
  prompt: string,
  options: OpenAIRequestOptions = {}
) => {
  try {
    const { data, error } = await supabase.functions.invoke('generate-comprehensive-policy', {
      body: {
        prompt,
        options: {
          model: options.model || 'gpt-4',
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 2000,
          stream: options.stream || false
        }
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error generating policy:', error);
    throw error;
  }
};

export const completeWithAI = async (
  prompt: string,
  options: OpenAIRequestOptions = {}
) => {
  try {
    const { data, error } = await supabase.functions.invoke('test-openai', {
      body: {
        prompt,
        options: {
          model: options.model || 'gpt-3.5-turbo',
          temperature: options.temperature || 0.7,
          max_tokens: options.max_tokens || 1000,
          stream: options.stream || false
        }
      }
    });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error completing with AI:', error);
    throw error;
  }
};
