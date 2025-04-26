export type Platform = 'Instagram' | 'Twitter' | 'LinkedIn' | 'Facebook' | 'YouTube';

export interface PlatformDetails {
  name: Platform;
  icon: string;
  color: string;
  maxLength?: number;
  description: string;
}

export interface CaptionResponse {
  caption: string;
  error?: string;
}

export interface GeneratorState {
  loading: boolean;
  caption: string;
  error: string | null;
  history: HistoryItem[];
}

export interface HistoryItem {
  id: string;
  platform: Platform;
  context: string;
  caption: string;
  timestamp: number;
}