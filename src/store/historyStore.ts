import { create } from 'zustand';
import type { BanPickSession } from './sessionStore';

interface HistoryState {
  sessions: BanPickSession[];
  addSession: (session: BanPickSession) => void;
  clearHistory: () => void;
}

export const useHistoryStore = create<HistoryState>((set) => ({
  sessions: [],
  addSession: (session) =>
    set((state) => ({ sessions: [session, ...state.sessions].slice(0, 20) })),
  clearHistory: () => set({ sessions: [] }),
}));
