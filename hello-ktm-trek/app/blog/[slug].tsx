import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useData } from '@/context/DataContext'
import { Colors } from '@/constants/Colors'
import { Layout } from '@/constants/Layout'
import { BLOG_VIDEO_IDS, youtubeEmbedUrl } from '@/constants/videos'

export default function BlogDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>()
  const { blogs } = useData()
  const router = useRouter()

  const post = blogs.find((b) => b.slug === slug)

  if (!post) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundText}>Post not found.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>← Go back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: post.thumbnail }} style={styles.hero} />
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
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.category}>{post.category}</Text>
        <Text style={styles.title}>{post.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.author}>{post.author}</Text>
          <Text style={styles.meta}>{post.readTime} min read · {post.publishedAt}</Text>
        </View>

        <View style={styles.divider} />

        {post.content.split('\n').map((line, i) => {
          if (line.startsWith('## ')) {
            return <Text key={i} style={styles.h2}>{line.replace('## ', '')}</Text>
          }
          if (line.startsWith('### ')) {
            return <Text key={i} style={styles.h3}>{line.replace('### ', '')}</Text>
          }
          if (line.startsWith('- ')) {
            return <Text key={i} style={styles.listItem}>· {line.replace('- ', '')}</Text>
          }
          if (line.startsWith('| ') || line.startsWith('|---|')) {
            return null
          }
          if (line.trim() === '') return <View key={i} style={styles.spacer} />
          return <Text key={i} style={styles.paragraph}>{line}</Text>
        })}

        <View style={styles.tagRow}>
          {post.tags.map((tag) => (
            <View key={tag} style={styles.tag}><Text style={styles.tagText}>{tag}</Text></View>
          ))}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { paddingBottom: 48 },
  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: { fontSize: 16, color: Colors.textSecondary, marginBottom: 12 },
  back: { color: Colors.primary, fontSize: 15 },

  imageContainer: { position: 'relative', height: 250, overflow: 'hidden' },
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

  body: { padding: Layout.padding.md },
  category: { fontSize: 11, color: Colors.primary, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 6 },
  title: { fontSize: 22, fontWeight: '800', color: Colors.text, marginBottom: Layout.padding.sm },
  metaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  author: { fontSize: 13, fontWeight: '600', color: Colors.text },
  meta: { fontSize: 12, color: Colors.textMuted },
  divider: { height: 1, backgroundColor: Colors.border, marginVertical: Layout.padding.md },

  h2: { fontSize: 20, fontWeight: '800', color: Colors.text, marginTop: Layout.padding.lg, marginBottom: Layout.padding.xs },
  h3: { fontSize: 16, fontWeight: '700', color: Colors.text, marginTop: Layout.padding.md, marginBottom: Layout.padding.xs },
  paragraph: { fontSize: 14, color: Colors.textSecondary, lineHeight: 23, marginBottom: 4 },
  listItem: { fontSize: 14, color: Colors.textSecondary, lineHeight: 23, paddingLeft: Layout.padding.sm },
  spacer: { height: Layout.padding.xs },

  tagRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Layout.padding.xs, marginTop: Layout.padding.lg },
  tag: { backgroundColor: Colors.surfaceSecondary, borderRadius: Layout.borderRadius.sm, paddingHorizontal: 10, paddingVertical: 4 },
  tagText: { fontSize: 12, color: Colors.textSecondary },
})
