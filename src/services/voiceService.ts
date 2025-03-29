
// This file is maintained for backward compatibility
// New code should import from the modular services directly

import voiceService, { 
  availableVoices,
  VoiceSummary,
  VoiceTrainingSession,
  UserVoicePreference,
  ElevenLabsVoice
} from './voice';

export { 
  availableVoices,
  VoiceSummary,
  VoiceTrainingSession,
  UserVoicePreference,
  ElevenLabsVoice
};

export default voiceService;
