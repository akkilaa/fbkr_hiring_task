import { type CheckoutVariant } from '@/appConfiguration'

export const CHECKOUT_STEPS: Record<CheckoutVariant, string[]> = {
  stepped: ['Charter selection', 'Enter details', 'Finish booking'],
  single: ['Charter selection', 'Finish booking'],
}

export type { CheckoutVariant }
