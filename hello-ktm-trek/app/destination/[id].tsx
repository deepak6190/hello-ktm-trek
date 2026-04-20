import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useData } from '@/context/DataContext'
import { Colors } from '@/constants/Colors'
import { Layout } from '@/constants/Layout'
import { Trip } from '@/types'

export default function DestinationDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { destinations, trips } = useData()
  const router = useRouter()

  const destination = destinations.find((d) => d.id === id)
  const relatedTrips = trips.filter((t) => t.destination === destination?.name)

  if (!destination) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Destination not found.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Go back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: destination.thumbnail }} style={styles.hero} />
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.imageOverlay}>
          <Text style={styles.heroName}>{destination.name}</Text>
          <Text style={styles.heroTagline}>{destination.tagline}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.description}>{destination.description}</Text>

        <Text style={styles.sectionTitle}>Highlights</Text>
        {destination.highlights.map((h, i) => (
          <Text key={i} style={styles.bullet}>✓ {h}</Text>
        ))}

        <Text style={styles.sectionTitle}>Available Trips ({relatedTrips.length})</Text>
        {relatedTrips.map((trip) => (
          <TripRow key={trip.id} trip={trip} onPress={() => router.push(`/trip/${trip.slug}`)} />
        ))}
      </View>
    </ScrollView>
  )
}

function TripRow({ trip, onPress }: { trip: Trip; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.tripRow} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: trip.thumbnail }} style={styles.tripRowImage} />
      <View style={styles.tripRowBody}>
        <Text style={styles.tripRowTitle} numberOfLines={2}>{trip.title}</Text>
        <Text style={styles.tripRowMeta}>{trip.duration} days · {trip.difficulty}</Text>
        <Text style={styles.tripRowPrice}>from ${trip.price.toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: 48 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { fontSize: 16, color: Colors.textSecondary, marginBottom: 12 },
  back: { color: Colors.primary, fontSize: 15 },

  imageContainer: { position: 'relative' },
  hero: { width: '100%', height: 280 },
  backButton: {
    position: 'absolute',
    top: 50,
    left: Layout.padding.md,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: { color: Colors.white, fontSize: 18 },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.overlay,
    padding: Layout.padding.md,
  },
  heroName: { color: Colors.white, fontSize: 28, fontWeight: '800' },
  heroTagline: { color: 'rgba(255,255,255,0.8)', fontSize: 14 },

  body: { padding: Layout.padding.md },
  description: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22, marginBottom: Layout.padding.md },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, marginBottom: Layout.padding.sm, marginTop: Layout.padding.md },
  bullet: { fontSize: 14, color: Colors.textSecondary, lineHeight: 24 },

  tripRow: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.md,
    marginBottom: Layout.padding.sm,
    overflow: 'hidden',
    ...Layout.cardShadow,
  },
  tripRowImage: { width: 100, height: 100 },
  tripRowBody: { flex: 1, padding: Layout.padding.sm, justifyContent: 'center' },
  tripRowTitle: { fontSize: 14, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  tripRowMeta: { fontSize: 12, color: Colors.textSecondary, marginBottom: 4 },
  tripRowPrice: { fontSize: 14, fontWeight: '700', color: Colors.primary },
})
