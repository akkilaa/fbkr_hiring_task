import { useReactQueryDevTools } from '@dev-plugins/react-query'
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { QueryClientProvider } from '@tanstack/react-query'
import { DefaultTheme, Stack, ThemeProvider } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { KeyboardProvider } from 'react-native-keyboard-controller'

import { BottomSheetProvider } from '@/bottom-sheet/BottomSheetProvider'
import { AnimatedSplashOverlay } from '@/components/animated-icon'
import GlobalLoader from '@/components/atoms/GlobalLoader'
import { queryClient } from '@/lib/query-client'
import { useReactQueryNative } from '@/lib/query-native'
import { StyleSheet } from 'react-native'

SplashScreen.preventAutoHideAsync()

function AppProviders({ children }: { children: React.ReactNode }) {
  useReactQueryDevTools(queryClient)
  useReactQueryNative()
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
}

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={styles.gestureHandler}>
      <KeyboardProvider>
        <BottomSheetModalProvider>
          <AppProviders>
            <BottomSheetProvider>
              <ThemeProvider value={AppTheme}>
                <StatusBar style="dark" />
                <Stack screenOptions={{ headerShown: false }} />
                <AnimatedSplashOverlay />
                <GlobalLoader />
              </ThemeProvider>
            </BottomSheetProvider>
          </AppProviders>
        </BottomSheetModalProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  gestureHandler: { flex: 1, backgroundColor: '#ffffff' },
})
