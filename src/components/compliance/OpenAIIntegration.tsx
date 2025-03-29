
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/common/Card';
import Button from '@/components/common/Button';
import { Robot, Send, Loader, AlertCircle, CheckCircle, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { AIGuidanceButton } from './AIGuidanceButton';
import ReactMarkdown from 'react-markdown';

interface OpenAIIntegrationProps {
  frameworkId: string;
  promptContext?: string;
  initialPrompt?: string;
  isEmbedded?: boolean;
  headingText?: string;
}

const OpenAIIntegration: React.FC<OpenAIIntegrationProps> = ({
  frameworkId,
  promptContext = '',
  initialPrompt = '',
  isEmbedded = false,
  headingText = 'AI Compliance Assistant'
}) => {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(!isEmbedded);
  const [copySuccess, setCopySuccess] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [response]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Define a function to handle the API call directly
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError(null);
    
    try {
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('test-openai', {
        body: {
          prompt: `${promptContext ? promptContext + '\n\n' : ''}${prompt}`,
          model: 'gpt-4o-mini',
          temperature: 0.7
        }
      });

      if (error) {
        throw new Error(`Error calling OpenAI API: ${error.message}`);
      }

      if (data?.text) {
        setResponse(data.text);
      } else {
        throw new Error('No response from AI');
      }
    } catch (err: any) {
      console.error('OpenAI request failed:', err);
      setError(err.message || 'Failed to get response from AI');
      toast.error('Failed to get AI guidance');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenAIClicked = () => {
    setIsOpen(true);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(response).then(
      function() {
        setCopySuccess(true);
        toast.success('Response copied to clipboard');
        
        // Reset copy success after 2 seconds
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      },
      function(err) {
        console.error('Could not copy text: ', err);
        toast.error('Failed to copy to clipboard');
      }
    );
  };

  if (!isOpen && isEmbedded) {
    return (
      <AIGuidanceButton onClick={handleOpenAIClicked} className="w-full" />
    );
  }

  return (
    <Card className={`${isEmbedded ? 'border border-blue-200 shadow-md' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-center mb-4">
          <Robot className="text-blue-600 mr-2" size={20} />
          <h3 className="text-lg font-medium">{headingText}</h3>
        </div>
        
        {response && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-gray-800 relative"
          >
            <div className="prose prose-sm max-w-none overflow-auto">
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
            <button 
              onClick={handleCopyToClipboard}
              className="absolute top-2 right-2 p-1 text-gray-500 hover:text-gray-700 bg-white rounded-md border border-gray-200 hover:border-gray-300 transition-colors"
              aria-label="Copy to clipboard"
            >
              {copySuccess ? (
                <CheckCircle size={16} className="text-green-600" />
              ) : (
                <Copy size={16} />
              )}
            </button>
            <div ref={messagesEndRef} />
          </motion.div>
        )}
        
        {error && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-start"
          >
            <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <p className="text-sm">{error}</p>
          </motion.div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-3">
          <textarea
            rows={3}
            placeholder="Ask about compliance requirements, get implementation guidance, or request policy templates..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={isLoading}
          />
          
          <div className="flex justify-end">
            <Button 
              type="submit"
              disabled={isLoading || !prompt.trim()} 
              isLoading={isLoading}
              leftIcon={isLoading ? <Loader className="animate-spin" size={16} /> : <Send size={16} />}
            >
              {isLoading ? 'Getting Response...' : 'Send'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OpenAIIntegration;
