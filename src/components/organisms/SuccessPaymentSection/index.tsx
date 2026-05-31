import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import type { BookingConfirmation } from '@/store/bookingConfirmationStore'
import { BRAND_COLORS, BRAND_LABELS } from '@/store/creditCardStore'
import { StyleSheet, View } from 'react-native'

const SuccessPaymentSection = ({ confirmation }: { confirmation: BookingConfirmation }) => {
  const theme = useTheme()
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
