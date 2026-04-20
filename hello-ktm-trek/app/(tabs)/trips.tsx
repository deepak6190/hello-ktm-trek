import { useState } from 'react'
import {
  View, Text, FlatList, StyleSheet, TextInput,
  TouchableOpacity, Image, ActivityIndicator, Dimensions, Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useData } from '@/context/DataContext'
import { Colors } from '@/constants/Colors'
import { Layout } from '@/constants/Layout'
import { Trip, Difficulty } from '@/types'
import { TRIP_VIDEO_IDS, youtubeEmbedUrl } from '@/constants/videos'

const { width: SCREEN_WIDTH } = Dimensions.get('window')

const DIFFICULTY_OPTIONS: Array<Difficulty | 'All'> = ['All', 'Easy', 'Moderate', 'Challenging', 'Strenuous']

export default function TripsScreen() {
  const { trips, isLoading } = useData()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | 'All'>('All')

  const filtered = trips.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.destination.toLowerCase().includes(search.toLowerCase())
    const matchesDiff = selectedDifficulty === 'All' || t.difficulty === selectedDifficulty
    return matchesSearch && matchesDiff
  })

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>All Trips</Text>
        <Text style={styles.headerSub}>{filtered.length} adventures available</Text>

        {/* Search */}
        <View style={styles.searchRow}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search trips or destinations…"
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Text style={styles.searchClear}>✕</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Difficulty filter */}
        <View style={styles.filterRow}>
          {DIFFICULTY_OPTIONS.map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[
                styles.filterChip,
                selectedDifficulty === opt && styles.filterChipActive,
                opt !== 'All' && selectedDifficulty !== opt && {
                  borderColor: Colors.difficulty[opt as Difficulty] + '66',
                },
              ]}
              onPress={() => setSelectedDifficulty(opt as Difficulty | 'All')}
            >
              {opt !== 'All' && selectedDifficulty !== opt && (
                <View style={[styles.diffDot, { backgroundColor: Colors.difficulty[opt as Difficulty] }]} />
              )}
              <Text style={[styles.filterChipText, selectedDifficulty === opt && styles.filterChipTextActive]}>
                {opt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isLoading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyIcon}>🏔</Text>
              <Text style={styles.emptyTitle}>No trips found</Text>
              <Text style={styles.emptySub}>Try adjusting your search or filters</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TripCard trip={item} onPress={() => router.push(`/trip/${item.slug}`)} />
          )}
        />
      )}
    </View>
  )
}

function TripCard({ trip, onPress }: { trip: Trip; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      {/* Image */}
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: trip.thumbnail }} style={styles.cardImage} />
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
        <View style={styles.cardImageOverlay} />
        {/* Badges on image */}
        <View style={[styles.cardDiffBadge, { backgroundColor: Colors.difficulty[trip.difficulty as Difficulty] }]}>
          <Text style={styles.cardDiffText}>{trip.difficulty}</Text>
        </View>
        {trip.isPopular && (
          <View style={styles.cardPopularBadge}>
            <Text style={styles.cardPopularText}>🔥 Popular</Text>
          </View>
        )}
        {/* Duration overlay */}
        <View style={styles.cardDurationWrap}>
          <Text style={styles.cardDuration}>🕐 {trip.duration} days</Text>
        </View>
      </View>

      {/* Body */}
      <View style={styles.cardBody}>
        <Text style={styles.cardActivity}>{trip.activityType} · {trip.destination}{trip.region ? ` · ${trip.region}` : ''}</Text>
        <Text style={styles.cardTitle} numberOfLines={2}>{trip.title}</Text>

        <View style={styles.cardDetailRow}>
          {trip.maxAltitude ? (
            <View style={styles.cardDetailItem}>
              <Text style={styles.cardDetailIcon}>⛰</Text>
              <Text style={styles.cardDetailText}>{trip.maxAltitude.toLocaleString()} m</Text>
            </View>
          ) : null}
          <View style={styles.cardDetailItem}>
            <Text style={styles.cardDetailIcon}>👥</Text>
            <Text style={styles.cardDetailText}>Max {trip.groupSize.max}</Text>
          </View>
          <View style={styles.cardDetailItem}>
            <Text style={styles.cardDetailIcon}>📅</Text>
            <Text style={styles.cardDetailText}>{trip.bestSeason.slice(0, 2).join(', ')}</Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.cardRatingWrap}>
            <Text style={styles.cardStar}>★</Text>
            <Text style={styles.cardRating}>{trip.rating}</Text>
            <Text style={styles.cardReviews}>({trip.reviewCount} reviews)</Text>
          </View>
          <View style={styles.cardPriceWrap}>
            <Text style={styles.cardPriceFrom}>from</Text>
            <Text style={styles.cardPrice}>${trip.price.toLocaleString()}</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.cardButton} onPress={onPress}>
          <Text style={styles.cardButtonText}>View Details →</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 60 },

  header: {
    backgroundColor: Colors.surface,
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: Layout.padding.md,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  headerTitle: { fontSize: 26, fontWeight: '900', color: Colors.text },
  headerSub: { fontSize: 13, color: Colors.textSecondary, marginBottom: 14 },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: Layout.borderRadius.md,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  searchIcon: { fontSize: 14, marginRight: 8 },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 14, color: Colors.text },
  searchClear: { fontSize: 14, color: Colors.textMuted, padding: 4 },

  filterRow: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Layout.borderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: 5,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  diffDot: { width: 7, height: 7, borderRadius: 4 },
  filterChipText: { fontSize: 12, color: Colors.textSecondary, fontWeight: '600' },
  filterChipTextActive: { color: Colors.white },

  list: { padding: Layout.padding.md, gap: 16, paddingBottom: 32 },

  emptyState: { alignItems: 'center', paddingTop: 60, gap: 8 },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: Colors.text },
  emptySub: { fontSize: 14, color: Colors.textSecondary },

  card: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.xl,
    overflow: 'hidden',
    ...Layout.cardShadow,
  },
  cardImageWrap: { height: 210, position: 'relative', overflow: 'hidden' },
  cardImage: { width: '100%', height: '100%' },
  cardImageOverlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.12)' },
  cardDiffBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Layout.borderRadius.full,
  },
  cardDiffText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  cardPopularBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Layout.borderRadius.full,
  },
  cardPopularText: { color: Colors.white, fontSize: 11, fontWeight: '600' },
  cardDurationWrap: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(0,0,0,0.65)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Layout.borderRadius.full,
  },
  cardDuration: { color: Colors.white, fontSize: 12, fontWeight: '600' },

  cardBody: { padding: Layout.padding.md },
  cardActivity: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 5,
  },
  cardTitle: { fontSize: 18, fontWeight: '800', color: Colors.text, marginBottom: 12, lineHeight: 24 },

  cardDetailRow: { flexDirection: 'row', gap: 16, marginBottom: 14 },
  cardDetailItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  cardDetailIcon: { fontSize: 12 },
  cardDetailText: { fontSize: 12, color: Colors.textSecondary },

  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 },
  cardRatingWrap: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  cardStar: { color: Colors.star, fontSize: 15 },
  cardRating: { fontSize: 15, fontWeight: '700', color: Colors.text },
  cardReviews: { fontSize: 12, color: Colors.textSecondary },
  cardPriceWrap: { alignItems: 'flex-end' },
  cardPriceFrom: { fontSize: 10, color: Colors.textSecondary },
  cardPrice: { fontSize: 22, fontWeight: '900', color: Colors.primary },

  cardButton: {
    backgroundColor: Colors.primary,
    borderRadius: Layout.borderRadius.md,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cardButtonText: { color: Colors.white, fontWeight: '700', fontSize: 14 },
})
