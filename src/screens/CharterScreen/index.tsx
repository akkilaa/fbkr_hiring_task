import SafeAreaView from '@/components/atoms/SafeAreaView'
import { useCharter } from '@/hooks/useCharters'
import { View } from 'react-native'

type Props = {
  charterNumber: number
}

const CharterScreen = ({ charterNumber }: Props) => {
  const { data } = useCharter(charterNumber)

  return (
    <SafeAreaView>
      <View></View>
    </SafeAreaView>
  )
}

export default CharterScreen
