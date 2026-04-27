import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useAppStore } from '../store/useAppStore';

type Message = {
  id: number;
  text: string;
  sender: 'ai' | 'user';
  action?: 'book_therapist';
};

export default function ChatScreen({ navigation }: any) {
  const { language } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "I'm here for you. How are you feeling today?", sender: 'ai' }
  ]);
  const [input, setInput] = useState('');

  const quickReplies = ["I feel anxious", "Just checking in", "Need to breathe"];

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    // Add user message
    const newMsg: Message = { id: Date.now(), text, sender: 'user' };
    setMessages(prev => [...prev, newMsg]);
    setInput('');

    try {
      // Call backend API
      const res = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text, language }),
      });
      const data = await res.json();
      
      const aiMsg: Message = { id: Date.now()+1, text: data.reply || "I'm here. Take your time.", sender: 'ai' };
      setMessages(prev => [...prev, aiMsg]);
      
      if (text.toLowerCase().includes('anxious') || text.toLowerCase().includes('sad')) {
         setMessages(prev => [...prev, { id: Date.now()+2, text: "If you'd like, you can talk to a professional. The first session is free.", sender: 'ai', action: 'book_therapist' }]);
      }
    } catch (err) {
      console.log('Error contacting backend:', err);
      setMessages(prev => [...prev, { id: Date.now()+1, text: "I'm having trouble connecting right now, but I'm listening. Please try again in a moment.", sender: 'ai' }]);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Sukoon AI</Text>
        <TouchableOpacity onPress={() => navigation.navigate('MoodCheck')}>
            <Text style={{color: '#6EE7B7'}}>Mood</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.chatContainer}>
        {messages.map((msg) => (
          <View key={msg.id} style={[styles.bubbleWrapper, msg.sender === 'user' ? styles.userWrapper : styles.aiWrapper]}>
            <View style={[styles.bubble, msg.sender === 'user' ? styles.userBubble : styles.aiBubble]}>
              <Text style={styles.messageText}>{msg.text}</Text>
            </View>
            {msg.action === 'book_therapist' && (
              <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('TherapistBooking')}>
                <Text style={styles.actionText}>Book a Session</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputArea}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.quickReplies}>
          {quickReplies.map((reply, idx) => (
            <TouchableOpacity key={idx} style={styles.chip} onPress={() => handleSend(reply)}>
              <Text style={styles.chipText}>{reply}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.inputRow}>
          <TextInput 
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#9CA3AF"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => handleSend(input)}
          />
          <TouchableOpacity style={styles.sendBtn} onPress={() => handleSend(input)}>
            <Text style={styles.sendText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 20, paddingTop: 60, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#F3F4F6', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#111827' },
  chatContainer: { padding: 20, paddingBottom: 40 },
  bubbleWrapper: { marginBottom: 16, maxWidth: '80%' },
  userWrapper: { alignSelf: 'flex-end' },
  aiWrapper: { alignSelf: 'flex-start' },
  bubble: { padding: 16, borderRadius: 24 },
  userBubble: { backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E0F2FE', borderBottomRightRadius: 4, shadowColor: '#6EE7B7', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 1 },
  aiBubble: { backgroundColor: '#F0FDF4', borderBottomLeftRadius: 4 }, // Soft Mint bg
  messageText: { fontSize: 16, color: '#111827', lineHeight: 24 },
  actionButton: { marginTop: 10, backgroundColor: '#6EE7B7', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20, alignSelf: 'flex-start' },
  actionText: { color: '#111827', fontWeight: '600' },
  inputArea: { padding: 16, backgroundColor: '#FFFFFF', borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  quickReplies: { marginBottom: 12 },
  chip: { backgroundColor: '#E0F2FE', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, marginRight: 10 },
  chipText: { color: '#0369A1', fontSize: 14, fontWeight: '500' },
  inputRow: { flexDirection: 'row', alignItems: 'center' },
  input: { flex: 1, backgroundColor: '#F9FAFB', borderRadius: 24, paddingHorizontal: 20, paddingVertical: 12, fontSize: 16, marginRight: 10, color: '#111827' },
  sendBtn: { backgroundColor: '#6EE7B7', borderRadius: 24, paddingHorizontal: 20, paddingVertical: 12 },
  sendText: { color: '#111827', fontWeight: '600' }
});
