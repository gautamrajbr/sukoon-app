import { create } from 'zustand';

interface AppState {
  user: any;
  language: 'en' | 'hi' | 'ta';
  moodLogs: any[];
  setUser: (user: any) => void;
  setLanguage: (lang: 'en' | 'hi' | 'ta') => void;
  addMoodLog: (log: any) => void;
}

export const useAppStore = create<AppState>((set) => ({
  user: null,
  language: 'en',
  moodLogs: [],
  setUser: (user) => set({ user }),
  setLanguage: (language) => set({ language }),
  addMoodLog: (log) => set((state) => ({ moodLogs: [...state.moodLogs, log] })),
}));
