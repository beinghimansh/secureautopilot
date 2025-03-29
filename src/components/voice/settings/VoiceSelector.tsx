
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Volume2, Loader2, AlertCircle } from 'lucide-react';
import { availableVoices } from '@/services/voice/voice.types';

interface VoiceSelectorProps {
  selectedVoiceId: string | undefined;
  onVoiceChange: (voiceId: string) => void;
  onTestVoice: () => void;
  testingVoice: boolean;
  testError: string | null;
}

const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedVoiceId,
  onVoiceChange,
  onTestVoice,
  testingVoice,
  testError,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="voice-select">Preferred Voice</Label>
      <Select 
        value={selectedVoiceId} 
        onValueChange={onVoiceChange}
      >
        <SelectTrigger id="voice-select">
          <SelectValue placeholder="Select a voice" />
        </SelectTrigger>
        <SelectContent className="bg-white z-50 max-h-72">
          {availableVoices.map(voice => (
            <SelectItem key={voice.voice_id} value={voice.voice_id}>
              {voice.name} {voice.category ? `(${voice.category})` : ''}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button 
        variant="outline" 
        size="sm" 
        className="mt-2"
        onClick={onTestVoice}
        disabled={testingVoice}
      >
        {testingVoice ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Testing...
          </>
        ) : (
          <>
            <Volume2 className="mr-2 h-4 w-4" />
            Test Voice
          </>
        )}
      </Button>

      {testError && (
        <div className="mt-2 p-2 bg-red-50 text-red-600 text-sm rounded flex items-start">
          <AlertCircle className="h-4 w-4 mr-1 mt-0.5 flex-shrink-0" />
          <span>{testError}</span>
        </div>
      )}
    </div>
  );
};

export default VoiceSelector;
