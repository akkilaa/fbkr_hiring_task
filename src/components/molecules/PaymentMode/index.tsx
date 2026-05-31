import Price from '@/components/atoms/Price'
import RadioButton from '@/components/atoms/RadioButton'
import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import { formatBookingDate } from '@/utils/dateUtils'
import { StyleSheet, View } from 'react-native'

export const DEPOSIT_PERCENTAGE = 0.2
export const PAYMENT_OPTION_FULL: PaymentOption = 'full'
export const PAYMENT_OPTION_DEPOSIT: PaymentOption = 'deposit'

export type PaymentOption = 'full' | 'deposit'

export interface PaymentModeProps {
  price: number
  currency: string
  tripDate: Date
  value: PaymentOption
  onChange: (value: PaymentOption) => void
}

const PaymentMode = ({ price, currency, tripDate, value, onChange }: PaymentModeProps) => {
  const theme = useTheme()
  const deposit = Math.round(price * DEPOSIT_PERCENTAGE)
  const rest = price - deposit
  const depositPercent = Math.round(DEPOSIT_PERCENTAGE * 100)
  const selectedAmount = value === PAYMENT_OPTION_FULL ? price : deposit

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Typography variant="title3" style={styles.title}>
        How would you like to pay?
      </Typography>

      <View style={styles.options}>
        <RadioButton
          selected={value === PAYMENT_OPTION_FULL}
          onPress={() => onChange(PAYMENT_OPTION_FULL)}
          label={
            <View style={styles.labelInline}>
              <Typography variant="bodyMedium">Pay</Typography>
              <Price amount={price} currency={currency} />
              <Typography variant="bodyMedium">now</Typography>
            </View>
          }
          description="Pay now in full and save on potential credit card fees at the dock"
        />
        <RadioButton
          selected={value === PAYMENT_OPTION_DEPOSIT}
          onPress={() => onChange(PAYMENT_OPTION_DEPOSIT)}
          label={
            <View style={styles.labelInline}>
              <Typography variant="bodyMedium">Pay</Typography>
              <Price amount={deposit} currency={currency} />
              <Typography variant="bodyMedium">deposit now,</Typography>
              <Price amount={rest} currency={currency} />
              <Typography variant="bodyMedium">later</Typography>
            </View>
          }
          description={`Pay ${depositPercent}% now, later remaining balance. Fees may apply.`}
        />
      </View>

      <View style={[styles.priceSection, { borderTopColor: theme.backgroundSelected }]}>
        <View style={styles.priceRow}>
          <Typography variant="label" style={{ color: theme.textSecondary }}>
            Price to pay now
          </Typography>
          <Price amount={selectedAmount} currency={currency} />
        </View>
        {value === PAYMENT_OPTION_DEPOSIT && (
          <View style={styles.priceRow}>
            <Typography variant="label" style={{ color: theme.textSecondary }}>
              Remaining balance ({formatBookingDate(tripDate)})
            </Typography>
            <Price amount={rest} currency={currency} />
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 16,
  },
  title: {
    marginBottom: 4,
  },
  options: {
    gap: 14,
  },
  labelInline: {
    flexDirection: 'row',
    alignItems: 'baseline',
    flexWrap: 'wrap',
    columnGap: 6,
    rowGap: 2,
  },
  priceSection: {
    gap: 10,
    paddingTop: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default PaymentMode
