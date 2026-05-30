import SkeletonBox from '@/components/atoms/SkeletonBox'
import { useTheme } from '@/hooks/use-theme'
import { StyleSheet, View } from 'react-native'

const CharterPackageCardSkeleton = () => {
  const theme = useTheme()

  return (
    <View style={[styles.card, { borderColor: theme.backgroundSelected }]}>
      <View style={styles.header}>
        <View style={styles.info}>
          <SkeletonBox width="60%" height={18} borderRadius={4} />
          <View style={styles.meta}>
            <SkeletonBox width={72} height={14} borderRadius={4} />
            <SkeletonBox width={72} height={14} borderRadius={4} />
          </View>
        </View>
        <View style={styles.price}>
          <SkeletonBox width={64} height={22} borderRadius={4} />
          <SkeletonBox width={48} height={12} borderRadius={4} />
        </View>
      </View>
      <SkeletonBox width="100%" height={38} borderRadius={6} />
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 12,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  meta: {
    flexDirection: 'row',
    gap: 8,
  },
  price: {
    alignItems: 'flex-end',
    gap: 4,
  },
})

export default CharterPackageCardSkeleton
