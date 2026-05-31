import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import { StyleSheet, View } from 'react-native'

interface SummaryRowProps {
  label: string
  value: string
  icon?: React.ReactNode
  layout?: 'inline' | 'stacked'
}

const SummaryRow = ({ label, value, icon, layout = 'inline' }: SummaryRowProps) => {
  const theme = useTheme()

  if (layout === 'stacked') {
    return (
      <View style={styles.stacked}>
        <Typography variant="label" style={{ color: theme.textSecondary }}>
          {label}
        </Typography>
        <Typography variant="bodyMedium" style={{ color: theme.text }}>
          {value}
        </Typography>
      </View>
    )
  }

  return (
    <View style={styles.inline}>
      <View style={styles.labelSide}>
        {icon}
        <Typography variant="label" style={{ color: theme.textSecondary }}>
          {label}
        </Typography>
      </View>
      <Typography variant="bodyMedium" style={styles.inlineValue}>
        {value}
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  labelSide: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  inlineValue: {
    flexShrink: 1,
    textAlign: 'right',
  },
  stacked: {
    gap: 3,
  },
})

export default SummaryRow
