import BookingSummary from '@/components/molecules/BookingSummary'
import CharterOverview from '@/components/molecules/CharterOverview'
import CheckoutBreadcrumb from '@/components/molecules/CheckoutBreadcrumb'
import PersonDetails, { type PersonDetailsHandle } from '@/components/organisms/PersonDetails'
import { useCheckoutScroll } from '@/context/CheckoutScrollContext'
import { forwardRef, useImperativeHandle, useRef } from 'react'
import { StyleSheet, View } from 'react-native'

export interface DetailsStepCheckoutHandle {
  advance: () => void
}

interface Props {
  onDetailsSubmit: () => void
}

const DetailsStepCheckout = forwardRef<DetailsStepCheckoutHandle, Props>(
  ({ onDetailsSubmit }, ref) => {
    const personDetailsRef = useRef<PersonDetailsHandle>(null)
    const { registerAnchor, scrollToAnchor } = useCheckoutScroll()

    useImperativeHandle(ref, () => ({
      advance: () => {
        scrollToAnchor('details', false)
        personDetailsRef.current?.submit()
      },
    }))

    return (
      <View style={styles.container}>
        <View style={styles.section}>
          <CheckoutBreadcrumb variant="stepped" currentStep={1} />
        </View>
        <View style={styles.section}>
          <CharterOverview locked hideDescription hideDropdowns />
        </View>
        <View style={styles.section}>
          <BookingSummary />
        </View>
        <View
          style={styles.section}
          onLayout={(e) => registerAnchor('details', e.nativeEvent.layout.y)}
        >
          <PersonDetails ref={personDetailsRef} onSubmit={onDetailsSubmit} />
        </View>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    gap: 20,
  },
  section: {
    backgroundColor: '#ffffff',
  },
})

export default DetailsStepCheckout
