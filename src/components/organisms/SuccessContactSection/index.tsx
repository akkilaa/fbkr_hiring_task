import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import type { BookingConfirmation } from '@/store/bookingConfirmationStore'
import { StyleSheet, View } from 'react-native'

const SuccessContactSection = ({ confirmation }: { confirmation: BookingConfirmation }) => {
  const theme = useTheme()
  return (
    <View style={[styles.card, { backgroundColor: theme.background }]}>
      <Typography variant="label" style={[styles.sectionLabel, { color: theme.textSecondary }]}>
        Contact details
      </Typography>
      <Typography variant="bodyMedium" style={{ color: theme.text }}>
        {confirmation.firstName} {confirmation.lastName}
      </Typography>
      <Typography variant="body" style={{ color: theme.textSecondary }}>
        {confirmation.email}
      </Typography>
      <Typography variant="body" style={{ color: theme.textSecondary }}>
        {confirmation.phone}
      </Typography>
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
})

export default SuccessContactSection
