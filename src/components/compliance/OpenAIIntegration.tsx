
import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/common/Card';
import { Bot, Loader2, Download } from 'lucide-react';
import Button from '@/components/common/Button';
import { toast } from 'sonner';
import { ScrollArea } from '@/components/ui/scroll-area';
import ReactMarkdown from 'react-markdown';
import AIGuidanceButton from './AIGuidanceButton';

interface OpenAIIntegrationProps {
  title?: string;
  description?: string;
  placeholder?: string;
}

const OpenAIIntegration: React.FC<OpenAIIntegrationProps> = ({
  title = "Ask AI Assistant",
  description = "Get AI guidance on compliance questions",
  placeholder = "Ask anything about compliance..."
}) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      toast.error("Please enter a question");
      return;
    }
    
    setIsLoading(true);
    setResponse("");
    
    try {
      const res = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to get AI response");
      }
      
      const data = await res.json();
      setResponse(data.response || "I couldn't generate a response. Please try again.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      toast.error("Failed to get AI response. Please try again.");
      
      // Fallback response for demo purposes
      setResponse(`Here's what I know about your question regarding "${prompt}":\n\n## Overview\nThis would be a comprehensive response to your compliance question.\n\n### Key Points\n- Important point 1 about compliance requirements\n- Important point 2 about implementation strategies\n- Important point 3 about documentation needs\n\n#### Next Steps\n1. First, review your current policies\n2. Then, identify gaps in your implementation\n3. Finally, develop an action plan to address deficiencies`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value);
    adjustTextareaHeight();
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
  };

  const handleDownloadResponse = () => {
    if (!response) return;
    
    const blob = new Blob([response], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-compliance-response-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Response downloaded');
  };

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start mb-4">
          <div className="bg-primary/10 p-2 rounded-full mr-3">
            <Bot className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-lg">{title}</h3>
            <p className="text-gray-500 text-sm">{description}</p>
          </div>
        </div>

        {response && (
          <div className="mb-5 bg-gray-50 rounded-lg border border-gray-200 p-4">
            <ScrollArea className="h-[300px] pr-4">
              <div className="prose prose-sm max-w-none">
                <ReactMarkdown components={{
                  p: ({node, className, ...props}) => <p className="mb-4" {...props} />
                }}>
                  {response}
                </ReactMarkdown>
              </div>
            </ScrollArea>
            <div className="flex justify-end mt-3 border-t pt-3">
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownloadResponse}
                leftIcon={<Download size={16} />}
              >
                Download Response
              </Button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={prompt}
              onChange={handleTextareaChange}
              onKeyDown={handleKeyDown}
              className="resize-none overflow-hidden w-full border border-gray-300 rounded-lg p-3 pr-[90px] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              placeholder={placeholder}
              rows={2}
            />
            <div className="absolute bottom-2 right-2">
              <div className="text-xs text-gray-400 mb-1 text-right">
                Press Ctrl+Enter to submit
              </div>
              <AIGuidanceButton
                onClick={handleSubmit}
                isLoading={isLoading}
                className="py-1 px-3 h-8"
              />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default OpenAIIntegration;
