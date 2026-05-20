import { create } from 'zustand';

interface SettingsState {
  defaultMode: string;
  language: 'ko' | 'en';
  setDefaultMode: (mode: string) => void;
  setLanguage: (lang: 'ko' | 'en') => void;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  defaultMode: 'gem_grab',
  language: 'ko',
  setDefaultMode: (mode) => set({ defaultMode: mode }),
  setLanguage: (language) => set({ language }),
}));
