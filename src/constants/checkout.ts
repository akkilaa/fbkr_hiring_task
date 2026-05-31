export type CheckoutVariant = 'stepped' | 'single'

export const CHECKOUT_STEPS: Record<CheckoutVariant, string[]> = {
  stepped: ['Charter selection', 'Enter details', 'Finish booking'],
  single: ['Charter selection', 'Finish booking'],
}
