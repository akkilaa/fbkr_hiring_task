import Price from '@/components/atoms/Price'
import SummaryRow from '@/components/atoms/SummaryRow'
import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import { useCharterPackages } from '@/hooks/useCharters'
import { useCharterBookingStore } from '@/store/charterBookingStore'
import { selectIsPersonDetailsComplete, usePersonDetailsStore } from '@/store/personDetailsStore'
import { formatBookingDate } from '@/utils/dateUtils'
import { formatGuests } from '@/utils/guestUtils'
import { StyleSheet, View } from 'react-native'

interface BookingSummaryProps {
  hidePriceRow?: boolean
  showPersonDetails?: boolean
}

const BookingSummary = ({
  hidePriceRow = false,
  showPersonDetails = false,
}: BookingSummaryProps) => {
  const theme = useTheme()
  const { charterId, selectedPackageId, date, adults, children } = useCharterBookingStore()
  const { data: packages } = useCharterPackages(charterId!)
  const selectedPackage = packages?.find((p) => p.id === selectedPackageId)
  const personDetails = usePersonDetailsStore()
  const { firstName, lastName, email, phone } = personDetails

  if (!selectedPackage) return null

  const personDetailsComplete = selectIsPersonDetailsComplete(personDetails)

  return (
    <View style={[styles.container, { borderTopColor: theme.backgroundSelected }]}>
      <SummaryRow layout="stacked" label="You have selected:" value={selectedPackage.title} />
      <SummaryRow layout="stacked" label="Trip date:" value={formatBookingDate(date)} />
      <SummaryRow layout="stacked" label="Guests:" value={formatGuests(adults, children)} />

      {showPersonDetails && personDetailsComplete && (
        <SummaryRow
          layout="stacked"
          label="Person details:"
          value={[`${firstName} ${lastName}`.trim(), email, phone].filter(Boolean).join(', ')}
        />
      )}

      {!hidePriceRow && (
        <View style={styles.priceRow}>
          <Typography variant="label" style={{ color: theme.textSecondary }}>
            Price
          </Typography>
          <View style={styles.pricePill}>
            <Price amount={selectedPackage.price} currency={selectedPackage.currency} />
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pricePill: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
    alignItems: 'center',
  },
})

export default BookingSummary
