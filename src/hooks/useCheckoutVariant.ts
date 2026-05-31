import { type CheckoutVariant } from '@/constants/checkout'

export const useCheckoutVariant = (): CheckoutVariant => {
  // Here goes real A/B experiment logic
  return 'stepped'
}
