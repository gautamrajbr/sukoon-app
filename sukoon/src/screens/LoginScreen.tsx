import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth } from '../utils/firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAppStore } from '../store/useAppStore';

export default function LoginScreen({ navigation }: any) {
  const [loading, setLoading] = useState(false);
  const { setUser } = useAppStore();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '116683608516-fsb3ojc3n6cmvskp1a5ar8pht1co3sfs.apps.googleusercontent.com',
    });
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // Depending on the version of google-signin, the idToken could be in userInfo.data.idToken or userInfo.idToken
      const idToken = (userInfo as any).data?.idToken || (userInfo as any).idToken;
      
      if (idToken) {
        const googleCredential = GoogleAuthProvider.credential(idToken);
        const userCredential = await signInWithCredential(auth, googleCredential);
        setUser(userCredential.user);
        navigation.replace('LanguageSelection');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Sukoon</Text>
      <Text style={styles.subtitle}>Your safe space for emotional wellness.</Text>

      <TouchableOpacity 
        style={[styles.googleButton, loading && styles.disabled]} 
        onPress={handleGoogleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </Text>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 40,
  },
  googleButton: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  disabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    color: '#111827',
    fontWeight: '500',
  },
});
