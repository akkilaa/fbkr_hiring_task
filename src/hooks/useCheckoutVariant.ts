import appConfiguration, { type CheckoutVariant } from '@/appConfiguration'

export const useCheckoutVariant = (): CheckoutVariant => {
  return appConfiguration.checkout.variant
}
