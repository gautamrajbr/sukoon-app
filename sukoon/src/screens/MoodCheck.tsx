import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export default function MoodCheck({ navigation }: any) {
  const moods = ['Calm', 'Anxious', 'Joyful', 'Tired', 'Reflective'];
  const [selected, setSelected] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backBtn}>Close</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>How are you feeling today?</Text>
        
        <View style={styles.moodsGrid}>
          {moods.map((mood) => (
             <TouchableOpacity 
               key={mood} 
               style={[styles.moodBtn, selected === mood && styles.selectedMoodBtn]}
               onPress={() => setSelected(mood)}
             >
               <Text style={[styles.moodText, selected === mood && styles.selectedMoodText]}>{mood}</Text>
             </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>What's on your mind?</Text>
        <TextInput 
           style={styles.input}
           multiline
           placeholder="Reflect here... (optional)"
           placeholderTextColor="#9CA3AF"
        />
      </View>

      <TouchableOpacity style={styles.saveBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.saveText}>Save Check-in</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 20, paddingTop: 60 },
  header: { alignItems: 'flex-end', marginBottom: 40 },
  backBtn: { color: '#64748B', fontSize: 16 },
  content: { flex: 1 },
  title: { fontSize: 32, fontWeight: 'bold', color: '#111827', marginBottom: 40, lineHeight: 40 },
  moodsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 40 },
  moodBtn: { paddingHorizontal: 24, paddingVertical: 16, borderRadius: 30, backgroundColor: '#F8FAFC', borderWidth: 1, borderColor: '#F1F5F9', marginRight: 10, marginBottom: 10 },
  selectedMoodBtn: { backgroundColor: '#6EE7B7', borderColor: '#6EE7B7' },
  moodText: { fontSize: 16, color: '#64748B' },
  selectedMoodText: { color: '#111827', fontWeight: '600' },
  label: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 16 },
  input: { backgroundColor: '#F8FAFC', borderRadius: 20, padding: 20, minHeight: 120, fontSize: 16, color: '#111827', textAlignVertical: 'top' },
  saveBtn: { backgroundColor: '#111827', padding: 20, borderRadius: 30, alignItems: 'center', marginBottom: 20 },
  saveText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' }
});
