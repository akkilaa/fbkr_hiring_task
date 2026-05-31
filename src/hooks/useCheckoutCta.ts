import { useCreditCardStore } from '@/store/creditCardStore'
import { selectIsPersonDetailsComplete, usePersonDetailsStore } from '@/store/personDetailsStore'

/**
 * Where the bottom bar lives. Each context owns an ordered set of gates the user
 * must clear before booking, the bar always points at the first unmet one.
 *
 * - `single`      → details → card → book, all on one screen
 * - `detailsStep` → details only, then navigate to the payment screen
 * - `paymentStep` → card → book, on the dedicated payment screen
 */
export type CheckoutCtaContext = 'single' | 'detailsStep' | 'paymentStep'

export interface CheckoutCtaActions {
  /** Validate + commit the person-details form (focuses the first invalid field on failure). */
  submitDetails: () => void
  /** Scroll the payment-card section into view. */
  goToCard: () => void
  /** Advance the stepped flow to the dedicated payment screen. */
  goToPayment: () => void
  /** Navigate back to the details step (stepped flow only). */
  goToDetails: () => void
  /** Finalize the booking. */
  book: () => void
}

export interface CheckoutCta {
  label: string
  onPress: () => void
}

interface CheckoutCtaState {
  detailsComplete: boolean
  hasSavedCards: boolean
  cardSelected: boolean
}

const LABELS = {
  addDetails: 'Add your details',
  continue: 'Continue',
  continueToPayment: 'Continue to payment',
  addCard: 'Add credit card',
  chooseCard: 'Choose credit card',
  book: 'Book now',
} as const

/**
 * Derives the contextual call-to-action from booking progress. Pure mapping of
 * (context, store state) → label + action, so behaviour is centralized and the
 * screens only supply the concrete side effects.
 */
export function useCheckoutCta(
  context: CheckoutCtaContext,
  actions: CheckoutCtaActions,
): CheckoutCta {
  const detailsComplete = usePersonDetailsStore(selectIsPersonDetailsComplete)
  const hasSavedCards = useCreditCardStore((s) => s.cards.length > 0)
  const cardSelected = useCreditCardStore((s) => s.selectedCardId !== null)
  return resolveCheckoutCta(context, { detailsComplete, hasSavedCards, cardSelected }, actions)
}

export function resolveCheckoutCta(
  context: CheckoutCtaContext,
  state: CheckoutCtaState,
  actions: CheckoutCtaActions,
): CheckoutCta {
  const { detailsComplete, hasSavedCards, cardSelected } = state
  const cardCtaLabel = hasSavedCards ? LABELS.chooseCard : LABELS.addCard

  switch (context) {
    case 'detailsStep':
      return detailsComplete
        ? { label: LABELS.continueToPayment, onPress: actions.goToPayment }
        : { label: LABELS.addDetails, onPress: actions.submitDetails }

    case 'paymentStep':
      if (!detailsComplete) return { label: LABELS.addDetails, onPress: actions.goToDetails }
      return cardSelected
        ? { label: LABELS.book, onPress: actions.book }
        : { label: cardCtaLabel, onPress: actions.goToCard }

    case 'single':
    default:
      if (!detailsComplete) return { label: LABELS.addDetails, onPress: actions.submitDetails }
      if (!cardSelected) return { label: cardCtaLabel, onPress: actions.goToCard }
      return { label: LABELS.book, onPress: actions.book }
  }
}
