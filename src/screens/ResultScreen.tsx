import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { RootStackParamList } from '../../App';
import brawlers from '../data/brawlers.json';
import { useHistoryStore } from '../store/historyStore';
import { useSessionStore } from '../store/sessionStore';
import { analyzeSynergy } from '../utils/synergyAnalyzer';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export default function ResultScreen({ route, navigation }: Props) {
  const { sessionId } = route.params;
  const { sessions } = useHistoryStore();
  const { session: liveSession, resetSession } = useSessionStore();

  const session = sessions.find((s) => s.id === sessionId) ?? liveSession;
  if (!session) {
    return (
      <View style={styles.center}>
        <Text style={styles.empty}>세션을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const bluePicks = session.picks.filter((p) => p.team === 'blue').map((p) => p.brawlerId);
  const redPicks = session.picks.filter((p) => p.team === 'red').map((p) => p.brawlerId);
  const blueSynergy = analyzeSynergy(bluePicks);
  const redSynergy = analyzeSynergy(redPicks);

  function getName(id: string) {
    return brawlers.find((b) => b.id === id)?.name ?? id;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>밴픽 결과 · {session.mode}</Text>

      <View style={styles.section}>
        <Text style={styles.label}>🚫 밴 ({session.bans.length})</Text>
        <Text style={styles.chips}>{session.bans.map(getName).join('  ·  ')}</Text>
      </View>

      <View style={styles.teamRow}>
        <View style={[styles.teamBox, styles.blue]}>
          <Text style={styles.teamTitle}>🔵 블루팀</Text>
          {bluePicks.map((id) => (
            <Text key={id} style={styles.pickName}>{getName(id)}</Text>
          ))}
          <Text style={styles.synergyScore}>시너지 {blueSynergy.score}점</Text>
          {blueSynergy.tags.map((t) => (
            <Text key={t} style={styles.synergyTag}>{t}</Text>
          ))}
        </View>

        <View style={[styles.teamBox, styles.red]}>
          <Text style={styles.teamTitle}>🔴 레드팀</Text>
          {redPicks.map((id) => (
            <Text key={id} style={styles.pickName}>{getName(id)}</Text>
          ))}
          <Text style={styles.synergyScore}>시너지 {redSynergy.score}점</Text>
          {redSynergy.tags.map((t) => (
            <Text key={t} style={styles.synergyTag}>{t}</Text>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.homeBtn}
        onPress={() => {
          resetSession();
          navigation.popToTop();
        }}
      >
        <Text style={styles.homeBtnText}>홈으로</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  empty: { color: '#888' },
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  section: { marginBottom: 16 },
  label: { color: '#aaa', fontSize: 13, marginBottom: 6 },
  chips: { color: '#e94560', fontSize: 14 },
  teamRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  teamBox: { flex: 1, borderRadius: 10, padding: 12 },
  blue: { backgroundColor: '#1a3a5c' },
  red: { backgroundColor: '#5c1a1a' },
  teamTitle: { color: '#fff', fontWeight: 'bold', fontSize: 15, marginBottom: 8 },
  pickName: { color: '#fff', fontSize: 13, marginBottom: 4 },
  synergyScore: { color: '#FFD700', fontWeight: 'bold', marginTop: 8 },
  synergyTag: { color: '#aaa', fontSize: 12 },
  homeBtn: {
    backgroundColor: '#e94560',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },
  homeBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
