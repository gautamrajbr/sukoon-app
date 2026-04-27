import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LanguageSelection({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Your Language</Text>
      
      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.nativeText}>हिंदी</Text>
        <Text style={styles.englishText}>Hindi</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.nativeText}>தமிழ்</Text>
        <Text style={styles.englishText}>Tamil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#111827',
    marginBottom: 40,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#F8FAFC', // Very light gray/blue
    width: '100%',
    padding: 30,
    borderRadius: 24,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#6EE7B7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  nativeText: {
    fontSize: 24,
    color: '#111827',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  englishText: {
    fontSize: 16,
    color: '#64748B',
  }
});
