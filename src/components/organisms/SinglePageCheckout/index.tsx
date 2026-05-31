import BookingSummary from '@/components/molecules/BookingSummary'
import CharterOverview from '@/components/molecules/CharterOverview'
import CheckoutBreadcrumb from '@/components/molecules/CheckoutBreadcrumb'
import PaymentMode, { type PaymentOption } from '@/components/molecules/PaymentMode'
import { useCheckoutScroll } from '@/context/CheckoutScrollContext'
import CreditCardSection from '@/components/organisms/CreditCardSection'
import PersonDetails, { type PersonDetailsHandle } from '@/components/organisms/PersonDetails'
import { useCharterPackages } from '@/hooks/useCharters'
import { useCharterBookingStore } from '@/store/charterBookingStore'
import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { StyleSheet, View } from 'react-native'

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
        {/* Once details are committed, guide the user straight to the next step. */}
        <PersonDetails ref={personDetailsRef} onSubmit={() => scrollToAnchor('card')} />
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
