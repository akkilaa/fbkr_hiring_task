import Price from '@/components/atoms/Price'
import Typography from '@/components/atoms/Typography'
import { DEPOSIT_PERCENTAGE } from '@/components/molecules/PaymentMode'
import { useTheme } from '@/hooks/use-theme'
import type { BookingConfirmation } from '@/store/bookingConfirmationStore'
import { BRAND_COLORS, BRAND_LABELS } from '@/store/creditCardStore'
import { formatBookingDate } from '@/utils/dateUtils'
import { StyleSheet, View } from 'react-native'

const SuccessPaymentSection = ({
  confirmation,
  packagePrice,
  packageCurrency,
}: {
  confirmation: BookingConfirmation
  packagePrice?: number
  packageCurrency?: string
}) => {
  const theme = useTheme()

  if (packagePrice == null || !packageCurrency) return null

  const isDeposit = confirmation.paymentMode === 'deposit'
  const depositAmount = Math.round(packagePrice * DEPOSIT_PERCENTAGE)
  const remainingBalance = packagePrice - depositAmount
  const chargedNow = isDeposit ? depositAmount : packagePrice

  return (
    <View style={[styles.card, { backgroundColor: theme.background }]}>
      <Typography variant="label" style={[styles.sectionLabel, { color: theme.textSecondary }]}>
        Payment method
      </Typography>
      <View style={styles.cardRow}>
        <View
          style={[styles.brandBadge, { backgroundColor: BRAND_COLORS[confirmation.cardBrand] }]}
        >
          <Typography variant="caption" style={styles.brandText}>
            {BRAND_LABELS[confirmation.cardBrand]}
          </Typography>
        </View>
        <Typography variant="bodyMedium">•••• {confirmation.cardLast4}</Typography>
      </View>

      <View style={styles.amountBlock}>
        <View style={styles.amountRow}>
          <Typography variant="label" style={{ color: theme.textSecondary }}>
            Charged now
          </Typography>
          <Price amount={chargedNow} currency={packageCurrency} />
        </View>
        {isDeposit && (
          <>
            <Typography variant="bodyMedium" style={{ color: theme.textSecondary }}>
              You paid a deposit now. The remaining balance will be charged later.
            </Typography>
            <View style={styles.amountRow}>
              <Typography variant="label" style={{ color: theme.textSecondary }}>
                Remaining balance ({formatBookingDate(confirmation.date)})
              </Typography>
              <Price amount={remainingBalance} currency={packageCurrency} />
            </View>
          </>
        )}
      </View>
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
  sectionLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  amountBlock: {
    gap: 12,
    paddingTop: 4,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  brandBadge: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  brandText: {
    color: '#ffffff',
    fontWeight: '700',
  },
})

export default SuccessPaymentSection
