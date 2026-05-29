import { focusManager, onlineManager } from '@tanstack/react-query'
import * as Network from 'expo-network'
import { useEffect } from 'react'
import { AppState, Platform } from 'react-native'

onlineManager.setEventListener((setOnline) => {
  let initialised = false

  const subscription = Network.addNetworkStateListener((state) => {
    initialised = true
    setOnline(!!state.isConnected)
  })

  Network.getNetworkStateAsync()
    .then((state) => {
      if (!initialised) setOnline(!!state.isConnected)
    })
    .catch(() => {})
  return subscription.remove
})

export function useReactQueryNative() {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (status) => {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active')
      }
    })
    return () => subscription.remove()
  }, [])
}
