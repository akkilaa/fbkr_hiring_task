import { useBottomSheet } from '@/bottom-sheet/BottomSheetProvider'
import SafeScrollView from '@/components/atoms/SafeScrollView'
import CharterOverview from '@/components/molecules/CharterOverview'
import { CharterPackages } from '@/components/molecules/CharterPackageCard'
import { useAvailablePackages } from '@/hooks/useAvailablePackages'
import { useCharterBookingStore } from '@/store/charterBookingStore'
import { useRouter } from 'expo-router'

type Props = {
  charterNumber: number
}

const CharterScreen = ({ charterNumber }: Props) => {
  const { present } = useBottomSheet()
  const router = useRouter()
  const { date, adults, children, setSelection } = useCharterBookingStore()
  const { data: packages, isLoading: isPackagesLoading } = useAvailablePackages(
    charterNumber,
    date,
    adults,
    children,
  )

  return (
    <SafeScrollView style={{ backgroundColor: '#ffffff' }}>
      <CharterOverview charterNumber={charterNumber} />
      <CharterPackages
        loading={isPackagesLoading}
        packages={packages}
        onReserve={(packageId) => {
          setSelection(charterNumber, packageId)
          router.push('/checkout')
        }}
        onChangeDate={() => present('chooseCharterDate', {})}
      />
    </SafeScrollView>
  )
}

export default CharterScreen
