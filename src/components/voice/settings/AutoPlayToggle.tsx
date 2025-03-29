
import React from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface AutoPlayToggleProps {
  autoPlay: boolean;
  onAutoPlayChange: (checked: boolean) => void;
}

const AutoPlayToggle: React.FC<AutoPlayToggleProps> = ({
  autoPlay,
  onAutoPlayChange,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="auto-play">Auto-Play Audio</Label>
        <p className="text-sm text-muted-foreground">
          Automatically play audio when available
        </p>
      </div>
      <Switch 
        id="auto-play" 
        checked={autoPlay} 
        onCheckedChange={onAutoPlayChange} 
      />
    </div>
  );
};

export default AutoPlayToggle;
