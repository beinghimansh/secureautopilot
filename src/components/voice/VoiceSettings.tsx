
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Volume2, Settings } from 'lucide-react';
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
  }, []);

  const handleVoiceChange = (voiceId: string) => {
    setPreferences(prev => ({ 
      ...prev, 
      voice_id: voiceId,
      preferred_voice_id: voiceId 
    }));
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
    
    const voiceId = preferences.voice_id || preferences.preferred_voice_id;
    const voiceName = voiceService.getVoiceNameById(voiceId!);
    const testText = `This is a test of the ${voiceName} voice. Your current playback speed is set to ${preferences.playback_speed}x.`;
    
    try {
      console.log(`Testing voice with ID: ${voiceId}, text: ${testText}`);
      const result = await voiceService.generateSpeech(testText, voiceId!);
      
      if (result.success && result.audioUrl) {
        const audio = new Audio(result.audioUrl);
        if (preferences.playback_speed) {
          audio.playbackRate = preferences.playback_speed;
        }
        audio.play();
        toast.success('Test voice played successfully');
      } else {
        console.error('Speech generation failed:', result.error);
        toast.error(`Failed to generate test speech: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error testing voice:', error);
      toast.error('Failed to test voice');
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
            <SelectContent>
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
          >
            <Volume2 className="mr-2 h-4 w-4" />
            Test Voice
          </Button>
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
            <SelectContent>
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
