import { StyleSheet, View } from 'react-native'

const VIDEO_URI = 'https://assets.mixkit.co/videos/preview/mixkit-mountains-under-clouds-516-large.mp4'

export function HeroVideo() {
  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="none">
      {/* @ts-ignore — web-only <video> element */}
      <video
        src={VIDEO_URI}
        autoPlay
        muted
        loop
        playsInline
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
    </View>
  )
}
