import CalendarIcon from '@/assets/icons/calendar.svg'
import UsersIcon from '@/assets/icons/users.svg'
import { useBottomSheet } from '@/bottom-sheet/BottomSheetProvider'
import Icon from '@/components/atoms/Icon'
import SafeScrollView from '@/components/atoms/SafeScrollView'
import CharterDescription from '@/components/molecules/CharterDescription'
import ImageGallery from '@/components/molecules/ImageGallery'
import DropdownButton from '@/components/organisms/DropdownButton'
import { useCharter, useCharterPhotos } from '@/hooks/useCharters'
import { formatBookingGuests, useCharterBookingStore } from '@/store/charterBookingStore'
import { formatBookingDate } from '@/utils/dateUtils'
import { StyleSheet, View } from 'react-native'

type Props = {
  charterNumber: number
}

const CharterScreen = ({ charterNumber }: Props) => {
  const { data: charter } = useCharter(charterNumber)
  const { data: photos = [] } = useCharterPhotos(charterNumber)
  const { present } = useBottomSheet()
  const { date, adults, children } = useCharterBookingStore()

  return (
    <SafeScrollView style={{ backgroundColor: '#ffffff' }}>
      <ImageGallery photos={photos} />
      {charter && (
        <CharterDescription
          title={charter.title}
          location={charter.city}
          description={charter.description}
          rating={4.9}
          reviewCount={784}
        />
      )}
      <View style={styles.dropdowns}>
        <DropdownButton
          label="Date"
          value={formatBookingDate(date)}
          leftIcon={<Icon icon={CalendarIcon} size={20} />}
          style={styles.dropdownItem}
          onPress={() => present('chooseCharterDate', {})}
        />
        <DropdownButton
          label="Guests"
          value={formatBookingGuests(adults, children)}
          leftIcon={<Icon icon={UsersIcon} size={20} />}
          style={styles.dropdownItem}
          onPress={() => present('chooseCharterGuests', {})}
        />
      </View>
    </SafeScrollView>
  )
}

const styles = StyleSheet.create({
  dropdowns: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
  },
  dropdownItem: {
    flex: 1,
  },
})

export default CharterScreen
