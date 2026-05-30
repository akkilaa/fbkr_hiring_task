import SkeletonBox from '@/components/atoms/SkeletonBox'
import { StyleSheet, View } from 'react-native'

const ImageGallerySkeleton = ({ height = 280 }: { height?: number }) => (
  <View style={[styles.container, { height }]}>
    <SkeletonBox height={height} borderRadius={0} style={StyleSheet.absoluteFill} />
    <View style={styles.dotsContainer}>
      <View style={styles.dots}>
        {[0, 1, 2].map((i) => (
          <SkeletonBox key={i} width={6} height={6} borderRadius={3} />
        ))}
      </View>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 12,
    left: 20,
  },
  dots: {
    flexDirection: 'row',
    gap: 6,
  },
})

export default ImageGallerySkeleton
