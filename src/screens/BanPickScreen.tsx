import React, { useState } from 'react';
import {
  FlatList,
  LayoutChangeEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BRAWLER_DATA from '../data/brawler_data.json';

// ─── 타입 ────────────────────────────────────────────────────────────────────
type Team  = 'blue' | 'red';
type BrawlerState = 'available' | 'my_banned' | 'op_banned' | 'banned' | 'picked';

interface BrawlerStat {
  id: string; name: string; tier: number;
  counterBonus: number; vulnerableCount: number;
  threats: string[];
}
interface TeamAnalysis {
  stats: BrawlerStat[];
  strengths: BrawlerStat[];
  weaknesses: BrawlerStat[];
}

// ─── 브롤러 목록 (상수 먼저) ──────────────────────────────────────────────────
const BRAWLERS = [
  { id: 'shelly',       name: '쉘리' },
  { id: 'nita',         name: '니타' },
  { id: 'colt',         name: '콜트' },
  { id: 'bull',         name: '불' },
  { id: 'brock',        name: '브록' },
  { id: 'el_primo',     name: '엘 프리모' },
  { id: 'barley',       name: '발리' },
  { id: 'poco',         name: '포코' },
  { id: 'rosa',         name: '로사' },
  { id: 'jessie',       name: '제시' },
  { id: 'dynamike',     name: '다이너마이크' },
  { id: 'tick',         name: '틱' },
  { id: '8bit',         name: '8비트' },
  { id: 'rico',         name: '리코' },
  { id: 'darryl',       name: '대릴' },
  { id: 'penny',        name: '페니' },
  { id: 'carl',         name: '칼' },
  { id: 'jacky',        name: '재키' },
  { id: 'gus',          name: '거스' },
  { id: 'bo',           name: '보' },
  { id: 'emz',          name: '엠즈' },
  { id: 'stu',          name: '스튜' },
  { id: 'piper',        name: '파이퍼' },
  { id: 'pam',          name: '팸' },
  { id: 'frank',        name: '프랭크' },
  { id: 'bibi',         name: '비비' },
  { id: 'bea',          name: '비' },
  { id: 'nani',         name: '나니' },
  { id: 'edgar',        name: '에드거' },
  { id: 'griff',        name: '그리프' },
  { id: 'grom',         name: '그롬' },
  { id: 'bonnie',       name: '보니' },
  { id: 'gale',         name: '게일' },
  { id: 'colette',      name: '콜레트' },
  { id: 'belle',        name: '벨' },
  { id: 'ash',          name: '애쉬' },
  { id: 'lola',         name: '롤라' },
  { id: 'sam',          name: '샘' },
  { id: 'mandy',        name: '맨디' },
  { id: 'maisie',       name: '메이지' },
  { id: 'hank',         name: '행크' },
  { id: 'pearl',        name: '펄' },
  { id: 'larry_lawrie', name: '래리&로리' },
  { id: 'angelo',       name: '안젤로' },
  { id: 'berry',        name: '베리' },
  { id: 'shade',        name: '셰이드' },
  { id: 'meeple',       name: '미플' },
  { id: 'trunk',        name: '트렁크' },
  { id: 'volt',         name: '볼트' },
  { id: 'mortis',       name: '모티스' },
  { id: 'tara',         name: '타라' },
  { id: 'gene',         name: '진' },
  { id: 'max',          name: '맥스' },
  { id: 'mr_p',         name: '미스터P' },
  { id: 'sprout',       name: '스프라우트' },
  { id: 'byron',        name: '바이런' },
  { id: 'squeak',       name: '스퀴크' },
  { id: 'lou',          name: '루' },
  { id: 'ruffs',        name: '러프스' },
  { id: 'buzz',         name: '버즈' },
  { id: 'fang',         name: '팽' },
  { id: 'eve',          name: '이브' },
  { id: 'janet',        name: '자넷' },
  { id: 'otis',         name: '오티스' },
  { id: 'buster',       name: '버스터' },
  { id: 'gray',         name: '그레이' },
  { id: 'rt',           name: 'R-T' },
  { id: 'willow',       name: '윌로우' },
  { id: 'doug',         name: '더그' },
  { id: 'chuck',        name: '척' },
  { id: 'charlie',      name: '찰리' },
  { id: 'mico',         name: '미코' },
  { id: 'melody',       name: '멜로디' },
  { id: 'lily',         name: '릴리' },
  { id: 'clancy',       name: '클랜시' },
  { id: 'moe',          name: '모' },
  { id: 'juju',         name: '주주' },
  { id: 'ollie',        name: '올리' },
  { id: 'pinkcess',     name: '핑크스' },
  { id: 'lumi',         name: '루미' },
  { id: 'jaeyong',      name: '재용' },
  { id: 'ali',          name: '알리' },
  { id: 'mina',         name: '미나' },
  { id: 'jigi',         name: '지기' },
  { id: 'jiji',         name: '지지' },
  { id: 'glowi',        name: '글로이' },
  { id: 'nazia',        name: '나지아' },
  { id: 'demian',       name: '데미안' },
  { id: 'star_nova',    name: '스타노바' },
  { id: 'crow',         name: '크로우' },
  { id: 'leon',         name: '레온' },
  { id: 'spike',        name: '스파이크' },
  { id: 'sandy',        name: '샌디' },
  { id: 'amber',        name: '앰버' },
  { id: 'meg',          name: '메그' },
  { id: 'surge',        name: '서지' },
  { id: 'chester',      name: '체스터' },
  { id: 'cordelius',    name: '코델리우스' },
  { id: 'kit',          name: '키트' },
  { id: 'draco',        name: '드라코' },
  { id: 'kenji',        name: '켄지' },
  { id: 'pierce',       name: '피어스' },
  { id: 'kaze',         name: '카제' },
  { id: 'sirius',       name: '시리우스' },
];

// ─── 데이터 ────────────────────────────────────────────────────────────────────
type BrawlerEntry = { tiers: Record<string, number>; counters: string[] };
const DATA = BRAWLER_DATA as Record<string, BrawlerEntry>;

// ─── 역할군 세트 ──────────────────────────────────────────────────────────────
const TANKS     = new Set(['bull','el_primo','rosa','frank','jacky','ash','sam','hank',
                           'buster','draco','darryl','bibi','meg','volt','trunk']);
const SUPPORTS  = new Set(['poco','pam','tara','gene','max','byron','ruffs','gray',
                           'kit','doug','berry','gus','lumi','mina']);
const RANGE     = new Set(['piper','belle','bea','nani','mandy','maisie','brock','rico',
                           'bo','crow','leon','amber','barley','dynamike','tick','grom',
                           'sprout','squeak','penny','griff','bonnie','eve','janet']);
const ASSASSINS = new Set(['mortis','edgar','fang','buzz','lily','mico','melody',
                           'stu','charlie','shade','kenji','kaze']);

// ─── 픽 순서 (1-2-2-1, 밴은 자유) ────────────────────────────────────────────
const PICK_SEQ: Team[] = ['blue', 'red', 'red', 'blue', 'blue', 'red'];

// ─── 모드 키 ──────────────────────────────────────────────────────────────────
const MODE_KEY: Record<string, string> = {
  '바운티': 'bounty', '브롤 볼': 'brawl_ball', '젬 그랩': 'gem_grab',
  '하이스트': 'heist', '핫 존': 'hot_zone', '녹아웃': 'knockout',
};

// ─── 계산 함수 ────────────────────────────────────────────────────────────────
function getBrawlerName(id: string): string {
  return BRAWLERS.find(b => b.id === id)?.name ?? id;
}

function calcSynergy(picks: string[]): number {
  const hasTank     = picks.some(id => TANKS.has(id));
  const hasSupport  = picks.some(id => SUPPORTS.has(id));
  const hasRange    = picks.some(id => RANGE.has(id));
  const hasAssassin = picks.some(id => ASSASSINS.has(id));
  let s = 0;
  if (hasTank)                          s += 1;
  if (hasSupport)                       s += 1;
  if (hasRange)                         s += 0.5;
  if (hasTank && hasSupport)            s += 0.5;
  if (hasAssassin && hasSupport)        s += 0.5;
  return Math.min(s, 3);
}

function calcTeamScore(myPicks: string[], oppPicks: string[], modeKey: string): number {
  const tierSum = myPicks.reduce(
    (sum, id) => sum + (DATA[id]?.tiers?.[modeKey] ?? 3), 0,
  );
  let counterScore = 0;
  for (const myId of myPicks) {
    const myCounters: string[] = DATA[myId]?.counters ?? [];
    for (const oppId of oppPicks) {
      if (myCounters.includes(oppId)) counterScore++;
    }
  }
  return tierSum * 2.5 + counterScore * 3.0 + calcSynergy(myPicks) * 1.5;
}

function calcAdvantage(blue: string[], red: string[], modeKey: string): number {
  if (blue.length === 0 && red.length === 0) return 0;
  const diff = calcTeamScore(blue, red, modeKey) - calcTeamScore(red, blue, modeKey);
  return Math.max(-80, Math.min(80, (diff / 62) * 80));
}

function getTeamAnalysis(
  myPicks: string[], oppPicks: string[], modeKey: string,
): TeamAnalysis | null {
  if (myPicks.length === 0) return null;

  const stats: BrawlerStat[] = myPicks.map(id => {
    const tier         = DATA[id]?.tiers?.[modeKey] ?? 3;
    const myCtrs       = DATA[id]?.counters ?? [];
    const counterBonus = oppPicks.filter(opp => myCtrs.includes(opp)).length;
    const threatIds    = oppPicks.filter(opp => (DATA[opp]?.counters ?? []).includes(id));
    return {
      id,
      name:           getBrawlerName(id),
      tier,
      counterBonus,
      vulnerableCount: threatIds.length,
      threats:        threatIds.map(t => getBrawlerName(t)),
    };
  });

  const strengths = [...stats]
    .sort((a, b) =>
      (b.tier * 2.5 + b.counterBonus * 3) - (a.tier * 2.5 + a.counterBonus * 3),
    )
    .slice(0, 2);

  const weaknesses = [...stats]
    .filter(b => b.vulnerableCount > 0 || b.tier <= 2)
    .sort((a, b) => (b.vulnerableCount - a.vulnerableCount) || (a.tier - b.tier))
    .slice(0, 2);

  return { stats, strengths, weaknesses };
}

function getCompType(picks: string[]): string {
  const hasTank      = picks.some(id => TANKS.has(id));
  const hasSupport   = picks.some(id => SUPPORTS.has(id));
  const hasAssassin  = picks.some(id => ASSASSINS.has(id));
  const rangeCount   = picks.filter(id => RANGE.has(id)).length;
  const assassinCnt  = picks.filter(id => ASSASSINS.has(id)).length;
  if (hasTank && hasSupport)    return '🛡️ 탱커+서포터 조합';
  if (assassinCnt >= 2)         return '🗡️ 암살자 조합';
  if (rangeCount >= 2)          return '🎯 원거리 조합';
  if (hasAssassin && hasTank)   return '⚔️ 돌격 조합';
  if (hasSupport)               return '💚 서포터 중심 조합';
  return '⚖️ 균형 조합';
}

// ─── 유불리 바 ────────────────────────────────────────────────────────────────
function AdvantageBar({ score, active }: { score: number; active: boolean }) {
  const [barW, setBarW] = useState(0);

  const bluePct = Math.max(2, Math.min(98, ((score + 80) / 160) * 100));
  const redPct  = 100 - bluePct;

  const verdict =
    score >= 40  ? 'Blue 압도적 우세' :
    score >= 15  ? 'Blue 우세' :
    score > -15  ? '균형' :
    score > -40  ? 'Red 우세' :
                   'Red 압도적 우세';

  const verdictColor =
    score >= 15 ? '#64b5f6' : score > -15 ? '#9e9e9e' : '#ef9a9a';

  const blueBarColor =
    score >= 40 ? '#0d47a1' : score >= 15 ? '#1976d2' : '#37474f';
  const redBarColor =
    score <= -40 ? '#7f0000' : score <= -15 ? '#c62828' : '#37474f';

  const scoreStr = score > 0 ? `+${Math.round(score)}` : `${Math.round(score)}`;

  return (
    <View style={adv.wrap}>
      <View style={adv.header}>
        <Text style={adv.title}>⚖️ 유불리</Text>
        {active ? (
          <Text style={[adv.verdict, { color: verdictColor }]}>
            {verdict} <Text style={adv.scoreNum}>{scoreStr}</Text>
          </Text>
        ) : (
          <Text style={adv.waiting}>픽 시작 후 분석</Text>
        )}
      </View>

      <View
        style={adv.track}
        onLayout={(e: LayoutChangeEvent) => setBarW(e.nativeEvent.layout.width)}
      >
        {barW > 0 && (
          <>
            <View style={[adv.fill, {
              width: (barW * bluePct) / 100,
              backgroundColor: blueBarColor,
              borderTopLeftRadius: 5, borderBottomLeftRadius: 5,
            }]} />
            <View style={[adv.fill, {
              width: (barW * redPct) / 100,
              backgroundColor: redBarColor,
              borderTopRightRadius: 5, borderBottomRightRadius: 5,
            }]} />
            <View style={[adv.centerLine, { left: barW / 2 - 1 }]} />
            {active && (
              <View style={[adv.marker, { left: (barW * bluePct) / 100 - 2 }]} />
            )}
          </>
        )}
      </View>

      <View style={adv.scaleRow}>
        {['-80', '', '-40', '', '0', '', '+40', '', '+80'].map((v, i) => (
          <Text key={i} style={adv.scaleLabel}>{v}</Text>
        ))}
      </View>
      <View style={adv.zoneRow}>
        <Text style={[adv.zoneLabel, { color: '#1565c0' }]}>◀ Blue 강</Text>
        <Text style={[adv.zoneLabel, { color: '#888' }]}>균형</Text>
        <Text style={[adv.zoneLabel, { color: '#b71c1c' }]}>Red 강 ▶</Text>
      </View>
    </View>
  );
}

// ─── 팀 블록 (총평용, 최상위 컴포넌트) ────────────────────────────────────────
interface TeamBlockProps {
  label: string;
  color: string;
  border: string;
  analysis: TeamAnalysis | null;
  picks: string[];
}

function TeamBlock({ label, color, border, analysis, picks }: TeamBlockProps) {
  if (!analysis) return null;
  const compType = getCompType(picks);
  return (
    <View style={[sm.teamCard, { borderColor: border }]}>
      <Text style={[sm.teamLabel, { color }]}>{label}</Text>
      <Text style={sm.compType}>{compType}</Text>

      {/* 강점 */}
      <View style={sm.section}>
        <Text style={sm.sectionIcon}>💪</Text>
        <View style={sm.sectionBody}>
          <Text style={sm.sectionTitle}>강점 브롤러</Text>
          {analysis.strengths.map(b => (
            <View key={b.id} style={sm.brawlerRow}>
              <Text style={[sm.brawlerName, { color }]}>{b.name}</Text>
              <View style={sm.badges}>
                <View style={sm.tierBadge}>
                  <Text style={sm.tierText}>T{b.tier}</Text>
                </View>
                {b.counterBonus > 0 && (
                  <View style={sm.ctrBadge}>
                    <Text style={sm.ctrText}>카운터 ×{b.counterBonus}</Text>
                  </View>
                )}
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 약점 */}
      {analysis.weaknesses.length > 0 && (
        <View style={sm.section}>
          <Text style={sm.sectionIcon}>⚠️</Text>
          <View style={sm.sectionBody}>
            <Text style={sm.sectionTitle}>약점 브롤러</Text>
            {analysis.weaknesses.map(b => (
              <View key={b.id} style={sm.brawlerRow}>
                <Text style={sm.weakName}>{b.name}</Text>
                {b.threats.length > 0 && (
                  <Text style={sm.threatText}>← {b.threats.join(', ')} 에 취약</Text>
                )}
                {b.tier <= 2 && b.threats.length === 0 && (
                  <Text style={sm.threatText}>이 모드 저티어</Text>
                )}
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}

// ─── 총평 화면 ────────────────────────────────────────────────────────────────
interface SummaryProps {
  bluePicks: string[];
  redPicks: string[];
  modeKey: string;
  advScore: number;
  onReset: () => void;
  onBack: () => void;
}

function SummaryView({ bluePicks, redPicks, modeKey, advScore, onReset, onBack }: SummaryProps) {
  const blueAna = getTeamAnalysis(bluePicks, redPicks, modeKey);
  const redAna  = getTeamAnalysis(redPicks, bluePicks, modeKey);

  const verdict =
    advScore >= 40 ? 'Blue 압도적 우세' :
    advScore >= 15 ? 'Blue 우세' :
    advScore > -15 ? '균형' :
    advScore > -40 ? 'Red 우세' : 'Red 압도적 우세';

  const verdictColor =
    advScore >= 15 ? '#64b5f6' : advScore > -15 ? '#9e9e9e' : '#ef9a9a';
  const scoreStr = advScore > 0 ? `+${Math.round(advScore)}` : `${Math.round(advScore)}`;

  const blueBarFlex = Math.max(2, Math.round(50 + advScore * 0.5));
  const redBarFlex  = Math.max(2, Math.round(50 - advScore * 0.5));

  return (
    <ScrollView style={sm.scroll} contentContainerStyle={sm.content}>
      <Text style={sm.title}>📋 밴픽 총평</Text>

      {/* 유불리 요약 */}
      <View style={sm.advantageBox}>
        <Text style={sm.advLabel}>최종 유불리</Text>
        <Text style={[sm.advVerdict, { color: verdictColor }]}>
          {verdict} <Text style={sm.advScore}>{scoreStr}</Text>
        </Text>
        <View style={sm.miniBar}>
          <View style={{
            flex: blueBarFlex,
            height: 10,
            backgroundColor: advScore >= 15 ? '#1565c0' : '#37474f',
            borderTopLeftRadius: 4, borderBottomLeftRadius: 4,
          }} />
          <View style={{
            flex: redBarFlex,
            height: 10,
            backgroundColor: advScore <= -15 ? '#b71c1c' : '#37474f',
            borderTopRightRadius: 4, borderBottomRightRadius: 4,
          }} />
        </View>
        <View style={sm.miniBarLabels}>
          <Text style={sm.miniBarLabel}>← Blue</Text>
          <Text style={sm.miniBarLabel}>Red →</Text>
        </View>
      </View>

      {/* 팀 분석 */}
      <TeamBlock
        label="🔵 블루팀" color="#64b5f6" border="#2196F3"
        analysis={blueAna} picks={bluePicks}
      />
      <TeamBlock
        label="🔴 레드팀" color="#ef9a9a" border="#f44336"
        analysis={redAna} picks={redPicks}
      />

      {/* 버튼 */}
      <TouchableOpacity style={sm.btn1} onPress={onReset}>
        <Text style={sm.btnText}>🔄 다시하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={sm.btn2} onPress={onBack}>
        <Text style={sm.btnText}>← 홈으로</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ─── 팀 패널 (최상위 컴포넌트) ────────────────────────────────────────────────
interface TeamPanelProps {
  team: Team;
  bans: string[];
  picks: string[];
  banMode: 'none' | 'blue' | 'red';
  onBanToggle: () => void;
}

function TeamPanel({ team, bans, picks, banMode, onBanToggle }: TeamPanelProps) {
  const isBlue   = team === 'blue';
  const color    = isBlue ? '#64b5f6' : '#ef9a9a';
  const border   = isBlue ? '#2196F3' : '#f44336';
  const isBanning   = banMode === team;
  const otherBanning = banMode !== 'none' && !isBanning;
  const canBan   = bans.length < 3;

  return (
    <View style={[s.teamPanel, { borderColor: border }]}>
      <View style={s.teamTitleRow}>
        <Text style={[s.teamTitle, { color }]}>{isBlue ? '🔵 블루팀' : '🔴 레드팀'}</Text>
        {(canBan || isBanning) && !otherBanning && (
          <TouchableOpacity
            style={[s.banToggleBtn, isBanning && { backgroundColor: '#2e7d32' }]}
            onPress={onBanToggle}
          >
            <Text style={s.banToggleText}>
              {isBanning ? '✓ 완료' : `🚫 ${bans.length}/3`}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={s.sectionLabel}>밴</Text>
      {[0, 1, 2].map(i => (
        <View key={`ban${i}`} style={[s.slot, bans[i] ? s.banFilled : s.slotEmpty]}>
          <Text style={[s.slotText, bans[i] ? s.banText : s.emptyText]} numberOfLines={1}>
            {bans[i] ? getBrawlerName(bans[i]) : '─'}
          </Text>
        </View>
      ))}

      <Text style={s.sectionLabel}>픽</Text>
      {[0, 1, 2].map(i => (
        <View key={`pick${i}`} style={[
          s.slot,
          picks[i] ? (isBlue ? s.bluePickFilled : s.redPickFilled) : s.slotEmpty,
        ]}>
          <Text style={[s.slotText, picks[i] ? { color } : s.emptyText]} numberOfLines={1}>
            {picks[i] ? getBrawlerName(picks[i]) : '─'}
          </Text>
        </View>
      ))}
    </View>
  );
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface Props { mode: string; onBack: () => void; }

// ─── 메인 컴포넌트 ──────────────────────────────────────────────────────────────
export default function BanPickScreen({ mode, onBack }: Props) {
  const [step,      setStep]      = useState(0);
  const [blueBans,  setBlueBans]  = useState<string[]>([]);
  const [redBans,   setRedBans]   = useState<string[]>([]);
  const [bluePicks, setBluePicks] = useState<string[]>([]);
  const [redPicks,  setRedPicks]  = useState<string[]>([]);
  const [query,     setQuery]     = useState('');
  const [banMode,   setBanMode]   = useState<'none' | 'blue' | 'red'>('none');

  const isDone     = step >= PICK_SEQ.length;
  const pickTeam   = isDone ? null : PICK_SEQ[step];
  const modeKey    = MODE_KEY[mode] ?? 'gem_grab';
  const advScore   = calcAdvantage(bluePicks, redPicks, modeKey);
  const hasAnyPick = bluePicks.length + redPicks.length > 0;

  // 현재 유효 팀/페이즈 (밴 모드 우선)
  const effTeam  = banMode !== 'none' ? banMode : pickTeam;
  const effPhase = banMode !== 'none' ? 'ban' : 'pick';

  // ── 선택 가능 여부 ────────────────────────────────────────────────────────
  function isSelectable(id: string): boolean {
    if (banMode !== 'none') {
      const myBans = banMode === 'blue' ? blueBans : redBans;
      return !myBans.includes(id);
    }
    if (isDone || !pickTeam) return false;
    return (
      !blueBans.includes(id) && !redBans.includes(id) &&
      !bluePicks.includes(id) && !redPicks.includes(id)
    );
  }

  function getBrawlerState(id: string): BrawlerState {
    if (banMode !== 'none') {
      const myBans = banMode === 'blue' ? blueBans : redBans;
      const opBans = banMode === 'blue' ? redBans  : blueBans;
      if (myBans.includes(id))  return 'my_banned';
      if (opBans.includes(id))  return 'op_banned';
      return 'available';
    }
    if (isDone) return 'banned';
    if (blueBans.includes(id) || redBans.includes(id)) return 'banned';
    if (bluePicks.includes(id) || redPicks.includes(id)) return 'picked';
    return 'available';
  }

  function getRecommendedIds(): Set<string> {
    if (!effTeam) return new Set();
    const myPicks  = effTeam === 'blue' ? bluePicks : redPicks;
    const oppPicks = effTeam === 'blue' ? redPicks  : bluePicks;
    const candidates = BRAWLERS.filter(b => isSelectable(b.id));

    if (effPhase === 'ban') {
      const scored = candidates.map(b => ({
        id: b.id,
        score: (DATA[b.id]?.tiers?.[modeKey] ?? 3) * 2.5
             + (DATA[b.id]?.counters?.length ?? 0) * 0.4,
      })).sort((a, b) => b.score - a.score);
      return new Set(scored.slice(0, 5).map(b => b.id));
    }
    const scored = candidates.map(b => {
      const tier    = (DATA[b.id]?.tiers?.[modeKey] ?? 3) * 2.5;
      const ctrs    = DATA[b.id]?.counters ?? [];
      const counter = oppPicks.filter(opp => ctrs.includes(opp)).length * 3.0;
      const synergy = (calcSynergy([...myPicks, b.id]) - calcSynergy(myPicks)) * 1.5;
      return { id: b.id, score: tier + counter + synergy };
    }).sort((a, b) => b.score - a.score);
    return new Set(scored.slice(0, 5).map(b => b.id));
  }

  const recommendedIds = getRecommendedIds();

  function handleSelect(id: string) {
    if (!isSelectable(id)) return;
    if (banMode !== 'none') {
      if (banMode === 'blue') {
        const next = [...blueBans, id];
        setBlueBans(next);
        if (next.length >= 3) setBanMode('none');
      } else {
        const next = [...redBans, id];
        setRedBans(next);
        if (next.length >= 3) setBanMode('none');
      }
      return;
    }
    if (!pickTeam) return;
    if (pickTeam === 'blue') setBluePicks(p => [...p, id]);
    else                     setRedPicks(p => [...p, id]);
    setStep(s => s + 1);
  }

  function handleBanToggle(team: 'blue' | 'red') {
    setBanMode(prev => prev === team ? 'none' : team);
  }

  function handleReset() {
    setStep(0); setBlueBans([]); setRedBans([]); setBluePicks([]); setRedPicks([]);
    setQuery(''); setBanMode('none');
  }

  const filteredBrawlers = query.trim()
    ? BRAWLERS.filter(b => b.name.includes(query.trim()))
    : BRAWLERS;

  const phaseColor =
    banMode === 'blue' ? '#0d3b6e' :
    banMode === 'red'  ? '#6e0d0d' :
    isDone             ? '#2e7d32' :
    pickTeam === 'blue'? '#1565C0' : '#c62828';

  const phaseLabel =
    banMode === 'blue' ? `🔵 블루팀 밴 중 (${blueBans.length}/3) — 완료하려면 팀 패널의 ✓ 버튼` :
    banMode === 'red'  ? `🔴 레드팀 밴 중 (${redBans.length}/3) — 완료하려면 팀 패널의 ✓ 버튼` :
    isDone             ? '✅ 픽 완료!' :
    `${pickTeam === 'blue' ? '🔵 블루팀' : '🔴 레드팀'} · 픽 선택  (${step + 1}/6)`;

  const btnMap: Record<BrawlerState, object[]> = {
    available: [s.bBtn],
    my_banned: [s.bBtn, s.bBtnMyBan],
    op_banned: [s.bBtn, s.bBtnOpBan],
    banned:    [s.bBtn, s.bBtnBanned],
    picked:    [s.bBtn, s.bBtnPicked],
  };
  const nameMap: Record<BrawlerState, object[]> = {
    available: [s.bName],
    my_banned: [s.bName, s.bNameDim],
    op_banned: [s.bName, s.bNameOpBan],
    banned:    [s.bName, s.bNameBanned],
    picked:    [s.bName, s.bNameDim],
  };

  return (
    <SafeAreaView style={s.safe}>
      {/* 헤더 */}
      <View style={s.header}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Text style={s.backText}>← 홈</Text>
        </TouchableOpacity>
        <Text style={s.modeText}>{mode}</Text>
        <TouchableOpacity onPress={handleReset} style={s.resetBtn}>
          <Text style={s.resetText}>↺ 초기화</Text>
        </TouchableOpacity>
      </View>

      {/* 팀 패널 */}
      <View style={s.teamsRow}>
        <TeamPanel team="blue" bans={blueBans} picks={bluePicks}
          banMode={banMode} onBanToggle={() => handleBanToggle('blue')} />
        <TeamPanel team="red"  bans={redBans}  picks={redPicks}
          banMode={banMode} onBanToggle={() => handleBanToggle('red')} />
      </View>

      {/* 유불리 바 */}
      <AdvantageBar score={advScore} active={hasAnyPick} />

      {/* 페이즈 바 */}
      <View style={[s.phaseBar, { backgroundColor: phaseColor }]}>
        <Text style={s.phaseText}>{phaseLabel}</Text>
      </View>

      {/* 검색 바 */}
      {!isDone && (
        <View style={s.searchWrap}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="브롤러 검색..."
            placeholderTextColor="#556677"
            value={query}
            onChangeText={setQuery}
            autoCorrect={false}
            autoCapitalize="none"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} style={s.searchClear}>
              <Text style={s.searchClearText}>✕</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {/* 브롤러 그리드 or 총평 */}
      {isDone ? (
        <SummaryView
          bluePicks={bluePicks} redPicks={redPicks}
          modeKey={modeKey} advScore={advScore}
          onReset={handleReset} onBack={onBack}
        />
      ) : (
        <FlatList
          data={filteredBrawlers}
          numColumns={4}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            const state         = getBrawlerState(item.id);
            const isRecommended = state === 'available' && recommendedIds.has(item.id);
            return (
              <TouchableOpacity
                style={[...btnMap[state], isRecommended && s.bBtnRecommended]}
                onPress={() => handleSelect(item.id)}
                disabled={!isSelectable(item.id)}
                activeOpacity={0.65}
              >
                <Text
                  style={[...nameMap[state], isRecommended && s.bNameRecommended]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {isRecommended ? `★ ${item.name}` : item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
          contentContainerStyle={s.grid}
        />
      )}
    </SafeAreaView>
  );
}

// ─── 스타일 ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#16213e' },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#0f3460', paddingHorizontal: 12, paddingVertical: 9,
  },
  backBtn:  { paddingRight: 8 },
  backText: { color: '#e94560', fontWeight: 'bold', fontSize: 14 },
  modeText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
  resetBtn: { paddingLeft: 8 },
  resetText:{ color: '#aaa', fontSize: 13 },

  teamsRow: {
    flexDirection: 'row',
    paddingHorizontal: 8, paddingTop: 8, paddingBottom: 4,
  },
  teamPanel: {
    flex: 1, backgroundColor: '#0a2240', borderRadius: 8,
    padding: 7, borderWidth: 1.5, marginHorizontal: 3,
  },
  teamTitleRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 },
  teamTitle:    { fontWeight: 'bold', fontSize: 12 },
  banToggleBtn: {
    backgroundColor: '#7b1a1a', borderRadius: 5,
    paddingHorizontal: 6, paddingVertical: 2,
  },
  banToggleText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  sectionLabel: { color: '#556677', fontSize: 10, marginTop: 4, marginBottom: 2 },
  slot:         { borderRadius: 4, paddingVertical: 3, paddingHorizontal: 4, marginBottom: 2 },
  slotEmpty:    { backgroundColor: '#0d1e36' },
  banFilled:    { backgroundColor: '#4a1010' },
  bluePickFilled: { backgroundColor: '#0d2d4a' },
  redPickFilled:  { backgroundColor: '#3a1020' },
  slotText:  { fontSize: 11 },
  emptyText: { color: '#334455' },
  banText:   { color: '#e57373' },

  phaseBar: {
    marginHorizontal: 8, borderRadius: 6, paddingVertical: 7,
    alignItems: 'center', marginBottom: 6,
  },
  phaseText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#0a2240', borderRadius: 8,
    marginHorizontal: 8, marginBottom: 6,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: '#1a3a5c',
  },
  searchIcon:  { fontSize: 14, marginRight: 6 },
  searchInput: {
    flex: 1, color: '#fff', fontSize: 13,
    paddingVertical: 5,
  },
  searchClear:     { paddingHorizontal: 6, paddingVertical: 4 },
  searchClearText: { color: '#556677', fontSize: 14 },

  grid: { paddingHorizontal: 6, paddingBottom: 20 },
  bBtn: {
    flex: 1, margin: 2, backgroundColor: '#0f3460', borderRadius: 6,
    paddingVertical: 7, paddingHorizontal: 2, alignItems: 'center',
    minHeight: 32, justifyContent: 'center',
  },
  bBtnRecommended: { backgroundColor: '#1a2e10', borderWidth: 1.5, borderColor: '#FFD700' },
  bBtnMyBan:       { backgroundColor: '#1a1a2e', opacity: 0.4 },
  bBtnOpBan:       { backgroundColor: '#2d1a1a' },
  bBtnBanned:      { backgroundColor: '#1a0d0d' },
  bBtnPicked:      { backgroundColor: '#0d1a0d', opacity: 0.5 },

  bName:             { color: '#cce0ff', fontSize: 11, textAlign: 'center' },
  bNameRecommended:  { color: '#FFD700', fontWeight: 'bold' },
  bNameDim:          { color: '#444455' },
  bNameOpBan:        { color: '#7a4040' },
  bNameBanned:       { color: '#5a2020', textDecorationLine: 'line-through' },
});

// ─── 유불리 바 스타일 ─────────────────────────────────────────────────────────
const adv = StyleSheet.create({
  wrap: {
    marginHorizontal: 8, marginBottom: 5,
    backgroundColor: '#0a2240', borderRadius: 8,
    padding: 8, borderWidth: 1, borderColor: '#1a3a5c',
  },
  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 6,
  },
  title:   { color: '#8899bb', fontSize: 11, fontWeight: '600' },
  verdict: { fontSize: 12, fontWeight: 'bold' },
  scoreNum:{ fontSize: 14 },
  waiting: { color: '#445566', fontSize: 11 },

  track: {
    height: 14, backgroundColor: '#111',
    borderRadius: 5, flexDirection: 'row', overflow: 'visible', position: 'relative',
  },
  fill: { height: 14 },
  centerLine: {
    position: 'absolute', top: -2, width: 2, height: 18,
    backgroundColor: '#fff', opacity: 0.5, borderRadius: 1,
  },
  marker: {
    position: 'absolute', top: -3, width: 4, height: 20,
    backgroundColor: '#FFD700', borderRadius: 2,
  },
  scaleRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 3,
  },
  scaleLabel: { color: '#445566', fontSize: 9, flex: 1, textAlign: 'center' },
  zoneRow: {
    flexDirection: 'row', justifyContent: 'space-between', marginTop: 2,
  },
  zoneLabel: { fontSize: 9, fontWeight: '600' },
});

// ─── 총평 스타일 ──────────────────────────────────────────────────────────────
const sm = StyleSheet.create({
  scroll:  { flex: 1 },
  content: { padding: 12, paddingBottom: 32 },

  title: { color: '#fff', fontSize: 17, fontWeight: 'bold', marginBottom: 10 },

  advantageBox: {
    backgroundColor: '#0a2240', borderRadius: 10,
    padding: 12, marginBottom: 10,
    borderWidth: 1, borderColor: '#1a3a5c',
  },
  advLabel:  { color: '#8899bb', fontSize: 11, marginBottom: 4 },
  advVerdict:{ fontSize: 15, fontWeight: 'bold', marginBottom: 8 },
  advScore:  { fontSize: 17 },
  miniBar: {
    height: 10, flexDirection: 'row', borderRadius: 5,
    overflow: 'hidden', marginBottom: 4,
  },
  miniBarLabels: { flexDirection: 'row', justifyContent: 'space-between' },
  miniBarLabel:  { color: '#445566', fontSize: 10 },

  teamCard: {
    backgroundColor: '#0a2240', borderRadius: 10,
    padding: 12, marginBottom: 10, borderWidth: 1.5,
  },
  teamLabel: { fontWeight: 'bold', fontSize: 14, marginBottom: 2 },
  compType:  { color: '#8899bb', fontSize: 12, marginBottom: 10 },

  section:     { flexDirection: 'row', marginBottom: 10, alignItems: 'flex-start' },
  sectionIcon: { fontSize: 16, marginRight: 8, marginTop: 1 },
  sectionBody: { flex: 1 },
  sectionTitle:{ color: '#8899bb', fontSize: 11, marginBottom: 5 },

  brawlerRow:  { flexDirection: 'row', alignItems: 'center', marginBottom: 4, flexWrap: 'wrap' },
  brawlerName: { fontWeight: 'bold', fontSize: 13, marginRight: 6 },
  weakName:    { color: '#ef9a9a', fontWeight: 'bold', fontSize: 13, marginRight: 6 },
  threatText:  { color: '#888899', fontSize: 11 },

  badges:    { flexDirection: 'row', marginLeft: 2 },
  tierBadge: {
    backgroundColor: '#1a3a5c', borderRadius: 4,
    paddingHorizontal: 5, paddingVertical: 1, marginRight: 4,
  },
  tierText:  { color: '#64b5f6', fontSize: 10, fontWeight: 'bold' },
  ctrBadge:  {
    backgroundColor: '#2e1a00', borderRadius: 4,
    paddingHorizontal: 5, paddingVertical: 1,
  },
  ctrText:   { color: '#FFD700', fontSize: 10, fontWeight: 'bold' },

  btn1: {
    backgroundColor: '#1565C0', borderRadius: 10,
    paddingVertical: 13, alignItems: 'center', marginBottom: 10,
  },
  btn2: {
    backgroundColor: '#e94560', borderRadius: 10,
    paddingVertical: 13, alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
