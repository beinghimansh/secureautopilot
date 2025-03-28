
import React, { useState } from 'react';
import Button from './Button';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

const OpenAITest = () => {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<null | { success: boolean; message: string; models?: string[]; error?: string }>(null);

  const testOpenAI = async () => {
    setTesting(true);
    setResult(null);
    
    try {
      console.log("Sending test request to OpenAI edge function");
      
      // Add a timeout to the fetch request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
      
      const { data, error } = await supabase.functions.invoke('test-openai', {
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
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
    } catch (err: any) {
      console.error('Error testing OpenAI:', err);
      
      let errorMessage = 'Failed to test OpenAI connection';
      if (err.name === 'AbortError') {
        errorMessage = 'Request timed out. The Supabase Edge Function may be cold starting, please try again.';
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      toast.error(errorMessage);
      setResult({ 
        success: false, 
        message: errorMessage
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
          {result.models && (
            <div className="mt-2 p-2 bg-gray-50 rounded border text-sm">
              <strong>Available models:</strong> {result.models.join(', ')}
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-500">
        <p>If the test fails, please check:</p>
        <ul className="list-disc pl-5 mt-2 space-y-1">
          <li>Your OpenAI API key is correctly set in Supabase Edge Function secrets</li>
          <li>The API key has sufficient permissions and credits</li>
          <li>The Edge Function is properly deployed</li>
        </ul>
      </div>
    </div>
  );
};

export default OpenAITest;
