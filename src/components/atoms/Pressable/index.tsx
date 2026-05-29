import React from 'react'
import type { GestureResponderEvent, PressableProps as NativePressableProps } from 'react-native'
import { Pressable as NativePressable, Platform, StyleSheet, View } from 'react-native'

export interface PressableProps extends NativePressableProps {
  dimColor?: string
  borderRadius?: number
  disableDim?: boolean
  children: React.ReactNode | ((state: { pressed: boolean }) => React.ReactNode)
  onPress?: (event: GestureResponderEvent) => void
  onLongPress?: ((event: GestureResponderEvent) => void) | null
  disabled?: boolean | null
  accessibilityLabel?: string
}

const Pressable = ({
  dimColor = 'rgba(0,0,0,0.10)',
  disableDim,
  borderRadius,
  children,
  ...pressableProps
}: PressableProps) => {
  return (
    <NativePressable style={[styles.base]} {...pressableProps}>
      {({ pressed }) => {
        return (
          <>
            {typeof children === 'function' ? children({ pressed }) : children}
            {!disableDim && pressed && (
              <View
                pointerEvents="none"
                style={[StyleSheet.absoluteFill, { backgroundColor: dimColor, borderRadius }]}
              />
            )}
          </>
        )
      }}
    </NativePressable>
  )
}

const styles = StyleSheet.create({
  base: {
    // Ensure overlay clips on Android for ripple & dim
    overflow: Platform.select({ android: 'hidden', ios: 'visible' }),
  },
})

export default Pressable
