import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import { memo } from 'react'
import { StyleSheet, View } from 'react-native'

interface PriceProps {
  amount: number
  currency: string
  suffix?: string
}

const formatPrice = (amount: number, currency: string) => {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount)
  } catch {
    return `${currency} ${amount}`
  }
}

const Price = memo(({ amount, currency, suffix }: PriceProps) => {
  const theme = useTheme()

  return (
    <View style={styles.container}>
      <Typography variant="title3">{formatPrice(amount, currency)}</Typography>
      {suffix && (
        <Typography variant="caption" style={{ color: theme.textSecondary }}>
          {suffix}
        </Typography>
      )}
    </View>
  )
})

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
  },
})

export default Price
export type { PriceProps }
