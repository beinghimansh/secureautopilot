
import React from 'react';
import { 
  Bot, // Changed from Robot to Bot
  Loader2 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import AIGuidanceButton from './AIGuidanceButton'; // Fixed import

interface OpenAIIntegrationProps {
  onGenerateContent?: (prompt: string) => Promise<void>;
  isLoading?: boolean;
  placeholder?: string;
}

const OpenAIIntegration: React.FC<OpenAIIntegrationProps> = ({
  onGenerateContent,
  isLoading = false,
  placeholder = "Ask AI for guidance..."
}) => {
  const [prompt, setPrompt] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || !onGenerateContent) return;
    
    await onGenerateContent(prompt);
    setPrompt('');
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
      <div className="flex items-center mb-3">
        <Bot className="text-blue-600 mr-2 h-5 w-5" />
        <h3 className="font-medium text-blue-700">AI Assistance</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          disabled={isLoading || !prompt.trim()}
          variant="default"
          size="sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : 'Generate'}
        </Button>
      </form>
      
      <div className="mt-3 flex flex-wrap gap-2">
        <AIGuidanceButton prompt="How do I implement this control?" onClick={setPrompt} />
        <AIGuidanceButton prompt="What evidence is required?" onClick={setPrompt} />
        <AIGuidanceButton prompt="Generate implementation guidelines" onClick={setPrompt} />
      </div>
    </div>
  );
};

export default OpenAIIntegration;
