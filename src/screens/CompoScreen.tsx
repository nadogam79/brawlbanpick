import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BRAWLER_DATA from '../data/brawler_data.json';

// ─── 데이터 ───────────────────────────────────────────────────────────────────
type BrawlerEntry = { name: string; tiers: Record<string, number>; counters: string[] };
const DATA = BRAWLER_DATA as Record<string, BrawlerEntry>;

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

// ─── 역할군 ───────────────────────────────────────────────────────────────────
const TANKS     = new Set(['bull','el_primo','rosa','frank','jacky','ash','sam','hank',
                           'buster','draco','darryl','bibi','meg','volt','trunk']);
const SUPPORTS  = new Set(['poco','pam','tara','gene','max','byron','ruffs','gray',
                           'kit','doug','berry','gus','lumi','mina']);
const RANGE     = new Set(['piper','belle','bea','nani','mandy','maisie','brock','rico',
                           'bo','crow','leon','amber','barley','dynamike','tick','grom',
                           'sprout','squeak','penny','griff','bonnie','eve','janet']);
const ASSASSINS = new Set(['mortis','edgar','fang','buzz','lily','mico','melody',
                           'stu','charlie','shade','kenji','kaze']);

// ─── 모드 ─────────────────────────────────────────────────────────────────────
const MODES = [
  { key: 'bounty',     label: '바운티',  emoji: '⭐' },
  { key: 'brawl_ball', label: '브롤볼',  emoji: '⚽' },
  { key: 'gem_grab',   label: '젬그랩',  emoji: '💎' },
  { key: 'heist',      label: '하이스트', emoji: '🏦' },
  { key: 'hot_zone',   label: '핫 존',   emoji: '🔥' },
  { key: 'knockout',   label: '녹아웃',  emoji: '🥊' },
];

// ─── 점수 계산 ────────────────────────────────────────────────────────────────
interface ScoreResult {
  total: number;
  tierScore: number;
  synergyScore: number;
  diversityScore: number;
  label: string;
  color: string;
  compType: string;
}

function getRoleSet(id: string): string[] {
  const roles: string[] = [];
  if (TANKS.has(id))     roles.push('탱커');
  if (SUPPORTS.has(id))  roles.push('서포터');
  if (RANGE.has(id))     roles.push('원거리');
  if (ASSASSINS.has(id)) roles.push('암살자');
  if (roles.length === 0) roles.push('올라운더');
  return roles;
}

function calcSynergy(picks: string[]): number {
  const hasTank    = picks.some(id => TANKS.has(id));
  const hasSupport = picks.some(id => SUPPORTS.has(id));
  const hasRange   = picks.some(id => RANGE.has(id));
  const hasAssassin = picks.some(id => ASSASSINS.has(id));
  let s = 0;
  if (hasTank)                      s += 1;
  if (hasSupport)                   s += 1;
  if (hasRange)                     s += 0.5;
  if (hasTank && hasSupport)        s += 0.5;
  if (hasAssassin && hasSupport)    s += 0.5;
  return Math.min(s, 3);
}

function getCompType(picks: string[]): string {
  const hasTank     = picks.some(id => TANKS.has(id));
  const hasSupport  = picks.some(id => SUPPORTS.has(id));
  const hasAssassin = picks.some(id => ASSASSINS.has(id));
  const rangeCount  = picks.filter(id => RANGE.has(id)).length;
  const assassinCnt = picks.filter(id => ASSASSINS.has(id)).length;
  if (hasTank && hasSupport)    return '🛡️ 탱커+서포터 조합';
  if (assassinCnt >= 2)         return '🗡️ 암살자 조합';
  if (rangeCount >= 2)          return '🎯 원거리 조합';
  if (hasAssassin && hasTank)   return '⚔️ 돌격 조합';
  if (hasSupport)               return '💚 서포터 중심 조합';
  return '⚖️ 균형 조합';
}

function calcScore(picks: string[], modeKey: string): ScoreResult {
  if (picks.length === 0) {
    return { total: 0, tierScore: 0, synergyScore: 0, diversityScore: 0,
             label: '—', color: '#556677', compType: '—' };
  }

  // 티어 점수 (40점): 평균 티어 기반
  const avgTier = picks.reduce((s, id) => s + (DATA[id]?.tiers?.[modeKey] ?? 3), 0) / picks.length;
  const tierScore = Math.round(((avgTier - 1) / 4) * 40);

  // 시너지 점수 (40점): 역할 조합
  const synergy = calcSynergy(picks);
  const synergyScore = Math.round((synergy / 3) * 40);

  // 역할 다양성 점수 (20점): 고유 역할 수
  const roleSet = new Set<string>();
  picks.forEach(id => {
    if (TANKS.has(id))     roleSet.add('tank');
    if (SUPPORTS.has(id))  roleSet.add('support');
    if (RANGE.has(id))     roleSet.add('range');
    if (ASSASSINS.has(id)) roleSet.add('assassin');
  });
  const diversityScore = Math.round((Math.min(roleSet.size, picks.length) / picks.length) * 20);

  const total = Math.min(100, tierScore + synergyScore + diversityScore);

  const label =
    total >= 90 ? '🔥 최강' :
    total >= 75 ? '⭐ 강함' :
    total >= 60 ? '👍 좋음' :
    total >= 40 ? '😐 평범' : '💔 낮음';

  const color =
    total >= 90 ? '#ff4757' :
    total >= 75 ? '#ffa502' :
    total >= 60 ? '#2ed573' :
    total >= 40 ? '#70a1ff' : '#747d8c';

  const compType = picks.length >= 2 ? getCompType(picks) : '—';

  return { total, tierScore, synergyScore, diversityScore, label, color, compType };
}

// ─── Props ───────────────────────────────────────────────────────────────────
interface Props { onBack: () => void; }

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export default function CompoScreen({ onBack }: Props) {
  const [modeKey,  setModeKey]  = useState(MODES[0].key);
  const [picks,    setPicks]    = useState<string[]>([]);
  const [query,    setQuery]    = useState('');

  const score = calcScore(picks, modeKey);

  function togglePick(id: string) {
    setPicks(prev =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : prev.length < 3 ? [...prev, id] : prev,
    );
  }

  function reset() { setPicks([]); setQuery(''); }

  const filtered = query.trim()
    ? BRAWLERS.filter(b => b.name.includes(query.trim()))
    : BRAWLERS;

  const scoreBarWidth = `${score.total}%` as const;

  return (
    <SafeAreaView style={s.safe}>
      {/* 헤더 */}
      <View style={s.header}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Text style={s.backText}>← 홈</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>🧪 조합 테스트</Text>
        <TouchableOpacity onPress={reset} style={s.resetBtn}>
          <Text style={s.resetText}>↺ 초기화</Text>
        </TouchableOpacity>
      </View>

      {/* 모드 탭 */}
      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={s.tabBar} contentContainerStyle={s.tabContent}
      >
        {MODES.map(m => (
          <TouchableOpacity
            key={m.key}
            style={[s.tab, modeKey === m.key && s.tabActive]}
            onPress={() => setModeKey(m.key)}
          >
            <Text style={s.tabEmoji}>{m.emoji}</Text>
            <Text style={[s.tabLabel, modeKey === m.key && s.tabLabelActive]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 점수 카드 */}
      <View style={s.scoreCard}>
        {/* 왼쪽: 총점 */}
        <View style={s.scoreLeft}>
          <Text style={[s.scoreNum, { color: score.color }]}>
            {score.total}
          </Text>
          <Text style={s.scoreDenom}>/100</Text>
          <Text style={[s.scoreLabel, { color: score.color }]}>{score.label}</Text>
        </View>

        {/* 오른쪽: 세부 */}
        <View style={s.scoreRight}>
          {/* 전체 바 */}
          <View style={s.totalBarWrap}>
            <View style={[s.totalBarFill, { width: scoreBarWidth, backgroundColor: score.color }]} />
          </View>

          <ScoreRow label="티어"     value={score.tierScore}     max={40} color="#64b5f6" />
          <ScoreRow label="시너지"   value={score.synergyScore}  max={40} color="#ffd700" />
          <ScoreRow label="다양성"   value={score.diversityScore} max={20} color="#69f0ae" />

          <Text style={s.compTypeText}>{score.compType}</Text>
        </View>
      </View>

      {/* 선택된 브롤러 슬롯 */}
      <View style={s.slotsRow}>
        {[0, 1, 2].map(i => {
          const id = picks[i];
          const brawler = id ? BRAWLERS.find(b => b.id === id) : null;
          const tier = id ? (DATA[id]?.tiers?.[modeKey] ?? 3) : null;
          const roles = id ? getRoleSet(id) : null;
          return (
            <TouchableOpacity
              key={i}
              style={[s.slot, id ? s.slotFilled : s.slotEmpty]}
              onPress={() => id && togglePick(id)}
              activeOpacity={id ? 0.7 : 1}
            >
              {id ? (
                <>
                  <Text style={s.slotName} numberOfLines={1}>{brawler?.name}</Text>
                  <Text style={s.slotTier}>T{tier}</Text>
                  <Text style={s.slotRole} numberOfLines={1}>{roles?.join(' ')}</Text>
                  <Text style={s.slotRemove}>✕</Text>
                </>
              ) : (
                <Text style={s.slotPlaceholder}>{i + 1}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 검색 */}
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

      {/* 브롤러 그리드 */}
      <ScrollView contentContainerStyle={s.grid}>
        <View style={s.gridWrap}>
          {filtered.map(b => {
            const selected = picks.includes(b.id);
            const disabled = !selected && picks.length >= 3;
            const tier     = DATA[b.id]?.tiers?.[modeKey] ?? 3;
            return (
              <TouchableOpacity
                key={b.id}
                style={[
                  s.bBtn,
                  selected && s.bBtnSelected,
                  disabled && s.bBtnDisabled,
                ]}
                onPress={() => togglePick(b.id)}
                disabled={disabled}
                activeOpacity={0.65}
              >
                <Text
                  style={[s.bName, selected && s.bNameSelected, disabled && s.bNameDisabled]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {b.name}
                </Text>
                <Text style={[s.bTier, { color: tierColor(tier) }]}>T{tier}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── 점수 행 서브컴포넌트 ─────────────────────────────────────────────────────
function ScoreRow({ label, value, max, color }: {
  label: string; value: number; max: number; color: string;
}) {
  const pct = `${Math.round((value / max) * 100)}%` as const;
  return (
    <View style={s.scoreRowWrap}>
      <Text style={s.scoreRowLabel}>{label}</Text>
      <View style={s.scoreRowBar}>
        <View style={[s.scoreRowFill, { width: pct, backgroundColor: color }]} />
      </View>
      <Text style={s.scoreRowVal}>{value}/{max}</Text>
    </View>
  );
}

function tierColor(tier: number): string {
  if (tier >= 5) return '#ff4757';
  if (tier >= 4) return '#ffa502';
  if (tier >= 3) return '#ffd700';
  if (tier >= 2) return '#70a1ff';
  return '#747d8c';
}

// ─── 스타일 ──────────────────────────────────────────────────────────────────
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#16213e' },

  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    backgroundColor: '#0f3460', paddingHorizontal: 14, paddingVertical: 10,
  },
  backBtn:     { width: 48 },
  backText:    { color: '#e94560', fontWeight: 'bold', fontSize: 14 },
  headerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  resetBtn:    { width: 48, alignItems: 'flex-end' },
  resetText:   { color: '#aaa', fontSize: 13 },

  tabBar:    { height: 74, backgroundColor: '#0a2240', marginTop: 8 },
  tabContent:{ paddingHorizontal: 10, paddingVertical: 13, alignItems: 'center' },
  tab: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, marginRight: 8, backgroundColor: '#0f3460',
  },
  tabActive:      { backgroundColor: '#e94560' },
  tabEmoji:       { fontSize: 13, marginRight: 4 },
  tabLabel:       { color: '#8899bb', fontSize: 12, fontWeight: '600' },
  tabLabelActive: { color: '#fff' },

  // 점수 카드
  scoreCard: {
    flexDirection: 'row',
    backgroundColor: '#0a2240', marginHorizontal: 8, marginTop: 10, marginBottom: 6,
    borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#1a3a5c',
  },
  scoreLeft: {
    alignItems: 'center', justifyContent: 'center',
    width: 70, marginRight: 12,
  },
  scoreNum:   { fontSize: 38, fontWeight: 'bold', lineHeight: 42 },
  scoreDenom: { color: '#556677', fontSize: 12 },
  scoreLabel: { fontSize: 14, fontWeight: 'bold', marginTop: 4 },

  scoreRight: { flex: 1 },
  totalBarWrap: {
    height: 8, backgroundColor: '#0d1e36', borderRadius: 4,
    overflow: 'hidden', marginBottom: 8,
  },
  totalBarFill: { height: 8, borderRadius: 4 },

  scoreRowWrap:  { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  scoreRowLabel: { color: '#8899bb', fontSize: 10, width: 34 },
  scoreRowBar: {
    flex: 1, height: 5, backgroundColor: '#0d1e36',
    borderRadius: 3, overflow: 'hidden', marginHorizontal: 5,
  },
  scoreRowFill:  { height: 5, borderRadius: 3 },
  scoreRowVal:   { color: '#8899bb', fontSize: 10, width: 28, textAlign: 'right' },
  compTypeText:  { color: '#8899bb', fontSize: 11, marginTop: 4 },

  // 슬롯
  slotsRow: {
    flexDirection: 'row', paddingHorizontal: 8, marginBottom: 6,
  },
  slot: {
    flex: 1, borderRadius: 8, marginHorizontal: 3,
    paddingVertical: 8, paddingHorizontal: 4,
    alignItems: 'center', minHeight: 64,
  },
  slotEmpty:  { backgroundColor: '#0a2240', borderWidth: 1, borderColor: '#1a3a5c', borderStyle: 'dashed' },
  slotFilled: { backgroundColor: '#0f3460', borderWidth: 1.5, borderColor: '#3a7bd5' },
  slotName:   { color: '#fff', fontSize: 11, fontWeight: 'bold', marginBottom: 2 },
  slotTier:   { color: '#ffd700', fontSize: 10, fontWeight: 'bold' },
  slotRole:   { color: '#8899bb', fontSize: 9, marginTop: 1 },
  slotRemove: { color: '#e94560', fontSize: 10, marginTop: 2 },
  slotPlaceholder: { color: '#334455', fontSize: 20, fontWeight: 'bold' },

  // 검색
  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#0a2240', borderRadius: 8,
    marginHorizontal: 8, marginBottom: 6,
    paddingHorizontal: 10, paddingVertical: 4,
    borderWidth: 1, borderColor: '#1a3a5c',
  },
  searchIcon:      { fontSize: 14, marginRight: 6 },
  searchInput:     { flex: 1, color: '#fff', fontSize: 13, paddingVertical: 5 },
  searchClear:     { paddingHorizontal: 6, paddingVertical: 4 },
  searchClearText: { color: '#556677', fontSize: 14 },

  // 그리드
  grid:    { paddingHorizontal: 6, paddingBottom: 20 },
  gridWrap:{ flexDirection: 'row', flexWrap: 'wrap' },
  bBtn: {
    width: '23%', margin: '1%',
    backgroundColor: '#0f3460', borderRadius: 6,
    paddingVertical: 6, paddingHorizontal: 2,
    alignItems: 'center', minHeight: 40,
  },
  bBtnSelected: { backgroundColor: '#1a3a6e', borderWidth: 2, borderColor: '#3a7bd5' },
  bBtnDisabled: { opacity: 0.3 },
  bName:         { color: '#cce0ff', fontSize: 10, textAlign: 'center' },
  bNameSelected: { color: '#fff', fontWeight: 'bold' },
  bNameDisabled: { color: '#445566' },
  bTier:         { fontSize: 9, fontWeight: 'bold', marginTop: 2 },
});
