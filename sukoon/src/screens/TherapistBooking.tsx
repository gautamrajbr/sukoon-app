import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

export default function TherapistBooking({ navigation }: any) {
  const slots = ['10:00 AM', '11:30 AM', '2:00 PM', '4:00 PM'];
  const dates = ['Mon 12', 'Tue 13', 'Wed 14'];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backBtn}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Session</Text>
        <View style={{width: 40}} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatarPlaceholder} />
          <Text style={styles.name}>Dr. Sarah Ahmed</Text>
          <Text style={styles.title}>Holistic Wellness Therapist</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>First Session Free</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Select Date</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollRow}>
          {dates.map((date, idx) => (
            <TouchableOpacity key={idx} style={[styles.dateCard, idx === 0 && styles.selectedCard]}>
              <Text style={[styles.dateText, idx === 0 && styles.selectedText]}>{date}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.sectionTitle}>Available Slots</Text>
        <View style={styles.slotsGrid}>
          {slots.map((slot, idx) => (
             <TouchableOpacity key={idx} style={styles.slotCard}>
               <Text style={styles.slotText}>{slot}</Text>
             </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
         <TouchableOpacity style={styles.confirmBtn} onPress={() => alert('Session Confirmed!')}>
            <Text style={styles.confirmText}>Confirm Session</Text>
         </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { padding: 20, paddingTop: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  backBtn: { color: '#64748B', fontSize: 16 },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#111827' },
  content: { padding: 20 },
  profileCard: { backgroundColor: '#F8FAFC', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 30 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0F2FE', marginBottom: 16 },
  name: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 4 },
  title: { fontSize: 16, color: '#64748B', marginBottom: 16 },
  badge: { backgroundColor: '#D1FAE5', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  badgeText: { color: '#065F46', fontWeight: '600', fontSize: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111827', marginBottom: 16 },
  scrollRow: { marginBottom: 30 },
  dateCard: { paddingHorizontal: 24, paddingVertical: 16, borderRadius: 20, backgroundColor: '#F8FAFC', marginRight: 12 },
  selectedCard: { backgroundColor: '#6EE7B7' },
  dateText: { color: '#64748B', fontSize: 16 },
  selectedText: { color: '#111827', fontWeight: '600' },
  slotsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  slotCard: { width: '48%', backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#E2E8F0', paddingVertical: 16, borderRadius: 16, alignItems: 'center', marginBottom: 12 },
  slotText: { color: '#111827', fontSize: 16 },
  footer: { padding: 20, paddingBottom: 40, borderTopWidth: 1, borderTopColor: '#F3F4F6' },
  confirmBtn: { backgroundColor: '#111827', padding: 20, borderRadius: 30, alignItems: 'center' },
  confirmText: { color: '#FFFFFF', fontSize: 18, fontWeight: '600' }
});
