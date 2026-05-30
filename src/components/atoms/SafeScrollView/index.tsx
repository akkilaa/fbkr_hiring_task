import React, { memo } from 'react'
import { ScrollView } from 'react-native'
import type { ScrollViewProps } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface SafeScrollViewProps extends ScrollViewProps {
  children?: React.ReactNode
}

const SafeScrollView = memo(
  ({ children, contentContainerStyle, style, ...props }: SafeScrollViewProps) => {
    const insets = useSafeAreaInsets()

    return (
      <ScrollView
        style={[{ flex: 1 }, style]}
        contentContainerStyle={[
          {
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
          },
          contentContainerStyle,
        ]}
        {...props}
      >
        {children}
      </ScrollView>
    )
  },
)

export default SafeScrollView
