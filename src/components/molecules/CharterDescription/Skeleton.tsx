import SkeletonBox from '@/components/atoms/SkeletonBox'
import { StyleSheet, View } from 'react-native'

const CharterDescriptionSkeleton = () => (
  <View style={styles.container}>
    <SkeletonBox width="65%" height={24} borderRadius={6} />
    <SkeletonBox width="50%" height={16} borderRadius={4} />
    <View style={styles.lines}>
      <SkeletonBox width="100%" height={16} borderRadius={4} />
      <SkeletonBox width="100%" height={16} borderRadius={4} />
      <SkeletonBox width="55%" height={16} borderRadius={4} />
    </View>
    <SkeletonBox width={140} height={16} borderRadius={4} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
  },
  lines: {
    gap: 6,
  },
})

export default CharterDescriptionSkeleton
