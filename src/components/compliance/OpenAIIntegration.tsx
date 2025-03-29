
import React, { useState } from 'react';
import { 
  Bot,
  Loader2,
  Zap,
  Copy,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface OpenAIIntegrationProps {
  onGenerateContent?: (prompt: string) => Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
  promptContext?: string;
  initialPrompt?: string;
  headingText?: string;
  frameworkId?: string;
  aiResponse?: string | null;
}

const OpenAIIntegration: React.FC<OpenAIIntegrationProps> = ({
  onGenerateContent,
  isLoading = false,
  placeholder = "Ask AI for guidance...",
  promptContext,
  initialPrompt,
  headingText = "AI Assistance",
  frameworkId,
  aiResponse
}) => {
  const [prompt, setPrompt] = useState(initialPrompt || '');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !onGenerateContent) return;
    
    try {
      setError(null);
      await onGenerateContent(prompt);
    } catch (err: any) {
      console.error('Error generating AI content:', err);
      setError(err.message || 'Failed to generate AI response');
      toast.error('Failed to generate guidance');
    }
  };

  const handleCopyResponse = () => {
    if (aiResponse) {
      navigator.clipboard.writeText(aiResponse);
      toast.success('Response copied to clipboard');
    }
  };

  return (
    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Bot className="text-blue-600 mr-2 h-5 w-5" />
        <h3 className="font-medium text-blue-700">{headingText}</h3>
      </div>
      
      {aiResponse ? (
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-md border border-blue-200 text-sm text-gray-700 whitespace-pre-wrap">
            {aiResponse}
          </div>
          <div className="flex justify-between">
            <Button 
              variant="outline"
              size="sm"
              onClick={() => setPrompt('')}
              className="text-blue-600 border-blue-200"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Ask another question
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={handleCopyResponse}
              className="text-blue-600 border-blue-200"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy response
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[180px] resize-y"
            disabled={isLoading}
          />
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
              {error}
            </div>
          )}
          
          <div className="flex justify-end">
            <Button 
              type="submit" 
              disabled={isLoading || !prompt.trim()}
              variant="default"
              size="default"
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </form>
      )}
      
      {!aiResponse && (
        <div className="mt-4 flex flex-wrap gap-2">
          <AIGuidanceButton 
            text="How do I implement SOC 2 controls?" 
            onClick={(text) => setPrompt(text)} 
          />
          <AIGuidanceButton 
            text="What evidence is required for SOC 2?" 
            onClick={(text) => setPrompt(text)} 
          />
          <AIGuidanceButton 
            text="Generate implementation guidelines" 
            onClick={(text) => setPrompt(text)} 
          />
        </div>
      )}
    </div>
  );
};

interface AIGuidanceButtonProps {
  text: string;
  onClick: (text: string) => void;
}

const AIGuidanceButton: React.FC<AIGuidanceButtonProps> = ({ text, onClick }) => {
  return (
    <button
      type="button"
      onClick={() => onClick(text)}
      className="px-3 py-1 bg-white border border-blue-200 rounded-full text-xs text-blue-600 hover:bg-blue-50 transition-colors"
    >
      {text}
    </button>
  );
};

export default OpenAIIntegration;
