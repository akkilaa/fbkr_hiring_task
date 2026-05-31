import { create } from 'zustand'

export type CardBrand = 'visa' | 'mastercard' | 'amex' | 'unknown'

export interface CreditCard {
  id: string
  holderName: string
  last4: string
  expiry: string
  brand: CardBrand
}

interface CreditCardState {
  cards: CreditCard[]
  selectedCardId: string | null
  addCard: (card: Omit<CreditCard, 'id'>) => void
  selectCard: (id: string) => void
  /** Clears selection for next booking; keeps saved cards (user convenience). */
  resetSelection: () => void
}

export const BRAND_LABELS: Record<CardBrand, string> = {
  visa: 'VISA',
  mastercard: 'MC',
  amex: 'AMEX',
  unknown: '••••',
}

export const BRAND_COLORS: Record<CardBrand, string> = {
  visa: '#1434CB',
  mastercard: '#EB001B',
  amex: '#007CC3',
  unknown: '#8E8E93',
}

export function detectCardBrand(cardNumber: string): CardBrand {
  const first = cardNumber.replace(/\s/g, '')[0]
  if (first === '4') return 'visa'
  if (first === '5') return 'mastercard'
  if (first === '3') return 'amex'
  return 'unknown'
}

export const useCreditCardStore = create<CreditCardState>((set) => ({
  cards: [],
  selectedCardId: null,
  addCard: (card) => {
    const id = `card-${Date.now()}`
    set((state) => ({
      cards: [...state.cards, { ...card, id }],
      selectedCardId: id,
    }))
  },
  selectCard: (id) => set({ selectedCardId: id }),
  resetSelection: () => set({ selectedCardId: null }),
}))
