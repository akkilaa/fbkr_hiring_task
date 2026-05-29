import React, { memo } from 'react'
import type { ViewStyle } from 'react-native'
import type { Edge } from 'react-native-safe-area-context'
import { SafeAreaView as RNSafeAreaView } from 'react-native-safe-area-context'

interface SafeAreaViewProps {
  children: React.ReactNode
  style?: ViewStyle | ViewStyle[]
  edges?: string[]
}

const SafeAreaView = memo(
  ({ children, style, edges = ['top', 'bottom', 'left', 'right'] }: SafeAreaViewProps) => {
    return (
      <RNSafeAreaView style={style} edges={edges as Edge[]}>
        {children}
      </RNSafeAreaView>
    )
  },
)

export default SafeAreaView
