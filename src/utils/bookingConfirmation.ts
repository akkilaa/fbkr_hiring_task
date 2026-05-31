import type { BookingConfirmation } from '@/store/bookingConfirmationStore'
import type { CardBrand } from '@/store/creditCardStore'

interface BuildBookingConfirmationParams {
  charterId: number | null
  packageId: number | null
  date: Date
  adults: number
  children: number
  firstName: string
  lastName: string
  email: string
  phone: string
  paymentMode: BookingConfirmation['paymentMode']
  selectedCard: { last4: string; brand: CardBrand } | null | undefined
}

export function buildBookingConfirmation({
  charterId,
  packageId,
  date,
  adults,
  children,
  firstName,
  lastName,
  email,
  phone,
  paymentMode,
  selectedCard,
}: BuildBookingConfirmationParams): BookingConfirmation | null {
  if (!charterId || !packageId || !selectedCard) return null

  return {
    charterId,
    packageId,
    date,
    paymentMode,
    adults,
    children,
    firstName,
    lastName,
    email,
    phone,
    cardLast4: selectedCard.last4,
    cardBrand: selectedCard.brand,
  }
}
