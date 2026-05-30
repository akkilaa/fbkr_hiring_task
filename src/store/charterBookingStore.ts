import { create } from 'zustand'

interface CharterBookingState {
  date: Date
  adults: number
  children: number
  setDate: (date: Date) => void
  setGuests: (adults: number, children: number) => void
}

export const useCharterBookingStore = create<CharterBookingState>((set) => ({
  date: new Date(),
  adults: 2,
  children: 0,
  setDate: (date) => set({ date }),
  setGuests: (adults, children) => set({ adults, children }),
}))

export function formatBookingGuests(adults: number, children: number): string {
  const total = adults + children
  return `${total} ${total === 1 ? 'person' : 'persons'}`
}
