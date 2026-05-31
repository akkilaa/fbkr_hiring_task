import BookingSummary from '@/components/molecules/BookingSummary'
import CharterOverview from '@/components/molecules/CharterOverview'
import CheckoutBreadcrumb from '@/components/molecules/CheckoutBreadcrumb'
import PaymentMode, { type PaymentOption } from '@/components/molecules/PaymentMode'
import CreditCardSection from '@/components/organisms/CreditCardSection'
import { useCheckoutScroll } from '@/context/CheckoutScrollContext'
import { useCharterPackages } from '@/hooks/useCharters'
import { useCharterBookingStore } from '@/store/charterBookingStore'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { StyleSheet, View } from 'react-native'

export interface PaymentStepCheckoutHandle {
  advance: () => void
  getPaymentOption: () => PaymentOption
}

const PaymentStepCheckout = forwardRef<PaymentStepCheckoutHandle>((_, ref) => {
  const [paymentOption, setPaymentOption] = useState<PaymentOption>('full')
  const { registerAnchor } = useCheckoutScroll()
  const { charterId, selectedPackageId, date } = useCharterBookingStore()
  const { data: packages } = useCharterPackages(charterId!)
  const selectedPackage = packages?.find((p) => p.id === selectedPackageId)

  useImperativeHandle(ref, () => ({
    advance: () => {
      // TODO: submit payment
    },
    getPaymentOption: () => paymentOption,
  }))

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <CheckoutBreadcrumb variant="stepped" currentStep={2} />
      </View>
      <View style={styles.section}>
        <CharterOverview locked hideGallery hideDescription hideDropdowns />
        <BookingSummary hidePriceRow showPersonDetails />
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

export default PaymentStepCheckout
