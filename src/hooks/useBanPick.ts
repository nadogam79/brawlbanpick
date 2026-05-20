import { useSessionStore } from '../store/sessionStore';

export function useBanPick() {
  const { session, ban, pick, resetSession } = useSessionStore();

  const bannedIds = new Set(session?.bans ?? []);
  const pickedIds = new Set(session?.picks.map((p) => p.brawlerId) ?? []);
  const unavailable = new Set([...bannedIds, ...pickedIds]);

  return {
    session,
    ban,
    pick,
    resetSession,
    bannedIds,
    pickedIds,
    unavailable,
    isMyTurn: (team: 'blue' | 'red') => session?.currentTeam === team,
  };
}
