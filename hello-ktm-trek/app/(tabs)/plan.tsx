import { useState } from 'react'
import { View, Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'
import { useData } from '@/context/DataContext'
import { Colors } from '@/constants/Colors'
import { Layout } from '@/constants/Layout'
import { ActivityType } from '@/types'

const ACTIVITY_OPTIONS: ActivityType[] = [
  'Trekking', 'Helicopter Tour', 'Mountain Flight', 'Rafting',
  'Paragliding', 'Bungee Jumping', 'Cultural Tour', 'National Park Tour', 'Heritage Tour',
]

const BUDGET_OPTIONS = ['Under $500', '$500–$1,000', '$1,000–$2,000', '$2,000–$5,000', '$5,000+']

export default function PlanScreen() {
  const { destinations } = useData()
  const [selectedDestination, setSelectedDestination] = useState('')
  const [selectedActivities, setSelectedActivities] = useState<ActivityType[]>([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [groupSize, setGroupSize] = useState('')
  const [selectedBudget, setSelectedBudget] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

  const toggleActivity = (activity: ActivityType) => {
    setSelectedActivities((prev) =>
      prev.includes(activity) ? prev.filter((a) => a !== activity) : [...prev, activity]
    )
  }

  const handleSubmit = () => {
    if (!name || !email || !selectedDestination) {
      Alert.alert('Required fields', 'Please fill in your name, email, and destination.')
      return
    }
    Alert.alert('Enquiry Sent!', `Thank you ${name}! We'll be in touch within 24 hours.`)
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.title}>Plan Your Trip</Text>
        <Text style={styles.subtitle}>Tell us your dream adventure and we'll craft a personalised itinerary.</Text>
      </View>

      <FieldLabel>Destination</FieldLabel>
      <View style={styles.optionRow}>
        {destinations.map((d) => (
          <TouchableOpacity
            key={d.id}
            style={[styles.chip, selectedDestination === d.name && styles.chipActive]}
            onPress={() => setSelectedDestination(d.name)}
          >
            <Text style={[styles.chipText, selectedDestination === d.name && styles.chipTextActive]}>{d.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FieldLabel>Activities (select all that interest you)</FieldLabel>
      <View style={styles.optionRow}>
        {ACTIVITY_OPTIONS.map((a) => (
          <TouchableOpacity
            key={a}
            style={[styles.chip, selectedActivities.includes(a) && styles.chipActive]}
            onPress={() => toggleActivity(a)}
          >
            <Text style={[styles.chipText, selectedActivities.includes(a) && styles.chipTextActive]}>{a}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.row}>
        <View style={styles.halfField}>
          <FieldLabel>Start Date</FieldLabel>
          <TextInput style={styles.input} placeholder="YYYY-MM-DD" placeholderTextColor={Colors.textMuted} value={startDate} onChangeText={setStartDate} />
        </View>
        <View style={styles.halfField}>
          <FieldLabel>End Date</FieldLabel>
          <TextInput style={styles.input} placeholder="YYYY-MM-DD" placeholderTextColor={Colors.textMuted} value={endDate} onChangeText={setEndDate} />
        </View>
      </View>

      <FieldLabel>Group Size</FieldLabel>
      <TextInput style={styles.input} placeholder="Number of people" placeholderTextColor={Colors.textMuted} keyboardType="numeric" value={groupSize} onChangeText={setGroupSize} />

      <FieldLabel>Budget (per person)</FieldLabel>
      <View style={styles.optionRow}>
        {BUDGET_OPTIONS.map((b) => (
          <TouchableOpacity
            key={b}
            style={[styles.chip, selectedBudget === b && styles.chipActive]}
            onPress={() => setSelectedBudget(b)}
          >
            <Text style={[styles.chipText, selectedBudget === b && styles.chipTextActive]}>{b}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.divider} />
      <Text style={styles.sectionLabel}>Your Details</Text>

      <FieldLabel>Full Name *</FieldLabel>
      <TextInput style={styles.input} placeholder="Jane Smith" placeholderTextColor={Colors.textMuted} value={name} onChangeText={setName} />

      <FieldLabel>Email *</FieldLabel>
      <TextInput style={styles.input} placeholder="jane@example.com" placeholderTextColor={Colors.textMuted} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

      <FieldLabel>Phone</FieldLabel>
      <TextInput style={styles.input} placeholder="+1 555 000 0000" placeholderTextColor={Colors.textMuted} keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

      <FieldLabel>Additional Notes</FieldLabel>
      <TextInput style={[styles.input, styles.textarea]} placeholder="Any special requirements, fitness level, dietary needs…" placeholderTextColor={Colors.textMuted} multiline numberOfLines={4} value={message} onChangeText={setMessage} />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} activeOpacity={0.85}>
        <Text style={styles.submitButtonText}>Send Enquiry</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  )
}

function FieldLabel({ children }: { children: string }) {
  return <Text style={styles.fieldLabel}>{children}</Text>
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: Layout.padding.xl },
  header: {
    backgroundColor: Colors.primaryDark,
    paddingTop: 56,
    paddingBottom: Layout.padding.lg,
    paddingHorizontal: Layout.padding.md,
  },
  title: { fontSize: 24, fontWeight: '800', color: Colors.white, marginBottom: 4 },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.75)' },

  fieldLabel: { fontSize: 13, fontWeight: '600', color: Colors.text, marginTop: Layout.padding.md, marginBottom: Layout.padding.xs, paddingHorizontal: Layout.padding.md },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.padding.sm,
    marginHorizontal: Layout.padding.md,
    fontSize: 14,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textarea: { minHeight: 90, textAlignVertical: 'top' },
  optionRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.padding.xs, paddingHorizontal: Layout.padding.md },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: Layout.borderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 13, color: Colors.textSecondary },
  chipTextActive: { color: Colors.white, fontWeight: '600' },

  row: { flexDirection: 'row' },
  halfField: { flex: 1 },

  divider: { height: 1, backgroundColor: Colors.border, marginHorizontal: Layout.padding.md, marginTop: Layout.padding.lg },
  sectionLabel: { fontSize: 16, fontWeight: '700', color: Colors.text, paddingHorizontal: Layout.padding.md, paddingTop: Layout.padding.md },

  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.padding.md,
    marginHorizontal: Layout.padding.md,
    marginTop: Layout.padding.lg,
    alignItems: 'center',
  },
  submitButtonText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
  bottomSpacer: { height: Layout.padding.xl },
})
