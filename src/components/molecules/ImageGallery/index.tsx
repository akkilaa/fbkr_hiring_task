import { withSkeleton } from '@/hoc/withSkeleton'
import { CharterPhoto } from '@/services/charter/charterPhoto.types'
import { Image } from 'expo-image'
import { useCallback, useRef } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Dots } from './Dots'
import { useActiveGalleryIndex } from './hooks/useActiveGalleryIndex'
import { useHorizontalListLayout } from './hooks/useHorizontalListLayout'
import { usePhotoPreloader } from './hooks/usePhotoPreloader'
import ImageGallerySkeleton from './Skeleton'

interface ImageGalleryProps {
  photos: CharterPhoto[]
  height?: number
  locked?: boolean
}

const ImageGallery = ({ photos, height = 280, locked = false }: ImageGalleryProps) => {
  const { notifyPhotoVisible } = usePhotoPreloader(photos)
  const { activeIndex, onViewableItemsChanged, viewabilityConfig } = useActiveGalleryIndex({
    onIndexChange: notifyPhotoVisible,
  })
  const { itemWidth, onContainerLayout, getItemLayout } = useHorizontalListLayout()

  const flatListRef = useRef<FlatList<CharterPhoto>>(null)

  const renderItem = useCallback(
    ({ item }: { item: CharterPhoto }) => (
      <View style={{ width: itemWidth, height }}>
        <Image
          source={{ uri: item.urls.public }}
          style={{ width: itemWidth, height }}
          contentFit="contain"
          transition={150}
          accessibilityLabel={item.altText ?? item.description}
        />
      </View>
    ),
    [itemWidth, height],
  )

  const keyExtractor = useCallback((item: CharterPhoto) => String(item.id), [])

  if (!photos.length) return null

  return (
    <View style={[styles.container, { height }]} onLayout={onContainerLayout}>
      <FlatList
        ref={flatListRef}
        data={photos}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        scrollEnabled={!locked}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={3}
        maxToRenderPerBatch={5}
        windowSize={5}
        getItemLayout={getItemLayout}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      {!locked && photos.length > 1 && (
        <View style={styles.dotsContainer}>
          <Dots count={photos.length} activeIndex={activeIndex} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#e7eff2',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 12,
    left: 20,
  },
})

export default withSkeleton(ImageGallery, ImageGallerySkeleton)
