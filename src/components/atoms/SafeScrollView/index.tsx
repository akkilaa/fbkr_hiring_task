import React, { memo } from 'react'
import { ScrollView } from 'react-native'
import type { ScrollViewProps } from 'react-native'
import SafeAreaView from '@/components/atoms/SafeAreaView'

interface SafeScrollViewProps extends ScrollViewProps {
  children?: React.ReactNode
}

const SafeScrollView = memo(({ children, style, ...props }: SafeScrollViewProps) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={[{ flex: 1 }, style]} {...props}>
        {children}
      </ScrollView>
    </SafeAreaView>
  )
})

export default SafeScrollView
