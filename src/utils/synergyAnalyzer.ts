import brawlers from '../data/brawlers.json';

const CLASS_SYNERGY: Record<string, string[]> = {
  Tank: ['Support', 'Damage Dealer'],
  Support: ['Tank', 'Assassin', 'Damage Dealer'],
  Assassin: ['Support', 'Thrower'],
  Thrower: ['Tank', 'Support'],
  Marksman: ['Tank', 'Support'],
  'Damage Dealer': ['Support', 'Tank'],
  Controller: ['Damage Dealer', 'Marksman'],
};

export interface SynergyResult {
  score: number;
  tags: string[];
}

export function analyzeSynergy(teamIds: string[]): SynergyResult {
  const classes = teamIds
    .map((id) => brawlers.find((b) => b.id === id)?.class)
    .filter(Boolean) as string[];

  let score = 0;
  const tags: string[] = [];

  const hasTank = classes.includes('Tank');
  const hasSupport = classes.includes('Support');
  const hasMarksman = classes.includes('Marksman');

  if (hasTank && hasSupport) { score += 2; tags.push('탱크+힐러 조합'); }
  if (hasTank && hasMarksman) { score += 1; tags.push('탱크 보호막'); }
  if (classes.filter((c) => c === 'Support').length >= 2) { score += 1; tags.push('더블 서포터'); }

  for (let i = 0; i < classes.length; i++) {
    const synergies = CLASS_SYNERGY[classes[i]] ?? [];
    for (let j = i + 1; j < classes.length; j++) {
      if (synergies.includes(classes[j])) score += 1;
    }
  }

  return { score, tags };
}
