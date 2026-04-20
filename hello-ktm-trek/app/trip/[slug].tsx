import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useData } from '@/context/DataContext'
import { Colors } from '@/constants/Colors'
import { Layout } from '@/constants/Layout'
import { Difficulty } from '@/types'
import { TRIP_VIDEO_IDS, youtubeEmbedUrl } from '@/constants/videos'

export default function TripDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { trips } = useData()
  const router = useRouter()

  const trip = trips.find((t) => t.slug === slug)

  if (!trip) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Trip not found.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Go back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: trip.thumbnail }} style={styles.hero} />
        {Platform.OS === 'web' && TRIP_VIDEO_IDS[trip.slug] ? (
          // @ts-ignore — web-only <iframe>
          <iframe
            src={youtubeEmbedUrl(TRIP_VIDEO_IDS[trip.slug])}
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <View style={styles.imageOverlay}>
          <View style={[styles.diffBadge, { backgroundColor: Colors.difficulty[trip.difficulty as Difficulty] }]}>
            <Text style={styles.diffBadgeText}>{trip.difficulty}</Text>
          </View>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.destination}>{trip.destination}{trip.region ? ` · ${trip.region}` : ''}</Text>
        <Text style={styles.title}>{trip.title}</Text>

        <View style={styles.statsRow}>
          <Stat label="Duration" value={`${trip.duration} days`} />
          <Stat label="Activity" value={trip.activityType} />
          {trip.maxAltitude ? <Stat label="Max Alt." value={`${trip.maxAltitude.toLocaleString()} m`} /> : null}
          <Stat label="Group" value={`${trip.groupSize.min}–${trip.groupSize.max}`} />
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.star}>★</Text>
          <Text style={styles.rating}>{trip.rating} · {trip.reviewCount} reviews</Text>
          <Text style={styles.price}>from ${trip.price.toLocaleString()}</Text>
        </View>

        <SectionTitle>Overview</SectionTitle>
        <Text style={styles.overview}>{trip.overview}</Text>

        <SectionTitle>Highlights</SectionTitle>
        {trip.highlights.map((h, i) => (
          <Text key={i} style={styles.bullet}>✓ {h}</Text>
        ))}

        <SectionTitle>Best Season</SectionTitle>
        <View style={styles.tagRow}>
          {trip.bestSeason.map((s) => (
            <View key={s} style={styles.tag}><Text style={styles.tagText}>{s}</Text></View>
          ))}
        </View>

        <SectionTitle>Day-by-Day Itinerary</SectionTitle>
        {trip.itinerary.map((day) => (
          <View key={day.day} style={styles.itineraryDay}>
            <View style={styles.itineraryDayHeader}>
              <View style={styles.dayBadge}><Text style={styles.dayBadgeText}>Day {day.day}</Text></View>
              <Text style={styles.itineraryDayTitle} numberOfLines={2}>{day.title}</Text>
            </View>
            {day.altitude ? <Text style={styles.itineraryMeta}>{day.altitude.toLocaleString()} m{day.distance ? ` · ${day.distance}` : ''}</Text> : null}
            <Text style={styles.itineraryDesc}>{day.description}</Text>
            {day.meals.length > 0 && <Text style={styles.meals}>Meals: {day.meals.join(', ')}</Text>}
          </View>
        ))}

        <SectionTitle>What's Included</SectionTitle>
        {trip.includes.map((item, i) => (
          <Text key={i} style={styles.bullet}>✓ {item}</Text>
        ))}

        <SectionTitle>What's Not Included</SectionTitle>
        {trip.excludes.map((item, i) => (
          <Text key={i} style={[styles.bullet, styles.bulletExclude]}>✗ {item}</Text>
        ))}

        <TouchableOpacity style={styles.enquireButton} onPress={() => router.push('/(tabs)/plan')}>
          <Text style={styles.enquireButtonText}>Enquire About This Trip</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

function SectionTitle({ children }: { children: string }) {
  return <Text style={styles.sectionTitle}>{children}</Text>
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: 48 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { fontSize: 16, color: Colors.textSecondary, marginBottom: 12 },
  back: { color: Colors.primary, fontSize: 15 },

  imageContainer: { position: 'relative', height: 300, overflow: 'hidden' },
  hero: { width: '100%', height: '100%' },
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
  imageOverlay: { position: 'absolute', bottom: Layout.padding.md, left: Layout.padding.md },
  diffBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: Layout.borderRadius.sm },
  diffBadgeText: { color: Colors.white, fontSize: 12, fontWeight: '700' },

  body: { padding: Layout.padding.md },
  destination: { fontSize: 12, color: Colors.primary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  title: { fontSize: 24, fontWeight: '800', color: Colors.text, marginBottom: Layout.padding.md },

  statsRow: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: Colors.surfaceSecondary, borderRadius: Layout.borderRadius.md, padding: Layout.padding.md, marginBottom: Layout.padding.md },
  stat: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 13, fontWeight: '700', color: Colors.text, marginBottom: 2 },
  statLabel: { fontSize: 11, color: Colors.textSecondary },

  ratingRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: Layout.padding.md },
  star: { color: Colors.star, fontSize: 16 },
  rating: { fontSize: 14, color: Colors.textSecondary, flex: 1 },
  price: { fontSize: 20, fontWeight: '800', color: Colors.primary },

  sectionTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, marginTop: Layout.padding.lg, marginBottom: Layout.padding.sm },
  overview: { fontSize: 14, color: Colors.textSecondary, lineHeight: 22 },
  bullet: { fontSize: 14, color: Colors.textSecondary, lineHeight: 24 },
  bulletExclude: { color: Colors.error },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.padding.xs },
  tag: { backgroundColor: Colors.surfaceSecondary, borderRadius: Layout.borderRadius.sm, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 12, color: Colors.textSecondary },

  itineraryDay: { backgroundColor: Colors.surface, borderRadius: Layout.borderRadius.md, padding: Layout.padding.md, marginBottom: Layout.padding.sm, ...Layout.cardShadow },
  itineraryDayHeader: { flexDirection: 'row', alignItems: 'flex-start', gap: Layout.padding.sm, marginBottom: 4 },
  dayBadge: { backgroundColor: Colors.primary, borderRadius: Layout.borderRadius.sm, paddingHorizontal: 8, paddingVertical: 3 },
  dayBadgeText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  itineraryDayTitle: { flex: 1, fontSize: 14, fontWeight: '700', color: Colors.text },
  itineraryMeta: { fontSize: 11, color: Colors.primary, marginBottom: 4 },
  itineraryDesc: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19 },
  meals: { fontSize: 11, color: Colors.textMuted, marginTop: 4 },

  enquireButton: {
    backgroundColor: Colors.primary,
    borderRadius: Layout.borderRadius.md,
    padding: Layout.padding.md,
    marginTop: Layout.padding.lg,
    alignItems: 'center',
  },
  enquireButtonText: { color: Colors.white, fontSize: 16, fontWeight: '700' },
})
