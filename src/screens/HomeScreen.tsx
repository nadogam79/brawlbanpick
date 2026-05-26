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
  onCompo: () => void;
}

export default function HomeScreen({ onSelectMode, onTierList, onCompo }: Props) {
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

        {/* 하단 버튼 행 */}
        <View style={styles.bottomRow}>
          <TouchableOpacity style={[styles.bottomBtn, { flex: 1, marginRight: 8 }]} onPress={onTierList} activeOpacity={0.75}>
            <Text style={styles.bottomBtnEmoji}>📊</Text>
            <View>
              <Text style={styles.bottomBtnTitle}>티어리스트</Text>
              <Text style={styles.bottomBtnSub}>브롤러 강도 확인</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.bottomBtn, { flex: 1 }]} onPress={onCompo} activeOpacity={0.75}>
            <Text style={styles.bottomBtnEmoji}>🧪</Text>
            <View>
              <Text style={styles.bottomBtnTitle}>조합 테스트</Text>
              <Text style={styles.bottomBtnSub}>조합 완성도 측정</Text>
            </View>
          </TouchableOpacity>
        </View>
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

  bottomRow: {
    flexDirection: 'row',
    marginTop: 6,
  },
  bottomBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f3460',
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderColor: '#1a4a80',
  },
  bottomBtnEmoji: { fontSize: 28, marginRight: 10 },
  bottomBtnTitle: { color: '#fff', fontSize: 14, fontWeight: 'bold', marginBottom: 2 },
  bottomBtnSub:   { color: '#8899bb', fontSize: 11 },
});
