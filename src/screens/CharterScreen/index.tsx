import SafeScrollView from '@/components/atoms/SafeScrollView'
import CharterDescription from '@/components/molecules/CharterDescription'
import ImageGallery from '@/components/molecules/ImageGallery'
import { useCharter, useCharterPhotos } from '@/hooks/useCharters'

type Props = {
  charterNumber: number
}

const CharterScreen = ({ charterNumber }: Props) => {
  const { data: charter } = useCharter(charterNumber)
  const { data: photos = [] } = useCharterPhotos(charterNumber)
  return (
    <SafeScrollView>
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
    </SafeScrollView>
  )
}

export default CharterScreen
