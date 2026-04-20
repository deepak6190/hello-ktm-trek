import { useRef } from 'react'
import { StyleSheet } from 'react-native'
import { Video, ResizeMode } from 'expo-av'

const VIDEO_URI = 'https://assets.mixkit.co/videos/preview/mixkit-mountains-under-clouds-516-large.mp4'

export function HeroVideo() {
  const ref = useRef<Video>(null)
  return (
    <Video
      ref={ref}
      source={{ uri: VIDEO_URI }}
      style={StyleSheet.absoluteFillObject}
      resizeMode={ResizeMode.COVER}
      shouldPlay
      isLooping
      isMuted
      onReadyForDisplay={() => ref.current?.playAsync()}
    />
  )
}
