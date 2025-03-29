
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { completeWithAI } from '@/services/openaiService';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

interface OpenAIIntegrationProps {
  placeholder?: string;
  title?: string;
  description?: string;
}

const OpenAIIntegration = ({
  placeholder = "Enter your compliance question here...",
  title = "Ask AI Assistant",
  description = "Get instant compliance guidance from our AI assistant"
}: OpenAIIntegrationProps) => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateResponse = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a question or prompt');
      return;
    }

    setIsLoading(true);
    try {
      const result = await completeWithAI(prompt);
      setResponse(result.choices[0].message.content);
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={placeholder}
          className="min-h-[120px]"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        
        {response && (
          <div className="p-4 bg-gray-50 rounded-md border">
            <h3 className="text-sm font-medium mb-2">AI Response:</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={handleGenerateResponse} 
          disabled={isLoading} 
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : 'Get AI Guidance'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpenAIIntegration;
