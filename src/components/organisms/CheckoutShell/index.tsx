import SafeAreaView from '@/components/atoms/SafeAreaView'
import StickyBottomBar from '@/components/atoms/StickyBottomBar'
import NavigationHeader from '@/components/molecules/NavigationHeader'
import {
  type CheckoutAnchorId,
  CheckoutScrollContext,
  type CheckoutScrollContextValue,
} from '@/context/CheckoutScrollContext'
import { useCallback, useMemo, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  KeyboardAwareScrollView,
  type KeyboardAwareScrollViewRef,
} from 'react-native-keyboard-controller'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const SCROLL_ANCHOR_PADDING = 16

interface CheckoutShellProps {
  children: React.ReactNode
  bottomBar?: React.ReactNode
  onBack?: () => void
  title?: string
}

const CheckoutShell = ({ children, bottomBar, onBack, title = 'Checkout' }: CheckoutShellProps) => {
  const insets = useSafeAreaInsets()
  const scrollRef = useRef<KeyboardAwareScrollViewRef>(null)
  const anchors = useRef<Partial<Record<CheckoutAnchorId, number>>>({})

  const registerAnchor = useCallback<CheckoutScrollContextValue['registerAnchor']>((id, y) => {
    anchors.current[id] = y
  }, [])

  const scrollToAnchor = useCallback<CheckoutScrollContextValue['scrollToAnchor']>(
    (id, animated = true) => {
      const y = anchors.current[id]
      if (y == null) return
      scrollRef.current?.scrollTo({ y: Math.max(y - SCROLL_ANCHOR_PADDING, 0), animated })
    },
    [],
  )

  const assureFocusedInputVisible = useCallback<
    CheckoutScrollContextValue['assureFocusedInputVisible']
  >(() => {
    scrollRef.current?.assureFocusedInputVisible()
  }, [])

  const scroll = useMemo<CheckoutScrollContextValue>(
    () => ({ registerAnchor, scrollToAnchor, assureFocusedInputVisible }),
    [registerAnchor, scrollToAnchor, assureFocusedInputVisible],
  )

  return (
    <CheckoutScrollContext.Provider value={scroll}>
      <View style={styles.root}>
        <SafeAreaView edges={['top', 'left', 'right']}>
          <NavigationHeader title={title} onBack={onBack} />
        </SafeAreaView>
        <KeyboardAwareScrollView
          ref={scrollRef}
          style={styles.flex}
          contentContainerStyle={styles.scrollContent}
          bottomOffset={insets.bottom + 16}
        >
          {children}
        </KeyboardAwareScrollView>
        {/* Rendered outside the scroll view so it never interferes with keyboard avoidance. */}
        {bottomBar && <StickyBottomBar>{bottomBar}</StickyBottomBar>}
      </View>
    </CheckoutScrollContext.Provider>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#e7eff2',
  },
})

export default CheckoutShell
