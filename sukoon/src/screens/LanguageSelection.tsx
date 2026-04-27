import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppStore } from '../store/useAppStore';

export default function LanguageSelection({ navigation }: any) {
  const { setLanguage } = useAppStore();

  const handleSelect = (lang: 'en' | 'hi' | 'ta') => {
    setLanguage(lang);
    navigation.replace('Chat');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose your language</Text>
      
      <TouchableOpacity style={styles.langBtn} onPress={() => handleSelect('hi')}>
        <Text style={styles.langText}>हिंदी (Hindi)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.langBtn} onPress={() => handleSelect('ta')}>
        <Text style={styles.langText}>தமிழ் (Tamil)</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.langBtn} onPress={() => handleSelect('en')}>
        <Text style={styles.langText}>English</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', padding: 20 },
  title: { fontSize: 24, fontWeight: '600', color: '#111827', marginBottom: 30 },
  langBtn: { backgroundColor: '#E0F2FE', width: '100%', padding: 16, borderRadius: 12, marginBottom: 16, alignItems: 'center' },
  langText: { fontSize: 18, color: '#0369A1', fontWeight: '500' }
});
