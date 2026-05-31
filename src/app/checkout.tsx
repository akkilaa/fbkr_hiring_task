import CheckoutCta from '@/components/organisms/CheckoutCta'
import CheckoutShell from '@/components/organisms/CheckoutShell'
import DetailsStepCheckout, {
  type DetailsStepCheckoutHandle,
} from '@/components/organisms/DetailsStepCheckout'
import SinglePageCheckout, {
  type SinglePageCheckoutHandle,
} from '@/components/organisms/SinglePageCheckout'
import { useCheckoutVariant } from '@/hooks/useCheckoutVariant'
import { useBookingConfirmationStore } from '@/store/bookingConfirmationStore'
import { useCharterBookingStore } from '@/store/charterBookingStore'
import { useCreditCardStore } from '@/store/creditCardStore'
import { useLoaderStore } from '@/store/loaderStore'
import { usePersonDetailsStore } from '@/store/personDetailsStore'
import { buildBookingConfirmation } from '@/utils/bookingConfirmation'
import { useRouter } from 'expo-router'
import { useRef } from 'react'

export default function CheckoutScreen() {
  const router = useRouter()
  const variant = useCheckoutVariant()
  const isStepped = variant === 'stepped'

  const detailsRef = useRef<DetailsStepCheckoutHandle>(null)
  const singleRef = useRef<SinglePageCheckoutHandle>(null)

  const setConfirmation = useBookingConfirmationStore((s) => s.setConfirmation)
  const { charterId, selectedPackageId, date, adults, children } = useCharterBookingStore()
  const { firstName, lastName, email, phone } = usePersonDetailsStore()
  const { cards, selectedCardId } = useCreditCardStore()
  const show = useLoaderStore((s) => s.show)
  const hide = useLoaderStore((s) => s.hide)

  const handleDetailsSubmit = () => {
    show()
    setTimeout(() => {
      hide()
      router.push('/checkout-payment')
    }, 2000)
  }

  const submitDetails = () => {
    if (isStepped) detailsRef.current?.advance()
    else singleRef.current?.advance()
  }

  const book = () => {
    const selectedCard = cards.find((c) => c.id === selectedCardId)
    const confirmation = buildBookingConfirmation({
      charterId,
      packageId: selectedPackageId,
      date,
      adults,
      children,
      firstName,
      lastName,
      email,
      phone,
      paymentMode: singleRef.current?.getPaymentOption() ?? 'full',
      selectedCard,
    })

    if (!confirmation) return

    setConfirmation(confirmation)

    show('Completing your booking...')
    setTimeout(() => {
      // Keep loader visible through navigation — success screen hides it and resets stores on mount.
      router.replace('/charter-success' as never)
    }, 2000)
  }

  return (
    <CheckoutShell
      title={isStepped ? 'Checkout Details' : 'Checkout'}
      onBack={() => router.back()}
      bottomBar={
        <CheckoutCta
          context={isStepped ? 'detailsStep' : 'single'}
          onSubmitDetails={submitDetails}
          onGoToPayment={() => router.push('/checkout-payment')}
          onBook={book}
        />
      }
    >
      {isStepped ? (
        <DetailsStepCheckout ref={detailsRef} onDetailsSubmit={handleDetailsSubmit} />
      ) : (
        <SinglePageCheckout ref={singleRef} />
      )}
    </CheckoutShell>
  )
}
