
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Volume2, Settings, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import voiceService, { availableVoices, UserVoicePreference } from '@/services/voice';

interface VoiceSettingsProps {
  onSettingsChange?: (preferences: UserVoicePreference) => void;
}

const VoiceSettings: React.FC<VoiceSettingsProps> = ({ onSettingsChange }) => {
  const [preferences, setPreferences] = useState<Partial<UserVoicePreference>>({
    voice_id: availableVoices[0].voice_id,
    playback_speed: 1.0,
    auto_play: false,
    language: 'en'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testingVoice, setTestingVoice] = useState(false);
  const [audioInstance, setAudioInstance] = useState<HTMLAudioElement | null>(null);
  const [testError, setTestError] = useState<string | null>(null);

  useEffect(() => {
    const loadPreferences = async () => {
      setLoading(true);
      const userPrefs = await voiceService.getUserVoicePreference();
      
      if (userPrefs) {
        setPreferences({
          ...userPrefs,
          voice_id: userPrefs.voice_id || userPrefs.preferred_voice_id,
          playback_speed: userPrefs.playback_speed,
          auto_play: userPrefs.auto_play,
          language: userPrefs.language || 'en'
        });
      }
      
      setLoading(false);
    };
    
    loadPreferences();

    // Cleanup audio instances on unmount
    return () => {
      if (audioInstance) {
        audioInstance.pause();
        audioInstance.src = '';
      }
    };
  }, []);

  const handleVoiceChange = (voiceId: string) => {
    setPreferences(prev => ({ 
      ...prev, 
      voice_id: voiceId,
      preferred_voice_id: voiceId 
    }));
    setTestError(null);
  };

  const handleSpeedChange = (speed: string) => {
    setPreferences(prev => ({ ...prev, playback_speed: parseFloat(speed) }));
  };

  const handleAutoPlayChange = (checked: boolean) => {
    setPreferences(prev => ({ ...prev, auto_play: checked }));
  };

  const handleSavePreferences = async () => {
    setSaving(true);
    
    try {
      console.log('Saving voice preferences:', preferences);
      const result = await voiceService.saveUserVoicePreference({
        ...preferences,
        preferred_voice_id: preferences.voice_id || preferences.preferred_voice_id
      });
      
      if (result && onSettingsChange) {
        onSettingsChange(result);
      }
      toast.success('Voice preferences saved successfully');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save voice preferences');
    } finally {
      setSaving(false);
    }
  };

  const handleTestVoice = async () => {
    if (!preferences.voice_id && !preferences.preferred_voice_id) {
      toast.error('Please select a voice first');
      return;
    }
    
    if (audioInstance) {
      audioInstance.pause();
      audioInstance.src = '';
    }
    
    setTestError(null);
    setTestingVoice(true);
    
    try {
      const voiceId = preferences.voice_id || preferences.preferred_voice_id;
      const voiceName = voiceService.getVoiceNameById(voiceId!);
      const testText = `This is a test of the ${voiceName} voice. Your current playback speed is set to ${preferences.playback_speed}x.`;
      
      console.log(`Testing voice with ID: ${voiceId}, language: ${preferences.language || 'en'}, text: ${testText}`);
      const result = await voiceService.generateSpeech(testText, voiceId!, undefined, preferences.language);
      
      if (result.success && result.audioUrl) {
        const audio = new Audio(result.audioUrl);
        if (preferences.playback_speed) {
          audio.playbackRate = preferences.playback_speed;
        }
        
        setAudioInstance(audio);
        
        audio.onended = () => {
          setTestingVoice(false);
        };
        
        audio.onerror = (e) => {
          console.error('Audio playback error:', e);
          setTestError('Error playing audio');
          setTestingVoice(false);
        };
        
        audio.play().catch(error => {
          console.error('Failed to play audio:', error);
          setTestError('Failed to play audio');
          setTestingVoice(false);
        });
        
        toast.success('Test voice played successfully');
      } else {
        console.error('Speech generation failed:', result.error);
        setTestError(result.error || 'Unknown error');
        toast.error(`Failed to generate test speech: ${result.error || 'Unknown error'}`);
        setTestingVoice(false);
      }
    } catch (error) {
      console.error('Error testing voice:', error);
      setTestError(error.message || 'Unknown error');
      toast.error(`Failed to test voice: ${error.message || 'Unknown error'}`);
      setTestingVoice(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </CardContent>
      </Card>
    );
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
        <div className="space-y-2">
          <Label htmlFor="voice-select">Preferred Voice</Label>
          <Select 
            value={preferences.voice_id} 
            onValueChange={handleVoiceChange}
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
            onClick={handleTestVoice}
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
        
        <div className="space-y-2">
          <Label htmlFor="speed-select">Default Playback Speed</Label>
          <Select 
            value={preferences.playback_speed?.toString()} 
            onValueChange={handleSpeedChange}
          >
            <SelectTrigger id="speed-select">
              <SelectValue placeholder="Select speed" />
            </SelectTrigger>
            <SelectContent className="bg-white z-50">
              <SelectItem value="0.5">0.5x (Slow)</SelectItem>
              <SelectItem value="0.75">0.75x</SelectItem>
              <SelectItem value="1">1x (Normal)</SelectItem>
              <SelectItem value="1.25">1.25x</SelectItem>
              <SelectItem value="1.5">1.5x (Fast)</SelectItem>
              <SelectItem value="2">2x (Very Fast)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label htmlFor="auto-play">Auto-Play Audio</Label>
            <p className="text-sm text-muted-foreground">
              Automatically play audio when available
            </p>
          </div>
          <Switch 
            id="auto-play" 
            checked={preferences.auto_play} 
            onCheckedChange={handleAutoPlayChange} 
          />
        </div>
        
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
