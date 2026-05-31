import Button from '@/components/atoms/Button'
import SafeAreaView from '@/components/atoms/SafeAreaView'
import StickyBottomBar from '@/components/atoms/StickyBottomBar'
import SuccessContactSection from '@/components/organisms/SuccessContactSection'
import SuccessHeroSection from '@/components/organisms/SuccessHeroSection'
import SuccessPaymentSection from '@/components/organisms/SuccessPaymentSection'
import SuccessTripSection from '@/components/organisms/SuccessTripSection'
import { useResetState } from '@/hooks/useResetState'
import { useSuccessAnimation } from '@/hooks/useSuccessAnimation'
import { charterQueryOptions } from '@/services/charter/charter.queries'
import {
  type BookingConfirmation,
  useBookingConfirmationStore,
} from '@/store/bookingConfirmationStore'
import { useLoaderStore } from '@/store/loaderStore'
import { enterSuccessScreen } from '@/utils/bookingLifecycle'
import { useQuery } from '@tanstack/react-query'
import { Stack, useFocusEffect, useRouter } from 'expo-router'
import { useCallback, useEffect } from 'react'
import { Animated, BackHandler, Platform, ScrollView, StyleSheet } from 'react-native'

function SuccessContent({ confirmation }: { confirmation: BookingConfirmation }) {
  const router = useRouter()
  const { circleScale, contentAnimStyle } = useSuccessAnimation()

  const { data: charter } = useQuery(charterQueryOptions.detail(confirmation.charterId))
  const { data: packages } = useQuery(charterQueryOptions.packages(confirmation.charterId))
  const selectedPackage = packages?.find((p) => p.id === confirmation.packageId)

  return (
    <SafeAreaView edges={['top']} style={styles.root}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: 96 }]}
        showsVerticalScrollIndicator={false}
      >
        <SuccessHeroSection circleScale={circleScale} contentAnimStyle={contentAnimStyle} />

        <Animated.View style={[styles.cards, contentAnimStyle]}>
          <SuccessTripSection
            confirmation={confirmation}
            charterTitle={charter?.title}
            charterCity={charter?.city}
            packageTitle={selectedPackage?.title}
            packageHours={selectedPackage?.hours}
            packagePrice={selectedPackage?.price}
            packageCurrency={selectedPackage?.currency}
          />
          <SuccessContactSection confirmation={confirmation} />
          <SuccessPaymentSection
            confirmation={confirmation}
            packagePrice={selectedPackage?.price}
            packageCurrency={selectedPackage?.currency}
          />
        </Animated.View>
      </ScrollView>

      <StickyBottomBar>
        <Button label="Explore more trips" size="lg" onPress={() => router.dismissAll()} />
      </StickyBottomBar>
    </SafeAreaView>
  )
}

export default function CharterSuccessScreen() {
  const confirmation = useBookingConfirmationStore((s) => s.confirmation)
  const hide = useLoaderStore((s) => s.hide)
  const resetState = useResetState()

  // Block the Android hardware back button on the success screen so users can't
  // navigate back into the completed payment flow. Returning true marks the
  // press as handled, suppressing the default navigation.
  useFocusEffect(
    useCallback(() => {
      if (Platform.OS !== 'android') return
      const subscription = BackHandler.addEventListener('hardwareBackPress', () => true)
      return () => subscription.remove()
    }, []),
  )

  useEffect(() => {
    enterSuccessScreen(hide, resetState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* Disable the iOS swipe-back (swipe-from-left) gesture so the completed
          booking can't be swiped back into the payment flow. Android's hardware
          back is handled above. */}
      <Stack.Screen options={{ gestureEnabled: false }} />
      {confirmation ? <SuccessContent confirmation={confirmation} /> : null}
    </>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e7eff2',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  cards: {
    paddingHorizontal: 16,
    gap: 12,
  },
})
