import { resolveCheckoutCta } from '@/hooks/useCheckoutCta'

describe('resolveCheckoutCta', () => {
  const actions = {
    submitDetails: jest.fn(),
    goToCard: jest.fn(),
    goToPayment: jest.fn(),
    goToDetails: jest.fn(),
    book: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('prompts for details first in the single-step flow', () => {
    expect(
      resolveCheckoutCta(
        'single',
        { detailsComplete: false, hasSavedCards: false, cardSelected: false },
        actions,
      ),
    ).toMatchObject({ label: 'Add your details', onPress: actions.submitDetails })
  })

  it('routes the details step to payment when details are complete', () => {
    expect(
      resolveCheckoutCta(
        'detailsStep',
        { detailsComplete: true, hasSavedCards: true, cardSelected: false },
        actions,
      ),
    ).toMatchObject({ label: 'Continue to payment', onPress: actions.goToPayment })
  })

  it('books only after a card is selected on the payment step', () => {
    expect(
      resolveCheckoutCta(
        'paymentStep',
        { detailsComplete: true, hasSavedCards: true, cardSelected: true },
        actions,
      ),
    ).toMatchObject({ label: 'Book now', onPress: actions.book })
  })
})
