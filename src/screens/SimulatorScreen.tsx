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
import { analyzeSynergy } from '../utils/synergyAnalyzer';
import { recommend } from '../utils/recommendEngine';

type Props = NativeStackScreenProps<RootStackParamList, 'Simulator'>;

export default function SimulatorScreen({ route }: Props) {
  const { mode } = route.params;
  const [blue, setBlue] = useState<string[]>([]);
  const [red, setRed] = useState<string[]>([]);
  const [activeTeam, setActiveTeam] = useState<'blue' | 'red'>('blue');

  const picked = new Set([...blue, ...red]);
  const available = brawlers.filter((b) => !picked.has(b.id));

  const recs = recommend(mode, [], activeTeam === 'blue' ? blue : red, activeTeam === 'blue' ? red : blue);
  const blueSynergy = analyzeSynergy(blue);
  const redSynergy = analyzeSynergy(red);

  function addPick(id: string) {
    if (activeTeam === 'blue' && blue.length < 3) setBlue([...blue, id]);
    else if (activeTeam === 'red' && red.length < 3) setRed([...red, id]);
  }

  function removePick(team: 'blue' | 'red', id: string) {
    if (team === 'blue') setBlue(blue.filter((b) => b !== id));
    else setRed(red.filter((r) => r !== id));
  }

  function getName(id: string) {
    return brawlers.find((b) => b.id === id)?.name ?? id;
  }

  return (
    <View style={styles.container}>
      <View style={styles.teamToggle}>
        {(['blue', 'red'] as const).map((team) => (
          <TouchableOpacity
            key={team}
            style={[styles.toggleBtn, activeTeam === team && styles.toggleActive]}
            onPress={() => setActiveTeam(team)}
          >
            <Text style={styles.toggleText}>
              {team === 'blue' ? '🔵 블루' : '🔴 레드'} ({(team === 'blue' ? blue : red).length}/3)
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.teamRow}>
        {(['blue', 'red'] as const).map((team) => {
          const picks = team === 'blue' ? blue : red;
          const synergy = team === 'blue' ? blueSynergy : redSynergy;
          return (
            <View key={team} style={[styles.teamBox, team === 'blue' ? styles.blueBox : styles.redBox]}>
              <Text style={styles.teamTitle}>{team === 'blue' ? '🔵' : '🔴'} {synergy.score}점</Text>
              {picks.map((id) => (
                <TouchableOpacity key={id} onPress={() => removePick(team, id)}>
                  <Text style={styles.pickChip}>{getName(id)} ✕</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
        })}
      </View>

      <Text style={styles.recTitle}>추천 ({activeTeam === 'blue' ? '블루' : '레드'})</Text>
      <ScrollView horizontal style={styles.recRow} showsHorizontalScrollIndicator={false}>
        {recs.map((r) => (
          <TouchableOpacity key={r.brawlerId} style={styles.recChip} onPress={() => addPick(r.brawlerId)}>
            <Text style={styles.recName}>{r.name}</Text>
            <Text style={styles.recReason}>{r.reason}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={available}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.brawlerBtn} onPress={() => addPick(item.id)}>
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
  teamToggle: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  toggleBtn: { flex: 1, padding: 10, backgroundColor: '#0f3460', borderRadius: 8, alignItems: 'center' },
  toggleActive: { backgroundColor: '#e94560' },
  toggleText: { color: '#fff', fontWeight: 'bold' },
  teamRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  teamBox: { flex: 1, borderRadius: 8, padding: 10 },
  blueBox: { backgroundColor: '#1a3a5c' },
  redBox: { backgroundColor: '#5c1a1a' },
  teamTitle: { color: '#FFD700', fontWeight: 'bold', marginBottom: 6 },
  pickChip: { color: '#fff', fontSize: 13, marginBottom: 4 },
  recTitle: { color: '#aaa', fontSize: 12, marginBottom: 4 },
  recRow: { maxHeight: 70, marginBottom: 10 },
  recChip: { backgroundColor: '#0f3460', borderRadius: 8, padding: 8, marginRight: 8, minWidth: 72, alignItems: 'center' },
  recName: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  recReason: { color: '#aaa', fontSize: 10 },
  grid: { gap: 6 },
  brawlerBtn: { flex: 1, margin: 3, backgroundColor: '#0f3460', borderRadius: 8, padding: 10, alignItems: 'center' },
  brawlerName: { color: '#fff', fontSize: 11 },
});
