import { useEffect, useState } from 'react'
import { Animated } from 'react-native'

export function useSuccessAnimation() {
  const [circleScale] = useState(() => new Animated.Value(0))
  const [contentOpacity] = useState(() => new Animated.Value(0))
  const [contentTranslateY] = useState(() => new Animated.Value(20))

  useEffect(() => {
    Animated.sequence([
      Animated.spring(circleScale, {
        toValue: 1,
        useNativeDriver: true,
        damping: 12,
        stiffness: 180,
        mass: 1,
      }),
      Animated.parallel([
        Animated.timing(contentOpacity, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(contentTranslateY, { toValue: 0, duration: 350, useNativeDriver: true }),
      ]),
    ]).start()
  }, [circleScale, contentOpacity, contentTranslateY])

  const contentAnimStyle = {
    opacity: contentOpacity,
    transform: [{ translateY: contentTranslateY }],
  }

  return { circleScale, contentAnimStyle }
}
