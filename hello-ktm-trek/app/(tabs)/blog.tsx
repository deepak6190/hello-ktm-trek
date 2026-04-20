import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Platform } from 'react-native'
import { useRouter } from 'expo-router'
import { useData } from '@/context/DataContext'
import { Colors } from '@/constants/Colors'
import { Layout } from '@/constants/Layout'
import { BlogPost } from '@/types'
import { BLOG_VIDEO_IDS, youtubeEmbedUrl } from '@/constants/videos'

export default function BlogScreen() {
  const { blogs, isLoading } = useData()
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
        <Text style={styles.title}>Travel Blog</Text>
        <Text style={styles.subtitle}>Stories, guides and tips from the mountains.</Text>
      </View>
      <FlatList
        data={blogs}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <BlogCard post={item} onPress={() => router.push(`/blog/${item.slug}`)} />
        )}
      />
    </View>
  )
}

function BlogCard({ post, onPress }: { post: BlogPost; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.88}>
      <View style={styles.cardImageWrap}>
        <Image source={{ uri: post.thumbnail }} style={styles.cardImage} />
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
      <View style={styles.cardBody}>
        <Text style={styles.category}>{post.category}</Text>
        <Text style={styles.cardTitle} numberOfLines={2}>{post.title}</Text>
        <Text style={styles.excerpt} numberOfLines={2}>{post.excerpt}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.author}>{post.author}</Text>
          <Text style={styles.meta}>{post.readTime} min read · {post.publishedAt}</Text>
        </View>
        <View style={styles.tagRow}>
          {post.tags.slice(0, 3).map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
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
  cardImageWrap: { width: '100%', height: 180, overflow: 'hidden', position: 'relative' },
  cardImage: { width: '100%', height: '100%' },
  cardBody: { padding: Layout.padding.md },
  category: { fontSize: 11, color: Colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  cardTitle: { fontSize: 17, fontWeight: '700', color: Colors.text, marginBottom: 6 },
  excerpt: { fontSize: 13, color: Colors.textSecondary, lineHeight: 19, marginBottom: Layout.padding.sm },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Layout.padding.sm },
  author: { fontSize: 12, fontWeight: '600', color: Colors.text },
  meta: { fontSize: 11, color: Colors.textMuted },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.padding.xs },
  tag: { backgroundColor: Colors.surfaceSecondary, borderRadius: Layout.borderRadius.sm, paddingHorizontal: 8, paddingVertical: 3 },
  tagText: { fontSize: 11, color: Colors.textSecondary },
})
