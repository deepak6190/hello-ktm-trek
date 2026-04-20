import { useRef, useEffect, useState } from 'react'
import {
  ScrollView, View, Text, StyleSheet, Image, TouchableOpacity,
  ActivityIndicator, Dimensions, Platform,
} from 'react-native'
import { useRouter } from 'expo-router'
import { useData } from '@/context/DataContext'
import { Colors } from '@/constants/Colors'
import { Layout } from '@/constants/Layout'
import { Trip, DestinationItem, BlogPost, Review, Difficulty } from '@/types'

const YOUTUBE_VIDEO_ID = 'hjvwsHhFGg0'
const YOUTUBE_EMBED_URL =
  `https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}` +
  `?autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}` +
  `&controls=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&fs=0`
const HERO_FALLBACK_URI = 'https://picsum.photos/seed/himalaya-hero/1200/900'

import { TRIP_VIDEO_IDS, DESTINATION_VIDEO_IDS, BLOG_VIDEO_IDS, youtubeEmbedUrl } from '@/constants/videos'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const FEATURED_CARD_WIDTH = SCREEN_WIDTH - Layout.padding.md * 2
const DEST_CARD_WIDTH = (SCREEN_WIDTH - Layout.padding.md * 3) / 2

const STATS = [
  { value: '500+', label: 'Trips' },
  { value: '10K+', label: 'Clients' },
  { value: '15+', label: 'Years' },
  { value: '4.9★', label: 'Rating' },
]

const WHY_US = [
  { icon: '🏔', title: 'Expert Guides', desc: 'Certified, experienced mountain guides on every trek.' },
  { icon: '🛡', title: 'Safe & Insured', desc: 'Full rescue insurance and 24/7 emergency support.' },
  { icon: '💰', title: 'Best Price', desc: 'Guaranteed best prices with no hidden fees.' },
  { icon: '🌿', title: 'Responsible', desc: 'Eco-conscious tourism protecting the Himalayas.' },
]

export default function HomeScreen() {
  const { trips, destinations, blogs, reviews, isLoading, error } = useData()
  const router = useRouter()

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading…</Text>
      </View>
    )
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorIcon}>⚠️</Text>
        <Text style={styles.errorText}>Could not reach the server</Text>
        <Text style={styles.errorSub}>{error}</Text>
      </View>
    )
  }

  const featured = trips.filter((t) => t.isFeatured).slice(0, 5)

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* ── HERO VIDEO ── */}
      <View style={styles.heroContainer}>
        {/* Fallback image — visible while video loads */}
        <Image
          source={{ uri: HERO_FALLBACK_URI }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
        />
        {/* YouTube iframe background — Nepal 4K drone footage */}
        {Platform.OS === 'web' ? (
          // @ts-ignore — web-only <iframe>
          <iframe
            src={YOUTUBE_EMBED_URL}
            allow="autoplay; fullscreen"
            style={{
              position: 'absolute',
              // Oversized + centred so 16:9 video always fills any hero height
              top: '50%',
              left: '50%',
              width: '177.78vh',   // 16/9 × 100vh
              height: '100vh',
              minWidth: '100%',
              minHeight: '56.25vw', // 9/16 × 100vw
              transform: 'translate(-50%, -50%)',
              border: 'none',
              pointerEvents: 'none',
            }}
          />
        ) : null}
        {/* Darkening overlay + content */}
        <View style={styles.heroOverlay}>
          <Text style={styles.heroPill}>Nepal • Bhutan • Tibet</Text>
          <Text style={styles.heroTitle}>Your Himalayan{'\n'}Adventure Awaits</Text>
          <Text style={styles.heroSub}>
            Expert-guided treks, cultural tours & adrenaline adventures
          </Text>
          <View style={styles.heroButtons}>
            <TouchableOpacity style={styles.heroCta} onPress={() => router.push('/(tabs)/trips')}>
              <Text style={styles.heroCtaText}>Explore Trips</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.heroOutline} onPress={() => router.push('/(tabs)/plan')}>
              <Text style={styles.heroOutlineText}>Plan My Trip</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* ── STATS BAR ── */}
      <View style={styles.statsBar}>
        {STATS.map((s) => (
          <View key={s.label} style={styles.statItem}>
            <Text style={styles.statValue}>{s.value}</Text>
            <Text style={styles.statLabel}>{s.label}</Text>
          </View>
        ))}
      </View>

      {/* ── FEATURED TRIPS ── */}
      <SectionHeader
        title="Featured Trips"
        subtitle="Hand-picked adventures for unforgettable experiences"
        onSeeAll={() => router.push('/(tabs)/trips')}
      />
      <View style={styles.featuredList}>
        {featured.map((trip) => (
          <FeaturedTripCard
            key={trip.id}
            trip={trip}
            onPress={() => router.push(`/trip/${trip.slug}`)}
          />
        ))}
      </View>

      {/* ── DESTINATIONS ── */}
      <SectionHeader
        title="Destinations"
        subtitle="Explore iconic regions across the Himalayas and beyond"
        onSeeAll={() => router.push('/(tabs)/destinations')}
      />
      <View style={styles.destGrid}>
        {destinations.map((d) => (
          <DestinationCard
            key={d.id}
            destination={d}
            onPress={() => router.push(`/destination/${d.id}`)}
          />
        ))}
      </View>

      {/* ── WHY CHOOSE US ── */}
      <View style={styles.whySection}>
        <View style={styles.sectionTitleBlock}>
          <Text style={styles.sectionTitle}>Why Hello KTM Trek?</Text>
          <Text style={styles.sectionSub}>Trusted by thousands of adventurers worldwide</Text>
        </View>
        <View style={styles.whyGrid}>
          {WHY_US.map((item) => (
            <View key={item.title} style={styles.whyCard}>
              <Text style={styles.whyIcon}>{item.icon}</Text>
              <Text style={styles.whyTitle}>{item.title}</Text>
              <Text style={styles.whyDesc}>{item.desc}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* ── REVIEWS ── */}
      <SectionHeader title="Traveller Stories" subtitle="Real experiences from our adventurers" />
      <ReviewCarousel reviews={reviews} />

      {/* ── BLOG ── */}
      <SectionHeader
        title="From the Blog"
        subtitle="Tips, guides and stories from the mountains"
        onSeeAll={() => router.push('/(tabs)/blog')}
      />
      <View style={styles.blogList}>
        {blogs.slice(0, 3).map((post) => (
          <BlogCard
            key={post.id}
            post={post}
            onPress={() => router.push(`/blog/${post.slug}`)}
          />
        ))}
      </View>

      {/* ── FOOTER CTA ── */}
      <View style={styles.footerCta}>
        <Text style={styles.footerCtaTitle}>Ready for Your Next Adventure?</Text>
        <Text style={styles.footerCtaSub}>Let our experts craft the perfect journey for you.</Text>
        <TouchableOpacity style={styles.footerCtaBtn} onPress={() => router.push('/(tabs)/plan')}>
          <Text style={styles.footerCtaBtnText}>Start Planning →</Text>
        </TouchableOpacity>
      </View>

    </ScrollView>
  )
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  title, subtitle, onSeeAll,
}: {
  title: string; subtitle?: string; onSeeAll?: () => void
}) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
          {subtitle ? <Text style={styles.sectionSub}>{subtitle}</Text> : null}
        </View>
        {onSeeAll && (
          <TouchableOpacity onPress={onSeeAll} style={styles.seeAllBtn}>
            <Text style={styles.seeAllText}>See all →</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.sectionAccent} />
    </View>
  )
}

function FeaturedTripCard({ trip, onPress }: { trip: Trip; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.featuredCard, { width: FEATURED_CARD_WIDTH }]} onPress={onPress} activeOpacity={0.92}>
      <View style={styles.featuredImageWrap}>
        <Image source={{ uri: trip.thumbnail }} style={styles.featuredImage} />
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
        <View style={styles.featuredImageOverlay} />
        <View style={[styles.diffBadge, { backgroundColor: Colors.difficulty[trip.difficulty as Difficulty] }]}>
          <Text style={styles.diffBadgeText}>{trip.difficulty}</Text>
        </View>
        {trip.isFeatured && (
          <View style={styles.featuredBadge}>
            <Text style={styles.featuredBadgeText}>Featured</Text>
          </View>
        )}
      </View>
      <View style={styles.featuredBody}>
        <Text style={styles.featuredActivity}>{trip.activityType} · {trip.destination}</Text>
        <Text style={styles.featuredTitle} numberOfLines={2}>{trip.title}</Text>
        <View style={styles.featuredMeta}>
          <Text style={styles.featuredMetaText}>🕐 {trip.duration} days</Text>
          {trip.maxAltitude ? <Text style={styles.featuredMetaText}>⛰ {trip.maxAltitude.toLocaleString()} m</Text> : null}
        </View>
        <View style={styles.featuredFooter}>
          <View style={styles.ratingPill}>
            <Text style={styles.ratingPillText}>★ {trip.rating} ({trip.reviewCount})</Text>
          </View>
          <Text style={styles.featuredPrice}>from ${trip.price.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

function DestinationCard({ destination, onPress }: { destination: DestinationItem; onPress: () => void }) {
  return (
    <TouchableOpacity style={[styles.destCard, { width: DEST_CARD_WIDTH }]} onPress={onPress} activeOpacity={0.9}>
      <Image source={{ uri: destination.thumbnail }} style={styles.destCardImage} />
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
      <View style={styles.destCardGradient} />
      <View style={styles.destCardContent}>
        <Text style={styles.destCardName}>{destination.name}</Text>
        <Text style={styles.destCardTagline}>{destination.tagline}</Text>
        <View style={styles.destCardPill}>
          <Text style={styles.destCardPillText}>{destination.tripCount} trips</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const REVIEW_CARD_WIDTH = SCREEN_WIDTH - Layout.padding.md * 2

function ReviewCarousel({ reviews }: { reviews: Review[] }) {
  const scrollRef = useRef<ScrollView>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (reviews.length < 2) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % reviews.length
        scrollRef.current?.scrollTo({ x: next * (REVIEW_CARD_WIDTH + Layout.padding.sm), animated: true })
        return next
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [reviews.length])

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true}
        contentContainerStyle={{ paddingHorizontal: Layout.padding.md, gap: Layout.padding.sm, paddingBottom: 4 }}
      >
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} />
        ))}
      </ScrollView>
      <View style={styles.dotRow}>
        {reviews.map((_, i) => (
          <View key={i} style={[styles.dot, i === activeIndex && styles.dotActive]} />
        ))}
      </View>
    </View>
  )
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.author.split(' ').map((n) => n[0]).join('').slice(0, 2)
  const sourceColor = review.source === 'Google' ? '#4285F4' : review.source === 'TripAdvisor' ? '#34E0A1' : Colors.primary
  return (
    <View style={[styles.reviewCard, { width: REVIEW_CARD_WIDTH }]}>
      <View style={styles.reviewTop}>
        <View style={styles.reviewAvatar}>
          <Text style={styles.reviewInitials}>{initials}</Text>
        </View>
        <View style={styles.reviewMeta}>
          <Text style={styles.reviewAuthor}>{review.author}</Text>
          <Text style={styles.reviewStars}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Text>
        </View>
        <View style={[styles.reviewSourceBadge, { backgroundColor: sourceColor }]}>
          <Text style={styles.reviewSourceText}>{review.source}</Text>
        </View>
      </View>
      <Text style={styles.reviewTrip}>📍 {review.tripTitle}</Text>
      <Text style={styles.reviewComment} numberOfLines={4}>{review.comment}</Text>
      <Text style={styles.reviewDate}>{review.date}</Text>
    </View>
  )
}

function BlogCard({ post, onPress }: { post: BlogPost; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.blogCard} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.blogCardImageWrap}>
        <Image source={{ uri: post.thumbnail }} style={styles.blogCardImage} />
        {Platform.OS === 'web' && BLOG_VIDEO_IDS[post.slug] ? (
          // @ts-ignore — web-only <iframe>
          <iframe
            src={youtubeEmbedUrl(BLOG_VIDEO_IDS[post.slug])}
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
      <View style={styles.blogCardBody}>
        <View style={styles.blogCategoryPill}>
          <Text style={styles.blogCategoryText}>{post.category}</Text>
        </View>
        <Text style={styles.blogCardTitle} numberOfLines={2}>{post.title}</Text>
        <Text style={styles.blogCardExcerpt} numberOfLines={2}>{post.excerpt}</Text>
        <View style={styles.blogCardFooter}>
          <Text style={styles.blogCardAuthor}>{post.author}</Text>
          <Text style={styles.blogCardMeta}>{post.readTime} min read</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8 },
  loadingText: { color: Colors.textSecondary, fontSize: 14 },
  errorIcon: { fontSize: 36 },
  errorText: { fontSize: 16, fontWeight: '700', color: Colors.error },
  errorSub: { fontSize: 13, color: Colors.textSecondary, textAlign: 'center', paddingHorizontal: 32 },

  // Hero
  heroContainer: { height: 520, overflow: 'hidden', backgroundColor: Colors.primaryDark, position: 'relative' },
  hero: { flex: 1 },
  heroOverlay: {
    flex: 1,
    backgroundColor: 'rgba(10,30,20,0.58)',
    justifyContent: 'flex-end',
    padding: Layout.padding.lg,
    paddingBottom: 40,
  },
  heroPill: {
    color: Colors.primaryLight,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  heroTitle: {
    color: Colors.white,
    fontSize: 38,
    fontWeight: '900',
    lineHeight: 44,
    marginBottom: 12,
  },
  heroSub: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  heroButtons: { flexDirection: 'row', gap: 12 },
  heroCta: {
    backgroundColor: Colors.primary,
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: Layout.borderRadius.md,
  },
  heroCtaText: { color: Colors.white, fontWeight: '700', fontSize: 15 },
  heroOutline: {
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: Layout.borderRadius.md,
  },
  heroOutlineText: { color: Colors.white, fontWeight: '600', fontSize: 15 },

  // Stats bar
  statsBar: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryDark,
    paddingVertical: 20,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { color: Colors.white, fontSize: 22, fontWeight: '900' },
  statLabel: { color: Colors.primaryLight, fontSize: 11, fontWeight: '600', marginTop: 2 },

  // Section headers
  sectionHeader: { paddingHorizontal: Layout.padding.md, paddingTop: 28, paddingBottom: 12 },
  sectionTitleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' },
  sectionTitleBlock: { paddingHorizontal: Layout.padding.md, paddingTop: 28, paddingBottom: 4 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: Colors.text },
  sectionSub: { fontSize: 13, color: Colors.textSecondary, marginTop: 3 },
  sectionAccent: { width: 36, height: 3, backgroundColor: Colors.primary, borderRadius: 2, marginTop: 10 },
  seeAllBtn: { paddingTop: 4 },
  seeAllText: { color: Colors.primary, fontSize: 13, fontWeight: '700' },

  horizontalList: { paddingHorizontal: Layout.padding.md, gap: Layout.padding.sm, paddingBottom: 4 },
  featuredList: { paddingHorizontal: Layout.padding.md, gap: 14, paddingBottom: 4 },
  destGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Layout.padding.md, gap: Layout.padding.md, paddingBottom: 4 },

  // Featured trip cards
  featuredCard: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.xl,
    overflow: 'hidden',
    ...Layout.cardShadow,
  },
  featuredImageWrap: { position: 'relative', height: 200, overflow: 'hidden' },
  featuredImage: { width: '100%', height: '100%' },
  featuredImageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.15)',
  },
  diffBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.full,
  },
  diffBadgeText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  featuredBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Layout.borderRadius.full,
  },
  featuredBadgeText: { color: Colors.white, fontSize: 11, fontWeight: '700' },
  featuredBody: { padding: Layout.padding.md },
  featuredActivity: { fontSize: 11, color: Colors.primary, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  featuredTitle: { fontSize: 16, fontWeight: '800', color: Colors.text, marginBottom: 8, lineHeight: 22 },
  featuredMeta: { flexDirection: 'row', gap: 12, marginBottom: 12 },
  featuredMetaText: { fontSize: 12, color: Colors.textSecondary },
  featuredFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  ratingPill: { backgroundColor: Colors.surfaceSecondary, borderRadius: Layout.borderRadius.full, paddingHorizontal: 10, paddingVertical: 4 },
  ratingPillText: { fontSize: 12, color: Colors.text, fontWeight: '600' },
  featuredPrice: { fontSize: 18, fontWeight: '900', color: Colors.primary },

  // Destination cards
  destCard: {
    height: 200,
    borderRadius: Layout.borderRadius.xl,
    overflow: 'hidden',
    ...Layout.cardShadow,
  },
  destCardImage: { ...StyleSheet.absoluteFillObject, width: '100%', height: '100%' },
  destCardGradient: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  destCardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Layout.padding.md,
  },
  destCardName: { color: Colors.white, fontSize: 20, fontWeight: '900', marginBottom: 2 },
  destCardTagline: { color: 'rgba(255,255,255,0.8)', fontSize: 12, marginBottom: 10 },
  destCardPill: { backgroundColor: Colors.primary, borderRadius: Layout.borderRadius.full, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  destCardPillText: { color: Colors.white, fontSize: 11, fontWeight: '700' },

  // Why Us
  whySection: { backgroundColor: Colors.surfaceSecondary, paddingBottom: 28, marginTop: 8 },
  whyGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12, gap: 10 },
  whyCard: {
    width: (SCREEN_WIDTH - 44) / 2,
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.lg,
    padding: Layout.padding.md,
    ...Layout.cardShadow,
  },
  whyIcon: { fontSize: 28, marginBottom: 8 },
  whyTitle: { fontSize: 14, fontWeight: '800', color: Colors.text, marginBottom: 4 },
  whyDesc: { fontSize: 12, color: Colors.textSecondary, lineHeight: 18 },

  dotRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, paddingVertical: 10 },
  dot: { width: 7, height: 7, borderRadius: 4, backgroundColor: Colors.border },
  dotActive: { backgroundColor: Colors.primary, width: 18 },

  // Reviews
  reviewCard: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.xl,
    padding: Layout.padding.md,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
    ...Layout.cardShadow,
  },
  reviewTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  reviewAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewInitials: { color: Colors.white, fontWeight: '700', fontSize: 15 },
  reviewMeta: { flex: 1 },
  reviewAuthor: { fontSize: 14, fontWeight: '700', color: Colors.text },
  reviewStars: { color: Colors.star, fontSize: 12, marginTop: 1 },
  reviewSourceBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: Layout.borderRadius.sm },
  reviewSourceText: { color: Colors.white, fontSize: 10, fontWeight: '700' },
  reviewTrip: { fontSize: 12, color: Colors.primary, fontWeight: '600', marginBottom: 8 },
  reviewComment: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19, fontStyle: 'italic' },
  reviewDate: { fontSize: 11, color: Colors.textMuted, marginTop: 10 },

  // Blog
  blogList: { paddingHorizontal: Layout.padding.md, gap: 12, paddingBottom: 4 },
  blogCard: {
    backgroundColor: Colors.surface,
    borderRadius: Layout.borderRadius.lg,
    overflow: 'hidden',
    ...Layout.cardShadow,
  },
  blogCardImageWrap: { width: '100%', height: 160, overflow: 'hidden', position: 'relative' },
  blogCardImage: { width: '100%', height: '100%' },
  blogCardBody: { padding: Layout.padding.md, gap: 6 },
  blogCategoryPill: {
    backgroundColor: Colors.primaryLight + '22',
    borderRadius: Layout.borderRadius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginBottom: 4,
  },
  blogCategoryText: { fontSize: 10, color: Colors.primary, fontWeight: '700', textTransform: 'uppercase' },
  blogCardTitle: { fontSize: 13, fontWeight: '700', color: Colors.text, lineHeight: 18 },
  blogCardExcerpt: { fontSize: 11, color: Colors.textSecondary, lineHeight: 16 },
  blogCardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  blogCardAuthor: { fontSize: 11, fontWeight: '600', color: Colors.text },
  blogCardMeta: { fontSize: 11, color: Colors.textMuted },

  // Footer CTA
  footerCta: {
    backgroundColor: Colors.primaryDark,
    margin: Layout.padding.md,
    borderRadius: Layout.borderRadius.xl,
    padding: Layout.padding.lg,
    alignItems: 'center',
    marginBottom: 32,
  },
  footerCtaTitle: { color: Colors.white, fontSize: 20, fontWeight: '900', textAlign: 'center', marginBottom: 8 },
  footerCtaSub: { color: 'rgba(255,255,255,0.75)', fontSize: 13, textAlign: 'center', marginBottom: 20 },
  footerCtaBtn: {
    backgroundColor: Colors.secondary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: Layout.borderRadius.md,
  },
  footerCtaBtnText: { color: Colors.white, fontWeight: '800', fontSize: 15 },
})
