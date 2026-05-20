import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { RootStackParamList } from '../../App';
import brawlers from '../data/brawlers.json';
import { useBanPick } from '../hooks/useBanPick';
import { useRecommend } from '../hooks/useRecommend';
import { useHistoryStore } from '../store/historyStore';

type Props = NativeStackScreenProps<RootStackParamList, 'BanPick'>;

const TEAM_COLOR: Record<string, string> = { blue: '#2196F3', red: '#f44336' };

export default function BanPickScreen({ navigation }: Props) {
  const { session, ban, pick, unavailable } = useBanPick();
  const { addSession } = useHistoryStore();
  const recommendations = useRecommend(session, 'blue');
  const [filter, setFilter] = useState('');

  if (!session) return null;

  const available = brawlers.filter(
    (b) =>
      !unavailable.has(b.id) &&
      b.name.toLowerCase().includes(filter.toLowerCase()),
  );

  function handleSelect(brawlerId: string) {
    if (!session) return;
    if (session.currentPhase === 'ban') {
      ban(brawlerId);
    } else if (session.currentPhase === 'pick') {
      pick(brawlerId);
    }
    if (session.currentPhase === 'done') {
      addSession(session);
      navigation.replace('Result', { sessionId: session.id });
    }
  }

  const phaseLabel = session.currentPhase === 'ban' ? '밴' : '픽';
  const teamLabel = session.currentTeam === 'blue' ? '🔵 블루팀' : '🔴 레드팀';

  return (
    <View style={styles.container}>
      <View style={[styles.phaseBar, { borderColor: TEAM_COLOR[session.currentTeam] }]}>
        <Text style={styles.phaseText}>
          {teamLabel} · {phaseLabel} 차례 ({session.currentPhase === 'ban' ? session.banCount : session.pickCount}/
          {session.currentPhase === 'ban' ? 6 : 6})
        </Text>
      </View>

      <ScrollView horizontal style={styles.banRow}>
        {session.bans.map((id) => {
          const b = brawlers.find((b) => b.id === id);
          return (
            <View key={id} style={styles.banChip}>
              <Text style={styles.banText}>{b?.name ?? id}</Text>
            </View>
          );
        })}
      </ScrollView>

      {session.currentPhase === 'pick' && recommendations.length > 0 && (
        <View style={styles.recommendBox}>
          <Text style={styles.recommendTitle}>추천</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recommendations.map((r) => (
              <TouchableOpacity
                key={r.brawlerId}
                style={styles.recommendChip}
                onPress={() => handleSelect(r.brawlerId)}
              >
                <Text style={styles.recommendName}>{r.name}</Text>
                <Text style={styles.recommendReason}>{r.reason}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <FlatList
        data={available}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.brawlerBtn}
            onPress={() => handleSelect(item.id)}
          >
            <Text style={styles.brawlerName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  phaseBar: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  phaseText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  banRow: { maxHeight: 40, marginBottom: 10 },
  banChip: {
    backgroundColor: '#c0392b',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 6,
    justifyContent: 'center',
  },
  banText: { color: '#fff', fontSize: 12 },
  recommendBox: { marginBottom: 10 },
  recommendTitle: { color: '#aaa', fontSize: 12, marginBottom: 4 },
  recommendChip: {
    backgroundColor: '#0f3460',
    borderRadius: 8,
    padding: 8,
    marginRight: 8,
    alignItems: 'center',
    minWidth: 72,
  },
  recommendName: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  recommendReason: { color: '#aaa', fontSize: 10, marginTop: 2 },
  grid: { gap: 6 },
  brawlerBtn: {
    flex: 1,
    margin: 3,
    backgroundColor: '#0f3460',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  brawlerName: { color: '#fff', fontSize: 11 },
});
