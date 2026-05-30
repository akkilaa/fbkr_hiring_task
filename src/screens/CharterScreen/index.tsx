import SafeAreaView from '@/components/atoms/SafeAreaView'
import ImageGallery from '@/components/molecules/ImageGallery'
import { useCharter, useCharterPhotos } from '@/hooks/useCharters'
import { View } from 'react-native'

type Props = {
  charterNumber: number
}

const CharterScreen = ({ charterNumber }: Props) => {
  useCharter(charterNumber)
  const { data: photos = [] } = useCharterPhotos(charterNumber)

  return (
    <SafeAreaView>
      <ImageGallery photos={photos} />
      <View></View>
    </SafeAreaView>
  )
}

export default CharterScreen
