import { createContext, useContext } from 'react'

const SheetDismissCtx = createContext<(() => void) | null>(null)

export const SheetDismissProvider = SheetDismissCtx.Provider

export function useSheetDismiss() {
  const dismiss = useContext(SheetDismissCtx)
  if (!dismiss) throw new Error('useSheetDismiss must be used inside SheetSlot')
  return dismiss
}
