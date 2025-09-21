export interface AudioInfo {
  id: string;
  title: string;
  voice: string | null;
  audioUrl: string;
  duration?: string;
  progress?: number;
  createdAt?: string;
  service?: string;
}

export interface AudioState {
  currentAudio: AudioInfo | null;
  isPlaying: boolean;
  isPlaybarOpen: boolean;
  progress: number;
  duration: string;
  setCurrentAudio: (audio: AudioInfo) => void;
  setIsPlaying: (isPlaying: boolean) => void;
  setIsPlaybarOpen: (isOpen: boolean) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: string) => void;
  playAudio: (audio: AudioInfo) => void;
  togglePlayPause: () => void;
  togglePlaybar: () => void;
  skipForward: () => void;
  skipBackward: () => void;
  downloadAudio: () => void;
}
