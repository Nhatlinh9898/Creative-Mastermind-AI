
export enum Domain {
  TECH = 'Công nghệ (Tech)',
  CREATIVE = 'Sáng tạo (Creative)',
  MUSIC = 'Âm nhạc (Music)',
  CINEMA = 'Điện ảnh (Cinema)'
}

export type Topic = string;

export interface AppState {
  domain: Domain;
  topic: Topic;
  targetAudience: string;
  tone: string;
  additionalDetails: string;
  // Options for scripts
  musicStyle?: string;
  aestheticStyle?: string;
  settingStyle?: string;
  voiceStyle?: string;
  characterAbilities?: string;
  scriptGenre?: string;
}

export interface GeneratedContent {
  text: string;
  audioUrl?: string;
}
