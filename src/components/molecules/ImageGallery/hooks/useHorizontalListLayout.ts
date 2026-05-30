import { useCallback, useState } from 'react'
import { Dimensions, LayoutChangeEvent } from 'react-native'

export const useHorizontalListLayout = () => {
  const [itemWidth, setItemWidth] = useState(Dimensions.get('window').width)

  const onContainerLayout = useCallback((e: LayoutChangeEvent) => {
    setItemWidth(e.nativeEvent.layout.width)
  }, [])

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: itemWidth,
      offset: itemWidth * index,
      index,
    }),
    [itemWidth],
  )

  return { itemWidth, onContainerLayout, getItemLayout }
}
