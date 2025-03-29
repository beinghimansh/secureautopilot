
import { useState } from 'react';
import { completeWithAI } from '@/services/openaiService';
import { toast } from 'sonner';

export function useFrameworkAI(frameworkId: string) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  
  const generateWithAI = async (prompt: string) => {
    setIsGenerating(true);
    setAiResponse(null);
    
    try {
      console.log('Generating AI response for prompt:', prompt);
      
      const frameworkName = frameworkId.toUpperCase();
      const enhancedPrompt = `As a ${frameworkName} compliance expert, provide detailed guidance for the following request: ${prompt}. 
      Focus on practical implementation, specific controls, and evidence collection requirements for a service organization.`;
      
      const response = await completeWithAI(enhancedPrompt, {
        model: 'gpt-4o-mini',
        temperature: 0.7,
        max_tokens: 2000
      });
      
      console.log('Generated AI response:', response);
      
      if (response?.content && response.content.trim().length > 50) {
        setAiResponse(response.content);
        toast.success('AI guidance generated successfully');
      } else {
        toast.warning('Received a very short or empty response');
        setAiResponse('No detailed guidance could be generated. Please try a more specific query.');
      }
    } catch (error) {
      console.error('Error generating AI guidance:', error);
      toast.error('Failed to generate AI guidance');
      setAiResponse(null);
    } finally {
      setIsGenerating(false);
    }
  };
  
  return {
    isGenerating,
    aiResponse,
    generateWithAI
  };
}
