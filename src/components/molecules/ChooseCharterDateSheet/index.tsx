import ChevronLeftIcon from '@/assets/icons/chevron-left.svg'
import ChevronRightIcon from '@/assets/icons/chevron-right.svg'
import { useSheetDismiss } from '@/bottom-sheet/SheetDismissContext'
import Button from '@/components/atoms/Button'
import Icon from '@/components/atoms/Icon'
import SheetHeader from '@/components/molecules/SheetHeader'
import { useTheme } from '@/hooks/use-theme'
import { useCharterBookingStore } from '@/store/charterBookingStore'
import { toCalendarDateString } from '@/utils/dateUtils'
import { BottomSheetView } from '@gorhom/bottom-sheet'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ChooseCharterDateSheet = () => {
  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()
  const dismiss = useSheetDismiss()
  const { date, setDate } = useCharterBookingStore()

  const today = new Date()
  const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  const [localSelected, setLocalSelected] = useState<Date | null>(date)

  const todayString = toCalendarDateString(todayMidnight)
  const markedDates = localSelected
    ? { [toCalendarDateString(localSelected)]: { selected: true } }
    : {}

  const calendarTheme = {
    calendarBackground: theme.background,
    dayTextColor: theme.text,
    textSectionTitleColor: theme.textSecondary,
    selectedDayBackgroundColor: theme.brand,
    selectedDayTextColor: '#ffffff',
    textDisabledColor: theme.backgroundSelected,
    monthTextColor: theme.text,
    arrowColor: theme.text,
    // suppress the built-in today highlight — custom calendar had none
    todayTextColor: theme.text,
    todayBackgroundColor: 'transparent' as const,
    textDayFontSize: 13,
    textDayHeaderFontSize: 12,
    textMonthFontSize: 15,
    textDayFontWeight: '400' as const,
    textDayHeaderFontWeight: '400' as const,
    textMonthFontWeight: '500' as const,
  }

  return (
    <BottomSheetView style={[styles.content, { paddingBottom: Math.max(bottom, 16) + 16 }]}>
      <SheetHeader title="Select date" />
      <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />

      <Calendar
        minDate={todayString}
        initialDate={localSelected ? toCalendarDateString(localSelected) : todayString}
        markedDates={markedDates}
        onDayPress={(day) => setLocalSelected(new Date(day.year, day.month - 1, day.day))}
        theme={calendarTheme}
        renderArrow={(direction) => (
          <Icon
            icon={direction === 'left' ? ChevronLeftIcon : ChevronRightIcon}
            size={18}
            color={theme.text}
          />
        )}
        showSixWeeks
        hideExtraDays={false}
        style={styles.calendar}
      />

      <Button
        label="Confirm"
        style={styles.confirm}
        onPress={() => {
          if (localSelected) setDate(localSelected)
          dismiss()
        }}
      />
    </BottomSheetView>
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
  calendar: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  confirm: {
    marginTop: 16,
  },
})

export default ChooseCharterDateSheet
