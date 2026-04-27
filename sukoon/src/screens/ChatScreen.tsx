import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,

  Platform,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { auth } from '../utils/firebase';
import axios from 'axios';

const { width } = Dimensions.get('window');
const API_URL = 'http://192.168.29.49:3000';

export default function ChatScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const scrollViewRef = useRef<ScrollView>(null);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: "Hello. I'm here for you. Whatever you're carrying today, it's safe to set it down here. How are you feeling right now?",
      sender: 'ai',
      timestamp: new Date().toISOString()
    }
  ]);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );

    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  // Auto-scroll to bottom when messages change or keyboard visibility changes
  useEffect(() => {
    if (scrollViewRef.current) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages, isKeyboardVisible]);

  const sendMessage = async () => {
    if (!inputText.trim() || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      text: inputText.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('No authenticated user');
      }

      const idToken = await user.getIdToken();
      const response = await axios.post(`${API_URL}/chat`, {
        message: userMsg.text,
        language: 'English'
      }, {
        headers: {
          'Authorization': `Bearer ${idToken}`
        }
      });

      const aiMsg = {
        id: (Date.now() + 1).toString(),
        text: response.data.reply,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        text: "I'm having a little trouble connecting. But I'm still here with you.",
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/sanctuary_bg.png')}
      style={styles.mainContainer}
      resizeMode="cover"
    >
      {/* Main content area with padding for safe area */}
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerIcon}>
            <MaterialCommunityIcons name="arrow-left" color="#4A6741" size={24} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>S A N C T U A R Y</Text>
            <View style={styles.statusDot} />
          </View>
          <TouchableOpacity style={styles.headerIcon}>
            <MaterialCommunityIcons name="spa-outline" color="#4A6741" size={22} />
          </TouchableOpacity>
        </View>

        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? insets.top : 0}
        >
          <ScrollView
            ref={scrollViewRef}
            style={styles.messageArea}
            contentContainerStyle={styles.messageContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg) => (
              <View
                key={msg.id}
                style={[
                  styles.messageRow,
                  msg.sender === 'user' ? styles.rowUser : styles.rowAI
                ]}
              >
                {msg.sender === 'ai' && (
                  <View style={styles.aiAvatar}>
                    <MaterialCommunityIcons name="leaf" size={14} color="#8BA888" />
                  </View>
                )}
                <View style={[
                  styles.bubble,
                  msg.sender === 'user' ? styles.bubbleUser : styles.bubbleAI
                ]}>
                  <Text style={[
                    styles.messageText,
                    msg.sender === 'user' ? styles.textUser : styles.textAI
                  ]}>
                    {msg.text}
                  </Text>
                </View>
              </View>
            ))}
            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="small" color="#8BA888" />
              </View>
            )}
          </ScrollView>

          {/* Input container - always at bottom with consistent padding */}
          <View style={[
            styles.inputWrapper,
            !isKeyboardVisible && { paddingBottom: insets.bottom }
          ]}>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholder="Share your thoughts..."
                placeholderTextColor="rgba(74, 103, 65, 0.4)"
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                onPress={sendMessage}
                style={[styles.sendBtn, !inputText.trim() && styles.sendBtnDisabled]}
                disabled={!inputText.trim() || loading}
              >
                <MaterialCommunityIcons name="arrow-up" color="#FFFFFF" size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
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
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(74, 103, 65, 0.08)',
  },
  headerIcon: {
    padding: 8,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitle: {
    fontFamily: 'Manrope_600SemiBold',
    fontSize: 14,
    color: '#4A6741',
    letterSpacing: 3,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#8BA888',
  },
  keyboardAvoid: {
    flex: 1,
  },
  messageArea: {
    flex: 1,
  },
  messageContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 10,
  },
  messageRow: {
    marginBottom: 20,
    maxWidth: '85%',
  },
  rowUser: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  rowAI: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  aiAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginTop: 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  bubbleUser: {
    backgroundColor: '#4A6741',
    borderBottomRightRadius: 4,
  },
  bubbleAI: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontFamily: 'Manrope_400Regular',
    fontSize: 15,
    lineHeight: 22,
  },
  textUser: {
    color: '#FFFFFF',
  },
  textAI: {
    color: '#2C3E2D',
  },
  loadingContainer: {
    paddingVertical: 10,
    alignItems: 'flex-start',
    marginLeft: 42,
  },
  inputWrapper: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 12, // Default padding when keyboard is visible
    backgroundColor: 'rgba(245, 245, 237, 0.5)',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(74, 103, 65, 0.1)',
    minHeight: 52,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  input: {
    flex: 1,
    fontFamily: 'Manrope_400Regular',
    fontSize: 15,
    color: '#2C3E2D',
    paddingTop: 10,
    paddingBottom: 10,
    maxHeight: 120,
  },
  sendBtn: {
    backgroundColor: '#4A6741',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginBottom: 2,
  },
  sendBtnDisabled: {
    backgroundColor: 'rgba(74, 103, 65, 0.2)',
  },
});