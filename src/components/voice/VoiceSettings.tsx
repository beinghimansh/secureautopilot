
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import { UserVoicePreference } from '@/services/voice';
import VoiceSettingsLoader from './settings/VoiceSettingsLoader';
import VoiceSelector from './settings/VoiceSelector';
import PlaybackSpeedSelector from './settings/PlaybackSpeedSelector';
import AutoPlayToggle from './settings/AutoPlayToggle';
import useVoiceSettingsState from './settings/useVoiceSettingsState';

interface VoiceSettingsProps {
  onSettingsChange?: (preferences: UserVoicePreference) => void;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({ onSettingsChange }) => {
  const {
    preferences,
    loading,
    saving,
    testingVoice,
    testError,
    handleVoiceChange,
    handleSpeedChange,
    handleAutoPlayChange,
    handleSavePreferences,
    handleTestVoice
  } = useVoiceSettingsState({ onSettingsChange });

  if (loading) {
    return <VoiceSettingsLoader />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Voice Settings
        </CardTitle>
        <CardDescription>
          Customize your voice experience for compliance audio
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <VoiceSelector 
          selectedVoiceId={preferences.voice_id} 
          onVoiceChange={handleVoiceChange}
          onTestVoice={handleTestVoice}
          testingVoice={testingVoice}
          testError={testError}
        />
        
        <PlaybackSpeedSelector 
          playbackSpeed={preferences.playback_speed?.toString()} 
          onSpeedChange={handleSpeedChange} 
        />
        
        <AutoPlayToggle 
          autoPlay={preferences.auto_play || false} 
          onAutoPlayChange={handleAutoPlayChange} 
        />
        
        <Button 
          onClick={handleSavePreferences} 
          disabled={saving} 
          className="w-full"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default VoiceSettings;
