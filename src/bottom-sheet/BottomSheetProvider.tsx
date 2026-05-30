import React, { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import { SheetSlot, type SheetSlotHandle } from './SheetSlot'
import type { SheetName, SheetPayload } from './registry'

type SheetInstance = { id: string; name: SheetName; payload: unknown }

type BottomSheetApi = {
  present: <N extends SheetName>(name: N, payload: SheetPayload<N>) => string
  dismiss: (id?: string) => void
  dismissAll: () => void
}

const Ctx = createContext<BottomSheetApi | null>(null)

export function BottomSheetProvider({ children }: { children: React.ReactNode }) {
  const [stack, setStack] = useState<SheetInstance[]>([])
  const handles = useRef(new Map<string, SheetSlotHandle>())

  const remove = useCallback((id: string) => {
    handles.current.delete(id)
    setStack((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const present = useCallback<BottomSheetApi['present']>((name, payload) => {
    const id = `${name}-${Date.now()}`
    setStack((prev) => [...prev, { id, name, payload }])
    return id
  }, [])

  const dismiss = useCallback<BottomSheetApi['dismiss']>(
    (id) => {
      const target = id ?? stack[stack.length - 1]?.id
      if (target) handles.current.get(target)?.dismiss()
    },
    [stack],
  )

  const dismissAll = useCallback(() => handles.current.forEach((h) => h.dismiss()), [])

  const api = useMemo(() => ({ present, dismiss, dismissAll }), [present, dismiss, dismissAll])

  return (
    <Ctx.Provider value={api}>
      {children}
      {stack.map((instance) => (
        <SheetSlot
          key={instance.id}
          instance={instance}
          ref={(h) => {
            if (h) handles.current.set(instance.id, h)
          }}
          onClosed={() => remove(instance.id)}
        />
      ))}
    </Ctx.Provider>
  )
}

export function useBottomSheet() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useBottomSheet must be inside <BottomSheetProvider>')
  return ctx
}
