import { create } from 'zustand'

interface CharterBookingState {
  charterId: number | null
  selectedPackageId: number | null
  date: Date
  adults: number
  children: number
  setDate: (date: Date) => void
  setGuests: (adults: number, children: number) => void
  setSelection: (charterId: number, packageId: number) => void
  reset: () => void
}

export const useCharterBookingStore = create<CharterBookingState>((set) => ({
  charterId: null,
  selectedPackageId: null,
  date: new Date(),
  adults: 2,
  children: 0,
  setDate: (date) => set({ date }),
  setGuests: (adults, children) => set({ adults, children }),
  setSelection: (charterId, packageId) => set({ charterId, selectedPackageId: packageId }),
  reset: () =>
    set({ charterId: null, selectedPackageId: null, date: new Date(), adults: 2, children: 0 }),
}))

export function formatBookingGuests(adults: number, children: number): string {
  const total = adults + children
  return `${total} ${total === 1 ? 'person' : 'persons'}`
}
