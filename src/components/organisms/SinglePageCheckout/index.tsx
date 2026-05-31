import BookingSummary from '@/components/molecules/BookingSummary'
import CharterOverview from '@/components/molecules/CharterOverview'
import CheckoutBreadcrumb from '@/components/molecules/CheckoutBreadcrumb'
import PaymentMode, { type PaymentOption } from '@/components/molecules/PaymentMode'
import CreditCardSection from '@/components/organisms/CreditCardSection'
import PersonDetails, { type PersonDetailsHandle } from '@/components/organisms/PersonDetails'
import { useCheckoutScroll } from '@/context/CheckoutScrollContext'
import { useCharterPackages } from '@/hooks/useCharters'
import { useCharterBookingStore } from '@/store/charterBookingStore'
import { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { KeyboardController, KeyboardEvents } from 'react-native-keyboard-controller'

export interface SinglePageCheckoutHandle {
  advance: () => void
}

const SinglePageCheckout = forwardRef<SinglePageCheckoutHandle>((_, ref) => {
  const personDetailsRef = useRef<PersonDetailsHandle>(null)
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('full')
  const { registerAnchor, scrollToAnchor } = useCheckoutScroll()

  const { charterId, selectedPackageId, date } = useCharterBookingStore()
  const { data: packages } = useCharterPackages(charterId!)
  const selectedPackage = packages?.find((p) => p.id === selectedPackageId)

  useImperativeHandle(ref, () => ({
    advance: () => {
      // Instant (non-animated) scroll puts the input inside the viewport before
      // focus() fires. Without this, iOS does not auto-scroll off-screen inputs
      // into view on keyboard-show the way Android's window-resize does.
      scrollToAnchor('details', false)
      personDetailsRef.current?.submit()
    },
  }))

  // When the keyboard is still visible (return key press on phone field), KASV
  // runs its own scroll restoration as the keyboard hides. Scrolling immediately
  // races with that and the two compound into a gap at the bottom.
  // Defer until the keyboard is fully gone — exactly what happens when the CTA
  // "Add credit card" button fires (keyboard already hidden at that point).
  const scrollToCard = useCallback(() => {
    if (KeyboardController.isVisible()) {
      const sub = KeyboardEvents.addListener('keyboardDidHide', () => {
        sub.remove()
        scrollToAnchor('card')
      })
    } else {
      scrollToAnchor('card')
    }
  }, [scrollToAnchor])

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <CheckoutBreadcrumb variant="single" currentStep={1} />
      </View>
      <View style={styles.section}>
        <CharterOverview locked hideDescription hideDropdowns />
        <BookingSummary hidePriceRow />
      </View>
      <View
        style={styles.section}
        onLayout={(e) => registerAnchor('details', e.nativeEvent.layout.y)}
      >
        <PersonDetails ref={personDetailsRef} onSubmit={scrollToCard} />
      </View>
      {selectedPackage && (
        <View style={styles.section}>
          <PaymentMode
            price={selectedPackage.price}
            currency={selectedPackage.currency}
            tripDate={date}
            value={paymentOption}
            onChange={setPaymentOption}
          />
        </View>
      )}
      <View style={styles.section} onLayout={(e) => registerAnchor('card', e.nativeEvent.layout.y)}>
        <CreditCardSection />
      </View>
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 20,
  },
  section: {
    backgroundColor: '#ffffff',
  },
})

export default SinglePageCheckout
