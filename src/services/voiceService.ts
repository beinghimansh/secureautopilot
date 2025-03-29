
// This file is maintained for backward compatibility
// New code should import from the modular services directly

import voiceService, { 
  availableVoices,
} from './voice';

// Use 'export type' for type exports when isolatedModules is enabled
export type { 
  VoiceSummary,
  VoiceTrainingSession,
  UserVoicePreference,
  ElevenLabsVoice
} from './voice';

export { 
  availableVoices,
};

export default voiceService;
