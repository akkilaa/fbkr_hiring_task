import { useCharterBookingStore } from '@/store/charterBookingStore'
import { useCreditCardStore } from '@/store/creditCardStore'
import { usePersonDetailsStore } from '@/store/personDetailsStore'

export function resetBookingState() {
  useCharterBookingStore.getState().reset()
  usePersonDetailsStore.getState().reset()
  useCreditCardStore.getState().resetSelection()
}

export function enterSuccessScreen(hideLoader: () => void, resetState: () => void) {
  hideLoader()
  resetState()
}
