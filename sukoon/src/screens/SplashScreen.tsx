import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../constants/theme';

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
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    ...theme.typography.display,
    color: theme.colors.primary,
  },
  subtitle: {
    ...theme.typography.bodyLg,
    color: theme.colors.onSurfaceVariant,
    marginTop: 10,
  }
});
