import { useCharterBookingStore } from '@/store/charterBookingStore'
import { useCreditCardStore } from '@/store/creditCardStore'
import { usePersonDetailsStore } from '@/store/personDetailsStore'

export function useResetState() {
  const resetBooking = useCharterBookingStore((s) => s.reset)
  const resetDetails = usePersonDetailsStore((s) => s.reset)
  const resetSelection = useCreditCardStore((s) => s.resetSelection)

  return () => {
    resetBooking()
    resetDetails()
    resetSelection()
  }
}
