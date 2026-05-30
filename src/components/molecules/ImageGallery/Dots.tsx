import { StyleSheet, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useDotPillAnimation } from './hooks/useDotPillAnimation'
import { useDotRowSlider } from './hooks/useDotRowSlider'

const PILL_WIDTH = 18
const DOT_HEIGHT = 6
const DOT_STEP = 16
const MAX_VISIBLE = 5
const PILL_OVERFLOW = Math.ceil((PILL_WIDTH - DOT_STEP) / 2)

interface DotsProps {
  count: number
  activeIndex: number
}

export const Dots = ({ count, activeIndex }: DotsProps) => {
  const { rowStyle } = useDotRowSlider(count, activeIndex)

  const clipWidth = Math.min(count, MAX_VISIBLE) * DOT_STEP + PILL_OVERFLOW * 2

  return (
    <View style={[styles.clip, { width: clipWidth }]}>
      <Animated.View style={[styles.row, rowStyle]}>
        {Array.from({ length: count }, (_, i) => (
          <DotItem key={i} isActive={i === activeIndex} />
        ))}
      </Animated.View>
    </View>
  )
}

const DotItem = ({ isActive }: { isActive: boolean }) => {
  const { pillStyle } = useDotPillAnimation(isActive)

  return (
    <View style={styles.slot}>
      <Animated.View
        style={[styles.dot, isActive ? styles.dotActive : styles.dotInactive, pillStyle]}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  clip: {
    height: DOT_HEIGHT + 4,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: PILL_OVERFLOW,
  },
  row: {
    flexDirection: 'row',
  },
  slot: {
    width: DOT_STEP,
    height: DOT_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: DOT_HEIGHT,
    borderRadius: DOT_HEIGHT / 2,
  },
  dotActive: {
    backgroundColor: '#ffffff',
  },
  dotInactive: {
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
})
