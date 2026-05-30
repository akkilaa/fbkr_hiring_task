import Typography from '@/components/atoms/Typography'
import SheetHeader from '@/components/molecules/SheetHeader'
import { useTheme } from '@/hooks/use-theme'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'
import { StyleSheet, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface CharterDescriptionSheetProps {
  description: string
}

const CharterDescriptionSheet = ({ description }: CharterDescriptionSheetProps) => {
  const { bottom } = useSafeAreaInsets()
  const theme = useTheme()

  return (
    <BottomSheetScrollView
      contentContainerStyle={[styles.content, { paddingBottom: Math.max(bottom, 16) + 16 }]}
    >
      <SheetHeader title="Description" />
      <View style={[styles.divider, { backgroundColor: theme.backgroundSelected }]} />
      <Typography variant="body" style={[styles.description, { color: theme.textSecondary }]}>
        {description}
      </Typography>
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
  description: {
    lineHeight: 24,
  },
})

export default CharterDescriptionSheet
export type { CharterDescriptionSheetProps }
