import Button from '@/components/atoms/Button'
import { useCheckoutScroll } from '@/context/CheckoutScrollContext'
import { type CheckoutCtaContext, useCheckoutCta } from '@/hooks/useCheckoutCta'

interface CheckoutCtaProps {
  context: CheckoutCtaContext
  /** Validate + commit the person-details form for this screen. */
  onSubmitDetails?: () => void
  /** Navigate to the dedicated payment screen (stepped flow). */
  onGoToPayment?: () => void
  /** Navigate back to the details step when details are missing (stepped flow). */
  onGoToDetails?: () => void
  /** Finalize the booking. */
  onBook?: () => void
}

const noop = () => {}

/**
 * The contextual checkout bottom bar: a single button that always advertises the
 * user's next step. Scroll-to-section is resolved locally via the shell's scroll
 * context; form submission, navigation and booking are injected by the screen.
 */
const CheckoutCta = ({
  context,
  onSubmitDetails,
  onGoToPayment,
  onGoToDetails,
  onBook,
}: CheckoutCtaProps) => {
  const { scrollToAnchor } = useCheckoutScroll()

  const cta = useCheckoutCta(context, {
    submitDetails: onSubmitDetails ?? noop,
    goToCard: () => scrollToAnchor('card'),
    goToPayment: onGoToPayment ?? noop,
    goToDetails: onGoToDetails ?? noop,
    book: onBook ?? noop,
  })

  return <Button label={cta.label} size="lg" onPress={cta.onPress} />
}

export default CheckoutCta
