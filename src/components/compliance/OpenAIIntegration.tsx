
import React from 'react';
import { 
  Bot,
  Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !onGenerateContent) return;
    
    await onGenerateContent(prompt);
    setPrompt('');
  };

  return (
    <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 mb-6 shadow-sm">
      <div className="flex items-center mb-4">
        <Bot className="text-blue-600 mr-2 h-5 w-5" />
        <h3 className="font-medium text-blue-700">{headingText}</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[150px] resize-y"
          disabled={isLoading}
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isLoading || !prompt.trim()}
            variant="default"
            size="sm"
            className="w-full md:w-auto"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : 'Generate'}
          </Button>
        </div>
      </form>
      
      <div className="mt-4 flex flex-wrap gap-2">
        <AIGuidanceButton text="How do I implement this control?" onClick={(text) => setPrompt(text)} />
        <AIGuidanceButton text="What evidence is required?" onClick={(text) => setPrompt(text)} />
        <AIGuidanceButton text="Generate implementation guidelines" onClick={(text) => setPrompt(text)} />
      </div>
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
