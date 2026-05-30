import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'

const DOT_SIZE = 6
const PILL_WIDTH = 18

export const useDotPillAnimation = (isActive: boolean) => {
  const width = useSharedValue(isActive ? PILL_WIDTH : DOT_SIZE)

  useEffect(() => {
    width.value = withTiming(isActive ? PILL_WIDTH : DOT_SIZE, { duration: 220 })
  }, [isActive, width])

  const pillStyle = useAnimatedStyle(() => ({ width: width.value }))

  return { pillStyle }
}
