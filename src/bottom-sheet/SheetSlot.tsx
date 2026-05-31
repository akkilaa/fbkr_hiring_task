import {
  BottomSheetBackdrop,
  BottomSheetModal,
  type BottomSheetBackdropProps,
} from '@gorhom/bottom-sheet'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import { Platform, useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { sheetRegistry, type SheetName } from './registry'
import { SheetDismissProvider } from './SheetDismissContext'

export type SheetSlotHandle = { dismiss: () => void }

type Props = {
  instance: { id: string; name: SheetName; payload: unknown }
  onClosed: () => void
}

export const SheetSlot = forwardRef<SheetSlotHandle, Props>(({ instance, onClosed }, ref) => {
  const modalRef = useRef<BottomSheetModal>(null)
  const { height } = useWindowDimensions()
  const { top } = useSafeAreaInsets()

  const Content = sheetRegistry[instance.name] as React.ComponentType

  useEffect(() => {
    modalRef.current?.present()
  }, [])

  useImperativeHandle(ref, () => ({
    dismiss: () => modalRef.current?.dismiss(),
  }))

  const renderBackdrop = useCallback(
    (p: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop {...p} appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    [],
  )

  return (
    <BottomSheetModal
      ref={modalRef}
      enableDynamicSizing
      maxDynamicContentSize={height * 0.92}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onDismiss={onClosed}
      topInset={top}
      keyboardBehavior={Platform.OS === 'android' ? 'fillParent' : 'interactive'}
      keyboardBlurBehavior="restore"
      android_keyboardInputMode={Platform.OS === 'android' ? 'adjustResize' : undefined}
    >
      <SheetDismissProvider
        value={() => {
          modalRef.current?.dismiss()
        }}
      >
        <Content {...(instance.payload as object)} />
      </SheetDismissProvider>
    </BottomSheetModal>
  )
})

SheetSlot.displayName = 'SheetSlot'
