import { useMemo } from 'react';
import tiers from '../data/tiers.json';
import brawlers from '../data/brawlers.json';

type TierMap = Record<string, Record<string, string[]>>;
const tierData = tiers as TierMap;

export interface TierEntry {
  brawlerId: string;
  name: string;
  tier: string;
}

export function useTierList(mode: string): Record<string, TierEntry[]> {
  return useMemo(() => {
    const modeTiers = tierData[mode] ?? {};
    const result: Record<string, TierEntry[]> = {};
    for (const [tier, ids] of Object.entries(modeTiers)) {
      result[tier] = ids.map((id) => {
        const b = brawlers.find((b) => b.id === id);
        return { brawlerId: id, name: b?.name ?? id, tier };
      });
    }
    return result;
  }, [mode]);
}
