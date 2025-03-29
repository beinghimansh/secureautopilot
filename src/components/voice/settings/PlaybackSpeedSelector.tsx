
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PlaybackSpeedSelectorProps {
  playbackSpeed: string | undefined;
  onSpeedChange: (speed: string) => void;
}

const PlaybackSpeedSelector: React.FC<PlaybackSpeedSelectorProps> = ({
  playbackSpeed,
  onSpeedChange,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="speed-select">Default Playback Speed</Label>
      <Select 
        value={playbackSpeed?.toString()} 
        onValueChange={onSpeedChange}
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
  );
};

export default PlaybackSpeedSelector;
