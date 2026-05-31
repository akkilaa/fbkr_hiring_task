import CalendarIcon from '@/assets/icons/calendar.svg'
import MapPinIcon from '@/assets/icons/map-pin.svg'
import UsersIcon from '@/assets/icons/users.svg'
import Icon from '@/components/atoms/Icon'
import Price from '@/components/atoms/Price'
import SummaryRow from '@/components/atoms/SummaryRow'
import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import type { BookingConfirmation } from '@/store/bookingConfirmationStore'
import { formatBookingDate } from '@/utils/dateUtils'
import { formatGuests } from '@/utils/guestUtils'
import { StyleSheet, View } from 'react-native'

interface SuccessTripSectionProps {
  confirmation: BookingConfirmation
  charterTitle: string | undefined
  charterCity: string | undefined
  packageTitle: string | undefined
  packageHours: number | undefined
  packagePrice: number | undefined
  packageCurrency: string | undefined
}

const SuccessTripSection = ({
  confirmation,
  charterTitle,
  charterCity,
  packageTitle,
  packageHours,
  packagePrice,
  packageCurrency,
}: SuccessTripSectionProps) => {
  const theme = useTheme()
  return (
    <View style={[styles.card, { backgroundColor: theme.background }]}>
      <View style={styles.charterHeader}>
        <Typography variant="title3" style={{ color: theme.text }}>
          {charterTitle ?? ''}
        </Typography>
        {charterCity ? (
          <View style={styles.locationRow}>
            <Icon icon={MapPinIcon} size={13} color={theme.textSecondary} />
            <Typography variant="label" style={{ color: theme.textSecondary }}>
              {charterCity}
            </Typography>
          </View>
        ) : null}
      </View>

      <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />

      <View style={styles.rows}>
        <SummaryRow
          label="Date"
          value={formatBookingDate(confirmation.date)}
          icon={<Icon icon={CalendarIcon} size={13} color={theme.textSecondary} />}
        />
        <SummaryRow
          label="Guests"
          value={formatGuests(confirmation.adults, confirmation.children)}
          icon={<Icon icon={UsersIcon} size={13} color={theme.textSecondary} />}
        />
        {packageTitle && <SummaryRow label="Package" value={packageTitle} />}
        {packageHours != null && <SummaryRow label="Duration" value={`${packageHours} hours`} />}
      </View>

      {packagePrice != null && packageCurrency != null && (
        <>
          <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />
          <View style={styles.totalRow}>
            <Typography variant="label" style={{ color: theme.textSecondary }}>
              Total price
            </Typography>
            <Price amount={packagePrice} currency={packageCurrency} />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  charterHeader: {
    gap: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 2,
  },
  rows: {
    gap: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
})

export default SuccessTripSection
