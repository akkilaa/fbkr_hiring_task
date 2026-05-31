import { useLocalSearchParams } from 'expo-router'

import CharterScreen from '@/screens/CharterScreen'

const Charter = () => {
  const { charterNumber } = useLocalSearchParams<{ charterNumber: string }>()
  return <CharterScreen charterNumber={Number(charterNumber)} />
}

export default Charter
