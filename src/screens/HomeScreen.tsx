import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const MODES = [
  { id: 'bounty',     name: '바운티',  emoji: '⭐' },
  { id: 'brawl_ball', name: '브롤 볼', emoji: '⚽' },
  { id: 'gem_grab',   name: '젬 그랩', emoji: '💎' },
  { id: 'heist',      name: '하이스트', emoji: '🏦' },
  { id: 'hot_zone',   name: '핫 존',   emoji: '🔥' },
  { id: 'knockout',   name: '녹아웃',  emoji: '🥊' },
];

interface Props {
  onSelectMode: (modeName: string) => void;
  onTierList: () => void;
}

export default function HomeScreen({ onSelectMode, onTierList }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>🎮 브롤 밴픽</Text>
        <Text style={styles.sub}>경쟁전 모드를 선택하세요</Text>

        {/* 모드 그리드 */}
        <View style={styles.grid}>
          {MODES.map((mode) => (
            <TouchableOpacity
              key={mode.id}
              style={styles.card}
              onPress={() => onSelectMode(mode.name)}
              activeOpacity={0.75}
            >
              <Text style={styles.emoji}>{mode.emoji}</Text>
              <Text style={styles.name}>{mode.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* 티어리스트 버튼 */}
        <TouchableOpacity style={styles.tierBtn} onPress={onTierList} activeOpacity={0.75}>
          <Text style={styles.tierBtnEmoji}>📊</Text>
          <View>
            <Text style={styles.tierBtnTitle}>티어리스트</Text>
            <Text style={styles.tierBtnSub}>모드별 브롤러 강도 확인</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#16213e' },
  content: { padding: 20, paddingTop: 40 },
  title: { color: '#fff', fontSize: 26, fontWeight: 'bold', marginBottom: 6 },
  sub: { color: '#8899bb', fontSize: 14, marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: {
    width: '48%',
    backgroundColor: '#0f3460',
    borderRadius: 14,
    paddingVertical: 26,
    alignItems: 'center',
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#1a4a80',
  },
  emoji: { fontSize: 38, marginBottom: 10 },
  name: { color: '#fff', fontSize: 15, fontWeight: '600' },

  tierBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f3460',
    borderRadius: 14,
    paddingVertical: 18,
    paddingHorizontal: 22,
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#1a4a80',
  },
  tierBtnEmoji: { fontSize: 34, marginRight: 16 },
  tierBtnTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  tierBtnSub:   { color: '#8899bb', fontSize: 12 },
});
