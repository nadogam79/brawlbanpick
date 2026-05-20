import { create } from 'zustand';

export type Team = 'blue' | 'red';

export interface BanPickSession {
  id: string;
  mode: string;
  bans: string[];
  picks: { brawlerId: string; team: Team }[];
  currentPhase: 'ban' | 'pick' | 'done';
  currentTeam: Team;
  banCount: number;
  pickCount: number;
}

interface SessionState {
  session: BanPickSession | null;
  startSession: (mode: string) => void;
  ban: (brawlerId: string) => void;
  pick: (brawlerId: string) => void;
  resetSession: () => void;
}

const BAN_ROUNDS = 6;
const PICK_ORDER: Team[] = ['blue', 'red', 'red', 'blue', 'blue', 'red'];

function createSession(mode: string): BanPickSession {
  return {
    id: Date.now().toString(),
    mode,
    bans: [],
    picks: [],
    currentPhase: 'ban',
    currentTeam: 'blue',
    banCount: 0,
    pickCount: 0,
  };
}

export const useSessionStore = create<SessionState>((set) => ({
  session: null,

  startSession: (mode) => set({ session: createSession(mode) }),

  ban: (brawlerId) =>
    set((state) => {
      if (!state.session || state.session.currentPhase !== 'ban') return state;
      const session = state.session;
      const bans = [...session.bans, brawlerId];
      const banCount = session.banCount + 1;
      const isDoneBanning = banCount >= BAN_ROUNDS;
      return {
        session: {
          ...session,
          bans,
          banCount,
          currentPhase: isDoneBanning ? 'pick' : 'ban',
          currentTeam: banCount % 2 === 0 ? 'blue' : 'red',
        },
      };
    }),

  pick: (brawlerId) =>
    set((state) => {
      if (!state.session || state.session.currentPhase !== 'pick') return state;
      const session = state.session;
      const picks = [...session.picks, { brawlerId, team: session.currentTeam }];
      const pickCount = session.pickCount + 1;
      const isDone = pickCount >= 6;
      const nextTeam = PICK_ORDER[pickCount] ?? 'blue';
      return {
        session: {
          ...session,
          picks,
          pickCount,
          currentPhase: isDone ? 'done' : 'pick',
          currentTeam: nextTeam,
        },
      };
    }),

  resetSession: () => set({ session: null }),
}));
