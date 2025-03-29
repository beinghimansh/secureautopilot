
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import voiceService, { availableVoices, UserVoicePreference } from '@/services/voice';

interface UseVoiceSettingsStateProps {
  onSettingsChange?: (preferences: UserVoicePreference) => void;
}

const useVoiceSettingsState = ({ onSettingsChange }: UseVoiceSettingsStateProps) => {
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

  return {
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
  };
};

export default useVoiceSettingsState;
