import MapPinIcon from '@/assets/icons/map-pin.svg'
import StarIcon from '@/assets/icons/star.svg'
import { useBottomSheet } from '@/bottom-sheet/BottomSheetProvider'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Typography from '@/components/atoms/Typography'
import { withSkeleton } from '@/hoc/withSkeleton'
import { useTheme } from '@/hooks/use-theme'
import { StyleSheet, View } from 'react-native'
import CharterDescriptionSkeleton from './Skeleton'

interface CharterDescriptionProps {
  title: string
  location: string
  rating?: number
  reviewCount?: number
  description: string
}

const CharterDescription = ({
  title,
  location,
  rating,
  reviewCount,
  description,
}: CharterDescriptionProps) => {
  const { present } = useBottomSheet()
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <Typography variant="title3">{title}</Typography>
      <View style={styles.meta}>
        <Icon icon={MapPinIcon} size={16} color={theme.textSecondary} />
        <Typography
          variant="bodyMedium"
          style={[styles.secondaryText, { color: theme.textSecondary }]}
        >
          {' '}
          {location}
        </Typography>
        {rating != null && (
          <>
            <Typography
              variant="bodyMedium"
              style={[styles.secondaryText, { color: theme.textSecondary }]}
            >
              {' · '}
            </Typography>
            <Icon icon={StarIcon} size={16} color={theme.rating} />
            <Typography
              variant="bodyMedium"
              style={[styles.secondaryText, { color: theme.textSecondary }]}
            >
              {' '}
              {rating} ({reviewCount})
            </Typography>
          </>
        )}
      </View>
      <Typography
        variant="body"
        style={[styles.secondaryText, { color: theme.textSecondary }]}
        numberOfLines={3}
      >
        {description}
      </Typography>
      <Button
        variant="ghost"
        label="Read full description"
        style={styles.ghostButton}
        onPress={() => present('charterDescription', { description })}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 6,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  secondaryText: {},
  ghostButton: {
    alignSelf: 'flex-start',
    width: 'auto',
    paddingHorizontal: 0,
    paddingVertical: 4,
  },
})

export default withSkeleton(CharterDescription, CharterDescriptionSkeleton)
