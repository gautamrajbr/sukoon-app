import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from '../utils/firebase';
import { signOut } from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const moods = [
  { emoji: '🍃', label: 'Struggling', color: '#E0E7E0' },
  { emoji: '🌪️', label: 'Overwhelmed', color: '#F2F2F2' },
  { emoji: '☁️', label: 'Okay', color: '#F5F5ED' },
  { emoji: '🌤️', label: 'Good', color: '#EDF1EB' },
  { emoji: '☀️', label: 'Great', color: '#F9FBF9' },
];

export default function MoodCheck({ navigation }: any) {
  const handleLogout = async () => {
    try {
      await signOut(auth);
      await GoogleSignin.signOut();
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={[styles.blob, styles.blobTopRight]} />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <MaterialCommunityIcons name="logout" size={18} color="#8BA888" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View style={styles.textSection}>
            <Text style={styles.titleText}>How are you{'\n'}<Text style={styles.italicText}>feeling</Text> today?</Text>
            <View style={styles.wellnessDot} />
            <Text style={styles.subtitle}>
              Take a mindful moment for yourself. There are no right or wrong answers.
            </Text>
          </View>

          <View style={styles.grid}>
            {moods.map((mood, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.card}
                onPress={() => navigation.navigate('Chat')}
                activeOpacity={0.8}
              >
                <View style={[styles.emojiCircle, { backgroundColor: mood.color }]}>
                  <Text style={styles.emoji}>{mood.emoji}</Text>
                </View>
                <Text style={styles.label}>{mood.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity 
            style={styles.skipButton}
            onPress={() => navigation.navigate('Chat')}
          >
            <Text style={styles.skipText}>Skip for now</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5ED',
  },
  blob: {
    position: 'absolute',
    backgroundColor: '#8BA888',
    opacity: 0.1,
    borderRadius: 300,
  },
  blobTopRight: {
    width: 350,
    height: 350,
    top: -100,
    right: -100,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    alignItems: 'flex-end',
    height: 60,
    justifyContent: 'center',
  },
  logoutBtn: {
    padding: 10,
    opacity: 0.6,
  },
  container: {
    paddingHorizontal: 24,
    alignItems: 'center',
    paddingBottom: 40,
  },
  textSection: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  titleText: {
    fontFamily: 'Manrope_300Light',
    color: '#2C3E2D',
    fontSize: 36,
    lineHeight: 44,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  italicText: {
    color: '#4A6741',
    fontStyle: 'italic',
    fontFamily: 'Manrope_400Regular',
  },
  wellnessDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8BA888',
    marginVertical: 20,
    opacity: 0.5,
  },
  subtitle: {
    fontFamily: 'Manrope_400Regular',
    color: '#5C6B5D',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    opacity: 0.7,
    maxWidth: '80%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    width: '100%',
  },
  card: {
    width: (Dimensions.get('window').width - 80) / 2,
    aspectRatio: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#4A6741',
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 20,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  emojiCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emoji: {
    fontSize: 32,
  },
  label: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#4A6741',
    opacity: 0.8,
  },
  skipButton: {
    marginTop: 40,
    paddingVertical: 12,
  },
  skipText: {
    fontFamily: 'Manrope_600SemiBold',
    color: '#8BA888',
    fontSize: 14,
    letterSpacing: 1,
  },
});
