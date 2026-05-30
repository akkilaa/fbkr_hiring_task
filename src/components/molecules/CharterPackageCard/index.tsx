import CalendarIcon from '@/assets/icons/calendar.svg'
import UsersIcon from '@/assets/icons/users.svg'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import Price from '@/components/atoms/Price'
import Typography from '@/components/atoms/Typography'
import { withSkeleton } from '@/hoc/withSkeleton'
import { useTheme } from '@/hooks/use-theme'
import { PackageWithAvailability } from '@/hooks/useAvailablePackages'
import { Package } from '@/services/charter/package.types'
import { StyleSheet, View } from 'react-native'
import CharterPackageCardSkeleton from './Skeleton'

interface CharterPackageCardProps {
  pkg: Package
  isAvailable: boolean
  onReserve?: () => void
  onChangeDate?: () => void
}

const CharterPackageCard = ({
  pkg,
  isAvailable,
  onReserve,
  onChangeDate,
}: CharterPackageCardProps) => {
  const theme = useTheme()

  return (
    <View style={[styles.card, { borderColor: theme.backgroundSelected }]}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Typography variant="bodyMedium">{pkg.title}</Typography>
          <View style={styles.meta}>
            <Icon icon={CalendarIcon} size={14} color={theme.textSecondary} />
            <Typography variant="label" style={{ color: theme.textSecondary }}>
              {' '}
              {pkg.hours} hours
            </Typography>
            <Icon icon={UsersIcon} size={14} color={theme.textSecondary} />
            <Typography variant="label" style={{ color: theme.textSecondary }}>
              {' '}
              up to {pkg.capacity}
            </Typography>
          </View>
        </View>
        <Price amount={pkg.price} currency={pkg.currency} suffix="per trip" />
      </View>
      {isAvailable ? (
        <Button size="sm" label="Reserve" onPress={onReserve} />
      ) : (
        <View style={styles.unavailable}>
          <Typography variant="caption" style={{ color: theme.textSecondary, textAlign: 'center' }}>
            This trip is not available for the selected date
          </Typography>
          <Button size="sm" variant="outline" label="Change date" onPress={onChangeDate} />
        </View>
      )}
    </View>
  )
}

interface CharterPackagesProps {
  packages: PackageWithAvailability[]
  loading: boolean
  onChangeDate: () => void
}

export const CharterPackages = ({ packages, loading, onChangeDate }: CharterPackagesProps) => {
  if (!loading && packages.length === 0) return null

  return (
    <View style={styles.section}>
      <Typography variant="callout">Available trips</Typography>
      {loading
        ? [0, 1].map((i) => <CharterPackageCardSkeleton key={i} />)
        : packages.map((pkg) => (
            <CharterPackageCard
              key={pkg.id}
              pkg={pkg}
              isAvailable={pkg.isAvailable}
              onChangeDate={onChangeDate}
            />
          ))}
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
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
  },
  unavailable: {
    gap: 8,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 32,
    gap: 12,
  },
})

export type { CharterPackageCardProps }
export default withSkeleton(CharterPackageCard, CharterPackageCardSkeleton)
