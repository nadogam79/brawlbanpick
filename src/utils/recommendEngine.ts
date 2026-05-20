import brawlers from '../data/brawlers.json';
import counters from '../data/counters.json';
import tiers from '../data/tiers.json';

type TierMap = Record<string, Record<string, string[]>>;
type CounterMap = Record<string, string[]>;

const tierData = tiers as TierMap;
const counterData = counters as CounterMap;

function tierScore(brawlerId: string, mode: string): number {
  const modeTiers = tierData[mode];
  if (!modeTiers) return 0;
  if (modeTiers.S?.includes(brawlerId)) return 4;
  if (modeTiers.A?.includes(brawlerId)) return 3;
  if (modeTiers.B?.includes(brawlerId)) return 2;
  if (modeTiers.C?.includes(brawlerId)) return 1;
  return 0;
}

function counterScore(brawlerId: string, enemyPicks: string[]): number {
  const countered = counterData[brawlerId] ?? [];
  return enemyPicks.filter((e) => countered.includes(e)).length;
}

export interface Recommendation {
  brawlerId: string;
  name: string;
  score: number;
  reason: string;
}

export function recommend(
  mode: string,
  bans: string[],
  myPicks: string[],
  enemyPicks: string[],
  topN = 5,
): Recommendation[] {
  const picked = new Set([...bans, ...myPicks, ...enemyPicks]);

  return brawlers
    .filter((b) => !picked.has(b.id))
    .map((b) => {
      const tier = tierScore(b.id, mode);
      const counter = counterScore(b.id, enemyPicks);
      const score = tier * 2 + counter * 3;
      const reason =
        counter > 0
          ? `상대 ${counter}명 카운터`
          : tier >= 3
          ? `${mode} 상위 티어`
          : '기본 추천';
      return { brawlerId: b.id, name: b.name, score, reason };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
}
