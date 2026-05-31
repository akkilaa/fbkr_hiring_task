import { create } from 'zustand'

interface LoaderState {
  visible: boolean
  message?: string
  show: (message?: string) => void
  hide: () => void
}

export const useLoaderStore = create<LoaderState>((set) => ({
  visible: false,
  message: undefined,
  show: (message) => set({ visible: true, message }),
  hide: () => set({ visible: false, message: undefined }),
}))
