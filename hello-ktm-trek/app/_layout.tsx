import { Stack } from 'expo-router'
import { DataProvider } from '@/context/DataContext'

export default function RootLayout() {
  return (
    <DataProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </DataProvider>
  )
}
