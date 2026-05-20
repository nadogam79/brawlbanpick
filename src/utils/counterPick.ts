import counters from '../data/counters.json';
import brawlers from '../data/brawlers.json';

type CounterMap = Record<string, string[]>;
const counterData = counters as CounterMap;

export interface CounterResult {
  brawlerId: string;
  name: string;
  counters: string[];
}

export function getCounters(targetId: string): CounterResult[] {
  const counterIds = counterData[targetId] ?? [];
  return counterIds
    .map((id) => {
      const b = brawlers.find((b) => b.id === id);
      return b ? { brawlerId: id, name: b.name, counters: [targetId] } : null;
    })
    .filter(Boolean) as CounterResult[];
}

export function getCounteredBy(brawlerId: string): string[] {
  return Object.entries(counterData)
    .filter(([, list]) => list.includes(brawlerId))
    .map(([id]) => id);
}
