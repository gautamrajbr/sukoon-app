import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LanguageSelection({ navigation }: any) {
  const languages = [
    { id: 'hindi', name: 'Hindi', char: 'अ' },
    { id: 'tamil', name: 'Tamil', char: 'त' },
    { id: 'english', name: 'English', char: 'A' },
  ];

  return (
    <ImageBackground 
      source={require('../../assets/sanctuary_bg.png')} 
      style={styles.mainContainer}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.logoCircle}>
            <MaterialCommunityIcons name="leaf" size={18} color="#4A6741" />
          </View>
          <Text style={styles.brandName}>SUKOON</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>You can talk{'\n'}freely here.</Text>
          <View style={styles.wellnessDot} />
          <Text style={styles.subtitle}>
            Nothing leaves this space. Choose your preferred language to begin.
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          {languages.map((lang) => (
            <TouchableOpacity 
              key={lang.id}
              style={styles.languageButton}
              onPress={() => navigation.navigate('Chat')}
              activeOpacity={0.8}
            >
              <View style={styles.langLeft}>
                <View style={styles.charCircle}>
                  <Text style={styles.charText}>{lang.char}</Text>
                </View>
                <View style={styles.textDivider} />
                <Text style={styles.languageName}>{lang.name.toUpperCase()}</Text>
              </View>
              <View style={styles.arrowCircle}>
                <MaterialCommunityIcons name="arrow-right" size={16} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <View style={styles.lockIcon}>
            <MaterialCommunityIcons name="lock-outline" size={12} color="#4A6741" />
            <Text style={styles.footerText}>ENCRYPTED SANCTUARY</Text>
          </View>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#F5F5ED',
  },
  container: {
    flex: 1,
    paddingHorizontal: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    gap: 12,
  },
  logoCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandName: {
    fontFamily: 'Manrope_600SemiBold',
    color: '#4A6741',
    letterSpacing: 4,
    fontSize: 10,
    opacity: 0.8,
  },
  content: {
    marginTop: 50,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Manrope_300Light',
    color: '#2C3E2D',
    fontSize: 34,
    lineHeight: 42,
    textAlign: 'center',
    letterSpacing: -1,
  },
  wellnessDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8BA888',
    marginVertical: 24,
    opacity: 0.6,
  },
  subtitle: {
    fontFamily: 'Manrope_400Regular',
    color: '#5C6B5D',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 22,
    maxWidth: '85%',
    opacity: 0.7,
  },
  buttonContainer: {
    marginTop: 60,
    gap: 16,
  },
  languageButton: {
    height: 72,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 36,
    borderWidth: 1,
    borderColor: 'rgba(74, 103, 65, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 8,
    paddingRight: 20,
  },
  langLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  charCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#4A6741',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  charText: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 20,
    color: '#4A6741',
  },
  textDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(74, 103, 65, 0.15)',
    marginHorizontal: 16,
  },
  languageName: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#2C3E2D',
    letterSpacing: 2,
  },
  arrowCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4A6741',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  lockIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    opacity: 0.5,
  },
  footerText: {
    fontFamily: 'Manrope_600SemiBold',
    color: '#4A6741',
    fontSize: 9,
    letterSpacing: 2,
  },
});
