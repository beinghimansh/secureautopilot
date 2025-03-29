
import React, { useState } from 'react';
import { Bot, Loader2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';

interface OpenAITestProps {
  title?: string;
  description?: string;
}

const OpenAITest: React.FC<OpenAITestProps> = ({ 
  title = "AI Integration Test", 
  description = "Test the OpenAI integration"
}) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/openai/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }
      
      const data = await res.json();
      setResponse(data.result || 'No response received');
    } catch (err: any) {
      console.error('Error testing OpenAI:', err);
      setError(err.message || 'Failed to connect to OpenAI');
    } finally {
      setIsLoading(false);
    }
  };

  // Try to parse the response if it's in JSON format to extract just the content
  const formatResponse = (responseText: string) => {
    try {
      // Check if response looks like JSON
      if (responseText.trim().startsWith('{') && responseText.trim().endsWith('}')) {
        const parsedResponse = JSON.parse(responseText);
        
        // Handle different response structures
        if (parsedResponse.choices && parsedResponse.choices[0]?.message?.content) {
          return parsedResponse.choices[0].message.content;
        } else if (parsedResponse.message?.content) {
          return parsedResponse.message.content;
        } else if (parsedResponse.content) {
          return parsedResponse.content;
        }
      }
    } catch (e) {
      // If parsing fails, return the original response
      console.log('Response is not valid JSON, using as-is');
    }
    return responseText;
  };

  const handleCopyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(response);
      toast.success('Response copied to clipboard');
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <div className="flex items-center mb-4">
        <Bot className="text-blue-500 mr-2 h-5 w-5" />
        <h3 className="font-medium text-lg">{title}</h3>
      </div>
      
      <p className="text-gray-600 mb-4">{description}</p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-1">
            Prompt
          </label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a test prompt for OpenAI..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : 'Test OpenAI Integration'}
        </Button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      {response && !error && (
        <div className="mt-4">
          <h4 className="font-medium text-sm text-gray-700 mb-2">Response:</h4>
          <div className="flex justify-end mb-2">
            <Button 
              variant="outline"
              size="sm"
              onClick={handleCopyResponse}
              className="text-blue-600 border-blue-200"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
          </div>
          <ScrollArea className="border border-gray-200 rounded-md h-[200px]">
            <div className="p-3 bg-gray-50 text-sm whitespace-pre-wrap">
              {formatResponse(response)}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
};

export default OpenAITest;
