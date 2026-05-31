import AddCreditCardSheet from '@/components/molecules/AddCreditCardSheet'
import type { CharterDescriptionSheetProps } from '@/components/molecules/CharterDescriptionSheet'
import CharterDescriptionSheet from '@/components/molecules/CharterDescriptionSheet'
import ChooseCharterDateSheet from '@/components/molecules/ChooseCharterDateSheet'
import ChooseCharterGuestsSheet from '@/components/molecules/ChooseCharterGuestsSheet'
import type React from 'react'

export type SheetRegistry = {
  charterDescription: React.ComponentType<CharterDescriptionSheetProps>
  chooseCharterDate: React.ComponentType<Record<string, never>>
  chooseCharterGuests: React.ComponentType<Record<string, never>>
  addCreditCard: React.ComponentType<Record<string, never>>
}

export type SheetName = keyof SheetRegistry
export type SheetPayload<N extends SheetName> = React.ComponentPropsWithoutRef<SheetRegistry[N]>

export const sheetRegistry: { [K in SheetName]: SheetRegistry[K] } = {
  charterDescription: CharterDescriptionSheet,
  chooseCharterDate: ChooseCharterDateSheet,
  chooseCharterGuests: ChooseCharterGuestsSheet,
  addCreditCard: AddCreditCardSheet,
}
