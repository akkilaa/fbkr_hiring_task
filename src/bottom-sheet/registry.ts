import type React from 'react'
import CharterDescriptionSheet from '@/components/molecules/CharterDescriptionSheet'
import type { CharterDescriptionSheetProps } from '@/components/molecules/CharterDescriptionSheet'
import ChooseCharterDateSheet from '@/components/molecules/ChooseCharterDateSheet'
import type { ChooseCharterDateSheetProps } from '@/components/molecules/ChooseCharterDateSheet'
import ChooseCharterGuestsSheet from '@/components/molecules/ChooseCharterGuestsSheet'
import type { ChooseCharterGuestsSheetProps } from '@/components/molecules/ChooseCharterGuestsSheet'

export type SheetRegistry = {
  charterDescription: React.ComponentType<CharterDescriptionSheetProps>
  chooseCharterDate: React.ComponentType<ChooseCharterDateSheetProps>
  chooseCharterGuests: React.ComponentType<ChooseCharterGuestsSheetProps>
}

export type SheetName = keyof SheetRegistry
export type SheetPayload<N extends SheetName> = React.ComponentPropsWithoutRef<SheetRegistry[N]>

export const sheetRegistry: { [K in SheetName]: SheetRegistry[K] } = {
  charterDescription: CharterDescriptionSheet,
  chooseCharterDate: ChooseCharterDateSheet,
  chooseCharterGuests: ChooseCharterGuestsSheet,
}
