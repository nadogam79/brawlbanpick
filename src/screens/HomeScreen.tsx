import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import modes from '../data/modes.json';
import { useHistoryStore } from '../store/historyStore';
import { useSessionStore } from '../store/sessionStore';
import type { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation }: Props) {
  const { sessions } = useHistoryStore();
  const { startSession } = useSessionStore();

  function handleModeSelect(modeId: string) {
    startSession(modeId);
    navigation.navigate('BanPick', { mode: modeId });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>모드 선택</Text>
      <FlatList
        data={modes}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.modeCard}
            onPress={() => handleModeSelect(item.id)}
          >
            <Text style={styles.modeEmoji}>{item.emoji}</Text>
            <Text style={styles.modeName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.grid}
      />

      <View style={styles.row}>
        <Text style={styles.sectionTitle}>최근 세션</Text>
        <TouchableOpacity onPress={() => navigation.navigate('TierList')}>
          <Text style={styles.tierLink}>티어리스트 →</Text>
        </TouchableOpacity>
      </View>

      {sessions.length === 0 ? (
        <Text style={styles.empty}>아직 세션 기록이 없습니다.</Text>
      ) : (
        <FlatList
          data={sessions.slice(0, 5)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.historyItem}
              onPress={() => navigation.navigate('Result', { sessionId: item.id })}
            >
              <Text style={styles.historyMode}>{item.mode}</Text>
              <Text style={styles.historyInfo}>
                밴 {item.bans.length}개 · 픽 {item.picks.length}개
              </Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
  grid: { gap: 12, paddingBottom: 16 },
  modeCard: {
    flex: 1,
    margin: 4,
    backgroundColor: '#0f3460',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modeEmoji: { fontSize: 32, marginBottom: 8 },
  modeName: { color: '#fff', fontSize: 14, fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  tierLink: { color: '#e94560', fontSize: 14 },
  empty: { color: '#888', textAlign: 'center', marginTop: 20 },
  historyItem: {
    backgroundColor: '#0f3460',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyMode: { color: '#fff', fontWeight: '600' },
  historyInfo: { color: '#aaa', fontSize: 12 },
});
