import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }: any) {
  // In a real app, this would trigger Firebase Google Sign-In
  const handleLogin = () => {
    navigation.replace('Chat');
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcome}>Welcome home.</Text>
        <Text style={styles.subtitle}>Take a deep breath. You're in a safe space.</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 30,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: '#64748B',
    lineHeight: 28,
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#6EE7B7',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#E0F2FE',
  },
  buttonText: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '600',
  }
});
