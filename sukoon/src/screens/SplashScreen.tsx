import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SplashScreen({ navigation }: any) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sukoon</Text>
      <Text style={styles.subtitle}>Your Digital Sanctuary</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#6EE7B7', // Soft Mint Green
    fontFamily: 'sans-serif',
  },
  subtitle: {
    fontSize: 18,
    color: '#111827',
    marginTop: 10,
    fontFamily: 'sans-serif',
  }
});
