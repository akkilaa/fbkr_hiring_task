import type React from 'react'
import CharterDescriptionSheet from '@/components/molecules/CharterDescriptionSheet'
import type { CharterDescriptionSheetProps } from '@/components/molecules/CharterDescriptionSheet'

export type SheetRegistry = {
  charterDescription: React.ComponentType<CharterDescriptionSheetProps>
}

export type SheetName = keyof SheetRegistry
export type SheetPayload<N extends SheetName> = React.ComponentPropsWithoutRef<SheetRegistry[N]>

export const sheetRegistry: { [K in SheetName]: SheetRegistry[K] } = {
  charterDescription: CharterDescriptionSheet,
}
