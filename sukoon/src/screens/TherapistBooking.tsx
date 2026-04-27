import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function TherapistBooking({ navigation }: any) {
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);

  const therapists = [
    { id: 1, name: 'Dr. Sarah', title: 'Clinical Psychologist', slots: ['10:00 AM', '02:00 PM', '04:30 PM'] },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backBtn}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Book a Session</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.freeSessionCard}>
          <Text style={styles.freeText}>Your first session is 100% Free</Text>
          <Text style={styles.freeSub}>Take the first step towards healing without any cost.</Text>
        </View>

        {therapists.map(t => (
          <View key={t.id} style={styles.therapistCard}>
            <Text style={styles.tName}>{t.name}</Text>
            <Text style={styles.tTitle}>{t.title}</Text>
            
            <Text style={styles.slotsTitle}>Available Slots Today</Text>
            <View style={styles.slotContainer}>
              {t.slots.map((slot, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  style={[styles.slot, selectedSlot === idx && styles.selectedSlot]}
                  onPress={() => setSelectedSlot(idx)}
                >
                  <Text style={[styles.slotText, selectedSlot === idx && styles.selectedSlotText]}>{slot}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.bookBtn, selectedSlot === null && { opacity: 0.5 }]} 
          disabled={selectedSlot === null}
          onPress={() => {
            alert('Session Booked Successfully!');
            navigation.navigate('Chat');
          }}
        >
          <Text style={styles.bookBtnText}>Confirm Booking</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 60, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  backBtn: { fontSize: 16, color: '#6EE7B7', marginRight: 15 },
  title: { fontSize: 20, fontWeight: '600', color: '#111827' },
  content: { padding: 20 },
  freeSessionCard: { backgroundColor: '#EDE9FE', padding: 16, borderRadius: 12, marginBottom: 24 },
  freeText: { fontSize: 16, fontWeight: 'bold', color: '#5B21B6' },
  freeSub: { fontSize: 14, color: '#5B21B6', marginTop: 4 },
  therapistCard: { borderWidth: 1, borderColor: '#F3F4F6', borderRadius: 12, padding: 16 },
  tName: { fontSize: 18, fontWeight: '600', color: '#111827' },
  tTitle: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  slotsTitle: { fontSize: 14, fontWeight: '500', color: '#111827', marginBottom: 10 },
  slotContainer: { flexDirection: 'row', flexWrap: 'wrap' },
  slot: { borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 20, paddingVertical: 8, paddingHorizontal: 16, marginRight: 10, marginBottom: 10 },
  selectedSlot: { backgroundColor: '#6EE7B7', borderColor: '#6EE7B7' },
  slotText: { color: '#374151' },
  selectedSlotText: { color: '#111827', fontWeight: '500' },
  footer: { padding: 20, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  bookBtn: { backgroundColor: '#111827', padding: 16, borderRadius: 12, alignItems: 'center' },
  bookBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '600' }
});
