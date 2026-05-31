import { create } from 'zustand'

interface PersonDetails {
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface PersonDetailsState extends PersonDetails {
  setPersonDetails: (details: PersonDetails) => void
  reset: () => void
}

export const usePersonDetailsStore = create<PersonDetailsState>((set) => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  setPersonDetails: (details) => set(details),
  reset: () => set({ firstName: '', lastName: '', email: '', phone: '' }),
}))

/** Person details are only committed via a zod-validated submit, so a single filled field implies all are. */
export const selectIsPersonDetailsComplete = (s: PersonDetails): boolean =>
  Boolean(s.firstName && s.lastName && s.email && s.phone)
