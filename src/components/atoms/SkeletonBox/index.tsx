import { useTheme } from '@/hooks/use-theme'
import { useEffect, useState } from 'react'
import { Animated, StyleProp, ViewStyle } from 'react-native'

interface SkeletonBoxProps {
  width?: number | `${number}%`
  height: number
  borderRadius?: number
  style?: StyleProp<ViewStyle>
}

const SkeletonBox = ({ width, height, borderRadius = 6, style }: SkeletonBoxProps) => {
  const theme = useTheme()
  const [opacity] = useState(() => new Animated.Value(1))

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
      ]),
    ).start()
  }, [opacity])

  return (
    <Animated.View
      style={[
        { width, height, borderRadius, backgroundColor: theme.backgroundElement, opacity },
        style,
      ]}
    />
  )
}

export default SkeletonBox
