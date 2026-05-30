import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { ViewToken } from 'react-native'

const VIEWABILITY_CONFIG = { itemVisiblePercentThreshold: 50 }

interface Options {
  onIndexChange?: (index: number) => void
}

export const useActiveGalleryIndex = ({ onIndexChange }: Options = {}) => {
  const [activeIndex, setActiveIndex] = useState(0)

  const onIndexChangeRef = useRef(onIndexChange)
  useLayoutEffect(() => {
    onIndexChangeRef.current = onIndexChange
  })

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (!viewableItems.length) return
      const index = viewableItems[0].index ?? 0
      setActiveIndex(index)
      onIndexChangeRef.current?.(index)
    },
    [],
  )

  return { activeIndex, onViewableItemsChanged, viewabilityConfig: VIEWABILITY_CONFIG }
}
