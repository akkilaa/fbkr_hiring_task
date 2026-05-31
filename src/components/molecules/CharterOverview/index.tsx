import CalendarIcon from '@/assets/icons/calendar.svg'
import UsersIcon from '@/assets/icons/users.svg'
import { useBottomSheet } from '@/bottom-sheet/BottomSheetProvider'
import Icon from '@/components/atoms/Icon'
import CharterDescription from '@/components/molecules/CharterDescription'
import ImageGallery from '@/components/molecules/ImageGallery'
import DropdownButton from '@/components/organisms/DropdownButton'
import { useCharter, useCharterPhotos } from '@/hooks/useCharters'
import { formatBookingGuests, useCharterBookingStore } from '@/store/charterBookingStore'
import { formatBookingDate } from '@/utils/dateUtils'
import { StyleSheet, View } from 'react-native'

interface CharterOverviewProps {
  charterNumber?: number
  hideDescription?: boolean
  hideDropdowns?: boolean
  hideGallery?: boolean
  locked?: boolean
}

const CharterOverview = ({
  charterNumber,
  hideDescription = false,
  hideDropdowns = false,
  hideGallery = false,
  locked = false,
}: CharterOverviewProps) => {
  const { charterId, date, adults, children } = useCharterBookingStore()
  const resolvedId = charterNumber ?? charterId

  const { data: charter, isLoading: isCharterLoading } = useCharter(resolvedId!)
  const { data: photos = [], isLoading: isPhotosLoading } = useCharterPhotos(resolvedId!)
  const { present } = useBottomSheet()

  if (!resolvedId) return null

  return (
    <View>
      {!hideGallery && <ImageGallery loading={isPhotosLoading} photos={photos} locked={locked} />}

      <CharterDescription
        loading={isCharterLoading || !charter}
        title={charter?.title ?? ''}
        location={charter?.city ?? ''}
        description={charter?.description ?? ''}
        rating={4.9}
        reviewCount={784}
        hideDescription={hideDescription}
      />

      {!hideDropdowns && (
        <View style={styles.selectors}>
          <DropdownButton
            label="Date"
            value={formatBookingDate(date)}
            leftIcon={<Icon icon={CalendarIcon} size={20} />}
            style={styles.selectorItem}
            onPress={() => present('chooseCharterDate', {})}
          />
          <DropdownButton
            label="Guests"
            value={formatBookingGuests(adults, children)}
            leftIcon={<Icon icon={UsersIcon} size={20} />}
            style={styles.selectorItem}
            onPress={() => present('chooseCharterGuests', {})}
          />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  selectors: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  selectorItem: {
    flex: 1,
  },
})

export default CharterOverview
