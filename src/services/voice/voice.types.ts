
export interface VoiceSummary {
  id: string;
  organization_id: string;
  policy_id?: string;
  framework_id?: string;
  title: string;
  summary_text: string;
  audio_url?: string;
  voice_id: string;
  duration?: number;
  created_at: string;
  updated_at: string;
  is_featured: boolean;
  language: string;
}

export interface VoiceTrainingSession {
  id: string;
  organization_id: string;
  title: string;
  description?: string;
  content: string;
  audio_url?: string;
  voice_id: string;
  duration?: number;
  created_at: string;
  updated_at: string;
  category: string;
  is_featured: boolean;
  language: string;
}

export interface UserVoicePreference {
  id: string;
  user_id: string;
  voice_id: string;
  playback_speed: number;
  auto_play: boolean;
  language: string;
  created_at: string;
  updated_at: string;
}

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category?: string;
}

export const availableVoices: ElevenLabsVoice[] = [
  { voice_id: "9BWtsMINqrJLrRacOk9x", name: "Aria", category: "Professional" },
  { voice_id: "CwhRBWXzGAHq8TQ4Fs17", name: "Roger", category: "Professional" },
  { voice_id: "EXAVITQu4vr4xnSDxMaL", name: "Sarah", category: "Professional" },
  { voice_id: "FGY2WhTYpPnrIDTdsKH5", name: "Laura", category: "Professional" },
  { voice_id: "IKne3meq5aSn9XLyUdCD", name: "Charlie", category: "Professional" },
  { voice_id: "JBFqnCBsd6RMkjVDRZzb", name: "George", category: "Professional" },
  { voice_id: "N2lVS1w4EtoT3dr4eOWO", name: "Callum", category: "Professional" },
  { voice_id: "SAz9YHcvj6GT2YYXdXww", name: "River", category: "Professional" },
  { voice_id: "TX3LPaxmHKxFdv7VOQHJ", name: "Liam", category: "Professional" },
  { voice_id: "XB0fDUnXU5powFXDhCwa", name: "Charlotte", category: "Professional" }
];
