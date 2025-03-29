
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { completeWithAI } from '@/services/openaiService';
import { toast } from 'sonner';
import { Loader2, RefreshCw, Copy, Check } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [copied, setCopied] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  const handleGenerateResponse = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a question or prompt');
      return;
    }

    setIsLoading(true);
    try {
      const result = await completeWithAI(prompt);
      setResponse(result.choices[0].message.content);
      
      // Wait for response to be set then scroll to it
      setTimeout(() => {
        responseRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to generate response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!response) return;
    
    navigator.clipboard.writeText(response)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.success('Response copied to clipboard');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast.error('Failed to copy text');
      });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Ctrl+Enter or Cmd+Enter
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleGenerateResponse();
    }
  };

  return (
    <Card className="w-full shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder={placeholder}
          className="min-h-[120px] resize-y"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        {response && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-gray-50 rounded-md border"
            ref={responseRef}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">AI Response:</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleCopyToClipboard}
                className="h-8 px-2"
              >
                {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
          </motion.div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Press Ctrl+Enter to submit
        </div>
        <Button 
          onClick={handleGenerateResponse} 
          disabled={isLoading || !prompt.trim()} 
          className="ml-auto"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="mr-2 h-4 w-4" />
              Get AI Guidance
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OpenAIIntegration;
