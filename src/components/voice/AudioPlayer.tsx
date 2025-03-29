
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Download } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import voiceService, { UserVoicePreference } from '@/services/voiceService';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  onPlayStateChange?: (isPlaying: boolean) => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title, onPlayStateChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [preferences, setPreferences] = useState<UserVoicePreference | null>(null);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load user preferences
    const loadPreferences = async () => {
      const prefs = await voiceService.getUserVoicePreference();
      if (prefs) {
        setPreferences(prefs);
        setPlaybackRate(prefs.playback_speed);
      }
    };
    
    loadPreferences();
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Set initial volume and playback rate
    audio.volume = volume;
    audio.playbackRate = playbackRate;

    // Setup audio event listeners
    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handlePlaybackEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
      if (onPlayStateChange) onPlayStateChange(false);
    };

    audio.addEventListener('loadeddata', setAudioData);
    audio.addEventListener('timeupdate', setAudioTime);
    audio.addEventListener('ended', handlePlaybackEnded);

    // Auto-play if enabled in preferences
    if (preferences?.auto_play) {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          if (onPlayStateChange) onPlayStateChange(true);
        })
        .catch(error => console.error('Auto-play error:', error));
    }

    return () => {
      audio.removeEventListener('loadeddata', setAudioData);
      audio.removeEventListener('timeupdate', setAudioTime);
      audio.removeEventListener('ended', handlePlaybackEnded);
    };
  }, [audioUrl, preferences, volume, playbackRate, onPlayStateChange]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      if (onPlayStateChange) onPlayStateChange(false);
    } else {
      audio.play()
        .then(() => {
          setIsPlaying(true);
          if (onPlayStateChange) onPlayStateChange(true);
        })
        .catch(error => console.error('Play error:', error));
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (newValue: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;

    const newVolume = newValue[0];
    setVolume(newVolume);
    audio.volume = newVolume;
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    setPlaybackRate(rate);
    audio.playbackRate = rate;
    
    // Save the playback rate preference
    if (preferences) {
      voiceService.saveUserVoicePreference({
        ...preferences,
        playback_speed: rate
      });
    }
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
  };

  const handleProgressChange = (newValue: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const newTime = newValue[0];
    setCurrentTime(newTime);
    audio.currentTime = newTime;
  };

  const handleDownload = () => {
    // Create a temporary anchor element to trigger download
    const a = document.createElement('a');
    a.href = audioUrl;
    a.download = `${title.replace(/\s+/g, '_')}.mp3`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Format time in MM:SS
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return '00:00';
    
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full bg-card rounded-lg border shadow-sm p-4">
      <audio ref={audioRef} src={audioUrl} preload="metadata" />
      
      {/* Title and Download button */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium truncate max-w-[80%]">{title}</h3>
        <button 
          onClick={handleDownload} 
          className="p-1 hover:bg-accent rounded-full"
          title="Download audio"
        >
          <Download size={16} />
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="mb-3">
        <Slider 
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={0.1}
          onValueChange={handleProgressChange}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between mt-2 space-x-2">
        <div className="flex items-center space-x-1">
          <button 
            onClick={skipBackward} 
            className="p-1.5 hover:bg-accent rounded-full"
            title="Skip backward 10 seconds"
          >
            <SkipBack size={18} />
          </button>
          
          <button 
            onClick={togglePlay} 
            className="p-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          
          <button 
            onClick={skipForward}
            className="p-1.5 hover:bg-accent rounded-full"
            title="Skip forward 10 seconds"
          >
            <SkipForward size={18} />
          </button>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={toggleMute} 
            className="p-1 hover:bg-accent rounded-full"
          >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
          
          <Slider 
            value={[isMuted ? 0 : volume]}
            min={0}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-24 h-2"
          />
          
          <select 
            value={playbackRate}
            onChange={(e) => handlePlaybackRateChange(parseFloat(e.target.value))}
            className="text-xs bg-muted rounded p-1 border-none outline-none"
            title="Playback speed"
          >
            <option value="0.5">0.5x</option>
            <option value="0.75">0.75x</option>
            <option value="1">1x</option>
            <option value="1.25">1.25x</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
