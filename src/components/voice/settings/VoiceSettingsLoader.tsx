
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const VoiceSettingsLoader: React.FC = () => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceSettingsLoader;
