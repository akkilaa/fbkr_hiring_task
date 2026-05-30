import { useSheetDismiss } from '@/bottom-sheet/SheetDismissContext'
import Icon from '@/components/atoms/Icon'
import IconButton from '@/components/atoms/IconButton'
import Typography from '@/components/atoms/Typography'
import { useTheme } from '@/hooks/use-theme'
import { StyleSheet, View } from 'react-native'

interface SheetHeaderProps {
  title: string
}

const SheetHeader = ({ title }: SheetHeaderProps) => {
  const theme = useTheme()
  const dismiss = useSheetDismiss()

  return (
    <View style={styles.container}>
      <Typography variant="title3">{title}</Typography>
      <IconButton
        icon={<Icon name="close" size={20} color={theme.text} />}
        accessibilityLabel="Close"
        onPress={() => {
          dismiss()
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default SheetHeader
export type { SheetHeaderProps }
