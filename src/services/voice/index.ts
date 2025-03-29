
import { availableVoices } from './voice.types';
import voicePreferencesService from './voice-preferences.service';
import voiceSummariesService from './voice-summaries.service';
import voiceTrainingService from './voice-training.service';
import speechSynthesisService from './speech-synthesis.service';

export * from './voice.types';

// Combine all services into one for backward compatibility
const voiceService = {
  // Re-export from voice preferences service
  getUserVoicePreference: voicePreferencesService.getUserVoicePreference,
  saveUserVoicePreference: voicePreferencesService.saveUserVoicePreference,
  getVoiceById: voicePreferencesService.getVoiceById,
  getVoiceNameById: voicePreferencesService.getVoiceNameById,
  
  // Re-export from voice summaries service
  getVoiceSummaries: voiceSummariesService.getVoiceSummaries,
  createVoiceSummary: voiceSummariesService.createVoiceSummary,
  
  // Re-export from voice training service
  getTrainingSessions: voiceTrainingService.getTrainingSessions,
  createTrainingSession: voiceTrainingService.createTrainingSession,
  
  // Re-export from speech synthesis service
  generateSpeech: speechSynthesisService.generateSpeech,
};

export default voiceService;
export { availableVoices };
