import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export default function MoodCheck({ navigation }: any) {
  const { addMoodLog } = useAppStore();

  const moods = [
    { emoji: '😊', label: 'Great', value: 'great' },
    { emoji: '😌', label: 'Okay', value: 'okay' },
    { emoji: '😔', label: 'Low', value: 'low' },
    { emoji: '😰', label: 'Anxious', value: 'anxious' }
  ];

  const handleSelect = (mood: any) => {
    addMoodLog({ mood: mood.value, date: new Date().toISOString() });
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How are you feeling right now?</Text>
      <Text style={styles.subtitle}>Checking in with yourself is the first step.</Text>
      
      <View style={styles.grid}>
        {moods.map((mood, idx) => (
          <TouchableOpacity key={idx} style={styles.moodCard} onPress={() => handleSelect(mood)}>
            <Text style={styles.emoji}>{mood.emoji}</Text>
            <Text style={styles.label}>{mood.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20 },
  title: { fontSize: 24, fontWeight: '600', color: '#111827', textAlign: 'center', marginBottom: 10 },
  subtitle: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 40 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  moodCard: { backgroundColor: '#F9FAFB', width: '40%', padding: 20, borderRadius: 16, margin: 10, alignItems: 'center', borderWidth: 1, borderColor: '#F3F4F6' },
  emoji: { fontSize: 40, marginBottom: 10 },
  label: { fontSize: 16, fontWeight: '500', color: '#374151' }
});
