import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import { StyleSheet, View } from 'react-native'

const FinalStepReminder = () => {
  const theme = useTheme()

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.background,
          borderColor: theme.backgroundSelected,
        },
      ]}
    >
      <Typography variant="callout" style={{ color: theme.text, fontWeight: '700' }}>
        Final step, you got this!
      </Typography>
      <Typography variant="body" style={{ color: theme.textSecondary }}>
        You are almost done. Add your payment details to complete your booking.
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 6,
  },
})

export default FinalStepReminder
