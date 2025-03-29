
import React from 'react';
import { 
  Bot,
  Loader2,
  Zap
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
}

const OpenAIIntegration: React.FC<OpenAIIntegrationProps> = ({
  onGenerateContent,
  isLoading = false,
  placeholder = "Ask AI for guidance...",
  promptContext,
  initialPrompt,
  headingText = "AI Assistance"
}) => {
  const [prompt, setPrompt] = React.useState(initialPrompt || '');
  const [response, setResponse] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !onGenerateContent) return;
    
    try {
      setError(null);
      setResponse(null);
      
      // Call the API
      await onGenerateContent(prompt);
      
      // For demonstration, we'll simulate a response from the API
      // In a real implementation, the onGenerateContent would return the response
      const simulatedResponse = `Here's guidance related to your question: "${prompt}"\n\nThis framework requires careful implementation of controls and evidence collection. To properly address your specific question, I recommend focusing on documentation and implementation guidelines for the specific control area mentioned.`;
      
      setResponse(simulatedResponse);
      toast.success('AI guidance generated');
    } catch (err: any) {
      console.error('Error generating AI content:', err);
      setError(err.message || 'Failed to generate AI response');
      toast.error('Failed to generate guidance');
    }
  };

  const handleClearResponse = () => {
    setResponse(null);
  };

  return (
    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Bot className="text-blue-600 mr-2 h-5 w-5" />
        <h3 className="font-medium text-blue-700">{headingText}</h3>
      </div>
      
      {response ? (
        <div className="space-y-3">
          <div className="bg-white p-4 rounded-md border border-blue-200 text-sm text-gray-700 whitespace-pre-wrap">
            {response}
          </div>
          <div className="flex justify-between">
            <Button 
              variant="outline"
              size="sm"
              onClick={handleClearResponse}
              className="text-blue-600 border-blue-200"
            >
              Ask another question
            </Button>
            <Button 
              variant="outline"
              size="sm"
              onClick={() => {
                // Copy response to clipboard
                navigator.clipboard.writeText(response);
                toast.success('Copied to clipboard');
              }}
              className="text-blue-600 border-blue-200"
            >
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
      
      {!response && (
        <div className="mt-4 flex flex-wrap gap-2">
          <AIGuidanceButton text="How do I implement this control?" onClick={(text) => setPrompt(text)} />
          <AIGuidanceButton text="What evidence is required?" onClick={(text) => setPrompt(text)} />
          <AIGuidanceButton text="Generate implementation guidelines" onClick={(text) => setPrompt(text)} />
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
