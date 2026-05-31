export type CheckoutVariant = 'stepped' | 'single'

export interface PaymentModeTemplateValues {
  price: string
  deposit: string
  rest: string
  depositPercent: string
  tripDate: string
}

export interface AppConfiguration {
  checkout: {
    variant: CheckoutVariant
  }
  paymentMode: {
    title: string
    full: string
    fullDescription: string
    deposit: string
    depositDescription: string
    priceToPayNowLabel: string
    remainingBalanceLabel: string
  }
}

const appConfiguration: AppConfiguration = {
  checkout: {
    // This value is intentionally local and static for now.
    // It will be replaced by backend-driven experiment config.
    variant: 'stepped',
  },
  paymentMode: {
    title: 'How would you like to pay?',
    full: 'Pay [price] now',
    fullDescription: 'Pay now in full and save on potential credit card fees at the dock',
    deposit: 'Pay [deposit] deposit now, [rest] later',
    depositDescription: 'Pay [depositPercent]% now, later remaining balance. Fees may apply.',
    priceToPayNowLabel: 'Price to pay now',
    remainingBalanceLabel: 'Remaining balance ([tripDate])',
  },
}

export default appConfiguration
