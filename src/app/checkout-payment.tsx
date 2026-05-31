import CheckoutCta from '@/components/organisms/CheckoutCta'
import CheckoutShell from '@/components/organisms/CheckoutShell'
import PaymentStepCheckout, {
  type PaymentStepCheckoutHandle,
} from '@/components/organisms/PaymentStepCheckout'
import { useBookingConfirmationStore } from '@/store/bookingConfirmationStore'
import { useCharterBookingStore } from '@/store/charterBookingStore'
import { useCreditCardStore } from '@/store/creditCardStore'
import { useLoaderStore } from '@/store/loaderStore'
import { usePersonDetailsStore } from '@/store/personDetailsStore'
import { useRouter } from 'expo-router'
import { useRef } from 'react'

export default function CheckoutPaymentScreen() {
  const router = useRouter()
  const paymentRef = useRef<PaymentStepCheckoutHandle>(null)

  const setConfirmation = useBookingConfirmationStore((s) => s.setConfirmation)
  const { charterId, selectedPackageId, date, adults, children } = useCharterBookingStore()
  const { firstName, lastName, email, phone } = usePersonDetailsStore()
  const { cards, selectedCardId } = useCreditCardStore()
  const show = useLoaderStore((s) => s.show)

  const book = () => {
    const selectedCard = cards.find((c) => c.id === selectedCardId)
    if (!charterId || !selectedPackageId || !selectedCard) return

    setConfirmation({
      charterId,
      packageId: selectedPackageId,
      date,
      adults,
      children,
      firstName,
      lastName,
      email,
      phone,
      cardLast4: selectedCard.last4,
      cardBrand: selectedCard.brand,
    })

    show('Completing your booking...')
    setTimeout(() => {
      router.replace('/charter-success' as never)
    }, 2000)
  }

  return (
    <CheckoutShell
      onBack={() => router.back()}
      bottomBar={<CheckoutCta context="paymentStep" onBook={book} />}
    >
      <PaymentStepCheckout ref={paymentRef} />
    </CheckoutShell>
  )
}
