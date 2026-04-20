import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { useData } from '@/context/DataContext'
import { Colors } from '@/constants/Colors'
import { Layout } from '@/constants/Layout'
import { DestinationItem } from '@/types'
import { DESTINATION_VIDEO_IDS, youtubeEmbedUrl } from '@/constants/videos'

export default function DestinationsScreen() {
  const { destinations, isLoading } = useData()
  const router = useRouter()

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Destinations</Text>
        <Text style={styles.subtitle}>Explore our handpicked regions across Asia and beyond.</Text>
      </View>
      <FlatList
        data={destinations}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DestinationCard destination={item} onPress={() => router.push(`/destination/${item.id}`)} />
        )}
      />
    </View>
  )
}

function DestinationCard({ destination, onPress }: { destination: DestinationItem; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: destination.thumbnail }} style={styles.cardImage} />
        {Platform.OS === 'web' && DESTINATION_VIDEO_IDS[destination.name] ? (
          // @ts-ignore — web-only <iframe>
          <iframe
            src={youtubeEmbedUrl(DESTINATION_VIDEO_IDS[destination.name])}
            allow="autoplay; fullscreen"
            style={{
              position: 'absolute',
              top: '50%', left: '50%',
              width: '177.78%', height: '177.78%',
              transform: 'translate(-50%, -50%)',
              border: 'none',
              pointerEvents: 'none',
            }}
          />
        ) : null}
      </View>
      <View style={styles.cardOverlay}>
        <Text style={styles.cardName}>{destination.name}</Text>
        <Text style={styles.cardTagline}>{destination.tagline}</Text>
        <Text style={styles.cardTrips}>{destination.tripCount} trips available</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardDescription} numberOfLines={3}>{destination.description}</Text>
        <Text style={styles.highlightsLabel}>Highlights</Text>
        <View style={styles.highlightsList}>
          {destination.highlights.slice(0, 3).map((h, i) => (
            <Text key={i} style={styles.highlight}>· {h}</Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  header: {
    backgroundColor: Colors.surface,
    paddingTop: 56,
    paddingBottom: Layout.padding.md,
    paddingHorizontal: Layout.padding.md,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  title: { fontSize: 24, fontWeight: '800', color: Colors.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: Colors.textSecondary },
  list: { padding: Layout.padding.md, gap: Layout.padding.md },

  card: { backgroundColor: Colors.surface, borderRadius: Layout.borderRadius.lg, overflow: 'hidden', ...Layout.cardShadow },
  cardImageWrap: { width: '100%', height: 200, overflow: 'hidden', position: 'relative' },
  cardImage: { width: '100%', height: '100%' },
  cardOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 200,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
    padding: Layout.padding.md,
  },
  cardName: { color: Colors.white, fontSize: 24, fontWeight: '800' },
  cardTagline: { color: 'rgba(255,255,255,0.85)', fontSize: 13, marginBottom: 4 },
  cardTrips: { color: Colors.primaryLight, fontSize: 12, fontWeight: '600' },
  cardBody: { padding: Layout.padding.md },
  cardDescription: { fontSize: 13, color: Colors.textSecondary, lineHeight: 20, marginBottom: Layout.padding.sm },
  highlightsLabel: { fontSize: 12, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  highlightsList: { gap: 2 },
  highlight: { fontSize: 12, color: Colors.textSecondary },
})
