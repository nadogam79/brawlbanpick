import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import modes from '../data/modes.json';
import { useTierList } from '../hooks/useTierList';

const TIER_COLOR: Record<string, string> = {
  S: '#FF6B6B',
  A: '#FFA94D',
  B: '#FFD43B',
  C: '#74C0FC',
};

export default function TierListScreen() {
  const [selectedMode, setSelectedMode] = useState(modes[0].id);
  const tierMap = useTierList(selectedMode);

  return (
    <View style={styles.container}>
      <FlatList
        data={modes}
        horizontal
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.modeTab, selectedMode === item.id && styles.modeTabActive]}
            onPress={() => setSelectedMode(item.id)}
          >
            <Text style={styles.modeTabText}>{item.emoji} {item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.modeRow}
        showsHorizontalScrollIndicator={false}
      />

      <FlatList
        data={['S', 'A', 'B', 'C']}
        keyExtractor={(tier) => tier}
        renderItem={({ item: tier }) => (
          <View style={styles.tierRow}>
            <View style={[styles.tierBadge, { backgroundColor: TIER_COLOR[tier] }]}>
              <Text style={styles.tierLabel}>{tier}</Text>
            </View>
            <View style={styles.brawlerRow}>
              {(tierMap[tier] ?? []).map((entry) => (
                <View key={entry.brawlerId} style={styles.brawlerChip}>
                  <Text style={styles.brawlerName}>{entry.name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12 },
  modeRow: { maxHeight: 44, marginBottom: 12 },
  modeTab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#0f3460',
  },
  modeTabActive: { backgroundColor: '#e94560' },
  modeTabText: { color: '#fff', fontSize: 13 },
  tierRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 10 },
  tierBadge: {
    width: 36,
    height: 36,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  tierLabel: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  brawlerRow: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  brawlerChip: {
    backgroundColor: '#0f3460',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  brawlerName: { color: '#fff', fontSize: 12 },
});
