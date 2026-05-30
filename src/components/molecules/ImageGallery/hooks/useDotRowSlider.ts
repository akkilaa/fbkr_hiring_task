import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { useEffect } from 'react'

const DOT_STEP = 16
const MAX_VISIBLE = 5

export const useDotRowSlider = (count: number, activeIndex: number) => {
  const translateX = useSharedValue(0)

  useEffect(() => {
    if (count <= MAX_VISIBLE) return
    const half = Math.floor(MAX_VISIBLE / 2)
    const windowStart = Math.min(Math.max(activeIndex - half, 0), count - MAX_VISIBLE)
    translateX.value = withTiming(-windowStart * DOT_STEP, { duration: 220 })
  }, [activeIndex, count, translateX])

  const rowStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }))

  return { rowStyle }
}
