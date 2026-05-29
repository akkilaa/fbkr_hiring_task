import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router'
import { useColorScheme } from 'react-native'
import { QueryClientProvider } from '@tanstack/react-query'
import { useReactQueryDevTools } from '@dev-plugins/react-query'

import { AnimatedSplashOverlay } from '@/components/animated-icon'
import { queryClient } from '@/lib/query-client'
import { useReactQueryNative } from '@/lib/query-native'

function AppProviders({ children }: { children: React.ReactNode }) {
  useReactQueryDevTools(queryClient)
  useReactQueryNative()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default function TabLayout() {
  const colorScheme = useColorScheme()
  return (
    <AppProviders>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
        <AnimatedSplashOverlay />
      </ThemeProvider>
    </AppProviders>
  )
}
