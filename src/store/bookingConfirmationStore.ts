import { create } from 'zustand'
import type { CardBrand } from './creditCardStore'

export interface BookingConfirmation {
  charterId: number
  packageId: number
  date: Date
  adults: number
  children: number
  firstName: string
  lastName: string
  email: string
  phone: string
  cardLast4: string
  cardBrand: CardBrand
}

interface BookingConfirmationState {
  confirmation: BookingConfirmation | null
  setConfirmation: (c: BookingConfirmation) => void
}

export const useBookingConfirmationStore = create<BookingConfirmationState>((set) => ({
  confirmation: null,
  setConfirmation: (confirmation) => set({ confirmation }),
}))
