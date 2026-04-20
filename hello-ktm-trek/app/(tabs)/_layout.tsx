import { Tabs, usePathname, useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'
import { Image, View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'

const logoSource = require('@/assets/images/logo.png')

const NAV_ITEMS = [
  { label: '🏠 Home',    href: '/(tabs)/' },
  { label: '🏔 Trips',   href: '/(tabs)/trips' },
  { label: '🗺 Places',  href: '/(tabs)/destinations' },
  { label: '📖 Blog',    href: '/(tabs)/blog' },
  { label: '✈ Plan',    href: '/(tabs)/plan' },
]

function TopNav() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <View style={styles.topNav}>
      {NAV_ITEMS.map((item) => {
        const isActive =
          item.href === '/(tabs)/'
            ? pathname === '/' || pathname === '/index'
            : pathname.startsWith(item.href.replace('/(tabs)', ''))

        return (
          <TouchableOpacity
            key={item.href}
            style={[styles.navItem, isActive && styles.navItemActive]}
            onPress={() => router.push(item.href as any)}
            activeOpacity={0.7}
          >
            <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>
              {item.label}
            </Text>
            {isActive && <View style={styles.navUnderline} />}
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => (
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Image source={logoSource} style={styles.logo} />
              <View style={styles.banner}>
                <Text style={styles.bannerBrand}>God of Trek</Text>
                <Text style={styles.bannerTagline}>Your Himalayan Adventure Experts</Text>
                <View style={styles.bannerRow}>
                  <View style={styles.bannerPill}>
                    <Text style={styles.bannerPillText}>🏔 Nepal · Bhutan · Tibet</Text>
                  </View>
                  <View style={styles.bannerRating}>
                    <Text style={styles.bannerRatingText}>★ 4.9</Text>
                  </View>
                </View>
              </View>

              <View style={styles.contact}>
                <Text style={styles.contactName}>Surendra Prasad Bhatta</Text>
                <Text style={styles.contactTitle}>Managing Director</Text>
                <View style={styles.contactPhoneRow}>
                  <Text style={styles.contactPhoneIcon}>📞</Text>
                  <Text style={styles.contactPhone}>+977 9843093645</Text>
                </View>
              </View>
            </View>
            <TopNav />
          </View>
        ),
        tabBarStyle: { display: 'none' },
      }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="trips" options={{ title: 'Trips' }} />
      <Tabs.Screen name="destinations" options={{ title: 'Destinations' }} />
      <Tabs.Screen name="blog" options={{ title: 'Blog' }} />
      <Tabs.Screen name="plan" options={{ title: 'Plan Trip' }} />
    </Tabs>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.surface,
    paddingTop: Platform.OS === 'ios' ? 52 : 36,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 14,
  },
  logo: {
    width: 264,
    height: 264,
    resizeMode: 'contain',
    flexShrink: 0,
  },
  banner: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  bannerBrand: {
    fontSize: 66,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 0.5,
  },
  bannerTagline: {
    fontSize: 36,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  bannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  bannerPill: {
    backgroundColor: Colors.primary + '18',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 9,
  },
  bannerPillText: {
    fontSize: 33,
    color: Colors.primary,
    fontWeight: '700',
  },
  bannerRating: {
    backgroundColor: '#FFF3CD',
    borderRadius: 20,
    paddingHorizontal: 30,
    paddingVertical: 9,
  },
  bannerRatingText: {
    fontSize: 33,
    color: '#B8860B',
    fontWeight: '700',
  },
  contact: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 6,
    flexShrink: 0,
  },
  contactName: {
    fontSize: 30,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'right',
  },
  contactTitle: {
    fontSize: 22,
    color: Colors.primary,
    fontWeight: '600',
    textAlign: 'right',
  },
  contactPhoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  contactPhoneIcon: {
    fontSize: 22,
  },
  contactPhone: {
    fontSize: 24,
    color: Colors.text,
    fontWeight: '700',
  },
  topNav: {
    flexDirection: 'row',
    paddingHorizontal: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    position: 'relative',
  },
  navItemActive: {},
  navLabel: {
    fontSize: 33,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  navLabelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  navUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 2,
    width: '60%',
    backgroundColor: Colors.primary,
    borderRadius: 1,
  },
})
