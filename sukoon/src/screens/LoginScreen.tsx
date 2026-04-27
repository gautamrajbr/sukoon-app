import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Dimensions, Platform, Image, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth } from '../utils/firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAppStore } from '../store/useAppStore';
import { theme } from '../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';

const { width, height } = Dimensions.get('window');

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
    <View style={styles.mainContainer}>
      <Video
        source={require('../../assets/bg-1.mp4')}
        style={styles.backgroundVideo}
        shouldPlay
        isLooping
        isMuted
        resizeMode={ResizeMode.COVER}
        progressUpdateIntervalMillis={5000} // Reduce overhead
      />
      
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoCircle}>
              <MaterialCommunityIcons name="leaf" size={38} color="#4A6741" />
            </View>
            <Text style={styles.brandName}>S U K O O N</Text>
          </View>

          <View style={styles.textSection}>
            <Text style={styles.titleText}>Breathe{'\n'}in peace</Text>
            <View style={styles.wellnessDot} />
            <Text style={styles.description}>
              Find your inner calm and wellness daily.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.button, loading && styles.disabled]} 
            onPress={handleGoogleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <View style={styles.buttonContent}>
                <View style={styles.googleIconContainer}>
                  <Image 
                    source={require('../../assets/googel-icon.png')} 
                    style={styles.googleLogo} 
                  />
                </View>
                <Text style={styles.buttonText}>Continue with Google</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  brandName: {
    fontFamily: 'Manrope_400Regular',
    color: '#333333',
    marginTop: 20,
    letterSpacing: 8,
    fontSize: 16,
    fontWeight: '400',
  },
  textSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  titleText: {
    fontFamily: 'Manrope_300Light',
    color: '#4A6741',
    textAlign: 'center',
    fontSize: 48,
    lineHeight: 56,
    letterSpacing: -1,
  },
  wellnessDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A6741',
    marginVertical: 30,
    opacity: 0.6,
  },
  description: {
    fontFamily: 'Manrope_400Regular',
    color: '#444444',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 26,
    maxWidth: '80%',
    opacity: 0.9,
  },
  footer: {
    paddingBottom: 60,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4A6741',
    width: '100%',
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#4A6741',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  googleIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  googleLogo: {
    width: 18,
    height: 18,
  },
  buttonText: {
    fontFamily: 'Manrope_500Medium',
    fontSize: 16,
    color: '#FFFFFF',
  },
  disabled: {
    opacity: 0.7,
  },
});
