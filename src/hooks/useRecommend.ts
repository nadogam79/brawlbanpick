import { useMemo } from 'react';
import { recommend } from '../utils/recommendEngine';
import type { BanPickSession, Team } from '../store/sessionStore';

export function useRecommend(session: BanPickSession | null, myTeam: Team) {
  return useMemo(() => {
    if (!session) return [];
    const myPicks = session.picks.filter((p) => p.team === myTeam).map((p) => p.brawlerId);
    const enemyTeam: Team = myTeam === 'blue' ? 'red' : 'blue';
    const enemyPicks = session.picks.filter((p) => p.team === enemyTeam).map((p) => p.brawlerId);
    return recommend(session.mode, session.bans, myPicks, enemyPicks);
  }, [session, myTeam]);
}
