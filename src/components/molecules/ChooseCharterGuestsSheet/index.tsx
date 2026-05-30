import { useSheetDismiss } from '@/bottom-sheet/SheetDismissContext'
import Button from '@/components/atoms/Button'
import IconButton from '@/components/atoms/IconButton'
import Typography from '@/components/atoms/Typography'
import SheetHeader from '@/components/molecules/SheetHeader'
import { useTheme } from '@/hooks/use-theme'
import { useCharterBookingStore } from '@/store/charterBookingStore'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface GuestRowProps {
  label: string
  subtitle: string
  count: number
  disabledCount: number
  onDecrement: () => void
  onIncrement: () => void
}

const GuestRow = ({
  label,
  subtitle,
  count,
  disabledCount,
  onDecrement,
  onIncrement,
}: GuestRowProps) => {
  const theme = useTheme()

  return (
    <View style={styles.row}>
      <View style={styles.rowLabels}>
        <Typography variant="bodyMedium">{label}</Typography>
        <Typography variant="label" style={{ color: theme.textSecondary }}>
          {subtitle}
        </Typography>
      </View>
      <View style={styles.stepper}>
        <IconButton
          icon={
            <Typography variant="callout" style={{ color: theme.text }}>
              {'\u2212'}
            </Typography>
          }
          accessibilityLabel={`Decrease ${label}`}
          variant="outlined"
          shape="circle"
          size={36}
          hitSlop={20}
          onPress={onDecrement}
          disabled={count <= disabledCount}
        />
        <Typography variant="callout" style={styles.count}>
          {count}
        </Typography>
        <IconButton
          icon={
            <Typography variant="callout" style={{ color: theme.brand }}>
              {'\u002B'}
            </Typography>
          }
          accessibilityLabel={`Increase ${label}`}
          variant="outlined"
          hitSlop={20}
          shape="circle"
          size={36}
          onPress={onIncrement}
        />
      </View>
    </View>
  )
}

const ChooseCharterGuestsSheet = () => {
  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()
  const dismiss = useSheetDismiss()
  const { adults: storedAdults, children: storedChildren, setGuests } = useCharterBookingStore()
  const [adults, setAdults] = useState(storedAdults)
  const [children, setChildren] = useState(storedChildren)

  return (
    <BottomSheetScrollView
      contentContainerStyle={[styles.content, { paddingBottom: Math.max(bottom, 16) + 16 }]}
    >
      <SheetHeader title="How many people?" />
      <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />
      <GuestRow
        label="Adults"
        subtitle="Ages 13 or above"
        count={adults}
        onDecrement={() => setAdults((n) => Math.max(1, n - 1))}
        onIncrement={() => setAdults((n) => n + 1)}
        disabledCount={1}
      />
      <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />
      <GuestRow
        label="Children"
        subtitle="Ages 2–12"
        count={children}
        onDecrement={() => setChildren((n) => Math.max(0, n - 1))}
        onIncrement={() => setChildren((n) => n + 1)}
        disabledCount={0}
      />
      <Button
        label="Confirm"
        style={styles.confirm}
        onPress={() => {
          setGuests(adults, children)
          dismiss()
        }}
      />
    </BottomSheetScrollView>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  rowLabels: {
    gap: 2,
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  count: {
    minWidth: 24,
    textAlign: 'center',
  },
  confirm: {
    marginTop: 20,
  },
})

export default ChooseCharterGuestsSheet
