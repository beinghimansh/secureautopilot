
import React, { useState } from 'react';
import Button from './Button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const OpenAITest = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<null | { success: boolean; message: string; openai_response?: string; error?: string }>(null);

  const testOpenAI = async () => {
    setTesting(true);
    setResult(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('test-openai');
      
      if (error) {
        console.error('Edge Function Error:', error);
        toast.error('Error testing OpenAI: ' + error.message);
        setResult({ success: false, message: error.message });
        return;
      }
      
      if (!data) {
        throw new Error('No data returned from the edge function');
      }
      
      console.log('OpenAI test response:', data);
      setResult(data);
      
      if (data.success) {
        toast.success('OpenAI API is working correctly!');
      } else {
        toast.error('OpenAI API test failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      console.error('Error testing OpenAI:', err);
      toast.error('Failed to test OpenAI connection');
      setResult({ 
        success: false, 
        message: err instanceof Error ? err.message : 'Failed to send a request to the Edge Function' 
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">OpenAI API Connection Test</h2>
      <p className="text-gray-600 mb-4">
        Click the button below to test if your OpenAI API key is configured correctly.
      </p>
      
      <Button 
        onClick={testOpenAI} 
        isLoading={testing}
        disabled={testing}
      >
        {testing ? 'Testing...' : 'Test OpenAI Connection'}
      </Button>
      
      {result && (
        <div className={`mt-4 p-3 rounded ${result.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
          <h3 className={`font-medium ${result.success ? 'text-green-800' : 'text-red-800'}`}>
            {result.success ? 'Success!' : 'Error'}
          </h3>
          <p className="text-sm mt-1">
            {result.success ? result.message : (result.error || result.message)}
          </p>
          {result.openai_response && (
            <div className="mt-2 p-2 bg-gray-50 rounded border text-sm">
              <strong>OpenAI says:</strong> {result.openai_response}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OpenAITest;
