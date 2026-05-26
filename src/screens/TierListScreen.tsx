import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BRAWLER_DATA from '../data/brawler_data.json';

// ─── 타입 ─────────────────────────────────────────────────────────────────────
type BrawlerEntry = { name: string; tiers: Record<string, number>; counters: string[] };
const DATA = BRAWLER_DATA as Record<string, BrawlerEntry>;

// ─── 브롤러 이름 ──────────────────────────────────────────────────────────────
const BRAWLER_NAMES: Record<string, string> = {
  shelly: '쉘리', nita: '니타', colt: '콜트', bull: '불', brock: '브록',
  el_primo: '엘 프리모', barley: '발리', poco: '포코', rosa: '로사',
  jessie: '제시', dynamike: '다이너마이크', tick: '틱', '8bit': '8비트',
  rico: '리코', darryl: '대릴', penny: '페니', carl: '칼', jacky: '재키',
  gus: '거스', bo: '보', emz: '엠즈', stu: '스튜', piper: '파이퍼',
  pam: '팸', frank: '프랭크', bibi: '비비', bea: '비', nani: '나니',
  edgar: '에드거', griff: '그리프', grom: '그롬', bonnie: '보니',
  gale: '게일', colette: '콜레트', belle: '벨', ash: '애쉬', lola: '롤라',
  sam: '샘', mandy: '맨디', maisie: '메이지', hank: '행크', pearl: '펄',
  larry_lawrie: '래리&로리', angelo: '안젤로', berry: '베리', shade: '셰이드',
  meeple: '미플', trunk: '트렁크', volt: '볼트', mortis: '모티스',
  tara: '타라', gene: '진', max: '맥스', mr_p: '미스터P',
  sprout: '스프라우트', byron: '바이런', squeak: '스퀴크', lou: '루',
  ruffs: '러프스', buzz: '버즈', fang: '팽', eve: '이브', janet: '자넷',
  otis: '오티스', buster: '버스터', gray: '그레이', rt: 'R-T',
  willow: '윌로우', doug: '더그', chuck: '척', charlie: '찰리',
  mico: '미코', melody: '멜로디', lily: '릴리', clancy: '클랜시',
  moe: '모', juju: '주주', ollie: '올리', pinkcess: '핑크스',
  lumi: '루미', jaeyong: '재용', ali: '알리', mina: '미나',
  jigi: '지기', jiji: '지지', glowi: '글로이', nazia: '나지아',
  demian: '데미안', star_nova: '스타노바', crow: '크로우', leon: '레온',
  spike: '스파이크', sandy: '샌디', amber: '앰버', meg: '메그',
  surge: '서지', chester: '체스터', cordelius: '코델리우스', kit: '키트',
  draco: '드라코', kenji: '켄지', pierce: '피어스', kaze: '카제',
  sirius: '시리우스',
};

// ─── 모드 목록 ────────────────────────────────────────────────────────────────
const MODES = [
  { key: 'bounty',     label: '바운티',  emoji: '⭐' },
  { key: 'brawl_ball', label: '브롤볼',  emoji: '⚽' },
  { key: 'gem_grab',   label: '젬그랩',  emoji: '💎' },
  { key: 'heist',      label: '하이스트', emoji: '🏦' },
  { key: 'hot_zone',   label: '핫 존',   emoji: '🔥' },
  { key: 'knockout',   label: '녹아웃',  emoji: '🥊' },
];

// ─── 티어 설정 ────────────────────────────────────────────────────────────────
const TIERS = [
  { value: 5, label: 'S', bg: '#c0392b', text: '#fff' },
  { value: 4, label: 'A', bg: '#e67e22', text: '#fff' },
  { value: 3, label: 'B', bg: '#f1c40f', text: '#1a1a1a' },
  { value: 2, label: 'C', bg: '#27ae60', text: '#fff' },
  { value: 1, label: 'D', bg: '#7f8c8d', text: '#fff' },
];

// ─── Props ───────────────────────────────────────────────────────────────────
interface Props { onBack: () => void; }

// ─── 메인 컴포넌트 ────────────────────────────────────────────────────────────
export default function TierListScreen({ onBack }: Props) {
  const [selectedMode, setSelectedMode] = useState(MODES[0].key);

  // 선택 모드 기준 티어별 그룹핑
  const tierGroups: Record<number, string[]> = { 5: [], 4: [], 3: [], 2: [], 1: [] };
  for (const [id, entry] of Object.entries(DATA)) {
    const raw   = entry.tiers?.[selectedMode] ?? 3;
    const tier  = Math.max(1, Math.min(5, Math.round(raw)));
    tierGroups[tier].push(id);
  }

  return (
    <SafeAreaView style={s.safe}>
      {/* 헤더 */}
      <View style={s.header}>
        <TouchableOpacity onPress={onBack} style={s.backBtn}>
          <Text style={s.backText}>← 홈</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>📊 티어리스트</Text>
        <View style={{ width: 48 }} />
      </View>

      {/* 모드 탭 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.tabBar}
        contentContainerStyle={s.tabContent}
      >
        {MODES.map(m => (
          <TouchableOpacity
            key={m.key}
            style={[s.tab, selectedMode === m.key && s.tabActive]}
            onPress={() => setSelectedMode(m.key)}
          >
            <Text style={s.tabEmoji}>{m.emoji}</Text>
            <Text style={[s.tabLabel, selectedMode === m.key && s.tabLabelActive]}>
              {m.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 티어 리스트 */}
      <ScrollView contentContainerStyle={s.listContent}>
        {TIERS.map(({ value, label, bg, text }) => {
          const brawlers = (tierGroups[value] ?? [])
            .sort((a, b) => (BRAWLER_NAMES[a] ?? a).localeCompare(BRAWLER_NAMES[b] ?? b, 'ko'));
          if (brawlers.length === 0) return null;
          return (
            <View key={value} style={s.tierRow}>
              <View style={[s.tierBadge, { backgroundColor: bg }]}>
                <Text style={[s.tierLetter, { color: text }]}>{label}</Text>
              </View>
              <View style={s.chipsWrap}>
                {brawlers.map(id => (
                  <View key={id} style={[s.chip, { borderColor: bg }]}>
                    <Text style={s.chipText}>{BRAWLER_NAMES[id] ?? id}</Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        {/* 범례 */}
        <View style={s.legend}>
          {TIERS.map(({ label, bg, text }) => (
            <View key={label} style={s.legendItem}>
              <View style={[s.legendBadge, { backgroundColor: bg }]}>
                <Text style={[s.legendLetter, { color: text }]}>{label}</Text>
              </View>
              <Text style={s.legendDesc}>
                {label === 'S' ? '최강' : label === 'A' ? '강함' :
                 label === 'B' ? '보통' : label === 'C' ? '약함' : '비추'}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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

  tabBar:    { maxHeight: 62, backgroundColor: '#0a2240' },
  tabContent:{ paddingHorizontal: 10, paddingVertical: 10, alignItems: 'center' },
  tab: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 12, paddingVertical: 6,
    borderRadius: 20, marginRight: 8,
    backgroundColor: '#0f3460',
  },
  tabActive:      { backgroundColor: '#e94560' },
  tabEmoji:       { fontSize: 13, marginRight: 4 },
  tabLabel:       { color: '#8899bb', fontSize: 12, fontWeight: '600' },
  tabLabelActive: { color: '#fff' },

  listContent: { padding: 12, paddingBottom: 30 },

  tierRow: {
    flexDirection: 'row', alignItems: 'flex-start', marginBottom: 8,
  },
  tierBadge: {
    width: 40, minHeight: 40, borderRadius: 8,
    justifyContent: 'center', alignItems: 'center',
    marginRight: 10, marginTop: 2,
  },
  tierLetter: { fontSize: 18, fontWeight: 'bold' },

  chipsWrap: { flex: 1, flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    borderWidth: 1.5, borderRadius: 6,
    paddingHorizontal: 7, paddingVertical: 3,
    margin: 2, backgroundColor: '#0a2240',
  },
  chipText: { color: '#ddeeff', fontSize: 11, fontWeight: '500' },

  legend: {
    flexDirection: 'row', justifyContent: 'center',
    marginTop: 16, flexWrap: 'wrap',
  },
  legendItem:   { flexDirection: 'row', alignItems: 'center', marginHorizontal: 8, marginBottom: 6 },
  legendBadge:  { width: 24, height: 24, borderRadius: 4, justifyContent: 'center', alignItems: 'center', marginRight: 4 },
  legendLetter: { fontSize: 12, fontWeight: 'bold' },
  legendDesc:   { color: '#8899bb', fontSize: 11 },
});
